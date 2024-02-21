document.addEventListener('DOMContentLoaded', function () {
  const baseColor = rgbToHex(sessionStorage.getItem('color'));

  document.querySelector('.top-third').style.backgroundColor = baseColor;
  document.querySelector('.bottom-third').style.backgroundColor = baseColor;

  document.querySelector('.top-bottom-section').style.backgroundColor = baseColor;
  document.querySelector('.bottom-top-section').style.backgroundColor = baseColor;
  document.querySelector('.circle').style.backgroundColor = baseColor;
  
  let time = 0;
  const frequency = 0.25; 
  const amplitude = 20; 
  
  function animateSinusoidal() {
    const sineValue = Math.sin(frequency * time) - 0.8;

    const amount = amplitude * sineValue;

    const newColor = calculateShade(baseColor, amount);

    document.querySelector('.top-third').style.backgroundColor = newColor;
    document.querySelector('.bottom-third').style.backgroundColor = newColor;

    time += 0.1;

    requestAnimationFrame(animateSinusoidal);
  }

  animateSinusoidal();

  function rgbToHex(rgb) {
    const values = rgb.substring(4, rgb.length - 1).replace(/ /g, '').split(',');
  
    const hexValues = values.map(val => {
      const hex = parseInt(val).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    });
  
    return '#' + hexValues.join('');
  }
  

  function calculateShade(col, amt) {
    let usePound = false;

    if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);

    let r = Math.min(255, Math.max(0, (num >> 16) + amt));
    let b = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    let g = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }
});

