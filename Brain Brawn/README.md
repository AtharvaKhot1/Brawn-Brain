FightToCode README

Overview
FightToCode is an educational combat game built with JavaScript and HTML5 Canvas. Players choose to Attack or Block (with 5 lives), facing enemies that automatically decide to Attack or Block. Every player action requires answering a tech-related question correctly. The game spans 3 levels, with unique background images transitioning as you progress. This project is developed by a team of 3 using VS Code, starting with a small, focused scope.

Tech Stack
Languages: JavaScript, HTML, CSS
Framework: HTML5 Canvas for rendering
Version Control: Git (e.g., GitHub repository)


Project Structure
FightToCode/
├── index.html      # Main HTML file with Canvas
├── styles.css      # Styling for UI
├── game.js         # Core game logic (player, enemy, levels)
├── questions.js    # Question bank and logic
├── ui.js           # Front-end rendering and UI
├── assets/         # Background images
│   ├── level1.jpg  # Level 1 background
│   ├── level2.jpg  # Level 2 background
│   └── level3.jpg  # Level 3 background
└── README.md       # This file


Team Roles
1. Front-End Developer (Teammate 1 ->Osmaur)
Tasks:
Set up Canvas rendering (backgrounds, characters, text).
Create UI elements (buttons for Attack/Block, life bars, question display).
Update visuals based on game state (lives, enemy HP, level backgrounds).
File: ui.js, styles.css, index.html
Collaborates With: Game Logic for state updates, Question System for displaying questions.


2. Game Logic Developer (Teammate 2 ->George)
Tasks:
Code player mechanics (5 lives, Attack/Block actions).
Build enemy AI (randomly chooses Attack/Block).
Manage game state (lives, enemy HP, level progression).
Trigger questions for actions and resolve turns.
File: game.js
Collaborates With: Front-End for UI updates, Question System for action triggers.


3. Question System Developer (Teammate 3->Adedoyin)
Tasks:
Create a question bank (tech questions, multiple-choice answers, difficulty levels).
Code question display and answer-checking logic.
Link questions to player actions (e.g., callback after correct answer).
File: questions.js
Collaborates With: Game Logic for triggering questions, Front-End for displaying them.


Game Mechanics (Initial Scope)
Player: Starts with 5 lives. Chooses Attack (damage enemy) or Block (prevent damage when enemy attacks).
Enemy: Randomly picks Attack or Block. If it attacks, the player can choose to block or not; unblocked attacks reduce player lives.
Questions: Every player action (Attack or Block) requires answering a tech question
Levels: 3 levels with unique backgrounds (level1.jpg, level2.jpg, level3.jpg). Enemy defeated = next level. 0 lives = game over.


Setup Instructions
Clone the repository: git clone <repo-url>
Open the project in VS Code.
Place background images (level1.jpg, level2.jpg, level3.jpg) in assets/.
Launch index.html in a browser (e.g., via Live Server extension).
Test each module:
game.js: Console logs game state.
questions.js: Console logs questions.
ui.js: Renders Canvas.
Development Steps
Setup: Initialize Git repo and basic files (done by Game Logic).
MVP: Build one level:
Front-End: Render player, enemy, and Level 1 background.
Game Logic: Code Attack vs. enemy AI, with Block option when enemy attacks.
Question System: Add 3-5 questions tied to actions.
Integrate: Connect game.js, questions.js, and ui.js (e.g., shared functions).
Expand: Refine Block mechanic, then add 3 levels with background transitions.
Collaboration Tips
Daily Check-Ins: Quick updates via chat/call.
Git Workflow: Commit often, use branches (e.g., feature/game-logic).
Testing: Run index.html after changes to ensure integration works.
Current Status
Project initialized: March 29, 2025.
Roles assigned, basic structure in place.
Assets: 3 background images ready (level1.jpg, level2.jpg, level3.jpg).
Next: Build and test MVP with Attack and Block.