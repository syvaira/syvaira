// Particle Background
particlesJS('particles-js', {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#4177c2" },
        shape: { type: "circle" },
        opacity: { value: 0.4 },
        size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: "#f48142", opacity: 0.5, width: 1 },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 100 } }
    },
    retina_detect: true
});

// network smooth
document.querySelectorAll('a[href="#network-section"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("#network-section").scrollIntoView({
            behavior: "smooth"
        });
    });
});


// Mobile Menu Toggle
const toggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let open = false;

toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // cegah bubbling ke document
    open = !open;
    mobileMenu.classList.toggle('hidden', !open);
    menuIcon.classList.toggle('icon-active', open);
});

// Auto-close saat klik link di menu
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        open = false;
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('icon-active');
    });
});

// Auto-close saat klik di luar menu dan tombol
document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickToggle = toggle.contains(e.target);

    if (open && !isClickInsideMenu && !isClickToggle) {
        open = false;
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('icon-active');
    }
});


// Network 
// Observer untuk animasi saat scroll masuk viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      item.classList.remove('opacity-0');
      item.classList.add('opacity-100');
      observer.unobserve(item); // hanya animasi sekali
    }
  });
}, { threshold: 0.1 });

// Observe semua .fade-on-scroll yang tidak hidden
function observeVisibleItems() {
  document.querySelectorAll('.fade-on-scroll:not(.hidden)').forEach(item => {
    observer.observe(item);
  });
}

// Panggil saat ganti network
function animateFade(showItems, hideItems) {
    // Sembunyikan item yang tidak relevan
    hideItems.forEach(item => {
      item.classList.remove('opacity-100');
      item.classList.add('opacity-0');
      setTimeout(() => {
        item.classList.add('hidden');
      }, 500); // Sesuaikan dengan durasi CSS
    });
  
    // Tampilkan item yang akan ditampilkan
    showItems.forEach(item => {
      item.classList.remove('hidden');
      item.classList.remove('opacity-100'); // Reset kalau sebelumnya sempat ditampilkan
      item.classList.add('opacity-0');      // Mulai dari transparan
      setTimeout(() => {
        observeVisibleItems(); // Biarkan IntersectionObserver yang mengatur fade-in
      }, 50); // Delay sedikit supaya DOM sempat render
    });
  }
  

const mainnetBtn = document.getElementById('mainnet-btn');
const testnetBtn = document.getElementById('testnet-btn');
const networkList = document.getElementById('network-list');

function toggleNetwork(type) {
  const mainnetItems = networkList.querySelectorAll('.mainnet');
  const testnetItems = networkList.querySelectorAll('.testnet');

  if (type === 'mainnet') {
    animateFade(mainnetItems, testnetItems);
  } else {
    animateFade(testnetItems, mainnetItems);
  }
}

function updateButtonStyles(active, inactive) {
  active.classList.add('bg-primary');
  active.classList.remove('bg-surface');
  inactive.classList.add('bg-surface');
  inactive.classList.remove('bg-primary');
}

mainnetBtn.addEventListener('click', () => {
  toggleNetwork('mainnet');
  updateButtonStyles(mainnetBtn, testnetBtn);
});

testnetBtn.addEventListener('click', () => {
  toggleNetwork('testnet');
  updateButtonStyles(testnetBtn, mainnetBtn);
});

// Default
toggleNetwork('mainnet');
updateButtonStyles(mainnetBtn, testnetBtn);
