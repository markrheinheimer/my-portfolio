const toggle1 = document.getElementById('toggle1');

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
    one.classList.add = 'show';
  }, 200);
  setTimeout(() => {
    two.style.transform = 'translateX(0)';
  }, 200);
  setTimeout(() => {
    three.style.transform = 'translateX(0)';
  }, 200);
  setTimeout(() => {
    four.style.transform = 'translateX(0)';
  }, 200);
});
