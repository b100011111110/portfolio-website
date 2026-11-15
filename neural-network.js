(() => {
    const canvas = document.querySelector('#neural-network');
    const button = document.querySelector('#network-motion');
    if (!canvas || !button) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const surface = canvas.parentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Deterministic scattered topology keeps the composition stable across reloads.
    let seed = 48271;
    function random() { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; }
    const nodes = [];
    while (nodes.length < 34) {
        const candidate = { x: 36 + random() * 548, y: 40 + random() * 365 };
        if (nodes.every(node => Math.hypot(node.x - candidate.x, node.y - candidate.y) > 46)) nodes.push(candidate);
    }
    const linkKeys = new Set();
    function connect(a, b) { if (a !== b) linkKeys.add([Math.min(a, b), Math.max(a, b)].join(':')); }
    nodes.forEach((node, index) => {
        nodes.map((other, target) => ({ target, distance: Math.hypot(node.x - other.x, node.y - other.y) }))
            .filter(item => item.target !== index).sort((a,b) => a.distance - b.distance).slice(0,4)
            .forEach(item => connect(index, item.target));
        if (index % 5 === 0) connect(index, (index + 13) % nodes.length);
    });
    // An always-available backbone keeps the mesh connected through simulated failures.
    const stable = nodes.map((_, index) => index).filter(index => index % 3 !== 0)
        .sort((a,b) => Math.atan2(nodes[a].y-225,nodes[a].x-310) - Math.atan2(nodes[b].y-225,nodes[b].x-310));
    stable.forEach((index, i) => connect(index, stable[(i + 1) % stable.length]));
    const links = [...linkKeys].map(key => key.split(':').map(Number));
    let paused = reduceMotion.matches;
    let inView = true;
    let frameId = null;
    let previousTime = null;
    let elapsed = 1.8;
    let width = 0;
    let height = 0;
    let dark = false;
    const palettes = {
        light: { wire: 'rgba(116,104,171,.19)', offlineWire: 'rgba(145,134,151,.07)', dead: '#b7adb8', failure: '#ca807e', recovery: '#6caa9e', colors: ['#7293da','#a17ace','#cf9b8f'] },
        dark: { wire: 'rgba(176,159,227,.22)', offlineWire: 'rgba(146,131,158,.09)', dead: '#655c70', failure: '#edaaa5', recovery: '#a4dbc8', colors: ['#98cbff','#c4a0f5','#f1bfaa'] }
    };
    function nodeState(index, time) {
        if (index % 3 !== 0) return { phase: 'online', strength: 1 };
        const slots = Math.ceil(nodes.length / 3), cycle = slots * 3.1;
        const age = ((time - index / 3 * 3.1) % cycle + cycle) % cycle;
        if (age < .4) return { phase: 'crashing', strength: 1 - age / .4, age };
        if (age < 2.8) return { phase: 'offline', strength: 0, age };
        if (age < 4) return { phase: 'recovering', strength: (age - 2.8) / 1.2, age };
        return { phase: 'online', strength: 1 };
    }
    function curve(from, to, index) {
        const dx = to.x - from.x, dy = to.y - from.y;
        const bend = index % 2 ? .08 : -.08;
        return { from, to,
            a: { x: from.x + dx * .33 - dy * bend, y: from.y + dy * .33 + dx * bend },
            b: { x: from.x + dx * .67 - dy * bend, y: from.y + dy * .67 + dx * bend }
        };
    }
    function point(edge, t) {
        const u = 1 - t;
        return {
            x: u*u*u*edge.from.x + 3*u*u*t*edge.a.x + 3*u*t*t*edge.b.x + t*t*t*edge.to.x,
            y: u*u*u*edge.from.y + 3*u*u*t*edge.a.y + 3*u*t*t*edge.b.y + t*t*t*edge.to.y
        };
    }
    function edgeStrength(edge) {
        // Traffic stops immediately on failure and fades back in as a node recovers.
        if (['crashing','offline'].includes(edge.from.state.phase) || ['crashing','offline'].includes(edge.to.state.phase)) return 0;
        return Math.min(edge.from.state.strength, edge.to.state.strength);
    }
    function draw() {
        if (!width || !height) return;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, width, height);
        context.scale(width / 620, height / 450);
        const palette = dark ? palettes.dark : palettes.light;
        const positions = nodes.map((node, index) => ({
            x: node.x + Math.sin(elapsed * .35 + index * 1.7) * 2,
            y: node.y + Math.cos(elapsed * .3 + index * 1.3) * 2,
            state: nodeState(index, elapsed)
        }));
        const edges = links.map(([a,b], index) => curve(positions[a], positions[b], index));
        edges.forEach((edge, index) => {
            const strength = edgeStrength(edge);
            context.globalAlpha = strength ? .4 + strength * .6 : 1;
            context.strokeStyle = strength ? palette.wire : palette.offlineWire;
            context.lineWidth = .8;
            context.beginPath(); context.moveTo(edge.from.x, edge.from.y);
            context.bezierCurveTo(edge.a.x, edge.a.y, edge.b.x, edge.b.y, edge.to.x, edge.to.y); context.stroke();
            if (!strength) return;
            const progress = (elapsed * (1.05 + index % 4 * .15) + index * .618) % 1;
            for (let tail = 4; tail >= 0; tail--) {
                const at = progress - tail * .022;
                if (at < 0) continue;
                const position = point(edge, index % 2 ? 1-at : at);
                context.globalAlpha = (1 - tail / 5) * .85 * strength;
                context.fillStyle = palette.colors[index % palette.colors.length];
                context.beginPath(); context.arc(position.x, position.y, tail ? 1 : 2, 0, Math.PI * 2); context.fill();
            }
        });
        context.globalAlpha = 1;
        positions.forEach((node, index) => {
            const { phase, strength, age } = node.state;
            let color = palette.colors[index % palette.colors.length];
            if (phase === 'crashing') color = palette.failure;
            if (phase === 'offline') color = palette.dead;
            if (phase === 'recovering') color = palette.recovery;
            const radius = 3.8 + (index % 4) * .65;
            if (phase === 'crashing' || phase === 'recovering') {
                const progress = phase === 'crashing' ? age / .4 : strength;
                context.globalAlpha = (1 - progress) * .65;
                context.strokeStyle = color; context.lineWidth = 1.2;
                context.beginPath(); context.arc(node.x, node.y, radius + 4 + progress * 17, 0, Math.PI * 2); context.stroke();
            }
            context.globalAlpha = phase === 'offline' ? .35 : .6 + strength * .4;
            const glow = context.createRadialGradient(node.x, node.y, 1, node.x, node.y, radius * 3);
            glow.addColorStop(0, color); glow.addColorStop(1, 'rgba(160,130,210,0)');
            if (phase !== 'offline') {
                context.globalAlpha *= .19;
                context.fillStyle = glow; context.fillRect(node.x-radius*3, node.y-radius*3, radius*6, radius*6);
            }
            context.globalAlpha = phase === 'offline' ? .3 : .7 + strength * .3;
            context.fillStyle = color;
            context.beginPath(); context.arc(node.x, node.y, phase === 'offline' ? radius*.65 : radius, 0, Math.PI * 2); context.fill();
        });
        context.globalAlpha = 1;
    }
    function tick(time) {
        frameId = null;
        if (paused || !inView || document.hidden) { previousTime = null; return; }
        if (previousTime !== null) elapsed += Math.min((time - previousTime) / 1000, .05);
        previousTime = time;
        draw();
        frameId = requestAnimationFrame(tick);
    }
    function syncAnimation() {
        if (frameId !== null) cancelAnimationFrame(frameId);
        frameId = null;
        previousTime = null;
        draw();
        if (!paused && inView && !document.hidden) frameId = requestAnimationFrame(tick);
    }
    function resize() {
        const bounds = surface.getBoundingClientRect();
        width = bounds.width;
        height = bounds.height;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        draw();
    }
    function syncButton() {
        button.setAttribute('aria-pressed', String(paused));
        button.setAttribute('aria-label', paused ? 'Play service network animation' : 'Pause service network animation');
        button.textContent = paused ? 'Play animation ▷' : 'Pause animation Ⅱ';
    }
    function syncTheme() { dark = document.documentElement.dataset.theme === 'dark'; draw(); }
    button.addEventListener('click', () => { paused = !paused; syncButton(); syncAnimation(); });
    reduceMotion.addEventListener('change', event => { paused = event.matches; syncButton(); syncAnimation(); });
    document.addEventListener('visibilitychange', syncAnimation);
    window.addEventListener('resize', resize, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(surface);
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncAnimation(); }).observe(surface);
    }
    new MutationObserver(syncTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    syncTheme();
    resize();
    surface.classList.add('network-ready');
    button.hidden = false;
    syncButton();
    syncAnimation();
})();
