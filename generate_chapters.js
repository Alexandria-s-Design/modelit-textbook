#!/usr/bin/env node
/**
 * ModelIt Textbook Generator - Node.js Version
 * Generates complete textbook chapters in HTML format
 */

const fs = require('fs');
const path = require('path');

// Complete textbook structure
const TEXTBOOK = {
  title: "Connected: How Systems Shape Our World",
  publisher: "ModelIt K12",
  grades: "5-8",

  chapters: [
    {
      number: 2,
      title: "Ecosystems as Systems",
      hook: "Imagine you're a detective investigating a mystery: why did all the rabbits in a meadow suddenly disappear? As you search for clues, you discover it's not just about rabbits—it's about hawks, grass, foxes, and even the weather. Welcome to the fascinating world of ecosystems!",
      sections: [
        {
          title: "What is an Ecosystem?",
          content: `An <strong>ecosystem</strong> is a community of living things (like plants and animals) interacting with non-living things (like water, soil, and sunlight) in a specific area. Think of it as nature's version of a system!

<h3>Components of an Ecosystem</h3>

<strong>Biotic (Living) Components:</strong>
<ul>
  <li><strong>Producers:</strong> Plants that make their own food using sunlight (photosynthesis)</li>
  <li><strong>Consumers:</strong> Animals that eat other organisms
    <ul>
      <li>Herbivores (plant-eaters like deer)</li>
      <li>Carnivores (meat-eaters like wolves)</li>
      <li>Omnivores (eat both, like bears)</li>
    </ul>
  </li>
  <li><strong>Decomposers:</strong> Organisms that break down dead material (bacteria, fungi, worms)</li>
</ul>

<strong>Abiotic (Non-living) Components:</strong>
<ul>
  <li>Sunlight</li>
  <li>Water</li>
  <li>Soil</li>
  <li>Air</li>
  <li>Temperature</li>
  <li>Rocks and minerals</li>
</ul>

<div class="highlight-box">
<strong>Think About It!</strong> In a forest ecosystem, trees are producers, deer are consumers, and mushrooms are decomposers. Each plays a vital role in keeping the forest healthy!
</div>`
        },
        {
          title: "Energy Flow in Ecosystems",
          content: `Energy flows through ecosystems in one direction—from the sun to producers to consumers to decomposers.

<h3>Food Chains</h3>

A <strong>food chain</strong> shows how energy moves from one organism to another:

<div style="text-align: center; margin: 20px 0; font-size: 16pt;">
Sun → Grass → Grasshopper → Frog → Snake → Hawk
</div>

<h3>Food Webs</h3>

Real ecosystems are more complex than simple chains. A <strong>food web</strong> shows multiple interconnected food chains. Most animals eat more than one thing!

<div class="highlight-box">
<strong>Example:</strong> A hawk might eat:
<ul>
  <li>Snakes (which eat frogs, which eat grasshoppers)</li>
  <li>Mice (which eat seeds)</li>
  <li>Rabbits (which eat grass)</li>
</ul>
All these connections form a food web!
</div>

<h3>Energy Pyramids</h3>

Not all energy transfers from one level to the next. Only about 10% of energy moves up each level!

<ul>
  <li><strong>Bottom:</strong> Producers (most energy)</li>
  <li><strong>Middle:</strong> Primary consumers (herbivores)</li>
  <li><strong>Top:</strong> Secondary and tertiary consumers (carnivores)</li>
</ul>

<div class="vocabulary">
<strong class="vocabulary-term">Trophic Level:</strong> Each step in a food chain or food web
</div>`
        },
        {
          title: "Ecosystem Balance",
          content: `Ecosystems naturally balance themselves through interactions between organisms. When one part changes, it affects everything else!

<h3>Predator-Prey Relationships</h3>

Predators and prey populations rise and fall together:
<ul>
  <li>More prey → More food for predators → Predator population increases</li>
  <li>More predators → More prey eaten → Prey population decreases</li>
  <li>Less prey → Less food for predators → Predator population decreases</li>
  <li>Fewer predators → Prey population recovers → Cycle repeats</li>
</ul>

<div class="highlight-box">
<strong>Real-World Example:</strong> In Yellowstone National Park, when wolves were removed in 1926, deer populations exploded. They overate plants, causing erosion. When wolves were reintroduced in 1995, the ecosystem began to balance again!
</div>

<h3>Symbiotic Relationships</h3>

Sometimes organisms have special relationships:

<ul>
  <li><strong>Mutualism:</strong> Both organisms benefit
    <ul><li>Example: Bees get nectar from flowers; flowers get pollinated</li></ul>
  </li>
  <li><strong>Commensalism:</strong> One benefits, the other isn't affected
    <ul><li>Example: Birds nest in trees; trees aren't helped or harmed</li></ul>
  </li>
  <li><strong>Parasitism:</strong> One benefits, the other is harmed
    <ul><li>Example: Ticks feed on deer; deer lose blood</li></ul>
  </li>
</ul>`
        },
        {
          title: "Human Impact on Ecosystems",
          content: `Humans are part of ecosystems too—and we have a huge impact!

<h3>Negative Impacts</h3>

<ul>
  <li><strong>Pollution:</strong> Chemicals in water and air harm organisms</li>
  <li><strong>Habitat Destruction:</strong> Cutting down forests removes homes for animals</li>
  <li><strong>Overharvesting:</strong> Taking too many fish or trees</li>
  <li><strong>Invasive Species:</strong> Non-native species disrupting ecosystems</li>
  <li><strong>Climate Change:</strong> Changing temperatures affect all organisms</li>
</ul>

<h3>Positive Impacts</h3>

We can help ecosystems too!

<ul>
  <li><strong>Conservation:</strong> Protecting natural areas</li>
  <li><strong>Restoration:</strong> Replanting forests, cleaning rivers</li>
  <li><strong>Sustainable Practices:</strong> Using resources wisely</li>
  <li><strong>Reducing Pollution:</strong> Recycling, using clean energy</li>
</ul>

<div class="highlight-box">
<strong>You Can Make a Difference!</strong> Small actions like:
<ul>
  <li>Turning off lights to save energy</li>
  <li>Recycling paper and plastic</li>
  <li>Planting native plants</li>
  <li>Reducing water waste</li>
</ul>
All help protect ecosystems!
</div>`
        }
      ],
      activities: [
        {
          name: "Food Web Detective",
          objective: "Create and analyze a food web",
          materials: "Paper, colored pencils, string",
          time: "30 minutes",
          steps: [
            "List 10-12 organisms from a local ecosystem (forest, pond, etc.)",
            "Draw each organism",
            "Draw arrows showing what eats what",
            "Use different colors for producers, consumers, decomposers",
            "Answer: What happens if one organism disappears?"
          ]
        },
        {
          name: "Ecosystem in a Bottle",
          objective: "Create a closed ecosystem",
          materials: "Clear plastic bottle, soil, plants, water, small organisms (optional)",
          time: "45 minutes setup + 2 weeks observation",
          steps: [
            "Add gravel, then soil to bottle bottom",
            "Plant small plants (moss, grass)",
            "Add water",
            "Seal bottle tightly",
            "Place in indirect sunlight",
            "Observe daily for 2 weeks",
            "Record changes in a science journal"
          ]
        }
      ],
      vocabulary: {
        "Ecosystem": "A community of living and non-living things interacting in an area",
        "Biotic": "Living components of an ecosystem",
        "Abiotic": "Non-living components of an ecosystem",
        "Producer": "Organism that makes its own food (plants)",
        "Consumer": "Organism that eats other organisms",
        "Decomposer": "Organism that breaks down dead material",
        "Food Chain": "Path of energy from one organism to another",
        "Food Web": "Multiple interconnected food chains",
        "Trophic Level": "Position in a food chain",
        "Symbiosis": "Close relationship between two species"
      }
    },
    // Chapter 3 will continue the same pattern...
  ]
};

