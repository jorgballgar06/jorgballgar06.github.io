const projects = [
  {
    title: "Dragon Ball Atlas",
    category: "Web app",
    description: "Explorador de personajes con fichas visuales, datos y navegación rápida.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "./demos/dragon-ball-atlas/index.html",
    links: [
      { label: "Demo", href: "./demos/dragon-ball-atlas/index.html" },
      { label: "GitHub", href: "https://github.com/jorgballgar06" }
    ]
  },
  {
    title: "Weather Week",
    category: "Dashboard",
    description: "Aplicación para ver el tiempo semanal con búsqueda de ciudades y comparación.",
    tech: ["Open-Meteo", "Canvas", "Vanilla JS"],
    demoUrl: "./demos/weather-week/index.html",
    links: [
      { label: "Demo", href: "./demos/weather-week/index.html" },
      { label: "GitHub", href: "https://github.com/jorgballgar06" }
    ]
  },
  {
    title: "Micro SaaS Generator",
    category: "Tooling",
    description: "Generador de proyectos para crear páginas base y acelerar prototipos.",
    tech: ["Node.js", "Templates", "Automation"],
    demoUrl: "./demos/micro-saas-store-generator/index.html",
    links: [
      { label: "Demo", href: "./demos/micro-saas-store-generator/index.html" },
      { label: "GitHub", href: "https://github.com/jorgballgar06" }
    ]
  }
];

const skills = [
  "HTML semántico",
  "CSS moderno",
  "JavaScript",
  "Responsive design",
  "Accesibilidad",
  "Git y GitHub",
  "APIs REST",
  "UI/UX básico",
  "Landing pages",
  "Portfolios"
];

const projectsGrid = document.getElementById("projects-grid");
const skillsList = document.getElementById("skills-list");

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const techTags = project.tech.map((item) => `<span class="pill">${item}</span>`).join("");
  const linkTags = project.links.map((link, index) => {
    const primaryClass = index === 0 ? " project-card__link--primary" : "";
    return `<a class="project-card__link${primaryClass}" href="${link.href}" target="${link.href.startsWith("http") ? "_blank" : "_self"}" rel="${link.href.startsWith("http") ? "noreferrer" : ""}">${link.label}</a>`;
  }).join("");

  article.innerHTML = `
    <div class="project-card__top">
      <div>
        <p class="eyebrow">${project.category}</p>
        <h3>${project.title}</h3>
      </div>
      <span class="project-card__tag">Live demo</span>
    </div>
    <p>${project.description}</p>
    <div class="project-card__meta">${techTags}</div>
    <div class="project-card__links">${linkTags}</div>
  `;

  return article;
}

function renderProjects() {
  projectsGrid.innerHTML = "";
  projects.forEach((project) => {
    projectsGrid.appendChild(createProjectCard(project));
  });
}

function renderSkills() {
  skillsList.innerHTML = skills.map((skill) => `<span class="chip">${skill}</span>`).join("");
}

renderProjects();
renderSkills();
