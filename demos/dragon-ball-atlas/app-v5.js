const atlas = window.DBZ_ATLAS_DATA;
const appState = {
  saga: "all",
  query: "",
  cutoffYear: Math.max(...atlas.events.map((event) => event.year)),
  selectedLocationId: atlas.locations[0]?.id || null,
  selectedCharacterId: null,
  selectedView: "location",
  selectedEventId: atlas.events[0]?.id || null,
  markers: new Map()
};

const mapEl = document.getElementById("map");
const searchInput = document.getElementById("search-input");
const searchSummaryEl = document.getElementById("search-summary");
const sagaChipsEl = document.getElementById("saga-chips");
const resetFiltersBtn = document.getElementById("reset-filters");
const yearSlider = document.getElementById("year-slider");
const yearLabel = document.getElementById("year-label");
const cutoffLabel = document.getElementById("cutoff-label");
const timelineEl = document.getElementById("timeline");
const eventCountEl = document.getElementById("event-count");
const locationCardEl = document.getElementById("location-card");
const detailStateEl = document.getElementById("detail-state");
const characterGridEl = document.getElementById("character-grid");
const abilityCloudEl = document.getElementById("ability-cloud");
const relationshipGraphEl = document.getElementById("relationship-graph");
const graphStateEl = document.getElementById("graph-state");
const visibleLocationsEl = document.getElementById("visible-locations");
const visibleEventsEl = document.getElementById("visible-events");
const visibleCharactersEl = document.getElementById("visible-characters");
const visibleAbilitiesEl = document.getElementById("visible-abilities");

const MAP_WIDTH = 2400;
const MAP_HEIGHT = 1600;
const locationById = new Map(atlas.locations.map((location) => [location.id, location]));
const characterById = new Map(atlas.characters.map((character) => [character.id, character]));
const abilityById = new Map(atlas.abilities.map((ability) => [ability.id, ability]));
const eventById = new Map(atlas.events.map((event) => [event.id, event]));

