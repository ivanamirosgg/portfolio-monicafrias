// // --- Lógica del Preloader ---
// window.addEventListener("load", () => {
//   const preloader = document.getElementById("preloader");
//   // Esperamos 1 segundo para que se vea el nombre y luego subimos el telón
//   setTimeout(() => {
//     preloader.classList.add("hide");
//   }, 1000);
// });
// --- 1. Lógica del Cursor Personalizado ---
const cursorDot = document.getElementById("cursorDot");
const cursorOutline = document.getElementById("cursorOutline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  // El punto sigue al mouse instantáneamente
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // El círculo externo tiene un leve retraso (animación fluida)
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Efecto hover en enlaces (el círculo se agranda)
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.borderColor = "transparent";
        cursorOutline.style.backgroundColor = "rgba(191, 166, 136, 0.2)"; // Color dorado transparente
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.borderColor = "rgba(26, 26, 26, 0.5)";
        cursorOutline.style.backgroundColor = "transparent";
    });
});

// --- 2. Animación al hacer Scroll (Intersection Observer) ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

revealElements.forEach(el => revealObserver.observe(el));

// --- EFECTO 3D EN LAS CARTAS (STACKING) ---
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  cards.forEach((card, index) => {
    // Obtenemos la distancia de la carta al top de la ventana
    const rect = card.getBoundingClientRect();
    
    // Si la carta toca la parte superior (está "sticky")
    if (rect.top <= 100) { 
      // Calculamos cuánto escalar hacia abajo (0.95, 0.9, etc)
      // Solo aplicamos esto a las primeras cartas para que las de abajo las tapen
      if (index < cards.length - 1) {
        card.style.transform = `scale(0.95) translateY(10px)`;
        card.style.filter = "brightness(0.9)"; // Se oscurece un poco
      }
    } else {
      // Regresa a la normalidad
      card.style.transform = `scale(1) translateY(0)`;
      card.style.filter = "brightness(1)";
    }
  });
});

// --- MENÚ HAMBURGUESA ---
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const logo = document.querySelector('.logo');
const mobileLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    logo.classList.toggle('active'); // Para que el logo se ponga blanco
});

// Cerrar menú al dar clic en un enlace
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        logo.classList.remove('active');
    });
});