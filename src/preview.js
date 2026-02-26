/* =========================================
   Preview Module — Live Preview Rendering
   ========================================= */

import { state } from './main.js';

export function renderPreview() {
    const container = document.getElementById('preview-content');
    const { projectName, projectTagline, projectProblem, demoUrl, mediaFiles, embedUrls, targetUser, useCase, currentStage, q1, q2, q3 } = state;

    // Check if anything is filled
    if (!projectName && !projectProblem && !targetUser && !q1) {
        container.innerHTML = '<div class="preview-empty">Start filling in the form to see your feedback page here...</div>';
        return;
    }

    let html = '';

    // Project header
    if (projectName) {
        html += `<div class="pv-name">${esc(projectName)}</div>`;
    }
    if (projectTagline) {
        html += `<div class="pv-tagline">${esc(projectTagline)}</div>`;
    }
    if (currentStage) {
        const stageLabels = { idea: '💡 Idea', prototype: '🔧 Prototype', mvp: '🚀 MVP', beta: '🧪 Beta', launched: '✅ Launched' };
        html += `<span class="pv-stage">${stageLabels[currentStage] || currentStage}</span>`;
    }

    // Problem
    if (projectProblem) {
        html += `<div class="pv-section"><h3>🎯 The Problem</h3><p>${esc(projectProblem)}</p></div>`;
    }

    // Demo
    if (demoUrl || mediaFiles.length > 0 || embedUrls.length > 0) {
        html += `<div class="pv-section"><h3>📸 Demo</h3>`;
        if (demoUrl) {
            html += `<a href="${esc(demoUrl)}" target="_blank" class="pv-demo-link">🔗 Live Demo</a>`;
        }
        if (mediaFiles.length > 0 || embedUrls.length > 0) {
            html += `<div class="pv-media-grid">`;
            for (const file of mediaFiles) {
                html += `<img src="${file.data}" alt="${esc(file.name)}" />`;
            }
            for (const url of embedUrls) {
                html += `<img src="${esc(url)}" alt="Demo media" onerror="this.style.display='none'" />`;
            }
            html += `</div>`;
        }
        html += `</div>`;
    }

    // Audience
    if (targetUser) {
        html += `<div class="pv-section"><h3>👥 Target User</h3><p>${esc(targetUser)}</p></div>`;
    }
    if (useCase) {
        html += `<div class="pv-section"><h3>💡 Use Case</h3><p>${esc(useCase)}</p></div>`;
    }

    // Questions
    const questions = [q1, q2, q3].filter(q => q.trim());
    if (questions.length > 0) {
        html += `<div class="pv-section"><h3>❓ Questions for You</h3><ol class="pv-questions">`;
        for (const q of questions) {
            html += `<li>${esc(q)}</li>`;
        }
        html += `</ol></div>`;
    }

    container.innerHTML = html;
}

function esc(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
}