function createMapController(container) {
  container.innerHTML = `
    <div class="map__stage">
      <div class="map__viewport">
        <div class="map__layer map__layer--bg" aria-hidden="true"></div>
        <div class="map__markers" aria-hidden="true"></div>
      </div>
      <div class="map-popup" hidden></div>
      <div class="map-controls" aria-label="Controles del mapa">
        <button class="map-control" type="button" data-zoom-out aria-label="Alejar">−</button>
        <button class="map-control" type="button" data-zoom-in aria-label="Acercar">+</button>
        <button class="map-control map-control--reset" type="button" data-reset-view aria-label="Recentrar">↺</button>
      </div>
    </div>
  `;

  const stage = container.querySelector(".map__stage");
  const viewport = container.querySelector(".map__viewport");
  const markersLayer = container.querySelector(".map__markers");
  const popupEl = container.querySelector(".map-popup");
  const zoomInBtn = container.querySelector("[data-zoom-in]");
  const zoomOutBtn = container.querySelector("[data-zoom-out]");
  const resetBtn = container.querySelector("[data-reset-view]");
  const listeners = {
    click: new Set()
  };
  let popupLocation = null;
  const viewState = {
    scale: 0.82,
    offsetX: 0,
    offsetY: 0
  };
  const dragState = {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getViewportMetrics() {
    const rect = container.getBoundingClientRect();
    const width = MAP_WIDTH * viewState.scale;
    const height = MAP_HEIGHT * viewState.scale;
    return { rect, width, height };
  }

  function positionMarker(markerEl, location) {
    markerEl.style.left = `${location.x}px`;
    markerEl.style.top = `${location.y}px`;
  }

  function positionPopup(location) {
    if (!popupLocation) return;

    const { rect } = getViewportMetrics();
    const popupRect = popupEl.getBoundingClientRect();
    const x = location.x * viewState.scale + viewState.offsetX;
    const y = location.y * viewState.scale + viewState.offsetY;
    let left = x + 18;
    let top = y - popupRect.height - 18;

    if (left + popupRect.width > rect.width - 12) {
      left = rect.width - popupRect.width - 12;
    }

    if (left < 12) {
      left = 12;
    }

    if (top < 12) {
      top = y + 16;
    }

    if (top + popupRect.height > rect.height - 12) {
      top = rect.height - popupRect.height - 12;
    }

    popupEl.style.left = `${left}px`;
    popupEl.style.top = `${top}px`;
  }

  function applyTransform() {
    viewport.style.width = `${MAP_WIDTH}px`;
    viewport.style.height = `${MAP_HEIGHT}px`;
    viewport.style.transform = `translate3d(${viewState.offsetX}px, ${viewState.offsetY}px, 0) scale(${viewState.scale})`;
    if (popupLocation) {
      positionPopup(popupLocation);
    }
  }

  function clampOffsets() {
    const { rect, width, height } = getViewportMetrics();
    const padding = 56;
    if (width + padding * 2 <= rect.width) {
      viewState.offsetX = (rect.width - width) / 2;
    } else {
      const minX = rect.width - width - padding;
      const maxX = padding;
      viewState.offsetX = clamp(viewState.offsetX, minX, maxX);
    }

    if (height + padding * 2 <= rect.height) {
      viewState.offsetY = (rect.height - height) / 2;
    } else {
      const minY = rect.height - height - padding;
      const maxY = padding;
      viewState.offsetY = clamp(viewState.offsetY, minY, maxY);
    }
  }

  function setView(nextScale, nextOffsetX, nextOffsetY) {
    viewState.scale = clamp(nextScale, 0.62, 1.8);
    viewState.offsetX = nextOffsetX;
    viewState.offsetY = nextOffsetY;
    clampOffsets();
    applyTransform();
  }

  function zoomAt(clientX, clientY, nextScale) {
    const { rect } = getViewportMetrics();
    const pointerX = clientX - rect.left;
    const pointerY = clientY - rect.top;
    const beforeX = (pointerX - viewState.offsetX) / viewState.scale;
    const beforeY = (pointerY - viewState.offsetY) / viewState.scale;
    const scale = clamp(nextScale, 0.62, 1.8);
    setView(
      scale,
      pointerX - beforeX * scale,
      pointerY - beforeY * scale
    );
  }

  function resetView() {
    const { rect } = getViewportMetrics();
    const fittedScale = Math.min(
      (rect.width - 72) / MAP_WIDTH,
      (rect.height - 72) / MAP_HEIGHT,
      1
    );
    const scale = clamp(fittedScale, 0.62, 1.05);
    const offsetX = (rect.width - MAP_WIDTH * scale) / 2;
    const offsetY = (rect.height - MAP_HEIGHT * scale) / 2;
    setView(scale, offsetX, offsetY);
  }

  function zoomBy(multiplier) {
    const rect = container.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, viewState.scale * multiplier);
  }

  function closePopup() {
    popupLocation = null;
    popupEl.hidden = true;
    popupEl.innerHTML = "";
  }

  function openPopup(location, html, onJump) {
    popupLocation = location;
    popupEl.innerHTML = html;
    popupEl.hidden = false;
    const jumpBtn = popupEl.querySelector("[data-jump]");
    if (jumpBtn && onJump) {
      jumpBtn.addEventListener("click", () => onJump(location));
    }
    requestAnimationFrame(() => positionPopup(location));
  }

  stage.addEventListener("pointerdown", (event) => {
    if (
      event.button !== 0
      || event.target.closest(".map-marker")
      || event.target.closest(".map-popup")
      || event.target.closest(".map-controls")
    ) {
      return;
    }

    dragState.active = true;
    dragState.pointerId = event.pointerId;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
    dragState.originX = viewState.offsetX;
    dragState.originY = viewState.offsetY;
    dragState.moved = false;
    stage.setPointerCapture(event.pointerId);
    stage.classList.add("is-dragging");
  });

  stage.addEventListener("pointermove", (event) => {
    if (!dragState.active || event.pointerId !== dragState.pointerId) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      dragState.moved = true;
    }

    setView(viewState.scale, dragState.originX + deltaX, dragState.originY + deltaY);
  });

  const endDrag = (event) => {
    if (!dragState.active || event.pointerId !== dragState.pointerId) return;
    dragState.active = false;
    dragState.pointerId = null;
    stage.classList.remove("is-dragging");
    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
  };

  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  stage.addEventListener("wheel", (event) => {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1.12 : 0.89;
    zoomAt(event.clientX, event.clientY, viewState.scale * direction);
  }, { passive: false });

  zoomInBtn?.addEventListener("click", () => zoomBy(1.16));
  zoomOutBtn?.addEventListener("click", () => zoomBy(0.86));
  resetBtn?.addEventListener("click", () => resetView());

  container.addEventListener("click", (event) => {
    if (dragState.moved) {
      dragState.moved = false;
      return;
    }

    if (
      event.target.closest(".map-marker")
      || event.target.closest(".map-popup")
      || event.target.closest(".map-controls")
    ) return;
    closePopup();
    listeners.click.forEach((handler) => handler({ originalEvent: event }));
  });

  window.addEventListener("resize", () => {
    if (popupLocation) positionPopup(popupLocation);
  });

  requestAnimationFrame(resetView);

  return {
    markersLayer,
    closePopup,
    fitBounds() {
      resetView();
    },
    flyTo([lat, lng], zoom = 1, options = {}) {
      const scale = clamp(zoom, 0.62, 1.8);
      const rect = container.getBoundingClientRect();
      const targetX = lng * scale;
      const targetY = lat * scale;
      const nextOffsetX = (rect.width / 2) - targetX;
      const nextOffsetY = (rect.height / 2) - targetY;
      setView(scale, nextOffsetX, nextOffsetY);
      if (options?.duration) {
        // The custom controller applies the end state immediately.
      }
    },
    getZoom() {
      return viewState.scale;
    },
    invalidateSize() {
      clampOffsets();
      applyTransform();
    },
    on(eventName, handler) {
      if (!listeners[eventName]) {
        listeners[eventName] = new Set();
      }
      listeners[eventName].add(handler);
    },
    openPopup,
    positionMarker,
    zoomIn() {
      zoomBy(1.16);
    },
    zoomOut() {
      zoomBy(0.86);
    },
    resetView
  };
}

const map = createMapController(mapEl);

function toLatLng(location) {
  return [location.y, location.x];
}

function getSagaMeta(sagaId) {
  return atlas.sagas.find((saga) => saga.id === sagaId) || { id: sagaId, name: sagaId, color: "#fff" };
}

function getTypeClass(type) {
  if (type === "cosmic") return "cosmic";
  if (type === "battle") return "battle";
  return "home";
}

function locationIntroYear(location) {
  const relatedYears = [
    location.year,
    ...location.events.map((eventId) => eventById.get(eventId)?.year).filter(Boolean)
  ];
  return Math.min(...relatedYears);
}

