const statusEl = document.getElementById("status");
const cardsEl = document.getElementById("cards");
const summaryEl = document.getElementById("summary");
const legendEl = document.getElementById("legend");
const cityForm = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");
const compareForm = document.getElementById("compare-form");
const compareInput = document.getElementById("compare-input");
const clearCompareBtn = document.getElementById("clear-compare-btn");
const locationBtn = document.getElementById("location-btn");
const quoteStyleSelect = document.getElementById("quote-style");
const chartCanvas = document.getElementById("forecast-chart");
const chartTooltip = document.getElementById("chart-tooltip");
const chartSection = document.querySelector(".chart");
const themeBtn = document.getElementById("theme-btn");

const appState = {
  primary: null,
  compare: null,
  theme: localStorage.getItem("weather-week-theme") || "dark",
  quoteStyle: localStorage.getItem("weather-week-quote-style") || "motivadora",
  chartMeta: null,
  activeTooltipIndex: null
};

const codeMap = {
  0: ["Despejado", "☀️"],
  1: ["Mayormente despejado", "🌤️"],
  2: ["Parcialmente nublado", "⛅"],
  3: ["Nublado", "☁️"],
  45: ["Niebla", "🌫️"],
  48: ["Niebla con escarcha", "🌫️"],
  51: ["Llovizna ligera", "🌦️"],
  53: ["Llovizna", "🌦️"],
  55: ["Llovizna intensa", "🌧️"],
  61: ["Lluvia ligera", "🌦️"],
  63: ["Lluvia", "🌧️"],
  65: ["Lluvia intensa", "🌧️"],
  71: ["Nieve ligera", "🌨️"],
  73: ["Nieve", "❄️"],
  75: ["Nieve intensa", "❄️"],
  80: ["Chubascos ligeros", "🌦️"],
  81: ["Chubascos", "🌧️"],
  82: ["Chubascos fuertes", "⛈️"],
  95: ["Tormenta", "⛈️"]
};

const quoteCatalogByStyle = {
  motivadora: {
    freezing: [
      "Cada paso en frío forja un carácter más fuerte.",
      "Hasta el día más helado cede ante tu constancia.",
      "Respira hondo: el invierno también entrena campeones.",
      "El frío afina el enfoque y enciende la disciplina."
    ],
    cold: [
      "Hoy la calma es tu mejor abrigo para avanzar.",
      "Día fresco, mente clara, metas más cerca.",
      "Pequeños avances constantes vencen cualquier cuesta.",
      "La energía se construye empezando, no esperando."
    ],
    fresh: [
      "Temperatura ideal para empezar eso que posponías.",
      "Un día templado pide una versión valiente de ti.",
      "Haz algo simple hoy, y mañana será más fácil.",
      "La motivación llega después del primer paso."
    ],
    warm: [
      "Con este buen tiempo, tu mejor momento es ahora.",
      "Aprovecha la luz del día para mover tus ideas.",
      "Hoy todo invita a crecer un poco más.",
      "Cuando el clima acompaña, la excusa se queda corta."
    ],
    hot: [
      "Alta temperatura, alta actitud: avanza con intención.",
      "Que el calor te recuerde que ya llevas fuego dentro.",
      "Hidrátate, respira, y sigue construyendo.",
      "Incluso en días intensos, tu enfoque marca la diferencia."
    ],
    rainy: [
      "Que la lluvia marque el ritmo, no tus límites.",
      "Bajo nubes también nacen grandes ideas.",
      "Los días grises son perfectos para sembrar progreso.",
      "Si llueve fuera, enciende tu impulso por dentro."
    ]
  },
  zen: {
    freezing: [
      "El silencio del frío también trae claridad.",
      "Respira lento: incluso el hielo se transforma.",
      "Hoy abriga tu mente con paciencia.",
      "La quietud del invierno también es progreso."
    ],
    cold: [
      "Paso a paso, sin prisa, ya estás llegando.",
      "Un día fresco invita a ordenar el corazón.",
      "Lo simple y constante siempre florece.",
      "Menos ruido, más intención."
    ],
    fresh: [
      "Hoy todo está en equilibrio: disfruta el proceso.",
      "Respira, avanza, agradece.",
      "El ritmo sereno también crea grandes cambios.",
      "Que tu foco sea suave y firme a la vez."
    ],
    warm: [
      "Deja que la luz te recuerde lo esencial.",
      "Un día cálido para cuidar tu energía.",
      "La calma también puede ser valiente.",
      "Hoy elige paz y movimiento al mismo tiempo."
    ],
    hot: [
      "En días intensos, el equilibrio es tu refugio.",
      "Bebe agua, baja el ritmo y mantén el centro.",
      "La serenidad también vence al calor.",
      "Respirar profundo también es avanzar."
    ],
    rainy: [
      "La lluvia limpia caminos por dentro y por fuera.",
      "Bajo nubes, cultiva calma.",
      "Cada gota recuerda que todo cambia.",
      "En días grises, tu paz puede brillar."
    ]
  },
  corta: {
    freezing: ["Sigue firme.", "Frío, foco y fuerza.", "Respira y avanza.", "Constancia hoy."],
    cold: ["Paso corto, gran avance.", "Calma y acción.", "Hoy sumas.", "Mente clara."],
    fresh: ["Día ideal para empezar.", "Hazlo simple.", "Un paso más.", "Hoy toca avanzar."],
    warm: ["Brilla y actúa.", "Aprovecha el impulso.", "Hoy es buen día.", "Muévete con ganas."],
    hot: ["Hidrátate y sigue.", "Con calma, pero firme.", "Fuego interno.", "Ritmo inteligente."],
    rainy: ["La lluvia no frena.", "Sigue bajo nubes.", "Hoy también cuenta.", "Progreso en gris."]
  }
};

