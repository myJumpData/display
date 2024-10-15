# myJumpData Display

## Overview

This repository contains the code for the **myJumpData display** application. It is a web-based display tool designed to present data from myJumpData services.

This guide will walk you through installing Node.js, Git, and all dependencies, as well as building, running, and updating the application.

## Prerequisites

Before you begin, ensure that you have the following software installed:

- Node.js
- Git

### Installation Instructions

#### Windows

1. **Install Git**
   - Download Git for Windows from [here](https://git-scm.com/download/win).
   - Run the installer and follow the instructions, ensuring that "Git Bash" is selected as the default terminal during installation.

2. **Install Node.js**
   - Download Node.js for Windows from [here](https://nodejs.org/).
   - Run the installer and follow the setup instructions.

#### Linux

1. **Install Git**
   - Open a terminal and run the following commands:
     ```bash
     sudo apt update
     sudo apt install git
     ```

2. **Install Node.js**
   - For Ubuntu or Debian-based systems, run the following commands:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
     sudo apt install -y nodejs
     ```
   - For other Linux distributions, follow the instructions [here](https://nodejs.org/en/download/package-manager/).

#### macOS

1. **Install Git**
   - Git is typically pre-installed on macOS. If not, you can install it using Homebrew:
     ```bash
     brew install git
     ```

2. **Install Node.js**
   - Install Node.js using Homebrew:
     ```bash
     brew install node
     ```

### Cloning the Repository

Once Git and Node.js are installed, follow these steps to clone the repository:

1. Open a terminal or Git Bash (on Windows).
2. Navigate to the directory where you want to clone the project.
3. Clone the repository by running the following command:
   ```bash
   git clone https://github.com/myJumpData/display.git
   ```

### Installing Dependencies

1. Navigate to the cloned repository's directory:
   ```bash
   cd display
   ```

2. Install the necessary Node.js dependencies by running:
   ```bash
   npm install
   ```

### Building the Project

To build the project, simply run:
```bash
npm run build
```
This will compile the project into a distributable format.

### Running the Project

To start the application locally, use:
```bash
npm start
```
This will launch the server and the application will be available locally, typically at `http://localhost:3000`.

### Updating the Project

To update the project to the latest version, follow these steps:

1. Pull the latest changes from the repository:
   ```bash
   git pull origin main
   ```

2. Reinstall any updated dependencies:
   ```bash
   npm install
   ```

3. Rebuild the project:
   ```bash
   npm run build
   ```

4. Restart the application if it's running:
   ```bash
   npm start
   ```

## Troubleshooting

- If you encounter issues during installation or build, ensure that you are using the correct versions of Node.js and Git.
- Clear the npm cache if you face issues with npm packages:
  ```bash
  npm cache clean --force
  ```
- Contact: https://myjumpdata.de/docs/contact

## License

This project is licensed under a restrictive license. By using this code, you agree to the following terms:

- **No commercial use**: You may not use this project or any derivative works for commercial purposes without explicit permission.
- **No distribution**: You may not distribute the source code, modified or unmodified, without prior written consent from the repository owner.
- **No modification**: You may not modify the source code for use outside this repository unless granted explicit permission by the owner.
- **No sublicensing**: You may not sublicense this software or any part of it to third parties.

If you wish to use or modify this software beyond the above terms, please contact the repository owner for permission.

---

Now you're ready to use and contribute to the **myJumpData display**!
