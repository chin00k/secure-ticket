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
    
    // Check if any required field is empty !activationTime || !origin || !destination || !ticketnum ||
    if (!selectedColor) {
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
  
  
    // Store values in sessionStorage
    sessionStorage.setItem('activationTime', activationTime);
    sessionStorage.setItem('origin', origin);
    sessionStorage.setItem('destination', destination);
    sessionStorage.setItem('ticketnum', ticketnum);
    sessionStorage.setItem('color', color);
  
    // Open the new tab with the second page
    window.open('created.html', '_blank');
  }

  function isDateValid(inputDate) {
    const currentTime = new Date();
  
    const timeDifference = currentTime - inputDate;
  
    if (timeDifference < 300000) {
      return true;
    }

    return false;
  }