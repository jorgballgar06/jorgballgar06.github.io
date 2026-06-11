const projects = [
  {
    title: "Dragon Ball Atlas",
    category: "Web app",
    description: "Explorador de personajes con fichas visuales, datos y navegación rápida.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "Demo", href: "#" },
      { label: "GitHub", href: "#" }
    ]
  },
  {
    title: "Weather Week",
    category: "Dashboard",
    description: "Aplicación para ver el tiempo semanal con búsqueda de ciudades y comparación.",
    tech: ["Open-Meteo", "Canvas", "Vanilla JS"],
    links: [
      { label: "Demo", href: "#" },
      { label: "GitHub", href: "#" }
    ]
  },
  {
    title: "Micro SaaS Generator",
    category: "Tooling",
    description: "Generador de proyectos para crear páginas base y acelerar prototipos.",
    tech: ["Node.js", "Templates", "Automation"],
    links: [
      { label: "Demo", href: "#" },
      { label: "GitHub", href: "#" }
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
  const linkTags = project.links.map((link) => `<a href="${link.href}">${link.label}</a>`).join("");

  article.innerHTML = `
    <div class="project-card__top">
      <div>
        <p class="eyebrow">${project.category}</p>
        <h3>${project.title}</h3>
      </div>
      <span class="project-card__tag">Featured</span>
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
