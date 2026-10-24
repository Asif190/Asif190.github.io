(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Light / dark theme
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // BibTeX toggles and copy buttons
  document.querySelectorAll('.bib-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      box.hidden = open;
    });
  });
  document.querySelectorAll('.bib-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById(btn.dataset.target).querySelector('code').textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      });
    });
  });

  // Photography lightbox
  var dlg = document.querySelector('.lightbox');
  var photos = Array.prototype.slice.call(document.querySelectorAll('.photo'));
  if (dlg && photos.length && typeof dlg.showModal === 'function') {
    var img = dlg.querySelector('img');
    var cap = dlg.querySelector('.lb-caption');
    var idx = 0;
    var show = function (i) {
      idx = (i + photos.length) % photos.length;
      var p = photos[idx];
      img.src = p.dataset.full;
      img.alt = p.querySelector('img').alt;
      cap.textContent = p.dataset.caption;
    };
    photos.forEach(function (p, i) {
      p.addEventListener('click', function () { show(i); dlg.showModal(); });
    });
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }
})();
