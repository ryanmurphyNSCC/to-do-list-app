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


test('clearTasks removes all tasks from the list', () => {

});

test('Ensure that tasks are marked as completed', () => {
  
  });

test('setUpEditEvent edits the existing task', () => {

});

test('localStorage is updated when a task is added', () => {
  
  });


