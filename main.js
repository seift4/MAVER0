document.addEventListener("DOMContentLoaded", () => {
    
    // 1. نظام الـ Dark Mode وتغيير الصور تلقائياً
    const toggleBtn = document.getElementById("darkToggle");
    const themeImages = [
        { id: "logo", light: "imgs/Logo For web-01.svg", dark: "imgs/Logo For web-02.svg" },
        { id: "extraImg", light: "imgs/Logo For web-01.svg", dark: "imgs/Logo For web-07.svg" },
        { id: "extra", light: "imgs/Logo For web-01.svg", dark: "imgs/Logo For web-07.svg" },
        { id: "heroImg", light: "imgs/color glass effect (1).mp4", dark: "imgs/color glass effect.mp4" },
        { id: "color", light: "imgs/color1.mp4", dark: "imgs/color2.mp4" }
    ];

    function updateImages(isDark) {
        themeImages.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) {
                // إذا كان العنصر فيديو، نغير المصدر ونعيد التحميل
                if (el.tagName === 'VIDEO') {
                    const source = el.querySelector('source');
                    if (source) source.src = isDark ? item.dark : item.light;
                    el.load();
                } else {
                    el.src = isDark ? item.dark : item.light;
                }
            }
        });
    }

    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    if (isDark) document.body.classList.add("dark-mode");
    updateImages(isDark);

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const nowDark = document.body.classList.contains("dark-mode");
            updateImages(nowDark);
            localStorage.setItem("theme", nowDark ? "dark" : "light");
        });
    }

    // 2. الكرسر المخصص (Custom Cursor)
    const cursorDot = document.querySelector(".cursor-dot");
    if (cursorDot) {
        window.addEventListener("mousemove", (e) => {
            cursorDot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
        });

        // تأثيرات الكرسر عند الحوم فوق العناصر التفاعلية
        const interactives = document.querySelectorAll('a, button, h1, p, h2, .dv, video, .nav-link');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('cursor-active'));
        });
    }

    // 3. تأثير الـ 3D Card (يعمل في أي صفحة تحتوي على كلاس .pr)
    const cards = document.querySelectorAll('.pr');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { width, height, left, top } = card.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const rotateX = (-(e.clientY - centerY) / (height / 2)) * 15; 
            const rotateY = ((e.clientX - centerX) / (width / 2)) * 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // 4. تأثير ظهور العناصر عند السكرول (Reveal on Scroll)
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // لتشغيلها عند تحميل الصفحة مباشرة

    // 5. الـ Marquee (الصور المتحركة - تعمل فقط إذا وجد التراك)
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        const content = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML += content; // تكرار المحتوى لعمل Loop
        
        let scrollX = 0;

        const animate = () => {
            scrollX -= 0.5;
            if (Math.abs(scrollX) >= marqueeTrack.scrollWidth / 2) scrollX = 0;
            marqueeTrack.style.transform = `translateX(${scrollX}px)`;
            requestAnimationFrame(animate);
        };
        animate();
    }

    // 6. شاشة التحميل (Loader)
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => loader.style.display = "none", 500);
            }, 1000);
        });
    }

    // 7. تغيير شكل الـ Nav عند السكرول
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        });
    }
    
    // 8. تفعيل الروابط عند الوصول للسكشن (Active Link on Scroll)
    const sections = document.querySelectorAll("section[id]"); // نراقب فقط السكشنز التي تملك ID
    const navLinks = document.querySelectorAll(".nav-link");

    // أولاً: تحديد الصفحة الحالية لتفعيل رابطها تلقائياً
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // ثانياً: مراقبة السكاشن لتفعيل الروابط الداخلية (مثل Home و Works)
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // السكشن يعتبر نشطاً عندما يظهر 50% منه
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        // نبحث عن الرابط الذي ينتهي بـ # والـ id الخاص بالسكشن
                        if (link.getAttribute("href").endsWith(`#${id}`)) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }

    //9. vid--> view
    const videoElement = document.querySelector('#color'); // الفيديو بتاعك

// لما الماوس يدخل على الفيديو
videoElement.addEventListener('mouseenter', () => {
    cursorDot.classList.add('cursor-video');
});

// لما الماوس يخرج من الفيديو
videoElement.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('cursor-video');
});







});

// منع القائمة اليمين (اختياري)
document.addEventListener('contextmenu', event => event.preventDefault());



