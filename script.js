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

function copyCode() {
    const code = "MD0MIR0001";
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalContent = btn.innerHTML; // Store icon

        // Button Feedback
        btn.innerHTML = `<span style="color:var(--pw-primary); font-size:0.8rem; font-weight:700;">Copied!</span>`;
        btn.style.borderColor = 'var(--pw-primary)';

        // Toast Feedback
        showToast("Coupon code copied successfully!");

        // Reset Button after 2s
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.borderColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showToast(message) {
    const toast = document.getElementById('copy-toast');
    if (toast) {
        toast.querySelector('span').textContent = message;
        toast.classList.add('show');

        // Auto hide after 2.5s
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
}
