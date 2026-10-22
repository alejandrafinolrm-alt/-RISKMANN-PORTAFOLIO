/**
 * ============================================================================
 * RISKMANN CORPORATE JAVASCRIPT - SCRIPT.JS
 * Suite Tecnológica Riskmann (SOFU BIC S.A.S)
 * Interacciones: TOC dinámica, Menú móvil, Smooth Scroll, Filtros y Métricas
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. Control del Menú Móvil (Drawer) ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-drawer .nav-link, .mobile-drawer .toc-item-link');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', function (e) {
      if (e.target === mobileDrawer) {
        closeMobileMenu();
      }
    });
  }

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- 2. Header con Sombra al hacer Scroll ---
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY || window.pageYOffset;

    if (siteHeader) {
      if (scrollPos > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 3. TOC Dinámica y Resaltado de Sección Activa (IntersectionObserver) ---
  const tocLinks = document.querySelectorAll('.toc-item-link');
  const trackedSections = document.querySelectorAll('section[id]');

  if (trackedSections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          tocLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    trackedSections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // --- 4. Filtro Rápido en la Tabla Matriz PESV (Si existe en la página) ---
  const tableFilterInput = document.getElementById('table-filter-input');
  const pesvTable = document.getElementById('pesv-matrix-table');

  if (tableFilterInput && pesvTable) {
    tableFilterInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      const rows = pesvTable.querySelectorAll('tbody tr');

      rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        if (text.indexOf(query) !== -1) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // --- 5. Botones de Imprimir o Exportar PDF ---
  const printButtons = document.querySelectorAll('.btn-print-trigger');
  printButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.print();
    });
  });

  // --- 6. Animación de Contadores en Métricas (Counter Up) ---
  const counterElements = document.querySelectorAll('.counter-animate');
  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    let countersStarted = false;

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          counterElements.forEach(function (el) {
            const targetVal = parseInt(el.getAttribute('data-target'), 10);
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.floor(easeOut * targetVal);

              el.textContent = prefix + currentCount.toLocaleString('es-CO') + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = prefix + targetVal.toLocaleString('es-CO') + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
          });
        }
      });
    }, { threshold: 0.3 });

    const metricsContainer = document.querySelector('.metrics-corporate-banner');
    if (metricsContainer) {
      counterObserver.observe(metricsContainer);
    }
  }

});