function collectSearchableText(entity) {
  if (!entity) return [];

  const texts = [
    entity.name,
    entity.alias,
    entity.description,
    entity.region,
    entity.summary,
    entity.title,
    entity.role
  ];

  if (Array.isArray(entity.characters)) {
    texts.push(...entity.characters.map((id) => characterById.get(id)?.name || id));
  }

  if (Array.isArray(entity.abilities)) {
    texts.push(...entity.abilities.map((id) => abilityById.get(id)?.name || id));
  }

  if (Array.isArray(entity.events)) {
    texts.push(...entity.events.map((id) => eventById.get(id)?.title || id));
  }

  if (Array.isArray(entity.locations)) {
    texts.push(...entity.locations.map((id) => locationById.get(id)?.name || id));
  }

  if (Array.isArray(entity.users)) {
    texts.push(...entity.users.map((id) => characterById.get(id)?.name || id));
  }

  return texts.filter(Boolean).map((text) => String(text));
}

function matchesQuery(entity, query) {
  if (!query) return true;
  const needle = query.toLowerCase();
  return collectSearchableText(entity).some((value) => value.toLowerCase().includes(needle));
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function scoreTextMatch(value, query, exactWeight, includesWeight) {
  const text = normalizeText(value);
  const needle = normalizeText(query);
  if (!needle) return 0;
  if (text === needle) return exactWeight;
  if (text.includes(needle)) return includesWeight;
  return 0;
}

function getBestSearchTarget(query) {
  const normalized = query.trim();
  if (!normalized) return null;

  const text = normalizeText(normalized);
  const candidates = [];

  atlas.locations.forEach((location) => {
    if (!isLocationVisible(location)) return;

    let score = 0;
    score += scoreTextMatch(location.name, text, 110, 42);
    score += scoreTextMatch(location.region, text, 18, 10);
    score += scoreTextMatch(location.description, text, 8, 4);

    location.characters.forEach((characterId) => {
      const character = characterById.get(characterId);
      if (!character) return;
      score += scoreTextMatch(character.name, text, 20, 10);
      score += scoreTextMatch(character.alias, text, 14, 7);
    });

    location.abilities.forEach((abilityId) => {
      const ability = abilityById.get(abilityId);
      if (!ability) return;
      score += scoreTextMatch(ability.name, text, 12, 6);
    });

    location.events.forEach((eventId) => {
      const event = eventById.get(eventId);
      if (!event) return;
      score += scoreTextMatch(event.title, text, 10, 5);
    });

    if (score > 0) candidates.push({ kind: "location", id: location.id, score });
  });

  atlas.characters.forEach((character) => {
    const visibleLocations = character.locations.map((id) => locationById.get(id)).filter(Boolean);
    if (!visibleLocations.some((location) => isLocationVisible(location))) return;

    let score = 0;
    score += scoreTextMatch(character.name, text, 140, 58);
    score += scoreTextMatch(character.alias, text, 60, 28);
    score += scoreTextMatch(character.role, text, 12, 6);
    score += scoreTextMatch(character.description, text, 6, 3);

    character.abilities.forEach((abilityId) => {
      const ability = abilityById.get(abilityId);
      if (!ability) return;
      score += scoreTextMatch(ability.name, text, 18, 8);
    });

    visibleLocations.forEach((location) => {
      score += scoreTextMatch(location.name, text, 12, 4);
    });

    if (score > 0) candidates.push({ kind: "character", id: character.id, score });
  });

  atlas.abilities.forEach((ability) => {
    if (!isAbilityVisible(ability)) return;

    let score = 0;
    score += scoreTextMatch(ability.name, text, 85, 34);
    score += scoreTextMatch(ability.category, text, 10, 5);
    score += scoreTextMatch(ability.description, text, 6, 3);

    ability.users.forEach((characterId) => {
      const character = characterById.get(characterId);
      if (!character) return;
      score += scoreTextMatch(character.name, text, 18, 7);
    });

    if (score > 0) candidates.push({ kind: "ability", id: ability.id, score });
  });

  atlas.events.forEach((event) => {
    if (!isEventVisible(event)) return;

    const location = locationById.get(event.location);
    let score = 0;
    score += scoreTextMatch(event.title, text, 70, 28);
    score += scoreTextMatch(event.summary, text, 8, 4);
    score += scoreTextMatch(location?.name, text, 10, 5);

    if (score > 0) candidates.push({ kind: "event", id: event.id, score });
  });

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    const priority = { character: 4, location: 3, ability: 2, event: 1 };
    return (priority[b.kind] || 0) - (priority[a.kind] || 0);
  });

  return candidates[0] || null;
}

function isLocationVisible(location) {
  return locationIntroYear(location) <= appState.cutoffYear
    && (appState.saga === "all" || location.saga === appState.saga)
    && matchesQuery(location, appState.query);
}

function isEventVisible(event) {
  const location = locationById.get(event.location);
  return event.year <= appState.cutoffYear
    && (!location || (appState.saga === "all" || location.saga === appState.saga))
    && matchesQuery({ ...event, name: event.title, summary: event.summary }, appState.query);
}

function isCharacterVisible(character) {
  const locations = character.locations.map((id) => locationById.get(id)).filter(Boolean);
  return locations.some((location) => isLocationVisible(location));
}

function isAbilityVisible(ability) {
  return ability.users.some((characterId) => isCharacterVisible(characterById.get(characterId) || { locations: [] }));
}

function getCharacterPrimaryLocation(character) {
  const home = locationById.get(character.home);
  if (home && isLocationVisible(home)) return home;

  return character.locations
    .map((id) => locationById.get(id))
    .filter(Boolean)
    .find((location) => isLocationVisible(location)) || null;
}

