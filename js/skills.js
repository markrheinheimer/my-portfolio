const toggle = document.getElementById('toggle');
const skill1 = document.querySelector('.skill1');
const skill2 = document.querySelector('.skill2');
const skill3 = document.querySelector('.skill3');
const skill4 = document.querySelector('.skill4');
const skill5 = document.querySelector('.skill5');
const skill6 = document.querySelector('.skill6');
const skill7 = document.querySelector('.skill7');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

setTimeout(() => {
  skill7.classList.add('drop');
}, 100);
setTimeout(() => {
  skill6.classList.add('drop');
}, 250);
setTimeout(() => {
  skill5.classList.add('drop');
}, 500);
setTimeout(() => {
  skill4.classList.add('drop');
}, 750);
setTimeout(() => {
  skill3.classList.add('drop');
}, 1000);
setTimeout(() => {
  skill2.classList.add('drop');
}, 1250);
setTimeout(() => {
  skill1.classList.add('drop');
}, 1500);
