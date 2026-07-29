# Snake Game 2.0

A neon-styled Snake game built with plain HTML, CSS, and JavaScript. The game tracks score, high score, and elapsed time, and stores the best score in the browser using `localStorage`.

## Features

- Classic Snake gameplay with keyboard controls
- Start and restart modal screens
- Live score, high score, and timer display
- Food generation that avoids spawning on the snake
- Neon arcade-inspired UI with animated effects

## Controls

- `Arrow Up` or `W` to move up
- `Arrow Down` or `S` to move down
- `Arrow Left` or `A` to move left
- `Arrow Right` or `D` to move right

## How To Run

1. Open the project folder in VS Code or any code editor.
2. Open `index.html` in a browser, or use a local preview server.
3. Click `Start Game` to begin.
4. Play the live version here: https://snake-game-2-0-eh6d.vercel.app

## Project Structure

- `index.html` - game layout, score panel, and modals
- `style.css` - neon theme, board styling, and responsive layout
- `script.js` - game logic, movement, scoring, timer, and restart handling
- `ui-effects.js` - small visual interactions for the hero panel and modal cards

## Notes

- The high score is saved locally in the browser.
- Refreshing the page resets the current run, but not the stored high score.
