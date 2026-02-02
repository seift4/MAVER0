document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section"); // تأكد أن السكاشن مستخدمة tag <section> أو عدل الاختيار
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.6, // السيكشن يعتبر نشط لما يظهر 60% منه في الشاشة
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // إزالة active من كل اللينكات
                navLinks.forEach((link) => link.classList.remove("active"));
                
                // إضافة active للينك اللي بيشاور على السيكشن الحالي
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

/* ==========================================
   1. تعريف مصفوفة الصور الخاصة بالثيم (Dark/Light)
   هنا بنحدد IDs العناصر وصورها في الوضعين الفاتح والغامق
   ========================================== */
const themeImages = [
  { 
    id: "logo", 
    light: "imgs/Logo For web-01.svg", 
    dark:  "imgs/Logo For web-02.svg" 
  },
  { 
    id: "heroImg", 
    light: "imgs/Logo For web-02.svg", 
    dark:  "imgs/Logo For web-03.svg" 
  },
  { 
    id: "extraImg", 
    light: "imgs/Logo For web-01.svg", 
    dark:  "imgs/Logo For web-07.svg" 
  },
  { 
    id: "extra", 
    light: "imgs/Logo For web-01.svg", 
    dark:  "imgs/Logo For web-07.svg" 
  },
  { 
    id: "about", 
    light: "imgs/About -01.svg", 
    dark:  "imgs/About V-02.svg" 
  }
];

/* ==========================================
   2. وظائف تبديل الثيم وحفظ الإعدادات (Dark Mode)
   الجزء ده مسئول عن تغيير الثيم وحفظ اختيار المستخدم في المتصفح
   ========================================== */
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

/* ==========================================
   3. تحريك مؤشر الماوس المخصص (Custom Cursor)
   ده الجزء اللي بيخلي الدائرة تتبع الماوس وتكبر عند الوقوف على عناصر معينة
   ========================================== */
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

/* ==========================================
   4. تفاعلات الخدمات (Accordion) والـ Navbar
   مسئول عن فتح/إغلاق تفاصيل الخدمات وتغيير شكل الـ Nav عند السكرول
   ========================================== */
document.querySelectorAll(".service-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    item.parentElement
      .querySelectorAll(".service-item")
      .forEach(el => {
        if (el !== item) el.classList.remove("active");
      });
    item.classList.toggle("active");
  });
});

window.onscroll = function() {
    var navbar = document.querySelector('.nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

/* ==========================================
   5. تحريك الخلفية وشريط الصور (Marquee & Parallax)
   بيعمل تكرار لشريط الصور (Marquee) وبيحرك خلفية الهيرو مع حركة الماوس
   ========================================== */
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
    const xMove = (xPercent - 0.5) * 10;
    const yMove = (yPercent - 0.5) * 10;
    section.style.backgroundPosition = `calc(50% + ${xMove}px) calc(50% + ${yMove}px)`;
});







const vedSection = document.querySelector('.ved');
const video = vedSection.querySelector('.parallax-media');

