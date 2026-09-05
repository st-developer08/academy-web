import './style.css'


// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.querySelector('nav.primary');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    // Close the mobile menu after clicking a link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Contact form — sends via the user's email client (mailto)
  var contactForm = document.getElementById('contactForm');
  var contactNote = document.getElementById('cf-note');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        contactNote.textContent = 'Please fill in all fields.';
        return;
      }

      var subject = 'Message from ' + name + ' — via website';
      var body = message + '\n\n— ' + name + ' (' + email + ')';
      var mailtoLink = 'mailto:bekturdievavazira5@gmail.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailtoLink;
      contactNote.textContent = 'Opening your email app…';
      contactForm.reset();
    });
  }

  // Back to top button
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll-in animations
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll(
    '.focus-card, .project, .origin-item, .t-stop, .stat, .stamp, ' +
    '.letter-card, .pub-item, .journal-feature, .contact-form, .contact-info'
  );

  if (revealTargets.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (el) {
        el.classList.add('reveal', 'in-view');
      });
    } else {
      revealTargets.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
      });

      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      revealTargets.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  // Gentle entrance animation for the hero content
  var heroEls = document.querySelectorAll(
    '.hero .kicker, .hero h1, .hero p.lede, .hero .badge-row, .hero .passport-card'
  );
  heroEls.forEach(function (el, i) {
    if (prefersReducedMotion) {
      el.classList.add('reveal-hero', 'in-view');
      return;
    }
    el.classList.add('reveal-hero');
    setTimeout(function () {
      el.classList.add('in-view');
    }, 120 + i * 120);
  });
});