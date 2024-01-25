const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const submit = document.getElementById('submit');
const toggle = document.getElementById('toggle');
const formName = document.getElementById('name');
const formEmail = document.getElementById('email');
const formMessage = document.getElementById('message');
const mrtitle = document.querySelector('.mrtitle');
const mricon = document.querySelector('.mr-icon');
const modalForm = document.querySelector('.modal-form');
const weatherApp = document.querySelector('.app-move');

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
window.addEventListener('click', (e) =>
  e.target === modal ? modal.classList.remove('show-modal') : false
);

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
  setTimeout(() => {
    weatherApp.classList.add('blur-remove');
  }, 2850);
  setTimeout(() => {
    document.body.classList.toggle('show-nav');
  }, 3500);
});

// Toggle nav
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
  toggle.classList.toggle('clicked');
  weatherApp.classList.toggle('move');
});

let templateParams = {
  name: 'John Smith',
  email: 'johnny@email.com',
  message: 'How about them apples!!',
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  let nameField = modalForm.name.value;
  let emailField = modalForm.email.value;
  let messageField = modalForm.message.value;

  if (nameField === '') {
    formName.style.border = '2px solid';
    formName.style.borderColor = '#a91010';
    alert('Please enter a name');
  } else {
    formName.style.border = '2px solid';
    formName.style.borderColor = 'black';
    templateParams.name = nameField;
  }

  if (emailField === '') {
    formEmail.style.border = '2px solid';
    formEmail.style.borderColor = '#a91010';
    alert('Please enter an email address');
  } else {
    formEmail.style.border = '2px solid';
    formEmail.style.borderColor = 'black';
    templateParams.email = emailField;
  }

  if (messageField === '') {
    formMessage.style.border = '2px solid';
    formMessage.style.borderColor = '#a91010';
    alert('Please enter a message');
  } else {
    formMessage.style.border = '2px solid';
    formMessage.style.borderColor = 'black';
    templateParams.message = messageField;
  }

  if (nameField && emailField && messageField) {
    emailjs.send('default_service', 'template_jl59q1i', templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );
    setTimeout(() => {
      location.reload();
    }, 600);
  }
});
