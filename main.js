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
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) { // لو نزل أكتر من 50 بكسل
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
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
    light: "imgs/color glass effect (1).mp4", 
    dark:  "imgs/color glass effect.mp4" 
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
document.querySelectorAll('.service-header').forEach(header => {
    header.addEventListener('click', () => {
        const currentItem = header.parentElement;
        const currentArrow = header.querySelector('.arrow');
        const isActive = currentItem.classList.contains('active');

        // 1. قفل أي عنصر آخر مفتوح حالياً
        document.querySelectorAll('.service-item').forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('active');
                // نرجع شكل السهم الأصلي للعناصر المقفولة
                const otherArrow = item.querySelector('.arrow');
                if (otherArrow) otherArrow.textContent = 'stat_minus_1';
            }
        });

        // 2. تبديل حالة العنصر اللي ضغطت عليه
        if (!isActive) {
            currentItem.classList.add('active');
            currentArrow.textContent = 'remove'; // يتحول لـ داش
        } else {
            currentItem.classList.remove('active');
            currentArrow.textContent = 'stat_minus_1'; // يرجع سهم
        }
    });
});

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
    const xMove = (xPercent - 0.5) * 5;
    const yMove = (yPercent - 0.5) * 12;
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
                
                material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0.25]);
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

// ملف الترجمة - يحتوي على جميع النصوص للغتين
const translations = {
    en: {
        // زر التبديل
        "langToggle": "AR",
        
        // التنقل
        "nav.home": "HOME",
        "nav.works": "WORKS",
        "nav.about": "ABOUT",
        "nav.services": "SERVICES",
        "nav.contact": "CONTACT US",
        
        // القسم الرئيسي
        "home.modern": "MODERN VISION",
        "home.real": ", REAL IDENTITY",
        "home.view": "VIEW SELECTED WORKS",
        
        // أعمال مختارة
        "works.selected": "Selected Works",
        "works.viewAll": "View All",
        
        // خدمات
        "services.title": "Services",
        "services.subtitle": "From strategy to systems, we build brands with clarity and intention.",
        "services.extended": "Extended Services",
        "services.extendedSubtitle": "We don’t offer services. We extend brand systems across touchpoints.",
        "services.includes": "Includes:",
        "services.discuss": "Let's Discuss",
        
        // الخدمة 1: الاستراتيجية
        "services.strategy.title": "01 — Strategy",
        "services.strategy.heading": "Define before design",
        "services.strategy.description": "We start by defining the brand before shaping it. This phase focuses on clarity, positioning, and decision-making, setting a solid foundation that guides every visual and verbal outcome.",
        "services.strategy.item1": "Brand positioning",
        "services.strategy.item2": "Purpose, vision, and mission",
        "services.strategy.item3": "Target audience & insights",
        "services.strategy.item4": "Brand personality & values",
        "services.strategy.item5": "Core brand narrative",
        
        // الخدمة 2: الهوية البصرية
        "services.identity.title": "02 — Brand Identity",
        "services.identity.heading": "A visual foundation built on meaning",
        "services.identity.description": "We translate strategy into a distinctive and intentional visual identity. Every element is designed to communicate purpose, not decoration.",
        "services.identity.item1": "Logo system",
        "services.identity.item2": "Typography system",
        "services.identity.item3": "Color system",
        "services.identity.item4": "Core visual principles",
        
        // الخدمة 3: الأنظمة البصرية
        "services.visual.title": "04 — Visual Systems",
        "services.visual.heading": "Structure that scales",
        "services.visual.description": "Beyond the logo, we design visual systems that allow the brand to grow consistently across platforms and contexts.",
        "services.visual.item1": "Graphic systems & layouts",
        "services.visual.item2": "Patterns and brand assets",
        "services.visual.item3": "Image direction",
        "services.visual.item4": "Motion principles",
        
        // الخدمة 4: الإرشادات
        "services.guidelines.title": "05 — Brand Guidelines",
        "services.guidelines.heading": "Consistency with clarity",
        "services.guidelines.description": "We document the brand into a clear, usable system that ensures internal and external consistency over time.",
        "services.guidelines.item1": "Logo usage rules",
        "services.guidelines.item2": "Color & typography usage",
        "services.guidelines.item3": "Visual system guidelines",
        "services.guidelines.item4": "Do's & Don'ts",
        "services.guidelines.item5": "Handoff-ready documentation",
        
        // الخدمة 5: موقع الويب
        "services.website.title": "01 — Brand-led Website Experience",
        "services.website.heading": "Digital expression of the brand system",
        "services.website.description": "We design websites as an extension of the brand, not just interfaces. The focus is on clarity, structure, and brand presence, not complex product UX.",
        "services.website.item1": "Brand-driven UI direction",
        "services.website.item2": "Visual hierarchy & layout logic",
        "services.website.item3": "Landing pages & brand websites",
        "services.website.item4": "Design-ready handoff for development",
        
        // الخدمة 6: الحركة
        "services.motion.title": "02 — Brand Motion Direction",
        "services.motion.heading": "Movement with intention",
        "services.motion.description": "We define how the brand moves subtly, clearly, and with purpose. Motion is used to enhance recognition, not distract from meaning.",
        "services.motion.item1": "Logo animation",
        "services.motion.item2": "Motion principles (timing, easing, rhythm)",
        "services.motion.item3": "Short brand motion assets",
        
        // الاتصال
        "contact.lets": "Let's Mavero It",
        "contact.coming": "Coming Soon",
        "contact.top": "TOP",
        "contact.rights": "ALL RIGHTS RESERVED"
    },
    
    ar: {
        // زر التبديل
        "langToggle": "EN",
        
        // التنقل
        "nav.home": "الرئيسية",
        "nav.works": "الأعمال",
        "nav.about": "من نحن",
        "nav.services": "الخدمات",
        "nav.contact": "اتصل بنا",
        
        // القسم الرئيسي
        "home.modern": "رؤية حديثة",
        "home.real": "، هوية حقيقية",
        "home.view": "عرض الأعمال المختارة",
        
        // أعمال مختارة
        "works.selected": "أعمال مختارة",
        "works.viewAll": "عرض الكل",
        
        // خدمات
        "services.title": "الخدمات",
        "services.subtitle": "من الاستراتيجية إلى الأنظمة، نبني علامات تجارية بوضوح وهدف.",
        "services.extended": "خدمات ممتدة",
        "services.extendedSubtitle": "نحن لا نقدم خدمات فقط، بل نوسع أنظمة العلامات التجارية عبر نقاط الاتصال.",
        "services.includes": "يشمل:",
        "services.discuss": "لنتحدث",
        
        // الخدمة 1: الاستراتيجية
        "services.strategy.title": "01 — الاستراتيجية",
        "services.strategy.heading": "تحديد قبل التصميم",
        "services.strategy.description": "نبدأ بتحديد العلامة التجارية قبل تشكيلها. تركز هذه المرحلة على الوضوح والتpositioning واتخاذ القرارات، مما يضع أساسًا متينًا يوجه كل نتيجة بصرية ولفظية.",
        "services.strategy.item1": "تحديد مكانة العلامة التجارية",
        "services.strategy.item2": "الغرض، الرؤية، والرسالة",
        "services.strategy.item3": "الجمهور المستهدف والرؤى",
        "services.strategy.item4": "شخصية وقيم العلامة التجارية",
        "services.strategy.item5": "السرد الأساسي للعلامة التجارية",
        
        // الخدمة 2: الهوية البصرية
        "services.identity.title": "02 — الهوية البصرية",
        "services.identity.heading": "أساس بصري مبني على المعنى",
        "services.identity.description": "نترجم الاستراتيجية إلى هوية بصرية متميزة وهادفة. كل عنصر مصمم لنقل الغرض، وليس للزينة.",
        "services.identity.item1": "نظام الشعار",
        "services.identity.item2": "نظام الطباعة",
        "services.identity.item3": "نظام الألوان",
        "services.identity.item4": "المبادئ البصرية الأساسية",
        
        // الخدمة 3: الأنظمة البصرية
        "services.visual.title": "04 — الأنظمة البصرية",
        "services.visual.heading": "هيكل قابل للتوسع",
        "services.visual.description": "أبعد من الشعار، نصمم أنظمة بصرية تسمح للعلامة التجارية بالنمو بشكل متسق عبر المنصات والسياقات المختلفة.",
        "services.visual.item1": "أنظمة وتخطيطات جرافيك",
        "services.visual.item2": "أنماط وأصول العلامة التجارية",
        "services.visual.item3": "توجيه الصور",
        "services.visual.item4": "مبادئ الحركة",
        
        // الخدمة 4: الإرشادات
        "services.guidelines.title": "05 — إرشادات العلامة التجارية",
        "services.guidelines.heading": "الاتساق مع الوضوح",
        "services.guidelines.description": "نوثق العلامة التجارية في نظام واضح وقابل للاستخدام يضمن الاتساق الداخلي والخارجي مع مرور الوقت.",
        "services.guidelines.item1": "قواعد استخدام الشعار",
        "services.guidelines.item2": "استخدام الألوان والطباعة",
        "services.guidelines.item3": "إرشادات النظام البصري",
        "services.guidelines.item4": "ما يجب فعله وما لا يجب فعله",
        "services.guidelines.item5": "وثائق جاهزة للتسليم",
        
        // الخدمة 5: موقع الويب
        "services.website.title": "01 — تجربة موقع ويب بقيادة العلامة التجارية",
        "services.website.heading": "تعبير رقمي عن نظام العلامة التجارية",
        "services.website.description": "نصمم المواقع كامتداد للعلامة التجارية، وليس كواجهات فقط. التركيز على الوضوح والهيكل ووجود العلامة التجارية، وليس تجربة مستخدم معقدة.",
        "services.website.item1": "توجيه واجهة المستخدم بقيادة العلامة التجارية",
        "services.website.item2": "التسلسل الهرمي البصري ومنطق التخطيط",
        "services.website.item3": "صفحات الهبوط ومواقع العلامات التجارية",
        "services.website.item4": "تسليم جاهز للتصميم للتطوير",
        
        // الخدمة 6: الحركة
        "services.motion.title": "02 — توجيه حركة العلامة التجارية",
        "services.motion.heading": "حركة بهدف",
        "services.motion.description": "نحدد كيف تتحرك العلامة التجارية بدقة ووضوح وهدف. تُستخدم الحركة لتعزيز التمييز، وليس لإلهاء عن المعنى.",
        "services.motion.item1": "تحريك الشعار",
        "services.motion.item2": "مبادئ الحركة (التوقيت، التخفيف، الإيقاع)",
        "services.motion.item3": "أصول الحركة القصيرة للعلامة التجارية",
        
        // الاتصال
        "contact.lets": "لنقم بها مع مافيرو",
        "contact.coming": "قريبًا",
        "contact.top": "للأعلى",
        "contact.rights": "جميع الحقوق محفوظة"
    }
};

