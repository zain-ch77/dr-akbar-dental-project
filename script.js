document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
        }
    });

    // Mobile Menu Toggle - Sliding Drawer
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-nav-drawer .close-btn');

    function openDrawer() {
        if (drawer) drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuBtn) menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Close drawer on nav link click
    document.querySelectorAll('.mobile-nav-drawer a').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });


    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission (Demo)
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = appointmentForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your appointment request has been sent. We will contact you shortly.');
                appointmentForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Testimonial Slider Logic (Simple Auto-switch)
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 1) {
        let current = 0;
        setInterval(() => {
            testimonials[current].style.opacity = '0.5';
            testimonials[current].style.transform = 'scale(0.95)';
            
            current = (current + 1) % testimonials.length;
            
            testimonials[current].style.opacity = '1';
            testimonials[current].style.transform = 'scale(1)';
        }, 5000);
    }

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-image, .about-text, .contact-info, .contact-form').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.faq-question').classList.remove('active');
            });

            // If the clicked one wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
