# Chihuahua site icons

The site's browser, home-screen, PWA, and header icons use the same cream Chihuahua studying with a book as the qualification Instagram avatar.

Source: `instagram-automation/assets/qualification-campaign/ipa-avatar.png`, generated for this campaign using the built-in image generation tool and visually reviewed. The source artwork is reused unchanged; PNG assets are deterministic size conversions. `chihuahua-maskable-512.png` adds a pale blue safe area for launcher masks. Legacy SVG paths embed the same artwork so existing structured-data URLs remain valid.

Browser icon: `app/icon.png` and `public/favicon.png` (64 px). Apple icon: `app/apple-icon.png` (180 px). PWA icons: 192 and 512 px plus a separate maskable 512 px icon. Metadata and the manifest select PNG files. The service-worker cache version is bumped to refresh old cached icons.

Verified 2026-09-12: mobile home header rendered, every emitted icon link returned HTTP 200, and dimensions were checked during asset generation.
