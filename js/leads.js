/* Contact form -> Firebase (consults collection). No WhatsApp redirect. */
(function () {
  var f = document.getElementById('cform');
  if (!f) return;
  var out = document.createElement('p');
  out.style.cssText = 'text-align:center;margin-top:10px';
  out.setAttribute('role', 'status');
  f.appendChild(out);
  var hp = document.createElement('input');
  hp.tabIndex = -1; hp.autocomplete = 'off'; hp.setAttribute('aria-hidden', 'true');
  hp.style.cssText = 'position:absolute;left:-9999px;opacity:0;height:0';
  f.appendChild(hp);
  var val = function (id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; };
  var fallback = 'Please call +91 83401 61172 or email contactxevast@gmail.com.';
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!window.XVB || !XVB.configured()) { out.textContent = 'The form is not available right now. ' + fallback; return; }
    var name = val('fname'), phone = val('fphone');
    if (!name || phone.replace(/\D/g, '').length < 8) { out.textContent = 'Please add your name and a valid phone number.'; return; }
    var btn = f.querySelector('button[type=submit]');
    if (btn) btn.disabled = true;
    out.textContent = 'Sending…';
    var v = { svc: val('fsvc'), cp: name, ph: phone, bg: val('fbudget'), nt: val('fmsg') };
    XVB.submitConsult(v, [['Budget', v.bg], ['Details', v.nt]], { source: 'contact-form', hp: hp.value })
      .then(function (r) {
        out.textContent = r.status === 'queued'
          ? 'Saved on this device. It will be sent when you are back online. Reference: ' + r.ref
          : 'Thank you. Our team will contact you soon. Reference: ' + r.ref;
        f.reset();
      })
      .catch(function (err) {
        var m = err && err.message;
        out.textContent = m === 'rate-limit' ? 'You have sent several requests in the last hour. Please wait a little. ' + fallback : 'We could not send this. ' + fallback;
      })
      .then(function () { if (btn) btn.disabled = false; });
  });
})();
