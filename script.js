tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "surface-bright": "#262e2a",
                "inverse-on-surface": "#515653",
                "surface-container-high": "#1a211e",
                "on-tertiary-fixed": "#3a4a00",
                "on-error": "#490006",
                "primary-fixed-dim": "#00ec90",
                "surface-container-lowest": "#000000",
                "on-tertiary-container": "#4a5e00",
                "secondary-fixed-dim": "#2cefbc",
                "tertiary-fixed-dim": "#beee00",
                "error": "#ff716c",
                "on-secondary-fixed": "#004937",
                "error-dim": "#d7383b",
                "inverse-surface": "#f6faf6",
                "on-secondary-fixed-variant": "#006850",
                "on-surface-variant": "#a7aca9",
                "primary": "#a1ffc2",
                "primary-container": "#00fc9a",
                "on-primary-fixed": "#004627",
                "on-secondary-container": "#dffff0",
                "secondary-dim": "#2cefbc",
                "primary-fixed": "#00fc9a",
                "background": "#0a0f0d",
                "surface-container-highest": "#202724",
                "on-surface": "#f9fdf9",
                "on-background": "#f9fdf9",
                "surface-container-low": "#0f1512",
                "surface-variant": "#202724",
                "on-primary": "#00643a",
                "on-primary-fixed-variant": "#00653b",
                "on-secondary": "#005d47",
                "on-primary-container": "#005b34",
                "secondary": "#45fec9",
                "surface-container": "#151b18",
                "primary-dim": "#00ec90",
                "secondary-fixed": "#45fec9",
                "inverse-primary": "#006d40",
                "surface-dim": "#0a0f0d",
                "surface-tint": "#a1ffc2",
                "surface": "#0a0f0d",
                "tertiary": "#beee00"
            },
            "borderRadius": {
                "DEFAULT": "0px",
                "lg": "0px",
                "xl": "0px",
                "full": "9999px"
            },
            "fontFamily": {
                "headline": ["Manrope"],
                "body": ["Manrope"],
                "label": ["Space Grotesk"]
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = ['projects', 'stack', 'experience', 'stats', 'education', 'contact'];
    sections.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            fetch(`sections/${id}.html`)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.text();
                })
                .then(html => {
                    container.innerHTML = html;
                    if (id === 'stack') {
                        const cards = container.querySelectorAll('.skill-card');
                        const hoverClasses = ['hover:bg-primary', 'hover:bg-secondary', 'hover:bg-tertiary'];
                        cards.forEach(card => {
                            const randomClass = hoverClasses[Math.floor(Math.random() * hoverClasses.length)];
                            card.classList.add(randomClass);
                        });
                    }
                    if (id === 'contact') {
                        const copyBtn = container.querySelector('#copy-email-btn');
                        const feedback = container.querySelector('#copy-feedback');
                        const email = 'sshrihari2302@gmail.com';

                        if (copyBtn) {
                            copyBtn.addEventListener('click', () => {
                                navigator.clipboard.writeText(email).then(() => {
                                    feedback.classList.remove('opacity-0');
                                    copyBtn.innerHTML = '<span class="material-symbols-outlined text-sm">done</span> COPIED!';
                                    setTimeout(() => {
                                        feedback.classList.add('opacity-0');
                                        copyBtn.innerHTML = '<span class="material-symbols-outlined text-sm text-center">content_copy</span> CLICK_TO_COPY';
                                    }, 2000);
                                });
                            });
                        }
                    }
                })
                .catch(err => {
                    console.error(`Failed to load section: ${id}`, err);
                    if (window.location.protocol === 'file:') {
                        container.innerHTML = `
                            <div class="p-10 bg-error/10 border-2 border-error text-error font-bold text-center">
                                ERROR: Browser blocked loading the "${id}" section.<br>
                                Please run "bash start.sh" in your terminal and open http://localhost:8000
                            </div>
                        `;
                    }
                });
        }
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }
    // Spline Background Scroll Logic
    const splineBg = document.getElementById('spline-bg');
    const heroSection = document.getElementById('hero');
    
    if (splineBg && heroSection) {
        window.addEventListener('scroll', () => {
            const heroHeight = heroSection.offsetHeight;
            const scrollPos = window.scrollY;
            
            // Fade out as we scroll past hero
            if (scrollPos > heroHeight) {
                splineBg.style.opacity = '0';
                splineBg.style.visibility = 'hidden';
            } else {
                splineBg.style.opacity = '1';
                splineBg.style.visibility = 'visible';
            }
        });
    }

    // System Initialization / Loading Screen Logic
    const systemLoader = document.getElementById('system-loader');
    const splineViewer = document.querySelector('spline-viewer');
    let isLoaded = false;

    const hideLoader = () => {
        if (isLoaded || !systemLoader) return;
        isLoaded = true;
        systemLoader.style.opacity = '0';
        setTimeout(() => {
            systemLoader.style.display = 'none';
        }, 700); // Matches the CSS transition duration
    };

    if (splineViewer) {
        // Spline emits a 'load' event when the 3D scene is ready
        splineViewer.addEventListener('load', hideLoader);
        
        // Failsafe: Force hide the loader after 3 seconds even if Spline fails
        setTimeout(hideLoader, 3000);
    } else {
        // If no Spline viewer is found, hide immediately
        hideLoader();
    }
});
