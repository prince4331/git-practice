document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(searchForm));
      // Basic demo: display a toast-like message
      showToast(`Searching: ${data.destination || 'Anywhere'} · ${data.dates || 'Anytime'} · ${data.travelers || '1'}`);
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = new FormData(newsletterForm).get('email');
      showToast(`Thanks for subscribing, ${email}!`);
      newsletterForm.reset();
    });
  }
});

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.left = '50%';
  toast.style.bottom = '24px';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(20,24,32,0.9)';
  toast.style.color = '#fff';
  toast.style.border = '1px solid rgba(255,255,255,0.14)';
  toast.style.borderRadius = '12px';
  toast.style.padding = '10px 14px';
  toast.style.zIndex = '1000';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
  toast.style.fontWeight = '600';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

