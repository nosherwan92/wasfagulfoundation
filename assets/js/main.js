// Wasfa Gul Foundation — interactive helpers

document.addEventListener('DOMContentLoaded', () => {
  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  const setScrolled = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const duration = 1600;
    const start = performance.now();
    const format = (n) => {
      if (target >= 1000) return Math.round(n).toLocaleString();
      if (target % 1 !== 0) return n.toFixed(1);
      return Math.round(n).toString();
    };
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(eased * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = format(target);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cio.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  // Donation tier selection (radiogroup) — supports both label-wrapped radios and legacy click pattern
  const tiers = document.querySelectorAll('.donation-tier');
  const amountInput = document.getElementById('donation-amount');
  tiers.forEach(t => {
    const radio = t.querySelector('input[type="radio"]');
    const sync = () => {
      tiers.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const v = (radio && radio.value) || t.dataset.value || '';
      if (amountInput && v && v !== 'other') amountInput.value = v;
    };
    if (radio) radio.addEventListener('change', sync);
    t.addEventListener('click', sync);
  });

  // Donate dropdown — keyboard accessibility
  document.querySelectorAll('.donate-dropdown > a, .donate-dropdown > button').forEach(trigger => {
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const first = trigger.parentElement.querySelector('.donate-dropdown-menu a');
        if (first) first.focus();
      }
    });
  });
  document.querySelectorAll('.donate-dropdown-menu').forEach(menu => {
    menu.addEventListener('keydown', (e) => {
      const items = [...menu.querySelectorAll('a')];
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i+1) % items.length]?.focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); items[(i-1+items.length) % items.length]?.focus(); }
      if (e.key === 'Escape')    { menu.parentElement.querySelector('a,button')?.focus(); }
    });
  });

  // Zakat calculator
  const zForm = document.getElementById('zakat-calc');
  if (zForm) {
    const out = document.getElementById('zakat-result');
    const fmt = (n) => 'PKR ' + Math.round(n).toLocaleString();
    const recompute = () => {
      const get = (id) => parseFloat(document.getElementById(id).value) || 0;
      const cash = get('z-cash');
      const gold = get('z-gold');
      const silver = get('z-silver');
      const business = get('z-business');
      const investments = get('z-investments');
      const liabilities = get('z-liabilities');
      // Gold approx PKR 30,000/g, silver PKR 350/g (rough 2026 PK retail; user can override)
      const goldPrice = parseFloat(document.getElementById('z-gold-price').value) || 30000;
      const silverPrice = parseFloat(document.getElementById('z-silver-price').value) || 350;
      const total = cash + (gold * goldPrice) + (silver * silverPrice) + business + investments - liabilities;
      const nisab = 87.48 * goldPrice; // Gold-equivalent Nisab threshold (87.48g pure gold)
      const zakatDue = total >= nisab ? total * 0.025 : 0;
      out.querySelector('.value').textContent = fmt(Math.max(0, zakatDue));
      out.querySelector('.nisab').textContent = 'Nisab threshold: ' + fmt(nisab) + (total < nisab && total > 0 ? ' (your wealth is below Nisab — Zakat is not obligatory)' : '');
    };
    zForm.addEventListener('input', recompute);
    recompute();
  }

  // Real forms → Web3Forms (delivers submissions to the Foundation's inbox)
  const setStatus = (form, msg, ok) => {
    const s = form.querySelector('.form-status');
    if (s) { s.textContent = msg; s.style.color = ok ? 'var(--color-secondary)' : '#c0392b'; }
  };
  document.querySelectorAll('form[data-web3]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      setStatus(form, 'Sending…', true);
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        const data = await res.json();
        if (data.success) {
          setStatus(form, 'Thank you! Your message has been sent — we will respond shortly.', true);
          form.reset();
        } else {
          setStatus(form, 'Sorry, something went wrong. Please email us at wasfagulfoundation@gmail.com.', false);
        }
      } catch (err) {
        setStatus(form, 'Network error. Please email us at wasfagulfoundation@gmail.com.', false);
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
      }
    });
  });

  // Demo forms (e.g. newsletter) — show confirmation without sending
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thank you. Your message has been received. We will respond shortly.';
        status.style.color = 'var(--color-secondary)';
      }
      form.reset();
    });
  });
});
