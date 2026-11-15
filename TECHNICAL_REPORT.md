# Technical Report: React Portfolio Development & GitHub Pages Deployment

**Author:** Mert Efe Yüksel  
**Program:** IEEE İKÇÜ TechOps — Weekly Task #01  
**Live URL:** https://mertefe-dev.github.io/portfolio/  
**Repository URL:** https://github.com/mertefe-dev/portfolio  

---

## 5.1. Project Introduction

The primary objective of this project is to design, develop, and deploy a responsive personal portfolio web application using **React** and **Vite**, while gaining hands-on experience with modern frontend component architecture, Git branch/Pull Request workflows, and automated CI/CD deployment via **GitHub Actions** and **GitHub Pages**.

The application presents my academic background as a first-year Computer Engineering student at İzmir Kâtip Çelebi Üniversitesi, my technical skills, software development projects, and direct contact channels. Structurally, it is built as a single-page application (SPA) featuring smooth anchor navigation (`#about`, `#projects`, `#contact`), a custom interactive dot-grid background, responsive cards, and category-based project filtering.

---

## 5.2. Technologies & Architecture

### Why React and Vite Were Chosen
- **React:** React was selected for its declarative, component-based architecture. Instead of manually querying and mutating DOM nodes when data or UI state changes, React allows the interface to be broken into isolated, reusable units whose rendering is driven predictably by `props` and `state`.
- **Vite:** Vite serves as both the local development server and the production bundler. During development, it uses native ES modules for near-instant server startup and Hot Module Replacement (HMR). For deployment, it bundles and minifies JavaScript and CSS assets into an optimized `dist/` directory.

### Component Architecture, Props, and State
The application is divided into 8 modular components inside `src/components/`:
- `Navbar.jsx` & `Hero.jsx`: Top navigation bar and landing introduction.
- `About.jsx`: Academic profile, engineering focus, and categorized skill cards rendered dynamically via `.map()`.
- `Projects.jsx`: Manages project data and interactive category filtering (`All`, `Web Development`, `Systems & C`) using the `useState` hook (`selectedCategory`).
- `ProjectCard.jsx`: A reusable child component that receives `title`, `category`, `description`, `githubUrl`, and `tags` via `props` from `Projects.jsx`.
- `Contact.jsx` & `Footer.jsx`: Direct links to Email, LinkedIn, and GitHub profiles.
- `DotBackground.jsx`: Visual background layer enhancing UI depth.

### Folder Structure
- `.github/workflows/deploy.yml`: GitHub Actions CI/CD workflow
- `public/`: Static public assets
- `src/assets/`: Media and static resources
- `src/components/`: Modular React UI components (`About.jsx`, `Contact.jsx`, `DotBackground.jsx`, `Footer.jsx`, `Hero.jsx`, `Navbar.jsx`, `ProjectCard.jsx`, `Projects.jsx`)
- `src/App.jsx`: Root layout assembling all sections
- `src/index.css`: Global styles, CSS variables, and media queries
- `src/main.jsx`: React DOM entry point
- `index.html`, `package.json`, `vite.config.js`, `README.md`, `TECHNICAL_REPORT.md`

---

## 5.3. Version Control

Git and GitHub were used throughout the development lifecycle to track incremental progress, isolate documentation updates, and maintain a clean commit history.

- **Branches Created:**
  - `main`: The primary production branch connected to the GitHub Actions deployment pipeline.
  - `docs/add-report-and-readme`: A dedicated feature/documentation branch created via `git checkout -b docs/add-report-and-readme` to prepare `README.md` and `TECHNICAL_REPORT.md` before merging into `main`.
- **Pull Request Process:** After committing the documentation files on `docs/add-report-and-readme` and pushing the branch to GitHub, a Pull Request was opened targeting `main`, reviewed for completeness, and merged into `main`, which automatically triggered a new GitHub Actions deployment.
- **Sample Commit History:**
  - `chore: initialize React portfolio with Vite`
  - `Initial portfolio structure`
  - `Finalize dark-mode portfolio layout`
  - `feat: add dynamic project filtering and github actions deployment`
  - `docs: add technical report and update README`

---

## 5.4. Deployment & CI/CD

