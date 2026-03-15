<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Dynalight&size=35&pause=1000&color=000000&width=435&lines=Technical+Documentation" alt="Typing SVG" /></a>

![Rjs](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![VT](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![TS](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![HTML](https://img.shields.io/badge/HTML-orange?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-orange?logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-orange?logo=javascript&logoColor=white)

# My hosted website
>https://twin-galaxies.web.app/

Now you can check my project without have to clone it :)

# Projects I took inspo to make mine
> https://www.speedrun.com/

> https://www.twingalaxies.com/

# HiFi concept I made on Figma 
![Gallery](https://raw.githubusercontent.com/Arizzquierdo/twin-galaxies-react/main/public/Twin-galaxies.png)

# NEW ADDITION! RSS FEED
![Gallery](https://github.com/Arizzquierdo/twin-galaxies-react/blob/main/public/Screenshot%202026-03-15%20at%2015-58-00%20twin-galaxies-react.png)

# 📝 Overhead View of the Project

This project is a web application inspired by Twin Galaxies, the iconic organization that tracks and verifies videogame world records.

The main goal of this website is to present:

- A historical overview of Twin Galaxies

- Information about competitive gaming records

- A visual and interactive leaderboard section

- A modern and responsive design

The homepage introduces visitors to Twin Galaxies, highlighting its importance in the evolution of esports and competitive gaming. It features a hero section, navigation bar, informative sections, and a dynamic leaderboard area.

## Main Page Description 

The Home Page serves as the central hub of the website and includes:

📜 A short historical summary

📱 Fully responsive design

The layout is clean and user-friendly, ensuring accessibility across desktop, tablet, and mobile devices, very intuitive interface.

## Type of Architecture Election 

I used for this proyect a modular architecture because React is component-based by nature. The folder structure reflects this logic by separating the application into clearly defined layers classified according to their functionality.

The 📂components/ folder contains reusable UI elements, following React’s most basic principle, building interfaces from small, independent pieces. The 📂pages/ folder represents full views of the application, each composed of multiple components. This separation ensures a clear distinction between reusable building blocks and complete screens.

The 📂types/ folder centralizes TypeScript interfaces and data models, improving type safety and making the data structure consistent across the project.

Using Vite as the build tool keeps the project lightweight and optimized, while TypeScript enforces strong typing and reduces runtime errors. Together, this structure promotes scalability, maintainability, and clean code organization as the project grows.

## 📂 Folder Structure Scheme
**DISCLAIMER**: I highly recommend install Tree on Bash Terminal with the command:
- `sudo <advanced package tool> install tree`.
  
To have a clearer glance of the directories structure.

My project is organized like this:
```bash
TWIN-GALAXIES-REACT
│
├── 📂 node_modules/
│   (Contains all npm installed dependencies.
│   Automatically generated. Should not be modified manually.)
│
├── 📂 public/
│   (Public static files served directly by the browser,
│   such as favicon or global static assets.)
│
├── 📂 src/
│   (Main source folder containing the entire application code.)
│
│   ├── 📂 assets/
│   │   (Static resources such as images, icons, or SVG files.)
│   │   └── react.svg
│   │       (React logo or other graphic resource.)
│   │
│   ├── 📂 components/
│   │   (Reusable React components that build parts of the UI.)
│   │
│   │   ├── Footer.tsx
│   │   │   (Footer component displayed at the bottom of the website.)
│   │   │
│   │   ├── HallOfFameCard.tsx
│   │   │   (Component representing an individual Hall of Fame card.)
│   │   │
│   │   ├── Header.tsx
│   │   │   (Header component including navigation and hamburger menu.)
│   │   │
│   │   ├── ParallaxWrapper.tsx
│   │   │   (Component that applies a parallax scrolling effect to sections.)
│   │   │
│   │   └── Photo.tsx
│   │       (Component used to display images inside the gallery.)
│   │
│   ├── 📂 pages/
│   │   (Components representing full pages of the website.)
│   │
│   │   ├── About.tsx
│   │   │   (About page containing information about Twin Galaxies.)
│   │   │
│   │   ├── Gallery.tsx
│   │   │   (Gallery page displaying images.)
│   │   │
│   │   ├── HallOfFame.tsx
│   │   │   (Page displaying highlighted players or achievements.)
│   │   │
│   │   ├── Home.tsx
│   │   │   (Main landing page of the website.)
│   │   │
│   │   └── Records.tsx
│   │       (Page displaying records or leaderboard information.)
│   │
│   ├── 📂 types/
│   │   (TypeScript type definitions to structure application data.)
│   │   └── RecordData.ts
│   │       (Defines the data structure for record objects.)
│   │
│   ├── App.css
│   │   (Main global styles for the application.)
│   │
│   ├── App.tsx
│   │   (Root component that organizes layout and routing.)
│   │
│   ├── index.css
│   │   (Base styles applied across the entire project.)
│   │
│   └── main.tsx
│       (Application entry point.
│       Renders the <App /> component into the DOM.)
│
├── .gitignore
│   (Specifies files and folders Git should ignore.)
│
├── eslint.config.js
│   (ESLint configuration to enforce code quality and best practices.)
│
├── index.html
│   (Main HTML file where the React app is mounted.)
│
├── package.json
│   (Defines dependencies, scripts, and project metadata.)
│
├── package-lock.json
│   (Locks exact dependency versions for consistency.)
│
├── README.md
│   (Project documentation for GitHub.)
│
├── tsconfig.json
│   (Main TypeScript configuration file.)
│
├── tsconfig.app.json
│   (TypeScript configuration specific to the application.)
│
├── tsconfig.node.json
│   (TypeScript configuration for the Node environment.)
│
└── vite.config.ts
    (Vite configuration file for bundling and development server setup.)
```

## 📚 Sources / References 
- 📖 'PLAY TETRIS' part repository - https://github.com/cibulka/react-tetris-ts
- 📖 Firebase docs
- 📖 W3Schools – Typescript syntax and grammar
- 📖 TYPESCRIPTLANG.ORG – Offical documentation for Typescript
- 📖 Reddit - Folder Structure Scheme
- 📖 Stack Overflow - Debugging
- 📖 REACT.DEV - Build a React App from Scratch
- 📖 MDN - General guide for CSS,HTML and JS  

