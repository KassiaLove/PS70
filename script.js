document.addEventListener("DOMContentLoaded", () => {
    const ease = "power4.inOut";

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");

            if (href && !href.startsWith("#") && href !== window.location.pathname) {
                animateTransition().then(() => {
                    window.location.href = href;
                });
            }
        });
    });

    function animateTransition() {
        return new Promise((resolve) => {
            gsap.to(".hero h1", {
                y: "-100vh",
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut"
            });

            gsap.set(".block", { visibility: "visible", scaleY: 0, y: (i) => (i === 0 ? "-50vh" : "50vh") });

            gsap.to(".block", {
                scaleY: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: resolve,
            });
        });
    }

    function revealTransition() {
        return new Promise((resolve) => {
            gsap.set(".hero h1", { y: "100vh", opacity: 0 });

            gsap.to(".hero h1", {
                y: "0vh",
                opacity: 1,
                duration: 0.8,
                delay: 0.25,
                ease: "power2.out"
            });

            gsap.to(".transition", {
                y: "100vh",
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(".transition", { visibility: "hidden", y: 0 });
                    resolve();
                }
            });
        });
    }

    // Ensure the next page is revealed correctly after navigation
    revealTransition();

    // Set initial state for all cards so they are off-screen and invisible
    gsap.set(".card", { opacity: 0, y: 60 });

    // ========== First row of cards (on page load) - Faster FLOAT UP & FADE ==========
    gsap.to(".card:nth-child(-n+3)", {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.4
    });

    // ========== Remaining cards - Faster FLOAT UP & FADE ON SCROLL ==========
    gsap.utils.toArray(".card:nth-child(n+4)").forEach((card, i) => {
        gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            }
        );
    });
});
