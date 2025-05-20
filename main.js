// main.js

// Enhanced JavaScript for smooth interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hero section
    const heroSection = document.createElement('div');
    heroSection.className = 'hero-section';
    
    const heroImage = document.createElement('img');
    heroImage.className = 'hero-image';
    heroImage.src = './Material_Visual/lago_aerea.jpg';
    heroImage.alt = 'Vista aérea del lago del Condominio Barú';
    
    const heroContent = document.createElement('div');
    heroContent.className = 'hero-content';
    
    const header = document.querySelector('header');
    const headerContent = header.innerHTML;
    header.innerHTML = '';
    
    heroSection.appendChild(heroImage);
    heroContent.innerHTML = headerContent;
    heroSection.appendChild(heroContent);
    
    document.body.insertBefore(heroSection, document.body.firstChild);
    document.body.insertBefore(header, heroSection.nextSibling);

    // Enhanced smooth scroll with offset
    const scrollToSection = (target) => {
        const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--scroll-offset')) || 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    // Handle all anchor clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToSection(target);
                
                // Update active state in navigation
                document.querySelectorAll('.floating-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active section on scroll
    const allSections = document.querySelectorAll('section, h3[id]');
    const navLinks = document.querySelectorAll('.floating-nav a');

    const updateActiveSection = () => {
        const scrollPosition = window.scrollY + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--scroll-offset')) + 10;

        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check

    // Toggle navigation visibility
    const nav = document.querySelector('.floating-nav');
    let isNavVisible = false;

    nav.addEventListener('mouseenter', () => {
        isNavVisible = true;
        nav.style.transform = 'translateX(0)';
    });

    nav.addEventListener('mouseleave', () => {
        isNavVisible = false;
        nav.style.transform = 'translateX(calc(var(--nav-width) + 20px))';
    });

    // Handle mobile touch events
    let touchStartX = 0;
    let touchEndX = 0;

    nav.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    nav.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            nav.style.transform = 'translateX(calc(var(--nav-width) + 20px))';
            isNavVisible = false;
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            nav.style.transform = 'translateX(0)';
            isNavVisible = true;
        }
    };

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Enhanced header shadow on scroll
    let lastScroll = 0;
    const headerElement = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            headerElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            headerElement.style.background = 'rgba(255, 255, 255, 0.95)';
            headerElement.style.color = 'var(--primary-color)';
        } else {
            headerElement.style.boxShadow = 'none';
            headerElement.style.background = 'transparent';
            headerElement.style.color = 'white';
        }
        
        lastScroll = currentScroll;
    });

    // Enhanced lazy loading for images with fade-in effect
    const images = document.querySelectorAll('.responsive-img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'translateY(0)';
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });

    // Add section dividers
    document.querySelectorAll('section').forEach((section, index) => {
        if (index > 0) {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            section.parentNode.insertBefore(divider, section);
        }
    });

    // Enhanced hover effects for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'translateY(-2px)';
        });
        
        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translateY(0)';
        });
    });

    // Add print button with enhanced styling
    const printButton = document.createElement('button');
    printButton.textContent = 'Imprimir Informe';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    // Add print icon
    const printIcon = document.createElement('span');
    printIcon.innerHTML = '🖨️';
    printButton.prepend(printIcon);
    
    printButton.addEventListener('mouseover', () => {
        printButton.style.transform = 'translateY(-2px)';
        printButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    });
    
    printButton.addEventListener('mouseout', () => {
        printButton.style.transform = 'translateY(0)';
        printButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    });
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printButton);

    // Add smooth reveal animation for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        sectionObserver.observe(section);
    });
});
