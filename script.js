   // JavaScript Logic for To-Do List Functionality

    // Selecting Elements
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');
    const searchInput = document.getElementById('search-input');
    const toggleDarkMode = document.getElementById('toggle-dark-mode');

    // Current Filter State
    let currentFilter = 'all';

    // Function to Create a New Task Item
    function createTaskItem(taskText, completed = false, id = Date.now()) {
      const li = document.createElement('li');
      li.classList.add('task-item');
      li.setAttribute('data-id', id);

      // Task Content
      const taskContent = document.createElement('div');
      taskContent.classList.add('task-content');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('form-checkbox');
      checkbox.checked = completed;

      const span = document.createElement('span');
      span.textContent = taskText;
      if (completed) {
        span.classList.add('completed');
      }

      taskContent.appendChild(checkbox);
      taskContent.appendChild(span);

      // Action Buttons
      const actions = document.createElement('div');
      actions.classList.add('task-actions');

      const editButton = document.createElement('button');
      editButton.classList.add('edit');
      editButton.title = 'Edit Task';
      editButton.setAttribute('aria-label', 'Edit Task');
      editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM5 17v-2H3v2a2 2 0 002 2h12a2 2 0 002-2v-2h-2v2H5z" />
        </svg>
      `;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.title = 'Delete Task';
      deleteButton.setAttribute('aria-label', 'Delete Task');
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      `;

      actions.appendChild(editButton);
      actions.appendChild(deleteButton);

      li.appendChild(taskContent);
      li.appendChild(actions);

      // Event Listeners for Edit and Delete
      editButton.addEventListener('click', () => editTask(li, span));
      deleteButton.addEventListener('click', () => deleteTask(li));

      // Event Listener for Checkbox
      checkbox.addEventListener('change', () => toggleTaskCompletion(span, checkbox));

      return li;
    }

    // Function to Add a New Task
    function addTask() {
      const taskText = newTaskInput.value.trim();
      if (taskText === '') return;

      const taskItem = createTaskItem(taskText);
      taskList.appendChild(taskItem);
      newTaskInput.value = '';

      saveTasks();
      applyFilters();
    }

    // Function to Edit a Task
    function editTask(taskItem, taskSpan) {
      const currentText = taskSpan.textContent;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.classList.add('edit-input');
      input.setAttribute('aria-label', 'Edit Task');

      // Replace span with input
      const taskContent = taskItem.querySelector('.task-content');
      taskContent.replaceChild(input, taskSpan);
      input.focus();

      // Save changes on Enter or blur
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          saveTaskEdit(taskItem, input);
        }
      });

      input.addEventListener('blur', () => {
        saveTaskEdit(taskItem, input);
      });
    }

    // Function to Save Edited Task
    function saveTaskEdit(taskItem, input) {
      const newText = input.value.trim();
      if (newText === '') {
        // If empty, delete the task
        deleteTask(taskItem);
        return;
      }

      const span = document.createElement('span');
      span.textContent = newText;

      // Replace input with span
      const taskContent = taskItem.querySelector('.task-content');
      taskContent.replaceChild(span, input);

      // Update completion style if necessary
      const checkbox = taskContent.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        span.classList.add('completed');
      } else {
        span.classList.remove('completed');
      }

      saveTasks();
      applyFilters();
    }

    // Function to Delete a Task
    function deleteTask(taskItem) {
      taskList.removeChild(taskItem);
      saveTasks();
    }

    // Function to Toggle Task Completion
    function toggleTaskCompletion(taskSpan, checkbox) {
      if (checkbox.checked) {
        taskSpan.classList.add('completed');
      } else {
        taskSpan.classList.remove('completed');
      }
      saveTasks();
      applyFilters();
    }

    // Function to Apply Filters
    function applyFilters() {
      const tasks = Array.from(taskList.children);
      const searchTerm = searchInput.value.toLowerCase();

      tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        const span = task.querySelector('span');
        const taskText = span.textContent.toLowerCase();

        // Filter based on current filter state
        let shouldDisplay = false;

        if (currentFilter === 'all') {
          shouldDisplay = true;
        } else if (currentFilter === 'active' && !checkbox.checked) {
          shouldDisplay = true;
        } else if (currentFilter === 'completed' && checkbox.checked) {
          shouldDisplay = true;
        }

        // Additionally filter based on search term
        if (searchTerm && !taskText.includes(searchTerm)) {
          shouldDisplay = false;
        }

        // Show or hide the task
        task.style.display = shouldDisplay ? 'flex' : 'none';
      });
    }

    // Function to Set Active Filter Button
    function setActiveFilter(button) {
      // Remove 'active' class from all filter buttons
      [filterAll, filterActive, filterCompleted].forEach(btn => btn.classList.remove('active'));

      // Add 'active' class to the selected button
      button.classList.add('active');

      // Update current filter state
      if (button === filterAll) {
        currentFilter = 'all';
      } else if (button === filterActive) {
        currentFilter = 'active';
      } else if (button === filterCompleted) {
        currentFilter = 'completed';
      }

      applyFilters();
    }

    // Function to Save Tasks to Local Storage
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('.task-item').forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        const span = task.querySelector('.task-content span');
        const id = task.getAttribute('data-id');
        tasks.push({
          id: id,
          text: span.textContent,
          completed: checkbox.checked
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
// Function to Load Tasks from Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (!tasks || tasks.length === 0) {
    // Add demo tasks if no tasks are found
    const demoTasks = [
      { id: Date.now() + 1, text: "Welcome to your To-Do List!", completed: false },
      { id: Date.now() + 2, text: "Click the checkbox to mark as completed.", completed: false },
      { id: Date.now() + 3, text: "Use the search bar to filter tasks.", completed: false },
      { id: Date.now() + 4, text: "Switch to dark mode from the toggle above.", completed: false },
    ];

    demoTasks.forEach(task => {
      const taskItem = createTaskItem(task.text, task.completed, task.id);
      taskList.appendChild(taskItem);
    });

    // Save demo tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(demoTasks));
  } else {
    tasks.forEach(task => {
      const taskItem = createTaskItem(task.text, task.completed, task.id);
      taskList.appendChild(taskItem);
    });
  }

  applyFilters();
}



    // Function to Save Theme Preference to Local Storage
    function saveThemePreference() {
      const isLightMode = toggleDarkMode.checked;
      localStorage.setItem('lightMode', isLightMode);
    }

    // Function to Load Theme Preference from Local Storage
    function loadThemePreference() {
      const isLightMode = JSON.parse(localStorage.getItem('lightMode'));
      if (isLightMode) {
        document.body.classList.add('light-mode');
        toggleDarkMode.checked = true;
      } else {
        document.body.classList.remove('light-mode');
        toggleDarkMode.checked = false;
      }
    }

    // Event Listener for Add Task Button
    addTaskButton.addEventListener('click', addTask);

    // Event Listener for Enter Key in Input
    newTaskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    // Event Listeners for Filter Buttons
    filterAll.addEventListener('click', () => setActiveFilter(filterAll));
    filterActive.addEventListener('click', () => setActiveFilter(filterActive));
    filterCompleted.addEventListener('click', () => setActiveFilter(filterCompleted));

    // Event Listener for Search Input
    searchInput.addEventListener('input', applyFilters);

    // Event Listener for Light Mode Toggle
    toggleDarkMode.addEventListener('change', () => {
      if (toggleDarkMode.checked) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
      saveThemePreference();
    });

    // Initialize the Application
    document.addEventListener('DOMContentLoaded', () => {
      loadThemePreference();
      loadTasks();
    });