function getVisibleRelatedCharacters(character) {
  const baseLocations = new Set(character.locations);
  const baseAbilities = new Set(character.abilities);

  return atlas.characters
    .filter((candidate) => candidate.id !== character.id)
    .filter((candidate) => {
      const candidateLocations = candidate.locations.filter((id) => baseLocations.has(id));
      const candidateAbilities = candidate.abilities.filter((id) => baseAbilities.has(id));
      const sameSaga = candidate.saga === character.saga;
      return (candidateLocations.length || candidateAbilities.length || sameSaga)
        && candidate.locations.map((id) => locationById.get(id)).filter(Boolean).some((location) => isLocationVisible(location));
    });
}

function getVisibleLocationRelations(location) {
  return {
    characters: location.characters.map((id) => characterById.get(id)).filter(Boolean),
    abilities: location.abilities.map((id) => abilityById.get(id)).filter(Boolean),
    events: location.events.map((id) => eventById.get(id)).filter(Boolean).sort((a, b) => a.year - b.year)
  };
}

function hashString(value) {
  let hash = 0;
  const text = String(value || "");
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function getCharacterInitials(character) {
  const parts = String(character?.name || "")
    .replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getCharacterAvatarStyle(character) {
  const hue = hashString(character.id) % 360;
  return `--avatar-hue:${hue};`;
}

function getCharacterPortraitPath(character) {
  return window.DBZ_PORTRAITS?.[character.id] || `./assets/portraits/${character.id}.png`;
}

function renderCharacterPortrait(character, variant = "card") {
  const initials = getCharacterInitials(character);
  const portraitSrc = getCharacterPortraitPath(character);
  return `
    <span class="portrait portrait--${variant}" style="${getCharacterAvatarStyle(character)}">
      <img
        class="portrait__image"
        alt="${character.name}"
        loading="eager"
        decoding="async"
        src="${portraitSrc}"
        onerror="this.hidden=true;this.nextElementSibling.hidden=false"
        onload="this.hidden=false;this.nextElementSibling.hidden=true"
      />
      <span class="portrait__fallback" hidden>${initials}</span>
    </span>
  `;
}

function createMarker(location) {
  const markerEl = document.createElement("button");
  markerEl.type = "button";
  markerEl.className = `map-marker map-marker--${getTypeClass(location.type)}`;
  markerEl.setAttribute("aria-label", location.name);
  markerEl.dataset.locationId = location.id;
  map.positionMarker(markerEl, location);

  markerEl.addEventListener("click", (event) => {
    event.stopPropagation();
    selectLocation(location.id, false);
  });

  const marker = {
    element: markerEl,
    location,
    popupHtml: renderPopup(location),
    addTo(controller) {
      controller.markersLayer.appendChild(markerEl);
      return marker;
    },
    bindPopup(html) {
      marker.popupHtml = html;
      return marker;
    },
    getElement() {
      return markerEl;
    },
    openPopup() {
      map.openPopup(location, marker.popupHtml, (loc) => {
        selectLocation(loc.id, false);
      });
    },
    setOpacity(value) {
      markerEl.style.opacity = String(value);
      return marker;
    }
  };

  return marker;
}

function renderPopup(location) {
  const saga = getSagaMeta(location.saga);
  const characters = location.characters.map((id) => characterById.get(id)).filter(Boolean).slice(0, 4);
  const abilities = location.abilities.map((id) => abilityById.get(id)).filter(Boolean).slice(0, 4);
  const events = location.events.map((id) => eventById.get(id)).filter(Boolean).sort((a, b) => a.year - b.year);
  return `
    <div class="popup-card">
      <div class="popup-card__top">
        <div>
          <p class="popup-card__eyebrow">${saga.name}</p>
          <h3>${location.name}</h3>
        </div>
        <span class="popup-card__type popup-card__type--${getTypeClass(location.type)}">${location.type}</span>
      </div>
      <p class="popup-card__description">${location.description}</p>
      <div class="popup-card__meta">
        <span class="popup-card__tag">Región: ${location.region}</span>
        <span class="popup-card__tag">Año ${location.year}</span>
        <span class="popup-card__tag">${characters.length} personajes</span>
        <span class="popup-card__tag">${abilities.length} técnicas</span>
      </div>
      <div class="popup-card__chips">
        ${characters.map((character) => `<span class="popup-card__chip">${character.name}</span>`).join("")}
        ${abilities.map((ability) => `<span class="popup-card__chip popup-card__chip--ability">${ability.name}</span>`).join("")}
        ${events.slice(0, 2).map((event) => `<span class="popup-card__chip popup-card__chip--event">${event.year} · ${event.title}</span>`).join("")}
      </div>
      <button class="popup__jump" type="button" data-jump="${location.id}">Ver ficha completa</button>
    </div>
  `;
}

function activateMarker(locationId) {
  appState.markers.forEach((marker, id) => {
    const element = marker.getElement();
    if (!element) return;
    element.classList.toggle("dbz-marker--active", id === locationId);
  });
}

function renderSagaChips() {
  const buttons = [
    { id: "all", name: "Todas" },
    ...atlas.sagas
  ].map((saga) => {
    const active = appState.saga === saga.id ? "is-active" : "";
    return `<button class="chip ${active}" type="button" data-saga="${saga.id}">${saga.name}</button>`;
  });

  sagaChipsEl.innerHTML = buttons.join("");
  sagaChipsEl.querySelectorAll("[data-saga]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.saga = button.dataset.saga;
      renderAll();
    });
  });
}

