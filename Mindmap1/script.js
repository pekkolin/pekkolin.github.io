document.addEventListener('DOMContentLoaded', () => {
    mermaid.initialize({ startOnLoad: false });

    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const markdownInput = document.getElementById('markdownInput');
    const mindmapContainer = document.getElementById('mindmapContainer');

    generateBtn.addEventListener('click', () => {
        const markdownText = markdownInput.value;

        // 转换Markdown为Mermaid格式
        const mermaidDiagram = convertMarkdownToMermaid(markdownText);

        // 渲染Mermaid图表
        mindmapContainer.innerHTML = `<div class="mermaid">${mermaidDiagram}</div>`;
        mermaid.init();

        // 显示下载按钮
        downloadBtn.style.display = 'inline-block';
    });

    downloadBtn.addEventListener('click', () => {
        const svg = mindmapContainer.querySelector('svg');
        if (svg) {
            const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mindmap.svg';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('请先生成思维导图。');
        }
    });

    function convertMarkdownToMermaid(markdown) {
        // 基础的Markdown到Mermaid的转换
        // 这里只是一个简单的示例，实际实现可能需要更复杂的解析
        return `graph TD\n${markdown.split('\n').map(line => {
            const [parent, child] = line.split(' - ');
            return `${parent} --> ${child}`;
        }).join('\n')}`;
    }
});
