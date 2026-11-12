/* Xevast sign in / create account page.
   Uses window.XVB (js/xv-backend.js, Firebase Auth + Firestore). Clients land in portal.html after signing in. */
(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
var LOCK_KEY = 'xv-lg-fail', LOCK_MAX = 5, LOCK_MS = 60000, FAIL_WINDOW = 300000;

var el = {
  card: $('#lgCard'), tabs: $$('#lgTabs button'),
  title: $('#lgTitle'), sub: $('#lgSub'),
  loading: $('#lgLoading'), off: $('#lgOff'), auth: $('#lgAuth'), verify: $('#lgVerify'), staff: $('#lgStaff'), disabled: $('#lgDisabled'),
  inForm: $('#lgIn'), upForm: $('#lgUp'),
  inMsg: $('#inMsg'), upMsg: $('#upMsg'), vMsg: $('#vMsg'),
  mail: $('#vMail')
};
var mode = 'in', busy = false, redirecting = false, signingUp = false, justSignedUp = false;

/* ---------- helpers ---------- */
function msg(node, text, ok) { node.textContent = text || ''; node.className = 'lg-msg' + (text ? (ok ? ' ok' : ' err') : ''); }
function fieldErr(id, text) {
  var i = $('#' + id), e = $('#' + id + 'E');
  if (e) e.textContent = text || '';
  if (i) { if (text) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid'); }
  return !text;
}
function clearErrors(form) { $$('.lg-err', form).forEach(function (e) { e.textContent = ''; }); $$('[aria-invalid]', form).forEach(function (i) { i.removeAttribute('aria-invalid'); }); }
function errText(e) {
  var c = (e && e.code) || '', m = (e && e.message) || '';
  var map = {
    'auth/email-already-in-use': 'This email is already registered. Sign in instead.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/weak-password': 'Use a password with at least 8 characters.',
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/user-not-found': 'Incorrect email or password.',
    'auth/user-disabled': 'This account is disabled. Please contact us.',
    'auth/too-many-requests': 'Too many attempts. Wait a few minutes, then try again.',
    'auth/popup-closed-by-user': 'Google sign-in was closed before it finished.',
    'auth/popup-blocked': 'Your browser blocked the Google window. Allow pop-ups for this site and try again.',
    'auth/cancelled-popup-request': 'Google sign-in was cancelled.',
    'auth/unauthorized-domain': 'This website address is not authorised for sign-in yet. Please contact us.',
    'auth/operation-not-allowed': 'This sign-in method is not turned on yet. Please contact us.',
    'auth/network-request-failed': 'Network problem. Check your connection and try again.',
    'permission-denied': 'You do not have permission to do that.'
  };
  if (map[c]) return map[c];
  if (m === 'not-configured') return 'Accounts are not available right now.';
  return 'Something went wrong. Please try again.';
}
function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
function setBusy(btn, on, label) { busy = on; btn.disabled = on; if (label) btn.textContent = on ? label[0] : label[1]; }

/* where to go after sign in: a page of this site only */
function nextUrl() {
  var n = new URLSearchParams(location.search).get('next') || 'portal.html';
  return /^[A-Za-z0-9_\-\/.]+\.html(#[A-Za-z0-9_\-\/]*)?$/.test(n) && n.indexOf('..') < 0 && n.indexOf('//') < 0 ? n : 'portal.html';
}

/* ---------- failed sign-in lock (browser side, in addition to Firebase's own limits) ---------- */
function fails() { try { return JSON.parse(sessionStorage.getItem(LOCK_KEY) || '[]').filter(function (t) { return Date.now() - t < FAIL_WINDOW; }); } catch (e) { return []; } }
function addFail() { var a = fails(); a.push(Date.now()); try { sessionStorage.setItem(LOCK_KEY, JSON.stringify(a)); } catch (e) {} }
function clearFails() { try { sessionStorage.removeItem(LOCK_KEY); } catch (e) {} }
function lockLeft() { var a = fails(); if (a.length < LOCK_MAX) return 0; var left = LOCK_MS - (Date.now() - a[a.length - 1]); return left > 0 ? Math.ceil(left / 1000) : 0; }

/* ---------- view switching ---------- */
function show(which) {
  ['loading', 'off', 'auth', 'verify', 'staff', 'disabled'].forEach(function (k) { el[k].hidden = k !== which; });
  if (which !== 'auth') { el.tabs[0].parentNode.hidden = true; } else { el.tabs[0].parentNode.hidden = false; }
}
function setMode(m, focus) {
  mode = m;
  el.tabs.forEach(function (b) { var on = b.getAttribute('data-m') === m; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; });
  el.inForm.hidden = m !== 'in';
  el.upForm.hidden = m !== 'up';
  el.title.textContent = m === 'in' ? 'Sign in to your account' : 'Create your account';
  el.sub.textContent = m === 'in'
    ? 'Place orders online, follow every step and message our team.'
    : 'One account for all your Xevast orders. A free consultation never needs one.';
  document.title = (m === 'in' ? 'Sign in' : 'Create account') + ' — Xevast';
  msg(el.inMsg, ''); msg(el.upMsg, '');
  try { history.replaceState(null, '', m === 'up' ? '#register' : location.pathname + location.search); } catch (e) {}
  if (focus) { var f = $(m === 'in' ? '#inEmail' : '#upName'); if (f) f.focus(); }
}
el.tabs.forEach(function (b) {
  b.addEventListener('click', function () { setMode(b.getAttribute('data-m'), true); });
  b.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); var o = el.tabs[el.tabs[0] === b ? 1 : 0]; setMode(o.getAttribute('data-m'), false); o.focus(); }
  });
});
$$('[data-go]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-go'), true); }); });