function setStatus(message) {
  statusEl.textContent = message;
}

function weatherLabel(code) {
  return codeMap[code] || ["Condición desconocida", "🌡️"];
}

function getDailyQuote(maxTemp, minTemp, rainChance, index) {
  const avgTemp = (maxTemp + minTemp) / 2;
  let bucket = "fresh";

  if (rainChance >= 70) {
    bucket = "rainy";
  } else if (avgTemp <= 2) {
    bucket = "freezing";
  } else if (avgTemp <= 10) {
    bucket = "cold";
  } else if (avgTemp <= 19) {
    bucket = "fresh";
  } else if (avgTemp <= 29) {
    bucket = "warm";
  } else {
    bucket = "hot";
  }

  const style = quoteCatalogByStyle[appState.quoteStyle] ? appState.quoteStyle : "motivadora";
  const quotes = quoteCatalogByStyle[style][bucket];
  const seed = Math.abs(maxTemp) + Math.abs(minTemp) + Math.round(rainChance / 10) + index;
  return quotes[seed % quotes.length];
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return {
    weekday: new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(date),
    short: new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(date)
  };
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((acc, current) => acc + current, 0) / values.length;
}

function applyTheme(theme) {
  appState.theme = theme;
  document.body.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Modo claro" : "Modo oscuro";
  localStorage.setItem("weather-week-theme", theme);
}

function applyQuoteStyle(style) {
  const validStyle = quoteCatalogByStyle[style] ? style : "motivadora";
  appState.quoteStyle = validStyle;
  quoteStyleSelect.value = validStyle;
  localStorage.setItem("weather-week-quote-style", validStyle);
}

function hideTooltip() {
  chartTooltip.hidden = true;
  appState.activeTooltipIndex = null;
}

function setTooltipPosition(clientX, clientY) {
  const sectionRect = chartSection.getBoundingClientRect();
  const localX = clientX - sectionRect.left;
  const localY = clientY - sectionRect.top;
  const pad = 12;
  const width = chartTooltip.offsetWidth;
  const height = chartTooltip.offsetHeight;

  let left = localX + 14;
  let top = localY - height - 14;

  if (left + width + pad > sectionRect.width) {
    left = sectionRect.width - width - pad;
  }
  if (left < pad) {
    left = pad;
  }
  if (top < pad) {
    top = localY + 14;
  }
  if (top + height + pad > sectionRect.height) {
    top = sectionRect.height - height - pad;
  }

  chartTooltip.style.left = `${left}px`;
  chartTooltip.style.top = `${top}px`;
}

