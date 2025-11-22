#!/usr/bin/env node

/**
 * Generate Full Chapter Content
 * Creates comprehensive, educational content for all chapters
 */

const fs = require('fs').promises;
const path = require('path');
const { chapterData } = require('./generate-content');

// Comprehensive content for each chapter
const fullChapterContent = {
    2: {
        overview: "Nature is full of amazing systems! From tiny ecosystems in a pond to the vast water cycle that covers our entire planet, natural systems show us how different parts work together. In this chapter, you'll discover how ecosystems function, how energy flows through food webs, and how water cycles through our environment.",
        introduction: "Look outside your window. What do you see? Trees, grass, maybe some birds or insects? All of these are part of natural systems—complex networks where living and non-living things interact. A forest is a system. A pond is a system. Even a single tree is a system! Understanding natural systems helps us understand our world and how to protect it.",
        sections: [
            {
                title: "Ecosystems as Systems",
                content: `An ecosystem is a perfect example of a system. It has many parts: plants, animals, soil, water, air, and sunlight. All these parts are connected. Plants use sunlight, water, and carbon dioxide to make food. Animals eat plants or other animals. When living things die, decomposers break them down and return nutrients to the soil. This cycle keeps the ecosystem healthy.

Think of a forest ecosystem. Trees provide homes for birds and squirrels. Their roots hold soil in place. Their leaves create shade for smaller plants. When leaves fall, they decompose and feed the soil. Everything is connected!`
            },
            {
                title: "Food Webs and Energy Flow",
                content: `Energy flows through ecosystems in a special way. It starts with the sun. Plants capture sunlight and turn it into food energy through photosynthesis. This makes them producers—they produce their own food.

Animals that eat plants are called primary consumers. Animals that eat other animals are secondary consumers. When any living thing dies, decomposers like bacteria and fungi break it down, returning nutrients to the soil.

This creates a food web—a system showing who eats whom. If one part of the food web changes, it affects everything else!`
            },
            {
                title: "The Water Cycle",
                content: `The water cycle is one of Earth's most important systems. Water moves continuously through our environment in a cycle:

1. **Evaporation**: The sun heats water in oceans, lakes, and rivers, turning it into water vapor that rises into the air.
2. **Condensation**: As water vapor rises, it cools and forms clouds.
3. **Precipitation**: Water falls back to Earth as rain, snow, or hail.
4. **Collection**: Water flows into rivers, lakes, and oceans, or soaks into the ground.

This cycle has been happening for billions of years! The same water molecules that filled ancient oceans might be in your glass of water today.`
            },
            {
                title: "Weather Systems",
                content: `Weather is another natural system. It involves temperature, air pressure, humidity, and wind—all working together. When warm air rises and cool air sinks, it creates wind. When water vapor in the air condenses, it forms clouds and precipitation.

Weather systems can be small, like a thunderstorm, or huge, like a hurricane that covers hundreds of miles. Meteorologists study these systems to predict weather and help keep people safe.`
            }
        ],
        realWorld: "Understanding natural systems helps us solve environmental problems. When scientists noticed that certain fish populations were declining, they studied the food web and discovered that pollution was affecting the entire ecosystem. By cleaning up the water and protecting key species, they helped restore the whole system. This is systems thinking in action!",
        reviewQuestions: [
            "What are the main parts of an ecosystem system?",
            "How does energy flow through a food web?",
            "Describe the four main steps of the water cycle.",
            "Why is it important to understand how natural systems work?",
            "Give an example of how one part of a natural system affects other parts."
        ],
        keyTerms: [
            { term: "Ecosystem", definition: "A community of living things and their environment, all working together as a system." },
            { term: "Food Web", definition: "A system showing how energy flows through an ecosystem as organisms eat each other." },
            { term: "Producer", definition: "An organism, usually a plant, that makes its own food using sunlight." },
            { term: "Consumer", definition: "An organism that eats other organisms for energy." },
            { term: "Decomposer", definition: "An organism that breaks down dead material and returns nutrients to the ecosystem." },
            { term: "Water Cycle", definition: "The continuous movement of water through Earth's systems—evaporation, condensation, precipitation, and collection." },
            { term: "Weather System", definition: "A system involving temperature, air pressure, humidity, and wind that creates weather patterns." }
        ],
        furtherExploration: "Try creating a model of a local ecosystem. Draw or build a food web showing the plants and animals in your area. Research how climate change is affecting natural systems. Visit a local park or nature center to observe systems in action!"
    },
    3: {
        overview: "Your body is an amazing collection of systems working together! Your heart pumps blood, your lungs breathe air, your stomach digests food, and your brain controls everything. In this chapter, you'll explore how these body systems function individually and how they work together to keep you alive and healthy.",
        introduction: "Take a deep breath. Feel your heart beat. Your body is doing incredible things right now! Your body contains many different systems, each with a specific job. But these systems don't work alone—they're all connected. When you run, your heart beats faster to pump more blood, your lungs work harder to get more oxygen, and your muscles use that oxygen to move. It's all one big system!",
        sections: [
            {
                title: "The Circulatory System",
                content: `Your circulatory system is like a transportation network. Your heart is the pump that moves blood through thousands of miles of blood vessels. Blood carries oxygen from your lungs to every cell in your body. It also carries nutrients from your digestive system and removes waste products.

The heart has four chambers that work together. The right side pumps blood to the lungs to pick up oxygen. The left side pumps oxygen-rich blood to the rest of your body. This happens continuously, day and night, without you even thinking about it!`
            },
            {
                title: "The Respiratory System",
                content: `Your respiratory system brings oxygen into your body and removes carbon dioxide. When you breathe in, air travels through your nose or mouth, down your windpipe, and into your lungs. Your lungs contain millions of tiny air sacs called alveoli. These sacs are surrounded by blood vessels.

Oxygen moves from the air sacs into your blood, and carbon dioxide moves from your blood into the air sacs to be breathed out. This gas exchange happens automatically with every breath you take!`
            },
            {
                title: "The Digestive System",
                content: `Your digestive system breaks down food into nutrients your body can use. It starts in your mouth, where teeth break food into smaller pieces and saliva begins chemical breakdown. Food travels down your esophagus to your stomach, where acids and enzymes break it down further.

Then it moves to your small intestine, where nutrients are absorbed into your bloodstream. The large intestine removes water and forms waste. This entire process takes hours and involves many organs working together!`
            },
            {
                title: "The Nervous System",
                content: `Your nervous system is like a communication network. Your brain is the control center, receiving information from all over your body through nerves. Your spinal cord carries messages between your brain and body.

When you touch something hot, nerves send a message to your brain instantly. Your brain sends a message back to move your hand away—all in a fraction of a second! Your nervous system controls everything from breathing to thinking to moving.`
            },
            {
                title: "System Interactions",
                content: `These body systems don't work alone—they're all connected! When you exercise:

- Your **nervous system** tells your muscles to move
- Your **respiratory system** breathes faster to get more oxygen
- Your **circulatory system** pumps blood faster to deliver oxygen
- Your **digestive system** provides nutrients for energy
- Your **nervous system** coordinates everything

Understanding how body systems work together helps doctors diagnose problems and keep people healthy!`
            }
        ],
        realWorld: "Doctors use systems thinking every day. When a patient has trouble breathing, they don't just look at the lungs. They check the heart (circulatory system), the brain (nervous system), and other systems because they're all connected. Medical technology like MRIs and CT scans help doctors see how different body systems are working together.",
        reviewQuestions: [
            "What is the main job of the circulatory system?",
            "How do the respiratory and circulatory systems work together?",
            "Describe the path food takes through the digestive system.",
            "Why is the nervous system called the 'control center'?",
            "Give an example of how multiple body systems work together."
        ],
        keyTerms: [
            { term: "Circulatory System", definition: "The system that transports blood, oxygen, and nutrients throughout the body using the heart and blood vessels." },
            { term: "Respiratory System", definition: "The system that brings oxygen into the body and removes carbon dioxide, including the lungs and airways." },
            { term: "Digestive System", definition: "The system that breaks down food into nutrients the body can use, including the stomach and intestines." },
            { term: "Nervous System", definition: "The control system of the body, including the brain, spinal cord, and nerves that send messages throughout the body." },
            { term: "System Interaction", definition: "How different body systems work together to keep the body functioning properly." }
        ],
        furtherExploration: "Research how exercise affects different body systems. Create a diagram showing how body systems interact. Interview a healthcare professional about how they use systems thinking in their work. Learn about medical devices that help body systems work better!"
    }
    // Additional chapters will be added...
};

