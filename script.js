const STORAGE_KEY = "gd-route-simple-v1";

const STAGES = [
  { id: "new-player", label: "New player", startWorld: 0 },
  { id: "easy-demon", label: "Easy demons", startWorld: 1 },
  { id: "medium-demon", label: "Medium demons", startWorld: 2 },
  { id: "hard-demon", label: "Hard demons", startWorld: 3 },
  { id: "insane-demon", label: "Insane demons", startWorld: 4 },
  { id: "extreme-demon", label: "Extreme demons", startWorld: 5 },
  { id: "list-ready", label: "List-ready", startWorld: 6 },
];

function official(name, slug, difficulty) {
  return {
    name,
    creator: "RobTop",
    difficulty,
    url: `https://geometry-dash.fandom.com/wiki/${slug}`,
    linkLabel: "Official page",
  };
}

function online(name, creator, levelId, difficulty) {
  return {
    name,
    creator,
    difficulty,
    url: `https://gdbrowser.com/${levelId}`,
    linkLabel: "Open on GDBrowser",
  };
}

const LEVELS = {
  stereoMadness: official("Stereo Madness", "Stereo_Madness", "Easy"),
  timeMachine: official("Time Machine", "Time_Machine", "Harder"),
  electromanAdventures: official("Electroman Adventures", "Electroman_Adventures", "Insane"),
  clubstep: official("Clubstep", "Clubstep", "Demon"),
  theNightmare: online("The Nightmare", "Jax", 13519, "Easy Demon"),
  shiver: online("Shiver", "SpKale", 56210242, "Easy Demon"),
  speedRacer: online("Speed Racer", "ZenthicAlpha", 3543219, "Easy Demon"),
  deCode: online("DeCode", "Rek3dge", 2997354, "Easy Demon"),
  deathMoon: online("Death Moon", "Caustic", 8660411, "Easy Demon"),
  changeOfScene: online("Change of Scene", "bli", 90475473, "Easy Demon"),
  bLevel: online("B", "motleyorc", 34085027, "Medium Demon"),
  verity: online("VeritY", "Serponge", 18834999, "Medium Demon"),
  mechanicalShowdown: online("Mechanical Showdown", "Tongii", 27786218, "Medium Demon"),
  sakupenEgg: online("Sakupen Egg", "Sivlol", 58002670, "Medium Demon"),
  biru: online("Biru", "JonathanGD", 47611766, "Medium Demon"),
  nineCircles: online("Nine Circles", "Zobros", 4284013, "Hard Demon"),
  jawbreaker: online("Jawbreaker", "ZenthicAlpha", 6939821, "Hard Demon"),
  sedulous: online("Sedulous", "Samifying", 64618054, "Hard Demon"),
  futureFunk: online("Future Funk", "JonathanGD", 44062068, "Hard Demon"),
  forestTemple: online("Forest Temple", "Michigun", 11402965, "Hard Demon"),
  windyLandscape: online("Windy Landscape", "WOOGI1411", 4957691, "Insane Demon"),
  acropolis: online("Acropolis", "Zobros", 5155022, "Insane Demon"),
  magmaBound: online("Magma Bound", "ScorchVx", 56568010, "Insane Demon"),
  leyak: online("Leyak", "EnZore", 61137742, "Insane Demon"),
  gumshot: online("Gumshot", "qMystic", 75806677, "Insane Demon"),
  acu: online("Acu", "neigefeu", 61079355, "Extreme Demon"),
  cataclysm: online("Cataclysm", "Ggb0y", 3979721, "Extreme Demon"),
  hypersonic: online("HyperSonic", "ViPriN", 30219145, "Extreme Demon"),
  allegiance: online("Allegiance", "nikroplays", 20761188, "Extreme Demon"),
  prismaticHaze: online("Prismatic Haze", "Cirtrax", 59899374, "Extreme Demon"),
  bloodbath: online("Bloodbath", "Riot", 10565740, "Extreme Demon"),
  artificialAscent: online("Artificial Ascent", "ViPriN", 27122654, "Extreme Demon"),
  sonicWave: online("Sonic Wave", "lSunix", 26681070, "Extreme Demon"),
  bloodlust: online("Bloodlust", "Knobbelboy", 42584142, "Extreme Demon"),
  zodiac: online("Zodiac", "BIANOX", 52374843, "Extreme Demon"),
  firework: online("Firework", "Trick", 75206202, "Extreme Demon"),
  kyouki: online("Kyouki", "Demishio", 86018142, "Extreme Demon"),
  acheron: online("Acheron", "ryamu", 73667628, "Extreme Demon"),
  tidalWave: online("Tidal Wave", "OniLinkGD", 86407629, "Extreme Demon"),
  silentClubstep: online("Silent clubstep", "TheRealSailent", 4125776, "Extreme Demon"),
};