function renderTooltip(index, clientX, clientY) {
  if (!appState.chartMeta) return;

  const { primary, compare } = appState.chartMeta;
  const dateData = formatDate(primary.time[index]);
  const quote = getDailyQuote(primary.max[index], primary.min[index], primary.rain[index], index);

  let html = `
    <strong>${dateData.weekday.charAt(0).toUpperCase() + dateData.weekday.slice(1)} (${dateData.short})</strong>
    ${primary.locationName}: ${primary.max[index]}° / ${primary.min[index]}°<br>
    Lluvia: ${primary.rain[index]}%<br>
    <em>"${quote}"</em>
  `;

  if (compare) {
    html += `<br>${compare.locationName}: ${compare.max[index]}° / ${compare.min[index]}°`;
  }

  chartTooltip.innerHTML = html;
  chartTooltip.hidden = false;
  appState.activeTooltipIndex = index;
  setTooltipPosition(clientX, clientY);
}

function findNearestIndex(clientX) {
  if (!appState.chartMeta?.xPoints?.length) return -1;

  const rect = chartCanvas.getBoundingClientRect();
  const x = clientX - rect.left;

  let nearestIndex = -1;
  let nearestDistance = Infinity;

  appState.chartMeta.xPoints.forEach((pointX, index) => {
    const distance = Math.abs(pointX - x);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  if (nearestDistance > 36) {
    return -1;
  }

  return nearestIndex;
}

function handlePointerMove(clientX, clientY) {
  const index = findNearestIndex(clientX);
  if (index === -1) {
    hideTooltip();
    return;
  }

  renderTooltip(index, clientX, clientY);
}

function attachChartInteractions() {
  chartCanvas.addEventListener("mousemove", (event) => {
    handlePointerMove(event.clientX, event.clientY);
  });

  chartCanvas.addEventListener("mouseleave", () => {
    hideTooltip();
  });

  chartCanvas.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    handlePointerMove(touch.clientX, touch.clientY);
  }, { passive: true });

  chartCanvas.addEventListener("touchend", () => {
    hideTooltip();
  });
}

function renderSummary(max, min, rain) {
  const hottest = Math.max(...max);
  const coldest = Math.min(...min);
  const rainiest = Math.max(...rain);

  summaryEl.innerHTML = `
    <article class="metric">
      <p class="metric__label">Media máxima</p>
      <p class="metric__value">${Math.round(average(max))}°C</p>
    </article>
    <article class="metric">
      <p class="metric__label">Media mínima</p>
      <p class="metric__value">${Math.round(average(min))}°C</p>
    </article>
    <article class="metric">
      <p class="metric__label">Día más cálido</p>
      <p class="metric__value">${Math.round(hottest)}°C</p>
    </article>
    <article class="metric">
      <p class="metric__label">Pico de lluvia</p>
      <p class="metric__value">${Math.round(rainiest)}%</p>
    </article>
    <article class="metric">
      <p class="metric__label">Día más frío</p>
      <p class="metric__value">${Math.round(coldest)}°C</p>
    </article>
  `;
}

