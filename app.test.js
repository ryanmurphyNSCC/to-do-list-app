/**
 * @jest-environment jsdom
 */

const { test, expect } = require('@jest/globals');
const { displayDate, addTask, clearTasks, saveData, setupEditEvent} = require('./script.js');

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

test('addTask adds a task to the list', () => {


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


test('Ensure that tasks are marked as completed', () => {
  
  });

test('setUpEditEvent edits the existing task', () => {

});

test('localStorage is updated when a task is added', () => {
  
  });


