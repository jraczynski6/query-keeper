# Query Keeper
A lightweight tool made for authors to help manage and submit queries quickly.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Tech Stack](#tech-stack)
- [License](#license)

## Installation

**Prerequisites:**  
Make sure you have the following installed on your machine before proceeding:  
- [Node.js](https://nodejs.org/) (v18 or later recommended)  
- npm (comes with Node.js)

Follow these steps to get Query Keeper running locally:

1. **Clone the repository**  
git clone https://github.com/your-username/query-keeper.git

2. **Navigate into the project folder**  
cd query-keeper

3. **Install dependencies**  
npm install

4. **Run the development server locally**  
npm start  


## Usage

Follow these steps to use Query Keeper after it is running:

1. **Open the app**  
   Open your browser and go to [Query Keeper](https://query-keeper.netlify.app/).

2. **Set up your agent and author information**  
Before generating any queries, fill in your agent details and author profile. This ensures your queries are correctly associated with the right agent/project.

3. **Create a new query**  
In the Projects tab, click on "Generate Query" to start a query. Make sure you have added your agent and author information first.

4. **View your queries**  
All saved queries are stored in their own agents or projects directories. To see them on the main dashboard, you need to **pin them** to the dashboard.

5. **Edit or update a query**  
Select a query and click the "Edit" button to make changes, then save.

6. **Delete a query**  
Click the "Delete" button next to a query to remove it from your dashboard and your agent/project directory.

## Features

- Generate new queries for your agents/projects
- Organize queries within project directories
- Pin projects, agents, and notes to the dashboard for quick access
- Edit and update queries after creation
- Delete agent and project cards from the dashboard and directories
- Manage agent and author information for proper query attribution

## Contributing

Follow these steps if you want to contribute to Query Keeper:

1. **Fork the repository**  
Click the "Fork" button on GitHub to create your own copy of the repository.

2. **Clone your fork**  
git clone https://github.com/your-username/query-keeper.git

3. **Create a new branch**  
git checkout -b feature/your-feature-name

4. **Make your changes**  
Edit the code, add features, or fix bugs in your branch.

5. **Test your changes**  
Make sure your changes work locally and do not break existing functionality.

6. **Commit and push**  
git add .  
git commit -m "Add descriptive message about your changes"  
git push origin feature/your-feature-name

7. **Open a Pull Request**  
Go to the original repository and create a Pull Request from your branch. Describe your changes clearly.

## Tech Stack

- **Frontend:** React.js, Vite  
- **Styling:** CSS
- **State Management:** React Context API (Notifications, etc.)  
- **Other:** Browser-based clipboard API, local storage for saved queries

## License

Query Keeper is open source and released under the MIT License.  
See the [LICENSE](LICENSE) file for full details.
