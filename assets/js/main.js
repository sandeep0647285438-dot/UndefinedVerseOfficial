<!DOCTYPE html>  <html lang="en" class="dark">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>UNDEFINEDVERSEOFFICIAL // THE ABSOLUTE VISION</title>  
    <meta name="description" content="An immersive fictional universe experience defined by architectural light, absolute void, and silent discovery.">  
    <link rel="preconnect" href="https://fonts.googleapis.com">  
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>  
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">  
    <style>  
        :root {  
            --bg-void: #030305;  
            --bg-surface: #0a0a0f;  
            --bg-surface-glass: rgba(10, 10, 15, 0.85);  
            --border-subtle: rgba(255, 255, 255, 0.08);  
            --border-hover: rgba(255, 255, 255, 0.25);  
            --text-main: #f1f1f3;  
            --text-muted: #8b8b9e;  
            --accent-silver: #d1d1e0;  
            --accent-violet: #8c7ae6;  
            --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;  
            --font-mono: 'JetBrains Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;  
            --header-height: 72px;  
            --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);  
        }  *, *::before, *::after {  
        box-sizing: border-box;  
        margin: 0;  
        padding: 0;  
    }  

    html {  
        scroll-behavior: smooth;  
        background-color: var(--bg-void);  
        color: var(--text-main);  
        font-family: var(--font-sans);  
        -webkit-font-smoothing: antialiased;  
        -moz-osx-font-smoothing: grayscale;  
    }  

    body {  
        background-color: var(--bg-void);  
        overflow-x: hidden;  
        position: relative;  
    }  

    /* Subtle Noise Texture Overlay */  
    body::before {  
        content: "";  
        position: fixed;  
        top: 0; left: 0; width: 100%; height: 100%;  
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E");  
        pointer-events: none;  
        z-index: 999;  
    }  

    /* Utility */  
    .container {  
        max-width: 1280px;  
        margin: 0 auto;  
        padding: 0 2rem;  
    }  

    @media (max-width: 768px) {  
        .container { padding: 0 1.25rem; }  
    }  

    /* Typography */  
    h1, h2, h3 {  
        font-weight: 400;  
        letter-spacing: -0.03em;  
    }  

    .mono-tag {  
        font-family: var(--font-mono);  
        font-size: 0.75rem;  
        letter-spacing: 0.15em;  
        text-transform: uppercase;  
        color: var(--text-muted);  
        display: inline-flex;  
        align-items: center;  
        gap: 0.5rem;  
    }  

    .mono-tag::before {  
        content: "";  
        width: 6px; height: 6px;  
        background-color: var(--accent-violet);  
        border-radius: 50%;  
        box-shadow: 0 0 8px var(--accent-violet);  
    }  

    /* Navigation */  
    header {  
        position: fixed;  
        top: 0; left: 0; width: 100%;  
        height: var(--header-height);  
        background: var(--bg-surface-glass);  
        backdrop-filter: blur(16px);  
        -webkit-backdrop-filter: blur(16px);  
        border-bottom: 1px solid var(--border-subtle);  
        z-index: 1000;  
        display: flex;  
        align-items: center;  
        transition: background 0.3s ease;  
    }  

    .nav-content {  
        display: flex;  
        justify-content: space-between;  
        align-items: center;  
        width: 100%;  
    }  

    .logo {  
        font-family: var(--font-mono);  
        font-size: 0.875rem;  
        font-weight: 500;  
        letter-spacing: 0.2em;  
        color: var(--text-main);  
        text-decoration: none;  
        display: flex;  
        align-items: center;  
        gap: 0.75rem;  
    }  

    .logo span {  
        color: var(--text-muted);  
        font-weight: 300;  
    }  

    .nav-links {  
        display: flex;  
        gap: 2.5rem;  
        list-style: none;  
        align-items: center;  
    }  

    .nav-links a {  
        font-family: var(--font-mono);  
        font-size: 0.75rem;  
        letter-spacing: 0.1em;  
        text-transform: uppercase;  
        color: var(--text-muted);  
        text-decoration: none;  
        transition: color 0.2s ease;  
    }  

    .nav-links a:hover, .nav-links a.active {  
        color: var(--text-main);  
    }  

    .system-status {  
        font-family: var(--font-mono);  
        font-size: 0.7rem;  
        color: var(--accent-silver);  
        background: rgba(255, 255, 255, 0.03);  
        border: 1px solid var(--border-subtle);  
        padding: 0.35rem 0.75rem;  
        border-radius: 2px;  
        display: flex;  
        align-items: center;  
        gap: 0.5rem;  
    }  

    .mobile-menu-btn {  
        display: none;  
        background: none;  
        border: none;  
        color: var(--text-main);  
        cursor: pointer;  
        padding: 0.5rem;  
    }  

    @media (max-width: 900px) {  
        .nav-links { display: none; }  
        .mobile-menu-btn { display: block; }  
    }  

    /* Mobile Navigation Drawer */  
    .mobile-drawer {  
        position: fixed;  
        top: var(--header-height);  
        left: 0; width: 100%;  
        height: calc(100vh - var(--header-height));  
        background: var(--bg-void);  
        border-top: 1px solid var(--border-subtle);  
        padding: 2rem;  
        display: flex;  
        flex-direction: column;  
        gap: 2rem;  
        transform: translateX(100%);  
        visibility: hidden;  
        transition: transform 0.4s var(--ease-out-expo), visibility 0s 0.4s;  
        z-index: 999;  
    }  

    .mobile-drawer.open {  
        transform: translateX(0);  
        visibility: visible;  
        transition: transform 0.4s var(--ease-out-expo), visibility 0s 0s;  
    }  

    .mobile-drawer ul {  
        list-style: none;  
        display: flex;  
        flex-direction: column;  
        gap: 1.5rem;  
    }  

    .mobile-drawer a {  
        font-family: var(--font-mono);  
        font-size: 1.125rem;  
        letter-spacing: 0.1em;  
        color: var(--text-main);  
        text-decoration: none;  
    }  

    /* Hero Section */  
    .hero {  
        position: relative;  
        min-height: 100vh;  
        display: flex;  
        align-items: center;  
        padding-top: var(--header-height);  
        overflow: hidden;  
    }  

    .hero-grid {  
        display: grid;  
        grid-template-columns: 1.1fr 0.9fr;  
        gap: 4rem;  
        align-items: center;  
        width: 100%;  
        position: relative;  
        z-index: 2;  
    }  

    @media (max-width: 960px) {  
        .hero-grid {  
            grid-template-columns: 1fr;  
            text-align: center;  
            gap: 2rem;  
            padding: 3rem 0;  
        }  
        .hero-content {  
            display: flex;  
            flex-direction: column;  
            align-items: center;  
        }  
    }  

    .hero-content h1 {  
        font-size: clamp(2.2rem, 5vw, 4.5rem);  
        line-height: 1.05;  
        margin: 1.5rem 0 2rem;  
        font-weight: 300;  
        color: var(--text-main);  
    }  

    .hero-content h1 strong {  
        font-weight: 500;  
        color: var(--accent-silver);  
    }  

    .hero-content p {  
        font-size: 1.05rem;  
        line-height: 1.7;  
        color: var(--text-muted);  
        max-width: 520px;  
        margin-bottom: 2.5rem;  
    }  

    .cta-group {  
        display: flex;  
        gap: 1rem;  
        align-items: center;  
        flex-wrap: wrap;  
    }  

    @media (max-width: 960px) {  
        .cta-group { justify-content: center; }  
    }  

    .btn {  
        font-family: var(--font-mono);  
        font-size: 0.75rem;  
        letter-spacing: 0.15em;  
        text-transform: uppercase;  
        text-decoration: none;  
        padding: 1rem 2rem;  
        border-radius: 2px;  
        transition: all 0.25s ease;  
        cursor: pointer;  
        display: inline-flex;  
        align-items: center;  
        justify-content: center;  
    }  

    .btn-primary {  
        background-color: var(--text-main);  
        color: var(--bg-void);  
        border: 1px solid var(--text-main);  
    }  

    .btn-primary:hover {  
        background-color: transparent;  
        color: var(--text-main);  
    }  

    .btn-secondary {  
        background-color: transparent;  
        color: var(--text-muted);  
        border: 1px solid var(--border-subtle);  
    }  

    .btn-secondary:hover {  
        color: var(--text-main);  
        border-color: var(--border-hover);  
    }  

    /* Canvas Null-Axis Container */  
    .hero-visual {  
        position: relative;  
        width: 100%;  
        height: 420px;  
        display: flex;  
        align-items: center;  
        justify-content: center;  
    }  

    @media (max-width: 960px) {  
        .hero-visual { height: 320px; width: 100%; }  
    }  

    #null-axis-canvas {  
        position: absolute;  
        top: 0; left: 0;  
        width: 100%; height: 100%;  
        pointer-events: none;  
    }  

    /* Section: The Core Enigma */  
    .section {  
        padding: 8rem 0;  
        border-top: 1px solid var(--border-subtle);  
        position: relative;  
    }  

    .section-header {  
        margin-bottom: 5rem;  
        max-width: 700px;  
    }  

    .section-header h2 {  
        font-size: clamp(2rem, 3.5vw, 3rem);  
        margin-top: 1rem;  
        font-weight: 300;  
    }  

    /* Dimensional Explorer */  
    .explorer-grid {  
        display: grid;  
        grid-template-columns: 320px 1fr;  
        gap: 3rem;  
        background: var(--bg-surface);  
        border: 1px solid var(--border-subtle);  
        border-radius: 4px;  
        overflow: hidden;  
    }  

    @media (max-width: 900px) {  
        .explorer-grid { grid-template-columns: 1fr; }  
    }  

    .explorer-nav {  
        display: flex;  
        flex-direction: column;  
        border-right: 1px solid var(--border-subtle);  
        background: rgba(3, 3, 5, 0.5);  
    }  

    @media (max-width: 900px) {  
        .explorer-nav { border-right: none; border-bottom: 1px solid var(--border-subtle); }  
    }  

    .explorer-tab {  
        padding: 1.5rem 2rem;  
        text-align: left;  
        background: none;  
        border: none;  
        border-bottom: 1px solid var(--border-subtle);  
        color: var(--text-muted);  
        font-family: var(--font-mono);  
        font-size: 0.8rem;  
        letter-spacing: 0.1em;  
        cursor: pointer;  
        transition: all 0.2s ease;  
        display: flex;  
        justify-content: space-between;  
        align-items: center;  
    }  

    .explorer-tab:last-child { border-bottom: none; }  

    .explorer-tab:hover {  
        color: var(--text-main);  
        background: rgba(255, 255, 255, 0.02);  
    }  

    .explorer-tab.active {  
        color: var(--text-main);  
        background: rgba(255, 255, 255, 0.04);  
        border-left: 2px solid var(--accent-violet);  
    }  

    .explorer-panel {  
        padding: 3rem;  
        display: none;  
        flex-direction: column;  
        justify-content: center;  
        min-height: 360px;  
    }  

    .explorer-panel.active {  
        display: flex;  
        animation: fadeIn 0.4s var(--ease-out-expo) forwards;  
    }  

    @keyframes fadeIn {  
        from { opacity: 0; transform: translateY(8px); }  
        to { opacity: 1; transform: translateY(0); }  
    }  

    .explorer-panel h3 {  
        font-size: 1.75rem;  
        margin-bottom: 1.25rem;  
        font-weight: 400;  
    }  

    .explorer-panel p {  
        color: var(--text-muted);  
        line-height: 1.8;  
        margin-bottom: 2rem;  
        max-width: 600px;  
    }  

    .coordinate-meta {  
        font-family: var(--font-mono);  
        font-size: 0.75rem;  
        color: var(--accent-silver);  
        display: flex;  
        gap: 2rem;  
        flex-wrap: wrap;  
        padding-top: 1.5rem;  
        border-top: 1px solid var(--border-subtle);  
    }  

    /* The Codex Section (Library) */  
    .codex-grid {  
        display: grid;  
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));  
        gap: 2rem;  
    }  

    .codex-card {  
        background: var(--bg-surface);  
        border: 1px solid var(--border-subtle);  
        padding: 2.5rem;  
        border-radius: 4px;  
        transition: all 0.3s var(--ease-out-expo);  
        position: relative;  
        display: flex;  
        flex-direction: column;  
        justify-content: space-between;  
        min-height: 280px;  
    }  

    .codex-card:hover {  
        border-color: var(--border-hover);  
        transform: translateY(-4px);  
    }  

    .codex-meta {  
        display: flex;  
        justify-content: space-between;  
        align-items: center;  
        margin-bottom: 2rem;  
    }  

    .codex-card h3 {  
        font-size: 1.25rem;  
        margin-bottom: 1rem;  
        font-weight: 400;  
    }  

    .codex-card p {  
        font-size: 0.9rem;  
        color: var(--text-muted);  
        line-height: 1.6;  
        margin-bottom: 2rem;  
    }  

    .codex-action {  
        font-family: var(--font-mono);  
        font-size: 0.75rem;  
        letter-spacing: 0.1em;  
        color: var(--text-main);  
        text-decoration: none;  
        display: inline-flex;  
        align-items: center;  
        gap: 0.5rem;  
    }  

    .codex-action span {  
        transition: transform 0.2s ease;  
    }  

    .codex-card:hover .codex-action span {  
        transform: translateX(4px);  
    }  

    /* Footer */  
    footer {  
        border-top: 1px solid var(--border-subtle);  
        padding: 5rem 0;  
        background: var(--bg-surface);  
        font-family: var(--font-mono);  
        font-size: 0.75rem;  
        color: var(--text-muted);  
    }  

    .footer-grid {  
        display: grid;  
        grid-template-columns: 2fr 1fr 1fr;  
        gap: 4rem;  
        margin-bottom: 4rem;  
    }  

    @media (max-width: 768px) {  
        .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; }  
    }  

    .footer-col h4 {  
        color: var(--text-main);  
        font-size: 0.75rem;  
        letter-spacing: 0.15em;  
        text-transform: uppercase;  
        margin-bottom: 1.25rem;  
    }  

    .footer-col ul {  
        list-style: none;  
        display: flex;  
        flex-direction: column;  
        gap: 0.75rem;  
    }  

    .footer-col a {  
        color: var(--text-muted);  
        text-decoration: none;  
        transition: color 0.2s ease;  
    }  

    .footer-col a:hover {  
        color: var(--text-main);  
    }  

    .footer-bottom {  
        padding-top: 2rem;  
        border-top: 1px solid var(--border-subtle);  
        display: flex;  
        justify-content: space-between;  
        align-items: center;  
        flex-wrap: wrap;  
        gap: 1rem;  
    }  

    /* Modal Preview Overlay (Optimized for small screens & viewport constraints) */  
    .modal-overlay {  
        position: fixed;  
        top: 0; left: 0; width: 100%; height: 100%;  
        background: rgba(3, 3, 5, 0.85);  
        backdrop-filter: blur(8px);  
        z-index: 2000;  
        display: flex;  
        align-items: center;  
        justify-content: center;  
        opacity: 0;  
        pointer-events: none;  
        transition: opacity 0.3s ease;  
        padding: 1.5rem;  
        overflow-y: auto;  
    }  

    .modal-overlay.active {  
        opacity: 1;  
        pointer-events: auto;  
    }  

    .modal-container {  
        background: var(--bg-surface);  
        border: 1px solid var(--border-hover);  
        width: 100%;  
        max-width: 600px;  
        max-height: calc(100vh - 3rem);  
        padding: 3rem;  
        border-radius: 4px;  
        position: relative;  
        transform: scale(0.95);  
        transition: transform 0.3s var(--ease-out-expo);  
        overflow-y: auto;  
        margin: auto;  
    }  

    @media (max-width: 600px) {  
        .modal-overlay { padding: 1rem; }  
        .modal-container { padding: 2rem 1.5rem; max-height: calc(100vh - 2rem); }  
    }  

    .modal-overlay.active .modal-container {  
        transform: scale(1);  
    }  

    .modal-close {  
        position: absolute;  
        top: 1.5rem; right: 1.5rem;  
        background: none; border: none;  
        color: var(--text-muted);  
        cursor: pointer;  
        font-family: var(--font-mono);  
        font-size: 0.8rem;  
        letter-spacing: 0.1em;  
        z-index: 2;  
    }  

    .modal-close:hover { color: var(--text-main); }  

    .modal-body h3 {  
        font-size: 1.5rem;  
        margin-bottom: 1rem;  
    }  

    .modal-body p {  
        color: var(--text-muted);  
        line-height: 1.7;  
        margin-bottom: 2rem;  
        font-size: 0.95rem;  
    }  

    /* Comprehensive Reduced Motion Media Query */  
    @media (prefers-reduced-motion: reduce) {  
        html {  
            scroll-behavior: auto !important;  
        }  
        *, *::before, *::after {  
            animation-duration: 0.01ms !important;  
            animation-iteration-count: 1 !important;  
            transition-duration: 0.01ms !important;  
        }  
    }  