function renderTimeline() {
  const visibleEvents = atlas.events
    .filter((event) => event.year <= appState.cutoffYear)
    .filter((event) => {
      const location = locationById.get(event.location);
      return !location || appState.saga === "all" || location.saga === appState.saga;
    })
    .filter((event) => {
      const location = locationById.get(event.location);
      return matchesQuery(location || event, appState.query);
    })
    .sort((a, b) => a.year - b.year);

  eventCountEl.textContent = `${visibleEvents.length} eventos`;

  timelineEl.innerHTML = visibleEvents.map((event) => {
    const location = locationById.get(event.location);
    const active = event.id === appState.selectedEventId ? "is-active" : "";
    return `
      <button class="timeline__item ${active}" type="button" data-event="${event.id}">
        <span class="timeline__year">Año ${event.year}</span>
        <span class="timeline__title">${event.title}</span>
        <span class="timeline__meta">${location?.name || "Ubicación desconocida"} · ${event.summary}</span>
      </button>
    `;
  }).join("");

  timelineEl.querySelectorAll("[data-event]").forEach((button) => {
    button.addEventListener("click", () => {
      const event = eventById.get(button.dataset.event);
      if (!event) return;
      selectLocation(event.location, true, event.id);
    });
  });
}

function renderLocationDetail(location) {
  const saga = getSagaMeta(location.saga);
  const relations = getVisibleLocationRelations(location);

  detailStateEl.textContent = `${location.region} · ${saga.name}`;
  locationCardEl.innerHTML = `
    <div class="detail-card">
      <h3 class="detail-title">${location.name}</h3>
      <p class="detail-subtitle">${location.description}</p>
      <div class="badge-row">
        <span class="badge">Saga: ${saga.name}</span>
        <span class="badge">Año: ${location.year}</span>
        <span class="badge">Tipo: ${location.type}</span>
      </div>
      <div class="profile-card__list">
        <strong>Eventos</strong>
        <div class="badge-row">
          ${relations.events.map((event) => `<button class="badge" type="button" data-event-jump="${event.id}">${event.year} · ${event.title}</button>`).join("") || '<span class="muted">Sin eventos asociados</span>'}
        </div>
      </div>
    </div>
  `;

  characterGridEl.innerHTML = relations.characters.map((character) => {
    const mainAbility = character.abilities.map((id) => abilityById.get(id)?.name).filter(Boolean).slice(0, 2).join(" · ");
    return `
      <button class="entity-card" type="button" data-character="${character.id}">
        ${renderCharacterPortrait(character, "card")}
        <strong>${character.name}</strong>
        <span>${character.role}</span>
        <span>${mainAbility || "Sin habilidades asociadas"}</span>
      </button>
    `;
  }).join("") || '<p class="detail-card__empty">No hay personajes asociados visibles.</p>';

  abilityCloudEl.innerHTML = relations.abilities.map((ability) => {
    return `<button class="ability-pill" type="button" data-ability="${ability.id}">${ability.name}</button>`;
  }).join("") || '<span class="muted">No hay habilidades asociadas visibles.</span>';

  characterGridEl.querySelectorAll("[data-character]").forEach((button) => {
    button.addEventListener("click", () => {
      selectCharacter(button.dataset.character, true);
    });
  });

  locationCardEl.querySelectorAll("[data-event-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const event = eventById.get(button.dataset.eventJump);
      if (event) {
        selectLocation(event.location, true, event.id);
      }
    });
  });

  abilityCloudEl.querySelectorAll("[data-ability]").forEach((button) => {
    button.addEventListener("click", () => {
      const ability = abilityById.get(button.dataset.ability);
      if (!ability) return;
      searchInput.value = ability.name;
      appState.query = ability.name;
      renderAll();
    });
  });

}

