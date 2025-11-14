document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signinForm');
  const msg = document.getElementById('signinMessage');

  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  const setMessage = (text = '', type = '') => {
    if (!msg) return;
    msg.textContent = text;
    if (!type) {
      msg.style.color = '';
    } else if (type === 'success') {
      msg.style.color = '#b8ffda';
    } else if (type === 'error') {
      msg.style.color = '#ffd1e8';
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setMessage('', '');

    const emailEl = form.querySelector('[name="email"]') || form.email;
    const passEl = form.querySelector('[name="password"]') || form.password;

    const email = (emailEl && emailEl.value || '').trim();
    const password = (passEl && passEl.value) || '';

    if (!email) {
      setMessage('Please enter your email.', 'error');
      emailEl?.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Please enter a valid email address.', 'error');
      emailEl?.focus();
      return;
    }
    if (!password || password.length < 8) {
      setMessage('Please enter a password (min 8 characters).', 'error');
      passEl?.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.orig = submitBtn.textContent;
      submitBtn.textContent = 'Signing in...';
    }

    try {
      // Replace this simulated request with real fetch to your auth endpoint.
      const simulated = await new Promise((resolve) =>
        setTimeout(() => resolve({ ok: email.includes('@') }), 700)
      );

      if (simulated && simulated.ok) {
        setMessage('Signed in. Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 700);
      } else {
        setMessage('Invalid credentials.', 'error');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.orig || 'Sign In';
        delete submitBtn.dataset.orig;
      }
    }
  });

  // accessibility: Enter/Space on focused buttons
  form.querySelectorAll('button, [role="button"]').forEach(btn => {
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); btn.click(); }
    });
  });
});
