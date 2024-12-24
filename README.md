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

git clone <repository-url>

Replace <repository-url> with the URL of the repository.

Navigate into the project folder:

cd <project-folder>

Step 2: Install Bun

Install Bun globally on your system:

curl -fsSL https://bun.sh/install | bash

Restart your terminal to ensure the Bun command is available.

Verify the installation by checking the version:

bun --version

Note for Windows Users: Ensure you have WSL (Windows Subsystem for Linux) installed and configured to use the above command. Alternatively, follow the Windows-specific Bun installation guide if needed.

Step 3: Install Dependencies

Inside the project folder, install the required dependencies:

bun install

Step 4: Run the Development Server

Start the development server:

bun run dev

Open your browser and navigate to http://localhost:3000 (or the port specified in the terminal).

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

