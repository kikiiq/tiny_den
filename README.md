# tiny_den
Website to make your day a little bit more productive. Made with Claude AI.

# Tiny Den 🦊

A cozy productivity page: a Pomodoro timer, a to-do list and notes, with an animal companion that works, gets tired and falls asleep along with you.

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

## Features

- **Pomodoro timer**, inspired by [pomofocus.io](https://pomofocus.io)
  - Focus 25 min, Short Break 5 min, Long Break 15 min
  - Switches to the next mode automatically; a Long Break comes after every 4th focus session
  - Skip button while the timer runs, optional "Auto-start next timer"
  - Session counter ("#1 Time to focus!")
- **Animal companion** above the clock
  - Busy and tail-wagging while you focus
  - Tired, half-closed eyes when a break is ready
  - Fast asleep (closed eyes, floating "zzz") while the break timer runs
- **Three themes**, each with its own animal and colours: Fox (light), Cat (dusk), Owl (night). The first visit follows your system's dark mode setting.
- **To-do list** where every task has three states, changed with one click: empty → in progress → done → empty again
- **Notes** with autosave
- **Everything is saved in your browser**, so a refresh or a closed tab loses nothing
- **Restart button** (two clicks, so it can't be pressed by accident) that erases all tasks, notes and sessions
- Keyboard friendly, works on phones, and respects "reduce motion" settings

## How to run

1. Keep `index.html`, `style.css` and `script.js` together in one folder.
2. Open `index.html` in a browser.

An internet connection is only needed for the Fredoka font (Google Fonts). Without it the page still works with a fallback font.

## Project structure

| File | What it does |
| --- | --- |
| `index.html` | The structure of the page: header, timer, to-do list, notes, Restart button |
| `style.css` | Colours for the three themes (CSS variables), layout and all animations |
| `script.js` | The animals (drawn as SVG), timer logic, to-do list, notes, saving and Restart |

## Customising

- **Timer lengths:** change the `LEN` object at the top of the Pomodoro section in `script.js` (values are in seconds).
- **Sessions before a Long Break:** edit `done%4===0` in the `next()` function.
- **Theme colours:** edit the CSS variables at the top of `style.css` (`[data-theme=fox]`, `[data-theme=cat]`, `[data-theme=owl]`).
- **Animal colours:** edit the `PETS` object in `script.js`.

## Data and privacy

Tasks, notes, theme and timer state are stored only in your browser (`localStorage`). Nothing is sent to a server. Clearing your browser data, or using a private window, erases them. Data is not shared between devices or browsers.

## Credits

- Timer concept inspired by pomofocus.io
- Font: Fredoka (SIL Open Font License)
- Built together with Claude (Anthropic)
