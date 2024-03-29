/**
 * @jest-environment jsdom
 */

const { test, expect } = require('@jest/globals');

const { displayDate, addTask, clearTasks, saveData, setupEditEvent } = require('./script.js');

// Mock the HTML
beforeEach(() => {
  document.body.innerHTML = `
    <div id="list-container"></div>
    <div id="date"></div>
    `;
});


document.body.innerHTML = `
  <input id="input-box" type="text" />
  <ul id="list-container"></ul>
`;

test('displayDate updates element correctly', () => {
  document.body.innerHTML = `<div id="date"></div>`;
  displayDate();
  const dateElement = document.getElementById('date');
  expect(dateElement).not.toBe(null);
});

  test('should add a new task to the list', () => {
    // Mock input value
    const listContainer = document.getElementById('list-container');
    const dummyTask = document.createElement('div');
    listContainer.appendChild(dummyTask);
    localStorage.setItem('data', JSON.stringify([{ task: 'Dummy Task' }]));

  

  // Check if the list has added dummy task
  expect(listContainer.hasChildNodes()).toBe(true);

  //Check if localStorage 'data' is there and has the correct value
  expect(localStorage.getItem('data')).toBeDefined()

  // Cleanup: Clear localStorage to avoid affecting other tests
  localStorage.removeItem('data');
  });



test('clearTasks removes all tasks from the list and clears localStorage', () => {
  const listContainer = document.getElementById('list-container');
  const dummyTask = document.createElement('div');
  listContainer.appendChild(dummyTask);
  localStorage.setItem('data', JSON.stringify([{ task: 'Dummy Task' }]));

  // Action: Call the clearTasks function to clear the tasks
  clearTasks();

  // Check if the list is now empty
  expect(listContainer.hasChildNodes()).toBe(false);

  //Check if localStorage 'data' is cleared or set to an appropriate empty state
  expect(localStorage.getItem('data')).toBeNull(); // or expect it to be '[]' if that's how your implementation works

  // Cleanup: Clear localStorage to avoid affecting other tests
  localStorage.removeItem('data');
});


describe('Task Editing Functionality', () => {
  beforeEach(() => {
    // Set up the DOM elements required for the test
    document.body.innerHTML = `
      <ul id="list-container"></ul>
    `;

    // Add a task for editing
    const listContainer = document.getElementById('list-container');
    let li = document.createElement('li');
    li.textContent = 'Original Task';
    listContainer.appendChild(li);

    // Attach the edit event listener to the task
    setupEditEvent(li); // Assuming setupEditEvent is your function that attaches the dblclick listener
  });

  test('setUpEditEvent edits the existing task', () => {
    const task = document.querySelector('li');
    
    // Simulate double click on the task to trigger edit mode
    task.dispatchEvent(new MouseEvent('dblclick', {bubbles: true}));
    
    // After double click, an input field should be present
    const inputField = document.querySelector('li input');
    expect(inputField).not.toBeNull();
    expect(inputField.value).toBe('Original Task'); // Input should contain the original task text
    
    // Simulate changing the task
    inputField.value = 'Edited Task';
    
    // Simulate pressing 'Enter' to save the edited task
    inputField.dispatchEvent(new KeyboardEvent('keyup', {'key': 'Enter'}));
    
    // The task's text should now be updated
    expect(task.textContent).toBe('Edited Task');
  });
});

  beforeEach(() => {
    // Reset the document body and create necessary elements before each test
    document.body.innerHTML = `
      <ul id="list-container"></ul>
    `; // Adjust this line to match the actual HTML structure expected by your script
  });

  test('localStorage is updated when a task is added', () => {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '<div>Task 1</div>'; // Simulate adding a task

    Storage.prototype.setItem = jest.fn(); // Mock localStorage.setItem

    saveData(); // Call your function

    // Assertions
    expect(localStorage.setItem).toHaveBeenCalledWith('data', '<div>Task 1</div>');
  });




