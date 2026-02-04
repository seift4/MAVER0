document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));
                
                const activeId = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
});

window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

const themeImages = [
  { id: "logo", light: "imgs/Logo For web-01.svg", dark:  "imgs/Logo For web-02.svg" },
  { id: "heroImg", light: "imgs/color glass effect (1).mp4", dark:  "imgs/color glass effect.mp4" },
  { id: "extraImg", light: "imgs/Logo For web-01.svg", dark:  "imgs/Logo For web-07.svg" },
  { id: "extra", light: "imgs/Logo For web-01.svg", dark:  "imgs/Logo For web-07.svg" },
  { id: "about", light: "imgs/About -01.svg", dark:  "imgs/About V-02.svg" }
];

const toggleBtn = document.getElementById("darkToggle");

function updateImages(isDark) {
  themeImages.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.src = isDark ? item.dark : item.light;
    }
  });
}

const savedTheme = localStorage.getItem("theme");
const isDark = savedTheme === "dark";
if (isDark) document.body.classList.add("dark-mode");
updateImages(isDark);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const nowDark = document.body.classList.contains("dark-mode");
  updateImages(nowDark);
  localStorage.setItem("theme", nowDark ? "dark" : "light");
});

const cursorDot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.transform = `translate(${posX - 6}px, ${posY - 6}px)`;
});

const interactiveElements = document.querySelectorAll('a, button, p, h1, h2, span, li');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-active');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-active');
    });
});

let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.querySelectorAll('.service-header').forEach(header => {
    header.addEventListener('click', () => {
        const currentItem = header.parentElement;
        const currentArrow = header.querySelector('.arrow');
        const isActive = currentItem.classList.contains('active');

        document.querySelectorAll('.service-item').forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('active');
                const otherArrow = item.querySelector('.arrow');
                if (otherArrow) otherArrow.textContent = 'stat_minus_1';
            }
        });

        if (!isActive) {
            currentItem.classList.add('active');
            currentArrow.textContent = 'remove';
        } else {
            currentItem.classList.remove('active');
            currentArrow.textContent = 'stat_minus_1';
        }
    });
});

const traack = document.querySelector('.marquee-track');
const cloneHTML = traack.innerHTML;
traack.innerHTML += cloneHTML;

const section = document.querySelector('.home');

section.addEventListener('mousemove', (e) => {
    const { width, height, left, top } = section.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = x / width;
    const yPercent = y / height;
    const xMove = (xPercent - 0.5) * 5;
    const yMove = (yPercent - 0.5) * 12;
    section.style.backgroundPosition = `calc(50% + ${xMove}px) calc(50% + ${yMove}px)`;
});

const vedSection = document.querySelector('.ved');
const video = vedSection.querySelector('.parallax-media');

