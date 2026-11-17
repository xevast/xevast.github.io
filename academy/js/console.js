/* Xevast Academy Console. For Academy Admin and Academy Manager (and the main admin).
   No coding needed: add courses, skill courses and internships, upload modules (video, PDF, files), set prices, run offers and certificates.
   Access is enforced by firestore.rules / storage.rules (roles academy_admin, academy_manager, admin), not by this page. */
(function (g) {
'use strict';
var V = '10.12.0', B = 'https://www.gstatic.com/firebasejs/' + V + '/', C = g.XEVAST_FIREBASE;
var $ = function (s, r) { return (r || document).querySelector(s); };
var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
var db, auth, fns, FV, store, me = null, cache = {}, tab = 'overview', ED = null, users = {}, idleT = null;
var ROLES = { admin: 'Xevast Admin', academy_admin: 'Academy Admin', academy_manager: 'Academy Manager' };
var LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
var TYPES = [['video', 'Video'], ['pdf', 'PDF'], ['file', 'File / document'], ['link', 'Web link'], ['text', 'Text note']];
var MAX_MB = 500;

/* ---------- helpers ---------- */
function money(n) { n = Number(n || 0); return n > 0 ? '\u20B9' + n.toLocaleString('en-IN') : 'Free'; }
function today() { return new Date().toISOString().slice(0, 10); }
function toast(t, err) { var e = $('#toast'); e.textContent = t; e.className = 'on' + (err ? ' err' : ''); clearTimeout(toast.t); toast.t = setTimeout(function () { e.className = ''; }, 3600); }
function fail(e) { var m = (e && e.code === 'permission-denied') ? 'You are not allowed to do this.' : ((e && e.message) || 'Something went wrong'); toast(m, true); }
function val(id) { var e = document.getElementById(id); return e ? (e.type === 'checkbox' ? e.checked : String(e.value || '').trim()) : ''; }
function rows(s) { return s.docs.map(function (d) { return Object.assign({ _id: d.id }, d.data()); }); }
function safe(name) { return db.collection(name).limit(1000).get().then(rows).catch(function (e) { fail(e); return []; }); }
function rnd(n) { return Math.random().toString(36).slice(2, 2 + n); }
function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'course'; }
function load(src) { return new Promise(function (ok, no) { var s = document.createElement('script'); s.src = B + src; s.onload = ok; s.onerror = function () { no(new Error('Could not load Firebase. Check your internet connection.')); }; document.head.appendChild(s); }); }
function isAdminish() { return me && (me.role === 'admin' || me.role === 'academy_admin'); }
function uname(id) { var u = users[id]; return u ? (u.name || u.email || id) : id; }
function call(n, d) { return fns.httpsCallable(n)(d).then(function (r) { return r.data; }); }
function dlg(html) { var d = $('#dlg'); $('#dlgBody').innerHTML = html; if (!d.open) { if (d.showModal) d.showModal(); else d.setAttribute('open', ''); } }
function closeDlg() { var d = $('#dlg'); if (d.open) { if (d.close) d.close(); else d.removeAttribute('open'); } }
function tbl(head, body) { return body.length ? '<div class="tw"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + body.join('') + '</tbody></table></div>' : '<div class="empty">Nothing here yet.</div>'; }

/* ---------- gate ---------- */
function gate(msg, form, out) { $('#gate').hidden = false; $('#app').hidden = true; $('#gateMsg').textContent = msg; $('#loginForm').hidden = !form; $('#gateOut').hidden = !out; }
function idle() { clearTimeout(idleT); idleT = setTimeout(function () { if (auth && auth.currentUser) auth.signOut(); }, 60 * 60 * 1000); }
['click', 'keydown', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, function () { if (me) idle(); }, { passive: true }); });

function boot() {
  if (!C || String(C.apiKey).indexOf('PASTE') === 0) { gate('Firebase is not configured yet. Paste your web config into js/firebase-config.js (or run: npm run prepare).', false, false); return; }
  var ready = g.firebase ? Promise.resolve() : load('firebase-app-compat.js').then(function () { return Promise.all([load('firebase-auth-compat.js'), load('firebase-firestore-compat.js'), load('firebase-functions-compat.js'), load('firebase-storage-compat.js')]); });
  ready.then(function () {
    var fb = g.firebase; if (!fb.apps.length) fb.initializeApp(C);
    auth = fb.auth(); db = fb.firestore(); FV = fb.firestore.FieldValue; fns = fb.app().functions(C.region || 'asia-south1');
    store = fb.storage ? fb.storage() : null;
    auth.onAuthStateChanged(onAuth);
  }).catch(function (e) { gate(e.message, false, false); });
}
function onAuth(u) {
  me = null;
  if (!u) { gate('Sign in with your Academy account.', true, false); return; }
  gate('Checking access…', false, false);
  db.doc('users/' + u.uid).get().then(function (s) {
    var p = s.exists ? s.data() : null;
    if (p && ROLES[p.role] && p.active === true) { me = { uid: u.uid, email: u.email || '', name: p.name || '', role: p.role }; enter(); }
    else gate('This account does not have Academy staff access.', false, true);
  }).catch(function () { gate('Could not check access. Try again.', false, true); });
}
$('#loginForm').addEventListener('submit', function (ev) {
  ev.preventDefault(); var b = $('#loginBtn'); b.disabled = true;
  auth.signInWithEmailAndPassword(val('em'), $('#pw').value).catch(function (e) {
    var c = (e && e.code) || ''; $('#gateMsg').textContent = /invalid|wrong|not-found/.test(c) ? 'Incorrect email or password.' : c === 'auth/too-many-requests' ? 'Too many attempts. Wait a few minutes.' : 'Could not sign in.';
  }).then(function () { b.disabled = false; $('#pw').value = ''; });
});
function out() { if (auth) auth.signOut(); }
$('#gateOut').addEventListener('click', out); $('#out').addEventListener('click', out);
$('#dlgClose').addEventListener('click', closeDlg);

function enter() {
  $('#gate').hidden = true; $('#app').hidden = false; $('#whoEm').textContent = me.email; $('#whoRole').textContent = ROLES[me.role]; idle();
  go(tab);
}

