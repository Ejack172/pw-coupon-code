document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Date
    const today = new Date();
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = today.getFullYear();

    // Dynamic Footer/FAQ years if keys exist
    const yearHero = document.getElementById('year-hero');
    if (yearHero) yearHero.textContent = today.getFullYear();
    const yearFaq = document.getElementById('year-faq');
    if (yearFaq) yearFaq.textContent = today.getFullYear();
    const yearFooter = document.getElementById('year-footer');
    if (yearFooter) yearFooter.textContent = today.getFullYear();

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // ─── Copy Coupon Code Logic ───
    function legacyCopy(text) {
        var el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    document.querySelectorAll('.copy-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var code = btn.dataset.code;
            if (!code) return;

            // Copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(code).catch(function () { legacyCopy(code); });
            } else {
                legacyCopy(code);
            }

            // Visual feedback
            var span = btn.querySelector('.btn-text') || btn;
            var orig = span.textContent;
            span.textContent = 'Copied! ✓';
            btn.classList.add('copied');
            setTimeout(function () {
                span.textContent = orig;
                btn.classList.remove('copied');
            }, 2000);
        });
    });

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            const item = this.parentElement;
            const content = this.nextElementSibling;

            // Close others (optional - strictly one open)
            document.querySelectorAll('.accordion-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.accordion-content').style.maxHeight = 0;
                    other.querySelector('span').textContent = '+';
                }
            });

            // Toggle current
            item.classList.toggle('active');
            const span = this.querySelector('span');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                span.textContent = '-';
            } else {
                content.style.maxHeight = 0;
                span.textContent = '+';
            }
        });
    });
});

