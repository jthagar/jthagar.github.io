/* eslint-disable require-jsdoc */
// const fs = require('fs'); // use fs library to read/write files

const sections = document.querySelectorAll('.section');
const secBtns = document.querySelectorAll('.controls');
const secBtn = document.querySelectorAll('.control');
const allSections = document.querySelectorAll('.main-content');
// eslint-disable-next-line no-var

function PageTransitions() {
  // Button click to change button active class
  for (let i = 0; i < secBtn.length; i++) {
    secBtn[i].addEventListener('click', () => {
      // find current active button and remove active
      const currentBtn = document.querySelectorAll('.active-btn');
      currentBtn[0].className = currentBtn[0].className.replace(
          // eslint-disable-next-line comma-dangle
          'active-btn', ''
      );
      // add active to newly clicked button
      secBtn[i].className += ' active-btn';
    });
  }

  // Section change for active class
  allSections[0].addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (id) {
      // remove selected section from other buttons
      secBtns.forEach((btn) => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');

      // hide other sections
      sections.forEach((section) => {
        section.classList.remove('active');
      });

      // show selected section
      const element = document.getElementById(id);
      element.classList.add('active');
    }
  });

  // Toggle lightmode themes
  // get html element with button
  const themeBtn = document.querySelectorAll('.theme-btn-con');
  // create a listener for when the button is clicked
  themeBtn[0].addEventListener('click', () => {
    const element = document.body;
    element.classList.toggle('light-mode'); // toggle light-mode
  });

  // add fxn to append submitted contact message to messages.json
}

// call functions
// eslint-disable-next-line new-cap
PageTransitions();
