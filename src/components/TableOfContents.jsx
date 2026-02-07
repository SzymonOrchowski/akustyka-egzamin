import React, { useEffect, useState } from 'react';

const TableOfContents = ({ content }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        // Parse headings from markdown content
        const lines = content.split('\n');
        const extractedHeadings = [];

        // Simple regex for ATX headings (# Heading)
        // We only care about h2 and h3 for TOC to avoid clutter, maybe h4 too if needed.
        // But user wants "spis treści", usually that implies structure.
        // Let's grab h1-h3 (h1 is usually title, maybe skip h1 if it's the file title)

        let inCodeBlock = false;

        lines.forEach((line, index) => {
            // Skip code blocks
            if (line.trim().startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                return;
            }
            if (inCodeBlock) return;

            const match = line.match(/^(#{1,3})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2].replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, ''); // Clean basic formatting
                const id = `heading-${index}`; // Simple ID based on line index, robust enough for static content

                extractedHeadings.push({ id, text, level, lineIndex: index });
            }
        });

        setHeadings(extractedHeadings);
    }, [content]);

    // Scroll spy or just click handler
    const handleClick = (id, lineIndex) => {
        // We need to scroll to the element. 
        // Since we don't have real IDs on the rendered elements easily without rehype-slug,
        // we might stick to a simpler approach: 
        // 1. Add rehype-slug to MarkdownViewer to get auto-generated IDs.
        // 2. OR match text.
        // Let's switch MarkdownViewer to use `rehype-slug` for robust linking.
        // For now, let's assume we will add `rehype-slug`.
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveId(id);
        }
    };

    if (headings.length === 0) return null;

    return (
        <nav className="p-4 text-sm max-h-[calc(100vh-2rem)] overflow-y-auto sticky top-4">
            <h3 className="font-bold text-gray-400 mb-4 uppercase text-xs tracking-wider">Spis treści</h3>
            <ul className="space-y-2">
                {headings.map(heading => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                    >
                        <a
                            href={`#${heading.text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}
                            onClick={(e) => {
                                e.preventDefault();
                                // We need a way to link to the actual content. 
                                // Best way: Use rehype-slug in MarkdownViewer so headers get IDs based on text.
                                const slug = heading.text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                const el = document.getElementById(slug);
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                    setActiveId(slug); // ID logic needs to match rehype-slug
                                }
                            }}
                            className={`block text-gray-500 hover:text-blue-400 transition-colors line-clamp-2 ${activeId === heading.text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') ? 'text-blue-400' : ''}`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