const WORLDS = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Learn the basics, tighten your inputs, then land a clean first demon.",
    levels: [
      { key: "stereoMadness", note: "Starter cube timing and confidence." },
      { key: "timeMachine", note: "Longer timing chains without demon pressure." },
      { key: "electromanAdventures", note: "Speed changes and sight-reading practice." },
      { key: "clubstep", note: "First official demon benchmark." },
      { key: "theNightmare", note: "Simple first online demon clear." },
    ],
  },
  {
    id: "easy-demons",
    title: "Easy Demon Floor",
    description: "Build a real base with easy demons that cover modern reads, classic flow, and longer runs.",
    levels: [
      { key: "shiver", note: "Low-pressure modern easy demon." },
      { key: "speedRacer", note: "Clean timing and ship control reps." },
      { key: "deCode", note: "Classic mixed-mode discipline." },
      { key: "deathMoon", note: "Longer read-heavy consistency test." },
      { key: "changeOfScene", note: "Modern all-around easy demon benchmark." },
    ],
  },
  {
    id: "medium-demons",
    title: "Medium Demon Core",
    description: "Add tighter timings, more memory, and enough length to make consistency matter.",
    levels: [
      { key: "bLevel", note: "Balanced modern medium benchmark." },
      { key: "verity", note: "Memory and control under pressure." },
      { key: "mechanicalShowdown", note: "Transition discipline and cleaner movement." },
      { key: "sakupenEgg", note: "Faster technical inputs and sharper reads." },
      { key: "biru", note: "Longer medium demon endurance." },
    ],
  },
  {
    id: "hard-demons",
    title: "Hard Demon Wall",
    description: "This is where wave control, endurance, and rougher movement really start to matter.",
    levels: [
      { key: "nineCircles", note: "Essential wave checkpoint." },
      { key: "jawbreaker", note: "More sustained wave control." },
      { key: "sedulous", note: "Denser modern visual reading." },
      { key: "futureFunk", note: "Endurance and late-run composure." },
      { key: "forestTemple", note: "Old-school ship and cube discipline." },
    ],
  },
  {
    id: "insane-demons",
    title: "Insane Demon Bridge",
    description: "Use a few strong insanes to stabilize precision, routing, and late-run control.",
    levels: [
      { key: "windyLandscape", note: "Classic first insane demon benchmark." },
      { key: "acropolis", note: "Tight timing and input control." },
      { key: "magmaBound", note: "Modern movement variety." },
      { key: "leyak", note: "Learn-heavy consistency work." },
      { key: "gumshot", note: "Current-style precision and routing." },
    ],
  },
  {
    id: "first-extremes",
    title: "First Extremes",
    description: "Cross into extreme demons with a short set that covers legacy pressure and modern control.",
    levels: [
      { key: "acu", note: "Friendly first extreme benchmark." },
      { key: "cataclysm", note: "Legacy ship and wave pressure." },
      { key: "hypersonic", note: "Mixed-mode burst control." },
      { key: "allegiance", note: "Straight-fly discipline and calm inputs." },
      { key: "prismaticHaze", note: "Modern endurance and route control." },
    ],
  },
  {
    id: "endgame-classics",
    title: "Endgame Classics",
    description: "These are the iconic walls. Use them to harden consistency, nerves, and XL execution.",
    levels: [
      { key: "bloodbath", note: "The classic endgame reality check." },
      { key: "artificialAscent", note: "Long-form execution and discipline." },
      { key: "sonicWave", note: "Wave mastery benchmark." },
      { key: "bloodlust", note: "Late-run composure at real endgame pace." },
      { key: "zodiac", note: "High-end legacy benchmark with serious endurance." },
    ],
  },
  {
    id: "summit",
    title: "Summit",
    description: "A short modern endgame finish. No ranking promises, just hard headline benchmarks.",
    levels: [
      { key: "firework", note: "Dense modern execution." },
      { key: "kyouki", note: "High-speed control and discipline." },
      { key: "acheron", note: "Relentless endgame precision." },
      { key: "tidalWave", note: "Long-form summit focus." },
      { key: "silentClubstep", note: "Final boss if you want a brutal closing benchmark." },
    ],
  },
];