vedSection.addEventListener('mousemove', (e) => {
    const { width, height, left, top } = vedSection.getBoundingClientRect();
    
    // تحديد نقطة السنتر (المركز)
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // حساب بعد الماوس عن المركز
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // تحويل البعد لدرجات دوران (مثلاً بحد أقصى 15 درجة)
    const rotateX = (-mouseY / (height / 2)) * 25; 
    const rotateY = (mouseX / (width / 2)) * 25;

    // تطبيق الدوران
    video.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// إرجاع الفيديو لحالته الطبيعية عند خروج الماوس
vedSection.addEventListener('mouseleave', () => {
    video.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

///////////////////////////////////////////////////////////


const modelViewer = document.querySelector("#myModel");



    // عندما يخرج الماوس من فوق الموديل
    modelViewer.addEventListener('mouseleave', () => {
        modelViewer.autoRotate = true;
    });










const modelViewe = document.querySelector('#myModel');

    // نستخدم 'model-visibility' للتأكد أن الموديل ظهر فعلاً على الشاشة
    modelViewe.addEventListener('load', () => {
        
        const applyGradient = async () => {
            // الوصول للمواد بشكل آمن
            const material = modelViewe.model.materials[0];
            if (!material) return;

            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            // الألوان الخاصة بك
            const gradient = ctx.createLinearGradient(0, 0, 0, 512);
            gradient.addColorStop(0, '#0059ff');
            gradient.addColorStop(0.3, '#54B6F5');
            gradient.addColorStop(.6, '#D6E6F2');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);

            try {
                const texture = await modelViewer.createTexture(canvas.toDataURL());
                
                // تفعيل التدريج والشفافية معاً
                if (material.pbrMetallicRoughness.baseColorTexture) {
                    material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
                } else {
                    // إذا لم يكن للموديل Texture أصلاً، نقوم بإنشائه
                    material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
                }
                
                material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0.3]);
                material.setAlphaMode("BLEND");
                
            } catch (error) {
                console.error("فشل في تطبيق الألوان:", error);
            }
        };

        applyGradient();
    });

/* ==========================================
   6. نظام الترجمة (Multi-Language System)
   بيحتوي على نصوص العربي والإنجليزي ودالة التحويل بين اللغات
   ========================================== */
const translations = {
  en: {
    about: "ABOUT",
    works: "WORKS",
    services: "SERVICES",
    careers: "CAREERS",
    heroText: "MODERN VISION, ",
    heroText2:"REAL IDENTITY",
    viewWorks: "VIEW SELECTED WORKS",
    selectWorks: "Selected Works",
    weAre: "WE ARE NOT A DRAGONFLY.",
    inspired: "We are inspired by its vision, precision, lightness, and quiet strength.",
    buildBrands: "WE BUILD BRANDS WITH CLARITY, PURPOSE, AND DIRECTION.",
    maverro: "MAVERO is a branding and creative direction agency helping businesses define who they are, how they speak, and how they grow.",
    workWith: "We work with founders and teams who understand that a brand is more than visuals, it’s a system of decisions, behaviors, and meaning.",
    connect: "Connect With Us",
    request: "Request A Services",
    aboutFooter: "ABOUT",
    worksFooter: "WORKS",
    servicesFooter: "SERVICES",
    careersFooter: "CAREERS",
    pricingFooter: "PRICING",
    instagram: "INSTAGRAM",
    linkedIn: "LINKED IN",
    x: "X",
    location: "CAIRO, EGYPT",
    top: "TOP",
    registered: "REGISTERED WITH THE GENERAL AUTHORITY FOR INVESTMENT",
    taxN: "TAX N: L775 605-794",
    rights: "2026© ALL RIGHTS RESERVED",
    servicesTitle: "Services",
    strategy: "01—Strategy",
    brandIdentity: "02—Brand Identity",
    visualSystems: "04 — Visual Systems",
    brandGuidelines: "05 — Brand Guidelines",
    brandApps: "06 — Brand Applications"
  },
  ar: {
    about: "من نحن",
    works: "أعمالنا",
    services: "خدماتنا",
    careers: "وظائف",
    heroText2:"هوية حقيقية",
    heroText: "رؤية عصرية، ",
    viewWorks: "عرض الأعمال المختارة",
    selectWorks: "أعمال مختارة",
    weAre: "نحن لسنا <span class='highlight'>اليعسوب.</span>",
    inspired: "نستوحي إلهامنا من الرؤية والدقة والخفة والقوة الهادئة.",
    buildBrands: "نُبني العلامات التجارية بوضوح وغرض واتجاه.",
    maverro: "MAVERO هي وكالة للعلامة التجارية والإبداع تساعد الشركات على تحديد هويتها وطريقة تواصلها ونموها.",
    workWith: "نعمل مع المؤسسين والفرق الذين يفهمون أن العلامة التجارية أكثر من مجرد شكل، إنها نظام من القرارات والسلوكيات والمعنى.",
    connect: "تواصل معنا",
    request: "طلب خدمة",
    aboutFooter: "من نحن",
    worksFooter: "أعمالنا",
    servicesFooter: "خدماتنا",
    careersFooter: "وظائف",
    pricingFooter: "التسعير",
    instagram: "إنستجرام",
    linkedIn: "لينكد إن",
    x: "إكس",
    location: "القاهرة، مصر",
    top: "الأعلى",
    registered: "مسجل لدى الهيئة العامة للاستثمار",
    taxN: "الرقم الضريبي: L775 605-794",
    rights: "2026© جميع الحقوق محفوظة",
    servicesTitle: "الخدمات",
    strategy: "01—استراتيجية",
    brandIdentity: "02—هوية العلامة التجارية",
    visualSystems: "04 — الأنظمة البصرية",
    brandGuidelines: "05 — دليل العلامة التجارية",
    brandApps: "06 — تطبيقات العلامة التجارية"
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
    toggleBtn.textContent = "EN"; // لما يبقى عربي
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.body.classList.remove("rtl");
    toggleBtn.textContent = "AR"; // لما يبقى إنجليزي
  }

  localStorage.setItem("lang", lang);
}

document.getElementById("langToggle").addEventListener("click", () => {
  const currentLang = localStorage.getItem("lang") || "en";
  const newLang = currentLang === "en" ? "ar" : "en";
  setLanguage(newLang);
});



/* ==========================================
   7. شاشة التحميل (Loader) وتأثيرات الظهور (Scroll Reveal)
   بيخفي الـ Loader بعد ثانية وبيدي تأثير ظهور للعناصر لما تنزل بالصفحة
   ========================================== */
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

/* ==========================================
   8. تحريك شريط الصور اللانهائي (Marquee Animation)
   بيحسب عرض الصور وبيعمل حركة مستمرة لليسار
   ========================================== */
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

/* ==========================================
   9. تأثيرات الضغط (Click Effects) ومنع القائمة اليمين
   بيظهر تأثير بصري عند الكليك وبيمنع الـ Right Click لحماية المحتوى
   ========================================== */
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

/* ==========================================
   10. خاصية السحب اليدوي لشريط الصور (Drag to Scroll)
   بيسمح لك تسحب الصور بالماوس ويوقف الحركة التلقائية وقت السحب
   ========================================== */
const slider = document.querySelector('.imgs');
const marqueeTrack = document.querySelector('.marquee-track');
let isDown = false;
let startX;
let scrollLeft;

// وظيفة لبدء السحب
const startDragging = (e) => {
  isDown = true;
  marqueeTrack.classList.add('paused');
  // تحديد نقطة البداية سواء ماوس أو لمس
  startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

// وظيفة لإنهاء السحب
const stopDragging = () => {
  isDown = false;
  marqueeTrack.classList.remove('paused');
};

// وظيفة التحريك
const move = (e) => {
  if (!isDown) return;
  e.preventDefault(); 
  // تحديد الموقع الحالي سواء ماوس أو لمس
  const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
  const walk = (x - startX) * 2; // سرعة السحب
  slider.scrollLeft = scrollLeft - walk;
};

// أحداث الماوس (للابتوب)
slider.addEventListener('mousedown', startDragging);
slider.addEventListener('mouseleave', stopDragging);
slider.addEventListener('mouseup', stopDragging);
slider.addEventListener('mousemove', move);

// أحداث اللمس (للموبايل والتابلت)
slider.addEventListener('touchstart', startDragging, { passive: false });
slider.addEventListener('touchend', stopDragging);
slider.addEventListener('touchmove', move, { passive: false });