const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const submit = document.getElementById('submit');
const mrtitle = document.querySelector('.mrtitle');
const mricon = document.querySelector('.mr-icon');
const toggle = document.getElementById('toggle');

// Toggle nav

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
  const headerParagraph = document.querySelector('.header-p');
  const toggle = document.getElementById('toggle');

  setTimeout(() => {
    professional.classList.add('move');
  }, 400);
  setTimeout(() => {
    journey.classList.add('move');
  }, 700);
  setTimeout(() => {
    favorite.classList.add('move');
  }, 900);
  setTimeout(() => {
    imageContainer.classList.add('move');
  }, 1400);
  setTimeout(() => {
    headerParagraph.classList.add('moveheader');
  }, 200);
  setTimeout(() => {
    guestButton.classList.add('containergrow');
  }, 2300);
  setTimeout(() => {
    mrtitle.classList.add('headmove');
  }, 150);
  setTimeout(() => {
    mricon.classList.add('headmove');
  }, 150);
  setTimeout(() => {
    toggle.classList.add('togglemove');
  }, 2150);
});

toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});
