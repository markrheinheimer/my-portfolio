const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const submit = document.getElementById('submit');

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

submit.addEventListener('click', () => {
  e.preventdefault();
  console.log('hello');
});

document.addEventListener('DOMContentLoaded', () => {
  const professional = document.getElementById('professional');
  const journey = document.getElementById('journey');
  const favorite = document.getElementById('favorite');
  const imageContainer = document.getElementById('image-container');
  const guestButton = document.querySelector('.cta-btn-guest');

  setTimeout(() => {
    professional.classList.add('move');
  }, 100);
  setTimeout(() => {
    journey.classList.add('move');
  }, 300);
  setTimeout(() => {
    favorite.classList.add('move');
  }, 600);
  setTimeout(() => {
    imageContainer.classList.add('move');
  }, 1100);

  guestButton.style.transform = 'scale(1)';
});