### Development Server vs. Production Build
During local development (`npm run dev`), Vite serves unbundled source files directly over native ES modules so edits reflect instantaneously in the browser without rebuilding the entire app. In contrast, `npm run build` compiles JSX, bundles JavaScript modules, resolves CSS imports, minifies code, and generates hashed, cache-friendly static files inside the `dist/` folder suitable for public web servers.

### GitHub Actions Workflow & GitHub Pages Delivery
The workflow defined in `.github/workflows/deploy.yml` automates the entire build-and-release pipeline whenever code is pushed to `main`:
1. **Checkout (`actions/checkout@v4`):** Clones the repository onto an Ubuntu runner.
2. **Setup Node (`actions/setup-node@v4`):** Installs the LTS version of Node.js and caches npm dependencies.
3. **Install & Build:** Runs `npm ci` for deterministic dependency installation followed by `npm run build` to produce `./dist`.
4. **Configure & Upload Artifact (`configure-pages@v5`, `upload-pages-artifact@v3`):** Prepares GitHub Pages metadata and packages the `./dist` directory as a deployment artifact.
5. **Deploy (`deploy-pages@v4`):** Publishes the artifact to GitHub Pages, serving the site over HTTPS at `https://mertefe-dev.github.io/portfolio/`.

---

## 5.5. Technical Challenges

### Challenge 1: GitHub Actions Deployment Failing with `HttpError: Not Found`
- **Problem:** On the initial push containing `.github/workflows/deploy.yml`, the `build` job failed during the `Setup Pages` step with `HttpError: Not Found`.
- **Detection:** Inspected the failed run logs and annotations under the repository's **Actions** tab on GitHub.
- **Investigation & Solution:** Checked GitHub Pages documentation and repository settings, realizing that GitHub Pages had not yet been enabled with **GitHub Actions** as the build source prior to the first workflow trigger. Navigated to **Settings → Pages**, switched the source from *Deploy from a branch* to *GitHub Actions*, and re-ran the failed workflow jobs.
- **Verification:** Confirmed that both `build` and `deploy` jobs completed with green checkmarks and verified the live site loaded properly at `https://mertefe-dev.github.io/portfolio/`.

### Challenge 2: Subpath Asset Resolution on GitHub Pages (`/portfolio/`)
- **Problem:** Unlike local development where the app runs at the root path (`/`), project repositories hosted on GitHub Pages are served under a repository subpath (`/portfolio/`), which causes root-relative asset requests to break if not configured.
- **Detection:** Identified during deployment preparation when reviewing Vite's static deployment guidelines.
- **Investigation & Solution:** Reviewed the official Vite Static Deploy documentation and configured `base: '/portfolio/'` inside `vite.config.js` so all generated script and stylesheet URLs resolve relative to the repository subpath.
- **Verification:** Tested the production build and verified in browser DevTools that all CSS styles, fonts, and JavaScript bundles loaded with HTTP 200 status codes on the live URL.

---

## 5.6. Technical Questions

### 1. What is the fundamental difference between developing an interface with React versus vanilla JavaScript?
Vanilla JavaScript uses an **imperative** approach: the developer must manually select DOM elements (`document.querySelector`), attach event listeners, and explicitly mutate the DOM whenever data changes. React uses a **declarative** and component-based approach: you describe what the UI should look like for a given state, and React efficiently updates only the necessary parts of the DOM via its Virtual DOM reconciliation process when state or props change.

### 2. What are components and props used for in React?
**Components** are independent, reusable building blocks of a user interface (such as `Navbar` or `ProjectCard`) that encapsulate their own structure, logic, and styling. **Props** (properties) are read-only inputs passed from a parent component to a child component, allowing the same component structure to display different data dynamically.

### 3. What is the purpose of using `useState`?
`useState` is a React Hook that allows functional components to store and track mutable data (state) across renders. Whenever the state setter function is called (for example, clicking a category filter button), React re-renders the component so the UI immediately reflects the updated state.

### 4. What are the roles of `package.json` and `package-lock.json`?
`package.json` is the project's manifest file; it defines project metadata, runnable scripts (`dev`, `build`, `lint`), and the list of required dependencies with acceptable version ranges. `package-lock.json` records the exact resolved version and integrity hash of every installed package and sub-dependency, ensuring consistent, reproducible installations across different machines and CI environments (`npm ci`).