/* ---------- show / hide password ---------- */
$$('.lg-pw button').forEach(function (b) {
  b.addEventListener('click', function () {
    var i = $('#' + b.getAttribute('data-for')), t = i.type === 'password';
    i.type = t ? 'text' : 'password';
    b.textContent = t ? 'Hide' : 'Show';
    b.setAttribute('aria-pressed', t ? 'true' : 'false');
    b.setAttribute('aria-label', (t ? 'Hide' : 'Show') + ' password');
  });
});

/* ---------- password strength ---------- */
function strength(p) {
  var s = 0;
  if (p.length >= 8) s++;
  if (p.length >= 12) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++; else if (/\d/.test(p) && /[A-Za-z]/.test(p) && p.length >= 10) s++;
  return Math.min(4, s);
}
var meter = $('#upMeter'), meterTxt = $('#upMeterTxt');
$('#upPass').addEventListener('input', function () {
  var p = this.value, s = p ? Math.max(1, strength(p)) : 0;
  meter.setAttribute('data-s', s);
  meterTxt.textContent = !p ? 'At least 8 characters. Letters, numbers and symbols make it stronger.' : (['', 'Weak', 'Fair', 'Good', 'Strong'][s] + ' password');
});

/* ---------- sign in ---------- */
function afterFail(form, e) {
  addFail();
  var left = lockLeft();
  msg(el.inMsg, left ? 'Too many failed attempts. Try again in ' + left + ' seconds, or reset your password.' : errText(e));
}
el.inForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  if (busy) return;
  clearErrors(el.inForm); msg(el.inMsg, '');
  var left = lockLeft();
  if (left) { msg(el.inMsg, 'Too many failed attempts. Try again in ' + left + ' seconds, or reset your password.'); return; }
  var em = $('#inEmail').value.trim(), pw = $('#inPass').value, ok = true;
  ok = fieldErr('inEmail', validEmail(em) ? '' : 'Enter a valid email address.') && ok;
  ok = fieldErr('inPass', pw ? '' : 'Enter your password.') && ok;
  if (!ok) return;
  var btn = $('#inGo');
  setBusy(btn, true, ['Signing in…', 'Sign in']);
  XVB.signIn(em, pw).then(function () { clearFails(); }).catch(function (e) { afterFail(el.inForm, e); }).then(function () { setBusy(btn, false, ['Signing in…', 'Sign in']); });
});

$('#inForgot').addEventListener('click', function () {
  var em = $('#inEmail').value.trim();
  clearErrors(el.inForm);
  if (!validEmail(em)) { fieldErr('inEmail', 'Enter your email here first, then choose Forgot password.'); $('#inEmail').focus(); return; }
  XVB.reset(em).then(function () {
    msg(el.inMsg, 'If an account exists for ' + em + ', a reset link is on its way. Check your inbox and spam folder.', true);
  }).catch(function (e) { msg(el.inMsg, errText(e)); });
});

