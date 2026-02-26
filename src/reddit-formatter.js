/* =========================================
   Reddit Formatter — Markdown Post Generator
   ========================================= */

export function formatRedditPost(state) {
    const lines = [];
    const stageLabels = {
        idea: '💡 Idea stage',
        prototype: '🔧 Prototype',
        mvp: '🚀 MVP',
        beta: '🧪 Beta',
        launched: '✅ Launched'
    };

    lines.push(`# ${state.projectName}`);
    if (state.projectTagline) lines.push(`> *${state.projectTagline}*`);
    lines.push('');

    if (state.currentStage) {
        lines.push(`**Stage:** ${stageLabels[state.currentStage] || state.currentStage}`);
        lines.push('');
    }

    lines.push('## 🎯 The Problem');
    lines.push(state.projectProblem);
    lines.push('');

    if (state.demoUrl) {
        lines.push('## 📸 Demo');
        lines.push(`[Check out the demo here](${state.demoUrl})`);
        lines.push('');
    }

    if (state.embedUrls.length > 0) {
        if (!state.demoUrl) lines.push('## 📸 Screenshots');
        for (const url of state.embedUrls) {
            lines.push(`- [Screenshot](${url})`);
        }
        lines.push('');
    }

    lines.push('## 👥 Target User');
    lines.push(state.targetUser);
    lines.push('');

    if (state.useCase) {
        lines.push('## 💡 Use Case');
        lines.push(state.useCase);
        lines.push('');
    }

    lines.push('## ❓ Questions for You');
    lines.push(`1. ${state.q1}`);
    lines.push(`2. ${state.q2}`);
    lines.push(`3. ${state.q3}`);
    lines.push('');

    lines.push('---');
    lines.push('*Built with [Feedback Friday Kit](https://github.com/Imadjalloul/feedback-friday-kit) — free structured feedback for makers*');

    return lines.join('\n');
}