function renderCharacterProfile(character) {
  const saga = getSagaMeta(character.saga);
  const homeLocation = getCharacterPrimaryLocation(character);
  const abilities = character.abilities.map((id) => abilityById.get(id)).filter(Boolean);
  const visibleLocations = character.locations.map((id) => locationById.get(id)).filter(Boolean).filter((location) => isLocationVisible(location));
  const relatedCharacters = getVisibleRelatedCharacters(character);
  const relatedEvents = visibleLocations
    .flatMap((location) => location.events.map((eventId) => eventById.get(eventId)).filter(Boolean))
    .sort((a, b) => a.year - b.year);

  detailStateEl.textContent = `${character.role} · ${saga.name}`;
  locationCardEl.innerHTML = `
    <div class="profile-card">
      <div class="profile-card__title">
        ${renderCharacterPortrait(character, "profile")}
        <div class="profile-card__title-text">
          <h3>${character.name}</h3>
          <span>${character.alias}</span>
        </div>
      </div>
      <p class="detail-subtitle">${character.description}</p>
      <div class="badge-row">
        <span class="badge">Saga: ${saga.name}</span>
        <span class="badge">Rol: ${character.role}</span>
        <span class="badge">Lugares: ${visibleLocations.length}</span>
        <span class="badge">Técnicas: ${abilities.length}</span>
      </div>
      <div class="profile-card__actions">
        ${homeLocation ? `<button class="badge" type="button" data-home-jump="${homeLocation.id}">Ir a ${homeLocation.name}</button>` : ""}
        ${visibleLocations.map((location) => `<button class="badge" type="button" data-location-jump="${location.id}">${location.name}</button>`).join("")}
      </div>
      <div class="profile-card__list">
        <strong>Habilidades</strong>
        <ul>
          ${abilities.map((ability) => `<li><button class="link-button" type="button" data-ability="${ability.id}">${ability.name}</button> · ${ability.category}</li>`).join("") || "<li>Sin habilidades visibles</li>"}
        </ul>
      </div>
      <div class="profile-card__list">
        <strong>Eventos relacionados</strong>
        <div class="badge-row">
          ${relatedEvents.map((event) => `<button class="badge" type="button" data-event-jump="${event.id}">${event.year} · ${event.title}</button>`).join("") || '<span class="muted">Sin eventos visibles</span>'}
        </div>
      </div>
    </div>
  `;

  const relatedAbilities = abilities.length ? abilities : character.abilities.map((id) => abilityById.get(id)).filter(Boolean);

  characterGridEl.innerHTML = relatedCharacters.map((candidate) => {
    const mainAbility = candidate.abilities.map((id) => abilityById.get(id)?.name).filter(Boolean).slice(0, 2).join(" · ");
    return `
      <button class="entity-card" type="button" data-character="${candidate.id}">
        ${renderCharacterPortrait(candidate, "card")}
        <strong>${candidate.name}</strong>
        <span>${candidate.role}</span>
        <span>${mainAbility || "Sin habilidades asociadas"}</span>
      </button>
    `;
  }).join("") || '<p class="detail-card__empty">No hay personajes relacionados visibles.</p>';

  abilityCloudEl.innerHTML = relatedAbilities.map((ability) => {
    return `<button class="ability-pill" type="button" data-ability="${ability.id}">${ability.name}</button>`;
  }).join("") || '<span class="muted">No hay habilidades asociadas visibles.</span>';

  locationCardEl.querySelectorAll("[data-home-jump], [data-location-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const locationId = button.dataset.homeJump || button.dataset.locationJump;
      if (locationId) {
        selectLocation(locationId, true);
      }
    });
  });

  locationCardEl.querySelectorAll("[data-event-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const event = eventById.get(button.dataset.eventJump);
      if (event) {
        selectLocation(event.location, true, event.id);
      }
    });
  });

  locationCardEl.querySelectorAll("[data-ability]").forEach((button) => {
    button.addEventListener("click", () => {
      const ability = abilityById.get(button.dataset.ability);
      if (!ability) return;
      const firstUser = ability.users.map((id) => characterById.get(id)).filter(Boolean)[0];
      if (firstUser) {
        selectCharacter(firstUser.id, true);
      }
    });
  });

  characterGridEl.querySelectorAll("[data-character]").forEach((button) => {
    button.addEventListener("click", () => {
      selectCharacter(button.dataset.character, true);
    });
  });

  abilityCloudEl.querySelectorAll("[data-ability]").forEach((button) => {
    button.addEventListener("click", () => {
      const ability = abilityById.get(button.dataset.ability);
      if (!ability) return;
      searchInput.value = ability.name;
      appState.query = ability.name;
      renderAll();
    });
  });

}