</style>

</head>  
<body>  <!-- App Root Wrapper for Inert State Management -->  
<div id="appRoot">  
    <!-- Header / Navigation -->  
    <header>  
        <div class="container nav-content">  
            <a href="#" class="logo">  
                UV <span>// ARCHIVE</span>  
            </a>  
            <ul class="nav-links">  
                <li><a href="#origin" class="active">Origin</a></li>  
                <li><a href="#explorer">Dimensional Axis</a></li>  
                <li><a href="#codex">The Codex</a></li>  
                <li><a href="#preview" onclick="openModal(event)">Access Preview</a></li>  
            </ul>  
            <div class="system-status">  
                <span style="width:6px;height:6px;background:#8c7ae6;border-radius:50%;display:inline-block;"></span>  
                <span>STATUS: STABLE</span>  
            </div>  
            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle Menu" aria-expanded="false" aria-controls="mobileDrawer" onclick="toggleMobileMenu()">  
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>  
            </button>  
        </div>  
    </header>  

    <!-- Hero Section -->  
    <section class="hero" id="origin">  
        <div class="container hero-grid">  
            <div class="hero-content">  
                <div class="mono-tag">UndefinedVerseofficial // Core Monolith</div>  
                <h1>Beyond the Edge of <strong>Perception</strong></h1>  
                <p>An uncharted architectural dimension where absolute void intersects with disciplined silver light. Enter a self-contained fictional universe built upon precision, silence, and untold structure.</p>  
                <div class="cta-group">  
                    <a href="#explorer" class="btn btn-primary">Initialize Exploration</a>  
                    <a href="#codex" class="btn btn-secondary">Read Codex</a>  
                </div>  
            </div>  
            <div class="hero-visual" id="canvasContainer">  
                <canvas id="null-axis-canvas" aria-label="Animated 2D geometric aperture illustration" role="img"></canvas>  
            </div>  
        </div>  
    </section>  

    <!-- The Dimensional Explorer -->  
    <section class="section" id="explorer">  
        <div class="container">  
            <div class="section-header">  
                <div class="mono-tag">Interactive Repository</div>  
                <h2>The Dimensional Axis</h2>  
            </div>  
            <div class="explorer-grid">  
                <div class="explorer-nav" role="tablist" aria-label="Dimensional Explorer Tabs">  
                    <button class="explorer-tab active" id="tab-0" role="tab" aria-selected="true" aria-controls="panel-0" tabindex="0" onclick="switchTab(0)">  
                        <span>[01] THE VOID LAYER</span>  
                        <span>&rarr;</span>  
                    </button>  
                    <button class="explorer-tab" id="tab-1" role="tab" aria-selected="false" aria-controls="panel-1" tabindex="-1" onclick="switchTab(1)">  
                        <span>[02] RESONANCE FIELD</span>  
                        <span>&rarr;</span>  
                    </button>  
                    <button class="explorer-tab" id="tab-2" role="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1" onclick="switchTab(2)">  
                        <span>[03] THE THRESHOLD</span>  
                        <span>&rarr;</span>  
                    </button>  
                </div>  
                <div>  
                    <div class="explorer-panel active" id="panel-0" role="tabpanel" aria-labelledby="tab-0">  
                        <div class="mono-tag" style="margin-bottom: 1rem;">Sector 01 // Sub-Structure</div>  
                        <h3>The Obsidian Void</h3>  
                        <p>The foundational state of UndefinedVerseofficial. Devoid of atmospheric noise, this layer acts as an acoustic and visual dampener, preserving absolute clarity and framing delicate dimensional artifacts.</p>  
                        <div class="coordinate-meta">  
                            <div>COORDINATE: 00.142.99</div>  
                            <div>DENSITY: ABSOLUTE</div>  
                            <div>STATE: STABLE</div>  
                        </div>  
                    </div>  
                    <div class="explorer-panel" id="panel-1" role="tabpanel" aria-labelledby="tab-1" hidden>  
                        <div class="mono-tag" style="margin-bottom: 1rem;">Sector 02 // Frequency</div>  
                        <h3>Harmonic Resonance</h3>  
                        <p>Where mathematical geometry generates quiet kinetic motion. Interlocking asymmetric polygonal paths oscillate with precise angular velocity, emitting restrained silver frequencies across the boundary.</p>  
                        <div class="coordinate-meta">  
                            <div>COORDINATE: 04.881.20</div>  
                            <div>FREQUENCY: 432 Hz</div>  
                            <div>STATE: OSCILLATING</div>  
                        </div>  
                    </div>  
                    <div class="explorer-panel" id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>  
                        <div class="mono-tag" style="margin-bottom: 1rem;">Sector 03 // Horizon</div>  
                        <h3>The Outer Threshold</h3>  
                        <p>The final observable perimeter. Visitors standing at this boundary bear witness to the silent transition between known architectural logic and infinite unmapped expanse.</p>  
                        <div class="coordinate-meta">  
                            <div>COORDINATE: 09.004.11</div>  
                            <div>HORIZON: INFINITE</div>  
                            <div>STATE: UNMAPPED</div>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </div>  
    </section>  

    <!-- The Codex Library -->  
    <section class="section" id="codex">  
        <div class="container">  
            <div class="section-header">  
                <div class="mono-tag">Fictional Lore & Fragments</div>  
                <h2>The Codex</h2>  
            </div>  
            <div class="codex-grid">  
                <div class="codex-card">  
                    <div>  
                        <div class="codex-meta">  
                            <span class="mono-tag">Fragment 01</span>  
                            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">[SIMULATED]</span>  
                        </div>  
                        <h3>The Architect of Silence</h3>  
                        <p>An analytical account recording the construction of the primary coordinate rings and the containment of the void energy.</p>  
                    </div>  
                    <a href="#preview" class="codex-action" onclick="openModal(event)">Read Fragment <span>&rarr;</span></a>  
                </div>  
                <div class="codex-card">  
                    <div>  
                        <div class="codex-meta">  
                            <span class="mono-tag">Fragment 02</span>  
                            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">[SIMULATED]</span>  
                        </div>  
                        <h3>Chronicles of the Null-Axis</h3>  
                        <p>Field notes recovered from the perimeter observation posts detailing anomalous light refractions during equinox cycles.</p>  
                    </div>  
                    <a href="#preview" class="codex-action" onclick="openModal(event)">Read Fragment <span>&rarr;</span></a>  
                </div>  
                <div class="codex-card">  
                    <div>  
                        <div class="codex-meta">  
                            <span class="mono-tag">Fragment 03</span>  
                            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">[SIMULATED]</span>  
                        </div>  
                        <h3>Lexicon of Unknown Dimensions</h3>  
                        <p>A reference index defining core terminology, coordinate notations, and geometric classifications unique to this universe.</p>  
                    </div>  
                    <a href="#preview" class="codex-action" onclick="openModal(event)">Read Fragment <span>&rarr;</span></a>  
                </div>  
            </div>  
        </div>  
    </section>  

    <!-- Footer -->  
    <footer>  
        <div class="container">  
            <div class="footer-grid">  
                <div class="footer-col">  
                    <h4 style="color: var(--text-main); margin-bottom: 1rem; font-size: 0.875rem; letter-spacing: 0.1em;">UNDEFINEDVERSEOFFICIAL</h4>  
                    <p style="max-width: 320px; line-height: 1.6;">An independent fictional universe project exploring architectural depth, minimalist aesthetics, and immersive world-building.</p>  
                </div>  
                <div class="footer-col">  
                    <h4>Navigation</h4>  
                    <ul>  
                        <li><a href="#origin">Origin</a></li>  
                        <li><a href="#explorer">Dimensional Axis</a></li>  
                        <li><a href="#codex">The Codex</a></li>  
                    </ul>  
                </div>  
                <div class="footer-col">  
                    <h4>System</h4>  
                    <ul>  
                        <li><a href="#preview" onclick="openModal(event)">API Access (Preview)</a></li>  
                        <li><a href="#preview" onclick="openModal(event)">Security & Status</a></li>  
                        <li><a href="#preview" onclick="openModal(event)">License Info</a></li>  
                    </ul>  
                </div>  
            </div>  
            <div class="footer-bottom">  
                <div>&copy; 2026 UNDEFINEDVERSEOFFICIAL. ALL RIGHTS RESERVED.</div>  
                <div>SYSTEM REVISION: 4.2.7-RELEASE</div>  
            </div>  
        </div>  
    </footer>  