### 5. What is the difference between `npm run dev` and `npm run build`?
`npm run dev` starts Vite's local development server with instant Hot Module Replacement (HMR) and unminified code for fast debugging. `npm run build` compiles, bundles, and minifies the entire application into optimized static files inside the `dist/` folder ready for production hosting.

### 6. What is the difference between Git and GitHub?
**Git** is a distributed version control system installed locally on a developer's machine to track file changes, manage commits, and handle branches offline or online. **GitHub** is a cloud-based hosting platform built around Git that stores remote repositories and adds collaboration and automation tools such as Pull Requests, Issues, GitHub Actions, and GitHub Pages.

### 7. What different roles do GitHub Actions and GitHub Pages perform?
**GitHub Actions** is a CI/CD automation engine that executes scripted workflows (installing dependencies, running tests, building the Vite project) in response to repository events like a `push`. **GitHub Pages** is a static web hosting service that takes the resulting static files (`HTML`, `CSS`, `JS`) and serves them publicly over HTTPS.

### 8. What does CI/CD stand for and mean?
**CI/CD** stands for **Continuous Integration** and **Continuous Deployment** (or Continuous Delivery). Continuous Integration automatically builds and validates code changes whenever developers push or merge code, while Continuous Deployment automatically publishes those verified builds to the live production environment without manual file uploads.

### 9. Why might a website work on `localhost` but fail on GitHub Pages?
Common reasons include: (1) an incorrect or missing `base` path in `vite.config.js`, causing assets to be requested from `/` instead of `/<repo-name>/`; (2) case-sensitivity differences in file imports (Windows/macOS file systems are case-insensitive, whereas GitHub's Linux servers are strictly case-sensitive); or (3) using client-side routing paths without proper fallback handling on a static host.

### 10. When a website URL is entered into a browser, what happens across DNS, HTTP, and the server?
First, the browser checks its cache and queries **DNS** (Domain Name System) to translate the human-readable domain name (`mertefe-dev.github.io`) into the server's IP address. Next, the browser establishes a TCP connection and performs a TLS handshake for **HTTPS**, then sends an HTTP `GET` request for `/portfolio/`. Finally, GitHub Pages' web server locates the static `index.html` and bundled assets, returns them with an `HTTP 200 OK` response, and the browser parses the HTML, executes the React JavaScript bundle, and renders the page.

---

## 5.7. References & Learning Resources Used

- **React Official Documentation (`https://react.dev/learn` & `https://react.dev/learn/adding-interactivity`):** Used to structure functional components, pass data via `props`, render lists with `.map()`, and manage interactive category state with `useState`.
- **Vite Documentation (`https://vite.dev/guide/` & `https://vite.dev/guide/static-deploy`):** Used to configure the development environment, understand production bundling, and set up the `base: '/portfolio/'` path for GitHub Pages.
- **GitHub Actions & GitHub Pages Documentation (`https://docs.github.com/en/actions` & `https://docs.github.com/en/pages`):** Used to configure the `.github/workflows/deploy.yml` CI/CD pipeline and enable GitHub Actions as the Pages deployment source.
- **MDN Web Docs (`https://developer.mozilla.org/en-US/docs/Learn_web_development`):** Referenced for semantic HTML5 elements, CSS Flexbox/Grid layouts, and responsive media queries.

---

## 5.8. Conclusion

- **Three Key Technical Concepts Learned This Week:**
  1. Breaking down a user interface into reusable React components connected via `props` and `useState`.
  2. Managing clean feature branches and Pull Requests in Git/GitHub.
  3. Automating production builds and static deployments with GitHub Actions and GitHub Pages.
- **Most Challenging Stage:** Configuring the CI/CD pipeline and resolving the initial GitHub Pages deployment permissions (`HttpError: Not Found`) alongside subpath routing (`base: '/portfolio/'`).
- **Skills to Develop in the Next Project:** Implementing client-side multi-page routing (React Router), connecting a backend REST API to fetch dynamic project data, and adding automated unit tests.