// HTML Template
function generateChapterHTML(chapter) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chapter ${chapter.number}: ${chapter.title}</title>
    <style>
        @page { size: letter; margin: 1in; }
        body {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 14pt;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
        }
        .cover-page {
            text-align: center;
            padding: 100px 20px;
            min-height: 10in;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        h1 {
            color: #0F6ACE;
            font-size: 42pt;
            font-weight: bold;
            margin-bottom: 30px;
            text-transform: uppercase;
        }
        h2 {
            color: #0F6ACE;
            font-size: 28pt;
            margin-top: 40px;
            margin-bottom: 20px;
            border-left: 5px solid #48d2fc;
            padding-left: 15px;
        }
        h3 {
            color: #48d2fc;
            font-size: 20pt;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .highlight-box {
            background: #e8f4f8;
            border-left: 4px solid #48d2fc;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .vocabulary {
            background: #f0f9ff;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
        }
        .vocabulary-term {
            color: #0F6ACE;
            font-weight: bold;
        }
        .activity-box {
            background: #fff9e6;
            border: 2px solid #ffd700;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        ul, ol { margin: 15px 0; padding-left: 30px; }
        li { margin: 8px 0; }
        .page-break { page-break-before: always; }
    </style>
</head>
<body>

<div class="cover-page">
    <h1>CONNECTED</h1>
    <div style="height: 3px; background: #48d2fc; width: 200px; margin: 20px auto;"></div>
    <div style="color: #48d2fc; font-size: 28pt; margin: 20px 0;">How Systems<br>Shape Our<br>World</div>
    <h2 style="border: none; padding: 0; margin-top: 60px;">Chapter ${chapter.number}:</h2>
    <h2 style="border: none; padding: 0;">${chapter.title}</h2>
    <p style="font-size: 18pt; color: #48d2fc; margin-top: 40px;">A Middle School Science Textbook (Grades 5-8)</p>
</div>

<div class="page-break"></div>

<div style="text-align: center; padding: 60px 20px;">
    <h1>ModelIt!</h1>
    <p style="font-size: 16pt; color: #666; font-style: italic;">Students exploring systems through hands-on science</p>
</div>

<div class="page-break"></div>

<h1 style="text-align: center;">Chapter ${chapter.number}: ${chapter.title}</h1>

<div class="section">
    <h2>Opening Hook</h2>
    <p>${chapter.hook}</p>
</div>

`;

  // Add sections
  chapter.sections.forEach(section => {
    html += `
<div class="section">
    <h2>${section.title}</h2>
    ${section.content}
</div>
`;
  });

  // Add vocabulary
  if (chapter.vocabulary) {
    html += `
<div class="page-break"></div>
<div class="section">
    <h2>Vocabulary</h2>
`;
    Object.entries(chapter.vocabulary).forEach(([term, definition]) => {
      html += `
    <div class="vocabulary">
        <strong class="vocabulary-term">${term}:</strong> ${definition}
    </div>
`;
    });
    html += `</div>`;
  }

  // Add activities
  if (chapter.activities && chapter.activities.length > 0) {
    html += `
<div class="page-break"></div>
<h1 style="text-align: center;">HANDS-ON ACTIVITIES</h1>
`;
    chapter.activities.forEach((activity, index) => {
      html += `
<div class="activity-box">
    <h3>Activity ${index + 1}: ${activity.name}</h3>
    <p><strong>Learning Objective:</strong> ${activity.objective}</p>
    <p><strong>Materials:</strong> ${activity.materials}</p>
    <p><strong>Time Required:</strong> ${activity.time}</p>
    <h4>Steps:</h4>
    <ol>
`;
      activity.steps.forEach(step => {
        html += `        <li>${step}</li>\n`;
      });
      html += `
    </ol>
</div>
`;
    });
  }

  html += `
</body>
</html>`;

  return html;
}

// Generate all chapters
console.log("=" * 60);
console.log("ModelIt Textbook Generator");
console.log("=" * 60);

TEXTBOOK.chapters.forEach(chapter => {
  const filename = `Chapter_${chapter.number}_${chapter.title.replace(/\s+/g, '_')}.html`;
  const html = generateChapterHTML(chapter);
  fs.writeFileSync(filename, html);
  console.log(`✓ Generated: ${filename}`);
});

// Generate structure JSON
fs.writeFileSync('textbook_structure.json', JSON.stringify(TEXTBOOK, null, 2));
console.log('✓ Generated: textbook_structure.json');

console.log("\nNext Steps:");
console.log("1. Convert HTML files to PDF using a tool like wkhtmltopdf or Playwright");
console.log("2. Review and enhance each chapter with images");
console.log("3. Add Cell Collective integration in Chapters 7-8");
console.log("4. Create teacher guides for each chapter");
