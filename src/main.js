/* =========================================
   Main Entry Point — Feedback Friday Kit
   ========================================= */

import './style.css';
import { initWizard } from './wizard.js';
import { initExport } from './export.js';
import { initUpload } from './upload.js';

// Global app state
export const state = {
  currentStep: 1,
  totalSteps: 4,
  projectName: '',
  projectTagline: '',
  projectProblem: '',
  demoUrl: '',
  mediaFiles: [],    // { type: 'file', data: base64, name: string }
  embedUrls: [],     // string[]
  targetUser: '',
  useCase: '',
  currentStage: '',
  q1: '',
  q2: '',
  q3: '',
};

// ===== Section Navigation =====
const landing = document.getElementById('landing');
const wizard = document.getElementById('wizard');
const exportSection = document.getElementById('export');

export function showSection(section) {
  landing.classList.add('hidden');
  wizard.classList.add('hidden');
  exportSection.classList.add('hidden');
  section.classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ===== Toast =====
export function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2500);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  // Landing → Wizard CTAs
  document.getElementById('hero-cta').addEventListener('click', () => showSection(wizard));
  document.getElementById('nav-cta').addEventListener('click', () => showSection(wizard));

  // Wizard → Landing
  document.getElementById('back-to-landing').addEventListener('click', () => showSection(landing));

  // Export → Wizard
  document.getElementById('back-to-wizard').addEventListener('click', () => showSection(wizard));

  // Start over
  document.getElementById('start-over').addEventListener('click', () => {
    if (confirm('Start over? All data will be lost.')) {
      location.reload();
    }
  });

  // Init modules
  initWizard();
  initUpload();
  initExport();
});
