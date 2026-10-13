import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

test('repeated dashboard refresh releases old charts before replacing canvases', () => {
  const instances = new Map();
  let nextChartId = 0;
  let click;
  let finishRefresh;
  const button = {
    dataset: {}, innerHTML: 'Refresh', disabled: false,
    addEventListener: (_, handler) => { click = handler; },
  };
  function card(markup) {
    let html = markup;
    const element = {
      canvas: {}, style: {},
      getBoundingClientRect: () => ({ height: 300 }),
      querySelectorAll: () => element.canvas ? [element.canvas] : [],
      get innerHTML() { return html; },
      set innerHTML(value) {
        html = value;
        element.canvas = value === markup ? {} : null;
      },
    };
    return element;
  }
  const stat = card('Stat markup');
  const primary = card('Chart markup');
  const Chart = {
    getChart: canvas => [...instances.values()].find(chart => chart.canvas === canvas),
  };
  function render(canvas) {
    const id = nextChartId++;
    instances.set(id, { canvas, destroy: () => instances.delete(id) });
  }
  const document = {
    getElementById: id => id === 'dash-refresh-btn' ? button : null,
    querySelectorAll: () => [stat],
    querySelector: () => primary,
  };
  const window = { Chart };
  const context = vm.createContext({
    window, Chart, document, ready: () => {},
    setTimeout: callback => { finishRefresh = callback; },
  });
  vm.runInContext(readFileSync(new URL('../js/main-vanilla.js', import.meta.url), 'utf8'), context);
  window.__coolReinit = () => [stat, primary].forEach(element => render(element.canvas));
  window.__coolReinit();
  // A chart outside the refreshed cards must remain alive.
  const untouched = {};
  render(untouched);
  vm.runInContext('initDashboardRefresh()', context);

  for (let i = 0; i < 3; i++) {
    click();
    assert.equal(instances.size, 1, 'Destroy refreshed charts before removing their canvases');
    assert.ok(Chart.getChart(untouched));
    assert.equal(button.disabled, true);
    finishRefresh();
    assert.equal(instances.size, 3, 'Refresh must not retain detached chart instances');
    assert.equal(button.disabled, false);
    assert.ok(Chart.getChart(stat.canvas));
    assert.ok(Chart.getChart(primary.canvas));
  }
});
