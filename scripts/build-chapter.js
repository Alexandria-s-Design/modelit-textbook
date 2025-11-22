#!/usr/bin/env node

/**
 * Build Chapter Script
 * Generates PDF from HTML source for a specific chapter
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function buildChapterPDF(chapterNumber, chapterTitle) {
    console.log(`\n📚 Building Chapter ${chapterNumber}: ${chapterTitle}`);
    
    const sourcePath = path.join(__dirname, '../source', `chapter-${chapterNumber}.html`);
    const outputPath = path.join(__dirname, '../chapters', `Chapter_${chapterNumber}_${chapterTitle.replace(/\s+/g, '_')}.pdf`);
    
    try {
        // Check if source file exists
        await fs.access(sourcePath);
        
        // Read HTML content
        const htmlContent = await fs.readFile(sourcePath, 'utf-8');
        
        console.log(`  ✓ Source file found: ${sourcePath}`);
        
        // Launch browser
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        
        // Set content with wait for network idle
        await page.setContent(htmlContent, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Wait a bit for any images to load
        await page.waitForTimeout(2000);
        
        // Generate PDF with print settings
        await page.pdf({
            path: outputPath,
            format: 'Letter',
            margin: {
                top: '72px',    // 1 inch
                right: '54px',  // 0.75 inch
                bottom: '72px', // 1 inch
                left: '54px'    // 0.75 inch
            },
            printBackground: true,
            preferCSSPageSize: true
        });
        
        await browser.close();
        
        // Check file size
        const stats = await fs.stat(outputPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        console.log(`  ✓ PDF generated: ${outputPath}`);
        console.log(`  ✓ File size: ${fileSizeMB} MB`);
        
        return { success: true, path: outputPath, size: fileSizeMB };
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`  ✗ Source file not found: ${sourcePath}`);
        } else {
            console.error(`  ✗ Error building PDF: ${error.message}`);
        }
        return { success: false, error: error.message };
    }
}

async function buildAllChapters() {
    const chapters = [
        { num: 2, title: 'Systems_in_Nature' },
        { num: 3, title: 'Human_Body_Systems' },
        { num: 4, title: 'Engineering_Systems' },
        { num: 5, title: 'Social_Systems' },
        { num: 6, title: 'System_Inputs_and_Outputs' },
        { num: 7, title: 'Feedback_Loops' },
        { num: 8, title: 'System_Boundaries' },
        { num: 9, title: 'Modeling_Systems' },
        { num: 10, title: 'System_Change_Over_Time' },
        { num: 11, title: 'Complex_Systems' },
        { num: 12, title: 'Systems_Thinking_in_Action' }
    ];
    
    console.log('🚀 Building all chapters...\n');
    
    const results = [];
    for (const chapter of chapters) {
        const result = await buildChapterPDF(chapter.num, chapter.title);
        results.push({ chapter: chapter.num, ...result });
    }
    
    console.log('\n📊 Build Summary:');
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(`  ✓ Successful: ${successful}`);
    console.log(`  ✗ Failed: ${failed}`);
    
    return results;
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage:');
        console.log('  node build-chapter.js <chapter-number>  - Build specific chapter');
        console.log('  node build-chapter.js --all             - Build all chapters');
        process.exit(1);
    }
    
    if (args[0] === '--all') {
        await buildAllChapters();
    } else {
        const chapterNum = parseInt(args[0]);
        if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 12) {
            console.error('Invalid chapter number. Must be between 1 and 12.');
            process.exit(1);
        }
        
        // Get chapter title from roadmap or use default
        const chapterTitle = `Chapter_${chapterNum}`;
        await buildChapterPDF(chapterNum, chapterTitle);
    }
}

if (require.main === module) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { buildChapterPDF, buildAllChapters };
