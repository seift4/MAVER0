const toggleBtn = document.getElementById("darkToggle");
const logo = document.getElementById("logo");
const heroImg = document.getElementById("heroImg");

// تحميل الحالة عند فتح الصفحة
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  if (logo) logo.src = "imgs/Logo For web-03.svg";
  if (heroImg) heroImg.src = "imgs/Logo For web-03.svg";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    if (logo) logo.src = "imgs/Logo For web-03.svg";
    if (heroImg) heroImg.src = "imgs/Logo For web-03.svg";
    localStorage.setItem("theme", "dark");
  } else {
    if (logo) logo.src = "imgs/Logo For web-02.svg";
    if (heroImg) heroImg.src = "imgs/Logo For web-03.svg";
    localStorage.setItem("theme", "light");
  }
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
















window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
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




  



const bg = document.querySelector(".");

window.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  bg.style.transform = `
    translate(${x}px, ${y}px)
    scale(1.05)
  `;
});

















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