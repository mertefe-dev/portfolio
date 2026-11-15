# Mert Efe Yüksel — Personal Portfolio Website

A responsive, component-based personal portfolio web application built with **React** and **Vite**, and automatically deployed to **GitHub Pages** via **GitHub Actions**.

- **Live Website:** [https://mertefe-dev.github.io/portfolio/](https://mertefe-dev.github.io/portfolio/)
- **Repository:** [https://github.com/mertefe-dev/portfolio](https://github.com/mertefe-dev/portfolio)

---

## Features & Architecture

- **Single-Page Responsive Layout:** Includes dedicated sections for **Home (Hero)**, **About Me**, **Skills**, **Projects**, and **Contact**.
- **Modular Component Structure:** Organized under `src/components` with 8 reusable components (`Navbar`, `Hero`, `About`, `Projects`, `ProjectCard`, `Contact`, `Footer`, and `DotBackground`).
- **Dynamic Filtering & State Management:** Uses React's `useState` hook in `Projects.jsx` to allow interactive filtering across project categories (`All`, `Web Development`, `Systems & C`).
- **Props & Dynamic Rendering:** Passes project metadata down to `ProjectCard.jsx` via `props` and renders project lists and technology tags dynamically using JavaScript `.map()`.
- **Automated CI/CD Pipeline:** Configured with `.github/workflows/deploy.yml` to build and publish production bundles to GitHub Pages on every push to `main`.

---

## Tech Stack

- **Frontend:** React, JavaScript (ES6+), JSX, HTML5, CSS3 (Flexbox, CSS Grid, Media Queries)
- **Build Tool:** Vite
- **Version Control & CI/CD:** Git, GitHub, GitHub Actions, GitHub Pages

---

## Getting Started (Local Setup)

1. Clone the repository:
   git clone [https://github.com/mertefe-dev/portfolio.git](https://github.com/mertefe-dev/portfolio.git)
   cd portfolio

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Create a production build:
   npm run build

---

## References & AI Usage Disclosure

- **Official Documentation:** React Docs ([https://react.dev/learn](https://react.dev/learn)), Vite Static Deploy Guide ([https://vite.dev/guide/static-deploy](https://vite.dev/guide/static-deploy)), and GitHub Actions Documentation ([https://docs.github.com/en/actions](https://docs.github.com/en/actions)) were used as primary references for component design, `base` path configuration, and CI/CD workflow setup.
- **AI Assistance:** Gemini was used as a technical thought partner during development for debugging CSS layout responsiveness, structuring the `ProjectCard` component refactor, troubleshooting the initial GitHub Pages `HttpError: Not Found` configuration, and reviewing technical documentation structure. All source code, architectural choices, and report explanations were reviewed, tested, and verified by the author.