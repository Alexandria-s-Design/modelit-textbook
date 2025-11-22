#!/usr/bin/env node

/**
 * Content Generation Script
 * Generates chapter content using templates and AI assistance
 */

const fs = require('fs').promises;
const path = require('path');

// Chapter content templates and data
const chapterData = {
    2: {
        title: "Systems in Nature",
        ngss: ["MS-LS2-1", "MS-LS2-2", "MS-ESS2-4"],
        objectives: [
            "Identify different types of natural systems",
            "Explain how ecosystems function as systems",
            "Describe the water cycle as a system",
            "Understand how weather systems work"
        ],
        keyConcepts: [
            "Ecosystems as systems",
            "Food webs and energy flow",
            "Water cycle",
            "Weather systems"
        ]
    },
    3: {
        title: "Human Body Systems",
        ngss: ["MS-LS1-3", "MS-LS1-7"],
        objectives: [
            "Identify major body systems",
            "Explain how body systems work together",
            "Describe the function of each system",
            "Understand system interactions"
        ],
        keyConcepts: [
            "Circulatory system",
            "Respiratory system",
            "Digestive system",
            "Nervous system",
            "System interactions"
        ]
    },
    4: {
        title: "Engineering Systems",
        ngss: ["MS-ETS1-1", "MS-ETS1-2", "MS-ETS1-3"],
        objectives: [
            "Identify simple machines as systems",
            "Explain how engineering systems work",
            "Describe system design principles",
            "Understand technology systems"
        ],
        keyConcepts: [
            "Simple machines",
            "Complex engineering systems",
            "Technology systems",
            "System design principles"
        ]
    },
    5: {
        title: "Social Systems",
        ngss: ["MS-ESS3-4"],
        objectives: [
            "Identify types of social systems",
            "Explain how communities function as systems",
            "Describe economic systems",
            "Understand government systems"
        ],
        keyConcepts: [
            "Community systems",
            "Economic systems",
            "Government systems",
            "Social networks"
        ]
    },
    6: {
        title: "System Inputs and Outputs",
        ngss: ["MS-PS3-5", "MS-LS1-5"],
        objectives: [
            "Define inputs and outputs",
            "Explain energy flow in systems",
            "Describe material cycles",
            "Understand information systems"
        ],
        keyConcepts: [
            "Inputs and outputs",
            "Energy flow",
            "Material cycles",
            "Information systems"
        ]
    },
    7: {
        title: "Feedback Loops",
        ngss: ["MS-LS2-4", "MS-ESS3-4"],
        objectives: [
            "Define feedback loops",
            "Distinguish between positive and negative feedback",
            "Explain homeostasis",
            "Understand system regulation"
        ],
        keyConcepts: [
            "Positive feedback",
            "Negative feedback",
            "Homeostasis",
            "System regulation"
        ]
    },
    8: {
        title: "System Boundaries",
        ngss: ["MS-LS2-2", "MS-ESS2-2"],
        objectives: [
            "Define system boundaries",
            "Distinguish open vs. closed systems",
            "Explain system interactions",
            "Understand scale and scope"
        ],
        keyConcepts: [
            "System boundaries",
            "Open vs. closed systems",
            "System interactions",
            "Scale and scope"
        ]
    },
    9: {
        title: "Modeling Systems",
        ngss: ["MS-ETS1-4", "MS-PS1-1"],
        objectives: [
            "Understand different types of models",
            "Create physical models",
            "Use computer models",
            "Recognize model limitations"
        ],
        keyConcepts: [
            "Physical models",
            "Computer models",
            "Mathematical models",
            "Model limitations"
        ]
    },
    10: {
        title: "System Change Over Time",
        ngss: ["MS-LS4-1", "MS-ESS2-3"],
        objectives: [
            "Explain how systems evolve",
            "Describe adaptation in systems",
            "Understand succession",
            "Analyze long-term changes"
        ],
        keyConcepts: [
            "System evolution",
            "Adaptation",
            "Succession",
            "Long-term changes"
        ]
    },
    11: {
        title: "Complex Systems",
        ngss: ["MS-LS2-3", "MS-ESS3-3"],
        objectives: [
            "Define complex systems",
            "Explain emergent properties",
            "Understand unpredictable behavior",
            "Analyze system resilience"
        ],
        keyConcepts: [
            "Emergent properties",
            "Complex interactions",
            "Unpredictable behavior",
            "System resilience"
        ]
    },
    12: {
        title: "Systems Thinking in Action",
        ngss: ["MS-ETS1-1", "MS-ESS3-3", "MS-ESS3-4"],
        objectives: [
            "Apply systems thinking to problems",
            "Analyze environmental challenges",
            "Design engineering solutions",
            "Plan for future applications"
        ],
        keyConcepts: [
            "Problem-solving with systems thinking",
            "Environmental challenges",
            "Engineering solutions",
            "Future applications"
        ]
    }
};

