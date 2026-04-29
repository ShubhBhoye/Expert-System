/**
 * =============================================
 * InfoSys AI — Application Logic
 * Handles UI interactions, state management, and rendering
 * =============================================
 */

// ── State Management ──
const state = {
    selectedSymptoms: new Set(),
    activeSection: 'home',
    currentWizardStep: 1,
    totalWizardSteps: 4,
    engine: new InferenceEngine(KnowledgeBase)
};

// ── Initialization ──
document.addEventListener('DOMContentLoaded', () => {
    renderSymptomCategories();
    setupEventListeners();
    updateStats();
});

// ── UI Rendering ──

function renderSymptomCategories() {
    const categories = [
        { id: 'operations', target: 'options-operations' },
        { id: 'customer', target: 'options-customer' },
        { id: 'data_issues', target: 'options-data_issues' },
        { id: 'tech_pref', target: 'options-tech_pref' }
    ];

    categories.forEach(config => {
        const container = document.getElementById(config.target);
        if (!container) return;

        const catData = KnowledgeBase.symptomCategories.find(c => c.id === config.id);
        if (!catData) return;

        container.innerHTML = catData.symptoms.map(s => `
            <div class="wizard-option ${state.selectedSymptoms.has(s) ? 'selected' : ''}" 
                 data-id="${s}" 
                 onclick="toggleSymptom('${s}')">
                <div class="option-check"></div>
                <div class="option-text">
                    <span class="option-title">${KnowledgeBase.getSymptomName(s)}</span>
                </div>
            </div>
        `).join('');
    });
}

function moveWizard(direction) {
    const nextStep = state.currentWizardStep + direction;
    if (nextStep < 1 || nextStep > state.totalWizardSteps) return;

    // Hide current step
    document.getElementById(`step-${state.currentWizardStep}`).classList.remove('active');
    document.querySelector(`.prog-step[data-step="${state.currentWizardStep}"]`).classList.remove('active');

    // Show next step
    state.currentWizardStep = nextStep;
    document.getElementById(`step-${state.currentWizardStep}`).classList.add('active');
    document.querySelector(`.prog-step[data-step="${state.currentWizardStep}"]`).classList.add('active');
    
    // Mark previous steps as complete
    document.querySelectorAll('.prog-step').forEach(s => {
        const sNum = parseInt(s.dataset.step);
        if (sNum < state.currentWizardStep) s.classList.add('complete');
        else s.classList.remove('complete');
    });

    // Update Progress Bar
    const progress = (state.currentWizardStep / state.totalWizardSteps) * 100;
    document.getElementById('wizard-progress-fill').style.width = `${progress}%`;

    // Update Buttons
    document.getElementById('btn-wizard-prev').disabled = state.currentWizardStep === 1;
    
    if (state.currentWizardStep === state.totalWizardSteps) {
        document.getElementById('btn-wizard-next').style.display = 'none';
        document.getElementById('btn-wizard-finish').style.display = 'flex';
    } else {
        document.getElementById('btn-wizard-next').style.display = 'flex';
        document.getElementById('btn-wizard-finish').style.display = 'none';
    }
}

function toggleSymptom(id) {
    if (state.selectedSymptoms.has(id)) {
        state.selectedSymptoms.delete(id);
    } else {
        state.selectedSymptoms.add(id);
    }
    
    updateSymptomUI();
}

function updateSymptomUI() {
    // Update grid items
    document.querySelectorAll('.wizard-option').forEach(item => {
        const id = item.dataset.id;
        if (state.selectedSymptoms.has(id)) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });

    // Update Chips
    const bar = document.getElementById('selected-symptoms-bar');
    const chipsContainer = document.getElementById('selected-chips');
    const countLabel = document.getElementById('search-count');

    if (state.selectedSymptoms.size > 0) {
        if (bar) bar.style.display = 'flex';
        if (countLabel) countLabel.textContent = `${state.selectedSymptoms.size} selected`;
        
        if (chipsContainer) {
            chipsContainer.innerHTML = Array.from(state.selectedSymptoms).map(id => `
                <div class="chip">
                    ${KnowledgeBase.getSymptomName(id)}
                    <span class="chip-remove" onclick="toggleSymptom('${id}')">&times;</span>
                </div>
            `).join('');
        }
    } else {
        if (bar) bar.style.display = 'none';
        if (countLabel) countLabel.textContent = '0 selected';
    }
}

function clearAllSymptoms() {
    state.selectedSymptoms.clear();
    updateSymptomUI();
    document.getElementById('results-container').style.display = 'none';
}

function runDiagnosis() {
    const btn = document.getElementById('btn-wizard-finish');
    btn.classList.add('loading');
    
    // Simulate processing delay for "AI feel"
    setTimeout(() => {
        const result = state.engine.run(Array.from(state.selectedSymptoms));
        renderResults(result);
        btn.classList.remove('loading');
        
        // Final wizard state
        document.getElementById('wizard-content').style.display = 'none';
        document.querySelector('.wizard-nav').style.display = 'none';
        
        // Scroll to results
        document.getElementById('results-container').scrollIntoView({ behavior: 'smooth' });
    }, 600);
}

