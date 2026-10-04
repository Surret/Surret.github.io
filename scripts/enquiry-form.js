// --- js/enquiry-form.js ---
// Reusable glassmorphic enquiry form component matching Surrettun Station styling.

(function () {
    // Set your target email here as default fallback
    const DEFAULT_RECIPIENT_EMAIL = "6b9cd44a43955f791918bf5756a84fdc"; 

    function renderEnquiryForm(containerId = 'enquiry-form-container', options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const defaultOptions = {
            showModules: true,
            title: 'Scope a Project',
            subtitle: 'Select required capabilities or describe your build requirements below.',
            buttonText: 'Submit Modular Enquiry',
            recipientEmail: DEFAULT_RECIPIENT_EMAIL
        };

        const config = { ...defaultOptions, ...options };
        const services = window.servicesData || window.SERVICES_DATA || [];
        
        let modulesHTML = '';
        if (config.showModules && services.length > 0) {
            const checkboxList = services.map(service => `
                <label class="flex items-center space-x-3 bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl hover:border-cyan-500/50 cursor-pointer transition-all duration-200 group">
                    <input type="checkbox" 
                           name="modules[]" 
                           value="${service.number}: ${service.title}" 
                           id="checkbox-${service.id}"
                           class="rounded border-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-slate-900 bg-slate-900 w-4 h-4">
                    <span class="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">${service.number}: ${service.title}</span>
                </label>
            `).join('');

            modulesHTML = `
                <div class="mb-6">
                    <label class="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">Required Engineering Modules</label>
                    <div id="form-checkboxes-container" class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
                        ${checkboxList}
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
                <div class="mb-8 text-center sm:text-left border-b border-slate-800/80 pb-6">
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-white">${config.title}</h2>
                    <p class="text-slate-400 text-sm mt-2">${config.subtitle}</p>
                </div>

                <form id="enquiry-form-element" class="space-y-6">
                    <!-- Anti-spam honeypot -->
                    <input type="text" name="_honey" style="display:none">

                    ${modulesHTML}

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="form-name" class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Name</label>
                            <input type="text" id="form-name" name="name" required placeholder="e.g. Alex Mercer" class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600">
                        </div>
                        <div>
                            <label for="form-email" class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Email</label>
                            <input type="email" id="form-email" name="email" required placeholder="alex@company.com" class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600">
                        </div>
                    </div>

                    <div>
                        <label for="form-details" class="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Project Details / Bottlenecks</label>
                        <textarea id="form-details" name="details" rows="4" required placeholder="Briefly describe your hardware setup, timeline, or technical bottleneck..." class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"></textarea>
                    </div>

                    <div id="form-status-message" class="hidden text-sm rounded-xl p-4 font-medium"></div>

                    <button type="submit" id="form-submit-btn" class="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-3.5 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed">
                        ${config.buttonText}
                    </button>
                </form>
            </div>
        `;

        bindFormHandler(config.recipientEmail, config.buttonText);
    }

    function bindFormHandler(recipientEmail, defaultBtnText) {
        const form = document.getElementById('enquiry-form-element');
        const statusMsg = document.getElementById('form-status-message');
        const submitBtn = document.getElementById('form-submit-btn');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Enquiry...';

            const formData = new FormData(form);

            const selectedModules = formData.getAll('modules[]');
            formData.delete('modules[]');
            formData.append('Selected Modules', selectedModules.length ? selectedModules.join(' | ') : 'None selected');

            try {
                const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                if (response.ok) {
                    statusMsg.className = "text-sm rounded-xl p-4 font-medium bg-cyan-950/80 border border-cyan-500/50 text-cyan-300";
                    statusMsg.textContent = "Thank you! Your enquiry has been sent successfully.";
                    statusMsg.classList.remove('hidden');
                    form.reset();
                } else {
                    throw new Error('Form submission failed.');
                }
            } catch (err) {
                statusMsg.className = "text-sm rounded-xl p-4 font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300";
                statusMsg.textContent = "Unable to send right now. Please check your connection or contact directly via email.";
                statusMsg.classList.remove('hidden');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = defaultBtnText;
            }
        });
    }

    // Expose function globally
    window.renderEnquiryForm = renderEnquiryForm;
})();