function renderGraph() {
  const selectedCharacter = appState.selectedView === "character"
    ? characterById.get(appState.selectedCharacterId)
    : null;
  const selectedLocation = appState.selectedView === "location"
    ? locationById.get(appState.selectedLocationId)
    : null;

  const center = { x: 210, y: 160 };
  const nodes = [];
  const edges = [];

  const pushNode = (node) => {
    nodes.push(node);
    return node;
  };

  const addEdge = (from, to, kind) => {
    edges.push({ from, to, kind });
  };

  if (selectedCharacter) {
    const saga = getSagaMeta(selectedCharacter.saga);
    pushNode({ id: `center-${selectedCharacter.id}`, kind: "character", label: selectedCharacter.name, subtitle: selectedCharacter.alias, x: center.x, y: center.y, radius: 38, dataId: selectedCharacter.id, action: "character" });
    pushNode({ id: `saga-${saga.id}`, kind: "saga", label: saga.name, subtitle: "Saga", x: center.x, y: 58, radius: 26, dataId: saga.id, action: "saga" });
    addEdge(`center-${selectedCharacter.id}`, `saga-${saga.id}`, "saga");

    const home = getCharacterPrimaryLocation(selectedCharacter);
    if (home) {
      pushNode({ id: `location-${home.id}`, kind: "location", label: home.name, subtitle: home.region, x: center.x, y: 278, radius: 25, dataId: home.id, action: "location" });
      addEdge(`center-${selectedCharacter.id}`, `location-${home.id}`, "location");
    }

    const abilities = selectedCharacter.abilities.map((id) => abilityById.get(id)).filter(Boolean).slice(0, 4);
    const abilitySlots = [
      { x: 320, y: 88 },
      { x: 336, y: 160 },
      { x: 320, y: 232 },
      { x: 286, y: 300 }
    ];
    abilities.forEach((ability, index) => {
      const slot = abilitySlots[index] || abilitySlots[abilitySlots.length - 1];
      pushNode({ id: `ability-${ability.id}`, kind: "ability", label: ability.name, subtitle: ability.category, x: slot.x, y: slot.y, radius: 22, dataId: ability.id, action: "ability" });
      addEdge(`center-${selectedCharacter.id}`, `ability-${ability.id}`, "ability");
    });

    const relatedCharacters = getVisibleRelatedCharacters(selectedCharacter).slice(0, 3);
    const characterSlots = [
      { x: 84, y: 92 },
      { x: 72, y: 160 },
      { x: 84, y: 230 }
    ];
    relatedCharacters.forEach((character, index) => {
      const slot = characterSlots[index] || characterSlots[characterSlots.length - 1];
      pushNode({ id: `peer-${character.id}`, kind: "character", label: character.name, subtitle: character.alias, x: slot.x, y: slot.y, radius: 22, dataId: character.id, action: "character" });
      addEdge(`center-${selectedCharacter.id}`, `peer-${character.id}`, "character");
    });
  } else if (selectedLocation) {
    const saga = getSagaMeta(selectedLocation.saga);
    const relations = getVisibleLocationRelations(selectedLocation);
    pushNode({ id: `center-${selectedLocation.id}`, kind: "location", label: selectedLocation.name, subtitle: selectedLocation.region, x: center.x, y: center.y, radius: 38, dataId: selectedLocation.id, action: "location" });
    pushNode({ id: `saga-${saga.id}`, kind: "saga", label: saga.name, subtitle: "Saga", x: center.x, y: 58, radius: 26, dataId: saga.id, action: "saga" });
    addEdge(`center-${selectedLocation.id}`, `saga-${saga.id}`, "saga");

    const characters = relations.characters.slice(0, 3);
    characters.forEach((character, index) => {
      const slot = [
        { x: 84, y: 92 },
        { x: 72, y: 160 },
        { x: 84, y: 230 }
      ][index];
      if (!slot) return;
      pushNode({ id: `character-${character.id}`, kind: "character", label: character.name, subtitle: character.role, x: slot.x, y: slot.y, radius: 22, dataId: character.id, action: "character" });
      addEdge(`center-${selectedLocation.id}`, `character-${character.id}`, "character");
    });

    const abilities = relations.abilities.slice(0, 4);
    abilities.forEach((ability, index) => {
      const slot = [
        { x: 320, y: 88 },
        { x: 336, y: 160 },
        { x: 320, y: 232 },
        { x: 286, y: 300 }
      ][index];
      if (!slot) return;
      pushNode({ id: `ability-${ability.id}`, kind: "ability", label: ability.name, subtitle: ability.category, x: slot.x, y: slot.y, radius: 22, dataId: ability.id, action: "ability" });
      addEdge(`center-${selectedLocation.id}`, `ability-${ability.id}`, "ability");
    });

    const events = relations.events.slice(0, 2);
    events.forEach((event, index) => {
      const slot = [
        { x: 286, y: 280 },
        { x: 134, y: 292 }
      ][index];
      if (!slot) return;
      pushNode({ id: `event-${event.id}`, kind: "event", label: event.title, subtitle: `Año ${event.year}`, x: slot.x, y: slot.y, radius: 21, dataId: event.id, action: "event" });
      addEdge(`center-${selectedLocation.id}`, `event-${event.id}`, "event");
    });
  } else {
    relationshipGraphEl.innerHTML = "";
    graphStateEl.textContent = "Selecciona un elemento";
    return;
  }

  const svgParts = [
    `<defs>
      <linearGradient id="graph-center-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f4c542"/>
        <stop offset="100%" stop-color="#ff7a59"/>
      </linearGradient>
    </defs>`
  ];

  edges.forEach((edge) => {
    const from = nodes.find((node) => node.id === edge.from);
    const to = nodes.find((node) => node.id === edge.to);
    if (!from || !to) return;
    svgParts.push(`<line class="graph-edge graph-edge--${edge.kind}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"></line>`);
  });

  nodes.forEach((node) => {
    svgParts.push(`
      <g class="graph-node graph-node--${node.kind} ${node.id.startsWith("center-") ? "graph-node--center" : ""}" data-graph-node="${node.dataId}" data-graph-action="${node.action}" transform="translate(${node.x},${node.y})">
        <circle class="graph-node__circle" r="${node.radius}"></circle>
        <text class="graph-label" y="${node.radius + 15}">${node.label}</text>
        ${node.subtitle ? `<text class="graph-subtitle" y="${node.radius + 28}">${node.subtitle}</text>` : ""}
      </g>
    `);
  });

  relationshipGraphEl.innerHTML = svgParts.join("");
  graphStateEl.textContent = selectedCharacter
    ? `${selectedCharacter.name} · ${nodes.length - 1} vínculos`
    : `${selectedLocation.name} · ${nodes.length - 1} vínculos`;

  relationshipGraphEl.querySelectorAll("[data-graph-node]").forEach((nodeEl) => {
    nodeEl.addEventListener("click", () => {
      const action = nodeEl.dataset.graphAction;
      const dataId = nodeEl.dataset.graphNode;
      if (action === "character") {
        selectCharacter(dataId, true);
      } else if (action === "location") {
        selectLocation(dataId, true);
      } else if (action === "ability") {
        const ability = abilityById.get(dataId);
        if (ability) {
          const firstUser = ability.users.map((id) => characterById.get(id)).filter(Boolean)[0];
          if (firstUser) {
            selectCharacter(firstUser.id, true);
          } else {
            searchInput.value = ability.name;
            appState.query = ability.name;
            renderAll();
          }
        }
      } else if (action === "saga") {
        appState.saga = dataId;
        renderAll();
      } else if (action === "event") {
        const event = eventById.get(dataId);
        if (event) selectLocation(event.location, true, event.id);
      }
    });
  });
}

