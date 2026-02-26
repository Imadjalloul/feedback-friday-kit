/* =========================================
   Upload Module — Drag & Drop + File Input
   ========================================= */

import { state } from './main.js';
import { renderPreview } from './preview.js';

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function initUpload() {
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('file-input');
    const preview = document.getElementById('media-preview');
    const addEmbedBtn = document.getElementById('add-embed');
    const embedInput = document.getElementById('embed-url');
    const embedsList = document.getElementById('embeds-list');

    // Click to browse
    zone.addEventListener('click', () => input.click());

    // File input change
    input.addEventListener('change', () => {
        handleFiles(input.files);
        input.value = '';
    });

    // Drag & drop
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Process files
    function handleFiles(files) {
        for (const file of files) {
            if (state.mediaFiles.length >= MAX_FILES) break;
            if (file.size > MAX_SIZE) continue;
            if (!file.type.startsWith('image/')) continue;

            const reader = new FileReader();
            reader.onload = () => {
                state.mediaFiles.push({
                    type: 'file',
                    data: reader.result,
                    name: file.name,
                });
                renderMediaPreview();
                renderPreview();
            };
            reader.readAsDataURL(file);
        }
    }

    // Render uploaded images
    function renderMediaPreview() {
        preview.innerHTML = state.mediaFiles.map((f, i) => `
      <div class="media-thumb">
        <img src="${f.data}" alt="${f.name}" />
        <button class="media-remove" data-index="${i}" title="Remove">✕</button>
      </div>
    `).join('');

        preview.querySelectorAll('.media-remove').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                state.mediaFiles.splice(parseInt(btn.dataset.index), 1);
                renderMediaPreview();
                renderPreview();
            });
        });
    }

    // Embed URLs
    addEmbedBtn.addEventListener('click', () => {
        const url = embedInput.value.trim();
        if (!url) return;
        state.embedUrls.push(url);
        embedInput.value = '';
        renderEmbedsList();
        renderPreview();
    });

    embedInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addEmbedBtn.click();
        }
    });

    function renderEmbedsList() {
        embedsList.innerHTML = state.embedUrls.map((url, i) => `
      <div class="embed-item">
        <span>${url}</span>
        <button data-index="${i}" title="Remove">✕</button>
      </div>
    `).join('');

        embedsList.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                state.embedUrls.splice(parseInt(btn.dataset.index), 1);
                renderEmbedsList();
                renderPreview();
            });
        });
    }
}
