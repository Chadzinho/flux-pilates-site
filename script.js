document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll(".main-nav-link");
    const mobileNavLinks = document.querySelectorAll("#mobile-menu a");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }

        let currentSection = "";
        const sections = document.querySelectorAll("main section");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
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

    const allLinks = [
        ...document.querySelectorAll(".main-nav-link"),
        ...document.querySelectorAll("#mobile-menu a"),
        ...document.querySelectorAll(".header-book-button"),
        ...document.querySelectorAll(".hero-button"),
        ...document.querySelectorAll(".class-card a"),
        ...document.querySelectorAll(".select-plan-button"),
        ...document.querySelectorAll(".contact-button"),
        ...document.querySelectorAll(".cta-button"),
    ];
    allLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            if (link.getAttribute("href").startsWith("#")) {
                const targetId = link.getAttribute("href");
                if (document.querySelector(targetId)) {
                    if (mobileMenu.classList.contains("hidden") === false) {
                        mobileMenu.classList.add("hidden");
                    }
                }
            }
        });
    });
});
