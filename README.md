# Life Admin V2.2

Phone-first Life Admin app for GitHub Pages testing.

## V2 features
- Custom inline SVG icon system matching the generated Life Admin visual direction
- Dashboard score and stats
- Search
- Working Items / Categories navigation views
- Category filtering
- Overdue / due soon / completed / cost filters
- Complete and reopen items
- Real recurring item generation on completion
- Item detail view
- Notes, provider and optional outgoing/incoming money value
- Local attachments for smaller files
- Incoming money tracking for wages and other recurring income
- Weekly recurring income
- Export/import JSON backup
- Local browser storage
- PWA manifest

## GitHub Pages
Upload the files to a repository root and enable Settings → Pages → Deploy from branch → main → / (root).

V2 remains local-first. No account or backend is required.

- Hardened delegated click handling for mobile navigation and dynamic UI.


V2.3 FIXES
- Fixed modal backdrop positioning.
- App startup now waits for DOM readiness.
- Added cache-busting version to app.js.
- Added explicit button types for Safari reliability.
- Preserved V2.2 data format/localStorage compatibility.
