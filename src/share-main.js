/* =========================================
   Share Page — Renders from URL Hash
   ========================================= */

import LZString from 'lz-string';
import './share.css';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('share-content');
    const hash = window.location.hash.slice(1);

    if (!hash) {
        container.innerHTML = '<div class="share-error"><h2>No feedback request found</h2><p>This link appears to be incomplete. <a href="/">Create your own →</a></p></div>';
        return;
    }

    try {
        const json = LZString.decompressFromEncodedURIComponent(hash);
        const data = JSON.parse(json);
        renderSharePage(container, data);
        // Update page title
        if (data.n) document.title = `${data.n} — Feedback Request`;
    } catch (e) {
        container.innerHTML = '<div class="share-error"><h2>Could not load feedback request</h2><p>The link data is corrupted. <a href="/">Create a new one →</a></p></div>';
    }
});

function renderSharePage(container, d) {
    const stageLabels = {
        idea: '💡 Idea',
        prototype: '🔧 Prototype',
        mvp: '🚀 MVP',
        beta: '🧪 Beta',
        launched: '✅ Launched'
    };

    const esc = s => {
        if (!s) return '';
        const el = document.createElement('span');
        el.textContent = s;
        return el.innerHTML;
    };

    let mediaHtml = '';
    if (d.e && d.e.length > 0) {
        mediaHtml = '<div class="media-grid">';
        for (const url of d.e) {
            mediaHtml += `<img src="${esc(url)}" alt="Demo" onerror="this.style.display='none'" />`;
        }
        mediaHtml += '</div>';
    }

    container.innerHTML = `
    <div class="share-card">
      <h1>${esc(d.n)}</h1>
      ${d.t ? `<div class="share-tagline">${esc(d.t)}</div>` : ''}
      ${d.s ? `<span class="share-stage">${stageLabels[d.s] || d.s}</span>` : ''}

      <div class="share-section">
        <h2>🎯 The Problem</h2>
        <p>${esc(d.p)}</p>
      </div>

      ${d.d || mediaHtml ? `
      <div class="share-section">
        <h2>📸 Demo</h2>
        ${d.d ? `<a href="${esc(d.d)}" target="_blank" class="share-demo-link">🔗 Live Demo</a>` : ''}
        ${mediaHtml}
      </div>` : ''}

      <div class="share-section">
        <h2>👥 Target User</h2>
        <p>${esc(d.u)}</p>
      </div>

      ${d.uc ? `
      <div class="share-section">
        <h2>💡 Use Case</h2>
        <p>${esc(d.uc)}</p>
      </div>` : ''}

      <div class="share-section">
        <h2>❓ Questions for You</h2>
        <ol class="share-questions">
          ${d.q1 ? `<li>${esc(d.q1)}</li>` : ''}
          ${d.q2 ? `<li>${esc(d.q2)}</li>` : ''}
          ${d.q3 ? `<li>${esc(d.q3)}</li>` : ''}
        </ol>
      </div>
    </div>
  `;
}