// الحالة الحالية للغة
let currentLang = 'en';

// دالة لتحميل الترجمة
function loadLanguage(lang) {
    currentLang = lang;
    
    // تحديث زر التبديل
    document.getElementById('langToggle').textContent = translations[lang].langToggle;
    
    // تحديث جميع العناصر التي تحتوي على data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // التحقق من نوع العنصر
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'IMG') {
                element.alt = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // تحديث سمة dir للصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // حفظ اللغة في localStorage
    localStorage.setItem('preferredLang', lang);
    
    // تحديث فئات CSS للاتجاه
    document.body.classList.toggle('rtl', lang === 'ar');
    document.body.classList.toggle('ltr', lang !== 'ar');
}

// دالة لتبديل اللغة
function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    loadLanguage(newLang);
}

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // التحقق من اللغة المحفوظة أو استخدام لغة المتصفح
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
    const initialLang = savedLang || browserLang;
    
    // تحميل اللغة الأولية
    loadLanguage(initialLang);
    
    // إضافة مستمع حدث لزر التبديل
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
});

// جعل الدوال متاحة عالمياً (اختياري)
window.toggleLanguage = toggleLanguage;
window.loadLanguage = loadLanguage;

/* ==========================================
   7. شاشة التحميل (Loader) وتأثيرات الظهور ( Reveal)
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