vedSection.addEventListener('mousemove', (e) => {
    const { width, height, left, top } = vedSection.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (-mouseY / (height / 2)) * 25; 
    const rotateY = (mouseX / (width / 2)) * 25;

    video.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

vedSection.addEventListener('mouseleave', () => {
    video.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

const modelViewer = document.querySelector("#myModel");

modelViewer.addEventListener('mouseleave', () => {
    modelViewer.autoRotate = true;
});

const modelViewe = document.querySelector('#myModel');

modelViewe.addEventListener('load', () => {
    
    const applyGradient = async () => {
        const material = modelViewe.model.materials[0];
        if (!material) return;

        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#0059ff');
        gradient.addColorStop(0.3, '#54B6F5');
        gradient.addColorStop(.6, '#D6E6F2');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        try {
            const texture = await modelViewer.createTexture(canvas.toDataURL());
            
            if (material.pbrMetallicRoughness.baseColorTexture) {
                material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
            } else {
                material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
            }
            
            material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0.25]);
            material.setAlphaMode("BLEND");
            
        } catch (error) {
            console.error("فشل في تطبيق الألوان:", error);
        }
    };

    applyGradient();
});

const translations = {
  en: {
    home: "HOME",
    works: "WORKS",
    about: "ABOUT",
    services: "SERVICES",
    contact: "CONTACT US",
    heroText: "MODERN VISION, ",
    heroText2: "REAL IDENTITY",
    viewWorks: "VIEW SELECTED WORKS",
    selectWorks: "Selected Works",
    viewAll: "View All",
    weAre: "WE ARE NOT A <span class='highlight'>DRAGONFLY.</span>",
    inspired: "We are inspired by its vision, precision, lightness, and quiet strength.",
    buildBrands: "WE BUILD BRANDS WITH CLARITY, PURPOSE, AND DIRECTION.",
    maverro: "MAVERO is a branding and creative direction agency helping businesses define who they are, how they speak, and how they grow.",
    workWith: "We work with founders and teams who understand that a brand is more than visuals — it’s a system of decisions, behaviors, and meaning.",
    servicesTitle: "Services",
    strategy:       "01 — Strategy",
    brandIdentity:  "02 — Brand Identity",
    creativeDir:    "03 — Creative Direction",
    visualSystems:  "04 — Visual Systems",
    brandGuidelines:"05 — Brand Guidelines",
    brandApps:      "06 — Brand Applications",
    request: "Request",
    connect: "Connect With Us",
    aboutFooter: "ABOUT",
    worksFooter: "WORKS",
    servicesFooter: "SERVICES",
    careersFooter: "CAREERS",
    pricingFooter: "PRICING",
    instagram: "INSTAGRAM",
    linkedIn: "LINKED IN",
    x: "X",
    location: "CAIRO, EGYPT",
    dubai: "DUBAI, UAE",
    comingSoon: "Coming Soon",
    top: "TOP",
    registered: "REGISTERED WITH THE GENERAL AUTHORITY FOR INVESTMENT®",
    taxN: "TAX NUMBER: L775 605-794",
    rights: "2026© ALL RIGHTS RESERVED",
    letsMaveroIt: "Let's Mavero It"
  },

  ar: {
    home: "الرئيسية",
    works: "أعمالنا",
    about: "من نحن",
    services: "خدماتنا",
    contact: "تواصل معنا",
    heroText: "رؤية عصرية، ",
    heroText2: "هوية حقيقية",
    viewWorks: "عرض الأعمال المختارة",
    selectWorks: "أعمال مختارة",
    viewAll: "عرض الكل",
    weAre: "نحن لسنا <span class='highlight'>يعسوب.</span>",
    inspired: "نستوحي من رؤيته ودقته وخفته وقوته الهادئة.",
    buildBrands: "نبني العلامات التجارية بوضوح وهدف واتجاه.",
    maverro: "MAVERO وكالة متخصصة في بناء العلامات التجارية والإخراج الإبداعي، نساعد الشركات على تحديد هويتها، طريقة تواصلها، وكيفية نموها.",
    workWith: "نتعاون مع مؤسسين وفرق تدرك أن العلامة التجارية أكثر من مجرد شكل بصري، إنها نظام من القرارات والسلوكيات والمعاني.",
    servicesTitle: "الخدمات",
    strategy:       "01 — الاستراتيجية",
    brandIdentity:  "02 — هوية العلامة التجارية",
    creativeDir:    "03 — الإخراج الإبداعي",
    visualSystems:  "04 — الأنظمة البصرية",
    brandGuidelines:"05 — دليل استخدام العلامة",
    brandApps:      "06 — تطبيقات العلامة",
    request: "اطلب الخدمة",
    connect: "تواصل معنا",
    aboutFooter: "من نحن",
    worksFooter: "أعمالنا",
    servicesFooter: "خدماتنا",
    careersFooter: "الوظائف",
    pricingFooter: "التسعير",
    instagram: "إنستغرام",
    linkedIn: "لينكد إن",
    x: "إكس",
    location: "القاهرة، مصر",
    dubai: "دبي، الإمارات",
    comingSoon: "قريباً",
    top: "للأعلى",
    registered: "مسجلة لدى الهيئة العامة للاستثمار",
    taxN: "الرقم الضريبي: L775 605-794",
    rights: "© 2026 جميع الحقوق محفوظة",
    letsMaveroIt: "خلينا نعملها مع MAVERO"
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  const toggleBtn = document.getElementById("langToggle");

  if (lang === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.body.classList.add("rtl");
    toggleBtn.textContent = "EN";
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.body.classList.remove("rtl");
    toggleBtn.textContent = "AR";
  }

  localStorage.setItem("lang", lang);
}

document.getElementById("langToggle").addEventListener("click", () => {
  const currentLang = localStorage.getItem("lang") || "en";
  const newLang = currentLang === "en" ? "ar" : "en";
  setLanguage(newLang);
});

window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 1000);
});

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const visiblePoint = 120;
    if (elementTop < windowHeight - visiblePoint) {
      el.classList.add("active");
    }
  });
});

const track = document.querySelector('.marquee-track');
const imgsList = Array.from(track.children);
let trackWidth = 0;

imgsList.forEach(img => {
  trackWidth += img.offsetWidth;
});

imgsList.forEach(img => {
  const clone = img.cloneNode(true);
  track.appendChild(clone);
});

let scrollX = 0;
const speed = 1;

function animate() {
  scrollX -= speed;
  if (scrollX <= -trackWidth) scrollX = 0;
  track.style.transform = `translateX(${scrollX}px)`;
  requestAnimationFrame(animate);
}
animate();

document.addEventListener("click", function (e) {
    const effect = document.getElementById("clickEffect");
    if (effect) {
        effect.style.left = e.clientX + "px";
        effect.style.top = e.clientY + "px";
        effect.style.display = "block";
        setTimeout(() => { effect.style.display = "none"; }, 200);
    }
});

document.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);
    ripple.addEventListener("animationend", () => { ripple.remove(); });
});

document.addEventListener('contextmenu', event => event.preventDefault());

const slider = document.querySelector('.imgs');
const marqueeTrack = document.querySelector('.marquee-track');
let isDown = false;
let startX;
let scrollLeft;

const startDragging = (e) => {
  isDown = true;
  marqueeTrack.classList.add('paused');
  startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

const stopDragging = () => {
  isDown = false;
  marqueeTrack.classList.remove('paused');
};

const move = (e) => {
  if (!isDown) return;
  e.preventDefault(); 
  const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
};

slider.addEventListener('mousedown', startDragging);
slider.addEventListener('mouseleave', stopDragging);
slider.addEventListener('mouseup', stopDragging);
slider.addEventListener('mousemove', move);

slider.addEventListener('touchstart', startDragging, { passive: false });
slider.addEventListener('touchend', stopDragging);
slider.addEventListener('touchmove', move, { passive: false });