/* ---------- navigation ---------- */
function tabs() {
  var t = [['overview', 'Overview'], ['course', 'Courses'], ['skill', 'Skill courses'], ['jobs', 'Internships'], ['apps', 'Internship applications'], ['enroll', 'Enrolments and payments'], ['track', 'Tracking and certificates'], ['certs', 'Certificates issued'], ['train', 'Training enquiries']];
  if (isAdminish()) t.push(['team', 'Academy team']);
  return t;
}
function drawTabs() { $('#tabs').innerHTML = tabs().map(function (t) { return '<button type="button" data-act="tab" data-t="' + t[0] + '"' + (t[0] === tab ? ' aria-current="page"' : '') + '>' + t[1] + '</button>'; }).join(''); }
function go(t) {
  tab = t; ED = null; drawTabs(); $('#main').innerHTML = '<p class="mu">Loading…</p>';
  var f = { overview: vOverview, course: function () { return vCatalog('course'); }, skill: function () { return vCatalog('skill'); }, jobs: vJobs, apps: vApps, enroll: vEnroll, track: vTrack, certs: vCerts, train: vTrain, team: vTeam }[t];
  Promise.resolve().then(f).catch(fail);
}
/* names of students: admin can list users, academy staff read them one by one (rules allow it) */
function loadUsers(ids) {
  var need = ids.filter(function (id) { return id && !users[id]; });
  return Promise.all(need.slice(0, 400).map(function (id) { return db.doc('users/' + id).get().then(function (s) { if (s.exists) users[id] = s.data(); }).catch(function () {}); }));
}

/* ---------- overview ---------- */
function vOverview() {
  return Promise.all([safe('acCourses'), safe('acJobs'), safe('acEnroll'), safe('acApps'), safe('acCerts')]).then(function (r) {
    var cs = r[0], cards = [[cs.filter(function (c) { return c.kind !== 'skill'; }).length, 'Courses'], [cs.filter(function (c) { return c.kind === 'skill'; }).length, 'Skill courses'], [r[1].filter(function (j) { return j.open !== false; }).length, 'Open internships'], [r[2].length, 'Enrolments'], [r[2].filter(function (e) { return !e.paid && Number(e.amount) > 0; }).length, 'Awaiting payment'], [r[3].filter(function (a) { return a.status === 'applied'; }).length, 'Applications waiting'], [r[4].length, 'Certificates']];
    $('#main').innerHTML = '<h2>Overview</h2><p class="sub">Signed in as ' + esc(me.email) + ' (' + esc(ROLES[me.role]) + '). Add courses, skill courses and internships from the tabs on the left. No coding needed.</p><div class="cards">' +
      cards.map(function (c) { return '<div class="card"><b>' + c[0] + '</b><span>' + c[1] + '</span></div>'; }).join('') + '</div>' +
      (!cs.length ? '<div class="ed"><h3>Start here</h3><p class="mu">Your catalogue is empty. Import the 7 starter courses (with lessons and tests) and edit them, or add your own from <b>Courses</b>.</p><button class="btn" data-act="seed-courses" type="button">Import starter courses</button></div>' : '');
  });
}

