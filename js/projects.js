const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const img3 = document.querySelector('.img3');
const img4 = document.querySelector('.img4');

toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

document.addEventListener(
  'DOMContentLoaded',
  () => {
    setTimeout(() => {
      img1.classList.add('move');
      img2.classList.add('move');
      img3.classList.add('move');
      img4.classList.add('move');
    });
  },
  200
);
