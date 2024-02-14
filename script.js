const inputBox = document.getElementById('input-box');
const prioritySelector = document.getElementById('priority-selector');

const listContainer = document.getElementById('list-container');

function displayDate() {
    let date = new Date();
  
    // Get date components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Get time components
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    // Format the date and time
    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}`;
  
    // Display the date and time
    document.querySelector('#date').innerHTML = `${formattedDate} <br> ${formattedTime}`;
  }

window.onload = function() {
    displayDate();
}

setInterval(displayDate, 30000);

function addTask (){
    if(inputBox.value === ''){
        alert('Please Enter a Task');
} else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00D7';
    li.appendChild(span);
    setupEditEvent(li);
    }
    inputBox.value = '';
    saveData();
}

function setupEditEvent(li) {
    li.addEventListener('dblclick', function () {
      const originalText = li.textContent.trim();
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.value = originalText;
      li.innerHTML = '';
      li.appendChild(inputField);
      inputField.focus();
  
      inputField.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
          li.innerHTML = inputField.value;
          saveData();
        }
      });
  
      inputField.addEventListener('keyup', function (e) {
        if (e.key === 'Escape') {
          li.innerHTML = originalText;
        }
      });
    });
  }

function clearTasks() {
    const listContainer = document.getElementById('list-container');
    
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    localStorage.removeItem('data');
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.id === 'clear-button') {
        clearTasks();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
}

showTask()

// Timer
let timer;
let isRunning = false;

const circle = document.getElementById('circle');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

let minutes = 25;
let seconds = 0;

function updateDisplay() {
  minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function updateCircle() {
  const totalSeconds = minutes * 60 + seconds;
  const percentage = (totalSeconds / (25 * 60)) * 100;
  circle.style.background = `conic-gradient(#4285f4 ${percentage}%, #f4f4f4 ${percentage}% 100%)`;
}

function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          isRunning = false;
          // Implement what to do when the timer reaches 0 (e.g., switch to break time).
        } else {
          if (seconds === 0) {
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }
          updateDisplay();
          updateCircle();
          document.querySelector('.timer').classList.add('running');
        }
      }, 1000);
    }
  }
  
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    updateCircle();
    document.querySelector('.timer').classList.remove('running');
  }

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial display update
updateDisplay();
updateCircle();