function updateStats() {
  const visibleLocations = atlas.locations.filter(isLocationVisible);
  const visibleEvents = atlas.events.filter(isEventVisible);
  const visibleCharacters = atlas.characters.filter(isCharacterVisible);
  const visibleAbilities = atlas.abilities.filter(isAbilityVisible);

  visibleLocationsEl.textContent = visibleLocations.length;
  visibleEventsEl.textContent = visibleEvents.length;
  visibleCharactersEl.textContent = visibleCharacters.length;
  visibleAbilitiesEl.textContent = visibleAbilities.length;
  yearLabel.textContent = `Año ${appState.cutoffYear}`;
  cutoffLabel.textContent = `hasta el año ${appState.cutoffYear}`;

  if (appState.query) {
    searchSummaryEl.textContent = `${visibleLocations.length} localizaciones, ${visibleEvents.length} eventos, ${visibleCharacters.length} personajes y ${visibleAbilities.length} habilidades coinciden con "${appState.query}".`;
  } else {
    searchSummaryEl.textContent = "Escribe para filtrar el mapa y la cronologia.";
  }
}

function updateMarkers() {
  atlas.locations.forEach((location) => {
    let marker = appState.markers.get(location.id);
    if (!marker) {
      marker = createMarker(location);
      appState.markers.set(location.id, marker);
      marker.addTo(map);
    }

    const visible = isLocationVisible(location);
    const element = marker.getElement();
    if (element) {
      element.classList.toggle("dbz-marker--faded", !visible);
      element.style.display = visible ? "" : "none";
    }

    if (visible) {
      marker.setOpacity(1);
    } else {
      marker.setOpacity(0.18);
    }
  });

  activateMarker(appState.selectedLocationId);
}

function selectLocation(locationId, shouldPan = false, eventId = null) {
  const location = locationById.get(locationId);
  if (!location) return;

  appState.selectedView = "location";
  appState.selectedCharacterId = null;
  appState.selectedLocationId = locationId;
  if (eventId) {
    appState.selectedEventId = eventId;
  } else if (location.events.length) {
    appState.selectedEventId = location.events[0];
  }

  if (shouldPan) {
    map.flyTo(toLatLng(location), Math.max(map.getZoom(), 1.14), { duration: 0.8 });
  }

  renderAll();
  const marker = appState.markers.get(locationId);
  if (marker) {
    marker.openPopup();
  }
}

function selectCharacter(characterId, shouldPan = false) {
  const character = characterById.get(characterId);
  if (!character) return;

  appState.selectedView = "character";
  appState.selectedCharacterId = characterId;

  const location = getCharacterPrimaryLocation(character) || character.locations.map((id) => locationById.get(id)).filter(Boolean)[0] || null;
  appState.selectedLocationId = location ? location.id : null;
  if (location) {
    if (shouldPan) {
      map.flyTo(toLatLng(location), Math.max(map.getZoom(), 1.14), { duration: 0.8 });
    }
  }

  const visibleLocation = location;
  if (visibleLocation?.events?.length) {
    appState.selectedEventId = visibleLocation.events[0];
  }

  renderAll();

  if (location) {
    const marker = appState.markers.get(location.id);
    if (marker) {
      marker.openPopup();
    }
  }
}

function renderDetailPanel() {
  if (appState.selectedView === "character" && appState.selectedCharacterId) {
    const character = characterById.get(appState.selectedCharacterId);
    if (character) {
      renderCharacterProfile(character);
      return;
    }
  }

  const location = locationById.get(appState.selectedLocationId);
  if (location) {
    renderLocationDetail(location);
    return;
  }

  locationCardEl.innerHTML = '<p class="detail-card__empty">No hay un elemento seleccionado.</p>';
  detailStateEl.textContent = "Selecciona una localizacion o personaje";
  characterGridEl.innerHTML = "";
  abilityCloudEl.innerHTML = "";
  graphStateEl.textContent = "Personaje, técnicas y sagas";
  relationshipGraphEl.innerHTML = "";
}

function renderAll() {
  renderSagaChips();
  renderTimeline();
  renderDetailPanel();
  renderGraph();
  updateStats();
  updateMarkers();
}

searchInput.addEventListener("input", () => {
  appState.query = searchInput.value.trim();
  const bestMatch = getBestSearchTarget(appState.query);
  if (!bestMatch) {
    renderAll();
    return;
  }

  if (bestMatch.kind === "character" && bestMatch.id !== appState.selectedCharacterId) {
    selectCharacter(bestMatch.id, true);
  } else if (bestMatch.kind === "location" && bestMatch.id !== appState.selectedLocationId) {
    selectLocation(bestMatch.id, true);
  } else if (bestMatch.kind === "ability") {
    const ability = abilityById.get(bestMatch.id);
    if (ability) {
      const firstUser = ability.users.map((id) => characterById.get(id)).filter(Boolean)[0];
      if (firstUser) selectCharacter(firstUser.id, true);
    }
  } else if (bestMatch.kind === "event") {
    const event = eventById.get(bestMatch.id);
    if (event) selectLocation(event.location, true, event.id);
  } else {
    renderAll();
  }
});

yearSlider.addEventListener("input", () => {
  appState.cutoffYear = Number(yearSlider.value);
  renderAll();
});

resetFiltersBtn.addEventListener("click", () => {
  appState.saga = "all";
  appState.query = "";
  appState.cutoffYear = Math.max(...atlas.events.map((event) => event.year));
  appState.selectedCharacterId = null;
  appState.selectedView = "location";
  searchInput.value = "";
  yearSlider.value = String(appState.cutoffYear);
  renderAll();
});

map.on("click", () => {
  map.closePopup();
});

window.addEventListener("resize", () => {
  map.invalidateSize();
});

renderAll();
selectLocation(appState.selectedLocationId, false);
