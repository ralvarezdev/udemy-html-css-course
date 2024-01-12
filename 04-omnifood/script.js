'use strict';

// Elements
const header = document.querySelector(".header");
const sectionHero = document.querySelector(".section-hero");
const body = document.querySelector("body");

// Current Date
const date = new Date();
const year = date.getFullYear();

// Get Span with "year" as Class Name
const footerYear = document.querySelector(".year");
footerYear.textContent = year;

// Get Mobile Navigation Button
const btnMobileNav = document.querySelector(".btn-mobile-nav");
btnMobileNav.addEventListener('click', event =>
{
  event.preventDefault();
  header.classList.toggle("nav-open");
});

// --- Smooth Scrolling Animation

// Selects All the Anchor Elements with the href Attribute
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(link => link.addEventListener('click', event =>
{
  event.preventDefault();

  const href = link.getAttribute('href');

  // Scroll Back to Top
  if (href === '#')
  {
    window.scrollTo({
      top: 0,
      behaviour: 'smooth'
    });
    return;
  }

  // Scroll to the Element
  const id = href.slice(1);
  const element = document.getElementById(id);

  element.scrollIntoView({ behavior: 'smooth' });

  // Close Mobile Navigation
  if (link.classList.contains('main-nav-link'))
    btnMobileNav.dispatchEvent(new Event('click'));
}));

// Sticky Animation
const navHeight = header.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = entries =>
{
  const [entry] = entries;

  if (!entry.isIntersecting) body.classList.add('sticky');
  else body.classList.remove('sticky');
};

const observer = new IntersectionObserver(stickyNav, {
  root: null, // Viewport
  threshold: 0, // Fired as Soon as It Hits the Viewport
  rootMargin: `-${ navHeight }px`
});
observer.observe(sectionHero);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap ()
{
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// Smooth Scrolling for Old Safari Versions
// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
