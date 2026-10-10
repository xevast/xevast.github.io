# Xevast Official Website

Technology • Innovation • Excellence. This repository contains the official production source code for the Xevast website, providing web development, mobile apps, cloud & DevOps, cybersecurity, and AI solutions.

## 🚀 Live Demo
* **GitHub Pages:** [https://xevast.github.io](https://xevast.github.io)[cite: 12]

---

## 📂 Project Structure
* `index.html` — Main homepage entry point.
* `css/` — Stylesheets including `style.css`.
* `img/` — Brand assets, logos, and imagery (`logo.png`, `founder.jpg`, etc.).
* `js/` — JavaScript files (`main.js`, `leads.js`, `firebase-config.js`).
* `.nojekyll` — Configuration file to bypass Jekyll processing on GitHub Pages.

---

## 🛠️ Deployment Instructions

### Option 1: GitHub Pages (Recommended)
1. Create a public repository named `<your-username>.github.io`.
2. Upload all project files directly to the root directory (ensure `index.html` is at the top level, not nested inside another folder). Include the hidden `.nojekyll` file.
3. Navigate to **Repo Settings > Pages**.
4. Set **Source** to "Deploy from a branch" -> **Branch:** `main`, **Folder:** `/ (root)`, then click **Save**.
5. Wait 1–2 minutes for deployment.

### Option 2: Firebase Hosting (Alternative)
1. Install Firebase CLI: `npm install -g firebase-tools`[cite: 12]
2. Log in to your account: `firebase login`[cite: 12]
3. Initialize and deploy:
   ```bash
   firebase use --add
   firebase deploy --only hosting
