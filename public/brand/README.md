# Chihuahua site icons

## Browser / home-screen / PWA icons (match the App Store icon)

Since 2026-11-06 the browser, home-screen and PWA icons are the same artwork as the
iOS App Store icon (`mobile/ios-assets/AppIcon.appiconset/AppIcon-1024.png`:
navy background, 「過去問AI」, Chihuahua holding a phone). They are deterministic Pillow
LANCZOS downscales of that 1024 px source:

- `app/favicon.ico` (16/32/48), `app/icon.png` and `public/favicon.png` (64 px)
- `app/apple-icon.png` (180 px)
- `public/icon-192.png`, `public/icon-512.png` (purpose `any`)
- `public/icon-maskable-192.png`, `public/icon-maskable-512.png` (art scaled to 80 % and
  centred on the source's navy `#012966` so launcher masks do not clip it)
- `public/favicon.svg`, `public/icon-192.svg`, `public/icon-512.svg` embed the same PNG so the
  legacy URLs (structured-data logo, service-worker notifications) stay valid.

The service-worker cache version is bumped whenever these change.

## Header logo (this folder)

`chihuahua-icon-192.png` / `chihuahua-icon-512.png` / `chihuahua-maskable-512.png` are the
cream Chihuahua studying with a book (source:
`instagram-automation/assets/qualification-campaign/ipa-avatar.png`). `components/SiteLogo.tsx`
still uses the 192 px file as the round header logo; they are no longer referenced by the
manifest or metadata.
