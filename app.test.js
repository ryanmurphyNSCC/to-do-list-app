/**
 * @jest-environment jsdom
 */

const { displayDate } = require('./script.js');

test('displayDate updates element correctly', () => {
    document.body.innerHTML = `<div id="date"></div>`;
    displayDate();
    const dateElement = document.getElementById('date');
    expect(dateElement).not.toBe(null);
  });