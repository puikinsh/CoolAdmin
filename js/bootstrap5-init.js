/**
 * Bootstrap 5 initialization for components that don't auto-init.
 *
 * Modals, dropdowns, tabs, collapses, alerts, and carousels self-instantiate
 * via `data-bs-toggle` / `data-bs-ride` — explicit `new bootstrap.X()` is only
 * needed for tooltips and popovers (which are opt-in for performance).
 */

ready(() => {
  $$('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
  $$('[data-bs-toggle="popover"]').forEach((el) => new bootstrap.Popover(el));
});
