import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

document.getElementById("openDisclaimer").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("disclaimerModal").style.display = "block";
  });

  document.getElementById("closeDisclaimer").addEventListener("click", function() {
    document.getElementById("disclaimerModal").style.display = "none";
  });

  // Cerrar si se hace clic fuera del contenido
  window.onclick = function(event) {
    let modal = document.getElementById("disclaimerModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
