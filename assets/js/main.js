/**
 * UNDEFINEDVERSEOFFICIAL // CORE JAVASCRIPT (assets/js/main.js)
 * Implements mobile navigation, dimensional explorer tabs, modal focus management, 
 * accessibility controls, and lightweight optimized canvas animation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // State Tracking for Focus Restoration
    let lastDrawerTrigger = null;
    let lastModalTrigger = null;

    // ==========================================
    // 1. MOBILE NAVIGATION DRAWER
    // ==========================================
    window.toggleMobileMenu = function() {
        const drawer = document.getElementById('mobileDrawer');
        const btn = document.getElementById('mobileMenuBtn');
        if (!drawer || !btn) return;
        
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
    };

    window.handleDrawerNavLinkClick = function(e, isModalTrigger = false) {
        const drawer = document.getElementById('mobileDrawer');
        const btn = document.getElementById('mobileMenuBtn');
        if (!drawer) return;
        
        if (drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            if (btn) {
                btn.setAttribute('aria-expanded', 'false');
            }
            drawer.setAttribute('aria-hidden', 'true');
            drawer.setAttribute('inert', '');
        }

        if (isModalTrigger) {
            lastModalTrigger = btn;
            window.openModal(e);
        } else {
            if (btn && document.body.contains(btn)) {
                btn.focus();
            }
        }
    };

    // ==========================================
    // 2. DIMENSIONAL EXPLORER TABS & KEYBOARD NAV
    // ==========================================
    window.switchTab = function(index) {
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
    };

    // Keyboard navigation for explorer tabs
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

    // ==========================================
    // 3. PREVIEW MODAL & ACCESSIBILITY CONTROLS
    // ==========================================
    window.openModal = function(e) {
        if (e) e.preventDefault();
        if (!lastModalTrigger) {
            lastModalTrigger = document.activeElement;
        }
        const overlay = document.getElementById('modalOverlay');
        const appRoot = document.getElementById('appRoot');
        const mobileDrawer = document.getElementById('mobileDrawer');
        const closeBtn = document.getElementById('modalCloseBtn');
        
        if (!overlay) return;

        overlay.removeAttribute('inert');
        overlay.classList.add('active');
        
        if (appRoot) appRoot.inert = true;
        if (mobileDrawer) mobileDrawer.inert = true;
        
        if (closeBtn) closeBtn.focus();
    };

    window.closeModal = function(e) {
        if (e && e.target.id === 'modalOverlay') {
            window.closeModalDirect();
        }
    };

    window.closeModalDirect = function() {
        const overlay = document.getElementById('modalOverlay');
        const appRoot = document.getElementById('appRoot');
        const mobileDrawer = document.getElementById('mobileDrawer');
        
        if (!overlay) return;

        overlay.classList.remove('active');
        overlay.setAttribute('inert', '');
        
        // Restore background interactivity first before restoring focus
        if (appRoot) appRoot.inert = false;
        if (mobileDrawer) {
            if (!mobileDrawer.classList.contains('open')) {
                mobileDrawer.setAttribute('inert', '');
            } else {
                mobileDrawer.removeAttribute('inert');
            }
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
            const mobileBtn = document.getElementById('mobileMenuBtn');
            const fallback = (mobileBtn && window.getComputedStyle(mobileBtn).display !== 'none' && isElementUsable(mobileBtn))
                ? mobileBtn 
                : (document.querySelector('.btn-primary') || document.querySelector('a[href="#preview"]'));
            
            if (fallback && typeof fallback.focus === 'function') {
                fallback.focus();
            }
        }
    };

    // Global Keyboard Handler (Escape key & Focus Trap)
    window.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modalOverlay');
        const drawer = document.getElementById('mobileDrawer');

        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('active')) {
                window.closeModalDirect();
            } else if (drawer && drawer.classList.contains('open')) {
                window.toggleMobileMenu();
            }
        }

        if (modal && modal.classList.contains('active') && e.key === 'Tab') {
            const container = document.getElementById('modalContainer');
            if (!container) return;
            
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

    // ==========================================
    // 4. NULL-AXIS CANVAS ANIMATION (STABLE & OPTIMIZED)
    // ==========================================
    const canvas = document.getElementById('null-axis-canvas');
    const container = document.getElementById('canvasContainer');

    if (canvas && container) {
        const ctx = canvas.getContext('2d');
        let lastDpr = window.devicePixelRatio || 1;
        let animationFrameId = null;
        let isVisible = true;

        function updateCanvasDimensions() {
            const rect = container.getBoundingClientRect();
            lastDpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = rect.width * lastDpr;
            canvas.height = rect.height * lastDpr;
            ctx.setTransform(lastDpr, 0, 0, lastDpr, 0, 0);
        }

        // Initialize persistent background nodes once to prevent flicker & runtime overhead
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

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        function drawNullAxis(time = 0) {
            const displayWidth = container.clientWidth;
            const displayHeight = container.clientHeight;
            const centerX = displayWidth / 2;
            const centerY = displayHeight / 2;

            ctx.clearRect(0, 0, displayWidth, displayHeight);

            // Draw stable background nodes using normalized relative coordinates
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
            if (!isVisible || motionQuery.matches) return;
            drawNullAxis(timestamp);
            animationFrameId = requestAnimationFrame(animationLoop);
        }

        function handleMotionPreference() {
            if (motionQuery.matches) {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
                drawNullAxis(0); // Render static frame
            } else {
                if (!animationFrameId && isVisible) {
                    animationFrameId = requestAnimationFrame(animationLoop);
                }
            }
        }

        function handleResizeOrDprChange() {
            const currentDpr = Math.min(window.devicePixelRatio || 1, 2);
            if (currentDpr !== lastDpr) {
                lastDpr = currentDpr;
            }
            updateCanvasDimensions();
            if (motionQuery.matches || !isVisible) {
                drawNullAxis(0);
            }
        }

        // IntersectionObserver to pause animation when canvas is scrolled out of viewport
        if (typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isVisible = entry.isIntersecting;
                    if (isVisible) {
                        handleMotionPreference();
                    } else if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                });
            }, { threshold: 0.05 });
            observer.observe(container);
        }

        // Media Query List listener for DPR changes & reduced motion
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

        if (motionQuery.addEventListener) {
            motionQuery.addEventListener('change', handleMotionPreference);
        } else if (motionQuery.addListener) {
            motionQuery.addListener(handleMotionPreference);
        }

        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(() => {
                handleResizeOrDprChange();
            });
            resizeObserver.observe(container);
        } else {
            window.addEventListener('resize', handleResizeOrDprChange);
        }

        handleMotionPreference();
    }
});