</div>  

<!-- Mobile Navigation Drawer (Inert by default when closed) -->  
<nav class="mobile-drawer" id="mobileDrawer" aria-label="Mobile Navigation" aria-hidden="true" inert>  
    <ul>  
        <li><a href="#origin" onclick="handleDrawerNavLinkClick(event)">01. Origin</a></li>  
        <li><a href="#explorer" onclick="handleDrawerNavLinkClick(event)">02. Dimensional Axis</a></li>  
        <li><a href="#codex" onclick="handleDrawerNavLinkClick(event)">03. The Codex</a></li>  
        <li><a href="#preview" onclick="handleDrawerNavLinkClick(event, true)">04. Access Preview</a></li>  
    </ul>  
    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">  
        SYSTEM // UV-2026-RELEASE  
    </div>  
</nav>  

<!-- Modal Preview (Inert by default when closed) -->  
<div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle" inert onclick="closeModal(event)">  
    <div class="modal-container" id="modalContainer" onclick="event.stopPropagation()">  
        <button class="modal-close" id="modalCloseBtn" onclick="closeModalDirect()">[CLOSE]</button>  
        <div class="modal-body">  
            <div class="mono-tag" style="margin-bottom: 1rem;">Frontend Simulation Notice</div>  
            <h3 id="modalTitle">Backend Integration Required</h3>  
            <p>You have accessed a simulated feature preview. Real database storage, user authentication, and live narrative publishing require an active backend service which is currently unlinked in this static deployment.</p>  
            <button class="btn btn-primary" id="modalAcknowledgeBtn" onclick="closeModalDirect()">Acknowledge & Close</button>  
        </div>  
    </div>  