async function generateChapterHTML(chapterNum) {
    const data = chapterData[chapterNum];
    if (!data) {
        throw new Error(`No data found for chapter ${chapterNum}`);
    }
    
    const templatePath = path.join(__dirname, '../templates/chapter-template.html');
    let template = await fs.readFile(templatePath, 'utf-8');
    
    // Replace template placeholders
    template = template.replace(/\[NUMBER\]/g, chapterNum);
    template = template.replace(/\[TITLE\]/g, data.title);
    
    // Generate content sections
    const overview = generateOverview(data);
    const introduction = generateIntroduction(data);
    const mainContent = generateMainContent(data);
    const realWorld = generateRealWorld(data);
    const reviewQuestions = generateReviewQuestions(data);
    const keyTerms = generateKeyTerms(data);
    const furtherExploration = generateFurtherExploration(data);
    
    // Replace content sections
    template = template.replace(/\[Brief overview of chapter content\]/g, overview);
    template = template.replace(/\[Introduction content\]/g, introduction);
    template = template.replace(/\[Section Title\]/g, data.keyConcepts[0]);
    template = template.replace(/\[Content\]/g, mainContent);
    template = template.replace(/\[Real-world application content\]/g, realWorld);
    template = template.replace(/\[Question 1\]/g, reviewQuestions[0]);
    template = template.replace(/\[Question 2\]/g, reviewQuestions[1]);
    template = template.replace(/\[Question 3\]/g, reviewQuestions[2]);
    template = template.replace(/\[Term\]/g, data.keyConcepts[0]);
    template = template.replace(/\[Definition\]/g, `A key concept related to ${data.title.toLowerCase()}`);
    template = template.replace(/\[Additional resources and activities\]/g, furtherExploration);
    
    // Replace objectives
    const objectivesHTML = data.objectives.map(obj => `<li>${obj}</li>`).join('\n                ');
    template = template.replace(/<li>\[Objective 1\]<\/li>\s*<li>\[Objective 2\]<\/li>\s*<li>\[Objective 3\]<\/li>/s, objectivesHTML);
    
    return template;
}

function generateOverview(data) {
    return `In this chapter, you will explore ${data.title.toLowerCase()}. You'll learn about ${data.keyConcepts.slice(0, 2).join(' and ')}, and discover how these systems work together to create complex natural and human-made structures.`;
}

function generateIntroduction(data) {
    return `Have you ever wondered how ${data.title.toLowerCase()} work? Every day, you interact with many different systems without even realizing it. ${data.title} are all around us, from the smallest cells in your body to the largest ecosystems on Earth. In this chapter, we'll explore how these systems function, what makes them work, and why understanding systems is so important.`;
}

function generateMainContent(data) {
    let content = `<p>${data.title} are fascinating examples of how different parts work together to create something greater than the sum of its parts. Let's explore the key concepts:</p>`;
    
    data.keyConcepts.forEach((concept, index) => {
        content += `<h3>${concept}</h3>`;
        content += `<p>${concept} is an important aspect of systems thinking. Understanding how ${concept.toLowerCase()} works helps us see the bigger picture of how systems function and interact with each other.</p>`;
        
        if (index === 0) {
            content += `<div class="callout">
            <strong>Think About It:</strong> Can you think of an example of ${concept.toLowerCase()} in your daily life? How do the parts work together?
        </div>`;
        }
    });
    
    content += `<div class="activity">
            <h3>Activity: Exploring ${data.title}</h3>
            <p>Work with a partner to identify three examples of ${data.title.toLowerCase()} in your community. For each example, list the parts, how they connect, and what the system produces or does.</p>
        </div>`;
    
    return content;
}

function generateRealWorld(data) {
    return `Understanding ${data.title.toLowerCase()} helps us solve real-world problems. Scientists and engineers use systems thinking to design solutions for challenges like climate change, healthcare, and technology. By seeing how all the parts connect, we can create better solutions that work for everyone.`;
}

function generateReviewQuestions(data) {
    return [
        `What are the main components of ${data.title.toLowerCase()}?`,
        `How do ${data.keyConcepts[0].toLowerCase()} and ${data.keyConcepts[1] ? data.keyConcepts[1].toLowerCase() : 'other components'} work together?`,
        `Give an example of ${data.title.toLowerCase()} from your own experience.`
    ];
}

function generateKeyTerms(data) {
    return data.keyConcepts.map(term => ({
        term: term,
        definition: `${term} is a key concept in understanding ${data.title.toLowerCase()}.`
    }));
}

function generateFurtherExploration(data) {
    return `Want to learn more? Research how ${data.title.toLowerCase()} are used in different fields. Try creating your own model of a system, or interview someone who works with ${data.title.toLowerCase()} in their job.`;
}

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node generate-content.js <chapter-number>');
        console.log('Example: node generate-content.js 2');
        process.exit(1);
    }
    
    const chapterNum = parseInt(args[0]);
    
    if (isNaN(chapterNum) || chapterNum < 2 || chapterNum > 12) {
        console.error('Invalid chapter number. Must be between 2 and 12.');
        process.exit(1);
    }
    
    try {
        console.log(`Generating content for Chapter ${chapterNum}...`);
        const html = await generateChapterHTML(chapterNum);
        
        const outputPath = path.join(__dirname, '../source', `chapter-${chapterNum}.html`);
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, html, 'utf-8');
        
        console.log(`✓ Content generated: ${outputPath}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { generateChapterHTML, chapterData };
