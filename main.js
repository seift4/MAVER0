// كل الصور اللي عايز تتغير مع الثيم
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
    id: "extraImg",               // ← أضف هنا
    light: "imgs/Logo For web-01.svg",
    dark:  "imgs/Logo For web-07.svg"
  },
    { 
    id: "extra",               // ← أضف هنا
    light: "imgs/Logo For web-01.svg",
    dark:  "imgs/Logo For web-07.svg"
  },
  // ممكن تضيف كمان وكمان...
];

const toggleBtn = document.getElementById("darkToggle");

// دالة تحديث كل الصور مرة واحدة
function updateImages(isDark) {
  themeImages.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.src = isDark ? item.dark : item.light;
    }
  });
}

// تحميل عند الفتح
const savedTheme = localStorage.getItem("theme");
const isDark = savedTheme === "dark";
if (isDark) document.body.classList.add("dark-mode");
updateImages(isDark);

// عند الضغط
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

    // تحديث مكان الدائرة
    // طرحنا 6 (نصف قطر الدائرة) عشان الماوس يكون في السنتر بالظبط
    cursorDot.style.transform = `translate(${posX - 6}px, ${posY - 6}px)`;
});

// إضافة تأثير عند الدخول على العناصر القابلة للضغط (Optional)
// اخترنا الروابط، الأزرار، وأي نص (p, h1, h2, span)
const interactiveElements = document.querySelectorAll('a, button, p, h1, h2, span, li');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-active');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-active');
    });
});
ouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});




















document.querySelectorAll(".service-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;

    // اقفل بس اللي في نفس العمود
    item.parentElement
      .querySelectorAll(".service-item")
      .forEach(el => {
        if (el !== item) el.classList.remove("active");
      });

    item.classList.toggle("active");
  });
});

















// نحدد المسار اللي فيه الصور
const traack = document.querySelector('.marquee-track');

// ننسخ محتوى الصور عشان نعمل Loop مستمر
const clone = traack.innerHTML;
traack.innerHTML += clone; // بنضاعف الصور






const section = document.querySelector('.home');

section.addEventListener('mousemove', (e) => {
    const { width, height, left, top } = section.getBoundingClientRect();

    // إحداثيات الماوس داخل السكشن
    const x = e.clientX - left;
    const y = e.clientY - top;

    // النسب بين 0 و 1
    const xPercent = x / width;
    const yPercent = y / height;

    // نحرك الباكجروند في كل الاتجاهات
    const xMove = (xPercent - 0.5) * 10; // 30px يمكنك تغيير السرعة
    const yMove = (yPercent - 0.5) * 10;

    // الخلفية تتحرك بالنسبة للـ center
    section.style.backgroundPosition = `calc(50% + ${xMove}px) calc(50% + ${yMove}px)`;
});


















// =====================
// تعريف الترجمات
// =====================
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

// =====================
// وظيفة تغيير اللغة
// =====================
function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
}

// =====================
// أحداث الزرار
// =====================
document.getElementById("en").onclick = () => setLanguage("en");
document.getElementById("ar").onclick = () => setLanguage("ar");

// =====================
// تحميل اللغة المحفوظة
// =====================
const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);















// ننتظر تحميل الصفحة بالكامل
window.addEventListener("load", function() {
    // نضيف تأخير 2 ثانية قبل إخفاء الـ loader
    setTimeout(function() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 2000); // 2000 ملي ثانية = 2 ثانية
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
const imgs = Array.from(track.children);

// حساب عرض الشريط الأصلي
let trackWidth = 0;
imgs.forEach(img => {
  trackWidth += img.offsetWidth;
});

// نسخ العناصر لتغطية ضعف الشريط
imgs.forEach(img => {
  const clone = img.cloneNode(true);
  track.appendChild(clone);
});

// الآن نضيف التحريك المستمر
let x = 0;
const speed = 1; // كل ما يكون أكبر، الحركة أسرع

function animate() {
  x -= speed;
  if (x <= -trackWidth) x = 0; // إعادة التشغيل بدون فراغ
  track.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate);
}

animate();




  



















document.addEventListener("click", function (e) {
    const effect = document.getElementById("clickEffect");

    effect.style.left = e.clientX + "px";
    effect.style.top = e.clientY + "px";
    effect.style.display = "block";

    setTimeout(() => {
        effect.style.display = "none";
    }, 200);
});



document.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
});
























