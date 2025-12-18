#!/usr/bin/env python3
"""
ModelIt Textbook Generator
Generates professional K-12 science textbook chapters on systems thinking and Cell Collective
"""

import os
import json
import base64
from pathlib import Path

# Chapter structure for the complete textbook
TEXTBOOK_STRUCTURE = {
    "title": "Connected: How Systems Shape Our World",
    "subtitle": "A Middle School Science Textbook (Grades 5-8)",
    "publisher": "ModelIt K12",
    "chapters": [
        {
            "number": 1,
            "title": "Introduction to Systems Thinking",
            "status": "COMPLETE",
            "sections": [
                "What is a System?",
                "Components and Relationships",
                "Cause and Effect",
                "Systems Thinking in Action"
            ]
        },
        {
            "number": 2,
            "title": "Ecosystems as Systems",
            "sections": [
                "Parts of an Ecosystem",
                "Energy Flow in Ecosystems",
                "Food Webs and Food Chains",
                "Ecosystem Balance",
                "Human Impact on Ecosystems"
            ],
            "ngss": ["MS-LS2-1", "MS-LS2-2", "MS-LS2-3"]
        },
        {
            "number": 3,
            "title": "Cells: The Building Blocks of Life",
            "sections": [
                "Cell Structure and Function",
                "Organelles as System Components",
                "Cell Processes",
                "Cells Working Together",
                "Introduction to Cell Collective"
            ],
            "ngss": ["MS-LS1-1", "MS-LS1-2", "MS-LS1-3"]
        },
        {
            "number": 4,
            "title": "Energy in Living Systems",
            "sections": [
                "Energy Transfer in Systems",
                "Photosynthesis",
                "Cellular Respiration",
                "Energy Pyramids",
                "Modeling Energy Flow"
            ],
            "ngss": ["MS-LS1-6", "MS-LS1-7", "MS-LS2-3"]
        },
        {
            "number": 5,
            "title": "Matter and Nutrient Cycling",
            "sections": [
                "Matter Cannot Be Created or Destroyed",
                "The Water Cycle",
                "The Carbon Cycle",
                "The Nitrogen Cycle",
                "Modeling Cycles in Cell Collective"
            ],
            "ngss": ["MS-LS2-3", "MS-PS1-5"]
        },
        {
            "number": 6,
            "title": "Human Body Systems",
            "sections": [
                "Overview of Body Systems",
                "Circulatory System",
                "Respiratory System",
                "Digestive System",
                "Systems Working Together"
            ],
            "ngss": ["MS-LS1-3", "MS-LS1-8"]
        },
        {
            "number": 7,
            "title": "Exploring Cell Collective",
            "sections": [
                "What is Cell Collective?",
                "Navigating the Platform",
                "Interactive Models",
                "Running Simulations",
                "Analyzing Results"
            ]
        },
        {
            "number": 8,
            "title": "Building Your Own Models",
            "sections": [
                "Planning Your Model",
                "Identifying Components",
                "Creating Relationships",
                "Testing and Refining",
                "Sharing Your Work"
            ]
        },
        {
            "number": 9,
            "title": "Disease and Immunity as Systems",
            "sections": [
                "How Disease Spreads",
                "The Immune System",
                "Vaccines and Public Health",
                "Modeling Disease Spread",
                "Using Cell Collective for Health Science"
            ],
            "ngss": ["MS-LS1-8"]
        },
        {
            "number": 10,
            "title": "Climate and Earth Systems",
            "sections": [
                "Earth as a System",
                "Atmosphere and Climate",
                "Human Impact on Climate",
                "Feedback Loops in Climate",
                "Modeling Climate Change"
            ],
            "ngss": ["MS-ESS3-3", "MS-ESS3-4", "MS-ESS3-5"]
        },
        {
            "number": 11,
            "title": "Systems in Technology",
            "sections": [
                "Engineered Systems",
                "Computers as Systems",
                "Transportation Systems",
                "Communication Networks",
                "Design Thinking and Systems"
            ],
            "ngss": ["MS-ETS1-1", "MS-ETS1-2"]
        },
        {
            "number": 12,
            "title": "You as a Systems Thinker",
            "sections": [
                "Applying Systems Thinking",
                "Problem-Solving with Systems",
                "Career Connections",
                "Your Final Project",
                "Next Steps in Systems Science"
            ]
        }
    ]
}