const STAGE_LOOKUP = new Map(STAGES.map((stage) => [stage.id, stage]));
const ALL_STEPS = WORLDS.flatMap((world, worldIndex) =>
  world.levels.map((entry, levelIndex) => ({
    key: entry.key,
    note: entry.note,
    worldId: world.id,
    worldTitle: world.title,
    worldIndex,
    levelIndex,
    level: LEVELS[entry.key],
  })),
);

const elements = {
  stageSelect: document.querySelector("#stage-select"),
  startWorldLabel: document.querySelector("#start-world-label"),
  startWorldCopy: document.querySelector("#start-world-copy"),
  nextLevelLabel: document.querySelector("#next-level-label"),
  nextLevelCopy: document.querySelector("#next-level-copy"),
  routeProgressLabel: document.querySelector("#route-progress-label"),
  routeProgressCopy: document.querySelector("#route-progress-copy"),
  progressPercentLabel: document.querySelector("#progress-percent-label"),
  progressFill: document.querySelector("#progress-fill"),
  route: document.querySelector("#route"),
  resetProgress: document.querySelector("#reset-progress"),
};

const state = loadState();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const stage = STAGE_LOOKUP.has(raw.stage) ? raw.stage : STAGES[0].id;
    const completed = raw && typeof raw.completed === "object" && raw.completed
      ? Object.fromEntries(
        Object.entries(raw.completed).filter(([key, value]) => LEVELS[key] && Boolean(value)),
      )
      : {};
    return { stage, completed };
  } catch {
    return { stage: STAGES[0].id, completed: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getStage() {
  return STAGE_LOOKUP.get(state.stage) || STAGES[0];
}

function isComplete(key) {
  return Boolean(state.completed[key]);
}

function getWorldProgress(world) {
  const cleared = world.levels.filter((entry) => isComplete(entry.key)).length;
  return { cleared, total: world.levels.length };
}

function getCompletedStepCount() {
  return ALL_STEPS.filter((step) => isComplete(step.key)).length;
}

function getCompletedWorldCount() {
  return WORLDS.filter((world) => getWorldProgress(world).cleared === world.levels.length).length;
}

function findNextStep(startWorld) {
  const ordered = [
    ...ALL_STEPS.filter((step) => step.worldIndex >= startWorld),
    ...ALL_STEPS.filter((step) => step.worldIndex < startWorld),
  ];
  return ordered.find((step) => !isComplete(step.key)) || null;
}

function populateStageSelect() {
  elements.stageSelect.innerHTML = STAGES.map((stage) => (
    `<option value="${escapeHtml(stage.id)}">${escapeHtml(stage.label)}</option>`
  )).join("");
}

function renderSummary() {
  const stage = getStage();
  const startWorldNumber = stage.startWorld + 1;
  const startWorld = WORLDS[stage.startWorld];
  const totalSteps = ALL_STEPS.length;
  const completedSteps = getCompletedStepCount();
  const completedWorlds = getCompletedWorldCount();
  const progressPercent = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const nextStep = findNextStep(stage.startWorld);

  elements.stageSelect.value = stage.id;
  elements.startWorldLabel.textContent = `World ${startWorldNumber}: ${startWorld.title}`;
  elements.startWorldCopy.textContent = "Best jump-in point for the stage you selected.";

  if (nextStep) {
    const nextWorldNumber = nextStep.worldIndex + 1;
    const nextWorldLabel = `World ${nextWorldNumber}: ${nextStep.worldTitle}`;
    const cleanupLabel = nextStep.worldIndex < stage.startWorld ? `${nextWorldLabel} (cleanup)` : nextWorldLabel;
    elements.nextLevelLabel.textContent = nextStep.level.name;
    elements.nextLevelCopy.textContent = cleanupLabel;
  } else {
    elements.nextLevelLabel.textContent = "Route complete";
    elements.nextLevelCopy.textContent = "Every benchmark on the list is checked off.";
  }

  elements.routeProgressLabel.textContent = `${completedSteps} / ${totalSteps} cleared`;
  elements.routeProgressCopy.textContent = `${completedWorlds} / ${WORLDS.length} worlds finished`;
  elements.progressPercentLabel.textContent = `${progressPercent}%`;
  elements.progressFill.style.width = `${progressPercent}%`;
}

function getWorldBadge(worldIndex, progress, startWorld, nextStep) {
  if (progress.cleared === progress.total) {
    return { label: "Complete", className: "badge badge--complete" };
  }

  if (worldIndex === startWorld) {
    return { label: "Start here", className: "badge badge--start" };
  }

  if (nextStep && worldIndex === nextStep.worldIndex) {
    return { label: "Up next", className: "badge badge--next" };
  }

  if (worldIndex < startWorld) {
    return { label: "Optional cleanup", className: "badge badge--muted" };
  }

  return { label: "Later world", className: "badge badge--muted" };
}

function renderRoute() {
  const stage = getStage();
  const nextStep = findNextStep(stage.startWorld);

  elements.route.innerHTML = WORLDS.map((world, worldIndex) => {
    const progress = getWorldProgress(world);
    const badge = getWorldBadge(worldIndex, progress, stage.startWorld, nextStep);
    const worldClasses = [
      "world",
      "card",
      worldIndex === stage.startWorld ? "is-start" : "",
      progress.cleared === progress.total ? "is-complete" : "",
    ].filter(Boolean).join(" ");

    const levels = world.levels.map((entry) => {
      const level = LEVELS[entry.key];
      const completed = isComplete(entry.key);
      const isNext = nextStep && nextStep.key === entry.key;
      const levelClasses = [
        "level",
        completed ? "is-complete" : "",
        isNext ? "is-next" : "",
      ].filter(Boolean).join(" ");

      return `
        <li class="${levelClasses}">
          <input
            class="level__checkbox"
            type="checkbox"
            data-level-key="${escapeHtml(entry.key)}"
            aria-label="Mark ${escapeHtml(level.name)} complete"
            ${completed ? "checked" : ""}
          >
          <div class="level__body">
            <div class="level__top">
              <div>
                <div class="level__title-row">
                  <strong class="level__name">${escapeHtml(level.name)}</strong>
                  ${isNext ? '<span class="badge badge--next">Next</span>' : ""}
                </div>
                <p class="level__meta">${escapeHtml(level.difficulty)} / ${escapeHtml(level.creator)}</p>
              </div>
              <a class="level__link" href="${escapeHtml(level.url)}" target="_blank" rel="noreferrer">${escapeHtml(level.linkLabel)}</a>
            </div>
            <p class="level__note">${escapeHtml(entry.note)}</p>
          </div>
        </li>
      `;
    }).join("");

    return `
      <section class="${worldClasses}">
        <div class="world__header">
          <div class="world__header-copy">
            <p class="world__eyebrow">World ${worldIndex + 1}</p>
            <h2 class="world__title">${escapeHtml(world.title)}</h2>
            <p class="world__description">${escapeHtml(world.description)}</p>
          </div>
          <div class="world__meta">
            <span class="${badge.className}">${escapeHtml(badge.label)}</span>
            <p class="world__summary">${progress.cleared} / ${progress.total} cleared</p>
          </div>
        </div>
        <ol class="level-list">${levels}</ol>
      </section>
    `;
  }).join("");
}

function render() {
  renderSummary();
  renderRoute();
}

elements.stageSelect.addEventListener("change", (event) => {
  state.stage = event.target.value;
  saveState();
  render();
});

elements.route.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-level-key]");
  if (!checkbox) {
    return;
  }

  const { levelKey } = checkbox.dataset;
  if (!LEVELS[levelKey]) {
    return;
  }

  if (checkbox.checked) {
    state.completed[levelKey] = true;
  } else {
    delete state.completed[levelKey];
  }

  saveState();
  render();
});

elements.resetProgress.addEventListener("click", () => {
  const shouldReset = window.confirm("Reset every checked level? Your current stage will stay selected.");
  if (!shouldReset) {
    return;
  }

  state.completed = {};
  saveState();
  render();
});

populateStageSelect();
render();
