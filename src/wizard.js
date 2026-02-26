/* =========================================
   Wizard Module — Step Navigation & Preview
   ========================================= */

import { state, showSection } from './main.js';
import { renderPreview } from './preview.js';

export function initWizard() {
    const steps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.getElementById('progress-fill');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // ===== Step Navigation =====
    function goToStep(n) {
        state.currentStep = n;

        // Toggle step visibility
        steps.forEach(s => s.classList.remove('active'));
        document.querySelector(`.wizard-step[data-step="${n}"]`).classList.add('active');

        // Update progress
        progressSteps.forEach(ps => {
            const s = parseInt(ps.dataset.step);
            ps.classList.remove('active', 'done');
            if (s === n) ps.classList.add('active');
            else if (s < n) ps.classList.add('done');
        });
        progressFill.style.width = `${(n / state.totalSteps) * 100}%`;

        // Button states
        prevBtn.disabled = n === 1;
        if (n === state.totalSteps) {
            nextBtn.textContent = 'Generate Kit 🚀';
        } else {
            nextBtn.textContent = 'Next →';
        }
    }

    prevBtn.addEventListener('click', () => {
        if (state.currentStep > 1) goToStep(state.currentStep - 1);
    });

    nextBtn.addEventListener('click', () => {
        // Validate current step
        if (!validateStep(state.currentStep)) return;
        syncState();

        if (state.currentStep < state.totalSteps) {
            goToStep(state.currentStep + 1);
        } else {
            // Final step — go to export
            const exportSection = document.getElementById('export');
            showSection(exportSection);
            // Dispatch event to trigger export rendering
            window.dispatchEvent(new CustomEvent('generate-kit'));
        }
    });

    // ===== Validation =====
    function validateStep(step) {
        syncState();
        if (step === 1) {
            if (!state.projectName.trim()) {
                shakeField('project-name');
                return false;
            }
            if (!state.projectProblem.trim()) {
                shakeField('project-problem');
                return false;
            }
        }
        if (step === 3) {
            if (!state.targetUser.trim()) {
                shakeField('target-user');
                return false;
            }
        }
        if (step === 4) {
            if (!state.q1.trim()) { shakeField('q1'); return false; }
            if (!state.q2.trim()) { shakeField('q2'); return false; }
            if (!state.q3.trim()) { shakeField('q3'); return false; }
        }
        return true;
    }

    function shakeField(id) {
        const el = document.getElementById(id);
        el.style.borderColor = 'var(--danger)';
        el.classList.add('shake');
        el.focus();
        setTimeout(() => {
            el.style.borderColor = '';
            el.classList.remove('shake');
        }, 600);
    }

    // ===== Sync state from form =====
    function syncState() {
        state.projectName = document.getElementById('project-name').value;
        state.projectTagline = document.getElementById('project-tagline').value;
        state.projectProblem = document.getElementById('project-problem').value;
        state.demoUrl = document.getElementById('demo-url').value;
        state.targetUser = document.getElementById('target-user').value;
        state.useCase = document.getElementById('use-case').value;
        state.q1 = document.getElementById('q1').value;
        state.q2 = document.getElementById('q2').value;
        state.q3 = document.getElementById('q3').value;
    }

    // ===== Live preview on input =====
    document.querySelectorAll('.wizard-form input, .wizard-form textarea').forEach(el => {
        el.addEventListener('input', () => {
            syncState();
            renderPreview();
        });
    });

    // ===== Character counters =====
    document.getElementById('project-name').addEventListener('input', e => {
        document.getElementById('name-count').textContent = e.target.value.length;
    });
    document.getElementById('project-tagline').addEventListener('input', e => {
        document.getElementById('tagline-count').textContent = e.target.value.length;
    });

    // ===== Stage pills =====
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.currentStage = pill.dataset.value;
            document.getElementById('current-stage').value = pill.dataset.value;
            renderPreview();
        });
    });

    // ===== Question templates =====
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            target.value = btn.dataset.text;
            target.dispatchEvent(new Event('input'));
        });
    });

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
    .shake { animation: shake 0.4s ease; }
  `;
    document.head.appendChild(style);
}
