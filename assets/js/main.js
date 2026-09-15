/* ==========================================================================
   Dynamite Faith Church International — UI behaviour
   Renders every card section from assets/js/content.js (window.SITE),
   plus navigation, gallery lightbox, form validation and back-to-top.
   ========================================================================== */
(function () {
  'use strict';

  var SITE = {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------------- Icons ---------------- */
  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v5H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
    hands: '<path d="M12 21c-3.5-2.3-7-5.2-7-9a3.5 3.5 0 0 1 7-1 3.5 3.5 0 0 1 7 1c0 3.8-3.5 6.7-7 9z"/>',
    star: '<path d="M12 3l2.5 6.2L21 10l-5 4.2 1.6 6.3L12 17.3 6.4 20.5 8 14.2 3 10l6.5-.8z"/>',
    child: '<circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/>',
    youth: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 21v-2.5A5.5 5.5 0 0 1 8.5 13h1A5.5 5.5 0 0 1 15 18.5V21"/><path d="M17 14a4 4 0 0 1 4 4v3"/>',
    women: '<circle cx="12" cy="8" r="4"/><path d="M12 12v8M9 18h6"/>',
    men: '<circle cx="10" cy="14" r="5"/><path d="M15 9l6-6M16 3h5v5"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.8a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    facebook: '<path d="M14 9V7.5c0-.8.4-1.5 1.6-1.5H17V3h-2.4C12 3 11 4.6 11 7v2H9v3h2v9h3v-9h2.2l.4-3z" fill="currentColor" stroke="none"/>',
    youtube: '<path d="M22 12s0-3.4-.4-5c-.3-1-1-1.7-2-2C17.8 4.5 12 4.5 12 4.5s-5.8 0-7.6.5c-1 .3-1.7 1-2 2C2 8.6 2 12 2 12s0 3.4.4 5c.3 1 1 1.7 2 2 1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5c1-.3 1.7-1 2-2 .4-1.6.4-5 .4-5z"/><path d="M10 15V9l5 3z" fill="currentColor" stroke="none"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    tiktok: '<path d="M15 3c.4 2.5 1.9 4 4.5 4.3v3.1c-1.7.1-3.2-.4-4.5-1.3v5.6A6.2 6.2 0 1 1 8.8 8.5c.4 0 .7 0 1 .1v3.2a3 3 0 1 0 2.1 2.9V3z"/>'
  };
  function icon(name, size) {
    var path = ICONS[name] || ICONS.star;
    return '<svg viewBox="0 0 24 24" width="' + (size || 22) + '" height="' + (size || 22) + '" fill="none" ' +
      'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
  }

  /* ---------------- Helpers ---------------- */
  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function parseDate(value) {
    if (!value) return null;
    var parts = String(value).split('-');
    if (parts.length !== 3) return null;
    var d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    return isNaN(d.getTime()) ? null : d;
  }
  function longDate(value) {
    var d = parseDate(value);
    if (!d) return '';
    return d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }
  function telHref(number) { return 'tel:' + String(number).replace(/[^\d+]/g, ''); }
  function revealNote(selector) {
    var note = $(selector);
    if (!note) return;
    note.hidden = false;
    note.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------------- Services ---------------- */
  function renderServices() {
    var host = $('#services-grid');
    if (!host) return;
    host.innerHTML = (SITE.services || []).map(function (s) {
      var when = s.day ? s.day + (s.time ? ' &middot; ' + esc(s.time) : '') : (s.time || '');
      return '<article class="card card--gold">' +
        '<div class="card__icon">' + icon(s.icon, 24) + '</div>' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(s.description) + '</p>' +
        '<div class="card__foot"><span class="card__time" data-placeholder="' + (s.placeholder ? 'true' : 'false') + '">' +
        icon('clock', 15) + '<span>' + (s.day ? esc(s.day) + ' &middot; ' + esc(s.time) : esc(s.time)) + '</span></span></div>' +
        '</article>';
    }).join('');
  }

  /* ---------------- Ministries ---------------- */
  function renderMinistries() {
    var host = $('#ministries-grid');
    if (!host) return;
    host.innerHTML = (SITE.ministries || []).map(function (m) {
      return '<article class="card">' +
        '<div class="card__icon">' + icon(m.icon, 24) + '</div>' +
        '<h3>' + esc(m.title) + '</h3>' +
        '<p>' + esc(m.description) + '</p>' +
        '<div class="card__foot"><a class="link-more" href="#contact">Learn more ' + icon('arrow', 16) + '</a></div>' +
        '</article>';
    }).join('');
  }

  /* ---------------- Sermons ---------------- */
  var SERMON_PREVIEW = 3;
  function sermonCard(s) {
    var date = longDate(s.date);
    var actions = s.url
      ? '<a class="btn btn--primary btn--sm" href="' + esc(s.url) + '" target="_blank" rel="noopener">Watch / Listen</a>'
      : '<button class="btn btn--primary btn--sm" type="button" data-unavailable="sermon">Watch / Listen</button>';
    return '<article class="card sermon">' +
      '<div class="sermon__thumb">' +
      '<img src="' + esc(s.image) + '" alt="Artwork for the sermon &ldquo;' + esc(s.title) + '&rdquo;" loading="lazy" width="720" height="420">' +
      (s.category ? '<span class="sermon__tag">' + esc(s.category) + '</span>' : '') +
      '<button class="sermon__play" type="button" data-unavailable="sermon" aria-label="Play &ldquo;' + esc(s.title) + '&rdquo;">' + icon('play', 22) + '</button>' +
      '</div>' +
      '<div class="sermon__body">' +
      '<div class="meta-row">' +
      '<span>' + icon('user', 15) + esc(s.speaker) + '</span>' +
      (date ? '<span>' + icon('calendar', 15) + date + '</span>' : '') +
      '</div>' +
      '<h3>' + esc(s.title) + '</h3>' +
      '<p>' + esc(s.description) + '</p>' +
      '<div class="sermon__actions">' + actions +
      '<a class="btn btn--ghost btn--sm" href="#contact">Ask about this</a></div>' +
      '</div></article>';
  }
  function renderSermons() {
    var host = $('#sermons-grid');
    if (!host) return;
    var list = SITE.sermons || [];
    host.innerHTML = list.map(function (s, i) {
      return '<div class="sermon-slot"' + (i >= SERMON_PREVIEW ? ' hidden' : '') + '>' + sermonCard(s) + '</div>';
    }).join('');
    var btn = $('#sermons-toggle');
    if (!btn) return;
    if (list.length <= SERMON_PREVIEW) {
      // Nothing more to reveal yet — say so plainly rather than leaving a dead button.
      btn.addEventListener('click', function () { revealNote('#sermon-note'); });
      return;
    }
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      $$('.sermon-slot', host).forEach(function (slot, i) { if (i >= SERMON_PREVIEW) slot.hidden = expanded; });
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? 'View All Sermons' : 'Show Fewer Sermons';
    });
  }

  /* ---------------- Events ---------------- */
  function renderEvents() {
    var host = $('#events-grid');
    if (!host) return;
    host.innerHTML = (SITE.events || []).map(function (e) {
      var d = parseDate(e.date);
      var block = d
        ? '<span class="d">' + d.getUTCDate() + '</span><span class="m">' + MONTHS[d.getUTCMonth()] + '</span><span class="y">' + d.getUTCFullYear() + '</span>'
        : '<span class="m">Date</span><span class="d">?</span><span class="y">TBA</span>';
      return '<article class="card event">' +
        '<div class="event__date">' + block + '</div>' +
        '<div>' +
        '<h3>' + esc(e.title) + '</h3>' +
        '<div class="meta-row">' +
        '<span>' + icon('clock', 15) + esc(e.time) + '</span>' +
        '<span>' + icon('pin', 15) + esc(e.location) + '</span>' +
        '</div>' +
        '<p>' + esc(e.description) + '</p>' +
        '<a class="link-more" href="#contact">Learn more ' + icon('arrow', 16) + '</a>' +
        '</div></article>';
    }).join('');
  }

  /* ---------------- Gallery + lightbox ---------------- */
  var GALLERY_PREVIEW = 6;
  function renderGallery() {
    var host = $('#gallery-grid');
    if (!host) return;
    var items = SITE.gallery || [];
    host.innerHTML = items.map(function (g, i) {
      return '<button class="gallery__item" type="button" data-index="' + i + '"' + (i >= GALLERY_PREVIEW ? ' hidden' : '') + '>' +
        '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy">' +
        '<span class="gallery__cap">' + esc(g.caption) + '</span></button>';
    }).join('');

    var btn = $('#gallery-toggle');
    if (btn) {
      if (items.length <= GALLERY_PREVIEW) {
        btn.addEventListener('click', function () { revealNote('#gallery-note'); });
      } else {
        btn.addEventListener('click', function () {
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          $$('.gallery__item', host).forEach(function (el, i) { if (i >= GALLERY_PREVIEW) el.hidden = expanded; });
          btn.setAttribute('aria-expanded', String(!expanded));
          btn.textContent = expanded ? 'View Gallery' : 'Show Less';
        });
      }
    }

    var box = $('#lightbox'), boxImg = $('#lightbox-img'), boxCap = $('#lightbox-cap');
    if (!box) return;
    var current = 0, lastFocus = null;

    function show(i) {
      current = (i + items.length) % items.length;
      var item = items[current];
      boxImg.src = item.src;
      boxImg.alt = item.alt;
      boxCap.textContent = item.caption + ' (' + (current + 1) + ' of ' + items.length + ')';
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      $('#lightbox-close').focus();
    }
    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    host.addEventListener('click', function (e) {
      var target = e.target.closest('.gallery__item');
      if (target) open(+target.dataset.index);
    });
    $('#lightbox-close').addEventListener('click', close);
    $('#lightbox-prev').addEventListener('click', function () { show(current - 1); });
    $('#lightbox-next').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------------- Contact details + socials ---------------- */
  function renderContact() {
    var church = SITE.church || {};
    $$('[data-phones]').forEach(function (host) {
      var style = host.dataset.phones; // 'buttons' | 'list'
      host.innerHTML = (church.phones || []).map(function (p) {
        return style === 'buttons'
          ? '<a class="btn btn--outline" href="' + telHref(p) + '">' + icon('phone', 18) + esc(p) + '</a>'
          : '<a href="' + telHref(p) + '">' + esc(p) + '</a>';
      }).join('');
    });

    $$('[data-email]').forEach(function (host) {
      host.innerHTML = church.email
        ? '<a href="mailto:' + esc(church.email) + '">' + esc(church.email) + '</a>'
        : '<span class="placeholder-note">Church email address coming soon</span>';
    });

    var socialHost = $('#socials');
    if (socialHost) {
      socialHost.innerHTML = (SITE.socials || []).map(function (s) {
        return s.url
          ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.name) + '">' + icon(s.icon, 19) + '</a>'
          : '<a href="#contact" aria-label="' + esc(s.name) + ' — account coming soon" title="' + esc(s.name) + ' — account coming soon">' + icon(s.icon, 19) + '</a>';
      }).join('');
    }

    var mapHost = $('#map-embed');
    if (mapHost && church.mapQuery) {
      var q = encodeURIComponent(church.mapQuery);
      var bar = '<div class="map-frame__bar">' +
        '<p><strong>' + esc(church.name) + '</strong> &middot; ' + esc(church.location) + '</p>' +
        '<a class="btn btn--ghost btn--sm" href="https://www.google.com/maps/search/?api=1&query=' + q + '" ' +
        'target="_blank" rel="noopener">Open in Google Maps</a></div>';

      var view = church.mapEmbed
        ? '<iframe title="Map of ' + esc(church.mapQuery) + '" loading="lazy" ' +
          'referrerpolicy="no-referrer-when-downgrade" ' +
          'src="https://www.google.com/maps?q=' + q + '&output=embed"></iframe>'
        // Embedded maps are blocked in many previews, so the default is a panel
        // that always renders and still links out to the real map.
        : '<div class="map-place">' +
          '<span class="map-place__pin">' + icon('pin', 26) + '</span>' +
          '<p class="map-place__town">Atebubu</p>' +
          '<p class="map-place__region">Bono East Region &middot; Ghana</p>' +
          '</div>';

      mapHost.innerHTML = view + bar;
    }

    $$('[data-year]').forEach(function (el) { el.textContent = church.copyrightYear || new Date().getFullYear(); });

    // Logo and church name are content, so an uploaded logo appears everywhere at once.
    if (church.logo) $$('[data-logo]').forEach(function (el) { el.src = church.logo; });
    $$('[data-church-name]').forEach(function (el) { el.textContent = church.name || ''; });
    $$('[data-church-short]').forEach(function (el) { el.textContent = church.shortName || church.name || ''; });
    $$('[data-church-location]').forEach(function (el) { el.textContent = church.location || ''; });
    $$('[data-church-tagline]').forEach(function (el) { el.textContent = church.tagline || ''; });
  }

  /* ---------------- Navigation ---------------- */
  function initNav() {
    var header = $('.header'), nav = $('#primary-nav'), toggle = $('.nav-toggle');
    var scrim = $('#nav-scrim'), close = $('.nav__close');

    if (toggle && nav) {
      var lastFocus = null;

      function openNav() {
        lastFocus = document.activeElement;
        nav.classList.add('is-open');
        if (scrim) scrim.classList.add('is-open');
        if (header) header.classList.add('is-nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Flush the style change so the drawer is visible before focus moves
        // into it — focus() is ignored while it is still visibility:hidden.
        void nav.offsetWidth;
        var first = $('.nav__close', nav) || $('a', nav);
        if (first) first.focus();
      }
      function closeNav(returnFocus) {
        nav.classList.remove('is-open');
        if (scrim) scrim.classList.remove('is-open');
        if (header) header.classList.remove('is-nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (returnFocus !== false && lastFocus) lastFocus.focus();
      }
      function isOpen() { return nav.classList.contains('is-open'); }

      toggle.addEventListener('click', function () { isOpen() ? closeNav() : openNav(); });
      if (close) close.addEventListener('click', function () { closeNav(); });
      if (scrim) scrim.addEventListener('click', function () { closeNav(); });

      // Tapping the dimmed header (outside the drawer) closes it too.
      if (header) header.addEventListener('click', function (e) {
        if (isOpen() && !e.target.closest('#primary-nav') && !e.target.closest('.nav-toggle')) closeNav();
      });

      // Tapping a link closes the drawer and lets the page scroll to the section.
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeNav(false);
      });

      document.addEventListener('keydown', function (e) {
        if (!isOpen()) return;
        if (e.key === 'Escape') { closeNav(); return; }
        if (e.key !== 'Tab') return;
        // Keep focus inside the drawer while it is open.
        var items = $$('a[href], button:not([disabled])', nav).filter(function (el) {
          return el.offsetParent !== null;
        });
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });

      // Returning to desktop width must not leave the page scroll-locked.
      window.addEventListener('resize', function () {
        if (window.innerWidth > 960 && isOpen()) closeNav(false);
      });
    }

    var links = $$('.nav__link');
    var sections = links.map(function (a) { return a.hash ? $(a.hash) : null; }).filter(Boolean);
    function onScroll() {
      if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
      var top = window.scrollY + 140, active = null;
      sections.forEach(function (sec) { if (sec.offsetTop <= top) active = sec; });
      links.forEach(function (a) {
        a.setAttribute('aria-current', active && a.hash === '#' + active.id ? 'true' : 'false');
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Back to top ---------------- */
  function initToTop() {
    var btn = $('.to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Contact form validation ---------------- */
  function initForm() {
    var form = $('#contact-form');
    if (!form) return;
    var status = $('#form-status');

    function setError(field, message) {
      field.classList.toggle('has-error', !!message);
      var out = $('.field__error', field);
      if (out) out.textContent = message || '';
      var input = $('input, textarea', field);
      if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
    function validate(input) {
      var field = input.closest('.field');
      var value = input.value.trim();
      var message = '';
      if (input.required && !value) message = 'This field is required.';
      else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) message = 'Please enter a valid email address.';
      else if (input.type === 'tel' && value && !/^[+\d][\d\s()-]{6,}$/.test(value)) message = 'Please enter a valid phone number.';
      else if (input.name === 'message' && value && value.length < 10) message = 'Please write at least 10 characters.';
      setError(field, message);
      return !message;
    }

    $$('input, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { validate(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('has-error')) validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var inputs = $$('input, textarea', form);
      var ok = inputs.map(validate).every(Boolean);
      if (!ok) {
        var first = $('.field.has-error input, .field.has-error textarea', form);
        if (first) first.focus();
        return;
      }
      var phones = (SITE.church && SITE.church.phones) || [];
      status.innerHTML = 'Thank you, <strong>' + esc(form.elements.name.value.trim()) + '</strong>. ' +
        'This form is not yet connected to an email service, so your message has not been sent. ' +
        'Please call the church on ' + phones.map(function (p) { return '<a href="' + telHref(p) + '">' + esc(p) + '</a>'; }).join(' or ') + '.';
      status.classList.add('is-visible');
      status.focus();
    });
  }

  /* ---------------- Sermon placeholder notice ---------------- */
  function initUnavailable() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-unavailable="sermon"]');
      if (!btn) return;
      revealNote('#sermon-note');
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Boot ---------------- */
  function init() {
    renderServices();
    renderMinistries();
    renderSermons();
    renderEvents();
    renderGallery();
    renderContact();
    initNav();
    initToTop();
    initForm();
    initUnavailable();
    initReveal();
  }

  /* All content lives in assets/content.json — the single file the admin at
     /admin writes to. It is fetched rather than inlined so that saving in the
     CMS updates the site without touching any code. */
  function boot() {
    fetch('assets/content.json', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) { SITE = data; })
      .catch(function (err) {
        console.error('Could not load assets/content.json —', err.message +
          '. Serve the site over http (e.g. python3 -m http.server) rather than opening the file directly.');
      })
      .then(init);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
