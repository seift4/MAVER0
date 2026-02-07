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
  },
    { 
    id: "color", 
    light: "imgs/color1.mp4", 
    dark:  "imgs/color2.mp4" 
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

const interactiveElements = document.querySelectorAll('a, video, button, p, h1, h2, span, li');

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

const section = document.querySelector('.dv');

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










// بنختار كل العناصر اللي واخدة كلاس dv
const cards = document.querySelectorAll('.dv');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = card.getBoundingClientRect();
        
        // حساب نقطة السنتر لكل كارت لوحده
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        // حساب بعد الماوس عن مركز الكارت الحالي
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // حساب الزوايا
        const rotateX = (-mouseY / (height / 2)) * 25; 
        const rotateY = (mouseX / (width / 2)) * 25;

        // تطبيق التأثير
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // إرجاع الكارت لوضعه الأصلي عند خروج الماوس
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

















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