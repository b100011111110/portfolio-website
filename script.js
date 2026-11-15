const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
        closeMenu();
        menuButton.focus();
    }
});
document.addEventListener('click', event => {
    if (!event.target.closest('.nav-wrap')) closeMenu();
});
window.matchMedia('(min-width: 1101px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
});
const copyButton = document.querySelector('#copy-email-btn');
const feedback = document.querySelector('#copy-feedback');
let copyTimeout;
copyButton.addEventListener('click', async () => {
    clearTimeout(copyTimeout);
    try {
        await navigator.clipboard.writeText('sshrihari2302@gmail.com');
        feedback.textContent = 'Email address copied!';
    } catch {
        feedback.textContent = 'Select the email address to copy it.';
    }
    copyTimeout = setTimeout(() => { feedback.textContent = ''; }, 3000);
});
if ('IntersectionObserver' in window) {
    const links = [...navigation.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

const themeButton = document.querySelector('#theme-toggle');
function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#151519' : '#faf9f6';
}
applyTheme(document.documentElement.dataset.theme || 'light');
themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works if storage is unavailable. */ }
});
window.addEventListener('storage', event => {
    if (event.key === 'portfolio-theme') {
        applyTheme(event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'light');
    }
});
