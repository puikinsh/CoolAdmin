# Font Awesome Migration Guide (4/5 → 6.7.2)

## Icon Class Changes

Font Awesome 6 introduced some changes to icon class names. Here are the most common ones that may need updating in CoolAdmin:

### Brand Icons
- All brand icons now use `fa-brands` instead of `fab`
- Example: `<i class="fab fa-twitter"></i>` → `<i class="fa-brands fa-twitter"></i>`

### Common Icon Updates
- `fa fa-*` → `fa-solid fa-*` (for solid icons)
- `far fa-*` → `fa-regular fa-*` (for regular icons)
- `fal fa-*` → `fa-light fa-*` (for light icons - Pro only)

### Renamed Icons
Some commonly used icons have been renamed:
- `fa-home` → `fa-house`
- `fa-tachometer` → `fa-gauge` or `fa-gauge-high`
- `fa-exchange` → `fa-arrow-right-arrow-left`
- `fa-chain` → `fa-link`
- `fa-calendar-o` → `fa-calendar`
- `fa-file-o` → `fa-file`

### Size Classes
Size classes remain the same:
- `fa-xs`, `fa-sm`, `fa-lg`, `fa-xl`, `fa-2x`, etc.

### Animation Classes
Animation classes remain the same:
- `fa-spin`, `fa-pulse`, `fa-beat`, `fa-fade`, etc.

## Migration Notes

1. Font Awesome 6.7.2 includes backward compatibility for most v4/v5 icons
2. The `fa` prefix still works for solid icons (most common)
3. New icons added in v6 won't work with old syntax
4. Consider using the more explicit `fa-solid`, `fa-regular`, `fa-brands` prefixes for clarity

## Testing

To ensure all icons display correctly:
1. Open each page and visually check icons
2. Look for missing icons (will show as squares)
3. Update any broken icon classes using the guide above