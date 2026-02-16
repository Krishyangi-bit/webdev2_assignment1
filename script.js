// ===== FETCH ELEMENTS =====
const eventForm = document.getElementById("eventForm");
const eventNameInput = document.getElementById("eventName");
const eventDateInput = document.getElementById("eventDate");
const eventCategoryInput = document.getElementById("eventCategory");
const eventDescriptionInput = document.getElementById("eventDescription");

const clearAllBtn = document.getElementById("clear-btn");
const addSampleBtn = document.getElementById("sample-btn");
const eventContainer = document.getElementById("eventContainer");

const demoBox = document.querySelector(".demo-box");

// ===== SAMPLE DATA =====
const sampleEvents = [
  {
    title: "Birthday",
    date: "2026-02-26",
    category: "Social",
    description: "Happy Birthday!",
  },
  {
    title: "Hack KRMU",
    date: "2026-02-18",
    category: "Workshop",
    description: "Hackathon energy ⚡",
  },
];

// ===== EMPTY STATE HANDLER =====
function updateEmptyState() {
  const hasEvents = eventContainer.querySelector(".event-item");
  const emptyMsg = eventContainer.querySelector(".empty-msg");

  if (hasEvents && emptyMsg) emptyMsg.remove();

  if (!hasEvents && !emptyMsg) {
    eventContainer.innerHTML =
      `<p class="empty-msg">No events yet. Add your first event!</p>`;
  }
}

// ===== EVENT CARD CREATOR =====
function createEventCard(eventData) {
  const card = document.createElement("div");
  card.className = "event-item";

  card.innerHTML = `
    <div class="event-header">
      <h3>${eventData.title}</h3>
      <button class="delete-btn" title="Delete Event">✕</button>
    </div>
    <div class="event-date">📅 ${eventData.date}</div>
    <div class="event-category">${eventData.category}</div>
    <p class="event-desc">${eventData.description}</p>
  `;

  // smoother delete animation
  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.classList.add("fade-out");
    setTimeout(() => {
      card.remove();
      updateEmptyState();
    }, 250);
  });

  return card;
}

// ===== FORM SUBMIT =====
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // tiny validation glow-up
  if (!eventNameInput.value.trim()) return;

  const eventData = {
    title: eventNameInput.value.trim(),
    date: eventDateInput.value,
    category: eventCategoryInput.value,
    description: eventDescriptionInput.value.trim(),
  };

  eventContainer.appendChild(createEventCard(eventData));
  updateEmptyState();
  eventForm.reset();
});

// ===== SAMPLE EVENTS =====
addSampleBtn.addEventListener("click", () => {
  sampleEvents.forEach((data) => {
    eventContainer.appendChild(createEventCard(data));
  });
  updateEmptyState();
});

// ===== CLEAR EVENTS =====
clearAllBtn.addEventListener("click", () => {
  if (confirm("Delete all events?")) {
    eventContainer.innerHTML = "";
    updateEmptyState();
  }
});

// ===== DOM TRACKER =====
function updateTracker(type, value) {
  demoBox.innerHTML = `
    <div class="tracker-line">
      <span>Last Event:</span>
      <span class="key-badge">${type}</span>
    </div>
    <div class="tracker-line">
      <span>Value/Button:</span>
      <span style="color:#fbbf24">${value}</span>
    </div>
  `;
}

// Mouse Events
window.addEventListener("mousedown", (e) => {
  const buttons = ["Left Click", "Middle Click", "Right Click"];
  updateTracker("Mouse Pressed", buttons[e.button] || `Button ${e.button}`);
});

// Keyboard Events
window.addEventListener("keydown", (e) => {
  if (e.key === " ") e.preventDefault();
  updateTracker("Key Pressed", e.key === " " ? "Space" : e.key);
});