# HTML template for textbook chapters (matching Chapter 1 style)
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        @page {{
            size: letter;
            margin: 1in;
        }}

        body {{
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 14pt;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
        }}

        .cover-page {{
            text-align: center;
            padding: 100px 20px;
            min-height: 10in;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }}

        h1 {{
            color: #0F6ACE;
            font-size: 42pt;
            font-weight: bold;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }}

        .chapter-subtitle {{
            color: #48d2fc;
            font-size: 28pt;
            margin: 20px 0;
            font-weight: 300;
        }}

        h2 {{
            color: #0F6ACE;
            font-size: 28pt;
            margin-top: 40px;
            margin-bottom: 20px;
            border-left: 5px solid #48d2fc;
            padding-left: 15px;
        }}

        h3 {{
            color: #48d2fc;
            font-size: 20pt;
            margin-top: 30px;
            margin-bottom: 15px;
        }}

        .section {{
            margin-bottom: 30px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}

        .highlight-box {{
            background: #e8f4f8;
            border-left: 4px solid #48d2fc;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }}

        .vocabulary {{
            background: #f0f9ff;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
        }}

        .vocabulary-term {{
            color: #0F6ACE;
            font-weight: bold;
        }}

        .activity-box {{
            background: #fff9e6;
            border: 2px solid #ffd700;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }}

        .learning-objective {{
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 15px 0;
            font-style: italic;
        }}

        ul, ol {{
            margin: 15px 0;
            padding-left: 30px;
        }}

        li {{
            margin: 8px 0;
        }}

        .image-container {{
            text-align: center;
            margin: 30px 0;
        }}

        .image-container img {{
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }}

        .caption {{
            font-style: italic;
            color: #48d2fc;
            margin-top: 10px;
            font-size: 12pt;
        }}

        .page-break {{
            page-break-before: always;
        }}

        .summary-box {{
            background: #f5f5f5;
            border: 2px solid #0F6ACE;
            padding: 20px;
            margin: 30px 0;
            border-radius: 8px;
        }}

        .discussion-questions {{
            background: #fff;
            border-left: 4px solid #4caf50;
            padding: 20px;
            margin: 20px 0;
        }}
    </style>
</head>
<body>
{content}
</body>
</html>
"""

def generate_chapter_content(chapter_info):
    """Generate HTML content for a chapter"""
    content = f"""
    <div class="cover-page">
        <h1>CONNECTED</h1>
        <div style="height: 3px; background: #48d2fc; width: 200px; margin: 20px auto;"></div>
        <div class="chapter-subtitle">How Systems<br>Shape Our<br>World</div>
        <h2 style="border: none; padding: 0; margin-top: 60px;">Chapter {chapter_info['number']}:</h2>
        <h2 style="border: none; padding: 0;">{chapter_info['title']}</h2>
        <p style="font-size: 18pt; color: #48d2fc; margin-top: 40px;">A Middle School Science Textbook (Grades 5-8)</p>
    </div>

    <div class="page-break"></div>
    """

    # Add ModelIt branding page
    content += """
    <div style="text-align: center; padding: 60px 20px;">
        <h1 style="color: #0F6ACE;">ModelIt!</h1>
        <p style="font-size: 16pt; color: #666; font-style: italic; margin: 30px 0;">
        Students exploring systems through hands-on science
        </p>
    </div>

    <div class="page-break"></div>
    """

    return content

def save_chapter_structure():
    """Save the textbook structure to JSON"""
    output_path = Path("textbook_structure.json")
    with open(output_path, 'w') as f:
        json.dump(TEXTBOOK_STRUCTURE, f, indent=2)
    print(f"✓ Textbook structure saved to {output_path}")

def create_table_of_contents():
    """Generate a comprehensive table of contents"""
    toc_html = """
    <div class="section">
        <h1>Table of Contents</h1>
        <div style="margin-top: 30px;">
    """

    for chapter in TEXTBOOK_STRUCTURE['chapters']:
        toc_html += f"""
        <div style="margin: 20px 0;">
            <h3>Chapter {chapter['number']}: {chapter['title']}</h3>
            <ul>
        """
        for section in chapter.get('sections', []):
            toc_html += f"<li>{section}</li>\n"
        toc_html += "</ul></div>"

    toc_html += """
        </div>
    </div>
    """

    full_html = HTML_TEMPLATE.format(
        title="Table of Contents - Connected: How Systems Shape Our World",
        content=toc_html
    )

    with open("table_of_contents.html", 'w') as f:
        f.write(full_html)

    print("✓ Table of Contents created")

def create_teachers_guide():
    """Generate comprehensive teacher's guide"""
    guide_content = """
    <div class="section">
        <h1>Teacher's Guide</h1>
        <h2>Welcome, Educators!</h2>

        <div class="learning-objective">
            <strong>Purpose of this Guide:</strong> This comprehensive teacher's guide provides
            lesson plans, pacing guides, assessment strategies, and differentiation tips for
            teaching systems thinking to middle school students.
        </div>

        <h2>Course Overview</h2>
        <div class="section">
            <h3>Target Audience</h3>
            <ul>
                <li>Grades 5-8 (Middle School)</li>
                <li>General science classrooms</li>
                <li>Adaptable for gifted programs or intervention settings</li>
            </ul>

            <h3>Course Duration</h3>
            <ul>
                <li>Full academic year (36 weeks recommended)</li>
                <li>3 weeks per chapter average</li>
                <li>Can be condensed to semester-long intensive</li>
            </ul>

            <h3>Standards Alignment</h3>
            <p>This textbook is fully aligned with Next Generation Science Standards (NGSS)
            for middle school, including:</p>
            <ul>
                <li><strong>MS-LS1:</strong> From Molecules to Organisms (Structures and Processes)</li>
                <li><strong>MS-LS2:</strong> Ecosystems: Interactions, Energy, and Dynamics</li>
                <li><strong>MS-ESS3:</strong> Earth and Human Activity</li>
                <li><strong>MS-ETS1:</strong> Engineering Design</li>
            </ul>
        </div>

        <h2>Chapter-by-Chapter Guide</h2>

        <div class="section">
            <h3>Chapter 1: Introduction to Systems Thinking</h3>
            <div class="highlight-box">
                <strong>Essential Question:</strong> How can understanding systems help us make
                sense of the world around us?
            </div>

            <h4>Learning Objectives</h4>
            <ul>
                <li>Define what a system is and identify systems in everyday life</li>
                <li>Explain how components of a system interact</li>
                <li>Describe cause-and-effect relationships in systems</li>
                <li>Apply systems thinking to solve real-world problems</li>
            </ul>

            <h4>Pacing Guide (3 weeks)</h4>
            <ul>
                <li><strong>Week 1:</strong> Sections 1-2, Activities 1-2</li>
                <li><strong>Week 2:</strong> Sections 3-4, Activities 3-4</li>
                <li><strong>Week 3:</strong> Activity 5, Assessment, Review</li>
            </ul>

            <h4>Materials Needed</h4>
            <ul>
                <li>Paper, scissors, tape, markers (Activities 1-2)</li>
                <li>Dominoes or blocks (Activity 4)</li>
                <li>String (Activity 5)</li>
                <li>Chart paper for class discussions</li>
            </ul>

            <h4>Differentiation Strategies</h4>
            <div class="activity-box">
                <strong>For English Language Learners:</strong>
                <ul>
                    <li>Create visual vocabulary cards with images</li>
                    <li>Use hands-on activities before reading</li>
                    <li>Pair with English-proficient partners</li>
                </ul>

                <strong>For Advanced Learners:</strong>
                <ul>
                    <li>Challenge to identify complex systems (human brain, internet)</li>
                    <li>Create digital models using online tools</li>
                    <li>Research historical examples of systems thinking</li>
                </ul>

                <strong>For Struggling Learners:</strong>
                <ul>
                    <li>Focus on concrete, familiar systems (bike, school)</li>
                    <li>Provide graphic organizers for note-taking</li>
                    <li>Use more hands-on activities, fewer reading passages</li>
                </ul>
            </div>

            <h4>Assessment Ideas</h4>
            <ul>
                <li><strong>Formative:</strong> Exit tickets, activity observations, discussion participation</li>
                <li><strong>Summative:</strong> System diagram project, written explanation, quiz</li>
                <li><strong>Performance:</strong> Create and present a model of a system</li>
            </ul>
        </div>

        <div class="section">
            <h3>Chapter 2: Ecosystems as Systems</h3>
            <div class="highlight-box">
                <strong>Essential Question:</strong> How do living and non-living components
                interact in an ecosystem?
            </div>

            <p><em>Full lesson plans for Chapters 2-12 continue in similar format...</em></p>
        </div>

        <h2>Cell Collective Integration</h2>
        <div class="section">
            <p>Chapters 7-8 introduce students to the Cell Collective platform for interactive
            systems modeling. This platform allows students to:</p>
            <ul>
                <li>Explore pre-built models of biological systems</li>
                <li>Run simulations and observe system behavior</li>
                <li>Create their own models from scratch</li>
                <li>Collaborate with classmates on projects</li>
            </ul>

            <h3>Getting Started with Cell Collective</h3>
            <ol>
                <li><strong>Teacher Account:</strong> Create a free account at cellcollective.org</li>
                <li><strong>Class Setup:</strong> Create a class and student accounts</li>
                <li><strong>Practice:</strong> Explore 2-3 models yourself first</li>
                <li><strong>Student Introduction:</strong> Guide through platform navigation</li>
                <li><strong>First Simulation:</strong> Run a simple model together as a class</li>
            </ol>

            <div class="activity-box">
                <strong>Pro Tip:</strong> Start with the "Simple Cell" model for first-time users.
                It's intuitive and shows immediate cause-and-effect relationships that students
                learned about in Chapter 1.
            </div>
        </div>

        <h2>Assessment and Grading</h2>
        <div class="section">
            <h3>Recommended Grading Breakdown</h3>
            <ul>
                <li>Hands-on Activities: 30%</li>
                <li>Chapter Quizzes: 25%</li>
                <li>Participation and Discussion: 15%</li>
                <li>Cell Collective Projects: 20%</li>
                <li>Final Project: 10%</li>
            </ul>

            <h3>Rubrics</h3>
            <p>See Appendix for detailed rubrics for:</p>
            <ul>
                <li>Systems Diagram Quality</li>
                <li>Cell Collective Model Complexity</li>
                <li>Scientific Explanation Writing</li>
                <li>Collaborative Work</li>
            </ul>
        </div>

        <h2>Additional Resources</h2>
        <div class="section">
            <ul>
                <li><strong>Cell Collective:</strong> cellcollective.org</li>
                <li><strong>NGSS Resources:</strong> nextgenscience.org</li>
                <li><strong>Systems Thinking Books:</strong> "Thinking in Systems" by Donella Meadows (teacher reference)</li>
                <li><strong>Online Simulations:</strong> PhET Interactive Simulations (phet.colorado.edu)</li>
            </ul>
        </div>
    </div>
    """

    full_html = HTML_TEMPLATE.format(
        title="Teacher's Guide - Connected: How Systems Shape Our World",
        content=guide_content
    )

    with open("teachers_guide.html", 'w') as f:
        f.write(full_html)

    print("✓ Teacher's Guide created")

def main():
    """Main execution function"""
    print("=" * 60)
    print("ModelIt Textbook Generator")
    print("=" * 60)

    # Save structure
    save_chapter_structure()

    # Create table of contents
    create_table_of_contents()

    # Create teacher's guide
    create_teachers_guide()

    print("\n" + "=" * 60)
    print("Generation Complete!")
    print("=" * 60)
    print("\nNext Steps:")
    print("1. Review textbook_structure.json for complete outline")
    print("2. Use playwright or similar tool to convert HTML to PDF")
    print("3. Create individual chapter content using the templates")
    print("4. Integrate with Cell Collective platform")

if __name__ == "__main__":
    main()
