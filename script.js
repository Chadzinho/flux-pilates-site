document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll(".main-nav-link");
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            console.log("Hamburger clicked");
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("show");
        });
    }

    // Scroll behavior: sticky shadow & nav link highlighting
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }

        // Active link highlighting based on scroll position
        let currentSection = "";
        const sections = document.querySelectorAll("main section");

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (
                window.scrollY >= sectionTop - 150 &&
                window.scrollY < sectionTop + sectionHeight - 150
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    });

    // Smooth scroll + auto-close mobile menu on link click
    allAnchorLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            if (href.startsWith("#")) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });

                    // Close mobile menu if open
                    if (
                        mobileMenu &&
                        !mobileMenu.classList.contains("hidden")
                    ) {
                        mobileMenu.classList.add("hidden");
                    }
                }
            }
        });
    });

    // Desktop fallback for SMS/Text button
    const textButton = document.getElementById("text-monica");
    if (textButton) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
            textButton.innerText = "Text Monica: (774) 392-3199";
            textButton.setAttribute("href", "tel:7743923199");
        }
    }
});