/* ---------- catalogue (courses and skill courses) ---------- */
function vCatalog(kind) {
  return safe('acCourses').then(function (all) {
    cache.courses = all; var list = all.filter(function (c) { return (c.kind || 'course') === kind; });
    var label = kind === 'skill' ? 'skill course' : 'course';
    $('#main').innerHTML = '<h2>' + (kind === 'skill' ? 'Skill courses' : 'Courses') + '</h2><p class="sub">' + (kind === 'skill' ? 'Short skill programmes. Students learn the modules and pass a test to earn a skill certificate.' : 'Full courses with modules and lessons. Students finish all lessons to earn a course certificate; an optional test gives a skill certificate.') + '</p>' +
      '<div class="bar"><button class="btn" data-act="c-new" data-k="' + kind + '" type="button">+ Add ' + label + '</button>' + (!all.length ? '<button class="btn ghost" data-act="seed-courses" type="button">Import starter courses</button>' : '') + '</div>' +
      tbl(['Name', 'Level', 'Duration', 'Price', 'Lessons', 'Test', 'Status', ''], list.map(function (c) {
        var n = (c.modules || []).reduce(function (s, m) { return s + (m.lessons || []).length; }, 0);
        return '<tr><td><b>' + esc(c.name) + '</b><br><span class="mu">' + esc(c._id) + '</span></td><td>' + esc(c.level) + '</td><td>' + esc(c.dur) + '</td><td>' + money(c.price) + '</td><td>' + n + '</td><td>' + ((c.quiz || []).length ? (c.quiz.length + ' Qs') : '-') + '</td><td><span class="tag ' + (c.published !== false ? 'ok' : 'off') + '">' + (c.published !== false ? 'live' : 'hidden') + '</span></td><td><button class="btn sm" data-act="c-edit" data-k="' + esc(c._id) + '" type="button">Edit</button> ' +
          '<button class="btn ghost sm" data-act="c-toggle" data-k="' + esc(c._id) + '" type="button">' + (c.published !== false ? 'Hide' : 'Publish') + '</button>' + (isAdminish() ? ' <button class="btn danger sm" data-act="c-del" data-k="' + esc(c._id) + '" type="button">Delete</button>' : '') + '</td></tr>';
      }));
  });
}
function blankCourse(kind) { return { id: '', kind: kind, name: '', level: 'Beginner', dur: '', price: 0, desc: '', pass: 70, published: true, modules: [{ id: 'm' + rnd(6), title: 'Module 1', lessons: [blankLesson()] }], quiz: [] }; }
function blankLesson() { return { id: 'l' + rnd(7), title: '', type: 'video', url: '', text: '' }; }
function editCourse(id, kind) {
  if (id) {
    return db.doc('acCourses/' + id).get().then(function (s) {
      if (!s.exists) throw new Error('Course not found'); var c = s.data();
      return db.doc('acKeys/' + id).get().then(function (k) {
        var ans = k.exists ? (k.data().answers || []) : [];
        ED = { id: id, kind: c.kind || 'course', name: c.name || '', level: c.level || 'Beginner', dur: c.dur || '', price: Number(c.price) || 0, desc: c.desc || '', pass: c.pass || 70, published: c.published !== false, createdBy: c.createdBy || '',
          modules: (c.modules || []).map(function (m) { return { id: m.id, title: m.title || '', lessons: (m.lessons || []).map(function (l) { return { id: l.id, title: l.title || '', type: l.type || 'text', url: l.url || '', text: l.text || '' }; }) }; }),
          quiz: (c.quiz || []).map(function (q, i) { var o = (q.o || []).slice(0, 4); while (o.length < 4) o.push(''); return { q: q.q || '', o: o, a: Number(ans[i]) || 0 }; }) };
        drawEditor();
      });
    });
  }
  ED = blankCourse(kind); drawEditor(); return Promise.resolve();
}
function drawEditor() {
  var c = ED, kindLabel = c.kind === 'skill' ? 'Skill course' : 'Course';
  var h = '<p><button class="btn ghost sm" data-act="c-back" type="button">← Back</button></p><h2>' + (c.id ? 'Edit' : 'New') + ' ' + kindLabel.toLowerCase() + '</h2><p class="sub">Fill the form, add modules and lessons, upload your files, set the price and press Save. Students see it as soon as it is live.</p>' +
    '<div class="ed"><h3>Details</h3><div class="row2"><label>Name<input data-p="name" maxlength="100" value="' + esc(c.name) + '" placeholder="e.g. Python for Beginners"></label>' +
    '<label>Type<select data-p="kind"><option value="course"' + (c.kind === 'course' ? ' selected' : '') + '>Course</option><option value="skill"' + (c.kind === 'skill' ? ' selected' : '') + '>Skill course</option></select></label></div>' +
    '<div class="row2"><label>Level<select data-p="level">' + LEVELS.map(function (l) { return '<option' + (c.level === l ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select></label><label>Duration<input data-p="dur" maxlength="30" value="' + esc(c.dur) + '" placeholder="e.g. 8 weeks"></label></div>' +
    '<div class="row2"><label>Price in \u20B9 (0 = free)<input data-p="price" type="number" min="0" max="1000000" step="1" value="' + esc(c.price) + '"></label><label>Pass mark for the test (%)<input data-p="pass" type="number" min="1" max="100" value="' + esc(c.pass) + '"></label></div>' +
    '<label>Description (shown to students)<textarea data-p="desc" rows="4" maxlength="3000">' + esc(c.desc) + '</textarea></label>' +
    '<label style="display:flex;gap:8px;align-items:center"><input data-p="published" type="checkbox"' + (c.published ? ' checked' : '') + ' style="width:auto"> Live (visible to students)</label></div>' +
    '<div class="ed"><h3>Modules and lessons</h3>' + c.modules.map(modHtml).join('') + '<button class="btn ghost sm" data-act="m-add" type="button">+ Add module</button></div>' +
    '<div class="ed"><h3>Test (required for courses and skill courses)</h3><p class="mu">Multiple choice. Answers are stored privately; students never see them. A learner must reach the pass mark before you can issue the certificate.</p>' + c.quiz.map(qHtml).join('') + '<button class="btn ghost sm" data-act="q-add" type="button">+ Add question</button></div>' +
    '<div class="acts"><button class="btn" data-act="c-save" type="button">Save ' + kindLabel.toLowerCase() + '</button><button class="btn ghost" data-act="c-back" type="button">Cancel</button></div>';
  $('#main').innerHTML = h;
}
function modHtml(m, i) {
  return '<div class="mod"><div class="row2"><label>Module ' + (i + 1) + ' title<input data-p="modules.' + i + '.title" maxlength="100" value="' + esc(m.title) + '"></label>' +
    '<div class="acts" style="margin-top:22px"><button class="btn ghost sm" data-act="m-up" data-i="' + i + '" type="button">↑</button><button class="btn ghost sm" data-act="m-down" data-i="' + i + '" type="button">↓</button><button class="btn danger sm" data-act="m-del" data-i="' + i + '" type="button">Remove module</button></div></div>' +
    m.lessons.map(function (l, j) { return lesHtml(l, i, j); }).join('') + '<button class="btn ghost sm" data-act="l-add" data-i="' + i + '" type="button">+ Add lesson</button></div>';
}
function lesHtml(l, i, j) {
  var p = 'modules.' + i + '.lessons.' + j, needUrl = l.type !== 'text', up = l.type === 'video' || l.type === 'pdf' || l.type === 'file';
  return '<div class="les"><div class="row2"><label>Lesson ' + (j + 1) + ' title<input data-p="' + p + '.title" maxlength="120" value="' + esc(l.title) + '"></label><label>Material type<select data-p="' + p + '.type" data-re="1">' + TYPES.map(function (t) { return '<option value="' + t[0] + '"' + (l.type === t[0] ? ' selected' : '') + '>' + t[1] + '</option>'; }).join('') + '</select></label></div>' +
    (needUrl ? '<label>' + (up ? 'Upload a file or paste a link (YouTube, Drive, any https link)' : 'Link (https://)') + '<input data-p="' + p + '.url" maxlength="1000" value="' + esc(l.url) + '" placeholder="https://..."></label>' : '') +
    (up ? '<div class="acts" style="margin:0 0 8px"><input type="file" id="f-' + i + '-' + j + '" style="display:none" accept="video/*,application/pdf,image/*,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.txt"><button class="btn ghost sm" data-act="l-up" data-i="' + i + '" data-j="' + j + '" type="button">Upload file</button><span class="mu" id="fs-' + i + '-' + j + '">' + (l.url && /firebasestorage|storage\.googleapis/.test(l.url) ? 'File uploaded' : '') + '</span></div><div class="prog" id="fp-' + i + '-' + j + '" hidden><i></i></div>' : '') +
    '<label>' + (needUrl ? 'Notes for students (optional)' : 'Lesson text') + '<textarea data-p="' + p + '.text" rows="' + (needUrl ? 2 : 6) + '" maxlength="20000">' + esc(l.text) + '</textarea></label>' +
    '<div class="acts" style="margin:0"><button class="btn ghost sm" data-act="l-up-move" data-i="' + i + '" data-j="' + j + '" type="button">↑</button><button class="btn ghost sm" data-act="l-down" data-i="' + i + '" data-j="' + j + '" type="button">↓</button><button class="btn danger sm" data-act="l-del" data-i="' + i + '" data-j="' + j + '" type="button">Remove lesson</button></div></div>';
}
function qHtml(q, i) {
  return '<div class="q"><label>Question ' + (i + 1) + '<input data-p="quiz.' + i + '.q" maxlength="300" value="' + esc(q.q) + '"></label><div class="row2">' + [0, 1, 2, 3].map(function (k) { return '<label>Option ' + 'ABCD'[k] + '<input data-p="quiz.' + i + '.o.' + k + '" maxlength="200" value="' + esc(q.o[k]) + '"></label>'; }).join('') + '</div>' +
    '<div class="row2"><label>Correct answer<select data-p="quiz.' + i + '.a">' + [0, 1, 2, 3].map(function (k) { return '<option value="' + k + '"' + (q.a === k ? ' selected' : '') + '>Option ' + 'ABCD'[k] + '</option>'; }).join('') + '</select></label><div class="acts" style="margin-top:22px"><button class="btn danger sm" data-act="q-del" data-i="' + i + '" type="button">Remove question</button></div></div></div>';
}
/* write an input value into ED by its path, e.g. modules.0.lessons.1.title */
function setPath(path, v) {
  var ks = path.split('.'), o = ED; for (var i = 0; i < ks.length - 1; i++) o = o[ks[i]];
  var k = ks[ks.length - 1]; if (/^(price|pass|a)$/.test(k)) v = Number(v) || 0; o[k] = v;
}
function move(arr, i, d) { var j = i + d; if (j < 0 || j >= arr.length) return; var t = arr[i]; arr[i] = arr[j]; arr[j] = t; }

function checkCourse() {
  var c = ED; if (!c.name.trim()) return 'Give the ' + (c.kind === 'skill' ? 'skill course' : 'course') + ' a name';
  if (!(c.price >= 0) || c.price > 1000000) return 'Price must be between 0 and 10,00,000';
  if (!(c.pass >= 1 && c.pass <= 100)) return 'Pass mark must be between 1 and 100';
  if (!c.modules.length || !c.modules.some(function (m) { return m.lessons.length; })) return 'Add at least one module with one lesson';
  for (var i = 0; i < c.modules.length; i++) {
    var m = c.modules[i]; if (!m.title.trim()) return 'Module ' + (i + 1) + ' needs a title';
    for (var j = 0; j < m.lessons.length; j++) {
      var l = m.lessons[j], at = 'Module ' + (i + 1) + ', lesson ' + (j + 1);
      if (!l.title.trim()) return at + ' needs a title';
      if (l.type === 'text' && !l.text.trim()) return at + ' needs some text';
      if (l.type !== 'text' && l.url && !/^https?:\/\//i.test(l.url)) return at + ': the link must start with https://';
    }
  }
  for (var k = 0; k < c.quiz.length; k++) {
    var q = c.quiz[k], opts = q.o.filter(function (x) { return x.trim(); });
    if (!q.q.trim()) return 'Question ' + (k + 1) + ' is empty';
    if (opts.length < 2) return 'Question ' + (k + 1) + ' needs at least 2 options';
    if (!q.o[q.a] || !q.o[q.a].trim()) return 'Question ' + (k + 1) + ': the correct answer is an empty option';
  }
  if (!c.quiz.length) return 'Add at least one test question. Both courses and skill courses need a test.';
  return '';
}
function saveCourse() {
  var err = checkCourse(); if (err) { toast(err, true); return; }
  var c = ED, id = c.id || (slug(c.name) + '-' + rnd(4)), answers = [];
  var quiz = c.quiz.map(function (q) {
    var o = [], a = 0; q.o.forEach(function (x, k) { if (x.trim()) { if (k === q.a) a = o.length; o.push(x.trim().slice(0, 200)); } });
    answers.push(a); return { q: q.q.trim().slice(0, 300), o: o };
  });
  var doc = { kind: c.kind, name: c.name.trim().slice(0, 100), level: c.level, dur: c.dur.trim().slice(0, 30), price: Math.round(c.price), desc: c.desc.trim().slice(0, 3000), pass: Math.round(c.pass), published: !!c.published,
    modules: c.modules.map(function (m) { return { id: m.id, title: m.title.trim().slice(0, 100), lessons: m.lessons.map(function (l) { return { id: l.id, title: l.title.trim().slice(0, 120), type: l.type, url: l.type === 'text' ? '' : String(l.url || '').trim().slice(0, 1000), text: String(l.text || '').slice(0, 20000) }; }) }; }),
    quiz: quiz, updatedAt: FV.serverTimestamp(), updatedBy: me.uid };
  if (!c.id) { doc.createdAt = FV.serverTimestamp(); doc.createdBy = me.uid; }
  var b = db.batch(); b.set(db.doc('acCourses/' + id), doc, { merge: true }); b.set(db.doc('acKeys/' + id), { answers: answers });
  return b.commit().then(function () { toast('Saved. Students can see it' + (c.published ? ' now.' : ' once you publish it.')); ED = null; go(doc.kind === 'skill' ? 'skill' : 'course'); }).catch(fail);
}
function uploadLesson(i, j) {
  var inp = document.getElementById('f-' + i + '-' + j); if (!inp) return;
  if (!store) { toast('File upload is not available. Paste a link instead.', true); return; }
  inp.onchange = function () {
    var f = inp.files && inp.files[0]; if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) { toast('File is too large (max ' + MAX_MB + ' MB). Upload it to YouTube or Drive and paste the link.', true); return; }
    var l = ED.modules[i].lessons[j], cid = ED.id || 'new-' + me.uid, name = f.name.replace(/[^\w.\-]+/g, '_').slice(-80);
    var ref = store.ref('academy/' + cid + '/' + Date.now() + '-' + name), task = ref.put(f, { contentType: f.type || 'application/octet-stream' });
    var bar = document.getElementById('fp-' + i + '-' + j), st = document.getElementById('fs-' + i + '-' + j); bar.hidden = false;
    task.on('state_changed', function (s) { var p = Math.round(s.bytesTransferred / s.totalBytes * 100); bar.firstChild.style.width = p + '%'; st.textContent = 'Uploading ' + p + '%'; },
      function (e) { bar.hidden = true; st.textContent = ''; fail(e); },
      function () { ref.getDownloadURL().then(function (url) { l.url = url; if (/^video\//.test(f.type)) l.type = 'video'; else if (f.type === 'application/pdf') l.type = 'pdf'; else if (l.type === 'video' || l.type === 'pdf') l.type = 'file'; if (!l.title) l.title = f.name.replace(/\.[^.]+$/, ''); toast('Uploaded'); drawEditor(); }).catch(fail); });
  };
  inp.click();
}
function toggleCourse(id) {
  return db.doc('acCourses/' + id).get().then(function (s) { return db.doc('acCourses/' + id).update({ published: !(s.data().published !== false), updatedAt: FV.serverTimestamp(), updatedBy: me.uid }); }).then(function () { toast('Updated'); go(tab); }).catch(fail);
}
function delCourse(id) {
  if (!confirm('Delete this for good? Students who enrolled will lose access to it.')) return;
  var b = db.batch(); b.delete(db.doc('acCourses/' + id)); b.delete(db.doc('acKeys/' + id));
  return b.commit().then(function () { toast('Deleted'); go(tab); }).catch(fail);
}
function seedCourses() {
  var X = g.XVA; if (!X || !X.STARTERS) { toast('Starter data not found', true); return; }
  var b = db.batch();
  X.STARTERS.forEach(function (c) {
    b.set(db.doc('acCourses/' + c.id), { kind: 'course', name: c.name, level: c.level, dur: c.dur, price: c.price, desc: '', pass: 70, published: true,
      modules: c.modules.map(function (m) { return { id: m.id, title: m.title, lessons: m.lessons.map(function (l) { return { id: l.id, title: l.title, type: 'text', url: '', text: 'Add your material for this lesson: edit the course and upload a video or PDF, paste a link, or write the text here.' }; }) }; }),
      quiz: c.quiz.map(function (q) { return { q: q[0], o: q[1] }; }), createdAt: FV.serverTimestamp(), createdBy: me.uid, updatedAt: FV.serverTimestamp(), updatedBy: me.uid });
    b.set(db.doc('acKeys/' + c.id), { answers: c.quiz.map(function (q) { return q[2]; }) });
  });
  return b.commit().then(function () { toast('Starter courses imported. Edit them to add your material.'); go('course'); }).catch(fail);
}

/* ---------- internships ---------- */
var STARTER_JOBS = [['Web Development Intern', 'Web Development', 'Remote', '1 month'], ['Cybersecurity Intern', 'Cybersecurity', 'Remote', '2 months'], ['UI/UX Design Intern', 'UI/UX Design', 'Remote', '1 month'], ['Digital Marketing Intern', 'Digital Marketing', 'Remote', '1 month']];
function vJobs() {
  return safe('acJobs').then(function (jobs) {
    cache.jobs = jobs;
    $('#main').innerHTML = '<h2>Internships</h2><p class="sub">Openings students can apply to. After you select someone, issue the offer letter from <b>Applications</b>; the offer and certificate numbers are created automatically.</p><div class="bar"><button class="btn" data-act="j-new" type="button">+ Add internship</button>' + (!jobs.length ? '<button class="btn ghost" data-act="seed-jobs" type="button">Import starter internships</button>' : '') + '</div>' +
      tbl(['Title', 'Domain', 'Mode', 'Duration', 'Stipend', 'Status', ''], jobs.map(function (j) {
        return '<tr><td><b>' + esc(j.title) + '</b></td><td>' + esc(j.domain) + '</td><td>' + esc(j.mode) + '</td><td>' + esc(j.dur) + '</td><td>' + esc(j.stipend || 'Unpaid') + '</td><td><span class="tag ' + (j.open !== false ? 'ok' : 'off') + '">' + (j.open !== false ? 'open' : 'closed') + '</span></td><td><button class="btn sm" data-act="j-edit" data-k="' + esc(j._id) + '" type="button">Edit</button> <button class="btn ghost sm" data-act="j-toggle" data-k="' + esc(j._id) + '" type="button">' + (j.open !== false ? 'Close' : 'Reopen') + '</button>' + (isAdminish() ? ' <button class="btn danger sm" data-act="j-del" data-k="' + esc(j._id) + '" type="button">Delete</button>' : '') + '</td></tr>';
      }));
  });
}
function jobForm(id) {
  var j = id ? (cache.jobs || []).filter(function (x) { return x._id === id; })[0] : null; j = j || { title: '', domain: '', mode: 'Remote', dur: '1 month', stipend: 'Unpaid', desc: '', open: true };
  dlg('<h2>' + (id ? 'Edit' : 'Add') + ' internship</h2><label>Title<input id="jt" maxlength="100" value="' + esc(j.title) + '" placeholder="e.g. Web Development Intern"></label><div class="row2"><label>Domain<input id="jd" maxlength="60" value="' + esc(j.domain) + '"></label><label>Mode<select id="jm">' + ['Remote', 'On-site', 'Hybrid'].map(function (m) { return '<option' + (j.mode === m ? ' selected' : '') + '>' + m + '</option>'; }).join('') + '</select></label></div>' +
    '<div class="row2"><label>Duration<input id="jr" maxlength="30" value="' + esc(j.dur) + '"></label><label>Stipend<input id="js" maxlength="60" value="' + esc(j.stipend || 'Unpaid') + '"></label></div><label>What the intern will do (shown to students)<textarea id="jx" rows="5" maxlength="2000">' + esc(j.desc || '') + '</textarea></label>' +
    '<label style="display:flex;gap:8px;align-items:center"><input id="jo" type="checkbox"' + (j.open !== false ? ' checked' : '') + ' style="width:auto"> Open for applications</label><button class="btn" data-act="j-save" data-k="' + esc(id || '') + '" type="button">Save</button>');
}
function saveJob(id) {
  if (!val('jt') || !val('jd')) { toast('Title and domain are required', true); return; }
  var d = { title: val('jt').slice(0, 100), domain: val('jd').slice(0, 60), mode: val('jm'), dur: val('jr').slice(0, 30) || '1 month', stipend: val('js').slice(0, 60) || 'Unpaid', desc: val('jx').slice(0, 2000), open: !!val('jo') };
  var p = id ? db.doc('acJobs/' + id).update(d) : db.collection('acJobs').add(d);
  return p.then(function () { toast('Saved'); closeDlg(); go('jobs'); }).catch(fail);
}

/* ---------- applications, offers ---------- */
function vApps() {
  return Promise.all([safe('acApps'), safe('acJobs'), safe('acOffers')]).then(function (r) {
    var apps = r[0], jobs = {}; r[1].forEach(function (j) { jobs[j._id] = j; }); cache.offers = r[2];
    return loadUsers(apps.map(function (a) { return a.userId; })).then(function () {
      $('#main').innerHTML = '<h2>Applications</h2><p class="sub">Select an applicant, issue the offer letter, and after the internship is accepted and done, complete it to issue the certificate.</p>' + tbl(['Applicant', 'Opening', 'Note', 'Applied', 'Status', ''], apps.sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); }).map(function (a) {
        var j = jobs[a.jobId], btn = a.status === 'applied' ? '<button class="btn sm" data-act="ac-offer" data-k="' + esc(a._id) + '" type="button">Issue offer</button>' : a.status === 'accepted' ? '<button class="btn sm" data-act="ac-complete" data-k="' + esc(a._id) + '" type="button">Complete and certify</button>' : '';
        return '<tr><td>' + esc(uname(a.userId)) + '<br><span class="mu">' + esc((users[a.userId] || {}).email || '') + '</span></td><td>' + esc(j ? j.title : a.jobId) + '</td><td class="trunc">' + esc(a.note) + '</td><td>' + esc(a.at) + '</td><td><span class="tag">' + esc(a.status) + '</span></td><td>' + btn + '</td></tr>';
      }));
    });
  });
}
function offerForm(id) {
  dlg('<h2>Issue offer letter</h2><p class="mu">The offer number (XVO-year-number) and letter are created on the server.</p><div class="row2"><label>Start date<input id="of1" type="date" value="' + today() + '"></label><label>End date<input id="of2" type="date"></label><label>Mode<select id="of3"><option>Remote</option><option>On-site</option><option>Hybrid</option></select></label><label>Stipend<input id="of4" value="Unpaid" maxlength="60"></label></div><button class="btn" data-act="ac-offer-go" data-k="' + esc(id) + '" type="button">Issue offer</button>');
}
function offerGo(id) {
  if (!val('of1') || !val('of2')) { toast('Choose start and end dates', true); return; }
  return call('acCreateOffer', { appId: id, start: val('of1'), end: val('of2'), mode: val('of3'), stipend: val('of4') }).then(function (o) { toast('Offer ' + (o.ref || '') + ' issued'); closeDlg(); go('apps'); }).catch(fail);
}

/* ---------- enrolments, certificates, training ---------- */
function vEnroll() {
  return Promise.all([safe('acEnroll'), safe('acCourses')]).then(function (r) {
    var cs = {}; r[1].forEach(function (c) { cs[c._id] = c; });
    return loadUsers(r[0].map(function (e) { return e.userId; })).then(function () {
      $('#main').innerHTML = '<h2>Enrolments</h2><p class="sub">Students unlock paid lessons after you confirm their payment' + (isAdminish() ? '.' : '. Only the Academy Admin can mark payments.') + '</p>' + tbl(['Student', 'Course', 'Batch', 'Amount', 'Lessons done', 'Test', 'Paid', ''], r[0].sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); }).map(function (e) {
        var c = cs[e.courseId], n = Object.keys(e.done || {}).length, tot = c ? (c.modules || []).reduce(function (s, m) { return s + (m.lessons || []).length; }, 0) : 0;
        return '<tr><td>' + esc(uname(e.userId)) + '<br><span class="mu">' + esc((users[e.userId] || {}).regId || '') + '</span></td><td>' + esc(c ? c.name : e.courseId) + '</td><td>' + esc(e.batchId) + '</td><td>' + money(e.amount) + '</td><td>' + n + (tot ? '/' + tot : '') + '</td><td>' + (e.skill ? e.skill.score + '%' : '-') + '</td><td><span class="tag ' + (e.paid ? 'ok' : '') + '">' + (e.paid ? 'paid' : 'unpaid') + '</span></td><td>' + (isAdminish() ? '<button class="btn ghost sm" data-act="en-paid" data-k="' + esc(e._id) + '" type="button">' + (e.paid ? 'Mark unpaid' : 'Mark paid') + '</button>' : '') + '</td></tr>';
      }));
    });
  });
}
/* ---------- tracking: staff record progress and issue certificates. Students cannot edit any of this. ---------- */
function elig(e, c) {
  var why = [], ids = []; (c.modules || []).forEach(function (m) { (m.lessons || []).forEach(function (l) { ids.push(l.id); }); });
  var n = ids.filter(function (l) { return e.done && e.done[l]; }).length, pass = Number(c.pass) || 70;
  if (!ids.length || n < ids.length) why.push('Lessons ' + n + '/' + ids.length + ' done');
  if ((c.quiz || []).length && !(e.skill && e.skill.score >= pass)) why.push(e.skill ? 'Test score ' + e.skill.score + '% (pass ' + pass + '%)' : 'Test not taken');
  if (Number(c.price) > 0 && !e.paid) why.push('Payment pending');
  return { ok: !why.length, why: why, n: n, total: ids.length };
}
function vTrack() {
  return Promise.all([safe('acEnroll'), safe('acCourses'), safe('acCerts')]).then(function (r) {
    cache.enr = r[0]; cache.cs = {}; r[1].forEach(function (c) { cache.cs[c._id] = c; }); cache.certs = r[2];
    return loadUsers(r[0].map(function (e) { return e.userId; })).then(function () {
      $('#main').innerHTML = '<h2>Tracking and certificates</h2><p class="sub">You record each learner\'s progress here and issue their certificate. Learners can only watch lessons and take the test; they cannot change progress or issue certificates. A certificate needs: all lessons done, the test passed, and payment confirmed for paid courses.</p>' +
        '<div class="bar"><input id="tq" placeholder="Search student or course" aria-label="Search"></div><div id="tt"></div>';
      drawTrack(); $('#tq').addEventListener('input', drawTrack);
    });
  });
}
function certOf(e) { return (cache.certs || []).filter(function (c) { return c.userId === e.userId && c.ref === e.courseId && !c.revoked; })[0]; }
function drawTrack() {
  var q = ($('#tq') ? $('#tq').value : '').toLowerCase(), l = (cache.enr || []).filter(function (e) { var c = cache.cs[e.courseId]; return !q || (uname(e.userId) + ' ' + (c ? c.name : e.courseId) + ' ' + ((users[e.userId] || {}).regId || '')).toLowerCase().indexOf(q) >= 0; });
  $('#tt').innerHTML = tbl(['Student', 'Course', 'Lessons', 'Test', 'Paid', 'Certificate', ''], l.sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); }).map(function (e) {
    var c = cache.cs[e.courseId]; if (!c) return '';
    var el = elig(e, c), ct = certOf(e);
    return '<tr><td>' + esc(uname(e.userId)) + '<br><span class="mu">' + esc((users[e.userId] || {}).regId || '') + '</span></td><td>' + esc(c.name) + '<br><span class="mu">' + (c.kind === 'skill' ? 'Skill course' : 'Course') + '</span></td><td>' + el.n + '/' + el.total + '</td><td>' + (e.skill ? e.skill.score + '%' : '-') + '</td><td><span class="tag ' + (e.paid || !(Number(c.price) > 0) ? 'ok' : '') + '">' + (Number(c.price) > 0 ? (e.paid ? 'paid' : 'unpaid') : 'free') + '</span></td><td>' + (ct ? '<span class="tag ok">' + esc(ct.certNo || ct._id) + '</span>' : el.ok ? '<span class="tag ok">ready to issue</span>' : '<span class="tag">not yet</span>') + '</td><td><button class="btn sm" data-act="tr-open" data-k="' + esc(e._id) + '" type="button">Open</button></td></tr>';
  }));
}
function openTrack(id) {
  var e = (cache.enr || []).filter(function (x) { return x._id === id; })[0], c = e && cache.cs[e.courseId]; if (!e || !c) return;
  var el = elig(e, c), ct = certOf(e), u = users[e.userId] || {};
  dlg('<h2>' + esc(uname(e.userId)) + '</h2><p class="mu">' + esc(u.regId || '') + ' · ' + esc(u.email || '') + ' · ' + esc(c.name) + '</p>' +
    '<h3>Lessons (' + el.n + '/' + el.total + ')</h3><div class="bar"><button class="btn ghost sm" data-act="tr-all" data-k="' + esc(id) + '" type="button">Mark all done</button><button class="btn ghost sm" data-act="tr-none" data-k="' + esc(id) + '" type="button">Clear all</button></div>' +
    (c.modules || []).map(function (m) { return '<p style="margin:10px 0 4px"><b>' + esc(m.title) + '</b></p>' + (m.lessons || []).map(function (l) { return '<label class="ck" style="margin:2px 0"><input type="checkbox" data-tr="' + esc(l.id) + '" data-k="' + esc(id) + '"' + (e.done && e.done[l.id] ? ' checked' : '') + ' style="width:auto"> ' + esc(l.title) + (e.done && e.done[l.id] ? ' <span class="mu">(' + esc(e.done[l.id]) + ')</span>' : '') + '</label>'; }).join(''); }).join('') +
    '<h3>Test</h3><p>' + ((c.quiz || []).length ? (e.skill ? 'Score <b>' + e.skill.score + '%</b> (pass ' + (c.pass || 70) + '%), ' + (e.skill.attempts || 1) + ' attempt(s), last on ' + esc(e.skill.at) : 'Not taken yet') : 'No test') + '</p>' +
    '<h3>Certificate</h3>' + (ct ? '<p class="msg">Issued: <b>' + esc(ct.certNo || ct._id) + '</b> on ' + esc(ct.issued) + '</p>' : el.ok ? '<p class="mu">Eligible. The certificate will be issued to: <b>' + esc(u.name || '') + '</b> (' + esc(u.regId || '') + '). Check the name is correct.</p><button class="btn" data-act="tr-issue" data-k="' + esc(id) + '" type="button">Issue certificate</button>' : '<p class="mu">Not eligible yet: ' + esc(el.why.join('; ')) + '.</p>'));
}
function setLesson(id, lid, on) {
  var e = cache.enr.filter(function (x) { return x._id === id; })[0]; if (!e) return Promise.resolve();
  var up = {}; up['done.' + lid] = on ? today() : FV.delete();
  return db.doc('acEnroll/' + id).update(up).then(function () { e.done = e.done || {}; if (on) e.done[lid] = today(); else delete e.done[lid]; }).catch(fail);
}
function setAll(id, on) {
  var e = cache.enr.filter(function (x) { return x._id === id; })[0], c = e && cache.cs[e.courseId]; if (!c) return;
  var done = {}; if (on) (c.modules || []).forEach(function (m) { (m.lessons || []).forEach(function (l) { done[l.id] = (e.done && e.done[l.id]) || today(); }); });
  return db.doc('acEnroll/' + id).update({ done: done }).then(function () { e.done = done; openTrack(id); drawTrack(); }).catch(fail);
}
function issueCert(id) {
  return call('acIssueCert', { enrollId: id }).then(function (c) { toast('Certificate ' + (c.certNo || '') + ' issued'); closeDlg(); return vTrack(); }).catch(fail);
}

