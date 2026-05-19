# Modern To-Do Application

A high-performance, responsive task management dashboard built with semantic HTML5, modern CSS custom properties, and native vanilla JavaScript.

## Features
- **Task Lifecycle:** Add, read, complete, and delete tasks dynamically without page reloads.
- **Persistent State:** Uses LocalStorage to save and sync tasks automatically across browser sessions.
- **Filter States:** View all tasks, only active items, or completed items instantly using array filtering.
- **Responsive Sizing:** Implements a fluid layout utilizing modern CSS flexbox boundaries.

## Architecture & Code Structure
The project is built around three tightly coupled structural elements:
1. `index.html`: Defines a clean structural hierarchy, containing semantic container layouts (`<main>`, `<header>`, `<section>`).
2. `style.css`: Features a global theme layer utilizing CSS variables (`:root`) for layout spacing (`rem`), dark-mode palette arrays, and precise flexbox tracking.
3. `script.js`: Uses an object-oriented state-driven architecture. Every user interaction updates an internal `tasks` array, which automatically re-renders the DOM view layer and serializes to storage.

## Quick Start
1. Place `index.html`, `style.css`, and `script.js` in the same directory.
2. Launch `index.html` in any modern web browser.
3. Add a task using the text field to watch the list update immediately.
