import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../../Materialy_do_egzaminu');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/content.json');
const PUBLIC_IMAGES_DIR = path.resolve(__dirname, '../public/images');

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure public images directory exists
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

async function generateContent() {
    console.log('Scanning files in:', SOURCE_DIR);

    try {
        const files = fs.readdirSync(SOURCE_DIR);
        const mdFiles = files.filter(file => file.endsWith('.md') && !file.startsWith('.'));

        const content = [];

        for (const file of mdFiles) {
            const filePath = path.join(SOURCE_DIR, file);
            let fileContent = fs.readFileSync(filePath, 'utf-8');

            // Replace image paths to be absolute from public root
            // Assuming images are in 'images/' folder in source and referenced as such
            // We want 'images/foo.png' -> '/images/foo.png'
            // But we need to be careful not to replace http/https links if present (unlikely for local images)
            // Regex to match markdown image syntax ![alt](path)
            fileContent = fileContent.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, distinctPath) => {
                if (distinctPath.startsWith('http') || distinctPath.startsWith('/')) {
                    return match;
                }
                // Check if path starts with images/
                if (distinctPath.startsWith('images/')) {
                    return `![${alt}](/${distinctPath})`;
                }
                return match;
            });

            const stats = fs.statSync(filePath);

            content.push({
                id: file, // Use filename as ID for simplicity
                title: file.replace('.md', ''),
                content: fileContent,
                lastModified: stats.mtime
            });
        }

        // Sort by filename (which usually has numbers 01, 02 etc)
        content.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));
        console.log(`Generated content.json with ${content.length} files.`);

        // Copy images
        const sourceImagesDir = path.join(SOURCE_DIR, 'images');
        if (fs.existsSync(sourceImagesDir)) {
            console.log('Copying images...');
            // Recursive copy function or just simple copy for now assuming flat structure
            // fs.cpSync was added in Node 16.7.0
            fs.cpSync(sourceImagesDir, PUBLIC_IMAGES_DIR, { recursive: true });
            console.log('Images copied successfully.');
        } else {
            console.log('No images directory found.');
        }

    } catch (error) {
        console.error('Error generating content:', error);
        process.exit(1);
    }
}

generateContent();