/* ---------- create account ---------- */
el.upForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  if (busy) return;
  clearErrors(el.upForm); msg(el.upMsg, '');
  if ($('#upHp').value) { msg(el.upMsg, 'Account created. Check your email to verify it.', true); return; }
  var n = $('#upName').value.trim(), ph = $('#upPhone').value.trim(), co = $('#upCo').value.trim(),
      em = $('#upEmail').value.trim(), pw = $('#upPass').value, pw2 = $('#upPass2').value, agree = $('#upAgree').checked, ok = true;
  ok = fieldErr('upName', n.length >= 2 ? '' : 'Enter your full name.') && ok;
  ok = fieldErr('upPhone', ph.replace(/\D/g, '').length >= 8 ? '' : 'Enter a valid phone number.') && ok;
  ok = fieldErr('upEmail', validEmail(em) ? '' : 'Enter a valid email address.') && ok;
  ok = fieldErr('upPass', pw.length >= 8 ? '' : 'Use at least 8 characters.') && ok;
  ok = fieldErr('upPass2', pw2 === pw ? '' : 'The two passwords do not match.') && ok;
  if (!agree) { ok = false; $('#upAgreeE').textContent = 'Please confirm to continue.'; } else { $('#upAgreeE').textContent = ''; }
  if (!ok) { var first = $('[aria-invalid=true]', el.upForm); if (first) first.focus(); return; }
  var btn = $('#upGo');
  setBusy(btn, true, ['Creating account…', 'Create account']);
  signingUp = true;
  XVB.signUp({ name: n, phone: ph, company: co, email: em, password: pw })
    .then(function () {
      signingUp = false; justSignedUp = true;
      $('#upPass').value = ''; $('#upPass2').value = '';
      route(XVB.state.user, XVB.state.profile);
    })
    .catch(function (e) {
      signingUp = false;
      if (XVB.state.user) {
        /* the sign-in account exists but the profile could not be saved: the portal asks for the details again */
        msg(el.upMsg, 'Your account was created, but your details could not be saved. Taking you to finish setup…', true);
        setTimeout(function () { route(XVB.state.user, XVB.state.profile); }, 2500);
      } else msg(el.upMsg, errText(e));
    })
    .then(function () { setBusy(btn, false, ['Creating account…', 'Create account']); });
});

/* ---------- Google ---------- */
$$('.lg-google').forEach(function (b) {
  b.addEventListener('click', function () {
    var target = mode === 'in' ? el.inMsg : el.upMsg;
    msg(target, '');
    XVB.google().catch(function (e) { msg(target, errText(e)); });
  });
});

/* ---------- verify panel ---------- */
var resendAt = 0, tick = null;
$('#vResend').addEventListener('click', function () {
  var b = this;
  if (Date.now() < resendAt) return;
  XVB.resend().then(function () {
    msg(el.vMsg, 'Verification email sent again. Check your inbox and spam folder.', true);
    resendAt = Date.now() + 30000; b.disabled = true;
    clearInterval(tick);
    tick = setInterval(function () {
      var s = Math.ceil((resendAt - Date.now()) / 1000);
      if (s <= 0) { clearInterval(tick); b.disabled = false; b.textContent = 'Resend email'; } else b.textContent = 'Resend in ' + s + 's';
    }, 500);
  }).catch(function (e) { msg(el.vMsg, errText(e)); });
});
$('#vDone').addEventListener('click', function () {
  msg(el.vMsg, '');
  XVB.reloadUser().then(function (u) {
    if (u && u.emailVerified) route(XVB.state.user, XVB.state.profile);
    else msg(el.vMsg, 'Not verified yet. Open the link in the email we sent, then try again.');
  }).catch(function (e) { msg(el.vMsg, errText(e)); });
});
$$('[data-out]').forEach(function (b) { b.addEventListener('click', function () { XVB.signOut().then(function () { mode = 'in'; setMode('in', false); }); }); });

/* ---------- state machine ---------- */
function route(user, profile) {
  if (redirecting) return;
  /* while the account is being created Firebase reports the new user before the profile is saved: wait */
  if (signingUp && user && !profile) return;
  if (!user) { justSignedUp = false; show('auth'); setMode(location.hash === '#register' || new URLSearchParams(location.search).get('mode') === 'register' ? 'up' : mode, false); return; }
  if (profile && profile.active === false) { show('disabled'); document.title = 'Account disabled — Xevast'; return; }
  if (profile && profile.role && profile.role !== 'client') {
    show('staff'); document.title = 'Staff account — Xevast'; return; }
  if ((profile || justSignedUp) && !user.emailVerified) {
    el.mail.textContent = user.email || '';
    show('verify'); document.title = 'Verify your email — Xevast';
    return;
  }
  /* signed in: verified client, or a new Google user who still has to add a name and phone (the portal asks for it) */
  redirecting = true;
  show('loading');
  $('#lgLoadTxt').textContent = 'Signing you in…';
  location.replace(nextUrl());
}

function start() {
  if (!window.XVB || !XVB.configured()) { show('off'); document.title = 'Accounts opening soon — Xevast'; return; }
  show('loading');
  XVB.onAuth(route);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
