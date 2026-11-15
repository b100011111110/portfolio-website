# Portfolio design

A light, restrained developer portfolio inspired by the spacious typography, technical details, and pastel gradient illustrations of the LlamaIndex website. Keep Shri Hari's own identity, projects, and experience.

## Foundation

- Warm off-white background: `#faf9f6`.
- Charcoal text and primary buttons: `#202020`.
- Muted supporting text: `#666661`.
- Thin neutral borders: `#deded8`.
- Blue, lavender, pink, and peach gradients inside illustrations; keep backgrounds and text mostly neutral.
- DM Sans for headings and body, IBM Plex Mono for small labels and technical metadata. System fallbacks remain usable without external fonts.
- Moderate corner radii, subtle hover movement, generous but bounded whitespace.

## Layout

Use a 1200px content width with responsive gutters. A compact sticky navigation leads into a split hero with a short introduction and a live irregular graph of containers and services connected through MCP. Follow with illustrated project cards, an experience section, compact skill groups, prominent certifications followed by current M.Tech and undergraduate education, then a conversation-focused contact section.

At mobile widths, stack the hero and project cards, collapse navigation behind an accessible toggle, and use a single column for skills. Keep all content accessible without JavaScript; JavaScript adds navigation controls, active section markers, and email copying. Do not introduce full-screen loaders or make content depend on fetching HTML fragments.

## Implementation

`index.html` contains the complete page, `style.css` defines the responsive theme and CSS illustrations, and `script.js` adds progressive enhancements. No build step or runtime CSS framework is required. Original section fragments remain as source references; the page does not load them.

Respect keyboard focus and reduced-motion preferences. Use the original resume, profile links, certificate links, and verified portfolio facts.

## Current refinements

- The global root size is 115%, with rem-based component dimensions for a consistent 15% scale increase. Responsive gutters and SVGs keep smaller screens usable.
- Light and dark themes use shared color tokens. The toggle remembers the visitor’s choice; the initial theme is light until a choice is saved.
- Comet Track and Docker MCP are explicitly marked as planned projects. Password Manager retains its repository link.
- Certifications are always visible above education. Graph Data Modeling Fundamentals and Neo4j Fundamentals each link to their supplied GraphAcademy credentials.
- Education includes an in-progress M.Tech at Manipal Institute of Technology, Manipal, in Artificial Intelligence, without assumed dates.

## Profile positioning

Lead with AI workflows, Model Context Protocol, and connecting models to tools and data. Highlight LangChain, LangGraph, and Python before supporting engineering skills. Preserve the factual C++ experience and Password Manager project. Do not imply the planned projects are already shipped, or that enterprise employment involved AI work. The current degree is M.Tech in Artificial Intelligence at MIT Manipal.

The hero depicts an irregular container-workflow graph with 34 unlabeled dots and a denser web of connections. Packets travel simultaneously in both directions. Staggered simulated failures dim nodes and stop their traffic; recovery rings and restored connections show nodes coming back online. A stable backbone keeps the remaining graph connected. This is an illustrative topology, not a running deployment. The AI & data skill group lists PyTorch, Neo4j, SQL, and MongoDB.

Hero animation: `neural-network.js` renders a responsive, high-DPI canvas service graph with fast bidirectional data flow and gently drifting dots, simulated node failures, and automatic recovery. An inline SVG is the static fallback. A pause/resume button and reduced-motion preference control animation; rendering pauses when the hero is outside the viewport or the page is hidden. Colors follow the selected theme. Previously generated raster assets remain in `assets/` but are no longer loaded by the page.

Each main page section sits in its own rounded, thin-bordered box, aligned to the shared container. Section padding and vertical gaps are consistent and responsive. The service network itself remains unframed, without a separate title bar or dot grid. Its animation and pause control remain intact.