function drawLine(ctx, points, color, dashed = false) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.setLineDash(dashed ? [8, 6] : []);
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();
  ctx.setLineDash([]);

  points.forEach((point) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(point.x, point.y, 3.4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawBars(ctx, points, color, baseY) {
  ctx.fillStyle = color;
  points.forEach((point) => {
    const width = 10;
    const height = Math.max(2, baseY - point.y);
    ctx.fillRect(point.x - width / 2, point.y, width, height);
  });
}

function renderLegend() {
  const primaryName = appState.primary?.locationName || "ciudad principal";
  const compareName = appState.compare?.locationName;

  let legendHtml = `
    <span><i class="dot dot--max"></i>Máxima ${primaryName}</span>
    <span><i class="dot dot--min"></i>Mínima ${primaryName}</span>
    <span><i class="dot dot--rain"></i>Lluvia ${primaryName}</span>
  `;

  if (compareName) {
    legendHtml += `
      <span><i class="dot dot--cmp-max"></i>Máxima ${compareName}</span>
      <span><i class="dot dot--cmp-min"></i>Mínima ${compareName}</span>
    `;
  }

  legendEl.innerHTML = legendHtml;
}

function drawChart(primary, compare = null) {
  const ctx = chartCanvas.getContext("2d");
  const width = chartCanvas.clientWidth;
  const height = chartCanvas.clientHeight;
  const dpr = window.devicePixelRatio || 1;

  chartCanvas.width = Math.floor(width * dpr);
  chartCanvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const padding = { top: 24, right: 18, bottom: 36, left: 28 };
  const drawableWidth = width - padding.left - padding.right;
  const drawableHeight = height - padding.top - padding.bottom;

  const allTemp = primary.max.concat(primary.min, compare ? compare.max.concat(compare.min) : []);
  const tempMin = Math.min(...allTemp) - 2;
  const tempMax = Math.max(...allTemp) + 2;

  const xAt = (index) => padding.left + (drawableWidth / (primary.days.length - 1 || 1)) * index;
  const yTemp = (value) => padding.top + (1 - (value - tempMin) / (tempMax - tempMin || 1)) * drawableHeight;
  const yRain = (value) => padding.top + (1 - value / 100) * drawableHeight;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (drawableHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "600 12px Nunito";
  primary.days.forEach((day, index) => {
    const x = xAt(index);
    const label = day.slice(0, 3);
    ctx.fillText(label, x - 10, height - 14);
  });

  const maxPoints = primary.max.map((value, index) => ({ x: xAt(index), y: yTemp(value) }));
  const minPoints = primary.min.map((value, index) => ({ x: xAt(index), y: yTemp(value) }));
  const rainPoints = primary.rain.map((value, index) => ({ x: xAt(index), y: yRain(value) }));

  drawBars(ctx, rainPoints, "rgba(123, 97, 255, 0.34)", padding.top + drawableHeight);
  drawLine(ctx, maxPoints, getComputedStyle(document.body).getPropertyValue("--hot").trim() || "#ff8a00");
  drawLine(ctx, minPoints, getComputedStyle(document.body).getPropertyValue("--cold").trim() || "#4fc3f7");

  if (compare) {
    const cmpMax = compare.max.map((value, index) => ({ x: xAt(index), y: yTemp(value) }));
    const cmpMin = compare.min.map((value, index) => ({ x: xAt(index), y: yTemp(value) }));
    drawLine(ctx, cmpMax, getComputedStyle(document.body).getPropertyValue("--cmp-hot").trim() || "#f94144", true);
    drawLine(ctx, cmpMin, getComputedStyle(document.body).getPropertyValue("--cmp-cold").trim() || "#43aa8b", true);
  }

  appState.chartMeta = {
    xPoints: primary.days.map((_, index) => xAt(index)),
    primary,
    compare
  };

  if (appState.activeTooltipIndex !== null) {
    hideTooltip();
  }
}

function parseDaily(daily) {
  const result = { days: [], max: [], min: [], rain: [], codes: [], time: [] };
  daily.time.slice(0, 7).forEach((day, idx) => {
    const { weekday } = formatDate(day);
    result.days.push(weekday.charAt(0).toUpperCase() + weekday.slice(1));
    result.max.push(Math.round(daily.temperature_2m_max[idx]));
    result.min.push(Math.round(daily.temperature_2m_min[idx]));
    result.rain.push(daily.precipitation_probability_max[idx] ?? 0);
    result.codes.push(daily.weather_code[idx]);
    result.time.push(day);
  });
  return result;
}

function renderPrimaryCards(primary) {
  cardsEl.innerHTML = "";
  primary.time.forEach((day, idx) => {
    const { weekday, short } = formatDate(day);
    const [label, icon] = weatherLabel(primary.codes[idx]);
    const quote = getDailyQuote(primary.max[idx], primary.min[idx], primary.rain[idx], idx);

    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${idx * 70}ms`;
    card.innerHTML = `
      <h2>${weekday.charAt(0).toUpperCase() + weekday.slice(1)}</h2>
      <p class="date">${short}</p>
      <p><span class="weather-icon">${icon}</span>${label}</p>
      <p class="temp">${primary.max[idx]}° / ${primary.min[idx]}°</p>
      <p class="details">Prob. lluvia: ${primary.rain[idx]}%</p>
      <p class="quote">"${quote}"</p>
    `;

    cardsEl.appendChild(card);
  });
}

function renderAll() {
  if (!appState.primary) return;

  renderPrimaryCards(appState.primary);
  renderSummary(appState.primary.max, appState.primary.min, appState.primary.rain);
  renderLegend();
  drawChart(appState.primary, appState.compare);
}

function buildForecast(locationName, daily) {
  const week = parseDaily(daily);
  return {
    locationName,
    ...week
  };
}

async function fetchForecast(latitude, longitude, locationName) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto"
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el pronóstico.");
  }

  const data = await response.json();

  if (!data.daily?.time?.length) {
    throw new Error("La API devolvió datos incompletos.");
  }

  return buildForecast(locationName, data.daily);
}

async function geocodeCity(city) {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: "es",
    format: "json"
  });

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`);

  if (!response.ok) {
    throw new Error("No se pudo buscar la ciudad.");
  }

  const data = await response.json();
  const result = data.results?.[0];

  if (!result) {
    throw new Error("No encontré esa ciudad. Intenta con otro nombre.");
  }

  const locationName = [result.name, result.admin1, result.country].filter(Boolean).join(", ");
  return {
    latitude: result.latitude,
    longitude: result.longitude,
    locationName
  };
}

cityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    setStatus("Escribe una ciudad para buscar.");
    return;
  }

  try {
    setStatus("Cargando pronóstico...");
    const coords = await geocodeCity(city);
    const forecast = await fetchForecast(coords.latitude, coords.longitude, coords.locationName);
    appState.primary = forecast;
    appState.compare = null;
    hideTooltip();
    renderAll();
    setStatus(`Mostrando pronóstico para ${coords.locationName}.`);
  } catch (error) {
    setStatus(error.message || "Ocurrió un error al consultar el clima.");
  }
});

compareForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!appState.primary) {
    setStatus("Primero busca una ciudad principal.");
    return;
  }

  const city = compareInput.value.trim();
  if (!city) {
    setStatus("Escribe una ciudad para comparar.");
    return;
  }

  try {
    setStatus("Cargando comparación...");
    const coords = await geocodeCity(city);
    appState.compare = await fetchForecast(coords.latitude, coords.longitude, coords.locationName);
    hideTooltip();
    renderAll();
    setStatus(`Comparando ${appState.primary.locationName} con ${coords.locationName}.`);
  } catch (error) {
    setStatus(error.message || "No se pudo comparar la ciudad.");
  }
});

