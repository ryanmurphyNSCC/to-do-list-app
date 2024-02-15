/**
 * @jest-environment jsdom
 */

const { test, expect } = require('@jest/globals');

const { displayDate } = require('./script.js');

beforeEach(() => {
  document.body.innerHTML = `
    <div id="list-container"></div>
    <div id="date"></div>
    `;
});

test('displayDate updates element correctly', () => {
    document.body.innerHTML = `<div id="date"></div>`;
    displayDate();
    const dateElement = document.getElementById('date');
    expect(dateElement).not.toBe(null);
  });