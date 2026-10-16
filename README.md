# Xevast Website

Official website of **Xevast** — Technology • Innovation • Excellence.
Web & software, cloud & IT, cybersecurity and AI services, plus Xevast Academy.

Live site: https://xevast.github.io

## What's inside
- 18 static pages: Home, Services, 4 division pages (Web, Cloud, Security, AI), Academy, Work, Pricing, About, Blog (3 articles), Contact, Privacy, 404 and a private admin page
- Dark / light / auto theme, settings drawer (text size, reduce motion, high contrast, effects on/off), site search (`Ctrl+K`)
- 3D hero (Three.js), budget estimator, rule-based chatbot, PWA (installable)
- Contact form that opens WhatsApp and can also save leads to Firebase

No build step. Plain HTML, CSS and JavaScript.

## Folder structure
```
index.html, services.html, web.html, cloud.html, security.html, ai.html,
academy.html, work.html, pricing.html, about.html, blog*.html, contact.html,
privacy.html, 404.html, admin.html
css/style.css    js/main.js    js/leads.js    js/firebase-config.js
img/             manifest.json sw.js          firebase.json
```

## Requirement form -> PDF
The floating **+** button (bottom-right) has WhatsApp, Call, Email and the **Requirement form** (all 16 questions from the Xevast form). On submit the visitor's browser creates a PDF (jsPDF) and offers "Send on WhatsApp" + download/share. Share a direct link with `#requirement` (for example `https://xevast.github.io/#requirement`). Automatic PDF delivery to your WhatsApp needs a backend (planned): Firebase Cloud Function + WhatsApp Business Cloud API.

## Install as an app (Android / Windows)
The site is a PWA: Chrome/Edge show an install prompt (Android: "Install app"; Windows: install icon in the address bar or the drawer's "Install app"). It opens in its own window, works offline for visited pages and has shortcuts (Requirement form, Services, Contact).
For store packages, use https://www.pwabuilder.com once the site is live on HTTPS: it can generate an Android package (APK/AAB, TWA) and a Windows (MSIX) package.

## Add your ads (home page billboard)
Photos go in `ads/images/`, videos in `ads/videos/`, then list the file names in `ads/ads.js`. Videos play muted with no controls and no timer. Details: `ads/README.txt`.

## Run locally
Open `index.html` in a browser, or run a local server: `npx serve .`

## Deploy
**GitHub Pages:** Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
Use the repository name `<username>.github.io` so the site opens at the root URL (needed for the 404 page).

**Firebase Hosting (optional):**
```
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only hosting
```

## Save contact-form leads to Firebase (optional)
1. Firebase console → create a project → add a Web app → enable **Firestore** and **Authentication (Email/Password)**.
2. Paste the web config into `js/firebase-config.js`.
3. Create your admin user in Authentication, then sign in at `/admin.html`.
4. Add your site domain (for example `xevast.github.io`) under Authentication → Settings → Authorized domains.
5. Firestore rules (replace `YOUR_EMAIL`):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{d}/documents {
    match /leads/{id} {
      allow create: if request.resource.data.keys().hasOnly(['name','budget','service','message','page','at'])
        && request.resource.data.name.size() < 200
        && request.resource.data.message.size() < 3000;
      allow read, delete: if request.auth != null && request.auth.token.email == 'YOUR_EMAIL';
    }
  }
}
```
Requirement-form submissions (optional) go to a `requirements` collection. Add this rule inside the `documents` block:
```
match /requirements/{id} {
  allow create: if request.resource.data.size() < 30 && request.resource.data.bn is string && request.resource.data.bn.size() < 200;
  allow read, delete: if request.auth != null && request.auth.token.email == 'YOUR_EMAIL';
}
```
The Firebase web config is public by design. Never commit service-account keys or passwords.

## Before going public — edit these
- Real client testimonials and case studies (`work.html`) when available
- Estimator add-on prices (`pricing.html`) and Academy tracks, dates and fees (`academy.html`)
- Review `privacy.html` with a professional
- Add `sitemap.xml` and canonical links once the final domain is fixed

## Contact
contactxevast@gmail.com • WhatsApp +91 83401 61172 • Instagram @xevast.official
