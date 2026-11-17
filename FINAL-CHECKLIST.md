# Final checklist (do in this order)

1. **Firebase project.** Create a project, add a Web app, enable **Firestore** and **Authentication**: turn on *Email/Password* and *Google*.
2. **Config.** Paste the web config into `js/firebase-config.js`. Until you do, the sign-in page shows "Accounts are not available yet" and forms show a call/email fallback.
3. **Authorised domains.** Authentication > Settings > Authorised domains: add your site domain (for example `xevast.github.io`).
4. **Rules.** Firestore > Rules: paste `firestore.rules` and publish. Roles live in `users/{uid}.role` (`client`, `employee`, `admin`).
5. **First admin.** Open `login.html`, create your own account, verify the email, then in Firestore open `users/<your uid>` and set `role` to `admin`. Admins sign in at `xevast-admin/` and employees at `xevast-employee/` (each a separate site, see `PORTALS.md`).
6. **Test the flow.** Create a client account, place an order from `portal.html`, change its status in the console, and check the client sees it.
7. **Forms.** Test the contact form, support ticket, Academy enquiry and the requirement form. Each must appear in the console.
8. **Deploy and refresh once.** The service worker cache is now `xevast-v31`, so do one hard refresh after deploying.

Not included from v30 (it used a different backend): `admin.html`, `xv-control/`, `portal/`, `functions/` (Razorpay and alerts) and the on-page text editor. The v16 console and portal are used instead.


## Update: portals
Admin and Team consoles are in `xevast-admin/` and `xevast-team/`, the client portal stays at `portal.html`, Academy is in `academy/`. See `../DEPLOY.md`.