async function generateFullChapterHTML(chapterNum) {
    const data = chapterData[chapterNum];
    const content = fullChapterContent[chapterNum];
    
    if (!data || !content) {
        // Fallback to basic generation
        const { generateChapterHTML } = require('./generate-content');
        return await generateChapterHTML(chapterNum);
    }
    
    const templatePath = path.join(__dirname, '../templates/chapter-template.html');
    let html = await fs.readFile(templatePath, 'utf-8');
    
    // Replace basic placeholders
    html = html.replace(/\[NUMBER\]/g, chapterNum);
    html = html.replace(/\[TITLE\]/g, data.title);
    
    // Build learning objectives
    const objectivesHTML = data.objectives.map(obj => `<li>${obj}</li>`).join('\n            ');
    html = html.replace(/<li>\[Objective 1\]<\/li>\s*<li>\[Objective 2\]<\/li>\s*<li>\[Objective 3\]<\/li>/s, objectivesHTML);
    
    // Replace content sections
    html = html.replace(/\[Brief overview of chapter content\]/g, content.overview);
    html = html.replace(/\[Introduction content\]/g, content.introduction);
    
    // Build main content sections
    let mainContentHTML = '';
    content.sections.forEach((section, index) => {
        mainContentHTML += `<h2>${section.title}</h2>\n        <p>${section.content}</p>\n        `;
        
        if (index === 0) {
            mainContentHTML += `<div class="callout">
            <strong>Think About It:</strong> Can you identify examples of ${data.title.toLowerCase()} in your own body? How do they work together?
        </div>\n        `;
        }
        
        if (index === Math.floor(content.sections.length / 2)) {
            mainContentHTML += `<div class="activity">
            <h3>Activity: Exploring ${data.title}</h3>
            <p>Work with a partner to create a diagram showing how ${content.sections[0].title.toLowerCase()} works. Label all the parts and show how they connect. Then present your diagram to the class.</p>
        </div>\n        `;
        }
    });
    
    html = html.replace(/<h2>\[Section Title\]<\/h2>\s*<p>\[Content\]<\/p>/s, mainContentHTML);
    
    // Replace other sections
    html = html.replace(/\[Real-world application content\]/g, content.realWorld);
    
    // Build review questions
    const questionsHTML = content.reviewQuestions.map((q, i) => `<li>${q}</li>`).join('\n            ');
    html = html.replace(/<li>\[Question 1\]<\/li>\s*<li>\[Question 2\]<\/li>\s*<li>\[Question 3\]<\/li>/s, questionsHTML);
    
    // Build key terms
    const termsHTML = content.keyTerms.map(kt => 
        `<dt><strong>${kt.term}</strong></dt>
            <dd>${kt.definition}</dd>`
    ).join('\n        ');
    html = html.replace(/<dt><strong>\[Term\]<\/strong><\/dt>\s*<dd>\[Definition\]<\/dd>/s, termsHTML);
    
    html = html.replace(/\[Additional resources and activities\]/g, content.furtherExploration);
    
    // Remove example image placeholder
    html = html.replace(/<figure>[\s\S]*?<\/figure>/g, '');
    
    return html;
}

async function generateAllChapters() {
    console.log('🚀 Generating all chapters...\n');
    
    for (let i = 2; i <= 12; i++) {
        try {
            console.log(`Generating Chapter ${i}...`);
            const html = await generateFullChapterHTML(i);
            
            const outputPath = path.join(__dirname, '../source', `chapter-${i}.html`);
            await fs.mkdir(path.dirname(outputPath), { recursive: true });
            await fs.writeFile(outputPath, html, 'utf-8');
            
            console.log(`  ✓ Chapter ${i} generated\n`);
        } catch (error) {
            console.error(`  ✗ Error generating Chapter ${i}: ${error.message}\n`);
        }
    }
    
    console.log('✅ All chapters generated!');
}

if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args[0] === '--all') {
        generateAllChapters();
    } else {
        const chapterNum = parseInt(args[0]) || 2;
        generateFullChapterHTML(chapterNum).then(html => {
            const outputPath = path.join(__dirname, '../source', `chapter-${chapterNum}.html`);
            return fs.writeFile(outputPath, html, 'utf-8');
        }).then(() => {
            console.log(`✓ Chapter ${chapterNum} generated`);
        }).catch(error => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
    }
}

module.exports = { generateFullChapterHTML, fullChapterContent };
