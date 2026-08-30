# Changelog

## Unreleased
- Accept affiliate URLs only when they use `http` or `https`; unsafe or malformed affiliate URLs fall back to the fixed official tool URL and are not marked as paid links.
- Add regression coverage for affiliate URL fallback without changing ranking or local usage tracking.

## 1.0.0 - 2026-08-29
- First public version.
- Static creator/tool stack recommendation flow.
- Affiliate slots are disabled by default and disclosure-aware when enabled.
