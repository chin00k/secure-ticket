var hasTouchScreen = false;
var switchToAlt = true;

if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
} 

if (!hasTouchScreen) {
  alert(`It seems like you are using a desktop browser.
This tool is intended to be used only on phones.
Features may not look/behave correctly on desktop.`);
 
}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.color-tile').forEach(function(tile) {
      tile.addEventListener('click', function() {

        document.querySelectorAll('.color-tile').forEach(function(tile) {
          tile.classList.remove('selected');
        });
       

        tile.classList.add('selected');
      });
    });
  });
  
  function submitForm() {
    var activationTime = new Date(document.getElementById('activation-time').value);
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;
    var ticketnum = document.getElementById('ticketnum').value;
    var selectedColor = document.querySelector('.color-tile.selected');
    var dropdown = document.querySelector('select');

    var selectedOption = dropdown.options[dropdown.selectedIndex].value;

    var tnstring = new String(document.getElementById('ticketnum').value);
    
    // Check if any required field is empty
    if (!activationTime || !origin || !destination || !ticketnum || !selectedColor) {
      alert('Please fill out all fields.');
      return;
    }

    if (isDateValid(activationTime)){
      alert('Activation time must be more than 5 minutes ago.');
      return;
    }
  
    var randomSecond = Math.floor(Math.random() * 60);
    activationTime.setSeconds(randomSecond);

    var color = window.getComputedStyle(selectedColor).getPropertyValue('background-color');
  
  
    sessionStorage.setItem('activationTime', activationTime);
    sessionStorage.setItem('origin', origin);
    sessionStorage.setItem('destination', destination);
    sessionStorage.setItem('ticketnum', ticketnum);
    sessionStorage.setItem('color', color);
    sessionStorage.setItem('mode', selectedOption);

    if (tnstring.startsWith('MZ')){
      window.open('created.html', '_blank');
    }
    else{
      window.open('alternate.html', '_blank');
    }
  }

  function isDateValid(inputDate) {
    const currentTime = new Date();
  
    const timeDifference = currentTime - inputDate;
  
    if (timeDifference < 300000) {
      return true;
    }

    return false;
  }