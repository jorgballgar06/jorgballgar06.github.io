const projects = [
  {
    title: "Dragon Ball Atlas",
    category: "Web app",
    description: "Explorador de personajes con fichas visuales, datos y navegación rápida.",
    tech: ["HTML", "CSS", "JavaScript"],
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
    links: [
      { label: "Demo", href: "./demos/micro-saas-store-generator/index.html" },
      { label: "GitHub", href: "https://github.com/jorgballgar06" }
    ]
  }
];

const education = [
  {
    title: "Primer curso",
    subtitle: "Base matemática, programación y datos",
    items: [
      "Álgebra",
      "Análisis matemático",
      "Matemática discreta",
      "Fundamentos de la programación",
      "Bases de datos",
      "Probabilidad y simulación",
      "Estructuras de datos y algoritmos",
      "Optimización",
      "Tratamiento de los datos"
    ]
  },
  {
    title: "Segundo curso",
    subtitle: "Más estadística, sistemas y análisis aplicado",
    items: [
      "Inferencia estadística",
      "Aspectos legales sobre datos",
      "Señales y sistemas",
      "Gestión de datos",
      "Infraestructura de almacenamiento de datos",
      "Modelos lineales",
      "Procesado de imágenes",
      "Redes y seguridad",
      "Programación paralela",
      "Visualización de datos"
    ]
  }
];

const stackGroups = [
  {
    title: "Programación",
    items: ["Python", "R", "SQL", "JavaScript"]
  },
  {
    title: "Datos y estadística",
    items: ["Estadística", "Inferencia", "Modelos lineales", "Visualización de datos", "Tratamiento de datos"]
  },
  {
    title: "Herramientas",
    items: ["MongoDB", "Cassandra", "Wireshark", "Cisco Packet Tracer", "NetINVM", "Git y GitHub"]
  }
];

const projectsGrid = document.getElementById("projects-grid");
const educationList = document.getElementById("education-list");
const stackGroupsEl = document.getElementById("stack-groups");

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const techTags = project.tech.map((item) => `<span class="pill">${item}</span>`).join("");
  const linkTags = project.links.map((link, index) => {
    const primaryClass = index === 0 ? " project-card__link--primary" : "";
    const external = link.href.startsWith("http");
    return `<a class="project-card__link${primaryClass}" href="${link.href}" target="${external ? "_blank" : "_self"}" rel="${external ? "noreferrer" : ""}">${link.label}</a>`;
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

function renderEducation() {
  educationList.innerHTML = education
    .map((section) => {
      const items = section.items.map((item) => `<li>${item}</li>`).join("");
      return `
        <article class="timeline-card">
          <p class="eyebrow">${section.title}</p>
          <h3>${section.subtitle}</h3>
          <ul class="timeline-list">${items}</ul>
        </article>
      `;
    })
    .join("");
}

function renderStackGroups() {
  stackGroupsEl.innerHTML = stackGroups
    .map((group) => {
      const items = group.items.map((item) => `<span class="chip">${item}</span>`).join("");
      return `
        <article class="stack-card">
          <p class="eyebrow">${group.title}</p>
          <div class="chips">${items}</div>
        </article>
      `;
    })
    .join("");
}

renderProjects();
renderEducation();
renderStackGroups();
