document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements
    const elements = {
        mobileMenuButton: document.getElementById("mobile-menu-button"),
        mobileMenu: document.getElementById("mobile-menu"),
        header: document.getElementById("header"),
        navLinks: document.querySelectorAll(".main-nav-link"),
        allAnchorLinks: document.querySelectorAll('a[href^="#"]'),
        textButton: document.getElementById("text-monica"),
    };

    // Configuration
    const config = {
        scrollOffset: 50,
        sectionOffset: 150,
        phoneNumber: "7743923199",
    };

    // Mobile menu toggle
    function initMobileMenu() {
        if (!elements.mobileMenuButton || !elements.mobileMenu) return;

        elements.mobileMenuButton.addEventListener("click", () => {
            elements.mobileMenu.classList.toggle("hidden");
            elements.mobileMenu.classList.toggle("show");
        });
    }

    // Scroll behavior handler
    function handleScroll() {
        const scrollY = window.scrollY;

        // Header shadow
        elements.header?.classList.toggle(
            "shadow-md",
            scrollY > config.scrollOffset
        );

        // Active navigation highlighting
        updateActiveNavigation(scrollY);
    }

    function updateActiveNavigation(scrollY) {
        const sections = document.querySelectorAll("main section");
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const isInViewport =
                scrollY >= sectionTop - config.sectionOffset &&
                scrollY < sectionTop + sectionHeight - config.sectionOffset;

            if (isInViewport) {
                currentSection = section.getAttribute("id");
            }
        });

        elements.navLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href").substring(1) === currentSection;
            link.classList.toggle("active", isActive);
        });
    }

    // Smooth scroll with mobile menu auto-close
    function initSmoothScroll() {
        elements.allAnchorLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                const href = link.getAttribute("href");

                if (href?.startsWith("#")) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();

                        // Calculate header height precisely
                        const headerHeight = elements.header
                            ? elements.header.offsetHeight
                            : 56;

                        // Get the exact position to scroll to
                        const targetPosition =
                            target.getBoundingClientRect().top +
                            window.pageYOffset -
                            headerHeight -
                            8;

                        // Smooth scroll to calculated position
                        window.scrollTo({
                            top: Math.max(0, targetPosition),
                            behavior: "smooth",
                        });

                        // Close mobile menu if open
                        closeMobileMenu();
                    }
                }
            });
        });
    }

    function closeMobileMenu() {
        if (
            elements.mobileMenu &&
            !elements.mobileMenu.classList.contains("hidden")
        ) {
            elements.mobileMenu.classList.add("hidden");
            elements.mobileMenu.classList.remove("show");
        }
    }

    // Device-specific text button handling
    function initTextButton() {
        if (!elements.textButton) return;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (!isMobile) {
            elements.textButton.textContent = `Text Monica: (774) 392-3199`;
            elements.textButton.setAttribute(
                "href",
                `tel:${config.phoneNumber}`
            );
        }
    }

    // Throttle scroll events for better performance
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Initialize all functionality
    initMobileMenu();
    initSmoothScroll();
    initTextButton();

    // Use throttled scroll handler for better performance
    window.addEventListener("scroll", throttle(handleScroll, 16)); // ~60fps
});
