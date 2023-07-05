const toggle = document.getElementById('toggle');
const close = document.getElementById('close');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);