function vCerts() {
  return safe('acCerts').then(function (cs) {
    $('#main').innerHTML = '<h2>Certificates</h2><p class="sub">Numbers look like XVC-2026-00001. Anyone can verify one on the Academy site.</p>' + tbl(['Number', 'Name', 'Type', 'Title', 'Issued', 'Status', ''], cs.sort(function (a, b) { return String(b.issued).localeCompare(String(a.issued)); }).map(function (c) {
      return '<tr><td>' + esc(c._id) + '</td><td>' + esc(c.name) + '<br><span class="mu">' + esc(c.regId) + '</span></td><td>' + esc(c.type) + '</td><td>' + esc(c.title) + '</td><td>' + esc(c.issued) + '</td><td><span class="tag ' + (c.revoked ? '' : 'ok') + '">' + (c.revoked ? 'revoked' : 'valid') + '</span></td><td>' + (isAdminish() ? '<button class="btn ghost sm" data-act="cert-toggle" data-k="' + esc(c._id) + '" type="button">' + (c.revoked ? 'Restore' : 'Revoke') + '</button>' : '') + '</td></tr>';
    }));
  });
}
function vTrain() {
  return safe('acTrain').then(function (t) {
    $('#main').innerHTML = '<h2>Training enquiries</h2><p class="sub">Workshops and college or company training requests from the Academy site.</p>' + tbl(['Date', 'Name', 'College / company', 'Topic', 'Mode', 'Phone'], t.sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); }).map(function (x) {
      return '<tr><td>' + esc(x.at) + '</td><td>' + esc(x.name) + '</td><td>' + esc(x.org) + '</td><td>' + esc(x.topic) + '</td><td>' + esc(x.mode) + '</td><td>' + esc(x.phone) + '</td></tr>';
    }));
  });
}

