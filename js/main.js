// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // close menu after clicking a link (mobile)
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('open'));
  });
}

// Auto-update footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

