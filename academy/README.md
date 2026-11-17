# Xevast Academy (separate app)

Folder `academy/` is its own installable PWA (own manifest + service worker), linked from the main site header (Academy menu).

| Page | What it does |
|---|---|
| index.html | Academy home |
| courses.html | Course list, syllabus, batch purchase |
| dashboard.html | Student: my courses, lesson tracking, skill test, offers, certificates (view / PDF / PNG) |
| internship.html | Openings and apply |
| skills.html, training.html | Skill certificates info, training enquiry |
| verify.html | Certificate verification by number |
| manage.html | Manager console: issue offer letter, complete internship (certificate), student progress, revoke, enquiries |

IDs: Registration `XVA-YYYY-0001`, Certificate `XVC-YYYY-00001`, Offer `XVO-YYYY-0001`.
Flow: apply → manager issues offer (auto letter) → intern accepts → manager completes → certificate auto-issued.
Course certificate at 100% lessons; skill certificate at 70%+ in the skill test.

## Important: storage
`js/core.js` keeps data in the browser's localStorage so everything works with no backend. Data is per browser/device, so a certificate issued on one device cannot be verified on another until the data layer is moved to Firebase (the main site already has Firebase config + `firestore.rules`). The manager code (`MGR_CODE` in core.js) and the "paid" flag are client-side placeholders, not security. Replace them with Firebase Auth roles and Razorpay before going live.

## Tests
`node --test academy/tests/core.test.js`