/* ---------- team (Academy Admin and Xevast Admin only) ---------- */
function vTeam() {
  return safe('acStaff').then(function (st) {
    $('#main').innerHTML = '<h2>Academy team</h2><p class="sub">' + (me.role === 'admin' ? 'Academy Admins and Managers. You can also add Academy Admins from here.' : 'Add Academy Managers. They can add courses, skill courses and internships, but cannot delete, revoke certificates or mark payments.') + '</p><div class="bar"><button class="btn" data-act="t-new" type="button">+ Add team member</button></div>' +
      tbl(['Name', 'Email', 'Role', 'Status', ''], st.map(function (s) {
        var can = s._id !== me.uid && (me.role === 'admin' || s.role === 'academy_manager');
        return '<tr><td>' + esc(s.name) + '</td><td>' + esc(s.email) + '</td><td>' + esc(ROLES[s.role] || s.role) + '</td><td><span class="tag ' + (s.active !== false ? 'ok' : 'off') + '">' + (s.active !== false ? 'active' : 'disabled') + '</span></td><td>' + (can ? '<button class="btn ghost sm" data-act="t-toggle" data-k="' + esc(s._id) + '" data-a="' + (s.active !== false ? '0' : '1') + '" type="button">' + (s.active !== false ? 'Disable' : 'Enable') + '</button>' : '') + '</td></tr>';
      }));
  });
}
function teamForm() {
  dlg('<h2>Add team member</h2><p class="mu">The account is created now. Share the email and password with the person; they sign in on this page.</p><label>Full name<input id="tn" maxlength="80"></label><label>Email<input id="te" type="email" maxlength="120"></label><label>Temporary password (8+ characters)<input id="tp" type="text" minlength="8" maxlength="60" autocomplete="off"></label>' +
    '<label>Role<select id="tr"><option value="academy_manager">Academy Manager</option>' + (me.role === 'admin' ? '<option value="academy_admin">Academy Admin</option>' : '') + '</select></label><button class="btn" data-act="t-save" type="button">Create account</button>');
}
function teamSave() {
  var n = val('tn'), e = val('te'), p = val('tp'), r = val('tr');
  if (!n || !/^\S+@\S+\.\S+$/.test(e) || p.length < 8) { toast('Enter a name, a valid email and a password of 8+ characters', true); return; }
  return call('staffCreate', { name: n, email: e, password: p, role: r }).then(function () { toast('Account created'); closeDlg(); go('team'); }).catch(fail);
}

