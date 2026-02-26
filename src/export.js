/* =========================================
   Export Module — Reddit, Link, Download
   ========================================= */

import { state, showToast } from './main.js';
import { formatRedditPost } from './reddit-formatter.js';
import { generateStandalonePage } from './page-generator.js';
import LZString from 'lz-string';

export function initExport() {
    window.addEventListener('generate-kit', () => {
        renderExport();
    });

    document.getElementById('copy-reddit').addEventListener('click', copyReddit);
    document.getElementById('copy-link').addEventListener('click', copyLink);
    document.getElementById('download-html').addEventListener('click', downloadHtml);
}

function renderExport() {
    // Reddit preview
    const redditText = formatRedditPost(state);
    document.getElementById('reddit-preview').textContent = redditText;

    // Shareable link
    const shareData = {
        n: state.projectName,
        t: state.projectTagline,
        p: state.projectProblem,
        d: state.demoUrl,
        e: state.embedUrls,
        u: state.targetUser,
        uc: state.useCase,
        s: state.currentStage,
        q1: state.q1,
        q2: state.q2,
        q3: state.q3,
    };
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(shareData));
    const shareUrl = `${window.location.origin}/share.html#${compressed}`;
    document.getElementById('link-preview').textContent = shareUrl;
}

function copyReddit() {
    const text = formatRedditPost(state);
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Reddit post copied to clipboard!');
    });
}

function copyLink() {
    const url = document.getElementById('link-preview').textContent;
    navigator.clipboard.writeText(url).then(() => {
        showToast('✅ Shareable link copied!');
    });
}

function downloadHtml() {
    const html = generateStandalonePage(state);
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `feedback-${state.projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('✅ HTML page downloaded!');
}
