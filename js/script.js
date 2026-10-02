/* =================================================================
   CHP Automação
   JavaScript puro (Vanilla JS)
   ================================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------
     1. HEADER — sombra ao rolar
     --------------------------------------------------------------- */
  var header = document.getElementById('header');

  function updateHeaderOnScroll() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });


  /* ---------------------------------------------------------------
     2. MENU MOBILE
     --------------------------------------------------------------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  var mobileMenuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenuOverlay.classList.add('is-open');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.removeAttribute('inert');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenuOverlay.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', function () {
    if (mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  mobileMenuLinks.forEach(function (link) { link.addEventListener('click', closeMobileMenu); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });


  /* ---------------------------------------------------------------
     3. SCROLL SUAVE
     --------------------------------------------------------------- */
  var internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 100;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });


  /* ---------------------------------------------------------------
     4. ANIMAÇÕES DE ENTRADA (IntersectionObserver)
     --------------------------------------------------------------- */
  var animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = (index % 4) * 70;
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(function (el) { observer.observe(el); });
  } else {
    animatedEls.forEach(function (el) { el.classList.add('is-visible'); });
  }


  /* ---------------------------------------------------------------
     5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
     --------------------------------------------------------------- */
  var form = document.getElementById('contactForm');

  if (form) {
    var fields = {
      name: { input: document.getElementById('name'), error: document.getElementById('nameError'), required: true },
      company: { input: document.getElementById('company'), error: document.getElementById('companyError'), required: false },
      email: { input: document.getElementById('email'), error: document.getElementById('emailError'), required: true },
      phone: { input: document.getElementById('phone'), error: document.getElementById('phoneError'), required: true },
      message: { input: document.getElementById('message'), error: document.getElementById('messageError'), required: true }
    };
    var feedback = document.getElementById('formFeedback');

    function showError(field, message) {
      fields[field].input.classList.add('is-invalid');
      fields[field].error.textContent = message;
    }

    function clearError(field) {
      fields[field].input.classList.remove('is-invalid');
      fields[field].error.textContent = '';
    }

    function isValidEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

    function isValidPhone(value) {
      var digits = value.replace(/\D/g, '');
      return digits.length >= 10 && digits.length <= 11;
    }

    function validateField(field) {
      var value = fields[field].input.value.trim();

      if (!fields[field].required) {
        clearError(field);
        return true;
      }

      if (field === 'name' && value.length < 3) {
        showError('name', 'Digite seu nome completo.');
        return false;
      }
      if (field === 'email' && !isValidEmail(value)) {
        showError('email', 'Digite um e-mail válido.');
        return false;
      }
      if (field === 'phone' && !isValidPhone(value)) {
        showError('phone', 'Digite um telefone válido com DDD.');
        return false;
      }
      if (field === 'message' && value.length < 10) {
        showError('message', 'Escreva uma mensagem com pelo menos 10 caracteres.');
        return false;
      }

      clearError(field);
      return true;
    }

    Object.keys(fields).forEach(function (field) {
      fields[field].input.addEventListener('blur', function () { validateField(field); });
      fields[field].input.addEventListener('input', function () {
        if (fields[field].input.classList.contains('is-invalid')) { validateField(field); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      var validName = validateField('name');
      var validEmail = validateField('email');
      var validPhone = validateField('phone');
      var validMessage = validateField('message');

      if (validName && validEmail && validPhone && validMessage) {
        // Envio real ainda não implementado — apenas validação no front-end,
        // conforme padrão dos outros projetos. Integrar com backend/e-mail futuramente.
        feedback.textContent = 'Mensagem validada com sucesso! Em breve retornaremos o contato.';
        feedback.classList.add('is-success');
        form.reset();
      } else {
        feedback.textContent = 'Verifique os campos destacados antes de enviar.';
        feedback.classList.add('is-error');
      }
    });
  }

});
