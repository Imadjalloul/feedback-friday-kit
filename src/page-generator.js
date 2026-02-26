/* =========================================
   Page Generator — Standalone HTML Export
   ========================================= */

export function generateStandalonePage(state) {
    const stageLabels = {
        idea: '💡 Idea',
        prototype: '🔧 Prototype',
        mvp: '🚀 MVP',
        beta: '🧪 Beta',
        launched: '✅ Launched'
    };

    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    let mediaHtml = '';
    if (state.mediaFiles.length > 0 || state.embedUrls.length > 0) {
        mediaHtml += '<div class="media-grid">';
        for (const f of state.mediaFiles) {
            mediaHtml += `<img src="${f.data}" alt="${esc(f.name)}" />`;
        }
        for (const url of state.embedUrls) {
            mediaHtml += `<img src="${esc(url)}" alt="Demo" onerror="this.style.display='none'" />`;
        }
        mediaHtml += '</div>';
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(state.projectName)} — Feedback Request</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #0a0a14;
      color: #f0f0f5;
      line-height: 1.6;
      padding: 40px 20px;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.08), transparent 60%);
      pointer-events: none;
    }
    .container { max-width: 680px; margin: 0 auto; position: relative; z-index: 1; }
    .card {
      background: rgba(20,20,40,0.7);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 40px;
      backdrop-filter: blur(10px);
    }
    h1 { font-size: 2rem; font-weight: 800; margin-bottom: 4px; }
    .tagline { color: #9898b0; font-size: 1.05rem; margin-bottom: 16px; }
    .stage {
      display: inline-block;
      padding: 4px 14px;
      background: linear-gradient(135deg, #8b5cf6, #6366f1);
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .section { margin-bottom: 28px; }
    .section h2 {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #8b5cf6;
      margin-bottom: 10px;
    }
    .section p { color: #9898b0; font-size: 0.95rem; }
    .demo-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      background: rgba(20,20,40,0.7);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      color: #8b5cf6;
      text-decoration: none;
      font-size: 0.95rem;
      margin-bottom: 12px;
    }
    .demo-link:hover { border-color: #8b5cf6; }
    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }
    .media-grid img {
      width: 100%;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .questions {
      list-style: none;
      counter-reset: q;
    }
    .questions li {
      counter-increment: q;
      padding: 14px 18px;
      background: rgba(10,10,20,0.8);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      margin-bottom: 8px;
      color: #9898b0;
      font-size: 0.95rem;
    }
    .questions li::before {
      content: counter(q) ". ";
      font-weight: 700;
      color: #8b5cf6;
    }
    .footer {
      text-align: center;
      margin-top: 32px;
      font-size: 0.8rem;
      color: #5c5c78;
    }
    .footer a { color: #8b5cf6; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>${esc(state.projectName)}</h1>
      ${state.projectTagline ? `<div class="tagline">${esc(state.projectTagline)}</div>` : ''}
      ${state.currentStage ? `<span class="stage">${stageLabels[state.currentStage] || state.currentStage}</span>` : ''}

      <div class="section">
        <h2>🎯 The Problem</h2>
        <p>${esc(state.projectProblem)}</p>
      </div>

      ${state.demoUrl || mediaHtml ? `
      <div class="section">
        <h2>📸 Demo</h2>
        ${state.demoUrl ? `<a href="${esc(state.demoUrl)}" target="_blank" class="demo-link">🔗 Live Demo</a>` : ''}
        ${mediaHtml}
      </div>` : ''}

      <div class="section">
        <h2>👥 Target User</h2>
        <p>${esc(state.targetUser)}</p>
      </div>

      ${state.useCase ? `
      <div class="section">
        <h2>💡 Use Case</h2>
        <p>${esc(state.useCase)}</p>
      </div>` : ''}

      <div class="section">
        <h2>❓ Questions for You</h2>
        <ol class="questions">
          <li>${esc(state.q1)}</li>
          <li>${esc(state.q2)}</li>
          <li>${esc(state.q3)}</li>
        </ol>
      </div>
    </div>
    <div class="footer">
      Built with <a href="https://github.com/Imadjalloul/feedback-friday-kit">Feedback Friday Kit</a>
    </div>
  </div>
</body>
</html>`;
}
