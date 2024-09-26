// Retrieve events from localStorage
let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to display all countdowns
function displayEvents() {
  const eventsContainer = document.getElementById("events");
  eventsContainer.innerHTML = "";

  events.forEach((event, index) => {
    const now = new Date().getTime();
    const timeLeft = event.time - now;

    if (timeLeft >= 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      eventsContainer.innerHTML += `
        <div class="event-card">
          <h2>${event.name}</h2>
          <div class="time-box">
            <div>
              <span>${days}</span>
              <p>Days</p>
            </div>
            <div>
              <span>${hours}</span>
              <p>Hours</p>
            </div>
            <div>
              <span>${minutes}</span>
              <p>Minutes</p>
            </div>
            <div>
              <span>${seconds}</span>
              <p>Seconds</p>
            </div>
          </div>
          <button onclick="removeEvent(${index})">Remove</button>
        </div>
      `;
    } else {
      eventsContainer.innerHTML += `
        <div class="event-card">
          <h2>${event.name} has already started!</h2>
          <button onclick="removeEvent(${index})">Remove</button>
        </div>
      `;
    }
  });
}

// Function to save a new event
function saveEvent() {
  const eventName = document.getElementById("event-name").value;
  const eventTime = new Date(document.getElementById("event-time").value).getTime();

  if (eventName && eventTime) {
    events.push({ name: eventName, time: eventTime });
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
  } else {
    alert("Please enter valid event details.");
  }
}

// Function to remove an event
function removeEvent(index) {
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
  displayEvents();
}

// Update all countdowns every second
setInterval(displayEvents, 1000);

// Initialize the countdown when page loads
displayEvents();