clearCompareBtn.addEventListener("click", () => {
  appState.compare = null;
  hideTooltip();
  renderAll();
  setStatus("Comparación eliminada.");
});

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus("Tu navegador no soporta geolocalización.");
    return;
  }

  setStatus("Obteniendo tu ubicación...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        appState.primary = await fetchForecast(latitude, longitude, "tu ubicación");
        appState.compare = null;
        hideTooltip();
        renderAll();
        setStatus("Mostrando pronóstico para tu ubicación.");
      } catch (error) {
        setStatus(error.message || "No se pudo cargar el pronóstico.");
      }
    },
    () => {
      setStatus("No se pudo acceder a tu ubicación.");
    }
  );
});

quoteStyleSelect.addEventListener("change", () => {
  applyQuoteStyle(quoteStyleSelect.value);
  if (!appState.primary) return;

  hideTooltip();
  renderAll();
  setStatus(`Estilo de citas cambiado a ${quoteStyleSelect.options[quoteStyleSelect.selectedIndex].text.toLowerCase()}.`);
});

themeBtn.addEventListener("click", () => {
  const newTheme = appState.theme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  if (appState.primary) {
    hideTooltip();
    drawChart(appState.primary, appState.compare);
  }
});

window.addEventListener("resize", () => {
  if (!appState.primary) return;
  hideTooltip();
  drawChart(appState.primary, appState.compare);
});

(async () => {
  applyTheme(appState.theme);
  applyQuoteStyle(appState.quoteStyle);
  attachChartInteractions();

  try {
    setStatus("Cargando pronóstico...");
    const madrid = await geocodeCity("Madrid");
    appState.primary = await fetchForecast(madrid.latitude, madrid.longitude, madrid.locationName);
    renderAll();
    setStatus(`Mostrando pronóstico para ${madrid.locationName}.`);
  } catch {
    setStatus("Busca una ciudad para ver el pronóstico semanal.");
  }
})();
