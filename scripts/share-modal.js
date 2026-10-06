// --- scripts/share-modal.js ---

(function () {
    // Helper to dynamically load qrcode.js on demand
    function loadQRCodeLibrary() {
        return new Promise((resolve, reject) => {
            if (window.QRCode) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load QRCode library'));
            document.head.appendChild(script);
        });
    }

    function initShareModal() {
        // Target all share buttons (both desktop ID and mobile class)
        const shareBtns = document.querySelectorAll('#share-btn, .share-btn');
        if (!shareBtns.length) return;

        shareBtns.forEach((btn) => {
            if (btn.dataset.shareInitialised) return;
            btn.dataset.shareInitialised = "true";

            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const pageUrl = window.location.href;
                const pageTitle = document.title;

                try {
                    await loadQRCodeLibrary();
                    openShareModal(pageUrl, pageTitle);
                } catch (err) {
                    console.error('Could not load QR code library:', err);
                    openShareModal(pageUrl, pageTitle);
                }
            });
        });
    }

    function openShareModal(url, title) {
        if (document.getElementById('share-modal-overlay')) return;

        // Only offer Native Share on genuine mobile/touch devices
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
        const showNativeShare = !!navigator.share && isMobileDevice;

        const modalHtml = `
            <div id="share-modal-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-center">
                    <button id="close-share-modal" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
                        ✕
                    </button>
                    
                    <h3 class="text-lg font-bold text-slate-100 mb-1">Share Page</h3>
                    <p class="text-xs text-slate-400 mb-4">Scan QR code or copy direct link</p>

                    <!-- QR Code Container -->
                    <div class="flex justify-center mb-4 p-3 bg-white rounded-xl w-fit mx-auto shadow-inner" id="qrcode-target"></div>

                    ${showNativeShare ? `
                        <button id="native-share-btn" class="w-full mb-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                            </svg>
                            Share via Device Apps
                        </button>
                    ` : ''}

                    <!-- Direct URL & Copy Button -->
                    <div class="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2 mb-4">
                        <input type="text" readonly value="${url}" id="share-url-input" class="bg-transparent text-xs text-slate-300 w-full focus:outline-none px-2 select-all">
                        <button id="copy-url-btn" class="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs font-mono px-3 py-1.5 rounded-md transition-all shrink-0">
                            Copy
                        </button>
                    </div>

                    <!-- Social Icons Row -->
                    <div class="flex justify-center items-center gap-3 border-t border-slate-800/80 pt-4">
                        <!-- LinkedIn -->
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" 
                           target="_blank" rel="noopener" aria-label="Share on LinkedIn"
                           class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/50 transition-all flex items-center justify-center">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                            </svg>
                        </a>

                        <!-- WhatsApp -->
                        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}" 
                           target="_blank" rel="noopener" aria-label="Share on WhatsApp"
                           class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all flex items-center justify-center">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.875 9.884-9.875 2.636 0 5.113 1.028 6.973 2.889a9.81 9.81 0 012.877 6.982c-.001 5.447-4.432 9.877-9.882 9.877M12.051 0C5.401 0 .007 5.393.007 12.043c0 2.12.553 4.19 1.603 6.012L0 24l6.108-1.601a11.986 11.986 0 005.938 1.583h.005c6.648 0 12.042-5.393 12.042-12.044S18.7 0 12.051 0z"/>
                            </svg>
                        </a>

                        <!-- Email -->
                        <a href="mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}" 
                           aria-label="Share via Email"
                           class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/50 transition-all flex items-center justify-center">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        if (window.QRCode) {
            new QRCode(document.getElementById('qrcode-target'), {
                text: url,
                width: 140,
                height: 140,
                colorDark: '#0f172a',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M
            });
        }

        const nativeBtn = document.getElementById('native-share-btn');
        if (nativeBtn) {
            nativeBtn.addEventListener('click', () => {
                navigator.share({ title: title, url: url }).catch(() => {});
            });
        }

        document.getElementById('copy-url-btn').addEventListener('click', (e) => {
            navigator.clipboard.writeText(url);
            e.target.textContent = 'Copied!';
            setTimeout(() => { e.target.textContent = 'Copy'; }, 2000);
        });

        const overlay = document.getElementById('share-modal-overlay');
        document.getElementById('close-share-modal').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // Expose globally so it can be called after dynamic DOM fetches
    window.initShareModal = initShareModal;

    // Auto-initialise if DOM is already populated
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShareModal);
    } else {
        initShareModal();
    }
})();