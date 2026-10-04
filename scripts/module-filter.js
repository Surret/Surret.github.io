// --- js/module-filter.js ---

(function () {
    function initModuleFilter() {
        const services = window.servicesData || window.SERVICES_DATA || [];
        const selectorContainer = document.getElementById('module-cards-container');
        const mobileSelect = document.getElementById('mobile-module-select');

        if (!services.length) {
            console.warn('module-filter.js: No service data found in SERVICES_DATA.');
            return;
        }

        // 1. Render Desktop Grid Buttons
        if (selectorContainer) {
            renderSelectorButtons(services, selectorContainer);
        }

        // 2. Render Mobile Dropdown Options
        if (mobileSelect) {
            renderMobileOptions(services, mobileSelect);
            mobileSelect.addEventListener('change', (e) => {
                setActiveModule(e.target.value, false);
            });
        }

        // 3. Attach Click Listeners to Desktop Buttons
        document.querySelectorAll('[data-module-target]').forEach(button => {
            button.addEventListener('click', (e) => {
                const moduleId = e.currentTarget.getAttribute('data-module-target');
                setActiveModule(moduleId, false); // False = Explicit user interaction
            });
        });

        // 4. Initialise First Active State
        if (services.length > 0) {
            setActiveModule(services[0].id, true); // True = Initial page load (bypasses checkbox ticking)
        }
    }

    function renderSelectorButtons(services, container) {
        container.innerHTML = services.map(service => `
            <button data-module-target="${service.id}" 
                    class="module-btn w-full bg-slate-900/70 backdrop-blur-md border border-slate-800 hover:border-cyan-400 p-4 rounded-xl text-left transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg">
                <span class="text-[10px] font-mono text-cyan-400 block mb-1">${service.number}</span>
                <h3 class="font-bold text-slate-200 text-sm group-hover:text-cyan-300">${service.title}</h3>
            </button>
        `).join('');
    }

    function renderMobileOptions(services, selectElement) {
        selectElement.innerHTML = services.map(service => `
            <option value="${service.id}">${service.number}: ${service.title}</option>
        `).join('');
    }

    function setActiveModule(moduleId, isInitialLoad = false) {
        const services = window.servicesData || window.SERVICES_DATA || [];
        const activeService = services.find(s => s.id === moduleId);
        if (!activeService) return;

        // Sync Mobile Dropdown value if selection changed via desktop button
        const mobileSelect = document.getElementById('mobile-module-select');
        if (mobileSelect && mobileSelect.value !== moduleId) {
            mobileSelect.value = moduleId;
        }

        // Highlight active desktop button state
        document.querySelectorAll('[data-module-target]').forEach(btn => {
            const isActive = btn.getAttribute('data-module-target') === moduleId;
            if (isActive) {
                btn.classList.add('border-cyan-400', 'bg-slate-800/90', 'shadow-cyan-500/10');
                btn.classList.remove('border-slate-800', 'bg-slate-900/70');
            } else {
                btn.classList.remove('border-cyan-400', 'bg-slate-800/90', 'shadow-cyan-500/10');
                btn.classList.add('border-slate-800', 'bg-slate-900/70');
            }
        });

        // Update Detail Panel
        const detailContainer = document.getElementById('module-detail-panel');
        if (detailContainer) {
            renderDetailPanel(activeService, detailContainer);
        }

        // Filter Project Proof Cards
        if (window.projectData && window.renderProjects) {
            const targetTag = activeService.projectTag || moduleId;
            const filteredProjects = window.projectData.filter(project => 
                project.modules && project.modules.includes(targetTag)
            );
            window.renderProjects(filteredProjects, 'module-proof-container');
        }

        // Sync checkbox in form ONLY when clicked directly by user
        if (!isInitialLoad) {
            const targetCheckbox = document.getElementById(`checkbox-${moduleId}`);
            if (targetCheckbox) {
                targetCheckbox.checked = true;
            }
        }
    }

    function renderDetailPanel(service, container) {
        const deliverablesList = service.deliverables.map(item => `
            <li class="flex items-start space-x-2">
                <span class="text-cyan-400 font-bold">•</span>
                <span>${item}</span>
            </li>
        `).join('');

        const toolsBadges = service.tools.map(tool => `
            <span class="bg-slate-950/80 border border-slate-800 text-cyan-300 text-xs font-mono px-3 py-1 rounded-lg">
                ${tool}
            </span>
        `).join('');

        container.innerHTML = `
            <div class="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div class="pb-6 border-b border-slate-800 mb-6">
                    <span class="text-xs font-mono text-cyan-400 uppercase tracking-wider">${service.number} CAPABILITIES</span>
                    <h2 class="text-2xl sm:text-3xl font-bold text-white mt-1">${service.title}</h2>
                    <p class="text-slate-300 text-sm mt-2 leading-relaxed">${service.shortDesc}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xs font-mono text-slate-400 uppercase mb-3 tracking-wider">Handover Deliverables</h3>
                        <ul class="text-sm text-slate-300 space-y-2.5">
                            ${deliverablesList}
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xs font-mono text-slate-400 uppercase mb-3 tracking-wider">Primary Toolchain & Stack</h3>
                        <div class="flex flex-wrap gap-2">
                            ${toolsBadges}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    window.initModuleFilter = initModuleFilter;
})();