// Inicializa ícones
lucide.createIcons();

// --- MENU MOBILE ---
function toggleMenu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
}

// Fechar menu ao clicar no mobile
document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      document.getElementById("nav").classList.remove("active");
    }
  });
});

// --- SCROLL SUAVE CORRIGIDO ---
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    const targetElement = document.querySelector(id);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Funções para a Galeria Modal
function openGallery() {
  const modal = document.getElementById("galleryModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Trava o scroll do site ao abrir

  // Animação de entrada rápida com GSAP
  gsap.from(".full-gallery-grid img", {
    duration: 0.5,
    scale: 0.8,
    opacity: 0,
    stagger: 0.05,
    ease: "power2.out",
  });
}

// 1. Abrir/Fechar Modal da Galeria
function openGallery() {
  document.getElementById("galleryModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
  document.body.style.overflow = "auto";
}

// 2. Lógica do Visualizador de Imagens
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const images = document.querySelectorAll(".grid-item");
let currentIndex = 0;

function updateViewerImage() {
  viewerImg.classList.remove("show");
  setTimeout(() => {
    const bg = images[currentIndex].style.backgroundImage;
    const url = bg.slice(5, -2).replace(/"/g, "");
    viewerImg.src = url;
  }, 200);
  viewerImg.onload = () => viewerImg.classList.add("show");
}

images.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    const bg = item.style.backgroundImage;
    const url = bg.slice(5, -2).replace(/"/g, "");

    viewerImg.src = url;
    viewer.classList.add("active");
    setTimeout(() => viewerImg.classList.add("show"), 10);
  });
});

document.querySelector(".close-viewer").addEventListener("click", () => {
  viewer.classList.remove("active");
  viewerImg.classList.remove("show");
});

// Navegação do Visualizador
document.querySelector(".next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateViewerImage();
});

document.querySelector(".prev-btn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateViewerImage();
});

// Atalhos de Teclado
document.addEventListener("keydown", (e) => {
  if (!viewer.classList.contains("active")) return;
  if (e.key === "Escape") document.querySelector(".close-viewer").click();
  if (e.key === "ArrowRight") document.querySelector(".next-btn").click();
  if (e.key === "ArrowLeft") document.querySelector(".prev-btn").click();
});

function updateViewerImage() {
  viewerImg.classList.remove("show");

  setTimeout(() => {
    const bg = images[currentIndex].style.backgroundImage;
    // Regex melhorada para pegar a URL independente de aspas
    const url = bg.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
    viewerImg.src = url;
  }, 250);

  viewerImg.onload = () => {
    viewerImg.classList.add("show");
  };
}
