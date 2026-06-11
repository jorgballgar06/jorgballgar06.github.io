const form = document.getElementById("form");
const ideaInput = document.getElementById("idea");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("result");
const jsonBox = document.getElementById("json");
const pathsBox = document.getElementById("paths");

function buildMockStore(idea) {
  const title = idea
    .replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ") || "Mi tienda";

  return {
    brand: title,
    tagline: `Una demo estática para ${idea}.`,
    sections: [
      "Hero con propuesta de valor",
      "Catálogo de productos",
      "Testimonios y confianza",
      "CTA final de conversión"
    ],
    palette: ["#0f172a", "#66e3ff", "#f3b86b", "#8ff0c3"],
    features: [
      "Landing page lista para vender",
      "Copy orientado a conversión",
      "Base visual editable en minutos"
    ]
  };
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const idea = ideaInput.value.trim();

  if (!idea) {
    statusBox.textContent = "Escribe una idea para generar la tienda.";
    return;
  }

  statusBox.textContent = "Generando tienda demo...";
  resultBox.classList.add("hidden");

  const storeData = buildMockStore(idea);

  statusBox.textContent = "Tienda demo generada correctamente.";
  jsonBox.textContent = JSON.stringify(storeData, null, 2);
  pathsBox.textContent = "Proyecto demo estático integrado en el portfolio.";
  resultBox.classList.remove("hidden");
});
