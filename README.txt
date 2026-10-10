XEVAST WEBSITE - SETUP
1. Upload this whole folder to Firebase Hosting / Netlify / GitHub Pages (site root).
2. Lead saving + admin inbox (optional):
   - Firebase console: create a project, add a Web app, enable Firestore and Authentication (Email/Password).
   - Paste the config into js/firebase-config.js.
   - Create your admin user in Authentication, then open /admin.html and sign in.
   - Firestore rules (replace YOUR_EMAIL):
     rules_version='2'; service cloud.firestore { match /databases/{d}/documents { match /leads/{id} {
       allow create: if request.resource.data.keys().hasOnly(['name','budget','service','message','page','at']) && request.resource.data.name.size()<200 && request.resource.data.message.size()<3000;
       allow read, delete: if request.auth!=null && request.auth.token.email=='YOUR_EMAIL'; } } }
3. Edit placeholders: testimonials, stats, calculator add-on prices (pricing.html), Academy tracks (academy.html), privacy.html (get it reviewed).
4. Add sitemap.xml once you know your domain.

GITHUB PAGES (live first)
1. github.com > New repository. Name it <your-username>.github.io (Public). This makes the site open at https://<your-username>.github.io/
2. Upload all files from this folder (index.html at the top level, not inside another folder). Include the hidden .nojekyll file.
3. Repo Settings > Pages > Source: "Deploy from a branch" > Branch: main, folder: / (root) > Save.
4. Wait 1-2 minutes, then open the URL shown on the Pages screen.
5. Later, for Firebase login on /admin.html: Firebase console > Authentication > Settings > Authorized domains > add <your-username>.github.io
Note: if you use a project repo (any other name), the site opens at /<repo>/ and 404.html will not load its styles. Use the <username>.github.io name or a custom domain.
Never commit service-account keys or passwords. The Firebase web config in js/firebase-config.js is public by design; the Firestore rules protect your data.

FIREBASE HOSTING (same files, optional alternative to GitHub Pages)
1. Install Node.js, then: npm install -g firebase-tools
2. In this folder: firebase login
3. firebase use --add   (choose your Firebase project)
4. firebase deploy --only hosting
Your site opens at https://<project-id>.web.app . 404.html is served automatically.
The same folder works on GitHub Pages; firebase.json is simply ignored there.
