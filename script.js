const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const submit = document.getElementById('submit');

function storeResult(e) {
  console.log(e);
  e.preventdefault();
  console.log(e);
}

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
window.addEventListener('click', (e) =>
  e.target === modal ? modal.classList.remove('show-modal') : false
);

submit.addEventListener('click', console.log(this));
