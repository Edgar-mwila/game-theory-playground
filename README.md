Game-Theory Playground

Welcome to theGame-Theory Playground! This guide will help you get started with setting up the project on your local machine.

Prerequisites

Before you begin, ensure you have the following installed:

Git: Download Git

Node.js (optional): Bun includes Node.js functionality, but having Node.js installed can be helpful for compatibility.

Bun: Bun is required to manage dependencies and run the development server.

Installation Guide

Step 1: Clone the Repository

Open your terminal or command prompt.

Clone the repository:

first o to or create a folder in which you want the project folder to be.
then open the cmd or terminal in vs code and run this command;
git clone https://github.com/Edgar-mwila/game-theory-playground.git
then run this command; cd game-theory-playground
then run code .


Step 2: Install Bun

Install Bun globally on your system:

search install bun on windows and click the first link. then open powershell in admin mode an run the command there.

Restart your powershell to ensure the Bun command is available.

Verify the installation by checking the version:

bun --version

Step 3: Install Dependencies

Inside the project folder, install the required dependencies:

bun install

Step 4: Run the Development Server

Start the development server:

bun run dev

Open your browser and navigate to http://localhost:5173.

Additional Commands

Here are a few other useful commands for working with this project:

Run tests (if applicable):

bun run test

Build for production:

bun run build

Preview the production build:

bun run preview

Troubleshooting

If you encounter any issues during setup, ensure:

Bun is installed and correctly added to your system's PATH.

You have the necessary permissions to install and run applications on your system.

All dependencies are installed successfully by checking the output of bun install.

Feel free to reach out for help if you encounter any issues!

