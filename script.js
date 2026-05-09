
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
    });
});


const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('alMadinaTheme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('alMadinaTheme', isDark ? 'dark' : 'light');
});

const slides = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('heroDots');
let currentSlide = 0;
let slideTimer;

slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
    dot.addEventListener('click', () => showSlide(index));
    dotsWrap.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    restartSlider();
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function restartSlider() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 3500);
}

restartSlider();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('[data-count]');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = Number(counter.dataset.count);
                let value = 0;
                const increment = Math.max(1, Math.ceil(target / 55));
                const timer = setInterval(() => {
                    value += increment;
                    if (value >= target) {
                        value = target;
                        clearInterval(timer);
                    }
                    counter.textContent = value + '+';
                }, 28);
            });
        }
    });
}, { threshold: 0.35 });

counters.forEach(counter => counterObserver.observe(counter));

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `Assalam o Alaikum, my name is ${name}.%0APhone: ${phone}%0AMessage: ${message}%0A%0AI want information about Al Madina Traders products.`;
    window.open(`https://wa.me/923443691242?text=${text}`, '_blank');
});

document.getElementById('year').textContent = new Date().getFullYear();