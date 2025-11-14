document.addEventListener('DOMContentLoaded', () => {
  const signin = document.getElementById('signinBtn');
  const signup = document.getElementById('signupBtn');

  if (signin) signin.addEventListener('click', () => { window.location.href = 'signin.html'; });
  if (signup) signup.addEventListener('click', () => { window.location.href = 'signup.html'; });

  // keyboard accessibility
  [signin, signup].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });
});