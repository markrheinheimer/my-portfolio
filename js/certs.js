const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const submit = document.getElementById('submit');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

window.addEventListener('DOMContentLoaded', () => {
  const one = document.getElementById('one');
  const two = document.getElementById('two');
  const three = document.getElementById('three');
  const four = document.getElementById('four');
  console.log('hi');

  setTimeout(() => {
    one.classList.add('move');
  }, 200);
  setTimeout(() => {
    two.classList.add('move');
  }, 500);
  setTimeout(() => {
    three.classList.add('move');
  }, 800);
  setTimeout(() => {
    four.classList.add('move');
  }, 1200);
});