/* ---------- events ---------- */
document.addEventListener('input', function (ev) {
  var t = ev.target; if (!ED || !t.dataset || !t.dataset.p) return;
  setPath(t.dataset.p, t.type === 'checkbox' ? t.checked : t.value);
});
document.addEventListener('change', function (ev) {
  var tr = ev.target; if (tr.dataset && tr.dataset.tr) { setLesson(tr.dataset.k, tr.dataset.tr, tr.checked).then(function () { openTrack(tr.dataset.k); drawTrack(); }); return; }
  var t = ev.target; if (!ED || !t.dataset || !t.dataset.p) return;
  setPath(t.dataset.p, t.type === 'checkbox' ? t.checked : t.value);
  if (t.dataset.re || t.dataset.p === 'kind') drawEditor();
});
document.addEventListener('click', function (ev) {
  var b = ev.target.closest && ev.target.closest('[data-act]'); if (!b) return;
  var a = b.dataset.act, k = b.dataset.k, i = Number(b.dataset.i), j = Number(b.dataset.j), r;
  switch (a) {
    case 'tab': return go(b.dataset.t);
    case 'c-new': return editCourse('', k).catch(fail);
    case 'c-edit': return editCourse(k).catch(fail);
    case 'c-back': ED = null; return go(tab);
    case 'c-save': return saveCourse();
    case 'c-toggle': return toggleCourse(k);
    case 'c-del': return delCourse(k);
    case 'seed-courses': return seedCourses();
    case 'm-add': ED.modules.push({ id: 'm' + rnd(6), title: 'Module ' + (ED.modules.length + 1), lessons: [blankLesson()] }); return drawEditor();
    case 'm-del': if (ED.modules.length > 1 || confirm('Remove the only module?')) { ED.modules.splice(i, 1); drawEditor(); } return;
    case 'm-up': move(ED.modules, i, -1); return drawEditor();
    case 'm-down': move(ED.modules, i, 1); return drawEditor();
    case 'l-add': ED.modules[i].lessons.push(blankLesson()); return drawEditor();
    case 'l-del': ED.modules[i].lessons.splice(j, 1); return drawEditor();
    case 'l-up-move': move(ED.modules[i].lessons, j, -1); return drawEditor();
    case 'l-down': move(ED.modules[i].lessons, j, 1); return drawEditor();
    case 'l-up': return uploadLesson(i, j);
    case 'q-add': ED.quiz.push({ q: '', o: ['', '', '', ''], a: 0 }); return drawEditor();
    case 'q-del': ED.quiz.splice(i, 1); return drawEditor();
    case 'j-new': return jobForm('');
    case 'j-edit': return jobForm(k);
    case 'j-save': return saveJob(k);
    case 'j-toggle': r = (cache.jobs || []).filter(function (x) { return x._id === k; })[0]; return db.doc('acJobs/' + k).update({ open: !(r && r.open !== false) }).then(function () { toast('Updated'); go('jobs'); }).catch(fail);
    case 'j-del': if (!confirm('Delete this opening?')) return; return db.doc('acJobs/' + k).delete().then(function () { toast('Deleted'); go('jobs'); }).catch(fail);
    case 'seed-jobs': var bt = db.batch(); STARTER_JOBS.forEach(function (x) { bt.set(db.collection('acJobs').doc(), { title: x[0], domain: x[1], mode: x[2], dur: x[3], stipend: 'Unpaid', desc: '', open: true }); }); return bt.commit().then(function () { toast('Imported'); go('jobs'); }).catch(fail);
    case 'ac-offer': return offerForm(k);
    case 'ac-offer-go': return offerGo(k);
    case 'ac-complete': return call('acCompleteInternship', { appId: k }).then(function (c) { toast('Certificate ' + (c.certNo || '') + ' issued'); go('apps'); }).catch(fail);
    case 'en-paid': return db.doc('acEnroll/' + k).get().then(function (s) { return db.doc('acEnroll/' + k).update({ paid: !s.data().paid }); }).then(function () { toast('Updated'); go('enroll'); }).catch(fail);
    case 'cert-toggle': return db.doc('acCerts/' + k).get().then(function (s) { return db.doc('acCerts/' + k).update({ revoked: !s.data().revoked }); }).then(function () { toast('Updated'); go('certs'); }).catch(fail);
    case 'tr-open': return openTrack(k);
    case 'tr-all': return setAll(k, true);
    case 'tr-none': return setAll(k, false);
    case 'tr-issue': return issueCert(k);
    case 't-new': return teamForm();
    case 't-save': return teamSave();
    case 't-toggle': return call('staffSetActive', { uid: k, active: b.dataset.a === '1' }).then(function () { toast('Updated'); go('team'); }).catch(fail);
  }
});

boot();
})(typeof window !== 'undefined' ? window : globalThis);
