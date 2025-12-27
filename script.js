document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('header nav a');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    /* =========================================
       FAQ ACCORDION
       ========================================= */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Toggle active class on question for rotation
            question.classList.toggle('active');
            
            // Toggle max-height for slide effect
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
            
            // Optional: Close other items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

    /* =========================================
       SCROLL ANIMATIONS (IntersectionObserver)
       ========================================= */
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
    
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    /* =========================================
       MODAL HANDLING
       ========================================= */
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');
    const modals = document.querySelectorAll('.modal');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.remove('hidden');
        // Small timeout to allow display:flex to apply before opacity transition
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300); // Match CSS transition
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId + '-modal');
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });
});