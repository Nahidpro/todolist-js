To-Do List App
A simple, interactive To-Do list application built using vanilla JavaScript, HTML, and CSS. This app allows users to manage their tasks, apply filters, and toggle between light and dark modes. It also stores the user's data locally in the browser using Local Storage, ensuring that tasks persist even after refreshing the page.

Features
Task Management: Add, edit, and delete tasks.
Task Completion: Mark tasks as completed using checkboxes.
Search: Search through tasks by typing in the search bar.
Filters: Filter tasks by All, Active, or Completed states.
Light/Dark Mode: Toggle between light and dark themes for better usability.
Local Storage: Tasks and theme preferences are saved to Local Storage to persist even after a page refresh.
Technologies Used
HTML: For structuring the app.
CSS: For styling and theming (light/dark mode).
JavaScript: For implementing app functionality, including DOM manipulation, event handling, and local storage management.
How to Use
1. Clone the Repository
Clone the repository to your local machine using the following command:

bash
Copy code
git clone https://github.com/your-username/todo-list-app.git
2. Open the App
Open the index.html file in your browser to run the app.

3. Interacting with the App
Add a Task: Type a task in the input field and click the "Add Task" button, or press Enter to add a new task.
Mark as Completed: Click the checkbox next to a task to mark it as completed.
Edit a Task: Click the edit button (pencil icon) next to a task to change its text.
Delete a Task: Click the delete button (trash icon) next to a task to remove it.
Filter Tasks: Use the "All", "Active", or "Completed" filter buttons to view tasks based on their completion status.
Search Tasks: Use the search bar to filter tasks by text.
Switch Theme: Use the toggle switch to switch between light and dark modes.
4. Persistent Data
The app stores tasks and your theme preference locally in the browser using Local Storage. This means your tasks and theme settings will persist even if you refresh the page or reopen the app.

App Structure
bash
Copy code
/todo-list-app
│
├── index.html         # Main HTML file
├── style.css          # CSS file for styling
├── script.js          # JavaScript file for app logic
└── README.md          # This README file
Local Storage Structure
The app saves two key pieces of data to Local Storage:

Tasks: An array of task objects, each containing the task's text, completion status, and a unique ID.
Theme Preference: A boolean value indicating whether the user prefers light mode (true) or dark mode (false).
