const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  navToggle.querySelector('i').classList.toggle('fa-times');
  navToggle.querySelector('i').classList.toggle('fa-bars');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    mainNav.classList.remove('open');
    navToggle.querySelector('i').classList.remove('fa-times');
    navToggle.querySelector('i').classList.add('fa-bars');
  }
});

const links = document.querySelectorAll('.main-nav a');
links.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 760) {
      mainNav.classList.remove('open');
      navToggle.querySelector('i').classList.remove('fa-times');
      navToggle.querySelector('i').classList.add('fa-bars');
    }
  });
});
