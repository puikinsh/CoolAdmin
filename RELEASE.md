# v2.2.0 - December 2025 Dependency Updates

This release brings all dependencies to their latest December 2025 versions, including a major Swiper.js upgrade to v12 with CSS-only theming.

## What's Changed

### Dependency Upgrades

| Dependency | Previous | New | Notes |
|------------|----------|-----|-------|
| Font Awesome | 7.0.1 | **7.1.0** | Latest FA7 with 4,500+ new icons |
| Chart.js | 4.5.0 | **4.5.1** | Performance improvements, Chrome zoom fixes |
| Swiper.js | 11.2.10 | **12.0.3** | Major upgrade with CSS-only theming |
| Bootstrap | 5.3.8 | 5.3.8 | Already current |
| Perfect Scrollbar | 1.5.6 | 1.5.6 | Already current |

### Highlights

- **Font Awesome 7.1.0** - Latest FA7 release with improved icon architecture
- **Chart.js 4.5.1** - Fixes for charts shrinking on certain zoom values in Chrome
- **Swiper.js 12.0.3** - Major version upgrade:
  - Pure CSS theming via custom properties (no LESS/SCSS required)
  - Navigation icons reworked to eliminate font-icon issues and CSP false positives
  - Lighter bundle size
  - Virtual Slides improvements for `slidesPerView: 'auto'`

### Files Updated

- All 24 HTML files updated with new dependency references
- `README.md` - Updated badges and version info
- `CLAUDE.md` - Updated documentation
- `CHANGELOG.md` - Added v2.2.0 release notes

## Installation

No build process required. Simply download and open any HTML file in a browser, or use a local server:

```bash
python -m http.server 8000
```

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+
- Mobile Safari iOS 14+
- Chrome Mobile Android 8+

## Full Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete version history.