</div>  

<!-- JavaScript Execution & State Management -->  
<script>  
    let lastDrawerTrigger = null;  
    let lastModalTrigger = null;  

    function toggleMobileMenu() {  
        const drawer = document.getElementById('mobileDrawer');  
        const btn = document.getElementById('mobileMenuBtn');  
        const isOpen = drawer.classList.toggle('open');  
          
        btn.setAttribute('aria-expanded', isOpen);  
        drawer.setAttribute('aria-hidden', !isOpen);  

        if (isOpen) {  
            drawer.removeAttribute('inert');  
            lastDrawerTrigger = btn;  
            const firstLink = drawer.querySelector('a');  
            if (firstLink) firstLink.focus();  
        } else {  
            drawer.setAttribute('inert', '');  
            if (lastDrawerTrigger && document.body.contains(lastDrawerTrigger)) {  
                lastDrawerTrigger.focus();  
            }  
        }  
    }  

    function handleDrawerNavLinkClick(e, isModalTrigger = false) {  
        const drawer = document.getElementById('mobileDrawer');  
        const btn = document.getElementById('mobileMenuBtn');  
          
        if (drawer.classList.contains('open')) {  
            drawer.classList.remove('open');  
            btn.setAttribute('aria-expanded', 'false');  
            drawer.setAttribute('aria-hidden', 'true');  
            drawer.setAttribute('inert', '');  
        }  

        if (isModalTrigger) {  
            lastModalTrigger = btn;  
            openModal(e);  
        } else {  
            if (btn && document.body.contains(btn)) {  
                btn.focus();  
            }  
        }  
    }  

    // Dimensional Explorer Tab Switcher with ARIA sync & keyboard navigation  
    function switchTab(index) {  
        const tabs = document.querySelectorAll('.explorer-tab');  
        const panels = document.querySelectorAll('.explorer-panel');  
          
        tabs.forEach((tab, i) => {  
            const isSelected = (i === index);  
            tab.classList.toggle('active', isSelected);  
            tab.setAttribute('aria-selected', isSelected);  
            tab.setAttribute('tabindex', isSelected ? '0' : '-1');  
        });  

        panels.forEach((panel, i) => {  
            const isSelected = (i === index);  
            panel.classList.toggle('active', isSelected);  
            if (isSelected) {  
                panel.removeAttribute('hidden');  
            } else {  
                panel.setAttribute('hidden', '');  
            }  
        });  
    }  

    // Keyboard navigation for explorer tabs  
    document.addEventListener('DOMContentLoaded', () => {  
        const tabList = document.querySelector('.explorer-nav');  
        if (tabList) {  
            const tabs = tabList.querySelectorAll('.explorer-tab');  
            tabs.forEach((tab, index) => {  
                tab.addEventListener('keydown', (e) => {  
                    let targetIndex = null;  
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {  
                        targetIndex = (index + 1) % tabs.length;  
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {  
                        targetIndex = (index - 1 + tabs.length) % tabs.length;  
                    } else if (e.key === 'Home') {  
                        targetIndex = 0;  
                    } else if (e.key === 'End') {  
                        targetIndex = tabs.length - 1;  
                    }  

                    if (targetIndex !== null) {  
                        e.preventDefault();  
                        switchTab(targetIndex);  
                        tabs[targetIndex].focus();  
                    }  
                });  
            });  
        }  
    });  

    // Modal Controls & Inert Background Management  
    function openModal(e) {  
        if (e) e.preventDefault();  
        if (!lastModalTrigger) {  
            lastModalTrigger = document.activeElement;  
        }  
        const overlay = document.getElementById('modalOverlay');  
          
        overlay.removeAttribute('inert');  
        overlay.classList.add('active');  
          
        document.getElementById('appRoot').inert = true;  
        document.getElementById('mobileDrawer').inert = true;  
          
        document.getElementById('modalCloseBtn').focus();  
    }  

    function closeModal(e) {  
        if (e.target.id === 'modalOverlay') {  
            closeModalDirect();  
        }  
    }  

    function closeModalDirect() {  
        const overlay = document.getElementById('modalOverlay');  
        overlay.classList.remove('active');  
        overlay.setAttribute('inert', '');  
          
        // Restore background interactivity FIRST before restoring focus  
        document.getElementById('appRoot').inert = false;  
        const drawer = document.getElementById('mobileDrawer');  
        if (!drawer.classList.contains('open')) {  
            drawer.setAttribute('inert', '');  
        } else {  
            drawer.removeAttribute('inert');  
        }  

        // Rigorous focus restoration checking validity, visibility, and responsiveness  
        const trigger = lastModalTrigger;  
        lastModalTrigger = null;  

        const isElementUsable = (el) => {  
            if (!el || !document.body.contains(el)) return false;  
            if (el.disabled || el.getAttribute('aria-hidden') === 'true') return false;  
            const style = window.getComputedStyle(el);  
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;  
            return true;  
        };  

        if (isElementUsable(trigger)) {  
            trigger.focus();  
        } else {  
            // Account for responsive changes that can hide the mobile menu button  
            const mobileBtn = document.getElementById('mobileMenuBtn');  
            const fallback = (mobileBtn && window.getComputedStyle(mobileBtn).display !== 'none' && isElementUsable(mobileBtn))  
                ? mobileBtn   
                : (document.querySelector('.btn-primary') || document.querySelector('a[href="#preview"]'));  
              
            if (fallback && typeof fallback.focus === 'function') {  
                fallback.focus();  
            }  
        }  
    }  

    // Global Keyboard Handler (Escape key & Robust Focus Trap for Modal)  
    window.addEventListener('keydown', (e) => {  
        const modal = document.getElementById('modalOverlay');  
        const drawer = document.getElementById('mobileDrawer');  

        if (e.key === 'Escape') {  
            if (modal.classList.contains('active')) {  
                closeModalDirect();  
            } else if (drawer.classList.contains('open')) {  
                toggleMobileMenu();  
            }  
        }  

        if (modal.classList.contains('active') && e.key === 'Tab') {  
            const container = document.getElementById('modalContainer');  
            const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');  
            if (focusableElements.length === 0) return;  
              
            const firstElement = focusableElements[0];  
            const lastElement = focusableElements[focusableElements.length - 1];  

            if (!container.contains(document.activeElement)) {  
                firstElement.focus();  
                e.preventDefault();  
                return;  
            }  

            if (e.shiftKey) {  
                if (document.activeElement === firstElement) {  
                    lastElement.focus();  
                    e.preventDefault();  
                }  
            } else {  
                if (document.activeElement === lastElement) {  
                    firstElement.focus();  
                    e.preventDefault();  
                }  
            }  
        }  
    });  

    // Stable Canvas Nodes with Safe Browser Compatibility Fallbacks  
    const canvas = document.getElementById('null-axis-canvas');  
    const ctx = canvas.getContext('2d');  
    const container = document.getElementById('canvasContainer');  

    let lastDpr = window.devicePixelRatio || 1;  

    function updateCanvasDimensions() {  
        const rect = container.getBoundingClientRect();  
        lastDpr = Math.min(window.devicePixelRatio || 1, 2);  
        canvas.width = rect.width * lastDpr;  
        canvas.height = rect.height * lastDpr;  
        ctx.setTransform(lastDpr, 0, 0, lastDpr, 0, 0);  
    }  

    // Generate background nodes once with normalized [0, 1] positions  
    const nodeCount = 35;  
    const backgroundNodes = [];  
    for (let i = 0; i < nodeCount; i++) {  
        backgroundNodes.push({  
            nx: Math.random(),  
            ny: Math.random(),  
            size: Math.random() * 1.2 + 0.4,  
            alpha: Math.random() * 0.4 + 0.1  
        });  
    }  

    updateCanvasDimensions();  

    let animationFrameId = null;  
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');  

    function drawNullAxis(time = 0) {  
        const displayWidth = container.clientWidth;  
        const displayHeight = container.clientHeight;  
        const centerX = displayWidth / 2;  
        const centerY = displayHeight / 2;  

        ctx.clearRect(0, 0, displayWidth, displayHeight);  

        backgroundNodes.forEach(node => {  
            ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha})`;  
            ctx.fillRect(node.nx * displayWidth, node.ny * displayHeight, node.size, node.size);  
        });  

        const maxRadius = 205;   
        const scaleX = (displayWidth / 2) / maxRadius;  
        const scaleY = (displayHeight / 2) / maxRadius;  
        const scale = Math.min(1, scaleX, scaleY);  

        const t = time * 0.0004;  

        // 1. Asymmetric Monolithic Core  
        ctx.save();  
        ctx.translate(centerX, centerY);  
        ctx.scale(scale, scale);  
        ctx.rotate(t * 0.5);  

        ctx.beginPath();  
        for (let i = 0; i < 4; i++) {  
            const angle = (i / 4) * Math.PI * 2;  
            const r = i % 2 === 0 ? 12 : 8;  
            const x = Math.cos(angle) * r;  
            const y = Math.sin(angle) * r;  
            if (i === 0) ctx.moveTo(x, y);  
            else ctx.lineTo(x, y);  
        }  
        ctx.closePath();  
        ctx.strokeStyle = '#f1f1f3';  
        ctx.lineWidth = 1.2;  
        ctx.shadowColor = '#8c7ae6';  
        ctx.shadowBlur = 12;  
        ctx.stroke();  
        ctx.shadowBlur = 0;  
        ctx.restore();  

        // 2. Interlocking Polygonal Aperture Path A (Asymmetric Hexagon Frame)  
        ctx.save();  
        ctx.translate(centerX, centerY);  
        ctx.scale(scale, scale);  
        ctx.rotate(-t * 0.3);  

        ctx.strokeStyle = 'rgba(209, 209, 224, 0.55)';  
        ctx.lineWidth = 1.25;  
        ctx.beginPath();  
        const hexPoints = 6;  
        const hexRadius = 115;  
        for (let i = 0; i < hexPoints; i++) {  
            const angle = (i / hexPoints) * Math.PI * 2;  
            const offsetRadius = hexRadius + (i % 2 === 0 ? 12 : -8);  
            const x = Math.cos(angle) * offsetRadius;  
            const y = Math.sin(angle) * hexRadius;  
            if (i === 0) ctx.moveTo(x, y);  
            else ctx.lineTo(x, y);  
        }  
        ctx.closePath();  
        ctx.stroke();  
        ctx.restore();  

        // 3. Interlocking Elliptical Path B (Tilted Perspective Ring)  
        ctx.save();  
        ctx.translate(centerX, centerY);  
        ctx.scale(scale, scale);  
        ctx.rotate(t * 0.4);  
        ctx.scale(1, 0.55);  

        ctx.strokeStyle = 'rgba(140, 122, 230, 0.45)';  
        ctx.lineWidth = 1;  
        ctx.beginPath();  
        ctx.arc(0, 0, 150, 0, Math.PI * 2);  
        ctx.stroke();  
        ctx.restore();  

        // 4. Outer Coordinate Frame  
        ctx.save();  
        ctx.translate(centerX, centerY);  
        ctx.scale(scale, scale);  
        ctx.rotate(-t * 0.15);  

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';  
        ctx.lineWidth = 0.75;  
        ctx.beginPath();  
        const octPoints = 8;  
        const octRadius = 185;  
        for (let i = 0; i < octPoints; i++) {  
            const angle = (i / octPoints) * Math.PI * 2;  
            const x = Math.cos(angle) * octRadius;  
            const y = Math.sin(angle) * octRadius;  
            if (i === 0) ctx.moveTo(x, y);  
            else ctx.lineTo(x, y);  
        }  
        ctx.closePath();  
        ctx.stroke();  
        ctx.restore();  
    }  

    function animationLoop(timestamp) {  
        drawNullAxis(timestamp);  
        animationFrameId = requestAnimationFrame(animationLoop);  
    }  

    function handleResizeOrDprChange() {  
        const currentDpr = Math.min(window.devicePixelRatio || 1, 2);  
        if (currentDpr !== lastDpr) {  
            lastDpr = currentDpr;  
        }  
        updateCanvasDimensions();  
        if (motionQuery.matches) {  
            drawNullAxis(0);  
        }  
    }  

    // Safely handle Media Query List API listener with fallback  
    if (window.matchMedia) {  
        let dprMediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);  
        const handleDprChange = () => {  
            handleResizeOrDprChange();  
            if (dprMediaQuery.removeEventListener) {  
                dprMediaQuery.removeEventListener('change', handleDprChange);  
            } else if (dprMediaQuery.removeListener) {  
                dprMediaQuery.removeListener(handleDprChange);  
            }  
            dprMediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);  
            if (dprMediaQuery.addEventListener) {  
                dprMediaQuery.addEventListener('change', handleDprChange);  
            } else if (dprMediaQuery.addListener) {  
                dprMediaQuery.addListener(handleDprChange);  
            }  
        };  
        if (dprMediaQuery.addEventListener) {  
            dprMediaQuery.addEventListener('change', handleDprChange);  
        } else if (dprMediaQuery.addListener) {  
            dprMediaQuery.addListener(handleDprChange);  
        }  
    }  

    function handleMotionPreference() {  
        if (motionQuery.matches) {  
            if (animationFrameId) {  
                cancelAnimationFrame(animationFrameId);  
                animationFrameId = null;  
            }  
            drawNullAxis(0);  
        } else {  
            if (!animationFrameId) {  
                animationFrameId = requestAnimationFrame(animationLoop);  
            }  
        }  
    }  

    if (motionQuery.addEventListener) {  
        motionQuery.addEventListener('change', handleMotionPreference);  
    } else if (motionQuery.addListener) {  
        motionQuery.addListener(handleMotionPreference);  
    }  

    // Safely handle ResizeObserver with window resize fallback  
    if (typeof ResizeObserver !== 'undefined') {  
        const resizeObserver = new ResizeObserver(() => {  
            handleResizeOrDprChange();  
        });  
        resizeObserver.observe(container);  
    } else {  
        window.addEventListener('resize', handleResizeOrDprChange);  
    }  

    handleMotionPreference();  
</script>

</body>  
</html>  