function renderResults(data) {
    const container = document.getElementById('results-container');
    const list = document.getElementById('results-list');
    const info = document.getElementById('inference-info');
    
    container.style.display = 'block';
    info.textContent = `Analyzed ${data.factCount} requirements against ${data.rulesApplied} knowledge rules.`;

    if (data.results.length === 0) {
        list.innerHTML = `
            <div class="no-results">
                <p>No specific system matches your current requirements. Please select more details or try different parameters.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = data.results.map(res => `
        <div class="result-card severity-${res.severity}">
            <div class="result-top">
                <div class="result-main">
                    <h4 class="result-name">${res.name}</h4>
                    <div class="result-meta">
                        <span class="badge badge-conf">${res.confidence}% Match</span>
                        <span class="badge badge-source">${res.source} inference</span>
                    </div>
                </div>
                <div class="confidence-circle" style="--percent: ${res.confidence}">
                    <svg viewBox="0 0 36 36">
                        <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <path class="circle" stroke-dasharray="${res.confidence}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    </svg>
                    <span>${res.confidence}%</span>
                </div>
            </div>
            <div class="result-body">
                <p class="result-desc">${res.description}</p>
                <div class="result-details">
                    <div class="detail-group">
                        <label>Supporting Evidence:</label>
                        <div class="evidence-list">
                            ${res.matchingFacts.map(f => `<span class="evidence-tag">${KnowledgeBase.getSymptomName(f)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="detail-group">
                        <label>Expert Recommendation:</label>
                        <p class="recommendation-text">${res.recommendation}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ── Navigation ──

function navigateTo(sectionId) {
    // Update Nav
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update Sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const target = document.getElementById(`section-${sectionId}`);
    if (target) {
        target.classList.add('active');
        state.activeSection = sectionId;
        window.scrollTo(0, 0);
        
        if (sectionId === 'knowledge') {
            renderKnowledgeBase('diseases');
        }
    }
}

function renderKnowledgeBase(type) {
    const container = document.getElementById('kb-content');
    if (!container) return;

    if (type === 'diseases') {
        const diseases = KnowledgeBase.getAllDiseases();
        container.innerHTML = `
            <div class="kb-grid">
                ${diseases.map(d => `
                    <div class="kb-card">
                        <h4>${d.name}</h4>
                        <p>${d.description}</p>
                        <div class="kb-meta">
                            <span class="label">Primary Requirements:</span>
                            <div class="tag-list">
                                ${d.symptoms.slice(0, 5).map(s => `<span>${KnowledgeBase.getSymptomName(s)}</span>`).join('')}
                                ${d.symptoms.length > 5 ? '<span>...</span>' : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (type === 'rules') {
        container.innerHTML = `
            <div class="rules-list">
                ${KnowledgeBase.rules.map(r => `
                    <div class="rule-item">
                        <div class="rule-id">${r.id}</div>
                        <div class="rule-content">${r.description}</div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (type === 'architecture') {
        container.innerHTML = `
            <div class="arch-info">
                <h3>Inference Logic: Forward Chaining</h3>
                <p>The system works by maintaining a "working memory" of facts provided by the user. It continuously applies the rules from the knowledge base to see if any "conditions" are met.</p>
                <div class="flow-diagram">
                    <div class="box">Facts</div>
                    <div class="arrow">→</div>
                    <div class="box">Rules</div>
                    <div class="arrow">→</div>
                    <div class="box">New Facts / Conclusion</div>
                </div>
            </div>
        `;
    }
}

// ── Search Logic ──

const searchInput = document.getElementById('symptom-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.symptom-item');
        const groups = document.querySelectorAll('.category-group');

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Hide groups if all items inside are hidden
        groups.forEach(group => {
            const visibleItems = group.querySelectorAll('.symptom-item[style="display: flex;"]');
            const allItems = group.querySelectorAll('.symptom-item');
            if (visibleItems.length === 0 && query !== '' && allItems.length > 0) {
                // Actually need to check if ANY item is visible
                let hasVisible = false;
                allItems.forEach(i => { if (i.style.display !== 'none') hasVisible = true; });
                group.style.display = hasVisible ? 'block' : 'none';
            } else {
                group.style.display = 'block';
            }
        });
    });
}

// ── Utilities ──

function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.section);
        });
    });

    // KB Tabs
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('kb-tab')) {
            document.querySelectorAll('.kb-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderKnowledgeBase(e.target.dataset.tab);
        }
    });
}

function updateStats() {
    const diseases = KnowledgeBase.getAllDiseases().length;
    const rules = KnowledgeBase.rules.length;
    const symptoms = KnowledgeBase.getAllSymptoms().length;

    if (document.getElementById('stat-diseases')) document.getElementById('stat-diseases').textContent = `${diseases}+`;
    if (document.getElementById('stat-rules')) document.getElementById('stat-rules').textContent = `${rules}+`;
    if (document.getElementById('stat-symptoms')) document.getElementById('stat-symptoms').textContent = `${symptoms}+`;
}

// ── Chatbot Logic ──

const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

async function sendChatMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    chatbotInput.value = '';

    // Add thinking indicator
    const thinkingId = addMessage('...', 'bot thinking');

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: text })
        });
        const data = await response.json();
        
        // Remove thinking indicator and add real message
        const thinkingEl = document.getElementById(thinkingId);
        if (thinkingEl) thinkingEl.remove();
        
        addMessage(data.response, 'bot');
    } catch (error) {
        const thinkingEl = document.getElementById(thinkingId);
        if (thinkingEl) thinkingEl.remove();
        addMessage("I'm sorry, I'm having trouble connecting to the server.", 'bot');
    }
}

function addMessage(text, type) {
    const id = 'msg-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = `message ${type}`;
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return id;
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', sendChatMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
}
