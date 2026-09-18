(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  window.MA = window.MA || {};
  window.MA.reduceMotion = reduceMotion;

  // ===== Nav =====
  (function () {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav__toggle');
    var overlay = document.getElementById('nav-overlay');

    if (!nav || !toggle || !overlay) return;

    var overlayLinks = overlay.querySelectorAll('a');

    function openOverlay() {
      overlay.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');

      var firstLink = overlay.querySelector('a');
      if (firstLink) firstLink.focus();

      document.addEventListener('keydown', onKeydown);
    }

    function closeOverlay(options) {
      if (overlay.hidden) return;

      overlay.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', onKeydown);

      var returnFocus = !options || options.returnFocus !== false;
      if (returnFocus) toggle.focus();
    }

    function onKeydown(event) {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    }

    toggle.addEventListener('click', function () {
      if (overlay.hidden) {
        openOverlay();
      } else {
        closeOverlay();
      }
    });

    overlayLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeOverlay({ returnFocus: false });
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && !overlay.hidden) {
        closeOverlay({ returnFocus: false });
      }
    });
  })();

  // ===== Scroll-spy + theme swap =====
  (function () {
    var nav = document.querySelector('.nav');
    var sections = document.querySelectorAll('main .section');
    var links = document.querySelectorAll('.nav__links a, .nav-overlay__links a');

    if (!nav || !sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        var isMatch = link.getAttribute('href') === '#' + id;
        if (isMatch) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function setTheme(section) {
      nav.dataset.theme = section.classList.contains('section--cream') ? 'cream' : 'dark';
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var best = null;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          if (!best || entry.intersectionRect.height > best.intersectionRect.height) best = entry;
        });
        if (best) {
          setTheme(best.target);
          setActive(best.target.id);
        }
      },
      { rootMargin: '-72px 0px -85% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });

    // Run once on load so the initial state is correct before any scroll.
    if (sections[0]) {
      setTheme(sections[0]);
      setActive(sections[0].id);
    }
  })();

  // ===== Work (Phase 2) =====
  (function () {
    'use strict';

    var section = document.querySelector('.work');
    if (!section) return;

    var projects = window.PROJECTS || [];

    var CATEGORY_LABELS = {
      'commercial': 'Commercial',
      'personal-brand': 'Personal Brand',
      'documentary': 'Documentary',
      'motion-graphics': 'Motion Graphics'
    };

    function formatLabel(format) {
      return format === 'reel' ? 'Short-form' : 'Long-form';
    }

    function categoryLabel(category) {
      return CATEGORY_LABELS[category] || category;
    }

    function pad2(n) {
      var s = String(n);
      return s.length < 2 ? '0' + s : s;
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, function (ch) {
        switch (ch) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&#39;';
          default: return ch;
        }
      });
    }

    function tagsHtml(tags) {
      return (tags || []).map(escapeHtml).join('<span class="card__sep"> | </span>');
    }

    function setPoster(img, project, sizes) {
      if (!img || !project.poster) return;
      img.src = project.poster + '-800.webp';
      img.srcset = project.poster + '-400.webp 400w, ' + project.poster + '-800.webp 800w, ' + project.poster + '-1200.webp 1200w';
      img.sizes = sizes;
      img.alt = '';
      img.hidden = false;
    }

    function buildCard(project, featured) {
      var tpl = document.getElementById(featured ? 'tpl-card-featured' : 'tpl-card');
      if (!tpl || !tpl.content || !tpl.content.firstElementChild) return null;

      var node = tpl.content.firstElementChild.cloneNode(true);
      node.dataset.id = project.id;
      node.classList.add(project.format === 'reel' ? 'card--reel' : 'card--long');
      node.setAttribute('aria-label', project.title + ', ' + project.duration + ', ' + formatLabel(project.format));

      var sizes = project.format === 'reel'
        ? '(min-width: 1100px) 22vw, 60vw'
        : '(min-width: 1100px) 40vw, 100vw';
      setPoster(node.querySelector('.card__img'), project, sizes);

      var formatEl = node.querySelector('.card__format');
      if (formatEl) formatEl.textContent = featured ? '✦ Featured Project' : formatLabel(project.format);

      var durationEl = node.querySelector('.card__duration');
      if (durationEl) durationEl.textContent = project.duration;

      var tagsEl = node.querySelector('.card__tags');

      if (featured) {
        var eyebrow = node.querySelector('.card__eyebrow');
        if (eyebrow) eyebrow.textContent = categoryLabel(project.category) + ' · ' + formatLabel(project.format);

        var titleBig = node.querySelector('.card__title--big');
        if (titleBig) titleBig.textContent = project.title;

        var desc = node.querySelector('.card__desc');
        if (desc) desc.textContent = project.description || '';

        var client = node.querySelector('.card__client');
        if (client) client.textContent = project.client || '';

        if (tagsEl) tagsEl.innerHTML = tagsHtml(project.tags);
      } else {
        var title = node.querySelector('.card__title');
        if (title) title.textContent = project.title;

        if (tagsEl) tagsEl.innerHTML = tagsHtml(project.tags);
      }

      return node;
    }

    // ----- Elements -----
    var chips = section.querySelectorAll('.chip');
    var countLive = section.querySelector('.work__count');

    var reelsTrack = section.querySelector('.reels__track');
    var reelsEmpty = section.querySelector('.reels .work__empty');
    var reelsCountEl = section.querySelector('.reels .sub-head__count');
    var prevBtn = section.querySelector('.reels__prev');
    var nextBtn = section.querySelector('.reels__next');

    var longGrid = section.querySelector('.long__grid');
    var longFeatured = section.querySelector('.long__featured');
    var longSide = section.querySelector('.long__side');
    var longMore = section.querySelector('.long__more');
    var longEmpty = section.querySelector('.long .work__empty');
    var longCountEl = section.querySelector('.long .sub-head__count');

    var viewAllLink = section.querySelector('.work__all');
    var reelsHeading = document.getElementById('reels-heading');

    if (!reelsTrack || !longFeatured || !longSide || !longMore) return;

    // ----- Render -----
    function renderWork(filter) {
      var filtered = filter === 'all' ? projects.slice() : projects.filter(function (p) { return p.category === filter; });
      var reels = filtered.filter(function (p) { return p.format === 'reel'; });
      var longs = filtered.filter(function (p) { return p.format === 'long'; });

      var featured = longs.filter(function (p) { return p.featured; })[0] || longs[0] || null;

      // Reels
      reelsTrack.innerHTML = '';
      reels.forEach(function (p) {
        var card = buildCard(p, false);
        if (card) reelsTrack.appendChild(card);
      });
      if (reelsEmpty) reelsEmpty.hidden = reels.length > 0;
      reelsTrack.hidden = reels.length === 0;
      if (reelsCountEl) reelsCountEl.textContent = pad2(reels.length);

      // Long-form
      longFeatured.innerHTML = '';
      longSide.innerHTML = '';
      longMore.innerHTML = '';

      var remaining = longs.slice();
      if (featured) {
        remaining = remaining.filter(function (p) { return p !== featured; });
        var fcard = buildCard(featured, true);
        if (fcard) longFeatured.appendChild(fcard);
      }

      remaining.slice(0, 2).forEach(function (p) {
        var c = buildCard(p, false);
        if (c) longSide.appendChild(c);
      });

      remaining.slice(2).forEach(function (p) {
        var c = buildCard(p, false);
        if (c) longMore.appendChild(c);
      });

      if (longGrid) longGrid.hidden = longs.length === 0;
      if (longEmpty) longEmpty.hidden = longs.length > 0;
      if (longCountEl) longCountEl.textContent = pad2(longs.length);

      if (countLive) {
        countLive.textContent = filtered.length + ' project' + (filtered.length === 1 ? '' : 's') + ' shown';
      }

      reelsTrack.scrollLeft = 0;
      updateReelArrows();
    }

    // ----- Chips -----
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
        });
        renderWork(chip.dataset.filter);
      });
    });

    if (viewAllLink) {
      viewAllLink.addEventListener('click', function (e) {
        e.preventDefault();
        var allChip = section.querySelector('.chip[data-filter="all"]');
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', c === allChip ? 'true' : 'false');
        });
        renderWork('all');
        if (reelsHeading) reelsHeading.focus();
      });
    }

    // ----- Reels arrows -----
    function getReelStep() {
      var firstCard = reelsTrack.querySelector('.card');
      if (!firstCard) return 300;
      var rect = firstCard.getBoundingClientRect();
      var gap = parseFloat(getComputedStyle(reelsTrack).columnGap || getComputedStyle(reelsTrack).gap || '16') || 16;
      return rect.width + gap;
    }

    function scrollReels(direction) {
      var step = getReelStep();
      reelsTrack.scrollBy({
        left: direction * step,
        behavior: window.MA.reduceMotion.matches ? 'auto' : 'smooth'
      });
    }

    function updateReelArrows() {
      var scrollLeft = reelsTrack.scrollLeft;
      var clientWidth = reelsTrack.clientWidth;
      var scrollWidth = reelsTrack.scrollWidth;
      if (prevBtn) prevBtn.disabled = scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = (scrollLeft + clientWidth) >= (scrollWidth - 2);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollReels(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollReels(1); });

    reelsTrack.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollReels(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollReels(-1);
      }
    });

    var scrollScheduled = false;
    reelsTrack.addEventListener('scroll', function () {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(function () {
        updateReelArrows();
        scrollScheduled = false;
      });
    });

    window.addEventListener('resize', function () {
      updateReelArrows();
    });

    // ----- Card click -> lightbox -----
    section.addEventListener('click', function (e) {
      var card = e.target.closest('.card');
      if (!card) return;
      var project = projects.filter(function (p) { return p.id === card.dataset.id; })[0];
      if (!project) return;
      openLightbox(project, card);
    });

    // ----- Lightbox -----
    var dialog = document.querySelector('.lightbox');
    var lightboxTitle = document.getElementById('lightbox-title');
    var lightboxFrame = dialog ? dialog.querySelector('.lightbox__frame') : null;
    var lightboxClose = dialog ? dialog.querySelector('.lightbox__close') : null;
    var lightboxInner = dialog ? dialog.querySelector('.lightbox__inner') : null;
    var lastTrigger = null;

    function openLightbox(project, trigger) {
      if (!dialog || !lightboxFrame || !lightboxTitle) return;

      lastTrigger = trigger || null;
      lightboxTitle.textContent = project.title;
      lightboxFrame.dataset.format = project.format;
      lightboxFrame.innerHTML = '';

      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(project.youtubeId) + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      iframe.title = project.title;
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media');
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      lightboxFrame.appendChild(iframe);

      dialog.showModal();
      document.body.classList.add('lightbox-open');
      if (lightboxClose) lightboxClose.focus();
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        dialog.close();
      });
    }

    if (dialog) {
      dialog.addEventListener('click', function (e) {
        if (e.target !== dialog) return;
        if (lightboxInner) {
          var rect = lightboxInner.getBoundingClientRect();
          var inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
          if (inside) return;
        }
        dialog.close();
      });

      dialog.addEventListener('close', function () {
        if (lightboxFrame) lightboxFrame.innerHTML = '';
        document.body.classList.remove('lightbox-open');
        if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
        lastTrigger = null;
      });
    }

    // ----- Init -----
    renderWork('all');
  })();

  // ===== Testimonials (Phase 3) =====
    (function () {
      var section = document.getElementById('testimonials');
      var track = document.getElementById('testi-track');
      var template = document.getElementById('tpl-testimonial');
      var dotsWrap = section ? section.querySelector('.testi__dots') : null;
      var status = section ? section.querySelector('.testi__status') : null;

      if (!section || !track || !template || !dotsWrap) return;

      var TESTIMONIALS = [
        {
          id: 'pxi',
          quote: "Malek is one of the most reliable editors I've worked with. He understands the vision, adds creative ideas, and always delivers on time.",
          logo: { main: 'PXI', sub: 'Furniture' },
          logoSrc: null,
          name: 'PXI Team',
          role: 'Travel Content',
          avatarSrc: null
        },
        {
          id: 'mango',
          quote: "He doesn't just edit, he makes the content better. Our engagement increased significantly after working together.",
          logo: { main: 'Mango', sub: 'Food' },
          logoSrc: null,
          name: 'Mango Team',
          role: 'Food Campaign',
          avatarSrc: null
        },
        {
          id: 'viral-media',
          quote: 'Professional, creative, and easy to work with. Highly recommended for any brand or creator looking for high-quality content.',
          logo: { main: 'Viral Media', sub: 'Agency' },
          logoSrc: null,
          name: 'Viral Media Team',
          role: 'Brand Content',
          avatarSrc: null
        },
        {
          id: 'nova',
          quote: 'Fast turnarounds without cutting corners. The reels he cut for our launch outperformed everything we had posted before.',
          logo: { main: 'Nova', sub: 'Skincare' },
          logoSrc: null,
          name: 'Nova Marketing',
          role: 'Product Launch',
          avatarSrc: null
        },
        {
          id: 'sahara',
          quote: 'Malek took hours of raw footage and found the story in it. The documentary feels exactly like we imagined — only better.',
          logo: { main: 'Sahara', sub: 'Films' },
          logoSrc: null,
          name: 'Sahara Films',
          role: 'Documentary Edit',
          avatarSrc: null
        }
      ];

      var headerPrev = section.querySelector('.testi__prev');
      var headerNext = section.querySelector('.testi__next');
      var sidePrev = section.querySelector('.testi__side--prev');
      var sideNext = section.querySelector('.testi__side--next');
      var prevButtons = [headerPrev, sidePrev].filter(Boolean);
      var nextButtons = [headerNext, sideNext].filter(Boolean);

      var cards = [];
      var dots = [];
      var activeIndex = 1;
      var resizeTimer = null;

      // ----- render cards -----
      TESTIMONIALS.forEach(function (item, index) {
        var node = template.content.firstElementChild.cloneNode(true);
        node.setAttribute('data-index', String(index));

        var quoteEl = node.querySelector('.testi__quote');
        if (quoteEl) quoteEl.textContent = item.quote;

        var logoEl = node.querySelector('.testi__logo');
        if (logoEl) {
          if (item.logoSrc) {
            var img = document.createElement('img');
            img.src = item.logoSrc;
            img.alt = item.logo.main;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.width = 160;
            img.height = 48;
            logoEl.appendChild(img);
          } else {
            var mainEl = document.createElement('p');
            mainEl.className = 'testi__logo-text';
            mainEl.textContent = item.logo.main;
            var subEl = document.createElement('p');
            subEl.className = 'testi__logo-sub micro-label';
            subEl.textContent = item.logo.sub;
            logoEl.appendChild(mainEl);
            logoEl.appendChild(subEl);
          }
        }

        var avatarEl = node.querySelector('.testi__avatar');
        if (avatarEl && item.avatarSrc) {
          avatarEl.classList.remove('placeholder');
          var avatarImg = document.createElement('img');
          avatarImg.src = item.avatarSrc;
          avatarImg.alt = item.name;
          avatarImg.loading = 'lazy';
          avatarImg.decoding = 'async';
          avatarImg.width = 56;
          avatarImg.height = 56;
          avatarEl.appendChild(avatarImg);
        }

        var nameEl = node.querySelector('.testi__name');
        if (nameEl) nameEl.textContent = item.name;

        var roleEl = node.querySelector('.testi__role');
        if (roleEl) roleEl.textContent = item.role;

        track.appendChild(node);
        cards.push(node);
      });

      // ----- render dots -----
      TESTIMONIALS.forEach(function (item, index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dots__dot';
        dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1) + ' of ' + TESTIMONIALS.length);
        dot.setAttribute('aria-current', 'false');
        dot.addEventListener('click', function () {
          goTo(index);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });

      // ----- active state -----
      function updateActive(index) {
        activeIndex = index;

        cards.forEach(function (card, i) {
          if (i === index) {
            card.classList.add('is-active');
          } else {
            card.classList.remove('is-active');
          }
        });

        dots.forEach(function (dot, i) {
          dot.setAttribute('aria-current', i === index ? 'true' : 'false');
        });

        prevButtons.forEach(function (btn) {
          btn.disabled = index <= 0;
        });
        nextButtons.forEach(function (btn) {
          btn.disabled = index >= TESTIMONIALS.length - 1;
        });

        if (status) {
          status.textContent = 'Testimonial ' + (index + 1) + ' of ' + TESTIMONIALS.length;
        }
      }

      // ----- scrolling -----
      function centerCard(card, smooth) {
        var target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
        track.scrollTo({
          left: target,
          behavior: smooth && !window.MA.reduceMotion.matches ? 'smooth' : 'auto'
        });
      }

      function goTo(index, smooth) {
        if (index < 0) index = 0;
        if (index > cards.length - 1) index = cards.length - 1;

        var card = cards[index];
        if (!card) return;

        updateActive(index);
        centerCard(card, smooth !== false);
      }

      prevButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          goTo(activeIndex - 1);
        });
      });

      nextButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          goTo(activeIndex + 1);
        });
      });

      track.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goTo(activeIndex - 1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          goTo(activeIndex + 1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          goTo(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          goTo(cards.length - 1);
        }
      });

      // ----- active detection: nearest card to the track centre -----
      var scrollTimer = null;
      function detectActive() {
        var trackCenter = track.scrollLeft + track.clientWidth / 2;
        var closestIndex = 0;
        var closestDistance = Infinity;
        cards.forEach(function (card, i) {
          var cardCenter = card.offsetLeft + card.offsetWidth / 2;
          var distance = Math.abs(cardCenter - trackCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        });
        updateActive(closestIndex);
      }
      track.addEventListener('scroll', function () {
        if (scrollTimer) window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(detectActive, 80);
      }, { passive: true });

      // ----- resize: recentre active card -----
      window.addEventListener('resize', function () {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () {
          var card = cards[activeIndex];
          if (card) centerCard(card, false);
        }, 150);
      });

      // ----- init -----
      goTo(1, false);
    })();
})();
