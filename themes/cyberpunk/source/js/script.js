/**
 * Cyberpunk Theme — Interactive Scripts
 */
(function(){
  'use strict';

  // ========== Mobile Nav Toggle ==========
  var mobileNav = document.getElementById('mobile-nav');
  var navToggle = document.getElementById('main-nav-toggle');
  var navClose = document.getElementById('mobile-nav-close');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      mobileNav.classList.add('on');
    });
  }

  if (navClose && mobileNav) {
    navClose.addEventListener('click', function(e) {
      e.preventDefault();
      mobileNav.classList.remove('on');
    });
  }

  // Close mobile nav when clicking a link
  if (mobileNav) {
    var links = mobileNav.querySelectorAll('.mobile-nav-link');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('on');
      });
    });
  }

  // ========== Search Toggle ==========
  var searchBtn = document.querySelector('.nav-search-btn');
  var searchWrap = document.getElementById('search-form-wrap');
  var searchInput = document.querySelector('.search-form-input');

  if (searchBtn && searchWrap) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (searchWrap.classList.contains('on')) {
        searchWrap.classList.remove('on');
      } else {
        searchWrap.classList.add('on');
        if (searchInput) {
          setTimeout(function() { searchInput.focus(); }, 100);
        }
      }
    });
  }

  // Close search on outside click
  document.addEventListener('click', function(e) {
    if (searchWrap && searchWrap.classList.contains('on')) {
      if (!searchWrap.contains(e.target) && e.target !== searchBtn && !searchBtn.contains(e.target)) {
        searchWrap.classList.remove('on');
      }
    }
  });

  // ========== Share Links ==========
  document.addEventListener('click', function(e) {
    // Close any open share boxes
    var openBox = document.querySelector('.article-share-box.on');
    if (openBox && !openBox.contains(e.target) && !e.target.closest('.article-share-link')) {
      openBox.classList.remove('on');
    }
  });

  document.addEventListener('click', function(e) {
    var shareLink = e.target.closest('.article-share-link');
    if (!shareLink) return;

    e.stopPropagation();
    e.preventDefault();

    var url = shareLink.getAttribute('data-url');
    var encodedUrl = encodeURIComponent(url);
    var id = 'share-box-' + shareLink.getAttribute('data-id');
    var title = shareLink.getAttribute('data-title');
    var offset = shareLink.getBoundingClientRect();

    var existingBox = document.getElementById(id);
    if (existingBox) {
      if (existingBox.classList.contains('on')) {
        existingBox.classList.remove('on');
        return;
      }
      existingBox.classList.add('on');
      existingBox.style.top = (offset.bottom + window.scrollY + 5) + 'px';
      existingBox.style.left = offset.left + 'px';
      return;
    }

    var box = document.createElement('div');
    box.id = id;
    box.className = 'article-share-box on';
    box.innerHTML = [
      '<input class="article-share-input" value="' + url + '" readonly>',
      '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodedUrl + '" target="_blank" title="Twitter" style="color:#1DA1F2;">𝕏</a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" target="_blank" title="Facebook" style="color:#1877F2;">f</a>',
        '<a href="https://service.weibo.com/share/share.php?url=' + encodedUrl + '&title=' + encodeURIComponent(title) + '" target="_blank" title="微博" style="color:#E6162D;">微</a>',
      '</div>'
    ].join('');

    // Style the share box
    box.style.cssText = [
      'position: absolute;',
      'z-index: 1000;',
      'top: ' + (offset.bottom + window.scrollY + 5) + 'px;',
      'left: ' + offset.left + 'px;',
      'background: #111118;',
      'border: 1px solid #00f0ff;',
      'padding: 12px;',
      'box-shadow: 0 0 15px rgba(0,240,255,0.2);',
      'min-width: 200px;'
    ].join('');

    var input = box.querySelector('.article-share-input');
    input.style.cssText = [
      'width:100%;',
      'background:#0a0a0f;',
      'border:1px solid #1a1a2e;',
      'color:#00f0ff;',
      'padding:6px 10px;',
      'font-family:monospace;',
      'font-size:0.8rem;',
      'margin-bottom:8px;',
      'outline:none;'
    ].join('');

    var linksDiv = box.querySelector('.article-share-links');
    linksDiv.style.cssText = 'display:flex;gap:12px;justify-content:center;';

    var linkEls = linksDiv.querySelectorAll('a');
    linkEls.forEach(function(a) {
      a.style.cssText = [
        'font-family:monospace;',
        'font-size:1rem;',
        'font-weight:bold;',
        'text-decoration:none;',
        'padding:5px 10px;',
        'border:1px solid #1a1a2e;',
        'transition:all 0.3s;'
      ].join('');
    });

    document.body.appendChild(box);

    // Auto-select input
    input.focus();
    input.select();
  });

  // ========== Add scanline toggle on double-click ==========
  var scanlineEnabled = true;
  document.addEventListener('dblclick', function(e) {
    if (e.target.closest('input') || e.target.closest('textarea')) return;
    scanlineEnabled = !scanlineEnabled;
    document.body.style.setProperty('--scanline-opacity', scanlineEnabled ? '0.03' : '0');
  });

  console.log('%c CYBERPUNK %c THEME LOADED ',
    'background:#00f0ff;color:#000;padding:4px 8px;font-family:monospace;font-weight:bold;',
    'background:#ff00ff;color:#000;padding:4px 8px;font-family:monospace;font-weight:bold;'
  );

})();
