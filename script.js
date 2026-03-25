const SAVE_VERSION = "path-to-1-v9";
const LEGACY_SAVE_VERSIONS = new Set(["path-to-1-v4", "path-to-1-v5", "path-to-1-v6", "path-to-1-v7", "path-to-1-v8", SAVE_VERSION]);
const ROUTE_VERSION = "5.0";
const VERIFIED_AT = "March 21, 2026";
const STORAGE_KEY = "gd-path-to-1-save";
const DEFAULT_THEME = "arcade";
const ACTIVITY_LIMIT = 18;
const UNDO_LIMIT = 12;
const DATA_STALE_DAYS = 60;
const APP_NAME = "GD Route Planner";
const PAGE_TITLES = {
  overview: "Overview",
  route: "Route",
  settings: "Settings",
};
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");
const DEFAULT_PROFILE = {
  hardest: "new-player",
  mainGoal: "balanced-growth",
  focus: "balanced",
  routeLength: "standard",
};

const THEMES = [
  { id: "arcade", label: "Arcade", description: "Loud neon campaign", colors: ["#59f7ff", "#ffd85e", "#ff5cc8"] },
  { id: "midnight", label: "Midnight", description: "Dark blue demonlist board", colors: ["#6fd3ff", "#7bd291", "#13224a"] },
  { id: "sunset", label: "Sunset", description: "Orange and gold quest map", colors: ["#ffb347", "#ff6f61", "#ffe07d"] },
  { id: "frost", label: "Frost", description: "Cold crystal route", colors: ["#b9f2ff", "#82cfff", "#9de7d7"] },
];

const SKILL_MAP_META = [
  {
    id: "wave",
    label: "Wave",
    shortLabel: "Wave",
    color: "#68d3ff",
    identityLabel: "wave-heavy climber",
    gapLabel: "wave consistency",
    focusCopy: "tunnel control and straight-line wave reads",
  },
  {
    id: "ship",
    label: "Ship",
    shortLabel: "Ship",
    color: "#8fe487",
    identityLabel: "ship-forward pilot",
    gapLabel: "ship line control",
    focusCopy: "ship lines, micro-adjustments, and air control",
  },
  {
    id: "timings",
    label: "Timings",
    shortLabel: "Timings",
    color: "#ffd66e",
    identityLabel: "timing-first reactor",
    gapLabel: "timing precision",
    focusCopy: "orb clicks, burst timing, and precise sync",
  },
  {
    id: "memory",
    label: "Memory",
    shortLabel: "Memory",
    color: "#ff8fb3",
    identityLabel: "memory-reader",
    gapLabel: "memory exposure",
    focusCopy: "learn-heavy reads, traps, and routing memory",
  },
  {
    id: "duals",
    label: "Duals",
    shortLabel: "Duals",
    color: "#b18bff",
    identityLabel: "dual-aware splitter",
    gapLabel: "dual consistency",
    focusCopy: "split-focus dual control and mirrored awareness",
  },
  {
    id: "endurance",
    label: "Endurance",
    shortLabel: "Endurance",
    color: "#ff9966",
    identityLabel: "endurance grinder",
    gapLabel: "endurance floor",
    focusCopy: "late-run stamina, long focus, and run management",
  },
  {
    id: "nerve",
    label: "Nerve Control",
    shortLabel: "Nerves",
    color: "#ff6b6b",
    identityLabel: "nerve-ready closer",
    gapLabel: "late-run nerve",
    focusCopy: "boss pressure, endings, and closeout composure",
  },
  {
    id: "consistency",
    label: "Consistency",
    shortLabel: "Consistency",
    color: "#6fe1c6",
    identityLabel: "consistency builder",
    gapLabel: "consistency floor",
    focusCopy: "repeatable control, clean reps, and stable execution",
  },
];
const SKILL_MAP_LOOKUP = Object.fromEntries(SKILL_MAP_META.map((skill) => [skill.id, skill]));
const SKILL_DNA_RULES = [
  { keywords: ["wave", "tunnel", "straight line", "straight-line", "straight fly", "straight-fly"], weights: { wave: 1.8, consistency: 0.35 } },
  { keywords: ["ship", "line control", "micro", "ufo"], weights: { ship: 1.65, consistency: 0.35 } },
  { keywords: ["timing", "timings", "rhythm", "precision", "orb", "click", "burst", "reaction", "technical"], weights: { timings: 1.7, consistency: 0.3 } },
  { keywords: ["memory", "trap", "learn", "pattern", "mirror", "routing", "visual read", "visual reading", "read discipline"], weights: { memory: 1.7, consistency: 0.2 } },
  { keywords: ["dual", "duals", "split focus", "dual awareness"], weights: { duals: 2, consistency: 0.25 } },
  { keywords: ["endurance", "stamina", "xl", "late run", "late-run", "long focus", "run management", "concentration"], weights: { endurance: 1.75, nerve: 0.3, consistency: 0.3 } },
  { keywords: ["nerve", "nerves", "pressure", "composure", "ending", "closeout", "first clear", "boss"], weights: { nerve: 1.8, endurance: 0.2, consistency: 0.25 } },
  { keywords: ["consistency", "discipline", "stable", "confidence", "control", "execution", "flow", "repetition"], weights: { consistency: 1.65, timings: 0.2 } },
];
const TRAINING_SIGNAL_TO_SKILLS = {
  wave: { wave: 1.1, consistency: 0.3 },
  chokepoint: { timings: 1, consistency: 0.45 },
  stamina: { endurance: 1.1, nerve: 0.25 },
  nerve: { nerve: 1.2, consistency: 0.3 },
  ending: { nerve: 0.9, endurance: 0.85, consistency: 0.45 },
};

const WORLD_BIOMES = [
  { id: "dawn-fields", label: "Dawn Fields", subtitle: "Starter meadows and low-stakes ramps", accent: "#93f36f", accent2: "#ffe36b", skyA: "#5ad0a7", skyB: "#173a2f", ground: "#1f5b36", mist: "rgba(147, 243, 111, 0.16)", path: "#fff1a8" },
  { id: "neon-harbor", label: "Neon Harbor", subtitle: "Arcade docks full of beginner demons", accent: "#5ef2ff", accent2: "#7b89ff", skyA: "#17405d", skyB: "#08192d", ground: "#10344f", mist: "rgba(94, 242, 255, 0.16)", path: "#a5fdff" },
  { id: "crystal-caves", label: "Crystal Caves", subtitle: "Glowing caverns with longer reads", accent: "#9ce4ff", accent2: "#d8fff0", skyA: "#123748", skyB: "#06131d", ground: "#184a58", mist: "rgba(156, 228, 255, 0.17)", path: "#defdff" },
  { id: "clockwork-ruins", label: "Clockwork Ruins", subtitle: "Ancient machinery and tighter control", accent: "#ffb35c", accent2: "#ffd989", skyA: "#5d3314", skyB: "#1d0d04", ground: "#4b2710", mist: "rgba(255, 179, 92, 0.16)", path: "#ffe7aa" },
  { id: "storm-ridge", label: "Storm Ridge", subtitle: "Hard-demon lightning and split paths", accent: "#8ec5ff", accent2: "#f8f6ff", skyA: "#304a88", skyB: "#101526", ground: "#21345f", mist: "rgba(142, 197, 255, 0.18)", path: "#edf4ff" },
  { id: "molten-depths", label: "Molten Depths", subtitle: "Insane-demon magma and heat checks", accent: "#ff7a4f", accent2: "#ffd05e", skyA: "#672313", skyB: "#1d0705", ground: "#4d190d", mist: "rgba(255, 122, 79, 0.18)", path: "#ffd2a2" },
  { id: "blood-bastion", label: "Blood Bastion", subtitle: "First extremes at the crimson gate", accent: "#ff6678", accent2: "#ffb66d", skyA: "#5b1430", skyB: "#18060d", ground: "#411022", mist: "rgba(255, 102, 120, 0.16)", path: "#ffc7cd" },
  { id: "void-cathedral", label: "Void Cathedral", subtitle: "Legacy titans under a black-red sky", accent: "#d07cff", accent2: "#ff7aa2", skyA: "#331d57", skyB: "#0d0617", ground: "#22123d", mist: "rgba(208, 124, 255, 0.15)", path: "#f0c7ff" },
  { id: "circuit-citadel", label: "Circuit Citadel", subtitle: "Modern list gates and machine lanes", accent: "#61ffd7", accent2: "#73c7ff", skyA: "#0f4f52", skyB: "#04181f", ground: "#0d373c", mist: "rgba(97, 255, 215, 0.16)", path: "#bdfef1" },
  { id: "eclipse-basin", label: "Eclipse Basin", subtitle: "Top-100 pressure in a dark basin", accent: "#ff8fd8", accent2: "#ffd36b", skyA: "#4b1f49", skyB: "#120711", ground: "#31112f", mist: "rgba(255, 143, 216, 0.17)", path: "#ffd9ef" },
  { id: "starfall-keep", label: "Starfall Keep", subtitle: "Main-list towers and falling light", accent: "#a39bff", accent2: "#91f3ff", skyA: "#2a2d6c", skyB: "#090d22", ground: "#1d2053", mist: "rgba(163, 155, 255, 0.17)", path: "#d7d5ff" },
  { id: "zenith-summit", label: "Zenith Summit", subtitle: "The last climb above the cloudline", accent: "#fff179", accent2: "#ff8e63", skyA: "#53508a", skyB: "#171326", ground: "#383667", mist: "rgba(255, 241, 121, 0.18)", path: "#fff2b2" },
];

const PROFILE_QUESTIONS = {
  hardest: {
    label: "Where are you at right now?",
    options: [
      { id: "new-player", title: "New Player", description: "I am still learning official levels, easy online maps, and core controls." },
      { id: "easy-demon", title: "Easy Demon", description: "I can clear easy demons but need a fuller base." },
      { id: "medium-demon", title: "Medium Demon", description: "Medium demons are my current lane." },
      { id: "hard-demon", title: "Hard Demon", description: "I can beat hard demons and want to climb cleanly." },
      { id: "insane-demon", title: "Insane Demon", description: "I am preparing for or already beating insanes." },
      { id: "extreme-demon", title: "Extreme Demon", description: "I want a real route into list-level play." },
      { id: "list-ready", title: "List Ready", description: "I already beat extremes and want a top-player ladder." },
    ],
  },
  mainGoal: {
    label: "What is the main goal of this route?",
    options: [
      { id: "balanced-growth", title: "Balanced Growth", description: "Build the cleanest all-around foundation with smooth coverage." },
      { id: "weakness-focus", title: "Fix A Weakness", description: "Push the route harder toward the mechanic weakness I choose." },
      { id: "consistency", title: "Consistency", description: "Favor levels that build repeatability, control, and finished runs." },
      { id: "fast-climb", title: "Climb Fast", description: "Take the leanest viable line upward with fewer bridge picks." },
      { id: "milestones", title: "Milestones", description: "Prioritize iconic benchmark clears and famous gate levels." },
    ],
  },
  focus: {
    label: "What should the route help most right now?",
    options: [
      { id: "balanced", title: "Balanced", description: "Keep the route broad and well-rounded." },
      { id: "wave", title: "Wave", description: "Bias toward wave-heavy checkpoints and straight-line control." },
      { id: "ship", title: "Ship", description: "Give me more ship pressure and line-control practice." },
      { id: "timings", title: "Timings", description: "Prioritize click precision, rhythm, and awkward inputs." },
      { id: "memory", title: "Memory", description: "Give me more learn-heavy and trap-heavy levels." },
      { id: "duals", title: "Duals", description: "Bias toward split-focus and dual control." },
      { id: "endurance", title: "Endurance", description: "Favor longer runs, composure, and late-run stamina." },
    ],
  },
  routeLength: {
    label: "How long should the custom journey be?",
    options: [
      { id: "express", title: "Express", description: "A tighter route with fewer bridge levels." },
      { id: "standard", title: "Standard", description: "A full campaign with good smoothing between walls." },
      { id: "marathon", title: "Marathon", description: "Give me the huge version with the deepest pool." },
    ],
  },
};

const START_WORLD_BY_HARDEST = {
  "new-player": 0,
  "easy-demon": 3,
  "medium-demon": 5,
  "hard-demon": 6,
  "insane-demon": 7,
  "extreme-demon": 8,
  "list-ready": 10,
};

const LENGTH_SETTINGS = {
  express: { warmup: 3, early: 5, middle: 6, late: 7 },
  standard: { warmup: 4, early: 8, middle: 9, late: 10 },
  marathon: { warmup: 999, early: 999, middle: 999, late: 999 },
};

const FOCUS_KEYWORDS = {
  balanced: [],
  wave: ["wave", "tunnel", "straight-line", "straight fly"],
  ship: ["ship", "straight-fly", "micro", "line control"],
  timings: ["timing", "rhythm", "precision", "burst", "click"],
  memory: ["memory", "trap", "learn", "pattern"],
  duals: ["dual", "split focus"],
  endurance: ["endurance", "stamina", "xl", "late", "long focus", "run management", "consistency", "composure"],
};

const MAIN_GOAL_SETTINGS = {
  "balanced-growth": {
    targetAdjustment: 1,
    focusWeight: 34,
    milestoneWeight: 18,
    placementWeight: 10,
    communityWeight: 18,
    smoothnessWeight: 18,
    longWeight: 8,
    xlWeight: 10,
    speedBias: 0,
    adjacencyWeight: 6,
    varietyWeight: 12,
    focusChainWeight: 4,
  },
  "weakness-focus": {
    targetAdjustment: 1,
    focusWeight: 82,
    milestoneWeight: 14,
    placementWeight: 8,
    communityWeight: 14,
    smoothnessWeight: 13,
    longWeight: 4,
    xlWeight: 4,
    speedBias: -0.2,
    adjacencyWeight: 8,
    varietyWeight: 2,
    focusChainWeight: 18,
  },
  consistency: {
    targetAdjustment: 1,
    focusWeight: 42,
    milestoneWeight: 14,
    placementWeight: 10,
    communityWeight: 14,
    smoothnessWeight: 24,
    longWeight: 16,
    xlWeight: 18,
    speedBias: -0.7,
    adjacencyWeight: 10,
    varietyWeight: 6,
    focusChainWeight: 8,
  },
  "fast-climb": {
    targetAdjustment: -2,
    focusWeight: 26,
    milestoneWeight: 30,
    placementWeight: 22,
    communityWeight: 18,
    smoothnessWeight: 7,
    longWeight: -4,
    xlWeight: -10,
    speedBias: 1.1,
    adjacencyWeight: 0,
    varietyWeight: 0,
    focusChainWeight: 4,
  },
  milestones: {
    targetAdjustment: 0,
    focusWeight: 30,
    milestoneWeight: 38,
    placementWeight: 28,
    communityWeight: 24,
    smoothnessWeight: 11,
    longWeight: 0,
    xlWeight: 2,
    speedBias: 0.2,
    adjacencyWeight: 4,
    varietyWeight: 4,
    focusChainWeight: 6,
  },
};

const MAIN_PROGRESS_OPTIONS = [
  { id: "ready", label: "Ready" },
  { id: "practicing", label: "Practicing" },
  { id: "consistent", label: "Consistent" },
  { id: "cleared", label: "Cleared" },
  { id: "revisit", label: "Revisit" },
];

const BONUS_PROGRESS_OPTIONS = [
  { id: "optional", label: "Optional" },
  { id: "practicing", label: "Practicing" },
  { id: "consistent", label: "Consistent" },
  { id: "cleared", label: "Cleared" },
];

const TRAINING_LOG_LIMIT = 180;
const QUEST_LOG_LIMIT = 180;
const TRAINING_SIGNAL_META = [
  {
    id: "wave",
    label: "Wave consistency",
    shortLabel: "Wave",
    focus: "wave",
    queueLabel: "Wave repair",
    description: "Recent reps are breaking on wave-heavy or tunnel-style control.",
  },
  {
    id: "chokepoint",
    label: "Chokepoints",
    shortLabel: "Chokepoint",
    focus: "timings",
    queueLabel: "Chokepoint drill",
    description: "One or two repeated sections are blocking otherwise playable runs.",
  },
  {
    id: "stamina",
    label: "Stamina",
    shortLabel: "Stamina",
    focus: "endurance",
    queueLabel: "Stamina build",
    description: "Longer runs are fading before the level is over.",
  },
  {
    id: "nerve",
    label: "Nerve control",
    shortLabel: "Nerves",
    focus: "endurance",
    queueLabel: "Nerve reset",
    description: "Pressure is showing up once the attempt starts to matter.",
  },
  {
    id: "ending",
    label: "Failed endings",
    shortLabel: "Endings",
    focus: "endurance",
    queueLabel: "Finish reps",
    description: "You are reaching late runs but not closing them often enough.",
  },
];
const TRAINING_SIGNAL_IDS = new Set(TRAINING_SIGNAL_META.map((signal) => signal.id));
const TRAINING_SIGNAL_LOOKUP = Object.fromEntries(TRAINING_SIGNAL_META.map((signal) => [signal.id, signal]));
const TRAINING_RESULT_OPTIONS = [
  { id: "rough", label: "Rough Session" },
  { id: "progress", label: "Progress Made" },
  { id: "stable", label: "Stable Reps" },
  { id: "clear", label: "Clear Or Finish" },
];
const TRAINING_FAIL_POINT_OPTIONS = [
  { id: "opening", label: "Opening" },
  { id: "mid", label: "Mid Run" },
  { id: "ending", label: "Ending" },
  { id: "clear", label: "Clear" },
];
const TRAINING_NOTE_KEYWORDS = {
  wave: ["wave", "straight fly", "straight-fly", "straight line", "tunnel"],
  chokepoint: ["choke", "chokepoint", "wall", "section", "transition", "part", "gate", "click pattern"],
  stamina: ["stamina", "endurance", "xl", "long", "fatigue", "tired", "drain"],
  nerve: ["nerve", "nerves", "panic", "pressure", "shaky", "freeze", "stress"],
  ending: ["ending", "end", "last", "final", "closeout", "last click", "drop the ending"],
};
const SESSION_MODES = [
  {
    id: "30",
    label: "30 Min",
    description: "Fast reset with one focused push cycle.",
    totalMinutes: 30,
    blocks: { warmup: 6, push: 14, repair: 6, reclaim: 4 },
  },
  {
    id: "60",
    label: "60 Min",
    description: "Balanced session with room for adaptation.",
    totalMinutes: 60,
    blocks: { warmup: 12, push: 26, repair: 14, reclaim: 8 },
  },
  {
    id: "long",
    label: "Long Grind",
    description: "Extended block for real progression days.",
    totalMinutes: 100,
    blocks: { warmup: 15, push: 44, repair: 24, reclaim: 17 },
  },
];
const SESSION_MODE_IDS = new Set(SESSION_MODES.map((mode) => mode.id));
const MASTERY_TIERS = [
  { min: 0, label: "Cold", shortLabel: "Cold", className: "cold" },
  { min: 25, label: "Building", shortLabel: "Build", className: "building" },
  { min: 45, label: "Stable", shortLabel: "Stable", className: "stable" },
  { min: 65, label: "Locked In", shortLabel: "Locked", className: "locked" },
  { min: 82, label: "Mastered", shortLabel: "Mastered", className: "mastered" },
];
const COACH_BADGES = [
  {
    id: "three-day-streak",
    label: "Relay Active",
    description: "Log sessions on 3 straight days.",
    isEarned: (metrics) => metrics.trainingStreak >= 3,
    progress: (metrics) => `${Math.min(metrics.trainingStreak, 3)} / 3 days`,
  },
  {
    id: "quest-chain",
    label: "Quest Chain",
    description: "Finish 8 auto-generated quests.",
    isEarned: (metrics) => metrics.questCount >= 8,
    progress: (metrics) => `${Math.min(metrics.questCount, 8)} / 8 quests`,
  },
  {
    id: "consistency-cache",
    label: "Consistency Cache",
    description: "Hold 5 levels at Locked In mastery or higher.",
    isEarned: (metrics) => metrics.lockedInCount >= 5,
    progress: (metrics) => `${Math.min(metrics.lockedInCount, 5)} / 5 levels`,
  },
  {
    id: "boss-window",
    label: "Boss Window",
    description: "Push the next boss readiness score to 75.",
    isEarned: (metrics) => metrics.readinessScore >= 75,
    progress: (metrics) => `${Math.min(metrics.readinessScore, 75)} / 75 readiness`,
  },
];

function levelMeta(name, creator, levelId, difficulty, stars, length, extra = {}) {
  return {
    name,
    creator,
    levelId,
    difficulty,
    stars,
    length,
    levelUrl: extra.levelUrl || `https://gdbrowser.com/${levelId}`,
    ...extra,
  };
}

function officialLevelMeta(name, slug, order, difficulty, stars, length = "Long") {
  return levelMeta(name, "RobTop", `OL-${String(order).padStart(2, "0")}`, difficulty, stars, length, {
    levelUrl: `https://geometry-dash.fandom.com/wiki/${slug}`,
  });
}

function mainStep(metaKey, reason, skills, extra = {}) {
  return { metaKey, reason, skills, ...extra };
}

function bonusStep(metaKey, reason, skills, extra = {}) {
  return { metaKey, reason, skills, ...extra };
}

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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundTo(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function hexToRgba(hex, alpha = 1) {
  const normalized = String(hex || "").replace("#", "").trim();
  const safeHex = normalized.length === 3
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized.padEnd(6, "0").slice(0, 6);
  const parsed = Number.parseInt(safeHex, 16);
  const red = (parsed >> 16) & 255;
  const green = (parsed >> 8) & 255;
  const blue = parsed & 255;
  return `rgba(${red}, ${green}, ${blue}, ${clamp(alpha, 0, 1)})`;
}

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const LEVEL_META = {
  stereoMadness: officialLevelMeta("Stereo Madness", "Stereo_Madness", 1, "Easy", 1),
  backOnTrack: officialLevelMeta("Back On Track", "Back_On_Track", 2, "Easy", 2),
  polargeist: officialLevelMeta("Polargeist", "Polargeist", 3, "Normal", 3),
  dryOut: officialLevelMeta("Dry Out", "Dry_Out", 4, "Hard", 4),
  baseAfterBase: officialLevelMeta("Base After Base", "Base_After_Base", 5, "Hard", 5),
  cantLetGo: officialLevelMeta("Can't Let Go", "Can%27t_Let_Go", 6, "Harder", 6),
  jumper: officialLevelMeta("Jumper", "Jumper", 7, "Harder", 7),
  timeMachine: officialLevelMeta("Time Machine", "Time_Machine", 8, "Harder", 8),
  cycles: officialLevelMeta("Cycles", "Cycles", 9, "Hard", 9),
  xStep: officialLevelMeta("xStep", "Xstep", 10, "Harder", 10),
  clutterfunk: officialLevelMeta("Clutterfunk", "Clutterfunk", 11, "Harder", 11),
  theoryOfEverything: officialLevelMeta("Theory of Everything", "Theory_of_Everything", 12, "Insane", 12),
  electromanAdventures: officialLevelMeta("Electroman Adventures", "Electroman_Adventures", 13, "Insane", 13),
  hexagonForce: officialLevelMeta("Hexagon Force", "Hexagon_Force", 14, "Harder", 14),
  blastProcessing: officialLevelMeta("Blast Processing", "Blast_Processing", 15, "Harder", 15),
  geometricalDominator: officialLevelMeta("Geometrical Dominator", "Geometrical_Dominator", 16, "Harder", 16),
  retray: levelMeta("ReTraY", "BoyOfTheCones", 6508283, "Easy", 3, "Short"),
  darkParadise: levelMeta("Dark Paradise", "Roli GD", 11280109, "Easy", 2, "Long"),
  amplification: levelMeta("Amplification", "Berkoo", 20635816, "Hard", 5, "Long"),
  slam: levelMeta("Slam", "XronoM", 22018994, "Harder", 7, "Long"),
  fireAura: levelMeta("Fire Aura", "Sumsar", 4243988, "Harder", 7, "Long"),
  theNightmare: levelMeta("The Nightmare", "Jax", 13519, "Easy Demon", 10, "Long"),
  theLightningRoad: levelMeta("The Lightning Road", "timeless real", 55520, "Easy Demon", 10, "Long"),
  shiver: levelMeta("Shiver", "SpKale", 56210242, "Easy Demon", 10, "Long"),
  phjork: levelMeta("phjork", "cerufiffy", 56587109, "Easy Demon", 10, "Medium"),
  starpunk: levelMeta("STARPUNK", "Ferdefunky", 63087691, "Easy Demon", 10, "XL"),
  isLevel: levelMeta("iS", "Grenate", 65765662, "Easy Demon", 10, "Long"),
  platinumAdventure: levelMeta("Platinum Adventure", "Jerry4", 5904109, "Easy Demon", 10, "Long"),
  speedRacer: levelMeta("Speed Racer", "ZenthicAlpha", 3543219, "Easy Demon", 10, "Long"),
  weird: levelMeta("weird", "llertt", 76564776, "Easy Demon", 10, "Long"),
  xLevel: levelMeta("X", "TriAxis", 17235008, "Easy Demon", 10, "Long"),
  deCode: levelMeta("DeCode", "Rek3dge", 2997354, "Easy Demon", 10, "Long"),
  clubstepDynamix: levelMeta("ClubstepDynamix", "ZenthicAlpha", 994282, "Easy Demon", 10, "Long"),
  deathMoon: levelMeta("Death Moon", "Caustic", 8660411, "Easy Demon", 10, "XL"),
  problematic: levelMeta("Problematic", "Dhafin", 7116121, "Easy Demon", 10, "Long"),
  sidestep: levelMeta("Sidestep", "ChaSe", 18025697, "Easy Demon", 10, "Long"),
  dearNostalgists: levelMeta("Dear Nostalgists", "TriAxis", 18735780, "Easy Demon", 10, "XL"),
  playWithFire: levelMeta("PLAY WITH FIRE", "LillyVX", 90437094, "Easy Demon", 10, "Long"),
  maymory: levelMeta("MAYMORY", "ItzKiba", 80433444, "Easy Demon", 10, "Long"),
  bornSurvivor: levelMeta("Born Survivor", "Splinter25", 79691289, "Easy Demon", 10, "Long"),
  changeOfScene: levelMeta("Change of Scene", "bli", 90475473, "Easy Demon", 10, "XL"),
  skullduggery: levelMeta("SkullduGGerY", "alkali", 79840720, "Easy Demon", 10, "Long"),
  crush: levelMeta("CRUSH", "Subwoofer", 80218929, "Easy Demon", 10, "XL"),
  moryo: levelMeta("MORYO", "EnZore", 57874008, "Easy Demon", 10, "Long"),
  pxttxrnSxxkxr: levelMeta("PXTTXRN SXXKXR", "Viot", 81391957, "Easy Demon", 10, "Long"),
  downUnda: levelMeta("Down Unda", "Danzmen", 81451870, "Easy Demon", 10, "Long"),
  ispy: levelMeta("iSpyWithMyLittleEye", "Voxicat", 89886591, "Easy Demon", 10, "Long"),
  absoluteGarbage: levelMeta("Absolute Garbage", "bli", 83158255, "Easy Demon", 10, "Long"),
  dragonsLair: levelMeta("The Dragons lair", "Draykonic", 11311830, "Easy Demon", 10, "XL"),
  crazyBolt: levelMeta("Crazy Bolt", "FunnyGame", 413504, "Easy Demon", 10, "Long"),
  mirrorForce: levelMeta("Mirror Force", "Dudex", 22390740, "Easy Demon", 10, "Long"),
  funkyNight: levelMeta("Funky Night", "Tygore", 106091477, "Easy Demon", 10, "Long"),
  holdOn: levelMeta("Hold On", "DHaner", 65947116, "Easy Demon", 10, "Medium"),
  strings: levelMeta("Strings", "Frama", 108020084, "Easy Demon", 10, "Long"),
  slapSquadII: levelMeta("Slap Squad II", "Danzmen", 43276194, "Easy Demon", 10, "Long"),
  submerged: levelMeta("Submerged", "Subwoofer", 57871639, "Easy Demon", 10, "Long"),
  motion: levelMeta("Motion", "TamaN", 15619194, "Easy Demon", 10, "Long"),
  spark: levelMeta("Spark", "PotatoBaby", 31076618, "Easy Demon", 10, "Long"),
  adust: levelMeta("Adust", "f3lixsram", 33244195, "Easy Demon", 10, "Long"),
  zircon: levelMeta("Zircon", "DHaner", 76821414, "Easy Demon", 10, "Long"),
  ratioCircles: levelMeta("Ratio Circles", "ch4rlie03", 77132030, "Easy Demon", 10, "Medium"),
  gloriousFortress: levelMeta("GLORIOUS FORTRESS", "JamAttack", 95436164, "Easy Demon", 10, "XL"),
  citadel: levelMeta("Citadel", "Subwoofer", 112204024, "Easy Demon", 10, "Long"),
  airborneTakedown: levelMeta("Airborne Takedown", "seannnn", 112023775, "Easy Demon", 10, "Long"),
  overdose: levelMeta("Overdose", "khelado", 113139862, "Easy Demon", 10, "Long"),
  nadrr: levelMeta("NADRR", "Ardolf", 68862692, "Easy Demon", 10, "Long"),
  neufCercles: levelMeta("Neuf Cercles", "Gepsoni4", 110959028, "Easy Demon", 10, "Long"),
  bLevel: levelMeta("B", "motleyorc", 34085027, "Medium Demon", 10, "Long"),
  goldTemple: levelMeta("Gold Temple", "Serponge", 21337579, "Medium Demon", 10, "Long"),
  verity: levelMeta("VeritY", "Serponge", 18834999, "Medium Demon", 10, "Long"),
  hell: levelMeta("HeLL", "Serponge", 25706351, "Medium Demon", 10, "Long"),
  mechanicalShowdown: levelMeta("Mechanical Showdown", "Tongii", 27786218, "Medium Demon", 10, "Long"),
  sakupenEgg: levelMeta("Sakupen Egg", "Sivlol", 58002670, "Medium Demon", 10, "Long"),
  dorabaeDifficult2: levelMeta("dorabaedifficult2", "DORABAE", 1567615, "Medium Demon", 10, "Long"),
  speedOfLightII: levelMeta("Speed of Light II", "TheRealSalad", 7016598, "Medium Demon", 10, "Long"),
  stellaCirculos: levelMeta("Stella Circulos", "BranSilver", 94604704, "Medium Demon", 10, "Long"),
  insertCoin: levelMeta("INSERT COIN", "Etzer", 4318253, "Medium Demon", 10, "Long"),
  section: levelMeta("Section", "guppy28", 62378908, "Medium Demon", 10, "Long"),
  shrillHallway: levelMeta("Shrill Hallway", "Nico99", 36966088, "Medium Demon", 10, "Long"),
  silentClubXRebirth: levelMeta("Silent ClubX Rebirth", "BrainETR", 86155700, "Medium Demon", 10, "Long"),
  fratura: levelMeta("Fratura", "joojmiguel", 78079575, "Medium Demon", 10, "Long"),
  scarletSmog: levelMeta("Scarlet Smog", "ToastLord", 67113181, "Medium Demon", 10, "Long"),
  tenguWind: levelMeta("Tengu Wind", "Shemo", 47853491, "Medium Demon", 10, "Long"),
  saturnV: levelMeta("Saturn V", "nasgubb", 34907693, "Medium Demon", 10, "Long"),
  systemSplit: levelMeta("System Split", "Picha", 5433594, "Medium Demon", 10, "Long"),
  badEnding: levelMeta("Bad Ending", "MaFFaKa", 89899000, "Medium Demon", 10, "Long"),
  asadal: levelMeta("Asadal", "Seokso", 83323659, "Medium Demon", 10, "Long"),
  draconicSpeed: levelMeta("Draconic Speed", "Alex1304", 57298751, "Medium Demon", 10, "Long"),
  oneSpace: levelMeta("One Space", "Zoroa", 62195944, "Medium Demon", 10, "Long"),
  pabrik: levelMeta("PABRIK", "R4NGER", 83256789, "Medium Demon", 10, "Long"),
  paracosmCircles: levelMeta("Paracosm Circles", "N1XO", 10197026, "Medium Demon", 10, "Medium"),
  carpeLucem: levelMeta("Carpe Lucem", "Zoroa", 78901064, "Medium Demon", 10, "Medium"),
  hemi: levelMeta("HEMI", "X1RON", 80560662, "Medium Demon", 10, "XL"),
  starlightCarnival: levelMeta("Starlight Carnival", "F5night", 47221469, "Medium Demon", 10, "Long"),
  biru: levelMeta("Biru", "JonathanGD", 47611766, "Medium Demon", 10, "XL"),
  reanimation: levelMeta("Reanimation", "Terron", 14975695, "Medium Demon", 10, "XL"),
  nineCircles: levelMeta("Nine Circles", "Zobros", 4284013, "Hard Demon", 10, "Long"),
  jawbreaker: levelMeta("Jawbreaker", "ZenthicAlpha", 6939821, "Hard Demon", 10, "Long"),
  doubleDash: levelMeta("Double Dash", "Zoroa", 59315849, "Hard Demon", 10, "XL"),
  danceMassacre: levelMeta("Dance Massacre", "Hinds", 11607707, "Hard Demon", 10, "Long"),
  sedulous: levelMeta("Sedulous", "Samifying", 64618054, "Hard Demon", 10, "Long"),
  psychosis: levelMeta("Psychosis", "Hinds", 15855959, "Hard Demon", 10, "Long"),
  futureFunk: levelMeta("Future Funk", "JonathanGD", 44062068, "Hard Demon", 10, "XL"),
  forestTemple: levelMeta("Forest Temple", "Michigun", 11402965, "Hard Demon", 10, "Long"),
  crazy: levelMeta("CraZy", "DavJT", 40945673, "Hard Demon", 10, "Long"),
  differentDescent: levelMeta("Different Descent", "Danke", 62857306, "Hard Demon", 10, "XL"),
  theCaverns: levelMeta("The Caverns", "pasiblitz", 4218933, "Hard Demon", 10, "Long"),
  ditchedMachine: levelMeta("Ditched Machine", "Jeyzor", 4192768, "Hard Demon", 10, "Long"),
  spacelocked: levelMeta("Spacelocked", "LazerBlitz", 17013102, "Hard Demon", 10, "Long"),
  whiteWomen: levelMeta("white women", "heatherhayes", 63075323, "Hard Demon", 10, "Long"),
  forsakenNeon: levelMeta("Forsaken Neon", "Zobros", 6300721, "Hard Demon", 10, "Long"),
  toeIII: levelMeta("TOE III", "Manix648", 29443338, "Hard Demon", 10, "Long"),
  radioactive: levelMeta("Radioactive", "ViPriN", 7570320, "Hard Demon", 10, "Long"),
  templeOfTime: levelMeta("Temple of Time", "DavJT", 68408784, "Hard Demon", 10, "Long"),
  diffuse: levelMeta("Diffuse", "Hinds", 36667269, "Hard Demon", 10, "Long"),
  kitty: levelMeta("Kitty", "f3lixsram", 35446873, "Hard Demon", 10, "Long"),
  zap: levelMeta("Zap", "Darwin", 62521060, "Hard Demon", 10, "Long"),
  nowise: levelMeta("Nowise", "Darwin", 38398923, "Hard Demon", 10, "Long"),
  theEschaton: levelMeta("The Eschaton", "Xender Game", 56946102, "Hard Demon", 10, "XL"),
  mastermind: levelMeta("Mastermind", "Hinds", 71220097, "Hard Demon", 10, "Long"),
  njorun: levelMeta("Njorun", "gradientxd", 64161645, "Hard Demon", 10, "Long"),
  windyLandscape: levelMeta("Windy Landscape", "WOOGI1411", 4957691, "Insane Demon", 10, "Long"),
  acropolis: levelMeta("Acropolis", "Zobros", 5155022, "Insane Demon", 10, "Long"),
  magmaBound: levelMeta("Magma Bound", "ScorchVx", 56568010, "Insane Demon", 10, "Long"),
  supersonic: levelMeta("Supersonic", "ZenthicAlpha", 4706930, "Insane Demon", 10, "Long"),
  poltergeist: levelMeta("Poltergeist", "Andromeda GMD", 7054561, "Insane Demon", 10, "Long"),
  leyak: levelMeta("Leyak", "EnZore", 61137742, "Insane Demon", 10, "Long"),
  gumshot: levelMeta("Gumshot", "qMystic", 75806677, "Insane Demon", 10, "Long"),
  darkTravel: levelMeta("Dark Travel", "JonathanGD", 32885972, "Insane Demon", 10, "XL"),
  crazyII: levelMeta("CraZy II", "DavJT", 47620786, "Insane Demon", 10, "Long"),
  firewall: levelMeta("Firewall", "Hinds", 13437081, "Insane Demon", 10, "Long"),
  arcane: levelMeta("Arcane", "qMystic", 65269826, "Insane Demon", 10, "XL"),
  nightTerrors: levelMeta("Night Terrors", "Hinds", 15395840, "Insane Demon", 10, "Long"),
  stalemate: levelMeta("Stalemate", "Nox", 4545425, "Insane Demon", 10, "Long"),
  sixF: levelMeta("FFFFFF", "Vlacc", 68983167, "Insane Demon", 10, "Long"),
  poeyengAeng: levelMeta("Poeyeng Aeng", "Akunakunn", 70357068, "Insane Demon", 10, "Long"),
  feral: levelMeta("Feral", "Insidee", 66765209, "Insane Demon", 10, "Medium"),
  ulon: levelMeta("Ulon", "OliSW", 68688822, "Insane Demon", 10, "Long"),
  interstellarInfant: levelMeta("Interstellar Infant", "Fault", 65496280, "Insane Demon", 10, "Long"),
  reRust: levelMeta("ReRUST", "Dawnf4ll", 91424942, "Insane Demon", 10, "Long"),
  arcaneAscent: levelMeta("arcane ascent", "alkali", 61529436, "Insane Demon", 10, "XL"),
  exg: levelMeta("EXG", "Grax", 76866307, "Insane Demon", 10, "Long"),
  thanatophobia: levelMeta("Thanatophobia", "ARtu", 62809982, "Insane Demon", 10, "Long"),
  mothmelons: levelMeta("MOTHMELONS", "Valentlne", 79428382, "Insane Demon", 10, "Long"),
  acu: levelMeta("Acu", "neigefeu", 61079355, "Extreme Demon", 10, "Long"),
  cataclysm: levelMeta("Cataclysm", "Ggb0y", 3979721, "Extreme Demon", 10, "Long"),
  hypersonic: levelMeta("HyperSonic", "ViPriN", 30219145, "Extreme Demon", 10, "Long"),
  allegiance: levelMeta("Allegiance", "nikroplays", 20761188, "Extreme Demon", 10, "Long"),
  napalm: levelMeta("Napalm", "Marwec", 65561437, "Extreme Demon", 10, "Long"),
  theUltimatePhase: levelMeta("The Ultimate Phase", "Andromeda GMD", 7174110, "Extreme Demon", 10, "Long"),
  niwa: levelMeta("niwa", "Teno", 87425029, "Extreme Demon", 10, "Long"),
  penombre: levelMeta("Penombre", "ZephiroX", 48454650, "Extreme Demon", 10, "Long"),
  prismaticHaze: levelMeta("Prismatic Haze", "Cirtrax", 59899374, "Extreme Demon", 10, "Long"),
  crowdControl: levelMeta("Crowd Control", "zDeadlox", 69491632, "Extreme Demon", 10, "Long"),
  incipient: levelMeta("Incipient", "Jenkins", 32688321, "Extreme Demon", 10, "Long"),
  azurite: levelMeta("Azurite", "Sillow", 62214792, "Extreme Demon", 10, "Long"),
  quantumProcessing: levelMeta("Quantum Processing", "Riot", 38235367, "Extreme Demon", 10, "Long"),
  redWorldRebirth: levelMeta("Red World Rebirth", "Riot", 20077821, "Extreme Demon", 10, "Long"),
  novalis: levelMeta("Novalis", "Gryllex", 33748382, "Extreme Demon", 10, "Long"),
  lostLove: levelMeta("Lost Love", "TheBlackHell", 85933508, "Extreme Demon", 10, "Long"),
  necropolix: levelMeta("NecropoliX", "Namtar", 36449129, "Extreme Demon", 10, "Long"),
  mistyMountains: levelMeta("Misty Mountains", "We4therMan", 60708767, "Extreme Demon", 10, "XL"),
  retention: levelMeta("Retention", "WOOGI1411", 18697406, "Extreme Demon", 10, "Long"),
  bloodbath: levelMeta("Bloodbath", "Riot", 10565740, "Extreme Demon", 10, "Long"),
  artificialAscent: levelMeta("Artificial Ascent", "ViPriN", 27122654, "Extreme Demon", 10, "XL"),
  blackBlizzard: levelMeta("Black Blizzard", "KrmaL", 34057654, "Extreme Demon", 10, "Long"),
  digitalDescent: levelMeta("Digital Descent", "ViPriN", 37456092, "Extreme Demon", 10, "XL"),
  sonicWave: levelMeta("Sonic Wave", "lSunix", 26681070, "Extreme Demon", 10, "XL"),
  yatagarasu: levelMeta("Yatagarasu", "TrusTa", 28220417, "Extreme Demon", 10, "XL"),
  bloodlust: levelMeta("Bloodlust", "Knobbelboy", 42584142, "Extreme Demon", 10, "XL"),
  zodiac: levelMeta("Zodiac", "BIANOX", 52374843, "Extreme Demon", 10, "XL"),
  bladeOfJustice: levelMeta("Blade of Justice", "Manix648", 35448603, "Extreme Demon", 10, "XL"),
  phobos: levelMeta("Phobos", "KrmaL", 19759411, "Extreme Demon", 10, "XL"),
  erebus: levelMeta("Erebus", "BoldStep", 31462941, "Extreme Demon", 10, "Long"),
  niflheim: levelMeta("Niflheim", "vismuth", 30194711, "Extreme Demon", 10, "XL"),
  theLostExistence: levelMeta("The Lost Existence", "JonathanGD", 45239692, "Extreme Demon", 10, "XL"),
  rash: levelMeta("RASH", "Loltad", 69507105, "Extreme Demon", 10, "Long"),
  trollLevel: levelMeta("troll level", "lexycat", 76196489, "Extreme Demon", 10, "Long"),
  marlboroReds: levelMeta("Marlboro reds", "xSlendy", 103953282, "Extreme Demon", 10, "Long"),
  killbot: levelMeta("Killbot", "BoldStep", 38754426, "Extreme Demon", 10, "Long"),
  heartbeat: levelMeta("Heartbeat", "KrmaL", 20321297, "Extreme Demon", 10, "Long"),
  forbiddenIsle: levelMeta("Forbidden Isle", "Sillow", 63775846, "Extreme Demon", 10, "Long"),
  xo: levelMeta("xo", "KrmaL", 58825144, "Extreme Demon", 10, "XL"),
  calculatorCore: levelMeta("Calculator Core", "Walroose", 58355141, "Extreme Demon", 10, "XL"),
  hardMachine: levelMeta("Hard Machine", "komp", 72744364, "Extreme Demon", 10, "Long"),
  darkDimension: levelMeta("Dark Dimension", "ThePurgatory", 125617849, "Extreme Demon", 10, "XL"),
  kenos: levelMeta("Kenos", "npesta", 58673581, "Extreme Demon", 10, "Long"),
  graceful: levelMeta("Graceful", "DaGYT", 71885708, "Extreme Demon", 10, "XL"),
  shukketsu: levelMeta("Shukketsu", "MadisonYuko", 75286957, "Extreme Demon", 10, "Long"),
  oblivion: levelMeta("Oblivion", "dice88", 71025973, "Extreme Demon", 10, "Long"),
  waterfall: levelMeta("Waterfall", "cherryteam", 110991117, "Extreme Demon", 10, "Long"),
  tartarus: levelMeta("Tartarus", "ItzDolphy", 59075347, "Extreme Demon", 10, "Long"),
  sonicWaveInfinity: levelMeta("Sonic Wave Infinity", "APTeamOfficial", 69685815, "Extreme Demon", 10, "XL"),
  limbo: levelMeta("LIMBO", "MindCap", 86084399, "Extreme Demon", 10, "XL"),
  solarFlare: levelMeta("Solar Flare", "Linear2", 90390075, "Extreme Demon", 10, "Long"),
  firework: levelMeta("Firework", "Trick", 75206202, "Extreme Demon", 10, "XL"),
  sakupenCircles: levelMeta("Sakupen Circles", "Diamond", 76962930, "Extreme Demon", 10, "Medium"),
  kocmoc: levelMeta("KOCMOC", "cherryteam", 87665224, "Extreme Demon", 10, "Long"),
  kyouki: levelMeta("Kyouki", "Demishio", 86018142, "Extreme Demon", 10, "Long"),
  acheron: levelMeta("Acheron", "ryamu", 73667628, "Extreme Demon", 10, "Long"),
  avernus: levelMeta("Avernus", "PockeWindfish", 89496627, "Extreme Demon", 10, "Long"),
  ashleyWaveTrials: levelMeta("Ashley Wave Trials", "OddMod", 62912799, "Extreme Demon", 10, "XL"),
  anathema: levelMeta("Anathema", "nikroplays", 112313819, "Extreme Demon", 10, "XL"),
  silentClubstep: levelMeta("Silent clubstep", "TheRealSailent", 4125776, "Extreme Demon", 10, "Long"),
  subsumingVortex: levelMeta("Subsuming Vortex", "Cursed", 127997391, "Extreme Demon", 10, "Long"),
  andromeda: levelMeta("andromeda", "Insxne97", 114283297, "Extreme Demon", 10, "Long"),
  everyEnd: levelMeta("Every End", "MindCap", 116174063, "Extreme Demon", 10, "XL"),
  orbit: levelMeta("ORBIT", "MindCap", 133175713, "Extreme Demon", 10, "XL"),
  tidalWave: levelMeta("Tidal Wave", "OniLinkGD", 86407629, "Extreme Demon", 10, "XL"),
  amethyst: levelMeta("Amethyst", "iMist", 119550490, "Extreme Demon", 10, "Long"),
  flamewall: levelMeta("Flamewall", "UNarwall", 126242564, "Extreme Demon", 10, "XL"),
  thinkingSpaceII: levelMeta("Thinking Space II", "CairoX", 119544028, "Extreme Demon", 10, "Long"),
};

const BASE_WORLDS = [
  {
    id: "official-foundations",
    navTitle: "Official Start",
    title: "Official Foundations",
    gate: "First Launch Arc",
    description:
      "This opening world is for players who have barely touched Geometry Dash or have never played before. It uses RobTop's official early levels to teach jumping, gravity, ship basics, and simple rhythm without any demon pressure.",
    sourceLabel: "Official Geometry Dash level route",
    sourceUrl: "https://geometry-dash.fandom.com/wiki/Official_Levels",
    levels: [
      mainStep("stereoMadness", "Start on the very first official level and learn basic jump timing with no extra gimmicks.", ["Basic jumps", "Ground timing"]),
      mainStep("backOnTrack", "Repeat those basics with slightly denser obstacles until simple timing feels automatic.", ["Jump timing", "Consistency"]),
      mainStep("polargeist", "Add early orb timing and faster pace without overwhelming the read.", ["Orb timing", "Read speed"]),
      mainStep("dryOut", "Introduce gravity shifts and the first true ship sections in a controlled setting.", ["Gravity swaps", "Ship basics"]),
      mainStep("baseAfterBase", "Stabilize cube and ship control on a friendlier official pace before the tighter levels.", ["Cube control", "Ship control"]),
      mainStep("cantLetGo", "Build confidence with tighter official jumps and less empty space to recover.", ["Jump discipline", "Reaction control"]),
      mainStep("jumper", "Raise pace and staircase reading before the first real timing wall.", ["Pace control", "Read discipline"]),
      mainStep("timeMachine", "World boss: clear the first spike-heavy official wall and prove the core controls are settling in.", ["Triple spikes", "Nerves"], { milestone: "Official start clear" }),
    ],
  },
  {
    id: "official-bridge",
    navTitle: "Official Bridge",
    title: "Official Bridge",
    gate: "Before Online Levels",
    description:
      "Keep climbing through harder official levels before touching the online route. This world bridges beginners into faster inputs, denser mode changes, and the first memory-heavy reads while everything still stays below demon difficulty.",
    sourceLabel: "Official Geometry Dash level bridge",
    sourceUrl: "https://geometry-dash.fandom.com/wiki/Official_Levels",
    levels: [
      mainStep("cycles", "Start the bridge with more active orb timing and slightly faster rhythm.", ["Orb timing", "Rhythm control"]),
      mainStep("xStep", "Practice repeated portals and steadier pattern memory through a full official run.", ["Portal transitions", "Pattern memory"]),
      mainStep("clutterfunk", "Push into tighter ship and cube timing without asking for demon-level precision yet.", ["Ship control", "Tight timings"]),
      mainStep("theoryOfEverything", "Train cleaner mixed gameplay and momentum changes on a famous official benchmark.", ["Mixed gameplay", "Momentum"]),
      mainStep("electromanAdventures", "Build flow and recover faster from awkward late jump nerves.", ["Flow", "Recovery"]),
      mainStep("hexagonForce", "Introduce dual awareness and trickier mode changes in a safer setting than online demons.", ["Dual awareness", "Mode changes"]),
      mainStep("blastProcessing", "Practice faster rhythm and wave-style motion before moving into online routes.", ["Speed changes", "Rhythm"]),
      mainStep("geometricalDominator", "World boss: finish the official on-ramp with memory, speed, and modern presentation pressure.", ["Memory", "Visual reads"], { milestone: "Official bridge clear" }),
    ],
  },
  {
    id: "browser-foundations",
    navTitle: "Online Start",
    title: "Browser Foundations",
    gate: "Starter Arc",
    description:
      "Now move into rated online levels without jumping straight to demons. This world keeps the pressure low while introducing community-made pacing, friendlier visual reads, and the first real non-official level habits.",
    sourceLabel: "Exact level pages verified on GDBrowser",
    sourceUrl: "https://gdbrowser.com/",
    levels: [
      mainStep("retray", "Start online with a very forgiving rated level that keeps the read clean and the clicks simple.", ["Basic jumps", "Online pacing"]),
      mainStep("darkParadise", "Bridge into longer easy-rated gameplay with calmer cube flow.", ["Cube pacing", "Jump timing"]),
      mainStep("amplification", "Move into longer harder gameplay and cleaner rhythm-based clicks.", ["Rhythm control", "Consistency"]),
      mainStep("slam", "Sharpen ship control and quick click changes on safer terrain.", ["Ship control", "Micro-adjustments"]),
      mainStep("fireAura", "World boss: close the online starter arc with a classic harder gauntlet that rewards composure.", ["Timings", "Nerve control"], { milestone: "Online foundations clear" }),
    ],
  },
  {
    id: "first-demon-gate",
    navTitle: "First Demons",
    title: "First Demon Gate",
    gate: "Easy Demon Entry",
    description:
      "Convert the warmup into reliable first demon clears. This world favors approachable online demons that teach confidence, transition reading, and early nerves.",
    sourceLabel: "Demon Progression first demon route",
    sourceUrl: "https://sites.google.com/view/demonprogression/first-demons",
    levels: [
      mainStep("theNightmare", "Get the first true easy demon clear and learn to finish a run.", ["First clear nerves", "Legacy pacing"], { milestone: "First easy demon" }),
      mainStep("theLightningRoad", "Follow with another classic entry demon to stabilize confidence.", ["Transition reads", "Legacy timings"]),
      mainStep("shiver", "Move into a cleaner modern easy demon with more readable sync.", ["Sync control", "Intro wave"]),
      mainStep("phjork", "Raise the tempo with tighter ship and cube checks.", ["Fast inputs", "Ship reads"]),
      mainStep("starpunk", "Hold concentration through a longer, more modern easy demon layout.", ["Long focus", "Pattern memory"]),
      mainStep("isLevel", "Practice orb discipline and repeated timing patterns.", ["Orb control", "Repetition"]),
      mainStep("platinumAdventure", "Use a short confidence clear to reduce hesitation and farm completions.", ["Confidence", "Execution"]),
      mainStep("playWithFire", "Push into a cleaner modern entry demon with stronger structure.", ["Timing discipline", "Consistency"]),
      mainStep("bornSurvivor", "Build confidence on another accessible modern easy demon.", ["Composure", "Sightreading"]),
      mainStep("maymory", "Introduce lightweight memory while the pressure stays manageable.", ["Memory", "Pattern reading"]),
      mainStep("skullduggery", "Sharpen basic ship and orb control before the deeper easy floor.", ["Ship control", "Orb discipline"]),
      mainStep("absoluteGarbage", "Train cleaner reads through trickier decoration and pacing.", ["Visual reading", "Consistency"]),
      mainStep("ispy", "Get used to visually loud gameplay without losing rhythm.", ["Visual density", "Rhythm"]),
      mainStep("speedRacer", "World boss: fast easy-demon click control before the broader easy floor.", ["Speed changes", "Momentum"], { milestone: "Easy demon confidence" }),
    ],
  },
  {
    id: "easy-demon-floor",
    navTitle: "Easy Floor",
    title: "Easy Demon Floor",
    gate: "Base Building",
    description:
      "Build a real easy demon base instead of relying on two or three beginner clears. The goal here is breadth: different visuals, different wave asks, and longer consistency runs.",
    sourceLabel: "Demon Progression easy demon route and exact GDBrowser pages",
    sourceUrl: "https://sites.google.com/view/demonprogression/easy-demons",
    levels: [
      mainStep("weird", "Learn to survive odd visuals and less standard read patterns.", ["Visual reads", "Adaptation"]),
      mainStep("xLevel", "Start pushing ship and wave control inside a familiar easy-demon shell.", ["Ship control", "Wave basics"]),
      mainStep("deCode", "Work on UFO transitions and timing changes that punish autopilot.", ["UFO control", "Transitions"]),
      mainStep("clubstepDynamix", "Handle trap reading and legacy-style fake comfort sections.", ["Trap reads", "Memory"]),
      mainStep("crazyBolt", "Add a classic easy demon with stronger old-school click control.", ["Legacy control", "Rhythm"]),
      mainStep("mirrorForce", "Train mirror reading and mode adaptation without a huge jump in raw difficulty.", ["Mirror reading", "Adaptation"]),
      mainStep("funkyNight", "Build smoother control on a modern easy demon bridge.", ["Flow control", "Consistency"]),
      mainStep("holdOn", "Practice slightly tighter bursts in a shorter package.", ["Burst timings", "Recovery"]),
      mainStep("strings", "Hold rhythm through a steadier modern easy demon route.", ["Rhythm control", "Composure"]),
      mainStep("slapSquadII", "Learn to carry consistency deeper into a longer run.", ["Consistency", "Late-run focus"]),
      mainStep("submerged", "Train calm wave and ship control inside a cleaner modern shell.", ["Wave control", "Ship control"]),
      mainStep("motion", "Build a safer base for fast transitions and older gameplay reads.", ["Transitions", "Legacy pacing"]),
      mainStep("spark", "Strengthen click stability and flow before the harder bridges.", ["Click stability", "Flow"]),
      mainStep("changeOfScene", "Take on one of the community's favorite easy demons to sharpen mixed gameplay and long-run control.", ["Mixed control", "Long-form focus"]),
      mainStep("adust", "Take on denser easy-demon movement without skipping fundamentals.", ["Gameplay density", "Control"]),
      mainStep("deathMoon", "First long consistency wall of the easy demon floor.", ["Endurance", "Run management"]),
      mainStep("problematic", "Hit the first real wave benchmark most players remember.", ["Wave control", "Straight-line focus"], { milestone: "Wave checkpoint" }),
      mainStep("crush", "Add a highly loved modern easy demon before the upper-floor endurance push.", ["Modern reads", "Consistency"]),
      mainStep("zircon", "Reinforce wave and ship discipline on a cleaner modern level.", ["Wave discipline", "Ship discipline"]),
      mainStep("ratioCircles", "Practice tunnel focus and faster reaction changes in a compact run.", ["Tunnel focus", "Fast reads"]),
      mainStep("downUnda", "Add another modern read test before the hardest easy-demon closes.", ["Visual reading", "Reaction speed"]),
      mainStep("pxttxrnSxxkxr", "Build confidence through unusual presentation and sharper bursts.", ["Adaptation", "Burst control"]),
      mainStep("gloriousFortress", "Push into XL easy demon endurance with a modern presentation spike.", ["XL endurance", "Composure"]),
      mainStep("citadel", "Rehearse longer modern control before the world boss.", ["Long consistency", "Control"]),
      mainStep("sidestep", "Stress-test ship chokepoints and sustained pressure.", ["Ship precision", "Recovery"]),
      mainStep("dearNostalgists", "World boss: close the easy floor with a long memory and endurance clear.", ["Memory", "Late-run composure"], { milestone: "Easy demon floor clear" }),
    ],
  },
  {
    id: "medium-demon-floor",
    navTitle: "Medium Floor",
    title: "Medium Demon Floor",
    gate: "Control Gate",
    description:
      "Medium demons are where the route stops forgiving sloppy movement. This world leans into denser modern gameplay, awkward transitions, and deliberate control.",
    sourceLabel: "Demon Progression medium demon route and exact GDBrowser pages",
    sourceUrl: "https://sites.google.com/view/demonprogression/medium-demons",
    levels: [
      mainStep("bLevel", "First medium demon checkpoint with modern density and mode variety.", ["Gameplay density", "Control"], { milestone: "First medium demon" }),
      mainStep("goldTemple", "Tackle awkward symmetry and unusual read structure.", ["Asymmetry", "Read discipline"]),
      mainStep("verity", "Train speed changes and tighter transitions between modes.", ["Speed changes", "Transitions"]),
      mainStep("hell", "Raise straight-fly and timing precision under more punishment.", ["Straight-fly", "Timings"]),
      mainStep("dorabaeDifficult2", "Learn older-school click discipline on a classic medium benchmark.", ["Legacy timings", "Control"]),
      mainStep("speedOfLightII", "Push consistency through a classic medium route with more pressure.", ["Consistency", "Legacy pacing"]),
      mainStep("saturnV", "Work through a denser medium demon with steadier control asks.", ["Control", "Composure"]),
      mainStep("systemSplit", "Bridge into trickier transitions and tighter mode swaps.", ["Transitions", "Read speed"]),
      mainStep("insertCoin", "Handle a more awkward medium layout with fewer freebies.", ["Awkward control", "Execution"]),
      mainStep("section", "Refine modern timing reads inside a packed level.", ["Modern timings", "Density"]),
      mainStep("shrillHallway", "Practice faster reaction changes and cleaner input discipline.", ["Reaction speed", "Input discipline"]),
      mainStep("silentClubXRebirth", "Use a nostalgic medium demon to sharpen control without pure brute force.", ["Legacy control", "Consistency"]),
      mainStep("fratura", "Train modern movement reading and cleaner portal exits.", ["Portal exits", "Routing"]),
      mainStep("stellaCirculos", "Strengthen wave and tunnel control before the upper mediums.", ["Wave control", "Tunnel focus"]),
      mainStep("scarletSmog", "Push deeper into medium demons with stronger visual pressure.", ["Visual pressure", "Consistency"]),
      mainStep("tenguWind", "Improve flow through faster pace and trickier transitions.", ["Flow", "Transitions"]),
      mainStep("badEnding", "Add a denser modern medium to smooth the gap into harder gameplay.", ["Modern density", "Control"]),
      mainStep("asadal", "Practice timing-heavy movement that punishes drifting clicks.", ["Timings", "Precision"]),
      mainStep("draconicSpeed", "Raise pace and routing difficulty before the late-medium close.", ["High speed reads", "Routing"]),
      mainStep("oneSpace", "Train longer consistency through mixed gameplay and steadier execution.", ["Consistency", "Mixed control"]),
      mainStep("pabrik", "Work on a tighter modern medium with more concentrated pressure.", ["Execution", "Discipline"]),
      mainStep("paracosmCircles", "Add a medium-wave checkpoint before harder wave routes later on.", ["Wave basics", "Tunnel focus"]),
      mainStep("carpeLucem", "Sharpen mode changes and small burst execution in a shorter format.", ["Mode changes", "Bursts"]),
      mainStep("hemi", "Push into XL medium endurance before the boss gate.", ["XL endurance", "Late-run focus"]),
      mainStep("mechanicalShowdown", "Practice mixed-mode consistency with very little downtime.", ["Mixed control", "Consistency"]),
      mainStep("sakupenEgg", "World boss: finish the medium floor with sharper wave and ship demands.", ["Wave discipline", "Burst precision"], { milestone: "Medium demon floor clear" }),
    ],
    bonusPacks: [
      {
        id: "control-lab",
        title: "Control Lab",
        description: "Optional medium demon branch for players who want extra consistency reps before the hard demon world.",
        unlockLabel: "Unlocks after clearing World 4.",
        steps: [
          bonusStep("biru", "Long JonathanGD control test for steadier click discipline.", ["Endurance", "Control"]),
          bonusStep("reanimation", "Classic XL route for memory retention and long-run calm.", ["Memory", "Run management"]),
        ],
      },
    ],
  },
  {
    id: "hard-demon-core",
    navTitle: "Hard Core",
    title: "Hard Demon Core",
    gate: "Skill Identity",
    description:
      "Hard demons begin to define a player's skill profile. This arc adds iconic wave benchmarks, demanding duals, and longer runs where consistency matters more than raw reaction speed.",
    sourceLabel: "Demon Progression hard demon route and exact GDBrowser pages",
    sourceUrl: "https://sites.google.com/view/demonprogression/hard-demons",
    levels: [
      mainStep("nineCircles", "Hit the iconic hard demon wave checkpoint that shapes later list play.", ["Wave control", "Tunnel focus"], { milestone: "Nine Circles checkpoint" }),
      mainStep("jawbreaker", "Repeat the wave test with a more aggressive consistency demand.", ["Wave consistency", "Recovery"]),
      mainStep("crazy", "Add a hard demon that leans on constant execution and control discipline.", ["Execution", "Consistency"]),
      mainStep("differentDescent", "Train longer hard-demon endurance before the upper-core push.", ["XL endurance", "Composure"]),
      mainStep("doubleDash", "Add true dual control and split attention for the first time.", ["Duals", "Split focus"]),
      mainStep("theCaverns", "Use an older precision-heavy hard demon to punish sloppy inputs.", ["Precision", "Legacy control"]),
      mainStep("ditchedMachine", "Build cleaner click discipline on a classic hard demon route.", ["Input discipline", "Legacy pacing"]),
      mainStep("spacelocked", "Raise dual and ship awareness on one of the classic bridges.", ["Duals", "Ship control"]),
      mainStep("whiteWomen", "Handle a modern hard demon with stronger read pressure.", ["Visual reads", "Execution"]),
      mainStep("forsakenNeon", "Sharpen classic timing control before the skill floor climbs again.", ["Legacy timings", "Control"]),
      mainStep("toeIII", "Push through trickier transitions and harder click bursts.", ["Transitions", "Burst control"]),
      mainStep("radioactive", "Practice relentless hard-demon execution without much downtime.", ["Execution", "Consistency"]),
      mainStep("templeOfTime", "Build steadier control inside a denser, more awkward route.", ["Control", "Adaptation"]),
      mainStep("diffuse", "Train reaction changes and tighter control across mixed gameplay.", ["Reaction speed", "Mixed control"]),
      mainStep("kitty", "Add a more awkward modern hard demon for read discipline.", ["Awkward control", "Read discipline"]),
      mainStep("zap", "Tighten click stability through faster bursts and cleaner lines.", ["Click stability", "Speed changes"]),
      mainStep("danceMassacre", "Practice fast cube and UFO timing under pressure.", ["Fast timings", "Rhythm"]),
      mainStep("nowise", "Work through another dense hard demon that rewards staying composed.", ["Density", "Composure"]),
      mainStep("sedulous", "Handle visual density and faster modern routing.", ["Visual density", "Routing"]),
      mainStep("psychosis", "Bridge into harsher bursts and rougher transitions.", ["Burst control", "Transition resilience"]),
      mainStep("theEschaton", "Use an XL hard demon to harden late-run focus and endurance.", ["XL focus", "Endurance"]),
      mainStep("mastermind", "Train denser hard-demon control before the insane wall.", ["Control", "Consistency"]),
      mainStep("njorun", "Take on a more awkward route to improve adaptation and execution.", ["Adaptation", "Execution"]),
      mainStep("futureFunk", "Use an XL hard demon to train late-run discipline and concentration.", ["XL endurance", "Late nerves"]),
      mainStep("forestTemple", "World boss: classic hard demon precision before the insane wall.", ["Precision", "Execution"], { milestone: "Hard demon floor clear" }),
    ],
  },
  {
    id: "insane-demon-wall",
    navTitle: "Insane Wall",
    title: "Insane Demon Wall",
    gate: "Execution Gate",
    description:
      "This is the first real wall for most players. The route now expects stronger mental endurance, better line control, and the ability to learn levels instead of just sightreading them.",
    sourceLabel: "Demon Progression insane demon route and exact GDBrowser pages",
    sourceUrl: "https://sites.google.com/view/demonprogression/insane-demons",
    levels: [
      mainStep("windyLandscape", "Take the first insane demon clear on one of the genre's classic confidence builders.", ["First insane nerves", "Consistency"], { milestone: "First insane demon" }),
      mainStep("acropolis", "Sharpen patient cube control and stubborn precision.", ["Cube precision", "Patience"]),
      mainStep("magmaBound", "Push through a longer modern insane with steady execution.", ["Long consistency", "Routing"]),
      mainStep("supersonic", "Learn survival through memory, transitions, and awkward recoveries.", ["Memory", "Recovery"]),
      mainStep("stalemate", "Add a classic insane demon with heavier old-school pressure.", ["Legacy pressure", "Control"]),
      mainStep("poltergeist", "Raise ship and wave pressure with harsher straight-line asks.", ["Straight-fly", "Wave pressure"]),
      mainStep("arcane", "Push into XL insane endurance and tougher modern routing.", ["XL endurance", "Routing"]),
      mainStep("nightTerrors", "Build consistency under relentless timing and ship pressure.", ["Timings", "Ship pressure"]),
      mainStep("sixF", "Handle a denser modern insane with steadier line control.", ["Line control", "Execution"]),
      mainStep("poeyengAeng", "Train modern high-speed reads before the upper insanes.", ["High speed reads", "Adaptation"]),
      mainStep("feral", "Add a compact insane route that punishes any hesitation.", ["Burst precision", "Discipline"]),
      mainStep("ulon", "Build consistency through another modern insane bridge.", ["Consistency", "Control"]),
      mainStep("leyak", "Train technical timings inside dense visuals and fast learn sections.", ["Technical timings", "Learning speed"]),
      mainStep("interstellarInfant", "Push dense movement and steadier execution over a longer run.", ["Execution density", "Endurance"]),
      mainStep("reRust", "Take on a stronger modern insane to smooth the extreme jump.", ["Modern execution", "Routing"]),
      mainStep("arcaneAscent", "Use an XL insane to harden focus and long-run discipline.", ["XL focus", "Composure"]),
      mainStep("exg", "Build cleaner movement through another modern insane gate.", ["Control", "Consistency"]),
      mainStep("thanatophobia", "Climb into borderline-extreme territory with harsher execution.", ["Pressure", "Execution"]),
      mainStep("mothmelons", "Sharpen technical modern reads before the last bridge.", ["Modern reads", "Technical control"]),
      mainStep("gumshot", "Bridge into higher speed, denser routing, and longer run composure.", ["High speed reads", "Composure"]),
      mainStep("darkTravel", "World boss: XL insane demon that tests full-run endurance.", ["XL endurance", "Run management"], { milestone: "Insane demon floor clear" }),
    ],
    bonusPacks: [
      {
        id: "insane-bonus-route",
        title: "Insane Bonus Route",
        description: "Optional extra insanes if you want more reps before entering extremes.",
        unlockLabel: "Unlocks after clearing World 6.",
        steps: [
          bonusStep("crazyII", "Extra awkward timing work with higher stress movement.", ["Timings", "Nerve control"]),
          bonusStep("firewall", "Classic ship-heavy insane for stronger control under pressure.", ["Ship pressure", "Consistency"]),
        ],
      },
    ],
  },
  {
    id: "first-extremes",
    navTitle: "First Extremes",
    title: "First Extremes",
    gate: "Extreme Entry",
    description:
      "The route steps into extremes with a deliberate bridge instead of a straight jump to famous list monsters. The point is to establish an extreme baseline and then stack legacy pressure on top of it.",
    sourceLabel: "Demon Progression entry extreme route and exact GDBrowser pages",
    sourceUrl: "https://sites.google.com/view/demonprogression/a-extremes",
    levels: [
      mainStep("acu", "Take the first extreme on a modern benchmark that rewards clean fundamentals.", ["First extreme nerves", "Modern control"], { milestone: "First extreme" }),
      mainStep("cataclysm", "Move into a legacy extreme where ship and wave pressure become serious.", ["Ship pressure", "Wave pressure"]),
      mainStep("hypersonic", "Add faster mixed-mode bursts and rougher transitions.", ["Burst execution", "Mixed control"]),
      mainStep("allegiance", "Develop straighter lines and calmer execution through ship-heavy sections.", ["Straight-fly", "Discipline"]),
      mainStep("napalm", "Raise modern execution density after the legacy bridges.", ["Modern execution", "Routing"]),
      mainStep("niwa", "Bridge into a tighter modern extreme with steadier control asks.", ["Control", "Consistency"]),
      mainStep("penombre", "Practice harsher click precision before the deeper extreme pool.", ["Precision", "Timings"]),
      mainStep("prismaticHaze", "Use a longer modern extreme to strengthen run management.", ["Endurance", "Composure"]),
      mainStep("crowdControl", "Build confidence through a denser current-era extreme.", ["Execution density", "Routing"]),
      mainStep("incipient", "Add a control-heavy extreme that rewards discipline.", ["Control", "Discipline"]),
      mainStep("azurite", "Handle another modern extreme with steadier line control.", ["Line control", "Consistency"]),
      mainStep("quantumProcessing", "Take a classic former list bridge with brutal sustained focus.", ["Legacy pressure", "Long consistency"]),
      mainStep("redWorldRebirth", "Raise your old-school endurance and nerve control before mythic titans.", ["Endurance", "Nerves"]),
      mainStep("novalis", "Push into a harder modern extreme before the world boss.", ["Modern execution", "Composure"]),
      mainStep("theUltimatePhase", "World boss: classic extreme that asks for full attention all run long.", ["Reaction speed", "Legacy execution"], { milestone: "Extreme bridge clear" }),
    ],
    bonusPacks: [
      {
        id: "extreme-bonus-route",
        title: "Extreme Bonus Route",
        description: "Optional side route to deepen your first extreme pool before the legacy titan arc.",
        unlockLabel: "Unlocks after clearing World 7.",
        steps: [
          bonusStep("lostLove", "Use a modern extreme for extra endurance and control reps.", ["Endurance", "Control"]),
          bonusStep("necropolix", "Old-school brutality that strengthens ship and cube discipline.", ["Legacy execution", "Ship control"]),
          bonusStep("mistyMountains", "Long route for focus, routing, and late-run survival.", ["XL focus", "Routing"]),
          bonusStep("retention", "Timing-heavy extreme that punishes hesitation.", ["Timings", "Composure"]),
        ],
      },
    ],
  },
  {
    id: "legacy-titans",
    navTitle: "Legacy Titans",
    title: "Legacy Titans",
    gate: "Mythic Arc",
    description:
      "Now the campaign leans into iconic former list demons. These are the levels that historically separated strong extreme players from people ready to live near the top of the scene.",
    sourceLabel: "Legacy route anchored by Pointercrate history and exact GDBrowser pages",
    sourceUrl: "https://pointercrate.com/demonlist",
    levels: [
      mainStep("bloodbath", "Clear the iconic legacy wall and prove your first real titan clear.", ["Legacy pressure", "Composure"], { milestone: "Bloodbath clear" }),
      mainStep("bladeOfJustice", "Bridge into harder legacy-style extremes with stronger endurance demands.", ["Endurance", "Legacy control"]),
      mainStep("artificialAscent", "Add XL precision and longer high-level execution.", ["XL precision", "Consistency"]),
      mainStep("phobos", "Take on a punishing legacy route that sharpens pressure control.", ["Pressure", "Control"]),
      mainStep("blackBlizzard", "Learn KrmaL-style timings and rougher movement language.", ["Awkward timings", "Adaptation"]),
      mainStep("digitalDescent", "Handle a long former list level with sustained execution.", ["Length", "Run control"]),
      mainStep("sonicWave", "Hit the wave icon that still defines list-ready line control.", ["Wave mastery", "Focus"]),
      mainStep("erebus", "Add another old giant that punishes nerves and overclicking.", ["Nerves", "Legacy execution"]),
      mainStep("yatagarasu", "Push stamina through one of the classic mega-collab titans.", ["Stamina", "High-pressure execution"]),
      mainStep("niflheim", "Take on another former list benchmark with harsh endurance.", ["Endurance", "Consistency"]),
      mainStep("theLostExistence", "Use an XL extreme to deepen late-run composure.", ["XL focus", "Composure"]),
      mainStep("bloodlust", "Scale back up into heavier modernized top play pressure.", ["Endgame nerves", "Consistency"]),
      mainStep("rash", "Build more high-end stability before the current list gate.", ["Execution", "Stability"]),
      mainStep("trollLevel", "Force a stronger learn process and cleaner adaptation under stress.", ["Learning speed", "Adaptation"]),
      mainStep("marlboroReds", "Push a recent high-end extreme before the former #1 finale.", ["Modern pressure", "Execution"]),
      mainStep("zodiac", "World boss: former #1 benchmark before the current list gate.", ["Top-play endurance", "Late-run nerves"], { milestone: "Legacy titan clear" }),
    ],
    bonusPacks: [
      {
        id: "legend-bonus-route",
        title: "Legend Bonus Route",
        description: "Optional titan branch for extra specialist practice before the active list climb.",
        unlockLabel: "Unlocks after clearing World 8.",
        steps: [
          bonusStep("killbot", "Memory gauntlet to harden your learn process and composure.", ["Memory", "Composure"]),
          bonusStep("heartbeat", "Extra timing and ship pressure from a classic extreme.", ["Timings", "Ship control"]),
          bonusStep("forbiddenIsle", "Modern endurance route for players who want another long-list style rep.", ["Modern routing", "Endurance"]),
          bonusStep("xo", "Use a specialist extreme to practice learning and rhythm under pressure.", ["Learning speed", "Rhythm"]),
        ],
      },
    ],
  },
  {
    id: "current-list-gate",
    navTitle: "List Gate",
    title: "Current List Gate",
    gate: "Top 100 Entry",
    description:
      "This world bridges the route from legacy titans into the current active Demonlist using broader-recognized active-list landmarks, ending on a verified top-100 clear as of March 21, 2026.",
    sourceLabel: "Pointercrate placements verified March 21, 2026",
    sourceUrl: "https://pointercrate.com/demonlist",
    levels: [
      mainStep("calculatorCore", "Use a recent high-end bridge level before the current list cutoff.", ["Bridge routing", "Consistency"], { milestone: "Current list bridge" }),
      mainStep("hardMachine", "Sharpen precision and discipline against harsher modern execution.", ["Precision", "Discipline"], { placement: "#120" }),
      mainStep("darkDimension", "Push a longer current-era extreme before top-100 entry.", ["Long-form execution", "Focus"], { placement: "#111" }),
      mainStep("kenos", "Face a notorious former top level and stabilize your top-play ceiling.", ["Top-play execution", "Pressure"]),
      mainStep("graceful", "First active top-100 clear as of March 21, 2026.", ["Top-100 nerves", "Long consistency"], { placement: "#100", milestone: "Top 100 entered" }),
      mainStep("shukketsu", "World boss: land the first active top-100 clear on a current, better-known list benchmark.", ["Consistency", "List composure"], { placement: "#96", milestone: "Top 100 entered" }),
    ],
  },
  {
    id: "top-100-push",
    navTitle: "Top 100 Push",
    title: "Top 100 Push",
    gate: "List Climb",
    description:
      "From here on out the player is no longer learning how to beat a list demon. They are climbing a verified active ladder and trying to hold consistency deeper into the top 100.",
    sourceLabel: "Pointercrate placements verified March 21, 2026",
    sourceUrl: "https://pointercrate.com/demonlist",
    levels: [
      mainStep("oblivion", "Push farther up the verified list with denser execution.", ["Execution density", "Calm"]),
      mainStep("waterfall", "Practice maintaining control through long, modern list gameplay.", ["Modern consistency", "Routing"], { placement: "#78" }),
      mainStep("tartarus", "Meet a long-standing top-play icon with punishing precision.", ["Precision", "Nerves"], { placement: "#77" }),
      mainStep("sonicWaveInfinity", "Raise wave endurance and consistency at active-list pace.", ["Wave endurance", "XL focus"], { placement: "#76" }),
      mainStep("limbo", "Force a stronger learn process and total attention under pressure.", ["Learning speed", "Attention"], { placement: "#51", milestone: "Top 50 entered" }),
      mainStep("solarFlare", "World boss: close the top-100 push with another current top-50 clear.", ["Top-50 composure", "Execution"], { placement: "#49" }),
    ],
  },
  {
    id: "main-list-circuit",
    navTitle: "Main Circuit",
    title: "Main List Circuit",
    gate: "Top 35 to Top 13",
    description:
      "The route now becomes a main-list circuit, stepping through verified placements that force stronger nerves, higher execution density, and true top-player level endurance.",
    sourceLabel: "Pointercrate placements verified March 21, 2026",
    sourceUrl: "https://pointercrate.com/demonlist",
    levels: [
      mainStep("firework", "Break into the upper main list with a dense modern clear.", ["Main-list execution", "Stamina"], { placement: "#35" }),
      mainStep("sakupenCircles", "Push specialist wave pressure and faster high-end reads.", ["Wave pressure", "Fast reads"], { placement: "#29" }),
      mainStep("kocmoc", "Add longer execution with modern list routing and pressure.", ["Routing", "Composure"], { placement: "#25" }),
      mainStep("kyouki", "Train difficult high-speed control and run discipline.", ["High speed control", "Run discipline"], { placement: "#22" }),
      mainStep("acheron", "Step into the modern endgame with relentless execution demand.", ["Endgame execution", "Precision"], { placement: "#16" }),
      mainStep("avernus", "Handle harsher click control and current-era pressure spikes.", ["Click control", "Pressure"], { placement: "#15" }),
      mainStep("ashleyWaveTrials", "Specialist wave benchmark on the edge of the top ten.", ["Specialist wave", "XL composure"], { placement: "#14" }),
      mainStep("anathema", "World boss: finish the main-list circuit right outside the top ten.", ["Near-top-ten nerves", "Execution"], { placement: "#13", milestone: "Top 15 caliber" }),
    ],
  },
  {
    id: "summit-route",
    navTitle: "Summit",
    title: "Summit Route",
    gate: "Top 12 to #1",
    description:
      "This final arc is the summit. Every level here is part of the verified active upper Demonlist on March 21, 2026, ending at the current #1 and the finish line of the campaign.",
    sourceLabel: "Pointercrate placements verified March 21, 2026",
    sourceUrl: "https://pointercrate.com/demonlist",
    levels: [
      mainStep("silentClubstep", "Break into the top twelve with one of the scene's most famous names.", ["Summit nerves", "Execution"], { placement: "#12" }),
      mainStep("subsumingVortex", "Refine modern top-tier control and consistency further up the summit.", ["Consistency", "Control"], { placement: "#11" }),
      mainStep("andromeda", "Enter the active top ten and start the final chase.", ["Top-ten composure", "Discipline"], { placement: "#10", milestone: "Top 10 entered" }),
      mainStep("everyEnd", "Carry that pace deeper into the top end of the list and officially enter the active top ten.", ["XL focus", "Execution"], { placement: "#9", milestone: "Top 10 entered" }),
      mainStep("orbit", "Long-form top-five caliber execution and routing pressure.", ["Top-five routing", "Endurance"], { placement: "#5", milestone: "Top 5 entered" }),
      mainStep("tidalWave", "One of the defining modern summit clears of the era.", ["Modern summit play", "Composure"], { placement: "#4" }),
      mainStep("amethyst", "Near-final pressure with very little room to drift mentally.", ["Near-final composure", "Precision"], { placement: "#3" }),
      mainStep("flamewall", "The penultimate verified summit climb before the crown.", ["Penultimate nerves", "Execution"], { placement: "#2" }),
      mainStep("thinkingSpaceII", "Final boss: beat the current #1 and finish the path to the top.", ["World-class composure", "Peak execution"], { placement: "#1", milestone: "Current #1 clear" }),
    ],
  },
];

// These are now soft consensus signals, not hard route overrides.
const COMMUNITY_CURATED_POOLS = {
  "official-foundations": ["stereoMadness", "backOnTrack", "polargeist", "dryOut", "baseAfterBase", "cantLetGo", "jumper", "timeMachine"],
  "official-bridge": ["cycles", "xStep", "clutterfunk", "theoryOfEverything", "electromanAdventures", "hexagonForce", "blastProcessing", "geometricalDominator"],
  "browser-foundations": ["retray", "darkParadise", "amplification", "slam", "fireAura"],
  "first-demon-gate": ["theNightmare", "theLightningRoad", "platinumAdventure", "shiver", "phjork", "playWithFire", "bornSurvivor", "maymory", "absoluteGarbage", "ispy", "speedRacer"],
  "easy-demon-floor": ["xLevel", "deCode", "clubstepDynamix", "crazyBolt", "mirrorForce", "motion", "spark", "submerged", "deathMoon", "problematic", "changeOfScene", "crush", "downUnda", "gloriousFortress", "citadel", "sidestep", "dearNostalgists"],
  "medium-demon-floor": ["bLevel", "goldTemple", "verity", "dorabaeDifficult2", "speedOfLightII", "mechanicalShowdown", "insertCoin", "stellaCirculos", "section", "hell", "badEnding", "oneSpace", "hemi", "sakupenEgg"],
  "hard-demon-core": ["nineCircles", "jawbreaker", "crazy", "doubleDash", "spacelocked", "forsakenNeon", "toeIII", "danceMassacre", "sedulous", "psychosis", "templeOfTime", "futureFunk", "forestTemple"],
  "insane-demon-wall": ["windyLandscape", "acropolis", "magmaBound", "supersonic", "stalemate", "poltergeist", "leyak", "nightTerrors", "interstellarInfant", "thanatophobia", "gumshot", "darkTravel"],
  "first-extremes": ["acu", "cataclysm", "hypersonic", "allegiance", "napalm", "quantumProcessing", "redWorldRebirth", "theUltimatePhase"],
  "legacy-titans": ["bloodbath", "bladeOfJustice", "artificialAscent", "phobos", "blackBlizzard", "digitalDescent", "sonicWave", "yatagarasu", "bloodlust", "zodiac"],
  "current-list-gate": ["hardMachine", "darkDimension", "kenos", "shukketsu"],
  "top-100-push": ["oblivion", "waterfall", "tartarus", "sonicWaveInfinity", "limbo", "solarFlare"],
  "main-list-circuit": ["firework", "sakupenCircles", "kocmoc", "kyouki", "acheron", "avernus", "anathema"],
  "summit-route": ["silentClubstep", "everyEnd", "orbit", "tidalWave", "amethyst", "flamewall", "thinkingSpaceII"],
};

const COMMUNITY_SIGNAL_RANKS = Object.fromEntries(
  Object.entries(COMMUNITY_CURATED_POOLS).map(([worldId, metaKeys]) => [worldId, new Map(metaKeys.map((metaKey, index) => [metaKey, index]))]),
);

function matchesFocus(step, focus) {
  if (!focus || focus === "balanced") {
    return false;
  }

  const keywords = FOCUS_KEYWORDS[focus] || [];
  const haystack = normalizeText(step.skills.join(" "));
  return keywords.some((keyword) => haystack.includes(normalizeText(keyword)));
}

function getGoalSettings(profile) {
  return MAIN_GOAL_SETTINGS[profile.mainGoal] || MAIN_GOAL_SETTINGS[DEFAULT_PROFILE.mainGoal];
}

function getCommunitySignal(worldId, metaKey) {
  const rank = COMMUNITY_SIGNAL_RANKS[worldId]?.get(metaKey);
  if (typeof rank !== "number") {
    return 0;
  }
  return Math.max(0, 18 - rank);
}

function getPlacementNumber(step) {
  const match = String(step.placement || "").match(/#(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function getSkillTokenSet(step) {
  return new Set(normalizeText(step.skills.join(" ")).split(" ").filter(Boolean));
}

function getSkillOverlap(leftStep, rightStep) {
  const left = getSkillTokenSet(leftStep);
  const right = getSkillTokenSet(rightStep);
  if (!left.size && !right.size) {
    return 0;
  }

  let shared = 0;
  for (const token of left) {
    if (right.has(token)) {
      shared += 1;
    }
  }

  const union = new Set([...left, ...right]).size || 1;
  return shared / union;
}

function getTargetCount(baseWorldIndex, poolLength, profile, role) {
  if (profile.routeLength === "marathon") {
    return poolLength;
  }

  if (profile.hardest === "new-player" && baseWorldIndex <= 2) {
    return poolLength;
  }

  const config = LENGTH_SETTINGS[profile.routeLength] || LENGTH_SETTINGS.standard;
  const goalSettings = getGoalSettings(profile);
  let targetCount;
  if (role === "warmup") {
    targetCount = Math.min(poolLength, config.warmup);
  } else if (baseWorldIndex <= 3) {
    targetCount = Math.min(poolLength, config.early);
  } else if (baseWorldIndex <= 7) {
    targetCount = Math.min(poolLength, config.middle);
  } else {
    targetCount = Math.min(poolLength, config.late);
  }

  if (profile.routeLength !== "marathon") {
    targetCount += goalSettings.targetAdjustment;
    if (role === "warmup" && profile.mainGoal !== "fast-climb") {
      targetCount += 1;
    }
  }

  const minimum = Math.min(poolLength, role === "warmup" ? 3 : 4);
  return clamp(targetCount, minimum, poolLength);
}

function scoreStep(step, world, index, poolLength, profile, role) {
  const goalSettings = getGoalSettings(profile);
  const meta = LEVEL_META[step.metaKey] || {};
  const placementNumber = getPlacementNumber(step);
  const normalizedPosition = poolLength <= 1 ? 0 : index / (poolLength - 1);
  let score = 0;

  if (matchesFocus(step, profile.focus)) {
    score += goalSettings.focusWeight;
  }
  if (profile.focus === "endurance" && (meta.length === "XL" || meta.length === "Long")) {
    score += 20;
  }
  if (step.milestone) {
    score += goalSettings.milestoneWeight + 16;
  }
  if (placementNumber) {
    score += goalSettings.placementWeight + Math.max(0, 22 - placementNumber * 0.12);
  }
  score += getCommunitySignal(world.id, step.metaKey) * goalSettings.communityWeight * 0.28;

  if (meta.length === "XL") {
    score += goalSettings.xlWeight;
  } else if (meta.length === "Long") {
    score += goalSettings.longWeight;
  } else if (profile.mainGoal === "fast-climb") {
    score += 5;
  }

  if (profile.routeLength === "express" && meta.length === "XL" && !step.milestone) {
    score -= 14;
  }
  if (profile.routeLength === "marathon") {
    score += 6;
  }

  if (role === "warmup") {
    score += (1 - normalizedPosition) * 18;
  } else if (profile.mainGoal === "fast-climb") {
    score += normalizedPosition * 14;
  } else if (profile.mainGoal === "consistency") {
    score += (1 - Math.abs(normalizedPosition - 0.45)) * 10;
  } else {
    score += normalizedPosition * 5;
  }

  if (index === 0 || index === poolLength - 1) {
    score += 4000;
  }

  return score;
}

function getWorldPool(world) {
  return world.levels;
}

function scoreTransition(leftStep, rightStep, leftIndex, rightIndex, poolLength, targetCount, profile, role) {
  const goalSettings = getGoalSettings(profile);
  const gap = rightIndex - leftIndex;
  const baselineGap = Math.max(1, (poolLength - 1) / Math.max(targetCount - 1, 1));
  let desiredGap = baselineGap + goalSettings.speedBias;

  if (profile.routeLength === "express") {
    desiredGap += 0.35;
  } else if (profile.routeLength === "marathon") {
    desiredGap -= 0.35;
  }

  if (role === "warmup") {
    desiredGap = Math.max(1, desiredGap - 0.75);
  }

  let score = -Math.abs(gap - desiredGap) * goalSettings.smoothnessWeight;
  if (gap === 1) {
    score += goalSettings.adjacencyWeight;
  }

  const leftMatchesFocus = matchesFocus(leftStep, profile.focus);
  const rightMatchesFocus = matchesFocus(rightStep, profile.focus);
  if (leftMatchesFocus && rightMatchesFocus) {
    score += goalSettings.focusChainWeight;
  }

  const overlap = getSkillOverlap(leftStep, rightStep);
  if (profile.mainGoal === "balanced-growth") {
    score += (1 - overlap) * goalSettings.varietyWeight;
  } else if (profile.mainGoal === "weakness-focus" && leftMatchesFocus && rightMatchesFocus) {
    score += 10;
  } else if (profile.mainGoal === "consistency" && gap <= Math.ceil(baselineGap)) {
    score += 8;
  } else if (profile.mainGoal === "fast-climb" && gap >= Math.ceil(baselineGap)) {
    score += 8;
  }

  return score;
}

function selectWorldLevels(world, baseWorldIndex, profile, role) {
  const pool = getWorldPool(world);
  const targetCount = getTargetCount(baseWorldIndex, pool.length, profile, role);

  if (targetCount >= pool.length) {
    return pool;
  }

  const baseScores = pool.map((step, index) => scoreStep(step, world, index, pool.length, profile, role));
  const dp = Array.from({ length: pool.length }, () => Array(targetCount + 1).fill(null));

  for (let index = 0; index < pool.length; index += 1) {
    dp[index][1] = {
      score: baseScores[index],
      prevIndex: -1,
    };
  }

  for (let index = 0; index < pool.length; index += 1) {
    for (let picks = 2; picks <= targetCount; picks += 1) {
      let best = null;
      for (let previousIndex = 0; previousIndex < index; previousIndex += 1) {
        const previous = dp[previousIndex][picks - 1];
        if (!previous) {
          continue;
        }

        const candidateScore = previous.score
          + baseScores[index]
          + scoreTransition(pool[previousIndex], pool[index], previousIndex, index, pool.length, targetCount, profile, role);

        if (!best || candidateScore > best.score) {
          best = {
            score: candidateScore,
            prevIndex: previousIndex,
          };
        }
      }
      dp[index][picks] = best;
    }
  }

  let endIndex = pool.length - 1;
  let bestEnd = dp[endIndex][targetCount];
  if (!bestEnd) {
    for (let index = pool.length - 1; index >= 0; index -= 1) {
      if (dp[index][targetCount] && (!bestEnd || dp[index][targetCount].score > bestEnd.score)) {
        bestEnd = dp[index][targetCount];
        endIndex = index;
      }
    }
  }

  const selectedIndices = [];
  let currentIndex = endIndex;
  let picksRemaining = targetCount;
  while (currentIndex >= 0 && picksRemaining > 0) {
    selectedIndices.push(currentIndex);
    const previousIndex = dp[currentIndex][picksRemaining]?.prevIndex ?? -1;
    currentIndex = previousIndex;
    picksRemaining -= 1;
  }

  if (selectedIndices.length !== targetCount) {
    const fallback = new Set([0, pool.length - 1]);
    for (let pickIndex = 1; pickIndex < targetCount - 1; pickIndex += 1) {
      const ratio = pickIndex / Math.max(targetCount - 1, 1);
      fallback.add(Math.round(ratio * (pool.length - 1)));
    }
    for (let index = 0; fallback.size < targetCount && index < pool.length; index += 1) {
      fallback.add(index);
    }
    return Array.from(fallback)
      .sort((left, right) => left - right)
      .slice(0, targetCount)
      .map((index) => pool[index]);
  }

  selectedIndices.reverse();
  return selectedIndices.map((index) => pool[index]);
}

function buildRouteData(profile) {
  const effectiveProfile = profile || DEFAULT_PROFILE;
  const startBaseIndex = START_WORLD_BY_HARDEST[effectiveProfile.hardest] || 0;
  const includeFrom = Math.max(0, startBaseIndex - 1);
  const sourceWorlds = BASE_WORLDS.slice(includeFrom);
  let mainCounter = 0;
  let bonusCounter = 0;

  const preparedWorlds = sourceWorlds.map((baseWorld, activeWorldIndex) => {
    const baseWorldIndex = includeFrom + activeWorldIndex;
    const role = baseWorldIndex < startBaseIndex ? "warmup" : baseWorldIndex === startBaseIndex ? "start" : "main";
    const chosenLevels = selectWorldLevels(baseWorld, baseWorldIndex, effectiveProfile, role);

    const levels = chosenLevels.map((step, stepIndex, steps) => {
      const meta = LEVEL_META[step.metaKey];
      if (!meta) {
        throw new Error(`Missing metadata for ${step.metaKey}`);
      }

      mainCounter += 1;

      return {
        ...step,
        ...meta,
        number: mainCounter,
        localNumber: stepIndex + 1,
        worldIndex: activeWorldIndex,
        worldNumber: activeWorldIndex + 1,
        worldId: baseWorld.id,
        worldTitle: baseWorld.title,
        anchorId: `node-${mainCounter}`,
        isBoss: step.isBoss ?? stepIndex === steps.length - 1,
      };
    });

    const preparedWorld = {
      ...baseWorld,
      routeRole: role,
      baseWorldIndex,
      worldIndex: activeWorldIndex,
      worldNumber: activeWorldIndex + 1,
      worldLabel: `World ${activeWorldIndex + 1}`,
      sectionId: `world-${baseWorld.id}`,
      levels,
    };

    preparedWorld.startIndex = levels[0].number;
    preparedWorld.endIndex = levels[levels.length - 1].number;
    preparedWorld.bonusPacks = (baseWorld.bonusPacks || []).map((pack, packIndex) => {
      const steps = pack.steps.map((step, stepIndex) => {
        const meta = LEVEL_META[step.metaKey];
        if (!meta) {
          throw new Error(`Missing metadata for ${step.metaKey}`);
        }

        bonusCounter += 1;

        return {
          ...step,
          ...meta,
          id: `bonus-${baseWorld.id}-${pack.id}-${stepIndex + 1}`,
          bonusNumber: bonusCounter,
          localNumber: stepIndex + 1,
          worldIndex: activeWorldIndex,
          worldId: baseWorld.id,
          worldTitle: baseWorld.title,
        };
      });

      return {
        ...pack,
        packId: `${baseWorld.id}-${pack.id || `bonus-${packIndex + 1}`}`,
        unlockAt: preparedWorld.endIndex,
        unlockLabel: pack.unlockLabel || `Unlocks after clearing ${preparedWorld.worldLabel}.`,
        steps,
      };
    });

    preparedWorld.bonusCount = preparedWorld.bonusPacks.reduce((total, pack) => total + pack.steps.length, 0);
    return preparedWorld;
  });

  const allMain = preparedWorlds.flatMap((world) => world.levels);
  const bonusSteps = preparedWorlds.flatMap((world) => world.bonusPacks.flatMap((pack) => pack.steps));
  const totalMain = allMain.length;
  const totalBonus = bonusSteps.length;
  const routeMode = PROFILE_QUESTIONS.hardest.options.find((option) => option.id === effectiveProfile.hardest)?.title || "Custom";
  const goalMode = PROFILE_QUESTIONS.mainGoal.options.find((option) => option.id === effectiveProfile.mainGoal)?.title || "Balanced Growth";
  const focusMode = PROFILE_QUESTIONS.focus.options.find((option) => option.id === effectiveProfile.focus)?.title || "Balanced";
  const lengthMode = PROFILE_QUESTIONS.routeLength.options.find((option) => option.id === effectiveProfile.routeLength)?.title || "Standard";

  return {
    preparedWorlds,
    allMain,
    bonusSteps,
    totalMain,
    totalBonus,
    routeSummary: `${routeMode} Start / ${goalMode} Goal / ${focusMode} Focus / ${lengthMode} Route`,
  };
}

function normalizeTheme(themeId) {
  return THEMES.some((theme) => theme.id === themeId) ? themeId : DEFAULT_THEME;
}

function normalizeProfile(rawProfile) {
  if (!rawProfile || typeof rawProfile !== "object") {
    return null;
  }

  const hardest = PROFILE_QUESTIONS.hardest.options.some((option) => option.id === rawProfile.hardest)
    ? rawProfile.hardest
    : DEFAULT_PROFILE.hardest;
  const mainGoal = PROFILE_QUESTIONS.mainGoal.options.some((option) => option.id === rawProfile.mainGoal)
    ? rawProfile.mainGoal
    : DEFAULT_PROFILE.mainGoal;
  const focus = PROFILE_QUESTIONS.focus.options.some((option) => option.id === rawProfile.focus)
    ? rawProfile.focus
    : DEFAULT_PROFILE.focus;
  const routeLength = PROFILE_QUESTIONS.routeLength.options.some((option) => option.id === rawProfile.routeLength)
    ? rawProfile.routeLength
    : DEFAULT_PROFILE.routeLength;

  return { hardest, mainGoal, focus, routeLength };
}

function getMainLevelKey(stepNumber) {
  return `main-${stepNumber}`;
}

function getDefaultSelectedWorldId(preparedWorlds, mainCleared) {
  const fallbackWorld = preparedWorlds.find((world) => mainCleared >= world.startIndex - 1 && mainCleared < world.endIndex)
    || preparedWorlds[preparedWorlds.length - 1]
    || preparedWorlds[0]
    || null;
  return fallbackWorld?.id || null;
}

function normalizeRecord(rawValue) {
  return rawValue && typeof rawValue === "object" ? rawValue : {};
}

function normalizeActivityLog(rawLog) {
  if (!Array.isArray(rawLog)) {
    return [];
  }

  return rawLog
    .filter((entry) => entry && typeof entry.message === "string" && typeof entry.at === "string")
    .slice(0, ACTIVITY_LIMIT)
    .map((entry) => ({
      message: entry.message.slice(0, 180),
      at: entry.at,
    }));
}

function normalizeSessionMode(modeId) {
  return SESSION_MODE_IDS.has(modeId) ? modeId : "60";
}

function normalizeCompletedQuestLog(rawLog) {
  if (!Array.isArray(rawLog)) {
    return [];
  }

  return rawLog
    .filter((entry) => entry && typeof entry.id === "string" && typeof entry.at === "string")
    .slice(0, QUEST_LOG_LIMIT)
    .map((entry) => ({
      id: entry.id.slice(0, 160),
      at: entry.at,
      xp: clamp(Number.parseInt(entry.xp, 10) || 0, 0, 9999),
      label: typeof entry.label === "string" ? entry.label.slice(0, 80) : "Quest",
    }));
}

function defaultCoachState(previous = {}) {
  return {
    sessionMode: normalizeSessionMode(previous?.sessionMode),
    completedQuests: [],
  };
}

function normalizeCoachState(rawCoach) {
  return {
    sessionMode: normalizeSessionMode(rawCoach?.sessionMode),
    completedQuests: normalizeCompletedQuestLog(rawCoach?.completedQuests),
  };
}

function normalizeTrainingIssues(rawIssues) {
  if (!Array.isArray(rawIssues)) {
    return [];
  }

  return Array.from(new Set(
    rawIssues.filter((issue) => typeof issue === "string" && TRAINING_SIGNAL_IDS.has(issue)),
  ));
}

function normalizeTrainingResult(rawResult) {
  return TRAINING_RESULT_OPTIONS.some((option) => option.id === rawResult) ? rawResult : "progress";
}

function normalizeTrainingFailPoint(rawFailPoint) {
  return TRAINING_FAIL_POINT_OPTIONS.some((option) => option.id === rawFailPoint) ? rawFailPoint : "mid";
}

function parseOptionalBoundedInteger(rawValue, min, max) {
  if (rawValue == null) {
    return null;
  }

  const normalized = String(rawValue).trim();
  if (!normalized) {
    return null;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? clamp(parsed, min, max) : null;
}

function normalizeTrainingLog(rawLog) {
  if (!Array.isArray(rawLog)) {
    return [];
  }

  return rawLog
    .filter((entry) => entry && typeof entry.metaKey === "string" && typeof entry.at === "string" && LEVEL_META[entry.metaKey])
    .slice(0, TRAINING_LOG_LIMIT)
    .map((entry) => ({
      metaKey: entry.metaKey,
      at: entry.at,
      result: normalizeTrainingResult(entry.result),
      failPoint: normalizeTrainingFailPoint(entry.failPoint),
      bestPercent: parseOptionalBoundedInteger(entry.bestPercent, 0, 100),
      attempts: parseOptionalBoundedInteger(entry.attempts, 0, 9999),
      issues: normalizeTrainingIssues(entry.issues),
    }));
}

function defaultState() {
  return {
    version: SAVE_VERSION,
    profile: null,
    theme: DEFAULT_THEME,
    page: "overview",
    selectedWorldId: null,
    mainCleared: 0,
    bonusCleared: {},
    mainStepStatus: {},
    bonusStepStatus: {},
    levelNotes: {},
    trainingLog: [],
    activityLog: [],
    coach: defaultCoachState(),
  };
}

let routeData = buildRouteData(DEFAULT_PROFILE);

function loadState() {
  const baseState = defaultState();

  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    baseState.profile = normalizeProfile(raw?.profile);
    baseState.theme = normalizeTheme(raw?.theme);
    routeData = buildRouteData(baseState.profile || DEFAULT_PROFILE);
    const isKnownVersion = LEGACY_SAVE_VERSIONS.has(raw?.version);
    baseState.mainCleared = isKnownVersion
      ? clamp(Number.parseInt(raw?.mainCleared, 10) || 0, 0, routeData.totalMain)
      : 0;

    if (isKnownVersion) {
      const rawBonusCleared = normalizeRecord(raw?.bonusCleared);
      for (const step of routeData.bonusSteps) {
        if (rawBonusCleared[step.id]) {
          baseState.bonusCleared[step.id] = true;
        }
      }

      const rawMainStepStatus = normalizeRecord(raw?.mainStepStatus);
      for (const step of routeData.allMain) {
        const status = rawMainStepStatus[getMainLevelKey(step.number)];
        if (["ready", "practicing", "consistent", "revisit"].includes(status)) {
          baseState.mainStepStatus[getMainLevelKey(step.number)] = status;
        }
      }

      const rawBonusStepStatus = normalizeRecord(raw?.bonusStepStatus);
      for (const step of routeData.bonusSteps) {
        const status = rawBonusStepStatus[step.id];
        if (["optional", "practicing", "consistent"].includes(status)) {
          baseState.bonusStepStatus[step.id] = status;
        }
      }

      const validLevelKeys = new Set(routeData.allMain.map((step) => getMainLevelKey(step.number)));
      for (const step of routeData.bonusSteps) {
        validLevelKeys.add(step.id);
      }
      const rawLevelNotes = normalizeRecord(raw?.levelNotes);
      for (const [key, value] of Object.entries(rawLevelNotes)) {
        if (validLevelKeys.has(key) && typeof value === "string" && value.trim()) {
          baseState.levelNotes[key] = value.slice(0, 1200);
        }
      }

      baseState.trainingLog = normalizeTrainingLog(raw?.trainingLog);
      baseState.activityLog = normalizeActivityLog(raw?.activityLog);
      baseState.coach = normalizeCoachState(raw?.coach);
      baseState.page = normalizePage(raw?.page);
      baseState.selectedWorldId = routeData.preparedWorlds.some((world) => world.id === raw?.selectedWorldId)
        ? raw.selectedWorldId
        : getDefaultSelectedWorldId(routeData.preparedWorlds, baseState.mainCleared);
    } else {
      baseState.coach = defaultCoachState();
      baseState.selectedWorldId = getDefaultSelectedWorldId(routeData.preparedWorlds, baseState.mainCleared);
    }
  } catch (error) {
    routeData = buildRouteData(DEFAULT_PROFILE);
    baseState.coach = defaultCoachState();
    baseState.selectedWorldId = getDefaultSelectedWorldId(routeData.preparedWorlds, 0);
  }

  return baseState;
}

let state = loadState();
let trainingEngine = buildTrainingEngine();
let coachEngine = buildCoachEngine();
let skillEngine = buildSkillMapEngine();
let setupOpen = !state.profile;
let setupStep = 0;
let setupDraft = {
  ...currentProfileFallback(),
  theme: state.theme,
};
let toastTimer = null;
let currentPage = state.page || "overview";
let routeSearchQuery = "";
const undoStack = [];
let deferredInstallPrompt = null;
let lastFocusedElementBeforeSetup = null;
let shouldRefocusRouteSearch = false;
let pendingSetupScrollRestore = null;
let setupBodyScrollTop = 0;
let routeSearchSelectionStart = null;
let routeSearchSelectionEnd = null;

function currentProfileFallback() {
  return state?.profile || DEFAULT_PROFILE;
}

const initialUrlState = readUrlState();
if (initialUrlState.page) {
  currentPage = initialUrlState.page;
}
if (routeData.preparedWorlds.some((world) => world.id === initialUrlState.worldId)) {
  state.selectedWorldId = initialUrlState.worldId;
}

const elements = {
  mainContent: document.getElementById("main-content"),
  objectiveCard: document.getElementById("objective-card"),
  skillMapPanel: document.getElementById("skill-map-panel"),
  coveragePanel: document.getElementById("coverage-panel"),
  coachPanel: document.getElementById("coach-panel"),
  rewardPanel: document.getElementById("reward-panel"),
  questsPanel: document.getElementById("quests-panel"),
  plannerPanel: document.getElementById("planner-panel"),
  masteryPanel: document.getElementById("mastery-panel"),
  bossPanel: document.getElementById("boss-panel"),
  trainingPanel: document.getElementById("training-panel"),
  worldNav: document.getElementById("world-nav"),
  campaign: document.getElementById("campaign"),
  mainProgressFill: document.getElementById("main-progress-fill"),
  mainProgressLabel: document.getElementById("main-progress-label"),
  mainProgressSubtext: document.getElementById("main-progress-subtext"),
  miniCurrentWorld: document.getElementById("mini-current-world"),
  miniWorldsCleared: document.getElementById("mini-worlds-cleared"),
  miniBonusClears: document.getElementById("mini-bonus-clears"),
  metaMainCount: document.getElementById("meta-main-count"),
  metaBonusCount: document.getElementById("meta-bonus-count"),
  metaWorldCount: document.getElementById("meta-world-count"),
  metaRouteMode: document.getElementById("meta-route-mode"),
  metaThemeLabel: document.getElementById("meta-theme-label"),
  themeSwitcher: document.getElementById("theme-switcher"),
  installApp: document.getElementById("install-app"),
  exportSave: document.getElementById("export-save"),
  importSave: document.getElementById("import-save"),
  resetSave: document.getElementById("reset-save"),
  retakeSetup: document.getElementById("retake-setup"),
  setupOverlay: document.getElementById("setup-overlay"),
  toast: document.getElementById("toast"),
  routeToolbar: document.getElementById("route-toolbar"),
  auditPanel: document.getElementById("audit-panel"),
  historyPanel: document.getElementById("history-panel"),
  themeColorMeta: document.querySelector('meta[name="theme-color"]'),
  pages: Array.from(document.querySelectorAll(".page")),
  pageButtons: Array.from(document.querySelectorAll(".page-nav__button[data-page]")),
};

const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = ".json,application/json,text/plain";
importInput.hidden = true;
document.body.appendChild(importInput);

function saveState() {
  refreshDerivedState(true);
  state.version = SAVE_VERSION;
  state.page = normalizePage(currentPage);
  if (!routeData.preparedWorlds.some((world) => world.id === state.selectedWorldId)) {
    state.selectedWorldId = getDefaultSelectedWorldId(routeData.preparedWorlds, state.mainCleared);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function rebuildRoute(resetProgress = false) {
  routeData = buildRouteData(state.profile || DEFAULT_PROFILE);
  state.mainCleared = clamp(resetProgress ? 0 : state.mainCleared, 0, routeData.totalMain);

  const nextBonus = {};
  for (const step of routeData.bonusSteps) {
    if (!resetProgress && state.bonusCleared[step.id]) {
      nextBonus[step.id] = true;
    }
  }
  state.bonusCleared = nextBonus;

  const nextMainStepStatus = {};
  for (const step of routeData.allMain) {
    const key = getMainLevelKey(step.number);
    const status = state.mainStepStatus[key];
    if (!resetProgress && ["ready", "practicing", "consistent", "revisit"].includes(status)) {
      nextMainStepStatus[key] = status;
    }
  }
  state.mainStepStatus = nextMainStepStatus;

  const nextBonusStepStatus = {};
  for (const step of routeData.bonusSteps) {
    const status = state.bonusStepStatus[step.id];
    if (!resetProgress && ["optional", "practicing", "consistent"].includes(status)) {
      nextBonusStepStatus[step.id] = status;
    }
  }
  state.bonusStepStatus = nextBonusStepStatus;

  const nextLevelNotes = {};
  const validLevelKeys = new Set(routeData.allMain.map((step) => getMainLevelKey(step.number)));
  for (const step of routeData.bonusSteps) {
    validLevelKeys.add(step.id);
  }
  for (const [key, value] of Object.entries(state.levelNotes)) {
    if (!resetProgress && validLevelKeys.has(key) && typeof value === "string" && value.trim()) {
      nextLevelNotes[key] = value;
    }
  }
  state.levelNotes = nextLevelNotes;

  state.selectedWorldId = routeData.preparedWorlds.some((world) => world.id === state.selectedWorldId)
    ? state.selectedWorldId
    : getDefaultSelectedWorldId(routeData.preparedWorlds, state.mainCleared);
}

function applyTheme(themeId) {
  const theme = normalizeTheme(themeId);
  state.theme = theme;
  document.body.dataset.theme = theme;
}

function normalizePage(pageId) {
  return ["overview", "route", "settings"].includes(pageId) ? pageId : "overview";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  return {
    page: params.has("page") ? normalizePage(params.get("page")) : null,
    worldId: params.get("world"),
  };
}

function getPageTitle(pageId) {
  const page = normalizePage(pageId);
  return page === "overview" ? APP_NAME : `${PAGE_TITLES[page]} | ${APP_NAME}`;
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function syncThemeColorMeta() {
  const color = getComputedStyle(document.body).getPropertyValue("--bg-elevated").trim()
    || getComputedStyle(document.body).getPropertyValue("--bg").trim()
    || "#0b1220";
  elements.themeColorMeta?.setAttribute("content", color);
}

function syncInstallButton() {
  if (!elements.installApp) {
    return;
  }

  const available = Boolean(deferredInstallPrompt) && !isStandaloneMode();
  elements.installApp.hidden = !available;
  elements.installApp.disabled = !available;
}

function syncUrlState() {
  const url = new URL(window.location.href);
  if (currentPage === "overview") {
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", currentPage);
  }

  const selectedWorld = getSelectedWorld();
  if (currentPage === "route" && selectedWorld?.id) {
    url.searchParams.set("world", selectedWorld.id);
  } else {
    url.searchParams.delete("world");
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl !== currentUrl) {
    window.history.replaceState({}, "", nextUrl);
  }
}

function syncAppBranding() {
  document.title = getPageTitle(currentPage);
  syncThemeColorMeta();
  syncInstallButton();
  syncUrlState();
}

async function promptInstall() {
  if (isStandaloneMode()) {
    showToast(`${APP_NAME} is already installed.`);
    return;
  }

  if (!deferredInstallPrompt) {
    showToast("Install is available from Chrome once the browser offers the app prompt.");
    return;
  }

  const installPrompt = deferredInstallPrompt;
  deferredInstallPrompt = null;
  syncInstallButton();
  await installPrompt.prompt();
  await installPrompt.userChoice.catch(() => null);
}

function registerAppShell() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => {});

    if ("caches" in window) {
      caches.keys()
        .then((keys) => Promise.all(
          keys
            .filter((key) => key.startsWith("gd-route-planner-shell-"))
            .map((key) => caches.delete(key)),
        ))
        .catch(() => {});
    }
  }, { once: true });
}

function cloneStateSnapshot() {
  return JSON.parse(JSON.stringify(state));
}

function recordActivity(message) {
  state.activityLog = [
    {
      message,
      at: new Date().toISOString(),
    },
    ...state.activityLog,
  ].slice(0, ACTIVITY_LIMIT);
}

function pushUndoSnapshot() {
  undoStack.unshift(cloneStateSnapshot());
  if (undoStack.length > UNDO_LIMIT) {
    undoStack.length = UNDO_LIMIT;
  }
}

function syncPages() {
  currentPage = normalizePage(currentPage);
  state.page = currentPage;
  document.body.dataset.page = currentPage;
  elements.pages.forEach((page) => {
    const isActive = page.dataset.page === currentPage;
    page.hidden = !isActive;
    page.setAttribute("aria-hidden", String(!isActive));
    if ("inert" in page) {
      page.inert = !isActive;
    }
  });
  elements.pageButtons.forEach((button) => {
    const isActive = button.dataset.page === currentPage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function currentProfile() {
  return state.profile || DEFAULT_PROFILE;
}

function getSelectedWorld() {
  return routeData.preparedWorlds.find((world) => world.id === state.selectedWorldId)
    || getCurrentWorld()
    || routeData.preparedWorlds[0];
}

function resetSetupDraft() {
  setupDraft = {
    ...currentProfile(),
    theme: state.theme,
  };
  setupStep = 0;
}

function openSetup() {
  if (document.activeElement instanceof HTMLElement) {
    lastFocusedElementBeforeSetup = document.activeElement;
  }
  resetSetupDraft();
  setupOpen = true;
  render();
}

function closeSetup() {
  setupOpen = false;
  setupStep = 0;
  setupDraft = {
    ...currentProfile(),
    theme: state.theme,
  };
  applyTheme(state.theme);
  render();
  if (lastFocusedElementBeforeSetup instanceof HTMLElement) {
    window.requestAnimationFrame(() => {
      lastFocusedElementBeforeSetup?.focus({ preventScroll: true });
    });
  }
}

function undoLastChange() {
  const snapshot = undoStack.shift();
  if (!snapshot) {
    showToast("Nothing to undo.");
    return;
  }

  state = snapshot;
  routeData = buildRouteData(state.profile || DEFAULT_PROFILE);
  currentPage = normalizePage(state.page);
  applyTheme(state.theme);
  setupOpen = !state.profile;
  resetSetupDraft();
  recordActivity("Undid the last saved change.");
  saveState();
  render();
  showToast("Last change undone.");
}

function getCurrentStep() {
  return state.mainCleared >= routeData.totalMain ? null : routeData.allMain[state.mainCleared];
}

function getCurrentWorld() {
  const currentStep = getCurrentStep();
  if (currentStep) {
    return routeData.preparedWorlds[currentStep.worldIndex];
  }
  return routeData.preparedWorlds[routeData.preparedWorlds.length - 1];
}

function getWorldMainClears(world) {
  return clamp(state.mainCleared - world.startIndex + 1, 0, world.levels.length);
}

function getWorldBonusClears(world) {
  return world.bonusPacks.reduce((total, pack) => {
    return total + pack.steps.filter((step) => state.bonusCleared[step.id]).length;
  }, 0);
}

function getBonusClearsCount() {
  return routeData.bonusSteps.filter((step) => state.bonusCleared[step.id]).length;
}

function getCompletedWorldsCount() {
  return routeData.preparedWorlds.filter((world) => state.mainCleared >= world.endIndex).length;
}

function isBonusUnlocked(pack) {
  return state.mainCleared >= pack.unlockAt;
}

function focusWorld(worldId) {
  if (routeData.preparedWorlds.some((world) => world.id === worldId)) {
    state.selectedWorldId = worldId;
  }
}

function normalizeSelectedWorld() {
  if (!routeData.preparedWorlds.some((world) => world.id === state.selectedWorldId)) {
    state.selectedWorldId = getDefaultSelectedWorldId(routeData.preparedWorlds, state.mainCleared);
  }
}

function getMainStepDisplayStatus(step) {
  const customStatus = state.mainStepStatus[getMainLevelKey(step.number)];
  if (step.number <= state.mainCleared) {
    return customStatus === "revisit" ? "revisit" : "cleared";
  }
  if (step.number === state.mainCleared + 1) {
    return customStatus || "ready";
  }
  return "locked";
}

function getMainStepStatusLabel(step) {
  const status = getMainStepDisplayStatus(step);
  return MAIN_PROGRESS_OPTIONS.find((option) => option.id === status)?.label || "Locked";
}

function getBonusStepDisplayStatus(step, pack) {
  if (!isBonusUnlocked(pack)) {
    return "locked";
  }
  if (state.bonusCleared[step.id]) {
    return "cleared";
  }
  return state.bonusStepStatus[step.id] || "optional";
}

function getBonusStepStatusLabel(step, pack) {
  const status = getBonusStepDisplayStatus(step, pack);
  if (status === "locked") {
    return "Locked";
  }
  return BONUS_PROGRESS_OPTIONS.find((option) => option.id === status)?.label || "Optional";
}

function getLevelNote(levelKey) {
  return state.levelNotes[levelKey] || "";
}

function getTrainingSignalMeta(signalId) {
  return TRAINING_SIGNAL_LOOKUP[signalId] || TRAINING_SIGNAL_META[0];
}

function getStepFromNoteKey(levelKey) {
  if (levelKey.startsWith("main-")) {
    const stepNumber = Number.parseInt(levelKey.slice(5), 10);
    return routeData.allMain[stepNumber - 1] || null;
  }
  return routeData.bonusSteps.find((step) => step.id === levelKey) || null;
}

function inferTrainingSignalsFromText(text) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return [];
  }

  return TRAINING_SIGNAL_META
    .filter((signal) => (TRAINING_NOTE_KEYWORDS[signal.id] || []).some((keyword) => normalized.includes(normalizeText(keyword))))
    .map((signal) => signal.id);
}

function createSkillVector(seed = 0) {
  return Object.fromEntries(SKILL_MAP_META.map((skill) => [skill.id, seed]));
}

function getSkillMeta(skillId) {
  return SKILL_MAP_LOOKUP[skillId] || SKILL_MAP_META[0];
}

function addSkillWeight(vector, skillId, amount) {
  if (!(skillId in vector)) {
    return;
  }
  vector[skillId] += amount;
}

function addSkillWeights(vector, weights, multiplier = 1) {
  Object.entries(weights || {}).forEach(([skillId, amount]) => {
    addSkillWeight(vector, skillId, amount * multiplier);
  });
}

function mixSkillVector(target, source, multiplier = 1) {
  SKILL_MAP_META.forEach((skill) => {
    addSkillWeight(target, skill.id, (source?.[skill.id] || 0) * multiplier);
  });
}

function divideSkillVector(vector, divisor) {
  const next = createSkillVector(0);
  if (!divisor) {
    return next;
  }
  SKILL_MAP_META.forEach((skill) => {
    next[skill.id] = vector[skill.id] / divisor;
  });
  return next;
}

function getSkillVectorTotal(vector) {
  return SKILL_MAP_META.reduce((total, skill) => total + (vector?.[skill.id] || 0), 0);
}

function normalizeSkillShares(vector) {
  const total = getSkillVectorTotal(vector);
  const next = createSkillVector(0);
  if (!total) {
    return next;
  }
  SKILL_MAP_META.forEach((skill) => {
    next[skill.id] = (vector[skill.id] / total) * 100;
  });
  return next;
}

function getRelativeSkillDisplay(vector) {
  const peak = Math.max(...SKILL_MAP_META.map((skill) => vector?.[skill.id] || 0), 0);
  const next = createSkillVector(0);
  if (!peak) {
    return next;
  }
  SKILL_MAP_META.forEach((skill) => {
    next[skill.id] = Math.round(((vector[skill.id] || 0) / peak) * 100);
  });
  return next;
}

function getTopSkillHighlights(vector, limit = 3, minimum = 0) {
  return SKILL_MAP_META
    .map((skill) => ({
      ...skill,
      value: vector?.[skill.id] || 0,
    }))
    .filter((entry) => entry.value > minimum)
    .sort((left, right) => right.value - left.value)
    .slice(0, limit);
}

function getStepSkillText(step) {
  return normalizeText([
    step.name,
    step.reason,
    step.skills.join(" "),
    step.difficulty,
    step.length,
    step.worldTitle,
    step.worldLabel,
  ].join(" "));
}

function buildRouteDna(step) {
  const text = getStepSkillText(step);
  const raw = createSkillVector(0);

  SKILL_DNA_RULES.forEach((rule) => {
    if (rule.keywords.some((keyword) => text.includes(normalizeText(keyword)))) {
      addSkillWeights(raw, rule.weights);
    }
  });

  ["wave", "ship", "timings", "memory", "duals", "endurance"].forEach((focusId) => {
    if (!matchesFocus(step, focusId)) {
      return;
    }
    addSkillWeight(raw, focusId, focusId === "duals" ? 1.55 : 1.2);
    addSkillWeight(raw, "consistency", 0.16);
  });

  if (step.length === "Long") {
    addSkillWeights(raw, { endurance: 0.7, consistency: 0.22, nerve: 0.08 });
  } else if (step.length === "XL") {
    addSkillWeights(raw, { endurance: 1.18, consistency: 0.34, nerve: 0.24 });
  }
  if (step.isBoss || step.milestone) {
    addSkillWeights(raw, { nerve: 0.72, consistency: 0.4, endurance: 0.18 });
  }
  if (step.placement) {
    addSkillWeights(raw, { nerve: 0.4, consistency: 0.2 });
  }
  if (!getSkillVectorTotal(raw)) {
    addSkillWeights(raw, { consistency: 1, timings: 0.45 });
  }

  const shares = normalizeSkillShares(raw);
  const display = getRelativeSkillDisplay(shares);
  const highlights = getTopSkillHighlights(shares, 4, 0.1);
  const dominant = highlights[0] || { ...SKILL_MAP_META[0], value: 0 };
  const supportLabels = highlights.slice(1, 3).map((entry) => entry.label.toLowerCase());
  const summary = supportLabels.length
    ? `${dominant.label} primary with ${joinWithAnd(supportLabels)} support`
    : `${dominant.label} primary`;

  return {
    raw,
    shares,
    display,
    highlights,
    dominant,
    summary,
    signature: highlights.slice(0, 3).map((entry) => `${entry.shortLabel} ${Math.round(display[entry.id] || 0)}`),
  };
}

function getDnaSimilarity(leftDna, rightDna) {
  return SKILL_MAP_META.reduce((total, skill) => {
    return total + Math.min(leftDna?.shares?.[skill.id] || 0, rightDna?.shares?.[skill.id] || 0);
  }, 0);
}

function getTrainingAffinities(step) {
  const skillText = normalizeText(step.skills.join(" "));
  const length = LEVEL_META[step.metaKey]?.length || step.length;
  const affinities = {
    wave: matchesFocus(step, "wave") ? 1.2 : 0,
    chokepoint: matchesFocus(step, "timings") ? 0.7 : 0,
    stamina: matchesFocus(step, "endurance") ? 0.55 : 0,
    nerve: 0,
    ending: 0,
  };

  if (["Long", "XL"].includes(length)) {
    affinities.stamina += length === "XL" ? 1.05 : 0.75;
    affinities.ending += 0.55;
  }
  if (step.isBoss || step.milestone) {
    affinities.chokepoint += 0.25;
    affinities.nerve += 0.55;
    affinities.ending += 0.45;
  }
  if (step.placement) {
    affinities.nerve += 0.35;
  }
  if (["precision", "timings", "reaction", "discipline", "execution", "control", "adaptation"].some((keyword) => skillText.includes(keyword))) {
    affinities.chokepoint += 0.55;
  }
  if (["consistency", "focus", "composure", "run management", "routing"].some((keyword) => skillText.includes(keyword))) {
    affinities.stamina += 0.35;
  }
  if (["nerve", "pressure", "focus", "composure"].some((keyword) => skillText.includes(keyword))) {
    affinities.nerve += 0.75;
  }
  if (["late", "run management", "routing", "xl"].some((keyword) => skillText.includes(keyword))) {
    affinities.ending += 0.45;
  }

  for (const key of Object.keys(affinities)) {
    affinities[key] = clamp(affinities[key], 0, 1.6);
  }

  return affinities;
}

function createTrainingAggregate(metaKey) {
  return {
    metaKey,
    sessions: 0,
    attempts: 0,
    bestPercent: null,
    lastAt: null,
    roughSessions: 0,
    clearSessions: 0,
    endingFails: 0,
    issueScores: Object.fromEntries(TRAINING_SIGNAL_META.map((signal) => [signal.id, 0])),
  };
}

function getOrCreateTrainingAggregate(store, metaKey) {
  if (!store.has(metaKey)) {
    store.set(metaKey, createTrainingAggregate(metaKey));
  }
  return store.get(metaKey);
}

function joinWithAnd(items) {
  if (!items.length) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getRecentTrainingSessions(metaKey, limit = 3) {
  return state.trainingLog
    .filter((entry) => entry.metaKey === metaKey)
    .slice(0, limit);
}

function createTrainingLogEntry(metaKey, values = {}) {
  if (!LEVEL_META[metaKey]) {
    return null;
  }

  const result = normalizeTrainingResult(values.result);
  const failPoint = result === "clear" ? "clear" : normalizeTrainingFailPoint(values.failPoint);
  const bestPercent = parseOptionalBoundedInteger(values.bestPercent, 0, 100) ?? (result === "clear" ? 100 : null);
  const attempts = parseOptionalBoundedInteger(values.attempts, 0, 9999);

  return {
    metaKey,
    at: new Date().toISOString(),
    result,
    failPoint,
    bestPercent,
    attempts,
    issues: normalizeTrainingIssues(values.issues),
  };
}

function appendTrainingLogEntry(entry) {
  if (!entry) {
    return;
  }

  state.trainingLog = [
    entry,
    ...state.trainingLog,
  ].slice(0, TRAINING_LOG_LIMIT);
}

function getBonusPackForStep(step) {
  const world = routeData.preparedWorlds[step.worldIndex];
  return world?.bonusPacks.find((pack) => pack.steps.some((candidate) => candidate.id === step.id)) || null;
}

function getTrainingCandidateStatus(step) {
  if (typeof step.number === "number") {
    return getMainStepDisplayStatus(step);
  }

  const pack = getBonusPackForStep(step);
  return pack ? getBonusStepDisplayStatus(step, pack) : "locked";
}

function isTrainingCandidateUnlocked(step) {
  if (typeof step.number === "number") {
    return step.number <= state.mainCleared + 1;
  }

  const pack = getBonusPackForStep(step);
  return Boolean(pack) && isBonusUnlocked(pack);
}

function buildTrainingEngine() {
  const issueTotals = Object.fromEntries(TRAINING_SIGNAL_META.map((signal) => [signal.id, 0]));
  const byMetaKey = new Map();
  const now = Date.now();
  const anchorStep = getProgressAnchorStep();

  for (const session of state.trainingLog) {
    const aggregate = getOrCreateTrainingAggregate(byMetaKey, session.metaKey);
    const sessionTime = new Date(session.at).getTime();
    const ageInDays = Number.isFinite(sessionTime) ? Math.max(0, (now - sessionTime) / (1000 * 60 * 60 * 24)) : 30;
    const recencyWeight = clamp(1.15 - ageInDays / 45, 0.22, 1.15);
    const resultWeight = session.result === "rough"
      ? 1.3
      : session.result === "progress"
        ? 1
        : session.result === "stable"
          ? 0.6
          : 0.25;
    const sessionWeight = recencyWeight * resultWeight;
    const affinities = getTrainingAffinities({ ...LEVEL_META[session.metaKey], metaKey: session.metaKey, skills: [] });

    aggregate.sessions += 1;
    aggregate.attempts += session.attempts || 0;
    aggregate.bestPercent = aggregate.bestPercent == null
      ? session.bestPercent
      : Math.max(aggregate.bestPercent, session.bestPercent ?? 0);
    aggregate.lastAt = !aggregate.lastAt || new Date(session.at) > new Date(aggregate.lastAt) ? session.at : aggregate.lastAt;
    if (session.result === "rough") {
      aggregate.roughSessions += 1;
    }
    if (session.result === "clear") {
      aggregate.clearSessions += 1;
    }

    for (const issue of session.issues) {
      aggregate.issueScores[issue] += sessionWeight;
      issueTotals[issue] += sessionWeight;
    }

    if (session.failPoint === "ending" && session.result !== "clear") {
      aggregate.endingFails += 1;
      aggregate.issueScores.ending += recencyWeight * 1.35;
      aggregate.issueScores.nerve += recencyWeight * 0.8;
      issueTotals.ending += recencyWeight * 1.35;
      issueTotals.nerve += recencyWeight * 0.8;
      if (affinities.stamina > 0.6) {
        aggregate.issueScores.stamina += recencyWeight * 0.65;
        issueTotals.stamina += recencyWeight * 0.65;
      }
    } else if (session.failPoint === "mid" && session.result === "rough") {
      aggregate.issueScores.chokepoint += recencyWeight * 0.75;
      issueTotals.chokepoint += recencyWeight * 0.75;
    } else if (session.failPoint === "opening" && session.result === "rough" && affinities.wave > 0.6) {
      aggregate.issueScores.wave += recencyWeight * 0.45;
      issueTotals.wave += recencyWeight * 0.45;
    }
  }

  for (const [levelKey, note] of Object.entries(state.levelNotes)) {
    const step = getStepFromNoteKey(levelKey);
    if (!step) {
      continue;
    }

    const inferredSignals = inferTrainingSignalsFromText(note);
    if (!inferredSignals.length) {
      continue;
    }

    const aggregate = getOrCreateTrainingAggregate(byMetaKey, step.metaKey);
    const boost = levelKey === getMainLevelKey(state.mainCleared + 1) ? 0.85 : 0.45;
    for (const signalId of inferredSignals) {
      aggregate.issueScores[signalId] += boost;
      issueTotals[signalId] += boost;
    }
  }

  for (const step of routeData.allMain) {
    const status = getMainStepDisplayStatus(step);
    if (!["practicing", "revisit", "consistent"].includes(status)) {
      continue;
    }

    const aggregate = getOrCreateTrainingAggregate(byMetaKey, step.metaKey);
    const affinities = getTrainingAffinities(step);
    const boost = status === "practicing" ? 0.9 : status === "revisit" ? 0.65 : 0.25;
    for (const signal of TRAINING_SIGNAL_META) {
      if (affinities[signal.id] <= 0) {
        continue;
      }
      const nextScore = affinities[signal.id] * boost;
      aggregate.issueScores[signal.id] += nextScore;
      issueTotals[signal.id] += nextScore;
    }
  }

  for (const step of routeData.bonusSteps) {
    const pack = getBonusPackForStep(step);
    if (!pack) {
      continue;
    }

    const status = getBonusStepDisplayStatus(step, pack);
    if (!["practicing", "consistent"].includes(status)) {
      continue;
    }

    const aggregate = getOrCreateTrainingAggregate(byMetaKey, step.metaKey);
    const affinities = getTrainingAffinities(step);
    const boost = status === "practicing" ? 0.8 : 0.2;
    for (const signal of TRAINING_SIGNAL_META) {
      if (affinities[signal.id] <= 0) {
        continue;
      }
      const nextScore = affinities[signal.id] * boost;
      aggregate.issueScores[signal.id] += nextScore;
      issueTotals[signal.id] += nextScore;
    }
  }

  const signals = TRAINING_SIGNAL_META
    .map((signal) => ({
      ...signal,
      score: issueTotals[signal.id],
      intensity: issueTotals[signal.id] >= 7 ? "High" : issueTotals[signal.id] >= 3.5 ? "Medium" : issueTotals[signal.id] >= 1.2 ? "Light" : "Low",
    }))
    .sort((left, right) => right.score - left.score);

  let activeSignals = signals.filter((signal) => signal.score >= 0.85).slice(0, 3);
  if (!activeSignals.length && signals[0]?.score > 0) {
    activeSignals = signals.slice(0, 1);
  }

  const recommendations = [...routeData.allMain, ...routeData.bonusSteps]
    .filter((step) => isTrainingCandidateUnlocked(step))
    .map((step) => {
      const aggregate = byMetaKey.get(step.metaKey) || createTrainingAggregate(step.metaKey);
      const affinities = getTrainingAffinities(step);
      const status = getTrainingCandidateStatus(step);
      const isCurrentMain = typeof step.number === "number" && step.number === state.mainCleared + 1;
      let score = isCurrentMain ? 20 : 0;

      if (status === "practicing") {
        score += 18;
      } else if (status === "revisit") {
        score += 15;
      } else if (status === "consistent") {
        score += 7;
      } else if (status === "cleared" || status === "optional") {
        score -= 5;
      }

      activeSignals.forEach((signal, index) => {
        const rankWeight = index === 0 ? 18 : index === 1 ? 12 : 8;
        score += affinities[signal.id] * rankWeight;
        score += Math.min(14, aggregate.issueScores[signal.id] * 3.5);
      });

      if (!activeSignals.length && matchesFocus(step, currentProfile().focus)) {
        score += 6;
      }

      score += Math.min(16, aggregate.roughSessions * 4.5);
      score += Math.min(18, aggregate.endingFails * 6);
      if ((step.length === "Long" || step.length === "XL") && activeSignals.some((signal) => ["stamina", "ending"].includes(signal.id))) {
        score += 6;
      }
      if ((step.isBoss || step.milestone) && activeSignals.some((signal) => ["nerve", "ending", "chokepoint"].includes(signal.id))) {
        score += 6;
      }
      if (typeof step.number !== "number") {
        score += 2;
      }
      if (aggregate.clearSessions && aggregate.roughSessions === 0 && status === "cleared") {
        score -= Math.min(10, aggregate.clearSessions * 2);
      }
      score += getProgressionRelevanceScore(step, anchorStep, { preferRecent: true, allowBonusBias: true });

      const dominantSignal = activeSignals
        .map((signal) => ({
          signal,
          value: affinities[signal.id] * 2 + aggregate.issueScores[signal.id],
        }))
        .sort((left, right) => right.value - left.value)[0]?.signal || null;
      const reasonParts = [];
      if (dominantSignal) {
        reasonParts.push(`targets ${dominantSignal.label.toLowerCase()}`);
      }
      if (aggregate.endingFails > 0) {
        reasonParts.push(`${aggregate.endingFails} late miss${aggregate.endingFails === 1 ? "" : "es"} logged`);
      } else if (aggregate.roughSessions > 1) {
        reasonParts.push(`${aggregate.roughSessions} rough sessions logged`);
      }
      if (status === "practicing") {
        reasonParts.push("already in your practice rotation");
      } else if (isCurrentMain) {
        reasonParts.push("current main gate");
      }

      return {
        step,
        score,
        label: dominantSignal?.queueLabel || (isCurrentMain ? "Main push" : typeof step.number === "number" ? "Revisit" : "Bonus drill"),
        reason: reasonParts.length
          ? `${reasonParts[0].charAt(0).toUpperCase()}${reasonParts[0].slice(1)}${reasonParts.length > 1 ? `. ${reasonParts.slice(1).join(". ")}.` : "."}`
          : "Keeps pressure on your current route without drifting away from the ladder.",
      };
    })
    .filter((entry) => isRecommendationBandStep(entry.step, anchorStep, { preferRecent: true, allowBonusBias: true }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 6)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  const recommendationByMetaKey = new Map(recommendations.map((entry) => [entry.step.metaKey, entry]));
  const totalSessions = state.trainingLog.length;
  const trackedLevels = Array.from(byMetaKey.values()).filter((aggregate) => {
    return aggregate.sessions > 0 || Object.values(aggregate.issueScores).some((score) => score >= 0.85);
  }).length;
  const endingFailures = state.trainingLog.filter((session) => session.failPoint === "ending" && session.result !== "clear").length;
  const recentSessions = state.trainingLog.slice(0, 4).map((session) => ({
    ...session,
    level: LEVEL_META[session.metaKey],
  }));
  const primarySignal = activeSignals[0] || null;
  const summary = totalSessions || trackedLevels
    ? `${joinWithAnd(activeSignals.map((signal) => signal.label.toLowerCase())) || "Recent sessions"} are showing up most right now. ${recommendations[0] ? `${recommendations[0].step.name} is the best next rep.` : "Keep feeding the engine more sessions."}`
    : "Start logging sessions in any tracker panel. The engine will learn your weak spots and build a live practice queue on top of the route.";

  return {
    engaged: Boolean(totalSessions || trackedLevels),
    summary,
    totalSessions,
    trackedLevels,
    endingFailures,
    activeSignals,
    signals,
    recommendations,
    recommendationByMetaKey,
    byMetaKey,
    primarySignal,
    recentSessions,
    suggestedFocus: primarySignal ? getTrainingSignalMeta(primarySignal.id).focus : currentProfile().focus,
  };
}

function getLocalDayKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getAgeInDays(value, now = Date.now()) {
  const parsed = new Date(value).getTime();
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return Math.max(0, Math.floor((now - parsed) / (1000 * 60 * 60 * 24)));
}

function average(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function getAllRouteSteps() {
  return [...routeData.allMain, ...routeData.bonusSteps];
}

function getStepRouteKey(step) {
  return typeof step.number === "number" ? getMainLevelKey(step.number) : step.id;
}

function getStepDisplayStatus(step) {
  if (typeof step.number === "number") {
    return getMainStepDisplayStatus(step);
  }

  const pack = getBonusPackForStep(step);
  return pack ? getBonusStepDisplayStatus(step, pack) : "locked";
}

function getStepStatusLabel(step) {
  if (typeof step.number === "number") {
    return getMainStepStatusLabel(step);
  }

  const pack = getBonusPackForStep(step);
  return pack ? getBonusStepStatusLabel(step, pack) : "Locked";
}

function isStepCleared(step) {
  return typeof step.number === "number" ? step.number <= state.mainCleared : Boolean(state.bonusCleared[step.id]);
}

function getRecentSessionsForDay(metaKey, dayKey) {
  return state.trainingLog.filter((entry) => entry.metaKey === metaKey && getLocalDayKey(entry.at) === dayKey);
}

function getTrainingDayStreak() {
  const availableDays = new Set(state.trainingLog.map((entry) => getLocalDayKey(entry.at)).filter(Boolean));
  if (!availableDays.size) {
    return 0;
  }

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (availableDays.has(getLocalDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getMasteryTier(score) {
  return MASTERY_TIERS.reduce((tier, candidate) => (score >= candidate.min ? candidate : tier), MASTERY_TIERS[0]);
}

function getNextMasteryTier(score) {
  return MASTERY_TIERS.find((tier) => tier.min > score) || null;
}

function getFreshnessProfile(status, aggregate, bestPercent) {
  const isClearState = ["cleared", "revisit"].includes(status);
  if (!aggregate.lastAt) {
    return {
      score: isClearState ? 22 : bestPercent != null ? 44 : 58,
      label: isClearState ? "Unrefreshed" : bestPercent != null ? "Open" : "Untouched",
      daysAgo: null,
      stale: isClearState,
      rusty: false,
      summary: isClearState ? "No recent reclaim reps logged." : "No recent reps logged yet.",
    };
  }

  const daysAgo = getAgeInDays(aggregate.lastAt);
  let score = 100 - (daysAgo || 0) * (isClearState ? 4.6 : 2.7);
  if (aggregate.clearSessions > 0) {
    score += 7;
  }
  if (!isClearState && bestPercent != null) {
    score += clamp((bestPercent - 55) * 0.15, -6, 8);
  }
  score = clamp(Math.round(score), 12, 100);

  let label = "Hot";
  if ((daysAgo || 0) >= 3) {
    label = "Fresh";
  }
  if ((daysAgo || 0) >= 8) {
    label = "Cooling";
  }
  if ((daysAgo || 0) >= 16) {
    label = isClearState ? "Stale" : "Cold";
  }
  if ((daysAgo || 0) >= 32) {
    label = isClearState ? "Rusty" : "Dormant";
  }

  return {
    score,
    label,
    daysAgo,
    stale: isClearState && (daysAgo || 0) >= 14,
    rusty: isClearState && (daysAgo || 0) >= 32,
    summary: daysAgo == null
      ? "No recent activity recorded."
      : `${daysAgo} day${daysAgo === 1 ? "" : "s"} since the last logged rep.`,
  };
}

function buildMasteryInsight(step) {
  const aggregate = trainingEngine.byMetaKey.get(step.metaKey) || createTrainingAggregate(step.metaKey);
  const status = getStepDisplayStatus(step);
  const statusLabel = getStepStatusLabel(step);
  const unlocked = isTrainingCandidateUnlocked(step);
  const cleared = isStepCleared(step);
  const bestPercent = aggregate.bestPercent ?? (cleared ? 100 : null);
  const affinities = getTrainingAffinities(step);
  const freshness = getFreshnessProfile(status, aggregate, bestPercent);
  const stableSessions = Math.max(0, aggregate.sessions - aggregate.roughSessions);
  const issueEntries = TRAINING_SIGNAL_META.map((signal) => ({
    ...signal,
    value: (aggregate.issueScores[signal.id] || 0) + (affinities[signal.id] || 0) * 0.45,
  })).sort((left, right) => right.value - left.value);
  const dominantIssue = issueEntries[0]?.value >= 0.75 ? issueEntries[0] : null;

  const baseByStatus = {
    locked: 4,
    optional: 10,
    ready: 18,
    practicing: 30,
    consistent: 42,
    revisit: 40,
    cleared: 42,
  };

  let masteryScore = baseByStatus[status] ?? 12;
  masteryScore += bestPercent != null ? bestPercent * 0.24 : 0;
  masteryScore += Math.min(14, aggregate.sessions * 2.1);
  masteryScore += Math.min(12, aggregate.clearSessions * 6);
  masteryScore += Math.min(10, stableSessions * 1.1);
  masteryScore -= Math.min(12, aggregate.roughSessions * 2.3);
  masteryScore -= Math.min(10, aggregate.endingFails * 1.9);
  masteryScore += Math.round((freshness.score - 50) * (["cleared", "revisit"].includes(status) || aggregate.clearSessions > 0 ? 0.36 : 0.12));
  if (status === "revisit") {
    masteryScore -= 8;
  }
  if (status === "locked") {
    masteryScore = Math.min(masteryScore, 14);
  }
  masteryScore = clamp(Math.round(masteryScore), 0, 100);

  const tier = getMasteryTier(masteryScore);
  const nextTier = getNextMasteryTier(masteryScore);
  const summaryParts = [];
  if (bestPercent != null && bestPercent < 100) {
    summaryParts.push(`best ${bestPercent}%`);
  } else if (cleared) {
    summaryParts.push(freshness.stale ? "clear is cooling off" : "clear is still fresh");
  }
  if (aggregate.roughSessions > 0) {
    summaryParts.push(`${aggregate.roughSessions} rough session${aggregate.roughSessions === 1 ? "" : "s"}`);
  }
  if (dominantIssue) {
    summaryParts.push(`${dominantIssue.shortLabel.toLowerCase()} is still leaking`);
  }
  if (!summaryParts.length) {
    summaryParts.push(unlocked ? "ready for a real read" : "still locked behind the main route");
  }

  let reclaimWeight = -999;
  if (unlocked && (cleared || status === "revisit" || bestPercent >= 85 || status === "consistent")) {
    reclaimWeight = (100 - freshness.score) * 0.78;
    if (status === "revisit") {
      reclaimWeight += 18;
    }
    if (aggregate.clearSessions > 0) {
      reclaimWeight += 6;
    }
    if (aggregate.endingFails > 0) {
      reclaimWeight += 4;
    }
    if (freshness.daysAgo != null) {
      reclaimWeight += Math.min(12, freshness.daysAgo * 0.45);
    }
    if (!cleared && bestPercent >= 90) {
      reclaimWeight += 10;
    }
  }

  let repairWeight = unlocked ? 0 : -999;
  if (unlocked) {
    trainingEngine.activeSignals.forEach((signal, index) => {
      const weight = index === 0 ? 1 : index === 1 ? 0.72 : 0.5;
      repairWeight += ((affinities[signal.id] || 0) * 12 + (aggregate.issueScores[signal.id] || 0) * 8) * weight;
    });
    if (status === "practicing") {
      repairWeight += 8;
    }
    if (status === "revisit") {
      repairWeight += 4;
    }
  }

  return {
    step,
    aggregate,
    affinities,
    status,
    statusLabel,
    unlocked,
    cleared,
    bestPercent,
    freshness,
    masteryScore,
    tier,
    nextTier,
    dominantIssue,
    summary: `${summaryParts[0].charAt(0).toUpperCase()}${summaryParts[0].slice(1)}${summaryParts.length > 1 ? `. ${summaryParts.slice(1).join(". ")}.` : "."}`,
    repairWeight,
    reclaimWeight,
  };
}

function buildQuestProgress(metaKey, dayKey, evaluator, fallback) {
  const todaysSessions = getRecentSessionsForDay(metaKey, dayKey);
  const qualifyingSessions = todaysSessions.filter(evaluator);
  return {
    todaysSessions,
    qualifyingSessions,
    criteriaMet: qualifyingSessions.length > 0,
    label: qualifyingSessions.length
      ? `${qualifyingSessions.length} banked today`
      : fallback,
  };
}

function pickDistinctInsight(candidates, excludedKeys = new Set()) {
  return candidates.find((insight) => !excludedKeys.has(insight.step.metaKey)) || candidates[0] || null;
}

function scoreBossSupport(candidate, bossInsight, worldId) {
  const overlap = TRAINING_SIGNAL_META.reduce((total, signal) => {
    return total + Math.min(candidate.affinities[signal.id] || 0, bossInsight.affinities[signal.id] || 0) * 12;
  }, 0);

  return overlap
    + (candidate.step.worldId === worldId ? 5 : 0)
    + (candidate.step.number === state.mainCleared + 1 ? 7 : 0)
    + (100 - candidate.masteryScore) * 0.12
    + (candidate.freshness.stale ? 4 : 0);
}

function buildBossReadiness(insightByMetaKey, excludedKeys = new Set()) {
  const currentStep = getCurrentStep();
  const targetWorld = currentStep
    ? getCurrentWorld()
    : routeData.preparedWorlds[routeData.preparedWorlds.length - 1];
  const bossStep = targetWorld.levels[targetWorld.levels.length - 1];
  const bossInsight = insightByMetaKey.get(bossStep.metaKey);
  const worldInsights = targetWorld.levels.map((step) => insightByMetaKey.get(step.metaKey)).filter(Boolean);
  const unlockedWorldInsights = worldInsights.filter((insight) => insight.unlocked || insight.step.metaKey === bossStep.metaKey);
  const currentInsight = currentStep ? insightByMetaKey.get(currentStep.metaKey) : bossInsight;

  if (!currentStep) {
    return {
      world: targetWorld,
      boss: bossStep,
      bossInsight,
      prepInsight: bossInsight,
      score: 100,
      label: "Primed",
      helping: ["The active route is already cleared through the final gate.", `${bossStep.name} is fully banked in the current save.`],
      blockers: [],
    };
  }

  const feederTotal = Math.max(1, targetWorld.levels.length - 1);
  const clearedFeeders = targetWorld.levels.filter((step) => step.number < bossStep.number && step.number <= state.mainCleared).length;
  const foundationMastery = average(unlockedWorldInsights.map((insight) => insight.masteryScore));
  const recentWorldSessions = state.trainingLog.filter((entry) => {
    const step = worldInsights.find((insight) => insight.step.metaKey === entry.metaKey);
    const ageInDays = getAgeInDays(entry.at);
    return Boolean(step) && ageInDays != null && ageInDays <= 10;
  }).length;
  const leakPenalty = trainingEngine.activeSignals.reduce((total, signal, index) => {
    const weight = index === 0 ? 10 : index === 1 ? 6 : 3;
    return total + (bossInsight?.affinities[signal.id] || 0) * weight;
  }, 0);
  const stalePenalty = worldInsights.filter((insight) => insight.cleared && insight.freshness.stale).length * 4;
  const gatePenalty = currentInsight && currentInsight.masteryScore < 55 ? (55 - currentInsight.masteryScore) * 0.35 : 0;
  const score = clamp(Math.round(
    16
      + (clearedFeeders / feederTotal) * 32
      + foundationMastery * 0.24
      + (currentInsight?.masteryScore || 0) * 0.16
      + Math.min(12, recentWorldSessions * 3)
      - leakPenalty
      - stalePenalty
      - gatePenalty
  ), 0, 100);

  const helping = [];
  if (clearedFeeders > 0) {
    helping.push(`${clearedFeeders} of ${feederTotal} feeder stage${feederTotal === 1 ? "" : "s"} are already cleared.`);
  }
  if (foundationMastery >= 55) {
    helping.push(`The world floor is averaging ${Math.round(foundationMastery)} mastery.`);
  }
  if (recentWorldSessions > 0) {
    helping.push(`${recentWorldSessions} recent session${recentWorldSessions === 1 ? "" : "s"} were logged inside this boss arc.`);
  }

  const blockers = [];
  if (trainingEngine.primarySignal && (bossInsight?.affinities[trainingEngine.primarySignal.id] || 0) > 0.6) {
    blockers.push(`${trainingEngine.primarySignal.label} overlaps with what ${bossStep.name} asks from you.`);
  }
  if (currentInsight && currentInsight.masteryScore < 55) {
    blockers.push(`${currentInsight.step.name} is only at ${currentInsight.tier.label.toLowerCase()} mastery right now.`);
  }
  const staleWorldClears = worldInsights.filter((insight) => insight.cleared && insight.freshness.stale).length;
  if (staleWorldClears > 0) {
    blockers.push(`${staleWorldClears} earlier clear${staleWorldClears === 1 ? "" : "s"} in this world are going cold.`);
  }
  if (!recentWorldSessions) {
    blockers.push("No recent world reps are in the log yet.");
  }

  const prepCandidates = unlockedWorldInsights
    .filter((insight) => insight.step.metaKey !== bossStep.metaKey)
    .sort((left, right) => scoreBossSupport(right, bossInsight, targetWorld.id) - scoreBossSupport(left, bossInsight, targetWorld.id));
  const prepInsight = pickDistinctInsight(prepCandidates, excludedKeys) || currentInsight || bossInsight;
  let label = "Window Closed";
  if (score >= 90) {
    label = "Primed";
  } else if (score >= 75) {
    label = "Ready";
  } else if (score >= 60) {
    label = "Approaching";
  } else if (score >= 40) {
    label = "Building";
  }

  return {
    world: targetWorld,
    boss: bossStep,
    bossInsight,
    prepInsight,
    score,
    label,
    helping: helping.length ? helping : ["The next boss gate is still mostly unbuilt."],
    blockers: blockers.length ? blockers : ["No major blockers are standing out from the current log."],
  };
}

const DIFFICULTY_TIER_ORDER = {
  Easy: 1,
  Normal: 2,
  Hard: 3,
  Harder: 4,
  Insane: 5,
  "Easy Demon": 6,
  "Medium Demon": 7,
  "Hard Demon": 8,
  "Insane Demon": 9,
  "Extreme Demon": 10,
};

function getDifficultyTierValue(step) {
  return DIFFICULTY_TIER_ORDER[step?.difficulty] || 1;
}

function getStepProgressOrdinal(step) {
  if (!step) {
    return 0;
  }
  if (typeof step.number === "number") {
    return step.number;
  }
  const world = routeData.preparedWorlds[step.worldIndex];
  if (!world) {
    return 0;
  }
  return Math.round((world.startIndex + world.endIndex) / 2);
}

function getProgressAnchorStep() {
  return getCurrentStep() || routeData.allMain[routeData.allMain.length - 1] || null;
}

function isStepTooFarBelowAnchor(step, anchorStep) {
  if (!step || !anchorStep) {
    return false;
  }

  const stepOrdinal = getStepProgressOrdinal(step);
  const anchorOrdinal = getStepProgressOrdinal(anchorStep);
  const worldDistance = Math.abs((step.worldIndex || 0) - (anchorStep.worldIndex || 0));
  const difficultyDistance = Math.abs(getDifficultyTierValue(step) - getDifficultyTierValue(anchorStep));
  let maxBacktrack = 30;
  if (anchorOrdinal >= 70) {
    maxBacktrack = 20;
  }
  if (anchorOrdinal >= 110) {
    maxBacktrack = 14;
  }
  if (anchorOrdinal >= 140) {
    maxBacktrack = 10;
  }

  return stepOrdinal < anchorOrdinal - maxBacktrack && worldDistance > 1 && difficultyDistance > 1;
}

function getProgressionRelevanceScore(step, anchorStep, options = {}) {
  if (!step || !anchorStep) {
    return 0;
  }

  const {
    preferRecent = true,
    allowBonusBias = true,
    preferSameWorld = true,
  } = options;
  const stepOrdinal = getStepProgressOrdinal(step);
  const anchorOrdinal = getStepProgressOrdinal(anchorStep);
  const numberDistance = Math.abs(stepOrdinal - anchorOrdinal);
  const worldDistance = Math.abs((step.worldIndex || 0) - (anchorStep.worldIndex || 0));
  const difficultyDistance = Math.abs(getDifficultyTierValue(step) - getDifficultyTierValue(anchorStep));
  const isBonus = typeof step.number !== "number";

  let score = 0;
  if (preferSameWorld) {
    score += worldDistance === 0 ? 16 : worldDistance === 1 ? 8 : worldDistance === 2 ? 0 : -12;
  } else {
    score += worldDistance === 0 ? 10 : worldDistance === 1 ? 4 : -6;
  }
  score -= difficultyDistance * 5;
  score -= Math.max(0, numberDistance - 8) * 0.42;
  if (preferRecent) {
    score += stepOrdinal >= anchorOrdinal - 8 ? 8 : stepOrdinal >= anchorOrdinal - 16 ? 2 : -6;
  }
  if (isBonus && allowBonusBias && worldDistance <= 1) {
    score += 4;
  }
  if (isStepTooFarBelowAnchor(step, anchorStep)) {
    score -= 42;
  }

  return score;
}

function isRecommendationBandStep(step, anchorStep, options = {}) {
  if (!step || !anchorStep) {
    return true;
  }
  if (!isStepTooFarBelowAnchor(step, anchorStep)) {
    return true;
  }
  return getProgressionRelevanceScore(step, anchorStep, options) >= -10;
}

function filterRecommendationBand(candidates, getStep, anchorStep, options = {}) {
  if (!anchorStep || !Array.isArray(candidates) || !candidates.length) {
    return candidates;
  }

  const filtered = candidates.filter((candidate) => isRecommendationBandStep(getStep(candidate), anchorStep, options));
  return filtered.length ? filtered : candidates;
}

function scoreWarmupCandidate(candidate, pushInsight) {
  const candidateStep = candidate?.step;
  const pushStep = pushInsight?.step;
  if (!candidateStep || !pushStep) {
    return -999;
  }

  const candidateNumber = typeof candidateStep.number === "number" ? candidateStep.number : pushStep.number || 0;
  const pushNumber = typeof pushStep.number === "number" ? pushStep.number : candidateNumber;
  const worldDistance = Math.abs((candidateStep.worldIndex || 0) - (pushStep.worldIndex || 0));
  const numberDistance = Math.abs(candidateNumber - pushNumber);
  const difficultyDistance = Math.abs(getDifficultyTierValue(candidateStep) - getDifficultyTierValue(pushStep));
  const candidateStatus = getStepDisplayStatus(candidateStep);
  const sameWorld = candidateStep.worldId === pushStep.worldId;
  const sameBand = worldDistance <= 1 && difficultyDistance <= 1;
  const isBonus = typeof candidateStep.number !== "number";

  let score = 0;
  score += candidate.cleared ? 20 : candidate.status === "consistent" ? 14 : 8;
  score += Math.max(0, 22 - Math.abs(candidate.masteryScore - 62) * 0.38);
  score += candidate.freshness.score * 0.08;
  score += sameWorld ? 26 : worldDistance === 1 ? 14 : worldDistance === 2 ? 4 : -18;
  score += sameBand ? 10 : 0;
  score -= Math.max(0, numberDistance - 8) * 0.55;
  score -= difficultyDistance * 8;

  if (pushNumber >= 35) {
    score -= candidateNumber < Math.max(1, pushNumber - 28) ? 24 : 0;
  }
  if (pushNumber >= 70) {
    score -= candidateNumber < Math.max(1, pushNumber - 20) ? 30 : 0;
  }
  if (pushNumber >= 110) {
    score -= candidateNumber < Math.max(1, pushNumber - 14) ? 38 : 0;
  }
  if (pushNumber >= 140) {
    score -= candidateNumber < Math.max(1, pushNumber - 10) ? 44 : 0;
  }

  if (candidateStep.isBoss) {
    score -= 8;
  }
  if (candidateStatus === "revisit") {
    score -= 5;
  }
  if (candidateStatus === "practicing") {
    score -= 4;
  }
  if (isBonus && worldDistance <= 1) {
    score += 4;
  }

  return score;
}

function buildSessionPlan(mode, pushQuest, weaknessQuest, reclaimQuest, insightByMetaKey) {
  const excludedWarmupKeys = new Set(
    [pushQuest?.target?.metaKey, weaknessQuest?.target?.metaKey, reclaimQuest?.target?.metaKey].filter(Boolean),
  );
  const pushInsight = insightByMetaKey.get(pushQuest?.target?.metaKey)
    || insightByMetaKey.get(weaknessQuest?.target?.metaKey)
    || Array.from(insightByMetaKey.values()).find((insight) => insight.unlocked)
    || null;
  const warmupCandidates = Array.from(insightByMetaKey.values())
    .filter((insight) => insight.unlocked && (insight.cleared || insight.status === "consistent" || insight.status === "practicing"))
    .sort((left, right) => {
      const leftScore = scoreWarmupCandidate(left, pushInsight);
      const rightScore = scoreWarmupCandidate(right, pushInsight);
      return rightScore - leftScore;
    });
  const warmupInsight = pickDistinctInsight(warmupCandidates, excludedWarmupKeys)
    || insightByMetaKey.get(pushQuest?.target?.metaKey)
    || Array.from(insightByMetaKey.values())[0]
    || null;
  const resolvedPushInsight = insightByMetaKey.get(pushQuest?.target?.metaKey) || warmupInsight;
  const repairInsight = insightByMetaKey.get(weaknessQuest?.target?.metaKey) || pushInsight;
  const reclaimInsight = insightByMetaKey.get(reclaimQuest?.target?.metaKey) || repairInsight;

  return {
    mode,
    blocks: [
      {
        id: "warmup",
        label: "Warmup",
        minutes: mode.blocks.warmup,
        insight: warmupInsight,
        copy: warmupInsight
          ? `Open with ${warmupInsight.step.name} so inputs settle before the route gate.`
          : "Use a comfortable clear to settle inputs.",
      },
      {
        id: "push",
        label: "Main Push",
        minutes: mode.blocks.push,
        insight: resolvedPushInsight,
        copy: pushQuest?.goal || "Put the longest block into the live route gate.",
      },
      {
        id: "repair",
        label: "Weakness Repair",
        minutes: mode.blocks.repair,
        insight: repairInsight,
        copy: weaknessQuest?.goal || "Patch the loudest leak with a focused drill block.",
      },
      {
        id: "reclaim",
        label: "Consistency Reclaim",
        minutes: mode.blocks.reclaim,
        insight: reclaimInsight,
        copy: reclaimQuest?.goal || "Finish on a reclaim to keep old progress from going cold.",
      },
    ],
  };
}

function buildCoachEngine() {
  const todayKey = getLocalDayKey();
  const completedQuestMap = new Map(state.coach.completedQuests.map((entry) => [entry.id, entry]));
  const insights = getAllRouteSteps().map((step) => buildMasteryInsight(step));
  const insightByMetaKey = new Map(insights.map((insight) => [insight.step.metaKey, insight]));
  const currentStep = getCurrentStep() || routeData.allMain[routeData.allMain.length - 1] || null;
  const currentInsight = currentStep ? insightByMetaKey.get(currentStep.metaKey) || null : null;
  const activeWorld = currentStep ? getCurrentWorld() : routeData.preparedWorlds[routeData.preparedWorlds.length - 1];
  const anchorStep = currentStep || getProgressAnchorStep();

  const pushTarget = currentStep || routeData.allMain[routeData.allMain.length - 1];
  const pushProgress = buildQuestProgress(pushTarget?.metaKey, todayKey, (session) => ["progress", "stable", "clear"].includes(session.result), "1 solid push session");
  const pushQuest = pushTarget ? {
    id: `quest-${todayKey}-push-${pushTarget.metaKey}`,
    type: "push",
    label: "Today's Push",
    shortLabel: "Push",
    xp: 40,
    goal: currentInsight?.bestPercent != null && currentInsight.bestPercent >= 90
      ? "Close the run or bank one late stable rep."
      : currentInsight?.bestPercent != null && currentInsight.bestPercent >= 70
        ? "Extend the best and stabilize the closeout."
        : "Get real attempts on the live gate.",
    target: pushTarget,
    targetInsight: currentInsight,
    reason: currentInsight?.bestPercent != null
      ? `${pushTarget.name} is the live route gate with ${currentInsight.bestPercent}% already on file.`
      : `${pushTarget.name} is the live route gate, so this is still the cleanest place to spend your main block.`,
    criteriaMet: pushProgress.criteriaMet,
    progressText: pushProgress.label,
  } : null;

  const excludedKeys = new Set(pushQuest?.target?.metaKey ? [pushQuest.target.metaKey] : []);
  const primarySignal = trainingEngine.primarySignal;
  const weaknessCandidates = filterRecommendationBand(
    insights
    .filter((insight) => insight.unlocked)
    .sort((left, right) => right.repairWeight - left.repairWeight),
    (insight) => insight.step,
    anchorStep,
    { preferRecent: true, allowBonusBias: true },
  );
  const weaknessInsight = pickDistinctInsight(
    primarySignal
      ? weaknessCandidates.filter((insight) => (insight.affinities[primarySignal.id] || 0) > 0.35 || (insight.aggregate.issueScores[primarySignal.id] || 0) > 0.8)
      : weaknessCandidates,
    excludedKeys,
  ) || currentInsight;
  if (weaknessInsight?.step?.metaKey) {
    excludedKeys.add(weaknessInsight.step.metaKey);
  }
  const weaknessProgress = weaknessInsight
    ? buildQuestProgress(
      weaknessInsight.step.metaKey,
      todayKey,
      (session) => {
        if (primarySignal?.id && session.issues.includes(primarySignal.id)) {
          return true;
        }
        return ["progress", "stable", "clear"].includes(session.result);
      },
      primarySignal ? `1 ${primarySignal.shortLabel.toLowerCase()} repair rep` : "1 focused drill rep",
    )
    : null;
  const weaknessQuest = weaknessInsight ? {
    id: `quest-${todayKey}-repair-${weaknessInsight.step.metaKey}`,
    type: "repair",
    label: "Weakness Repair",
    shortLabel: "Repair",
    xp: 30,
    goal: primarySignal
      ? `Log one focused ${primarySignal.shortLabel.toLowerCase()} repair block.`
      : "Log one focused repair block.",
    target: weaknessInsight.step,
    targetInsight: weaknessInsight,
    reason: primarySignal
      ? `${primarySignal.label} is the loudest leak, and ${weaknessInsight.step.name} is the best live rep for it.`
      : `${weaknessInsight.step.name} is the best live level for sharpening the current route without drifting off-course.`,
    criteriaMet: weaknessProgress?.criteriaMet || false,
    progressText: weaknessProgress?.label || "Needs one repair rep",
  } : null;

  const reclaimCandidates = filterRecommendationBand(
    insights
    .filter((insight) => insight.unlocked && insight.reclaimWeight > -900)
    .sort((left, right) => right.reclaimWeight - left.reclaimWeight),
    (insight) => insight.step,
    anchorStep,
    { preferRecent: true, allowBonusBias: false },
  );
  const reclaimInsight = pickDistinctInsight(reclaimCandidates, excludedKeys)
    || insights.find((insight) => insight.cleared && insight.unlocked)
    || currentInsight;
  if (reclaimInsight?.step?.metaKey) {
    excludedKeys.add(reclaimInsight.step.metaKey);
  }
  const reclaimProgress = reclaimInsight
    ? buildQuestProgress(reclaimInsight.step.metaKey, todayKey, (session) => ["stable", "clear"].includes(session.result), "1 stable reclaim rep")
    : null;
  const reclaimQuest = reclaimInsight ? {
    id: `quest-${todayKey}-reclaim-${reclaimInsight.step.metaKey}`,
    type: "reclaim",
    label: "Consistency Reclaim",
    shortLabel: "Reclaim",
    xp: 26,
    goal: reclaimInsight.cleared
      ? "Bank one stable revisit so the clear stays fresh."
      : "Bank one stable rep on the near-clear.",
    target: reclaimInsight.step,
    targetInsight: reclaimInsight,
    reason: reclaimInsight.status === "revisit"
      ? `${reclaimInsight.step.name} is already flagged for revisit and its mastery is slipping.`
      : reclaimInsight.freshness.daysAgo != null
        ? `${reclaimInsight.step.name} has gone ${reclaimInsight.freshness.daysAgo} days without a reclaim rep.`
        : `${reclaimInsight.step.name} is close enough to matter, but not stable enough to leave alone.`,
    criteriaMet: reclaimProgress?.criteriaMet || false,
    progressText: reclaimProgress?.label || "Needs one stable reclaim rep",
  } : null;

  const bossReadiness = buildBossReadiness(insightByMetaKey, excludedKeys);
  const bossTargetInsight = bossReadiness.prepInsight || bossReadiness.bossInsight;
  const bossProgress = bossTargetInsight
    ? buildQuestProgress(bossTargetInsight.step.metaKey, todayKey, (session) => ["progress", "stable", "clear"].includes(session.result), "1 boss-lane prep rep")
    : null;
  const bossQuest = bossTargetInsight ? {
    id: `quest-${todayKey}-boss-${bossTargetInsight.step.metaKey}`,
    type: "boss",
    label: "Boss Readiness",
    shortLabel: "Boss",
    xp: 34,
    goal: `Log one prep block tied to ${bossReadiness.boss.name}.`,
    target: bossTargetInsight.step,
    targetInsight: bossTargetInsight,
    reason: bossTargetInsight.step.metaKey === bossReadiness.boss.metaKey
      ? `${bossReadiness.boss.name} is the next world boss, so at least one direct prep rep should land today.`
      : `${bossReadiness.boss.name} is the next boss gate, and ${bossTargetInsight.step.name} is the closest live prep level for it.`,
    criteriaMet: bossProgress?.criteriaMet || false,
    progressText: bossProgress?.label || "Needs one boss-lane prep rep",
  } : null;

  const quests = [pushQuest, weaknessQuest, reclaimQuest, bossQuest]
    .filter(Boolean)
    .map((quest) => {
      const completedEntry = completedQuestMap.get(quest.id) || null;
      const complete = Boolean(completedEntry || quest.criteriaMet);
      return {
        ...quest,
        completedEntry,
        complete,
        stateLabel: complete ? "Complete" : "Live",
        rewardLabel: `+${quest.xp} XP`,
      };
    });

  const sessionMode = SESSION_MODES.find((mode) => mode.id === normalizeSessionMode(state.coach.sessionMode)) || SESSION_MODES[1];
  const sessionPlan = buildSessionPlan(sessionMode, pushQuest, weaknessQuest, reclaimQuest, insightByMetaKey);
  const todaySessions = state.trainingLog.filter((entry) => getLocalDayKey(entry.at) === todayKey);
  const todayQuestXp = state.coach.completedQuests
    .filter((entry) => getLocalDayKey(entry.at) === todayKey)
    .reduce((total, entry) => total + entry.xp, 0);
  const totalQuestXp = state.coach.completedQuests.reduce((total, entry) => total + entry.xp, 0);
  const clearXp = state.mainCleared * 28 + getBonusClearsCount() * 18;
  const sessionXp = state.trainingLog.length * 10;
  const totalXp = clearXp + sessionXp + totalQuestXp;
  const level = Math.floor(totalXp / 180) + 1;
  const levelFloor = (level - 1) * 180;
  const nextLevelAt = level * 180;
  const questCompleteCount = quests.filter((quest) => quest.complete).length;
  const masteryHighlights = Array.from(new Set([
    pushQuest?.target?.metaKey,
    weaknessQuest?.target?.metaKey,
    reclaimQuest?.target?.metaKey,
    bossReadiness.boss?.metaKey,
    bossReadiness.prepInsight?.step?.metaKey,
  ].filter(Boolean))).map((metaKey) => insightByMetaKey.get(metaKey)).filter(Boolean);

  if (masteryHighlights.length < 4) {
    filterRecommendationBand(
      insights
      .filter((insight) => insight.unlocked && !masteryHighlights.some((entry) => entry.step.metaKey === insight.step.metaKey))
      .sort((left, right) => right.reclaimWeight - left.reclaimWeight || right.masteryScore - left.masteryScore)
      ,
      (insight) => insight.step,
      anchorStep,
      { preferRecent: true, allowBonusBias: true },
    )
      .slice(0, 4 - masteryHighlights.length)
      .forEach((insight) => masteryHighlights.push(insight));
  }

  const rewardMetrics = {
    totalXp,
    level,
    xpIntoLevel: totalXp - levelFloor,
    xpForNext: nextLevelAt - levelFloor,
    todayXp: todaySessions.length * 10 + todaySessions.filter((entry) => entry.result === "clear").length * 18 + todayQuestXp,
    trainingStreak: getTrainingDayStreak(),
    questCount: state.coach.completedQuests.length,
    lockedInCount: insights.filter((insight) => insight.unlocked && insight.masteryScore >= 65).length,
    masteredCount: insights.filter((insight) => insight.unlocked && insight.masteryScore >= 82).length,
    readinessScore: bossReadiness.score,
  };

  const badges = COACH_BADGES.map((badge) => ({
    ...badge,
    earned: badge.isEarned(rewardMetrics),
    progressLabel: badge.progress(rewardMetrics),
  }));

  const summary = currentInsight
    ? `${pushQuest?.target?.name || currentInsight.step.name} is the main push. ${weaknessQuest?.target?.name || "A repair rep"} patches the loudest leak, and ${reclaimQuest?.target?.name || "an older clear"} keeps your route floor from rusting.`
    : "The route is clear, so the daily loop is now about keeping mastery fresh and cycling boss-ready reps.";

  return {
    todayKey,
    summary,
    activeWorld,
    insights,
    insightByMetaKey,
    currentInsight,
    quests,
    sessionPlan,
    bossReadiness,
    rewards: rewardMetrics,
    badges,
    masteryHighlights,
  };
}

function buildSkillMapEngine() {
  const allSteps = getAllRouteSteps();
  const dnaByStepKey = new Map();
  const dnaByMetaKey = new Map();
  const routeCoverageTotals = createSkillVector(0);
  const liveCoverageTotals = createSkillVector(0);
  const exposureTotals = createSkillVector(0);
  const masteryTotals = createSkillVector(0);
  const masteryWeights = createSkillVector(0);
  const positiveSessionTotals = createSkillVector(0);
  const pressureTotals = createSkillVector(0);
  let routeWeightTotal = 0;
  let liveWeightTotal = 0;
  const currentStep = getCurrentStep() || coachEngine?.bossReadiness?.prepInsight?.step || routeData.allMain[routeData.allMain.length - 1] || null;
  const currentWorld = currentStep ? routeData.preparedWorlds[currentStep.worldIndex] : getCurrentWorld();

  const getStepWeight = (step) => (typeof step.number === "number" ? 1 : 0.72);
  const getExposureWeight = (status) => {
    switch (status) {
      case "cleared":
        return 1.08;
      case "revisit":
        return 1;
      case "consistent":
        return 0.94;
      case "practicing":
        return 0.82;
      case "ready":
        return 0.56;
      case "optional":
        return 0.38;
      default:
        return 0;
    }
  };
  const addCoverage = (target, vector, multiplier = 1) => {
    SKILL_MAP_META.forEach((skill) => {
      addSkillWeight(target, skill.id, (vector?.[skill.id] || 0) * multiplier);
    });
  };
  const getSharedHighlights = (leftDna, rightDna, limit = 2) => {
    const shared = createSkillVector(0);
    SKILL_MAP_META.forEach((skill) => {
      shared[skill.id] = Math.min(leftDna?.shares?.[skill.id] || 0, rightDna?.shares?.[skill.id] || 0);
    });
    return getTopSkillHighlights(shared, limit, 3);
  };
  const formatSkillList = (entries, limit = 2) => {
    return joinWithAnd(entries.slice(0, limit).map((entry) => entry.label.toLowerCase()));
  };

  allSteps.forEach((step) => {
    const stepKey = getStepRouteKey(step);
    const dna = buildRouteDna(step);
    const status = getStepDisplayStatus(step);
    const insight = coachEngine?.insightByMetaKey?.get(step.metaKey) || null;
    const stepWeight = getStepWeight(step);
    const touched = status !== "locked"
      || state.trainingLog.some((session) => session.metaKey === step.metaKey)
      || Boolean(state.levelNotes[stepKey]);

    dnaByStepKey.set(stepKey, dna);
    if (!dnaByMetaKey.has(step.metaKey)) {
      dnaByMetaKey.set(step.metaKey, dna);
    }

    addCoverage(routeCoverageTotals, dna.shares, stepWeight);
    routeWeightTotal += stepWeight;

    if (status !== "locked") {
      addCoverage(liveCoverageTotals, dna.shares, stepWeight);
      liveWeightTotal += stepWeight;
    }

    if (touched) {
      addCoverage(exposureTotals, dna.shares, getExposureWeight(status) * stepWeight);
    }
    if (insight && touched) {
      SKILL_MAP_META.forEach((skill) => {
        const contribution = (dna.shares[skill.id] || 0) * stepWeight;
        masteryTotals[skill.id] += contribution * insight.masteryScore;
        masteryWeights[skill.id] += contribution;
      });
    }
  });

  state.trainingLog.forEach((session) => {
    const dna = dnaByMetaKey.get(session.metaKey);
    if (!dna) {
      return;
    }

    const baseExposure = session.result === "clear"
      ? 0.34
      : session.result === "stable"
        ? 0.24
        : session.result === "progress"
          ? 0.16
          : 0.1;
    addCoverage(exposureTotals, dna.shares, baseExposure);

    if (["stable", "clear"].includes(session.result)) {
      addCoverage(positiveSessionTotals, dna.shares, session.result === "clear" ? 0.28 : 0.18);
    } else if (session.result === "rough") {
      addCoverage(pressureTotals, dna.shares, 0.08);
    }

    session.issues.forEach((signalId) => {
      addSkillWeights(pressureTotals, TRAINING_SIGNAL_TO_SKILLS[signalId], signalId === "ending" ? 1.18 : 0.92);
    });

    if (session.failPoint === "ending" && session.result !== "clear") {
      addSkillWeights(pressureTotals, { nerve: 1.05, endurance: 0.85, consistency: 0.34 });
    } else if (session.failPoint === "opening" && session.result === "rough") {
      addSkillWeights(pressureTotals, { timings: 0.44, wave: 0.36, consistency: 0.2 });
    } else if (session.failPoint === "mid" && session.result === "rough") {
      addSkillWeights(pressureTotals, { timings: 0.52, consistency: 0.26 });
    }
  });

  Object.entries(state.levelNotes).forEach(([levelKey, note]) => {
    if (!note.trim()) {
      return;
    }
    inferTrainingSignalsFromText(note).forEach((signalId) => {
      addSkillWeights(pressureTotals, TRAINING_SIGNAL_TO_SKILLS[signalId], 0.26);
    });
  });

  const routeDemand = divideSkillVector(routeCoverageTotals, Math.max(routeWeightTotal, 1));
  const liveDemand = divideSkillVector(liveCoverageTotals, Math.max(liveWeightTotal, 1));
  const routeDemandDisplay = getRelativeSkillDisplay(routeDemand);
  const liveDemandDisplay = getRelativeSkillDisplay(liveDemand);
  const exposureDisplay = getRelativeSkillDisplay(exposureTotals);

  const entries = SKILL_MAP_META.map((skill) => {
    const masteryBase = masteryWeights[skill.id]
      ? masteryTotals[skill.id] / masteryWeights[skill.id]
      : 18 + exposureDisplay[skill.id] * 0.22;
    const confidence = clamp(positiveSessionTotals[skill.id] * 22, 0, 16);
    const pressure = clamp(pressureTotals[skill.id] * 8.2, 0, 26);
    const score = clamp(
      Math.round(masteryBase * 0.74 + exposureDisplay[skill.id] * 0.14 + confidence - pressure * 0.68),
      8,
      98,
    );
    const neglect = clamp(
      Math.round(liveDemandDisplay[skill.id] * 0.82 - exposureDisplay[skill.id] + pressure * 0.84),
      0,
      100,
    );

    return {
      ...skill,
      score,
      exposure: exposureDisplay[skill.id],
      routeDemand: routeDemandDisplay[skill.id],
      liveDemand: liveDemandDisplay[skill.id],
      routeShare: roundTo(routeDemand[skill.id], 1),
      liveShare: roundTo(liveDemand[skill.id], 1),
      neglect,
      pressure: roundTo(pressure, 1),
      confidence: roundTo(confidence, 1),
      delta: Math.round(liveDemandDisplay[skill.id] - score),
      statusLabel: score >= 78 ? "Sharp" : score >= 60 ? "Stable" : score >= 42 ? "Building" : "Thin",
    };
  });

  const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
  const strongest = [...entries].sort((left, right) => right.score - left.score)[0];
  const weakest = [...entries].sort((left, right) => left.score - right.score)[0];
  const mostNeglected = [...entries].sort((left, right) => right.neglect - left.neglect)[0];
  const spread = strongest.score - weakest.score;
  const averageScore = average(entries.map((entry) => entry.score));
  const identityTitle = spread <= 12 && averageScore >= 42 ? "balanced player" : strongest.identityLabel;
  const signalGapLabel = trainingEngine?.primarySignal
    ? ({
      wave: "wave inconsistency",
      chokepoint: "unstable chokepoints",
      stamina: "thin endurance floor",
      nerve: "late-run nerves",
      ending: "weak endings",
    }[trainingEngine.primarySignal.id] || mostNeglected.gapLabel)
    : mostNeglected.neglect >= 14
      ? `low ${mostNeglected.label.toLowerCase()} exposure`
      : `low ${weakest.label.toLowerCase()} consistency`;
  const identity = {
    title: identityTitle,
    summary: `${identityTitle} with ${signalGapLabel}.`,
    subline: `${strongest.label} is the sharpest lane right now. ${mostNeglected.label} is the least-built part of the live route.`,
    strongest,
    weakest,
    neglected: mostNeglected,
  };

  const worldRows = routeData.preparedWorlds.map((world) => {
    const mainCoverageTotals = createSkillVector(0);
    const branchCoverageTotals = createSkillVector(0);
    let mainWeight = 0;
    let branchWeight = 0;

    world.levels.forEach((step) => {
      addCoverage(mainCoverageTotals, dnaByStepKey.get(getStepRouteKey(step))?.shares, 1);
      mainWeight += 1;
    });
    world.bonusPacks.forEach((pack) => {
      pack.steps.forEach((step) => {
        addCoverage(branchCoverageTotals, dnaByStepKey.get(getStepRouteKey(step))?.shares, 0.72);
        branchWeight += 0.72;
      });
    });

    const coverage = divideSkillVector(mainCoverageTotals, Math.max(mainWeight, 1));
    const branchCoverage = divideSkillVector(branchCoverageTotals, Math.max(branchWeight || 1, 1));
    const display = getRelativeSkillDisplay(coverage);
    const highlights = getTopSkillHighlights(coverage, 3, 0.1);
    const dominant = highlights[0] || { ...SKILL_MAP_META[0], value: 0 };
    const alerts = [];
    if (byId[dominant.id]?.score <= 48 && display[dominant.id] >= 74) {
      alerts.push(`${dominant.label} climbs faster here than your current profile.`);
    }
    if (branchWeight && branchCoverage.memory > coverage.memory + 4 && byId.memory.neglect >= 12) {
      alerts.push("The bonus branch is the cleanest memory patch in this world.");
    }
    if (!alerts.length) {
      alerts.push(`${world.title} leans ${formatSkillList(highlights)}.`);
    }

    return {
      worldId: world.id,
      worldLabel: world.worldLabel,
      title: world.title,
      current: currentWorld?.id === world.id,
      dominant,
      highlights,
      coverage,
      display,
      branchCoverage,
      alerts,
    };
  });

  const worldMaxBySkill = createSkillVector(0);
  worldRows.forEach((row) => {
    SKILL_MAP_META.forEach((skill) => {
      worldMaxBySkill[skill.id] = Math.max(worldMaxBySkill[skill.id], row.coverage[skill.id] || 0);
    });
  });

  const currentDna = currentStep ? dnaByStepKey.get(getStepRouteKey(currentStep)) : null;
  const currentInsight = currentStep ? coachEngine?.insightByMetaKey?.get(currentStep.metaKey) || null : null;
  const currentReasons = [];
  const currentHighlights = currentDna?.highlights || [];
  const thinnestMatch = [...currentHighlights]
    .map((entry) => byId[entry.id])
    .sort((left, right) => right.neglect - left.neglect)[0];

  if (trainingEngine.primarySignal) {
    const signalCopy = TRAINING_SIGNAL_TO_SKILLS[trainingEngine.primarySignal.id] || {};
    const matchingSkillId = Object.keys(signalCopy)
      .sort((left, right) => (signalCopy[right] || 0) - (signalCopy[left] || 0))
      .find((skillId) => (currentDna?.shares?.[skillId] || 0) >= 15);
    if (matchingSkillId) {
      currentReasons.push(`Recent sessions are leaking ${trainingEngine.primarySignal.label.toLowerCase()}, and ${currentStep.name} directly trains ${getSkillMeta(matchingSkillId).label.toLowerCase()}.`);
    }
  }
  if (thinnestMatch && thinnestMatch.neglect >= 12) {
    currentReasons.push(`This is the cleanest ${thinnestMatch.label.toLowerCase()} repair pick still inside your main ladder.`);
  }
  if (currentStep && !currentStep.isBoss) {
    const bossStep = coachEngine?.bossReadiness?.boss || null;
    const bossDna = bossStep ? dnaByStepKey.get(getStepRouteKey(bossStep)) : null;
    const overlap = getSharedHighlights(currentDna, bossDna, 2);
    if (bossStep && overlap.length) {
      currentReasons.push(`It is a safer bridge before ${bossStep.name} because it shares ${formatSkillList(overlap)} without the full boss pressure.`);
    }
  }
  const overIndexed = [...entries].sort((left, right) => right.exposure - left.exposure);
  if (overIndexed[0].exposure - overIndexed[overIndexed.length - 1].exposure >= 18 && mostNeglected && currentDna?.shares?.[mostNeglected.id] >= 14) {
    currentReasons.push(`Your route currently over-indexes on ${overIndexed[0].label.toLowerCase()}, so this keeps ${mostNeglected.label.toLowerCase()} from falling behind.`);
  }
  if (!currentReasons.length && currentDna) {
    currentReasons.push(`${currentStep.name} keeps ${formatSkillList(currentDna.highlights)} in the route without drifting off the main climb.`);
  }

  const unlockedCandidates = allSteps
    .filter((step) => currentStep && getStepRouteKey(step) !== getStepRouteKey(currentStep))
    .filter((step) => isTrainingCandidateUnlocked(step))
    .filter((step) => isRecommendationBandStep(step, currentStep, { preferRecent: true, allowBonusBias: true }));

  const buildAlternate = (kind, label, candidate, tradeoff, emphasisSkillId = null) => {
    if (!candidate) {
      return null;
    }
    const candidateKey = getStepRouteKey(candidate);
    return {
      kind,
      label,
      step: candidate,
      dna: dnaByStepKey.get(candidateKey),
      insight: coachEngine?.insightByMetaKey?.get(candidate.metaKey) || null,
      emphasisSkillId,
      tradeoff,
    };
  };

  const usedAlternateKeys = new Set();
  const saferCandidate = [...unlockedCandidates]
    .filter((step) => {
      const insight = coachEngine?.insightByMetaKey?.get(step.metaKey) || null;
      return (insight?.masteryScore || 0) >= ((currentInsight?.masteryScore || 0) + 8)
        || ["cleared", "revisit", "consistent"].includes(getStepDisplayStatus(step));
    })
    .sort((left, right) => {
      const leftInsight = coachEngine?.insightByMetaKey?.get(left.metaKey) || null;
      const rightInsight = coachEngine?.insightByMetaKey?.get(right.metaKey) || null;
      const leftScore = getDnaSimilarity(dnaByStepKey.get(getStepRouteKey(left)), currentDna) + (leftInsight?.masteryScore || 0) * 0.75;
      const rightScore = getDnaSimilarity(dnaByStepKey.get(getStepRouteKey(right)), currentDna) + (rightInsight?.masteryScore || 0) * 0.75;
      return rightScore - leftScore;
    })[0] || null;
  if (saferCandidate) {
    usedAlternateKeys.add(getStepRouteKey(saferCandidate));
  }

  const repairSkill = mostNeglected?.id || weakest?.id || currentDna?.dominant?.id;
  const repairCandidate = [...unlockedCandidates]
    .filter((step) => !usedAlternateKeys.has(getStepRouteKey(step)))
    .sort((left, right) => {
      const leftDna = dnaByStepKey.get(getStepRouteKey(left));
      const rightDna = dnaByStepKey.get(getStepRouteKey(right));
      const leftInsight = coachEngine?.insightByMetaKey?.get(left.metaKey) || null;
      const rightInsight = coachEngine?.insightByMetaKey?.get(right.metaKey) || null;
      const leftScore = (leftDna?.display?.[repairSkill] || 0) * 1.3
        + (typeof left.number !== "number" ? 10 : 0)
        + (100 - (leftInsight?.masteryScore || 48)) * 0.24;
      const rightScore = (rightDna?.display?.[repairSkill] || 0) * 1.3
        + (typeof right.number !== "number" ? 10 : 0)
        + (100 - (rightInsight?.masteryScore || 48)) * 0.24;
      return rightScore - leftScore;
    })[0] || null;
  if (repairCandidate) {
    usedAlternateKeys.add(getStepRouteKey(repairCandidate));
  }

  const enduranceCandidate = [...unlockedCandidates]
    .filter((step) => !usedAlternateKeys.has(getStepRouteKey(step)))
    .filter((step) => ["Long", "XL"].includes(step.length) || (dnaByStepKey.get(getStepRouteKey(step))?.display?.endurance || 0) >= 60)
    .sort((left, right) => {
      const leftDna = dnaByStepKey.get(getStepRouteKey(left));
      const rightDna = dnaByStepKey.get(getStepRouteKey(right));
      const leftScore = (leftDna?.display?.endurance || 0) * 1.22 + (left.length === "XL" ? 18 : 10) + (leftDna?.display?.nerve || 0) * 0.38;
      const rightScore = (rightDna?.display?.endurance || 0) * 1.22 + (right.length === "XL" ? 18 : 10) + (rightDna?.display?.nerve || 0) * 0.38;
      return rightScore - leftScore;
    })[0] || null;

  const alternates = [
    buildAlternate(
      "safer",
      "Safer alternative",
      saferCandidate,
      saferCandidate
        ? `Similar ${formatSkillList(getSharedHighlights(currentDna, dnaByStepKey.get(getStepRouteKey(saferCandidate)), 2))} load, but your mastery is ${Math.max(0, (coachEngine?.insightByMetaKey?.get(saferCandidate.metaKey)?.masteryScore || 0) - (currentInsight?.masteryScore || 0))} points higher here.`
        : "",
    ),
    buildAlternate(
      "repair",
      `${getSkillMeta(repairSkill).label} alternative`,
      repairCandidate,
      repairCandidate
        ? `This is the cleanest off-main rep for ${getSkillMeta(repairSkill).label.toLowerCase()}. Slower route progress, but it patches the thinnest lane in your build.`
        : "",
      repairSkill,
    ),
    buildAlternate(
      "endurance",
      "Endurance alternative",
      enduranceCandidate,
      enduranceCandidate
        ? `Longer rep than ${currentStep?.name || "the main gate"}, built for late-run calm and better endings.`
        : "",
      "endurance",
    ),
  ].filter(Boolean);

  const alerts = [];
  if (currentDna?.dominant && byId[currentDna.dominant.id]?.score <= 46 && currentDna.display[currentDna.dominant.id] >= 74) {
    alerts.push({
      tone: "warning",
      title: `${currentDna.dominant.label} spike ahead`,
      body: `${currentStep.name} leans hard on ${currentDna.dominant.label.toLowerCase()}, but that lane is only at ${byId[currentDna.dominant.id].score}.`,
    });
  }
  if (byId.memory?.neglect >= 14) {
    alerts.push({
      tone: "warning",
      title: "Memory is lagging",
      body: "The live route has more memory asks than your current exposure bank. A memory side branch would smooth the climb.",
    });
  }
  if (byId.endurance?.exposure <= 38 && routeData.allMain.filter((step) => step.number > state.mainCleared && ["Long", "XL"].includes(step.length)).length >= 4) {
    alerts.push({
      tone: "warning",
      title: "Endurance floor is thin",
      body: "Several longer gates are still ahead, but recent reps are not building enough late-run stamina.",
    });
  }
  if (strongest.score - weakest.score >= 20 && mostNeglected.neglect >= 16) {
    alerts.push({
      tone: "info",
      title: "Route is narrowing",
      body: `You are much more built in ${strongest.label.toLowerCase()} than ${mostNeglected.label.toLowerCase()}, so optional branches matter more right now.`,
    });
  }
  if (!alerts.length) {
    alerts.push({
      tone: "good",
      title: "Coverage is holding",
      body: "The live route is staying relatively balanced. You can afford to keep pushing the main path without a forced detour.",
    });
  }

  const mainRecommendation = currentStep && currentDna
    ? {
      step: currentStep,
      dna: currentDna,
      insight: currentInsight,
      label: thinnestMatch ? `Best ${thinnestMatch.label.toLowerCase()} repair pick` : "Main route bridge",
      reason: currentReasons.join(" "),
      alternates,
    }
    : null;

  const levelIntelByStepKey = new Map();
  allSteps.forEach((step) => {
    const stepKey = getStepRouteKey(step);
    const dna = dnaByStepKey.get(stepKey);
    const world = routeData.preparedWorlds[step.worldIndex];
    const nextStep = typeof step.number === "number"
      ? world.levels.find((candidate) => candidate.localNumber === step.localNumber + 1)
      : null;
    let whyNow = `${step.name} mainly trains ${formatSkillList(dna.highlights)}.`;

    if (mainRecommendation && stepKey === getStepRouteKey(mainRecommendation.step)) {
      whyNow = mainRecommendation.reason;
    } else if (step.isBoss) {
      whyNow = `${step.name} is the ${world.worldLabel.toLowerCase()} boss gate, so the DNA stacks ${formatSkillList(dna.highlights)} under pressure.`;
    } else if (step.milestone) {
      whyNow = `${step.name} is a route checkpoint that banks ${formatSkillList(dna.highlights)} before the climb spikes again.`;
    } else if (nextStep) {
      const overlap = getSharedHighlights(dna, dnaByStepKey.get(getStepRouteKey(nextStep)), 2);
      whyNow = overlap.length >= 2
        ? `This bridges into ${nextStep.name} by preloading ${formatSkillList(overlap)}.`
        : `This widens the route with ${formatSkillList(dna.highlights)} before ${nextStep.name}.`;
    }

    levelIntelByStepKey.set(stepKey, {
      dna,
      whyNow,
      routeRole: step.isBoss ? "Boss lane" : step.milestone ? "Milestone bridge" : "Route slot",
    });
  });

  return {
    entries,
    byId,
    identity,
    routeDemand,
    liveDemand,
    routeDemandDisplay,
    liveDemandDisplay,
    exposureDisplay,
    worldRows,
    worldMaxBySkill,
    alerts,
    mainRecommendation,
    alternates,
    levelIntelByStepKey,
  };
}

function syncCompletedQuestRewards(quests) {
  const completedIds = new Set(state.coach.completedQuests.map((entry) => entry.id));
  let changed = false;

  quests.forEach((quest) => {
    if (!quest.criteriaMet || completedIds.has(quest.id)) {
      return;
    }
    changed = true;
    state.coach.completedQuests.unshift({
      id: quest.id,
      at: new Date().toISOString(),
      xp: quest.xp,
      label: quest.shortLabel,
    });
    completedIds.add(quest.id);
  });

  if (changed) {
    state.coach.completedQuests = state.coach.completedQuests.slice(0, QUEST_LOG_LIMIT);
  }
  return changed;
}

function refreshDerivedState(syncRewards = false) {
  trainingEngine = buildTrainingEngine();
  coachEngine = buildCoachEngine();
  if (syncRewards && syncCompletedQuestRewards(coachEngine.quests)) {
    coachEngine = buildCoachEngine();
  }
  skillEngine = buildSkillMapEngine();
}

function getFreshnessSummary() {
  const verifiedDate = new Date(VERIFIED_AT);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const ageInDays = Math.max(0, Math.floor((now - verifiedDate) / msPerDay));
  const isStale = ageInDays >= DATA_STALE_DAYS;
  return {
    ageInDays,
    isStale,
    label: isStale ? "Needs review" : "Current",
  };
}

function formatActivityTime(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, 2600);
}

function getSetupDialog() {
  return elements.setupOverlay.querySelector("[data-setup-dialog]");
}

function captureSetupScrollPosition() {
  if (!setupOpen || !(elements.setupOverlay instanceof HTMLElement)) {
    return null;
  }

  const dialog = getSetupDialog();
  return {
    overlayTop: elements.setupOverlay.scrollTop,
    dialogTop: dialog instanceof HTMLElement ? dialog.scrollTop : 0,
  };
}

function restoreSetupScrollPosition() {
  if (!pendingSetupScrollRestore || !setupOpen || !(elements.setupOverlay instanceof HTMLElement)) {
    pendingSetupScrollRestore = null;
    return;
  }

  const { overlayTop, dialogTop } = pendingSetupScrollRestore;
  pendingSetupScrollRestore = null;
  window.requestAnimationFrame(() => {
    elements.setupOverlay.scrollTop = overlayTop;
    const dialog = getSetupDialog();
    if (dialog instanceof HTMLElement) {
      dialog.scrollTop = dialogTop;
    }
  });
}

function syncSetupBodyLock() {
  if (setupOpen) {
    if (!document.body.classList.contains("body--setup-open")) {
      setupBodyScrollTop = window.scrollY;
      document.body.classList.add("body--setup-open");
      document.body.style.top = `-${setupBodyScrollTop}px`;
    }
    return;
  }

  if (!document.body.classList.contains("body--setup-open")) {
    return;
  }

  document.body.classList.remove("body--setup-open");
  document.body.style.top = "";
  window.scrollTo({ top: setupBodyScrollTop, left: 0, behavior: "auto" });
}

function getFocusableElements(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    if (!(element instanceof HTMLElement)) {
      return false;
    }
    if (element.hidden) {
      return false;
    }
    return element.offsetParent !== null || element === document.activeElement;
  });
}

function syncSetupFocus() {
  if (!setupOpen) {
    return;
  }

  const dialog = getSetupDialog();
  if (!(dialog instanceof HTMLElement)) {
    return;
  }

  if (document.activeElement instanceof HTMLElement && dialog.contains(document.activeElement)) {
    return;
  }

  const stepConfig = SETUP_STEPS[setupStep];
  const selectedValue = stepConfig.key === "theme" ? setupDraft.theme : setupDraft[stepConfig.key];
  const selectedOption = dialog.querySelector(
    `[data-action="setup-select"][data-field="${stepConfig.key}"][data-value="${selectedValue}"]`,
  );
  const fallback = selectedOption
    || dialog.querySelector('[data-action="setup-select"]')
    || dialog.querySelector('[data-action="setup-next"], [data-action="setup-finish"], [data-action="close-setup"]')
    || dialog;

  if (fallback instanceof HTMLElement) {
    fallback.focus({ preventScroll: true });
  }
}

function handleSetupKeydown(event) {
  if (!setupOpen) {
    return;
  }

  const dialog = getSetupDialog();
  if (!(dialog instanceof HTMLElement)) {
    return;
  }

  if (event.key === "Escape" && state.profile) {
    event.preventDefault();
    closeSetup();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusable = getFocusableElements(dialog);
  if (!focusable.length) {
    event.preventDefault();
    dialog.focus({ preventScroll: true });
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
}

function restoreRouteSearchFocus() {
  if (!shouldRefocusRouteSearch) {
    return;
  }

  shouldRefocusRouteSearch = false;
  const input = document.getElementById("route-search");
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  input.focus({ preventScroll: true });
  if (typeof routeSearchSelectionStart === "number" && typeof routeSearchSelectionEnd === "number") {
    input.setSelectionRange(routeSearchSelectionStart, routeSearchSelectionEnd);
  }
}

function jumpToElement(id) {
  const element = document.getElementById(id);
  if (element) {
    if (!element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", "-1");
    }
    element.focus({ preventScroll: true });
    element.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

function revealCurrentNodeAndScroll() {
  const currentWorld = getCurrentWorld();
  focusWorld(currentWorld.id);
  currentPage = "route";
  saveState();
  render();
  const currentStep = getCurrentStep();
  const targetId = currentStep ? currentStep.anchorId : routeData.preparedWorlds[routeData.preparedWorlds.length - 1].sectionId;
  window.requestAnimationFrame(() => {
    jumpToElement(targetId);
  });
}

function downloadSave() {
  const fileName = `gd-path-to-1-save-v${ROUTE_VERSION.replace(/\./g, "-")}.json`;
  saveState();
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Save exported.");
}

function importSaveFromText(text) {
  try {
    const raw = JSON.parse(text);
    pushUndoSnapshot();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    state = loadState();
    routeData = buildRouteData(state.profile || DEFAULT_PROFILE);
    currentPage = state.page || "overview";
    applyTheme(state.theme);
    setupOpen = !state.profile;
    resetSetupDraft();
    recordActivity("Imported a save file.");
    saveState();
    render();
    showToast(LEGACY_SAVE_VERSIONS.has(raw?.version) ? "Save imported." : "Profile imported. Route progress reset for the new ladder.");
  } catch (error) {
    showToast("Could not import that save file.");
  }
}

function clearMainLevel(stepNumber) {
  if (stepNumber !== state.mainCleared + 1) {
    return;
  }

  pushUndoSnapshot();
  const clearedStep = routeData.allMain[stepNumber - 1];
  const clearedWorld = routeData.preparedWorlds[clearedStep.worldIndex];
  state.mainCleared += 1;
  delete state.mainStepStatus[getMainLevelKey(stepNumber)];
  appendTrainingLogEntry(createTrainingLogEntry(clearedStep.metaKey, {
    result: "clear",
    failPoint: "clear",
    bestPercent: 100,
  }));
  focusWorld(getCurrentWorld().id);
  recordActivity(`Marked ${clearedStep.name} as cleared.`);
  saveState();
  render();

  if (state.mainCleared >= routeData.totalMain) {
    showToast("Campaign complete. You reached the current #1 route finish.");
    return;
  }

  const nextStep = getCurrentStep();
  const worldFinished = clearedStep.number === clearedWorld.endIndex;
  showToast(worldFinished ? `${clearedWorld.title} cleared. ${nextStep.name} unlocked.` : `${clearedStep.name} cleared. ${nextStep.name} unlocked.`);
  if (currentPage === "route") {
    window.requestAnimationFrame(() => {
      revealCurrentNodeAndScroll();
    });
  }
}

function setMainStepStatus(stepNumber, nextStatus) {
  const step = routeData.allMain[stepNumber - 1];
  if (!step) {
    return;
  }

  const isCurrent = step.number === state.mainCleared + 1;
  const isPast = step.number <= state.mainCleared;
  if (!isCurrent && !isPast) {
    return;
  }

  if (nextStatus === "cleared") {
    if (isCurrent) {
      clearMainLevel(stepNumber);
      return;
    }
    if (state.mainStepStatus[getMainLevelKey(step.number)] === "revisit") {
      pushUndoSnapshot();
      delete state.mainStepStatus[getMainLevelKey(step.number)];
      recordActivity(`Returned ${step.name} to cleared status.`);
      saveState();
      render();
      showToast(`${step.name} returned to cleared.`);
    }
    return;
  }

  if (isPast && nextStatus !== "revisit") {
    delete state.mainStepStatus[getMainLevelKey(step.number)];
  } else if (isPast && nextStatus === "revisit") {
    pushUndoSnapshot();
    state.mainStepStatus[getMainLevelKey(step.number)] = "revisit";
    recordActivity(`Flagged ${step.name} for revisit.`);
    saveState();
    render();
    showToast(`${step.name} flagged for revisit.`);
    return;
  } else if (isCurrent) {
    pushUndoSnapshot();
    if (nextStatus === "ready") {
      delete state.mainStepStatus[getMainLevelKey(step.number)];
    } else {
      state.mainStepStatus[getMainLevelKey(step.number)] = nextStatus;
    }
    recordActivity(`Updated ${step.name} to ${nextStatus}.`);
    saveState();
    render();
    showToast(`${step.name} set to ${nextStatus}.`);
    return;
  }

  saveState();
  render();
}

function toggleBonusLevel(stepId) {
  const bonusStepData = routeData.bonusSteps.find((step) => step.id === stepId);
  if (!bonusStepData) {
    return;
  }
  const world = routeData.preparedWorlds[bonusStepData.worldIndex];
  const pack = world.bonusPacks.find((entry) => entry.steps.some((step) => step.id === stepId));
  if (!pack || !isBonusUnlocked(pack)) {
    return;
  }

  setBonusStepStatus(stepId, state.bonusCleared[stepId] ? "optional" : "cleared");
}

function setBonusStepStatus(stepId, nextStatus) {
  const bonusStepData = routeData.bonusSteps.find((step) => step.id === stepId);
  if (!bonusStepData) {
    return;
  }

  const world = routeData.preparedWorlds[bonusStepData.worldIndex];
  const pack = world.bonusPacks.find((entry) => entry.steps.some((step) => step.id === stepId));
  if (!pack || !isBonusUnlocked(pack)) {
    return;
  }

  pushUndoSnapshot();
  if (nextStatus === "cleared") {
    state.bonusCleared[stepId] = true;
    delete state.bonusStepStatus[stepId];
    appendTrainingLogEntry(createTrainingLogEntry(bonusStepData.metaKey, {
      result: "clear",
      failPoint: "clear",
      bestPercent: 100,
    }));
  } else {
    delete state.bonusCleared[stepId];
    if (nextStatus === "optional") {
      delete state.bonusStepStatus[stepId];
    } else {
      state.bonusStepStatus[stepId] = nextStatus;
    }
  }

  recordActivity(`Updated bonus level ${bonusStepData.name} to ${nextStatus}.`);
  saveState();
  render();
  showToast(`${bonusStepData.name} set to ${nextStatus}.`);
}

function saveLevelNote(levelKey, text, label) {
  const normalized = text.trim();
  const previous = state.levelNotes[levelKey] || "";
  if (normalized === previous) {
    showToast("Note already saved.");
    return;
  }

  pushUndoSnapshot();
  if (normalized) {
    state.levelNotes[levelKey] = normalized.slice(0, 1200);
  } else {
    delete state.levelNotes[levelKey];
  }
  recordActivity(`${normalized ? "Saved" : "Cleared"} note for ${label}.`);
  saveState();
  render();
  showToast(normalized ? `Saved note for ${label}.` : `Cleared note for ${label}.`);
}

function logTrainingSession(metaKey, shell, label) {
  if (!shell) {
    return;
  }

  const entry = createTrainingLogEntry(metaKey, {
    attempts: shell.querySelector("[data-session-attempts]")?.value,
    bestPercent: shell.querySelector("[data-session-best]")?.value,
    result: shell.querySelector("[data-session-result]")?.value,
    failPoint: shell.querySelector("[data-session-fail-point]")?.value,
    issues: Array.from(shell.querySelectorAll("[data-session-issue]:checked")).map((input) => input.dataset.sessionIssue),
  });
  if (!entry) {
    showToast("Could not log that session.");
    return;
  }

  pushUndoSnapshot();
  appendTrainingLogEntry(entry);
  recordActivity(`Logged a training session for ${label}.`);
  saveState();
  render();
  showToast(`Training session saved for ${label}.`);
}

function toggleWorld(worldId) {
  const world = routeData.preparedWorlds.find((entry) => entry.id === worldId);
  if (!world) {
    return;
  }
  focusWorld(worldId);
  saveState();
  render();
}

function resetProgress() {
  if (!window.confirm("Reset campaign progress, notes, trackers, and training history for the current custom route?")) {
    return;
  }
  pushUndoSnapshot();
  const preservedSessionMode = state.coach.sessionMode;
  state.mainCleared = 0;
  state.bonusCleared = {};
  state.mainStepStatus = {};
  state.bonusStepStatus = {};
  state.levelNotes = {};
  state.trainingLog = [];
  state.coach = defaultCoachState({ sessionMode: preservedSessionMode });
  focusWorld(getDefaultSelectedWorldId(routeData.preparedWorlds, state.mainCleared));
  recordActivity("Reset route progress, notes, tracker states, and training history.");
  saveState();
  render();
  showToast("Progress reset.");
}

function renderMetaTag(text, className = "pill") {
  return `<span class="${className}">${escapeHtml(text)}</span>`;
}

function renderBadge(text, className = "badge") {
  return `<span class="${className}">${escapeHtml(text)}</span>`;
}

function renderLinkButton(url, label, className) {
  return `<a class="${className}" href="${url}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
}

function renderDisabledButton(label, className) {
  return `<button class="${className}" type="button" disabled>${escapeHtml(label)}</button>`;
}

function renderJumpButton(label, targetId, worldId, className = "world__jump") {
  return `<button class="${className}" type="button" data-action="jump-node" data-target-id="${targetId}" data-world-id="${worldId}">${escapeHtml(label)}</button>`;
}

function renderLocalJumpButton(label, targetId, className = "button button--ghost") {
  return `<button class="${className}" type="button" data-action="jump-node" data-target-id="${targetId}">${escapeHtml(label)}</button>`;
}

function buildRadarPoints(entries, accessor, radius = 118, center = 150) {
  return entries.map((entry, index) => {
    const angle = (-Math.PI / 2) + ((Math.PI * 2) * index) / entries.length;
    const value = clamp(accessor(entry), 0, 100) / 100;
    const nextRadius = radius * value;
    const x = center + Math.cos(angle) * nextRadius;
    const y = center + Math.sin(angle) * nextRadius;
    return `${roundTo(x, 1)},${roundTo(y, 1)}`;
  }).join(" ");
}

function renderSkillRadar() {
  const entries = skillEngine.entries;
  const center = 150;
  const radius = 118;
  const playerPoints = buildRadarPoints(entries, (entry) => entry.score, radius, center);
  const routePoints = buildRadarPoints(entries, (entry) => entry.liveDemand, radius, center);
  const rings = [20, 40, 60, 80, 100];

  return `
    <svg class="skill-radar" viewBox="0 0 300 300" role="img" aria-label="Radar chart comparing player strength and live route demand across eight skill categories.">
      <defs>
        <linearGradient id="skill-radar-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(104, 211, 255, 0.82)"></stop>
          <stop offset="100%" stop-color="rgba(255, 214, 110, 0.34)"></stop>
        </linearGradient>
      </defs>
      ${rings.map((ring) => `
        <polygon
          class="skill-radar__ring"
          points="${buildRadarPoints(entries, () => ring, radius, center)}"
        ></polygon>
      `).join("")}
      ${entries.map((entry, index) => {
        const angle = (-Math.PI / 2) + ((Math.PI * 2) * index) / entries.length;
        const axisX = center + Math.cos(angle) * radius;
        const axisY = center + Math.sin(angle) * radius;
        const labelX = center + Math.cos(angle) * (radius + 22);
        const labelY = center + Math.sin(angle) * (radius + 22);
        return `
          <line class="skill-radar__axis" x1="${center}" y1="${center}" x2="${roundTo(axisX, 1)}" y2="${roundTo(axisY, 1)}"></line>
          <text class="skill-radar__label" x="${roundTo(labelX, 1)}" y="${roundTo(labelY, 1)}" text-anchor="middle">${escapeHtml(entry.shortLabel)}</text>
        `;
      }).join("")}
      <polygon class="skill-radar__area skill-radar__area--route" points="${routePoints}"></polygon>
      <polygon class="skill-radar__area skill-radar__area--player" points="${playerPoints}"></polygon>
      ${entries.map((entry, index) => {
        const angle = (-Math.PI / 2) + ((Math.PI * 2) * index) / entries.length;
        const pointRadius = (radius * entry.score) / 100;
        const x = center + Math.cos(angle) * pointRadius;
        const y = center + Math.sin(angle) * pointRadius;
        return `<circle class="skill-radar__dot" cx="${roundTo(x, 1)}" cy="${roundTo(y, 1)}" r="4"></circle>`;
      }).join("")}
    </svg>
  `;
}

function renderRouteDna(step, compact = false) {
  const intel = skillEngine.levelIntelByStepKey.get(getStepRouteKey(step));
  if (!intel) {
    return "";
  }

  const highlights = intel.dna.highlights.slice(0, compact ? 3 : 4);
  return `
    <section class="route-dna${compact ? " route-dna--compact" : ""}">
      <div class="route-dna__header">
        <p class="panel-heading__kicker">Route DNA</p>
        <span class="pill">${escapeHtml(intel.routeRole)}</span>
      </div>
      <div class="route-dna__bars">
        ${highlights.map((entry) => `
          <div class="route-dna__row">
            <span class="route-dna__label">${escapeHtml(entry.shortLabel)}</span>
            <div class="route-dna__track">
              <span style="width: ${intel.dna.display[entry.id]}%; --skill-accent: ${entry.color};"></span>
            </div>
            <strong>${Math.round(intel.dna.display[entry.id])}</strong>
          </div>
        `).join("")}
      </div>
      <p class="route-dna__copy">${escapeHtml(intel.dna.summary)}.</p>
    </section>
  `;
}

function renderRouteWhy(step, compact = false) {
  const intel = skillEngine.levelIntelByStepKey.get(getStepRouteKey(step));
  if (!intel?.whyNow) {
    return "";
  }

  const isMainPick = skillEngine.mainRecommendation && getStepRouteKey(skillEngine.mainRecommendation.step) === getStepRouteKey(step);
  return `
    <div class="route-brief${compact ? " route-brief--compact" : ""}">
      <p class="panel-heading__kicker">${escapeHtml(isMainPick ? "Why This Pick" : "Route Role")}</p>
      <p class="route-brief__copy">${escapeHtml(intel.whyNow)}</p>
    </div>
  `;
}

function renderRouteAlternate(branch, compact = false) {
  if (!branch?.step) {
    return "";
  }

  const targetId = typeof branch.step.number === "number" ? branch.step.anchorId : branch.step.id;
  const topTags = branch.dna?.highlights?.slice(0, compact ? 2 : 3) || [];
  return `
    <article class="route-branch${compact ? " route-branch--compact" : ""}">
      <div class="route-branch__top">
        <div>
          <p class="panel-heading__kicker">${escapeHtml(branch.label)}</p>
          <h3>${escapeHtml(branch.step.name)}</h3>
        </div>
        <div class="route-branch__meta">
          ${branch.insight ? renderMasteryTag(branch.insight, true) : ""}
          ${branch.emphasisSkillId ? renderBadge(getSkillMeta(branch.emphasisSkillId).shortLabel, "badge badge--training") : ""}
        </div>
      </div>
      <div class="objective-card__tag-row">
        ${renderMetaTag(typeof branch.step.number === "number" ? branch.step.worldLabel : `${branch.step.worldTitle} / Bonus`)}
        ${topTags.map((entry) => renderMetaTag(entry.shortLabel)).join("")}
      </div>
      <p class="route-brief__copy">${escapeHtml(branch.tradeoff)}</p>
      <div class="quest-card__actions">
        ${renderJumpButton("View Pick", targetId, branch.step.worldId, "button button--ghost")}
        ${renderLinkButton(branch.step.levelUrl, "Open Level", "button")}
      </div>
    </article>
  `;
}

function renderRouteBranches(step, compact = false) {
  if (!skillEngine.mainRecommendation || getStepRouteKey(skillEngine.mainRecommendation.step) !== getStepRouteKey(step)) {
    return "";
  }

  return `
    <section class="route-branches${compact ? " route-branches--compact" : ""}">
      <div class="route-dna__header">
        <p class="panel-heading__kicker">Alternate Branches</p>
        <span class="pill">${skillEngine.alternates.length}</span>
      </div>
      <div class="route-analysis__alternates">
        ${skillEngine.alternates.length
          ? skillEngine.alternates.map((branch) => renderRouteAlternate(branch, true)).join("")
          : '<p class="summary-panel__copy">No alternate routes unlocked yet.</p>'}
      </div>
    </section>
  `;
}

function renderSkillMapPanel() {
  if (!elements.skillMapPanel) {
    return;
  }

  const { identity } = skillEngine;
  elements.skillMapPanel.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="panel-heading__kicker">Skill Map</p>
        <h2>Progress Identity</h2>
      </div>
      <div class="route-toolbar__meta">
        ${renderMetaTag(`Strongest ${identity.strongest.shortLabel}`)}
        ${renderMetaTag(`Weakest ${identity.weakest.shortLabel}`)}
        ${renderMetaTag(`Neglected ${identity.neglected.shortLabel}`)}
      </div>
    </div>
    <div class="skill-map__layout">
      <div class="skill-map__hero">
        <div class="skill-map__identity">
          <p class="panel-heading__kicker">Live Read</p>
          <h3 class="skill-map__title">${escapeHtml(identity.title)}</h3>
          <p class="summary-panel__copy">${escapeHtml(identity.summary)}</p>
          <p class="summary-panel__copy">${escapeHtml(identity.subline)}</p>
          <div class="objective-card__tag-row">
            ${renderBadge(`${identity.strongest.shortLabel} ${identity.strongest.score}`, "badge badge--training")}
            ${renderMetaTag(`${identity.weakest.shortLabel} ${identity.weakest.score}`)}
            ${renderMetaTag(`${identity.neglected.shortLabel} gap ${identity.neglected.neglect}`)}
          </div>
          <div class="skill-map__legend">
            <span><i class="skill-map__legend-dot skill-map__legend-dot--player"></i>Profile strength</span>
            <span><i class="skill-map__legend-dot skill-map__legend-dot--route"></i>Live route demand</span>
          </div>
        </div>
        <div class="skill-map__chart">
          ${renderSkillRadar()}
        </div>
      </div>
      <div class="skill-grid">
        ${skillEngine.entries.map((entry) => `
          <article class="skill-card" style="--skill-accent: ${entry.color};">
            <div class="skill-card__top">
              <div>
                <p class="panel-heading__kicker">${escapeHtml(entry.statusLabel)}</p>
                <h3>${escapeHtml(entry.label)}</h3>
              </div>
              <span class="pill">${entry.score}</span>
            </div>
            <div class="skill-card__bars">
              <div class="skill-card__row">
                <span>Strength</span>
                <div class="skill-card__track"><span style="width: ${entry.score}%"></span></div>
                <strong>${entry.score}</strong>
              </div>
              <div class="skill-card__row">
                <span>Live Route</span>
                <div class="skill-card__track skill-card__track--demand"><span style="width: ${entry.liveDemand}%"></span></div>
                <strong>${entry.liveDemand}</strong>
              </div>
              <div class="skill-card__row">
                <span>Exposure</span>
                <div class="skill-card__track skill-card__track--exposure"><span style="width: ${entry.exposure}%"></span></div>
                <strong>${entry.exposure}</strong>
              </div>
            </div>
            <p class="summary-panel__copy">${escapeHtml(entry.focusCopy.charAt(0).toUpperCase() + entry.focusCopy.slice(1))}. ${escapeHtml(entry.neglect >= 16 ? `${entry.label} is underbuilt for the live route.` : `${entry.label} is holding at ${entry.statusLabel.toLowerCase()} status.`)}</p>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCoveragePanel() {
  if (!elements.coveragePanel) {
    return;
  }

  const mainRecommendation = skillEngine.mainRecommendation;
  elements.coveragePanel.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="panel-heading__kicker">Route DNA</p>
        <h2>Coverage + Recommendation Lab</h2>
      </div>
      <div class="route-toolbar__meta">
        ${renderMetaTag(`Main pick ${mainRecommendation?.step?.name || "Offline"}`)}
        ${renderMetaTag(`Live leak ${trainingEngine.primarySignal?.shortLabel || "Baseline"}`)}
      </div>
    </div>
    <div class="route-analysis">
      <div class="route-analysis__primary">
        ${
          mainRecommendation
            ? `
              <article class="route-branch route-branch--main">
                <div class="route-branch__top">
                  <div>
                    <p class="panel-heading__kicker">Main Recommendation</p>
                    <h3>${escapeHtml(mainRecommendation.step.name)}</h3>
                  </div>
                  <div class="route-branch__meta">
                    ${renderBadge(mainRecommendation.label, "badge badge--training")}
                    ${mainRecommendation.insight ? renderMasteryTag(mainRecommendation.insight, true) : ""}
                  </div>
                </div>
                ${renderRouteDna(mainRecommendation.step, true)}
                <p class="route-brief__copy">${escapeHtml(mainRecommendation.reason)}</p>
                <div class="quest-card__actions">
                  ${renderJumpButton("View On Route", typeof mainRecommendation.step.number === "number" ? mainRecommendation.step.anchorId : mainRecommendation.step.id, mainRecommendation.step.worldId, "button button--ghost")}
                  ${renderLinkButton(mainRecommendation.step.levelUrl, "Open Level", "button")}
                </div>
              </article>
            `
            : '<p class="summary-panel__copy">No live route recommendation available.</p>'
        }
        <div class="route-analysis__alternates">
          ${skillEngine.alternates.length
            ? skillEngine.alternates.map((branch) => renderRouteAlternate(branch, true)).join("")
            : '<p class="summary-panel__copy">Alternate branches appear once the route has enough unlocked options to compare.</p>'}
        </div>
      </div>
      <div class="route-analysis__insights">
        ${skillEngine.alerts.map((alert) => `
          <article class="route-alert route-alert--${escapeHtml(alert.tone)}">
            <p class="panel-heading__kicker">${escapeHtml(alert.tone === "warning" ? "Coverage Alert" : alert.tone === "good" ? "Coverage Stable" : "Coverage Read")}</p>
            <h3>${escapeHtml(alert.title)}</h3>
            <p class="summary-panel__copy">${escapeHtml(alert.body)}</p>
          </article>
        `).join("")}
      </div>
    </div>
    <div class="coverage-heatmap">
      <div class="coverage-heatmap__top">
        <div>
          <p class="panel-heading__kicker">World Heatmap</p>
          <h3>Route coverage by world</h3>
        </div>
        <p class="summary-panel__copy">Brighter cells mean that world leans harder on that mechanic. Bonus-heavy memory repairs stand out when the side branch is stronger than the main lane.</p>
      </div>
      <div class="coverage-heatmap__scroll">
        <table class="coverage-heatmap__table">
          <thead>
            <tr>
              <th>World</th>
              ${SKILL_MAP_META.map((skill) => `<th>${escapeHtml(skill.shortLabel)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${skillEngine.worldRows.map((row) => `
              <tr${row.current ? ' class="is-current"' : ""}>
                <th>
                  <strong>${escapeHtml(row.worldLabel)}</strong>
                  <span>${escapeHtml(row.title)}</span>
                </th>
                ${SKILL_MAP_META.map((skill) => {
                  const value = row.coverage[skill.id] || 0;
                  const maxValue = skillEngine.worldMaxBySkill[skill.id] || value || 1;
                  const intensity = clamp((value / maxValue) * 100, 12, 100);
                  return `
                    <td>
                      <span class="coverage-cell" style="background: ${hexToRgba(skill.color, roundTo(0.1 + intensity / 125, 2))};">
                        <strong>${Math.round(value)}</strong>
                      </span>
                    </td>
                  `;
                }).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderMasteryMeter(insight, compact = false) {
  if (!insight) {
    return "";
  }

  return `
    <div class="mastery-meter${compact ? " mastery-meter--compact" : ""}" aria-hidden="true">
      <span class="mastery-meter__fill mastery-meter__fill--${insight.tier.className}" style="width: ${insight.masteryScore}%"></span>
    </div>
  `;
}

function renderMasteryTag(insight, compact = false) {
  if (!insight) {
    return "";
  }

  return renderBadge(
    `${compact ? insight.tier.shortLabel : insight.tier.label} ${insight.masteryScore}`,
    `badge badge--mastery badge--mastery-${insight.tier.className}`,
  );
}

function getProfileOptionTitle(groupKey, optionId) {
  return PROFILE_QUESTIONS[groupKey]?.options.find((option) => option.id === optionId)?.title || optionId;
}

function getBiomeTheme(world) {
  return WORLD_BIOMES[world?.baseWorldIndex] || WORLD_BIOMES[(world?.worldNumber || 1) - 1] || WORLD_BIOMES[0];
}

function renderBiomeVars(biome) {
  return [
    `--world-accent:${biome.accent}`,
    `--world-accent-2:${biome.accent2}`,
    `--world-sky-a:${biome.skyA}`,
    `--world-sky-b:${biome.skyB}`,
    `--world-ground:${biome.ground}`,
    `--world-mist:${biome.mist}`,
    `--world-path:${biome.path}`,
  ].join(";");
}

function renderThemeSwitcher() {
  elements.themeSwitcher.innerHTML = THEMES.map((theme) => `
    <button
      class="theme-button${state.theme === theme.id ? " is-active" : ""}"
      type="button"
      data-action="set-theme"
      data-theme="${theme.id}"
      aria-pressed="${state.theme === theme.id}"
      aria-label="Use ${escapeHtml(theme.label)} theme"
    >
      <span class="theme-button__swatch" style="background: linear-gradient(90deg, ${theme.colors.join(", ")});"></span>
      <span class="theme-button__copy">
        <span class="theme-button__label">${escapeHtml(theme.label)}</span>
        <span class="theme-button__description">${escapeHtml(theme.description)}</span>
      </span>
    </button>
  `).join("");
}

const SETUP_STEPS = [
  {
    key: "hardest",
    eyebrow: "Step 1",
    title: "Where should your custom ladder begin?",
    copy: "Pick the hardest place you can already clear consistently so the route starts close to your real skill, not where you were months ago.",
  },
  {
    key: "mainGoal",
    eyebrow: "Step 2",
    title: "What is the main goal of this route?",
    copy: "The optimizer will change how aggressively it climbs, how much it smooths difficulty, and what kinds of checkpoints it values most.",
  },
  {
    key: "focus",
    eyebrow: "Step 3",
    title: "What should this route help you improve first?",
    copy: "This is the skill bias inside the optimizer. It does not lock the route to one gimmick, but it does tell the generator where to lean.",
  },
  {
    key: "routeLength",
    eyebrow: "Step 4",
    title: "How long do you want the grind to be?",
    copy: "Shorter routes move faster. Longer routes add more bridge clears so the difficulty spikes feel cleaner.",
  },
  {
    key: "theme",
    eyebrow: "Step 5",
    title: "Pick the vibe of your campaign screen.",
    copy: "Themes only change the presentation, so choose whatever makes the route feel fun to open every day.",
  },
];

function renderSetupOption(option, field, selectedValue, extra = "") {
  const isSelected = selectedValue === option.id;
  return `
    <button
      class="setup-option${isSelected ? " is-selected" : ""}"
      type="button"
      data-action="setup-select"
      data-field="${field}"
      data-value="${option.id}"
      aria-pressed="${isSelected}"
    >
      <span class="setup-option__body">
        ${extra}
        <strong class="setup-option__title">${escapeHtml(option.title)}</strong>
        <span class="setup-option__description">${escapeHtml(option.description)}</span>
      </span>
    </button>
  `;
}

function renderSetupOverlay() {
  if (!setupOpen) {
    elements.setupOverlay.hidden = true;
    elements.setupOverlay.innerHTML = "";
    return;
  }

  const stepConfig = SETUP_STEPS[setupStep];
  const isThemeStep = stepConfig.key === "theme";
  const previewProfile = {
    hardest: setupDraft.hardest,
    mainGoal: setupDraft.mainGoal,
    focus: setupDraft.focus,
    routeLength: setupDraft.routeLength,
  };
  const previewRoute = buildRouteData(previewProfile);
  const previewStart = previewRoute.preparedWorlds[0];
  const previewFinish = previewRoute.preparedWorlds[previewRoute.preparedWorlds.length - 1];
  const selectedValue = isThemeStep ? setupDraft.theme : setupDraft[stepConfig.key];
  const options = isThemeStep
    ? THEMES.map((theme) => ({
      id: theme.id,
      title: theme.label,
      description: theme.description,
      colors: theme.colors,
    }))
    : PROFILE_QUESTIONS[stepConfig.key].options;
  const canAdvance = Boolean(selectedValue);
  const isLastStep = setupStep === SETUP_STEPS.length - 1;
  const progressPercent = ((setupStep + 1) / SETUP_STEPS.length) * 100;

  elements.setupOverlay.hidden = false;
  elements.setupOverlay.innerHTML = `
    <div class="setup-card setup-card--wizard" role="dialog" aria-modal="true" aria-labelledby="setup-title" aria-describedby="setup-copy" tabindex="-1" data-setup-dialog>
      <div class="setup-shell">
        <aside class="setup-panel">
          <p class="eyebrow">Journey Builder</p>
          <h2 class="setup-card__title" id="setup-title">Build a route that actually fits where you are right now.</h2>
          <p class="setup-card__copy" id="setup-copy">
            This setup uses your current skill, your main goal, your skill bias, and your preferred grind length to rebuild the campaign with the optimizer instead of a fixed preset ladder.
          </p>
          <div class="setup-progress">
            <div class="setup-progress__top">
              <span>${escapeHtml(`${stepConfig.eyebrow} of ${SETUP_STEPS.length}`)}</span>
              <span>${Math.round(progressPercent)}%</span>
            </div>
            <div class="setup-progress__bar" aria-hidden="true">
              <div class="setup-progress__fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>
          <div class="setup-preview">
            <article class="setup-preview__card">
              <span class="setup-preview__label">Projected Route</span>
              <strong class="setup-preview__value">${escapeHtml(previewRoute.routeSummary)}</strong>
            </article>
            <article class="setup-preview__card">
              <span class="setup-preview__label">Size</span>
              <strong class="setup-preview__value">${previewRoute.totalMain} main / ${previewRoute.totalBonus} bonus</strong>
            </article>
            <article class="setup-preview__card">
              <span class="setup-preview__label">Start</span>
              <strong class="setup-preview__value">${escapeHtml(previewStart.title)}</strong>
            </article>
            <article class="setup-preview__card">
              <span class="setup-preview__label">Finish</span>
              <strong class="setup-preview__value">${escapeHtml(previewFinish.title)}</strong>
            </article>
          </div>
        </aside>
        <section class="setup-stage">
          <p class="setup-stage__eyebrow">${escapeHtml(stepConfig.eyebrow)}</p>
          <h3 class="setup-stage__title">${escapeHtml(stepConfig.title)}</h3>
          <p class="setup-stage__copy">${escapeHtml(stepConfig.copy)}</p>
          <div class="setup-options${isThemeStep ? " setup-options--themes" : ""}">
            ${options.map((option) => {
              const extra = option.colors
                ? `<span class="setup-option__theme" style="background: linear-gradient(90deg, ${option.colors.join(", ")});"></span>`
                : "";
              return renderSetupOption(option, stepConfig.key, selectedValue, extra);
            }).join("")}
          </div>
          <div class="setup-actions">
            ${state.profile ? '<button class="button button--ghost" type="button" data-action="close-setup">Cancel</button>' : ""}
            ${setupStep > 0 ? '<button class="button button--ghost" type="button" data-action="setup-back">Back</button>' : ""}
            ${
              isLastStep
                ? `<button class="button" type="button" data-action="setup-finish" ${canAdvance ? "" : "disabled"}>Build My Route</button>`
                : `<button class="button" type="button" data-action="setup-next" ${canAdvance ? "" : "disabled"}>Continue</button>`
            }
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderStatusPicker(options, currentStatus, action, dataAttribute, value) {
  return `
    <div class="tracker-status-row">
      ${options.map((option) => `
        <button
          class="tracker-chip${currentStatus === option.id ? " is-active" : ""}"
          type="button"
          data-action="${action}"
          ${dataAttribute}="${escapeHtml(String(value))}"
          data-status="${option.id}"
          aria-pressed="${currentStatus === option.id}"
        >
          ${escapeHtml(option.label)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderNoteEditor(levelKey, label) {
  return `
    <div class="tracker-note">
      <label class="tracker-note__label" for="note-${escapeHtml(levelKey)}">Notes</label>
      <textarea class="tracker-note__input" id="note-${escapeHtml(levelKey)}" data-note-input="${escapeHtml(levelKey)}" rows="3" placeholder="Practice sections, click issues, consistency notes...">${escapeHtml(getLevelNote(levelKey))}</textarea>
      <div class="tracker-note__actions">
        <button class="button button--ghost" type="button" data-action="save-note" data-level-key="${escapeHtml(levelKey)}" data-level-label="${escapeHtml(label)}">Save Note</button>
      </div>
    </div>
  `;
}

function renderTrainingLogger(step) {
  const aggregate = trainingEngine.byMetaKey.get(step.metaKey) || createTrainingAggregate(step.metaKey);
  const recommendation = trainingEngine.recommendationByMetaKey.get(step.metaKey) || null;
  const recentSessions = getRecentTrainingSessions(step.metaKey, 3);
  const insight = coachEngine.insightByMetaKey.get(step.metaKey) || null;

  return `
    <section class="session-panel" data-training-shell="${escapeHtml(step.metaKey)}">
      <div class="tracker-panel__header">
        <div>
          <p class="panel-heading__kicker">Training Engine</p>
          <h4 class="tracker-panel__title">${escapeHtml(recommendation?.label || "Feed The Engine")}</h4>
        </div>
        ${insight ? renderMasteryTag(insight, true) : `<span class="pill">${aggregate.sessions} logged</span>`}
      </div>
      <p class="tracker-panel__copy">${escapeHtml(recommendation?.reason || "Log how the run felt and the engine will use it to reprioritize your practice queue.")}</p>
      ${renderMasteryMeter(insight, true)}
      <div class="session-panel__meta">
        ${aggregate.sessions ? renderMetaTag(`${aggregate.sessions} logged`) : ""}
        ${aggregate.bestPercent != null ? renderMetaTag(`Best ${aggregate.bestPercent}%`) : ""}
        ${aggregate.roughSessions ? renderMetaTag(`${aggregate.roughSessions} rough`) : ""}
        ${aggregate.endingFails ? renderMetaTag(`${aggregate.endingFails} late miss${aggregate.endingFails === 1 ? "" : "es"}`) : ""}
        ${insight?.freshness ? renderMetaTag(insight.freshness.label) : ""}
      </div>
      <div class="session-panel__grid">
        <label class="session-field">
          <span>Attempts</span>
          <input class="session-field__input" type="number" min="0" max="9999" inputmode="numeric" placeholder="12" data-session-attempts>
        </label>
        <label class="session-field">
          <span>Best %</span>
          <input class="session-field__input" type="number" min="0" max="100" inputmode="numeric" placeholder="74" data-session-best>
        </label>
        <label class="session-field">
          <span>Result</span>
          <select class="session-field__input" data-session-result>
            ${TRAINING_RESULT_OPTIONS.map((option) => `
              <option value="${option.id}"${option.id === "progress" ? " selected" : ""}>${escapeHtml(option.label)}</option>
            `).join("")}
          </select>
        </label>
        <label class="session-field">
          <span>Fail Point</span>
          <select class="session-field__input" data-session-fail-point>
            ${TRAINING_FAIL_POINT_OPTIONS.map((option) => `
              <option value="${option.id}"${option.id === "mid" ? " selected" : ""}>${escapeHtml(option.label)}</option>
            `).join("")}
          </select>
        </label>
      </div>
      <div class="session-checks" role="group" aria-label="Training struggles">
        ${TRAINING_SIGNAL_META.map((signal) => `
          <label class="session-check">
            <input type="checkbox" data-session-issue="${signal.id}">
            <span>${escapeHtml(signal.shortLabel)}</span>
          </label>
        `).join("")}
      </div>
      <div class="tracker-note__actions">
        <button class="button button--ghost" type="button" data-action="log-session" data-meta-key="${escapeHtml(step.metaKey)}" data-level-label="${escapeHtml(step.name)}">Log Session</button>
      </div>
      ${
        recentSessions.length
          ? `<div class="session-history">${recentSessions.map((session) => `
            <article class="session-history__item">
              <strong>${escapeHtml(TRAINING_RESULT_OPTIONS.find((option) => option.id === session.result)?.label || "Session")}</strong>
              <span>${escapeHtml([
                session.bestPercent != null ? `${session.bestPercent}%` : null,
                TRAINING_FAIL_POINT_OPTIONS.find((option) => option.id === session.failPoint)?.label || null,
                session.issues.length ? session.issues.map((issue) => getTrainingSignalMeta(issue).shortLabel).join(", ") : null,
                formatActivityTime(session.at),
              ].filter(Boolean).join(" / "))}</span>
            </article>
          `).join("")}</div>`
          : '<p class="session-panel__empty">No sessions logged for this level yet.</p>'
      }
    </section>
  `;
}

function renderMainTracker(step) {
  const levelKey = getMainLevelKey(step.number);
  const status = getMainStepDisplayStatus(step);
  const insight = coachEngine.insightByMetaKey.get(step.metaKey) || null;
  let options = [];
  let copy = "Locked until the previous main level is cleared.";

  if (step.number <= state.mainCleared) {
    options = MAIN_PROGRESS_OPTIONS.filter((option) => ["cleared", "revisit"].includes(option.id));
    copy = "Cleared steps can be flagged for revisit without removing route progress.";
  } else if (step.number === state.mainCleared + 1) {
    options = MAIN_PROGRESS_OPTIONS.filter((option) => option.id !== "revisit");
    copy = "Use the tracker to mark whether this level is ready, in practice, consistent, or fully cleared.";
  }

  return `
    <section class="tracker-panel" data-note-shell="${escapeHtml(levelKey)}">
      <div class="tracker-panel__header">
        <div>
          <p class="panel-heading__kicker">Tracker</p>
          <h4 class="tracker-panel__title">${escapeHtml(getMainStepStatusLabel(step))}</h4>
        </div>
        ${insight ? renderMasteryTag(insight, true) : `<span class="pill">${escapeHtml(getMainStepStatusLabel(step))}</span>`}
      </div>
      <p class="tracker-panel__copy">${escapeHtml(copy)}</p>
      ${renderMasteryMeter(insight, true)}
      <div class="tracker-status-row">
        ${renderMetaTag(`Status ${getMainStepStatusLabel(step)}`)}
        ${insight?.freshness ? renderMetaTag(insight.freshness.label) : ""}
      </div>
      ${options.length ? renderStatusPicker(options, status, "set-main-status", "data-step-number", step.number) : ""}
      ${renderRouteDna(step, true)}
      ${(step.number === state.mainCleared + 1 || step.isBoss || step.milestone) ? renderRouteWhy(step, true) : ""}
      ${renderRouteBranches(step, true)}
      ${renderNoteEditor(levelKey, step.name)}
      ${renderTrainingLogger(step)}
    </section>
  `;
}

function renderBonusTracker(step, pack) {
  const status = getBonusStepDisplayStatus(step, pack);
  const insight = coachEngine.insightByMetaKey.get(step.metaKey) || null;
  const options = isBonusUnlocked(pack)
    ? BONUS_PROGRESS_OPTIONS
    : [];
  const copy = isBonusUnlocked(pack)
    ? "Optional levels can be marked for practice, consistency work, or full clear tracking."
    : pack.unlockLabel;

  return `
    <section class="tracker-panel" data-note-shell="${escapeHtml(step.id)}">
      <div class="tracker-panel__header">
        <div>
          <p class="panel-heading__kicker">Tracker</p>
          <h4 class="tracker-panel__title">${escapeHtml(getBonusStepStatusLabel(step, pack))}</h4>
        </div>
        ${insight ? renderMasteryTag(insight, true) : `<span class="pill">${escapeHtml(getBonusStepStatusLabel(step, pack))}</span>`}
      </div>
      <p class="tracker-panel__copy">${escapeHtml(copy)}</p>
      ${renderMasteryMeter(insight, true)}
      <div class="tracker-status-row">
        ${renderMetaTag(`Status ${getBonusStepStatusLabel(step, pack)}`)}
        ${insight?.freshness ? renderMetaTag(insight.freshness.label) : ""}
      </div>
      ${options.length ? renderStatusPicker(options, status, "set-bonus-status", "data-bonus-id", step.id) : ""}
      ${renderRouteDna(step, true)}
      ${renderRouteWhy(step, true)}
      ${renderNoteEditor(step.id, step.name)}
      ${renderTrainingLogger(step)}
    </section>
  `;
}

function buildSearchResults(query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return [];
  }

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const candidates = [];

  for (const world of routeData.preparedWorlds) {
    const searchText = normalizeText(`${world.worldLabel} ${world.title} ${world.description} ${world.gate}`);
    if (tokens.every((token) => searchText.includes(token))) {
      const score = (searchText.startsWith(normalizedQuery) ? 20 : 0) + (world.title.toLowerCase().includes(normalizedQuery) ? 10 : 0);
      candidates.push({
        id: `world-${world.id}`,
        score,
        kind: "world",
        title: `${world.worldLabel}: ${world.title}`,
        subtitle: world.gate,
        worldId: world.id,
        targetId: world.sectionId,
      });
    }
  }

  for (const step of routeData.allMain) {
    const searchText = normalizeText(`${step.name} ${step.creator} ${step.levelId} ${step.difficulty} ${step.worldTitle} ${step.worldLabel}`);
    if (tokens.every((token) => searchText.includes(token))) {
      const score = (step.name.toLowerCase().includes(normalizedQuery) ? 25 : 0) + (String(step.levelId).includes(normalizedQuery) ? 18 : 0);
      candidates.push({
        id: step.anchorId,
        score,
        kind: "main",
        title: `${step.number}. ${step.name}`,
        subtitle: `${step.creator} / ${step.difficulty} / ${step.worldLabel}`,
        worldId: step.worldId,
        targetId: step.anchorId,
      });
    }
  }

  for (const step of routeData.bonusSteps) {
    const searchText = normalizeText(`${step.name} ${step.creator} ${step.levelId} ${step.difficulty} ${step.worldTitle} bonus`);
    if (tokens.every((token) => searchText.includes(token))) {
      const score = (step.name.toLowerCase().includes(normalizedQuery) ? 20 : 0) + (String(step.levelId).includes(normalizedQuery) ? 18 : 0);
      candidates.push({
        id: `${step.id}-search`,
        score,
        kind: "bonus",
        title: `${step.name} (Bonus)`,
        subtitle: `${step.creator} / ${step.difficulty} / ${step.worldTitle}`,
        worldId: step.worldId,
        targetId: step.id,
      });
    }
  }

  return candidates
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, 8);
}

function renderRouteToolbar() {
  const selectedWorld = getSelectedWorld();
  const freshness = getFreshnessSummary();
  const previousWorld = routeData.preparedWorlds[selectedWorld.worldIndex - 1] || null;
  const nextWorld = routeData.preparedWorlds[selectedWorld.worldIndex + 1] || null;
  const searchResults = buildSearchResults(routeSearchQuery);
  const activeSignal = trainingEngine.primarySignal;

  elements.routeToolbar.innerHTML = `
    <div class="route-toolbar__top">
      <div>
        <p class="panel-heading__kicker">Route Workspace</p>
        <h2 class="route-toolbar__title">${escapeHtml(selectedWorld.worldLabel)}: ${escapeHtml(selectedWorld.title)}</h2>
        <p class="route-toolbar__copy">
          One world at a time, with quick jump, tracker controls, notes, research context, and a live training read in the same place.${activeSignal ? ` Current leak: ${activeSignal.label.toLowerCase()}.` : " Log a few sessions to unlock adaptive drill calls."}
        </p>
      </div>
      <div class="route-toolbar__meta">
        ${renderMetaTag(`${getWorldMainClears(selectedWorld)} / ${selectedWorld.levels.length} main`)}
        ${renderMetaTag(`${getWorldBonusClears(selectedWorld)} / ${selectedWorld.bonusCount} bonus`)}
        ${activeSignal ? renderMetaTag(`Adaptive ${activeSignal.shortLabel}`) : ""}
        ${renderMetaTag(skillEngine.identity.title)}
        ${renderMetaTag(`Data ${freshness.label}`)}
      </div>
    </div>
    <div class="route-toolbar__actions">
      ${previousWorld ? `<button class="button button--ghost" type="button" data-action="jump-world" data-world-id="${previousWorld.id}">Previous World</button>` : ""}
      ${nextWorld ? `<button class="button button--ghost" type="button" data-action="jump-world" data-world-id="${nextWorld.id}">Next World</button>` : ""}
      <button class="button button--ghost" type="button" data-action="jump-current">Current Target</button>
      <button class="button button--ghost" type="button" data-action="undo-change" ${undoStack.length ? "" : "disabled"}>Undo Last Change</button>
      <button class="button button--ghost" type="button" data-action="set-page" data-page="settings">Settings</button>
    </div>
    <div class="route-search">
      <label class="route-search__label" for="route-search">Quick Jump</label>
      <p class="visually-hidden" id="route-search-help">Search by level name, creator, ID, difficulty, or world title, then open a result to jump directly to it.</p>
      <input class="route-search__input" id="route-search" type="search" value="${escapeHtml(routeSearchQuery)}" placeholder="Search by level, creator, ID, difficulty, or world" aria-describedby="route-search-help" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search">
      <div class="route-search__results" aria-live="polite">
        ${
          routeSearchQuery.trim()
            ? searchResults.length
              ? searchResults.map((result) => `
                <button class="route-search__result" type="button" data-action="jump-node" data-world-id="${result.worldId}" data-target-id="${result.targetId}" aria-label="Jump to ${escapeHtml(result.title)}">
                  <span class="route-search__result-kind">${escapeHtml(result.kind)}</span>
                  <span class="route-search__result-copy">
                    <strong>${escapeHtml(result.title)}</strong>
                    <span>${escapeHtml(result.subtitle)}</span>
                  </span>
                </button>
              `).join("")
              : `<p class="route-search__empty">No matches for "${escapeHtml(routeSearchQuery)}".</p>`
            : `<p class="route-search__empty">Search the full route by level name, creator, ID, difficulty, or world title.</p>`
        }
      </div>
    </div>
  `;
  restoreRouteSearchFocus();
}

function renderAuditPanel() {
  const freshness = getFreshnessSummary();
  elements.auditPanel.innerHTML = `
    <div class="panel-heading panel-heading--compact">
      <div>
        <p class="panel-heading__kicker">Route Audit</p>
        <h2>Freshness And Coverage</h2>
      </div>
      <span class="status-marker ${freshness.isStale ? "status-marker--locked" : "status-marker--complete"}">${escapeHtml(freshness.label)}</span>
    </div>
    <div class="audit-grid">
      <article class="summary-panel__item">
        <span class="summary-panel__label">Verified</span>
        <strong>${escapeHtml(VERIFIED_AT)}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Age</span>
        <strong>${freshness.ageInDays} day${freshness.ageInDays === 1 ? "" : "s"}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Coverage</span>
        <strong>${routeData.totalMain} main / ${routeData.totalBonus} bonus</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Schema</span>
        <strong>${escapeHtml(SAVE_VERSION)}</strong>
      </article>
    </div>
    <p class="summary-panel__copy">
      ${freshness.isStale ? "The route data is older than the review threshold and should be checked against its source links." : "The route data is still inside the current review window."}
    </p>
  `;
}

function renderHistoryPanel() {
  elements.historyPanel.innerHTML = `
    <div class="panel-heading panel-heading--compact">
      <div>
        <p class="panel-heading__kicker">History</p>
        <h2>Recent Changes</h2>
      </div>
      <button class="button button--ghost" type="button" data-action="undo-change" ${undoStack.length ? "" : "disabled"}>Undo</button>
    </div>
    ${
      state.activityLog.length
        ? `<div class="history-list">${state.activityLog.map((entry) => `
          <article class="history-item">
            <strong>${escapeHtml(entry.message)}</strong>
            <span>${escapeHtml(formatActivityTime(entry.at))}</span>
          </article>
        `).join("")}</div>`
        : '<p class="summary-panel__copy">No saved changes yet.</p>'
    }
  `;
}

function renderTrainingRecommendation(entry, compact = false) {
  const targetId = typeof entry.step.number === "number" ? entry.step.anchorId : entry.step.id;
  const routeIntel = skillEngine.levelIntelByStepKey.get(getStepRouteKey(entry.step));
  const dnaTags = routeIntel?.dna?.highlights?.slice(0, 2).map((highlight) => highlight.shortLabel).join(" / ");
  return `
    <button
      class="training-queue__item${compact ? " training-queue__item--compact" : ""}"
      type="button"
      data-action="jump-node"
      data-world-id="${escapeHtml(entry.step.worldId)}"
      data-target-id="${escapeHtml(targetId)}"
      aria-label="Jump to ${escapeHtml(entry.step.name)}"
    >
      <span class="training-queue__rank">#${entry.rank}</span>
      <span class="training-queue__copy">
        <strong>${escapeHtml(entry.step.name)}</strong>
        <span>${escapeHtml(entry.label)} / ${escapeHtml(entry.reason)}</span>
        ${dnaTags ? `<span>${escapeHtml(`Route DNA: ${dnaTags}`)}</span>` : ""}
      </span>
    </button>
  `;
}

function renderQuestCard(quest) {
  const insight = quest.targetInsight || coachEngine.insightByMetaKey.get(quest.target.metaKey);
  const targetId = typeof quest.target.number === "number" ? quest.target.anchorId : quest.target.id;
  const worldLabel = typeof quest.target.number === "number" ? `${quest.target.worldLabel} / Level ${quest.target.number}` : `${quest.target.worldTitle} / Bonus`;
  return `
    <article class="quest-card quest-card--${escapeHtml(quest.type)}${quest.complete ? " quest-card--complete" : ""}">
      <div class="quest-card__top">
        <div>
          <p class="panel-heading__kicker">${escapeHtml(quest.label)}</p>
          <h3 class="quest-card__title">${escapeHtml(quest.target.name)}</h3>
        </div>
        <div class="quest-card__meta">
          ${renderMasteryTag(insight, true)}
          <span class="status-marker ${quest.complete ? "status-marker--complete" : "status-marker--current"}">${escapeHtml(quest.stateLabel)}</span>
        </div>
      </div>
      <p class="quest-card__copy">${escapeHtml(quest.reason)}</p>
      ${renderMasteryMeter(insight, true)}
      <div class="objective-card__tag-row">
        ${renderMetaTag(worldLabel)}
        ${renderMetaTag(insight?.freshness?.label || "Freshness pending")}
        ${renderMetaTag(quest.progressText)}
        ${renderBadge(quest.rewardLabel, "badge badge--training")}
      </div>
      <div class="quest-card__actions">
        ${renderJumpButton("View Target", targetId, quest.target.worldId, "button button--ghost")}
        ${renderLinkButton(quest.target.levelUrl, "Open Level", "button")}
      </div>
    </article>
  `;
}

function renderCoachPanel() {
  if (!elements.coachPanel) {
    return;
  }

  const staleCount = coachEngine.insights.filter((insight) => insight.cleared && insight.freshness.stale).length;
  elements.coachPanel.innerHTML = `
    <div class="panel-heading panel-heading--compact">
      <div>
        <p class="panel-heading__kicker">Daily Loop</p>
        <h2 id="page-overview-title">Command Uplink</h2>
      </div>
      <span class="status-marker status-marker--current">${coachEngine.quests.filter((quest) => quest.complete).length} / ${coachEngine.quests.length} done</span>
    </div>
    <p class="summary-panel__copy">${escapeHtml(coachEngine.summary)}</p>
    <div class="training-panel__stats">
      <article class="summary-panel__item">
        <span class="summary-panel__label">Live Leak</span>
        <strong>${escapeHtml(trainingEngine.primarySignal?.shortLabel || "Baseline")}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Reclaims Due</span>
        <strong>${staleCount}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Boss Score</span>
        <strong>${coachEngine.bossReadiness.score}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Session Mode</span>
        <strong>${escapeHtml(coachEngine.sessionPlan.mode.label)}</strong>
      </article>
    </div>
    <div class="summary-panel__actions">
      ${renderLocalJumpButton("Open Plan", "planner-panel")}
      <button class="button button--ghost" type="button" data-action="jump-current">View Current Gate</button>
      <button class="button button--ghost" type="button" data-action="open-setup">Rebuild Route</button>
    </div>
  `;
}

function renderRewardPanel() {
  if (!elements.rewardPanel) {
    return;
  }

  const nextBadge = coachEngine.badges.find((badge) => !badge.earned) || null;
  elements.rewardPanel.innerHTML = `
    <div class="panel-heading panel-heading--compact">
      <div>
        <p class="panel-heading__kicker">Reward Loop</p>
        <h2>Momentum Bank</h2>
      </div>
      <span class="status-marker status-marker--complete">Lv ${coachEngine.rewards.level}</span>
    </div>
    <div class="reward-panel__hero">
      <div>
        <span class="summary-panel__label">Total XP</span>
        <strong class="reward-panel__value">${coachEngine.rewards.totalXp}</strong>
      </div>
      <div class="objective-card__tag-row">
        ${renderMetaTag(`Today +${coachEngine.rewards.todayXp} XP`)}
        ${renderMetaTag(`${coachEngine.rewards.trainingStreak} day streak`)}
        ${renderMetaTag(`${coachEngine.rewards.questCount} quests banked`)}
      </div>
    </div>
    <div class="mastery-meter reward-panel__meter" aria-hidden="true">
      <span class="mastery-meter__fill mastery-meter__fill--locked" style="width: ${(coachEngine.rewards.xpIntoLevel / coachEngine.rewards.xpForNext) * 100}%"></span>
    </div>
    <p class="summary-panel__copy">${coachEngine.rewards.xpForNext - coachEngine.rewards.xpIntoLevel} XP to level ${coachEngine.rewards.level + 1}.</p>
    <div class="reward-badges">
      ${coachEngine.badges.map((badge) => `
        <article class="reward-badge${badge.earned ? " is-earned" : ""}">
          <strong>${escapeHtml(badge.label)}</strong>
          <span>${escapeHtml(badge.earned ? "Earned" : badge.progressLabel)}</span>
        </article>
      `).join("")}
    </div>
    ${
      nextBadge
        ? `<p class="summary-panel__copy">Next badge: <strong>${escapeHtml(nextBadge.label)}</strong> (${escapeHtml(nextBadge.progressLabel)}).</p>`
        : '<p class="summary-panel__copy">All current badge targets are earned in this save.</p>'
    }
  `;
}

function renderQuestsPanel() {
  if (!elements.questsPanel) {
    return;
  }

  elements.questsPanel.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="panel-heading__kicker">Live Quests</p>
        <h2>Daily Run Card</h2>
      </div>
      <div class="route-toolbar__meta">
        ${renderMetaTag(`${coachEngine.quests.filter((quest) => quest.complete).length} / ${coachEngine.quests.length} complete`)}
        ${renderMetaTag(`Today +${coachEngine.rewards.todayXp} XP`)}
      </div>
    </div>
    <p class="summary-panel__copy">Quests refresh from your current route, weak spots, older clears, and the next boss gate. A productive day still counts even if there is no new hardest.</p>
    <div class="quests-grid">
      ${coachEngine.quests.map((quest) => renderQuestCard(quest)).join("")}
    </div>
  `;
}

function renderPlannerPanel() {
  if (!elements.plannerPanel) {
    return;
  }

  elements.plannerPanel.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="panel-heading__kicker">Session Planner</p>
        <h2>Recommended Block</h2>
      </div>
      <div class="session-mode-switch" role="tablist" aria-label="Session modes">
        ${SESSION_MODES.map((mode) => `
          <button
            class="tracker-chip${coachEngine.sessionPlan.mode.id === mode.id ? " is-active" : ""}"
            type="button"
            data-action="set-session-mode"
            data-mode="${mode.id}"
            aria-pressed="${coachEngine.sessionPlan.mode.id === mode.id}"
          >
            ${escapeHtml(mode.label)}
          </button>
        `).join("")}
      </div>
    </div>
    <p class="summary-panel__copy">${escapeHtml(coachEngine.sessionPlan.mode.description)} This plan uses your live quests rather than a fixed checklist.</p>
    <div class="session-plan">
      ${coachEngine.sessionPlan.blocks.map((block) => {
        const target = block.insight?.step || null;
        const targetId = target ? (typeof target.number === "number" ? target.anchorId : target.id) : "";
        return `
          <article class="session-block">
            <div class="session-block__top">
              <div>
                <p class="panel-heading__kicker">${escapeHtml(block.label)}</p>
                <h3>${escapeHtml(target?.name || "Flexible Slot")}</h3>
              </div>
              <span class="pill">${block.minutes} min</span>
            </div>
            ${target ? renderMasteryMeter(block.insight, true) : ""}
            <p class="summary-panel__copy">${escapeHtml(block.copy)}</p>
            <div class="objective-card__tag-row">
              ${target ? renderMasteryTag(block.insight, true) : ""}
              ${target ? renderMetaTag(block.insight.freshness.label) : ""}
              ${target ? renderMetaTag(typeof target.number === "number" ? target.worldLabel : "Bonus lane") : ""}
            </div>
            ${
              target
                ? `<div class="quest-card__actions">${renderJumpButton("Open Slot", targetId, target.worldId, "button button--ghost")}${renderLinkButton(target.levelUrl, "Open Level", "button")}</div>`
                : ""
            }
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderMasteryPanel() {
  if (!elements.masteryPanel) {
    return;
  }

  elements.masteryPanel.innerHTML = `
    <div class="panel-heading panel-heading--compact">
      <div>
        <p class="panel-heading__kicker">Mastery Board</p>
        <h2>Live Level Read</h2>
      </div>
      <div class="route-toolbar__meta">
        ${renderMetaTag(`${coachEngine.rewards.lockedInCount} locked in`)}
        ${renderMetaTag(`${coachEngine.rewards.masteredCount} mastered`)}
      </div>
    </div>
    <p class="summary-panel__copy">Mastery mixes route state, best percent, session quality, clears, revisit debt, and freshness. Cleared levels cool off over time, so reclaim calls stay honest.</p>
    <div class="mastery-grid">
      ${coachEngine.masteryHighlights.map((insight) => `
        <article class="mastery-card mastery-card--${insight.tier.className}">
          <div class="mastery-card__top">
            <div>
              <p class="panel-heading__kicker">${escapeHtml(typeof insight.step.number === "number" ? `${insight.step.worldLabel} / Level ${insight.step.number}` : `${insight.step.worldTitle} / Bonus`)}</p>
              <h3>${escapeHtml(insight.step.name)}</h3>
            </div>
            ${renderMasteryTag(insight)}
          </div>
          ${renderMasteryMeter(insight)}
          <div class="objective-card__tag-row">
            ${renderMetaTag(insight.statusLabel)}
            ${renderMetaTag(insight.freshness.label)}
            ${insight.bestPercent != null ? renderMetaTag(`Best ${insight.bestPercent}%`) : ""}
          </div>
          <p class="summary-panel__copy">${escapeHtml(insight.summary)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderBossPanel() {
  if (!elements.bossPanel) {
    return;
  }

  const { bossReadiness } = coachEngine;
  const prepStep = bossReadiness.prepInsight?.step || bossReadiness.boss;
  const prepTargetId = prepStep ? (typeof prepStep.number === "number" ? prepStep.anchorId : prepStep.id) : "";
  elements.bossPanel.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="panel-heading__kicker">Boss Readiness</p>
        <h2>${escapeHtml(bossReadiness.world.worldLabel)} Gate</h2>
      </div>
      <span class="status-marker ${bossReadiness.score >= 75 ? "status-marker--complete" : "status-marker--current"}">${escapeHtml(bossReadiness.label)}</span>
    </div>
    <div class="boss-panel__hero">
      <div>
        <span class="summary-panel__label">Next Boss</span>
        <strong class="reward-panel__value">${bossReadiness.score}</strong>
      </div>
      <div>
        <h3>${escapeHtml(bossReadiness.boss.name)}</h3>
        <p class="summary-panel__copy">Prep anchor: ${escapeHtml(prepStep?.name || bossReadiness.boss.name)}</p>
      </div>
    </div>
    <div class="mastery-meter boss-panel__meter" aria-hidden="true">
      <span class="mastery-meter__fill mastery-meter__fill--${bossReadiness.score >= 75 ? "mastered" : bossReadiness.score >= 60 ? "locked" : bossReadiness.score >= 40 ? "stable" : "building"}" style="width: ${bossReadiness.score}%"></span>
    </div>
    <div class="boss-panel__grid">
      <article class="training-signal">
        <div class="training-signal__top">
          <strong>Helping</strong>
          <span class="pill">${bossReadiness.helping.length}</span>
        </div>
        <ul class="boss-panel__list">
          ${bossReadiness.helping.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="training-signal">
        <div class="training-signal__top">
          <strong>Holding It Back</strong>
          <span class="pill">${bossReadiness.blockers.length}</span>
        </div>
        <ul class="boss-panel__list">
          ${bossReadiness.blockers.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
    </div>
    <div class="summary-panel__actions">
      ${renderJumpButton("Open Prep", prepTargetId, prepStep.worldId, "button button--ghost")}
      ${renderJumpButton("Open Boss", bossReadiness.boss.anchorId, bossReadiness.boss.worldId, "button button--ghost")}
    </div>
  `;
}

function renderTrainingPanel() {
  if (!elements.trainingPanel) {
    return;
  }

  const suggestedFocusLabel = PROFILE_QUESTIONS.focus.options.find((option) => option.id === trainingEngine.suggestedFocus)?.title || "Balanced";
  elements.trainingPanel.innerHTML = `
    <div class="panel-heading panel-heading--compact">
      <div>
        <p class="panel-heading__kicker">Weakness Radar</p>
        <h2>Adaptive Drill Feed</h2>
      </div>
      <span class="status-marker ${trainingEngine.engaged ? "status-marker--current" : "status-marker--locked"}">${trainingEngine.engaged ? "Adaptive" : "Waiting"}</span>
    </div>
    <p class="summary-panel__copy">${escapeHtml(trainingEngine.summary)}</p>
    <div class="training-panel__stats">
      <article class="summary-panel__item">
        <span class="summary-panel__label">Sessions Logged</span>
        <strong>${trainingEngine.totalSessions}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Tracked Levels</span>
        <strong>${trainingEngine.trackedLevels}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Late Misses</span>
        <strong>${trainingEngine.endingFailures}</strong>
      </article>
      <article class="summary-panel__item">
        <span class="summary-panel__label">Suggested Bias</span>
        <strong>${escapeHtml(suggestedFocusLabel)}</strong>
      </article>
    </div>
    ${
      trainingEngine.activeSignals.length
        ? `<div class="training-panel__signals">${trainingEngine.activeSignals.map((signal) => `
          <article class="training-signal">
            <div class="training-signal__top">
              <strong>${escapeHtml(signal.label)}</strong>
              <span class="pill">${escapeHtml(signal.intensity)}</span>
            </div>
            <p>${escapeHtml(signal.description)}</p>
            <div class="objective-card__tag-row">
              ${renderMetaTag(`Score ${signal.score.toFixed(1)}`)}
              ${renderMetaTag(`Bias ${PROFILE_QUESTIONS.focus.options.find((option) => option.id === signal.focus)?.title || "Balanced"}`)}
            </div>
          </article>
        `).join("")}</div>`
        : '<p class="training-panel__empty">No structured reps yet. Use the tracker session logger on any level and the engine will start scoring wave leaks, chokepoints, stamina, nerves, and failed endings.</p>'
    }
    <div class="training-panel__queue">
      <div class="panel-heading panel-heading--compact">
        <div>
          <p class="panel-heading__kicker">Practice Queue</p>
          <h2>Best Next Block</h2>
        </div>
      </div>
      ${
        trainingEngine.recommendations.length
          ? trainingEngine.recommendations.slice(0, 3).map((entry) => renderTrainingRecommendation(entry)).join("")
          : '<p class="training-panel__empty">The live queue will appear once you start logging sessions.</p>'
      }
    </div>
    ${
      trainingEngine.recentSessions.length
        ? `<div class="training-panel__history">
          <p class="panel-heading__kicker">Recent Sessions</p>
          <div class="session-history">${trainingEngine.recentSessions.map((session) => `
            <article class="session-history__item">
              <strong>${escapeHtml(session.level?.name || session.metaKey)}</strong>
              <span>${escapeHtml([
                TRAINING_RESULT_OPTIONS.find((option) => option.id === session.result)?.label || "Session",
                session.bestPercent != null ? `${session.bestPercent}%` : null,
                TRAINING_FAIL_POINT_OPTIONS.find((option) => option.id === session.failPoint)?.label || null,
                formatActivityTime(session.at),
              ].filter(Boolean).join(" / "))}</span>
            </article>
          `).join("")}</div>
        </div>`
        : ""
    }
  `;
}

function renderObjectiveCard() {
  const currentStep = getCurrentStep();
  const profile = currentProfile();
  const hardestLabel = getProfileOptionTitle("hardest", profile.hardest);
  const goalLabel = getProfileOptionTitle("mainGoal", profile.mainGoal);
  const focusLabel = getProfileOptionTitle("focus", profile.focus);
  const lengthLabel = getProfileOptionTitle("routeLength", profile.routeLength);
  const themeLabel = THEMES.find((theme) => theme.id === state.theme)?.label || "Arcade";
  const activeWorld = currentStep
    ? routeData.preparedWorlds[currentStep.worldIndex]
    : routeData.preparedWorlds[routeData.preparedWorlds.length - 1];
  const activeBiome = getBiomeTheme(activeWorld);
  const primarySignal = trainingEngine.primarySignal;
  const questCount = coachEngine.quests.filter((quest) => quest.complete).length;
  const currentInsight = coachEngine.currentInsight;
  const pushQuest = coachEngine.quests.find((quest) => quest.type === "push") || null;
  const currentTarget = pushQuest?.target || currentStep;
  const currentTargetInsight = pushQuest?.targetInsight || currentInsight;

  elements.objectiveCard.setAttribute("style", renderBiomeVars(activeBiome));
  elements.objectiveCard.dataset.biome = activeBiome.id;

  if (!currentStep) {
    const finalBoss = routeData.allMain[routeData.allMain.length - 1];
    elements.objectiveCard.innerHTML = `
      <div class="objective-card__header">
        <div>
          <p class="objective-card__eyebrow">Campaign Clear</p>
          <h2 class="objective-card__title">The ladder is clear. Keep the route sharp.</h2>
          <p class="objective-card__copy">
            ${escapeHtml(coachEngine.summary)}
          </p>
        </div>
        <span class="status-marker status-marker--complete">${questCount} / ${coachEngine.quests.length} quests banked</span>
      </div>
      <div class="objective-card__layout">
        <div class="objective-card__spotlight">
          <div class="objective-card__serial">#1</div>
          <div>
            <p class="objective-card__target-label">${escapeHtml(activeWorld.title)} / Final Boss Defeated</p>
            <h3 class="objective-card__target">${escapeHtml(finalBoss.name)}</h3>
            <p class="objective-card__byline">Mastery route stays alive through reclaim reps, fresh clears, and boss-ready maintenance.</p>
            ${renderMasteryMeter(coachEngine.insightByMetaKey.get(finalBoss.metaKey))}
            <div class="objective-card__tag-row">
              ${renderMasteryTag(coachEngine.insightByMetaKey.get(finalBoss.metaKey))}
              ${renderMetaTag(`Today +${coachEngine.rewards.todayXp} XP`)}
              ${renderMetaTag(`${coachEngine.rewards.trainingStreak} day streak`)}
            </div>
            <div class="objective-card__actions">
              ${renderLinkButton(finalBoss.levelUrl, "Open Final Boss", "objective-card__button")}
              ${renderLocalJumpButton("Open Quests", "quests-panel", "objective-card__button")}
              <button class="objective-card__button" type="button" data-action="open-setup">Rebuild Route</button>
            </div>
          </div>
        </div>
        <div class="objective-card__intel">
          <article class="intel-card">
            <span class="intel-card__label">Quest Chain</span>
            <strong class="intel-card__value">${questCount} / ${coachEngine.quests.length}</strong>
            <p class="intel-card__copy">Today's loop is still live even after the route clear.</p>
          </article>
          <article class="intel-card">
            <span class="intel-card__label">Boss Readiness</span>
            <strong class="intel-card__value">${coachEngine.bossReadiness.score}</strong>
            <p class="intel-card__copy">${escapeHtml(coachEngine.bossReadiness.label)} for ${escapeHtml(coachEngine.bossReadiness.boss.name)}.</p>
          </article>
          <article class="intel-card">
            <span class="intel-card__label">Momentum</span>
            <div class="objective-card__tag-row">
              ${renderMetaTag(`Level ${coachEngine.rewards.level}`)}
              ${renderMetaTag(`${coachEngine.rewards.totalXp} XP`)}
              ${renderMetaTag(`${coachEngine.rewards.masteredCount} mastered`)}
            </div>
          </article>
        </div>
      </div>
      <div class="objective-card__tag-row">
        ${renderMetaTag(routeData.routeSummary)}
        ${renderMetaTag(activeBiome.label)}
        ${renderMetaTag(`Theme ${themeLabel}`)}
        ${renderMetaTag(skillEngine.identity.title)}
        ${renderMetaTag(`${routeData.totalMain} main levels`)}
      </div>
    `;
    return;
  }

  const world = routeData.preparedWorlds[currentStep.worldIndex];
  const biome = getBiomeTheme(world);
  const worldClears = getWorldMainClears(world);
  const worldProgressPercent = world.levels.length === 0 ? 0 : (worldClears / world.levels.length) * 100;
  elements.objectiveCard.innerHTML = `
    <div class="objective-card__header">
      <div>
        <p class="objective-card__eyebrow">Mastery Loop</p>
        <h2 class="objective-card__title">Today's Run Card</h2>
        <p class="objective-card__copy">${escapeHtml(coachEngine.summary)}</p>
      </div>
      <span class="status-marker status-marker--current">${questCount} / ${coachEngine.quests.length} quests banked</span>
    </div>
    <div class="objective-card__layout">
      <div class="objective-card__spotlight">
        <div class="objective-card__serial">${currentTarget.number || "B"}</div>
        <div>
          <p class="objective-card__target-label">${escapeHtml(biome.label)} / ${escapeHtml(pushQuest?.label || "Today's Push")}</p>
          <h3 class="objective-card__target">${escapeHtml(currentTarget.name)}</h3>
          <p class="objective-card__byline">${escapeHtml(pushQuest?.reason || currentStep.reason)}</p>
          ${renderMasteryMeter(currentTargetInsight)}
          <div class="objective-card__tag-row">
            ${renderMasteryTag(currentTargetInsight)}
            ${renderMetaTag(currentTargetInsight?.freshness?.label || "Freshness pending")}
            ${currentTargetInsight?.bestPercent != null ? renderMetaTag(`Best ${currentTargetInsight.bestPercent}%`) : ""}
            ${primarySignal ? renderMetaTag(`Leak ${primarySignal.shortLabel}`) : ""}
          </div>
          <div class="objective-card__actions">
            ${renderLinkButton(currentTarget.levelUrl, "Open Push", "objective-card__button")}
            <button class="objective-card__button" type="button" data-action="jump-current">View On Path</button>
            ${currentStep ? `<button class="objective-card__button" type="button" data-action="clear-main" data-index="${currentStep.number}">Mark Cleared</button>` : ""}
          </div>
        </div>
      </div>
      <div class="objective-card__intel">
        <article class="intel-card">
          <span class="intel-card__label">Quest Chain</span>
          <strong class="intel-card__value">${questCount} / ${coachEngine.quests.length}</strong>
          <p class="intel-card__copy">${escapeHtml(world.worldLabel)} daily loop is live right now.</p>
        </article>
        <article class="intel-card">
          <span class="intel-card__label">World Progress</span>
          <strong class="intel-card__value">${worldClears} / ${world.levels.length}</strong>
          <div class="world__bar" aria-hidden="true">
            <span style="width: ${worldProgressPercent}%"></span>
          </div>
          <p class="intel-card__copy">${escapeHtml(world.gate)} / ${escapeHtml(biome.label)}</p>
        </article>
        <article class="intel-card">
          <span class="intel-card__label">Boss Window</span>
          <strong class="intel-card__value">${coachEngine.bossReadiness.score}</strong>
          <p class="intel-card__copy">${escapeHtml(coachEngine.bossReadiness.boss.name)} / ${escapeHtml(coachEngine.bossReadiness.label)}</p>
        </article>
        <article class="intel-card">
          <span class="intel-card__label">Reward Pulse</span>
          <div class="objective-card__tag-row">
            ${renderMetaTag(`Lv ${coachEngine.rewards.level}`)}
            ${renderMetaTag(`Today +${coachEngine.rewards.todayXp} XP`)}
            ${renderMetaTag(`${coachEngine.rewards.trainingStreak} day streak`)}
          </div>
          <p class="intel-card__copy">${escapeHtml(goalLabel)} route / ${escapeHtml(hardestLabel)} start / ${escapeHtml(lengthLabel)} plan</p>
        </article>
      </div>
    </div>
    <div class="objective-card__tag-row">
      ${renderMetaTag(routeData.routeSummary)}
      ${renderMetaTag(biome.label)}
      ${renderMetaTag(`Theme ${themeLabel}`)}
      ${renderMetaTag(skillEngine.identity.title)}
      ${renderMetaTag(`${goalLabel} goal`)}
      ${renderMetaTag(`Current status ${getMainStepStatusLabel(currentStep)}`)}
      ${primarySignal ? renderMetaTag(`Adaptive ${primarySignal.shortLabel}`) : ""}
      ${profile.focus !== "balanced" ? renderMetaTag(`${focusLabel} focus`) : ""}
      ${currentStep.skills.map((skill) => renderMetaTag(skill)).join("")}
    </div>
  `;
}

function renderWorldNav() {
  const currentWorld = getCurrentWorld();
  const selectedWorld = getSelectedWorld();
  elements.worldNav.innerHTML = routeData.preparedWorlds.map((world) => {
    const biome = getBiomeTheme(world);
    const mainClears = getWorldMainClears(world);
    const bonusClears = getWorldBonusClears(world);
    const progressPercent = world.levels.length === 0 ? 0 : (mainClears / world.levels.length) * 100;
    let statusLabel = "Queued";
    if (mainClears === world.levels.length) {
      statusLabel = "Done";
    } else if (world.id === currentWorld.id) {
      statusLabel = "Live";
    } else if (world.id === selectedWorld.id) {
      statusLabel = "Selected";
    } else if (mainClears > 0) {
      statusLabel = "Active";
    }

    return `
      <button
        class="world-nav__button${world.id === selectedWorld.id ? " is-active" : ""}"
        type="button"
        data-action="jump-world"
        data-world-id="${world.id}"
        style="${renderBiomeVars(biome)}"
        aria-pressed="${world.id === selectedWorld.id}"
        aria-label="Open ${escapeHtml(world.worldLabel)} ${escapeHtml(world.navTitle)}. ${mainClears} of ${world.levels.length} main levels cleared."
      >
        <span class="world-nav__index">World ${world.worldNumber}</span>
        <span class="world-nav__copy">
          <span class="world-nav__title">${escapeHtml(world.navTitle)}</span>
          <span class="world-nav__biome">${escapeHtml(biome.label)}</span>
          <span class="world-nav__meta">${mainClears}/${world.levels.length} main${world.bonusCount ? ` / ${bonusClears}/${world.bonusCount} bonus` : ""}</span>
        </span>
        <span class="world-nav__state">${escapeHtml(statusLabel)}</span>
        <span class="world-nav__bar" aria-hidden="true"><span style="width: ${progressPercent}%"></span></span>
      </button>
    `;
  }).join("");
}

function renderNode(step, world) {
  const status = getMainStepDisplayStatus(step);
  const statusLabel = getMainStepStatusLabel(step);
  const visualStatus = status === "ready" ? "current" : status === "cleared" ? "complete" : status;
  const recommendation = trainingEngine.recommendationByMetaKey.get(step.metaKey) || null;
  const aggregate = trainingEngine.byMetaKey.get(step.metaKey) || null;
  const insight = coachEngine.insightByMetaKey.get(step.metaKey) || null;

  let actions = renderLinkButton(step.levelUrl, "Open Level", "stage-card__button");
  if (status === "locked") {
    actions += renderDisabledButton("Locked", "stage-card__button");
  } else if (step.number === state.mainCleared + 1) {
    actions += `<button class="stage-card__button" type="button" data-action="clear-main" data-index="${step.number}">Mark Cleared</button>`;
  } else {
    actions += renderDisabledButton(statusLabel, "stage-card__button");
  }

  return `
    <article class="stage-card stage-card--${visualStatus}${step.isBoss ? " stage-card--boss" : ""}${recommendation ? " stage-card--priority" : ""}" id="${step.anchorId}">
      <div class="stage-card__header">
        <div class="stage-card__serial-wrap">
          <div class="stage-card__serial">${step.localNumber}</div>
          <div>
            <p class="stage-card__stage">${escapeHtml(world.worldLabel)} / Level ${step.number}</p>
            <h3 class="stage-card__title">${escapeHtml(step.name)}</h3>
            <p class="stage-card__creator">Published by ${escapeHtml(step.creator)}</p>
          </div>
        </div>
        <span class="status-marker status-marker--${status}">${escapeHtml(statusLabel)}</span>
      </div>
      <div class="stage-card__meta">
        ${renderMetaTag(step.difficulty)}
        ${renderMetaTag(`${step.stars} stars`)}
        ${renderMetaTag(step.length)}
        ${renderMetaTag(`ID ${step.levelId}`)}
        ${aggregate?.sessions ? renderMetaTag(`${aggregate.sessions} session${aggregate.sessions === 1 ? "" : "s"}`) : ""}
        ${insight ? renderMasteryTag(insight, true) : ""}
        ${insight?.freshness ? renderMetaTag(insight.freshness.label) : ""}
        ${step.placement ? renderMetaTag(step.placement) : ""}
        ${recommendation ? renderBadge(recommendation.label, "badge badge--training") : ""}
        ${step.isBoss ? renderBadge("World Boss", "badge badge--milestone") : ""}
        ${step.milestone ? renderBadge(step.milestone, "badge badge--milestone") : ""}
      </div>
      ${renderMasteryMeter(insight, true)}
      <p class="stage-card__reason">${escapeHtml(step.reason)}</p>
      ${recommendation ? `<p class="stage-card__training">${escapeHtml(recommendation.reason)}</p>` : ""}
      ${renderRouteDna(step, true)}
      ${(step.number === state.mainCleared + 1 || step.isBoss || step.milestone) ? renderRouteWhy(step, true) : ""}
      <div class="stage-card__footer">
        <div class="stage-card__skills">${step.skills.map((skill) => renderMetaTag(skill)).join("")}</div>
        <div class="stage-card__actions">${actions}</div>
      </div>
      ${renderMainTracker(step)}
    </article>
  `;
}

function renderBonusPack(pack, profile) {
  const unlocked = isBonusUnlocked(pack);
  const clearedCount = pack.steps.filter((step) => state.bonusCleared[step.id]).length;
  const recommended = profile.focus !== "balanced" && pack.steps.some((step) => matchesFocus(step, profile.focus));
  const description = unlocked ? pack.description : `${pack.description} ${pack.unlockLabel}`;

  return `
    <article class="branch-card${unlocked ? "" : " is-locked"}">
      <div class="branch-card__header">
        <div>
          <p class="branch-card__eyebrow">Optional Branch</p>
          <h3 class="branch-card__title">${escapeHtml(pack.title)}</h3>
          <p class="branch-card__description">${escapeHtml(description)}</p>
        </div>
        <div class="branch-card__meta">
          ${renderMetaTag(`${clearedCount}/${pack.steps.length} cleared`)}
          ${recommended ? renderBadge("Recommended", "badge badge--milestone") : ""}
          ${renderMetaTag(unlocked ? "Unlocked" : "Locked")}
        </div>
      </div>
      <div class="branch-card__steps">
        ${pack.steps.map((step) => {
          const stepStatus = getBonusStepDisplayStatus(step, pack);
          const stepStatusLabel = getBonusStepStatusLabel(step, pack);
          const recommendation = trainingEngine.recommendationByMetaKey.get(step.metaKey) || null;
          const aggregate = trainingEngine.byMetaKey.get(step.metaKey) || null;
          const insight = coachEngine.insightByMetaKey.get(step.metaKey) || null;
          return `
            <article class="bonus-card${recommendation ? " bonus-card--priority" : ""}" id="${step.id}">
              <div class="bonus-card__top">
                <div>
                  <p class="bonus-card__eyebrow">Bonus ${step.localNumber}</p>
                  <h4 class="bonus-card__title">${escapeHtml(step.name)}</h4>
                  <p class="bonus-card__creator">Published by ${escapeHtml(step.creator)}</p>
                </div>
                <div class="bonus-card__meta">
                  ${renderMetaTag(step.difficulty)}
                  ${renderMetaTag(step.length)}
                  ${renderMetaTag(`ID ${step.levelId}`)}
                  ${aggregate?.sessions ? renderMetaTag(`${aggregate.sessions} session${aggregate.sessions === 1 ? "" : "s"}`) : ""}
                  ${insight ? renderMasteryTag(insight, true) : ""}
                  ${insight?.freshness ? renderMetaTag(insight.freshness.label) : ""}
                  ${recommendation ? renderBadge(recommendation.label, "badge badge--training") : ""}
                  ${stepStatus === "cleared" ? renderBadge("Complete", "badge badge--milestone") : renderMetaTag(stepStatusLabel)}
                </div>
              </div>
              ${renderMasteryMeter(insight, true)}
              <p class="bonus-card__reason">${escapeHtml(step.reason)}</p>
              ${recommendation ? `<p class="stage-card__training">${escapeHtml(recommendation.reason)}</p>` : ""}
              ${renderRouteDna(step, true)}
              ${renderRouteWhy(step, true)}
              <div class="bonus-card__footer">
                <div class="bonus-card__meta">${step.skills.map((skill) => renderMetaTag(skill)).join("")}</div>
                <div class="stage-card__actions">
                  ${renderLinkButton(step.levelUrl, "Open Level", "branch-card__button")}
                  ${unlocked ? `<button class="branch-card__button" type="button" data-action="toggle-bonus" data-bonus-id="${step.id}">${stepStatus === "cleared" ? "Mark Optional" : "Mark Cleared"}</button>` : renderDisabledButton("Locked", "branch-card__button")}
                </div>
              </div>
              ${renderBonusTracker(step, pack)}
            </article>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function renderCampaign() {
  const profile = currentProfile();
  const world = getSelectedWorld();
  const mainClears = getWorldMainClears(world);
  const bonusClears = getWorldBonusClears(world);
  const isComplete = mainClears === world.levels.length;
  const isCurrent = state.mainCleared >= world.startIndex - 1 && state.mainCleared < world.endIndex;
  const biome = getBiomeTheme(world);
  const liveStep = isCurrent ? getCurrentStep() : null;
  const worldTrainingRecommendations = trainingEngine.recommendations
    .filter((entry) => entry.step.worldId === world.id)
    .slice(0, 3);
  const worldSignals = trainingEngine.activeSignals
    .filter((signal) => [...world.levels, ...world.bonusPacks.flatMap((pack) => pack.steps)]
      .some((step) => getTrainingAffinities(step)[signal.id] > 0.6))
    .slice(0, 2);
  const worldSkillRow = skillEngine.worldRows.find((entry) => entry.worldId === world.id) || null;
  const worldAlternates = skillEngine.alternates.filter((branch) => branch.step.worldId === world.id).slice(0, 2);

  let summary = "Locked until earlier worlds are finished.";
  if (world.routeRole === "warmup") {
    summary = "Warmup checkpoint generated from your onboarding answers.";
  } else if (world.routeRole === "start") {
    summary = "This is the first world chosen for your current skill level.";
  } else if (isComplete) {
    summary = `${world.worldLabel} cleared. Main route complete here; optional branches remain open.`;
  } else if (isCurrent) {
    const currentStep = getCurrentStep();
    summary = `Current objective: Level ${currentStep.number} - ${currentStep.name}.`;
  } else if (mainClears > 0) {
    summary = `${mainClears} of ${world.levels.length} main levels cleared.`;
  }

  const progressPercent = world.levels.length === 0 ? 0 : (mainClears / world.levels.length) * 100;
  const startStep = world.levels[0];
  const bossStep = world.levels[world.levels.length - 1];

  elements.campaign.innerHTML = `
    <section class="world${isCurrent ? " world--current" : ""}${isComplete ? " world--complete" : ""}" id="${world.sectionId}" style="${renderBiomeVars(biome)}" data-biome="${biome.id}">
      <header class="world__header">
        <div class="world__masthead">
          <div class="world__copy">
            <p class="world__eyebrow">${escapeHtml(world.worldLabel)} / ${escapeHtml(biome.label)}</p>
            <h2 class="world__title">${escapeHtml(world.title)}</h2>
            <p class="world__description">${escapeHtml(world.description)}</p>
            <div class="world__tag-row">
              ${renderMetaTag(biome.subtitle)}
              ${renderMetaTag(world.gate)}
              ${world.routeRole === "warmup" ? renderMetaTag("Warmup world") : ""}
              ${world.routeRole === "start" ? renderMetaTag("Starting checkpoint") : ""}
              ${isCurrent ? renderBadge("Current World", "badge badge--milestone") : ""}
              ${isComplete ? renderBadge("World Clear", "badge badge--milestone") : ""}
              ${profile.focus !== "balanced" && world.levels.some((step) => matchesFocus(step, profile.focus)) ? renderBadge("Focus Match", "badge badge--milestone") : ""}
            </div>
          </div>
          <div class="world__overview">
            <div class="world__overview-top">
              <div>
                <p class="panel-heading__kicker">World Progress</p>
                <strong class="world__overview-value">${mainClears} / ${world.levels.length}</strong>
              </div>
              <div class="world__actions">
                <span class="pill">${escapeHtml(getCurrentStep() && getCurrentWorld().id === world.id ? "Live world" : "Reference view")}</span>
              </div>
            </div>
            <div class="world__bar" aria-hidden="true">
              <span style="width: ${progressPercent}%"></span>
            </div>
            <p class="world__summary">${escapeHtml(summary)}</p>
            <div class="world__map-actions">
              ${renderJumpButton("Entry Stage", startStep.anchorId, world.id)}
              ${liveStep ? renderJumpButton("Current Target", liveStep.anchorId, world.id) : ""}
              ${renderJumpButton("Boss Gate", bossStep.anchorId, world.id)}
              ${world.bonusCount ? renderJumpButton("Bonus Lab", `bonus-${world.id}`, world.id) : ""}
            </div>
            <div class="world__tag-row">
              ${renderMetaTag(world.sourceLabel)}
              ${world.bonusCount ? renderMetaTag(`${bonusClears}/${world.bonusCount} bonus`) : renderMetaTag("No bonus branch")}
              ${renderMetaTag(`Route slots ${world.startIndex}-${world.endIndex}`)}
              <a class="pill" href="${world.sourceUrl}" target="_blank" rel="noreferrer">Research Source</a>
            </div>
          </div>
        </div>
      </header>
      <div class="world__body">
        <div class="world__grid">
          <div class="world__path">${world.levels.map((step) => renderNode(step, world)).join("")}</div>
          <aside class="world__sidebar">
            <section class="world__intel">
              <p class="world__eyebrow">World Intel</p>
              <div class="world__intel-list">
                <div class="world__intel-row">
                  <span>Biome</span>
                  <span>${escapeHtml(biome.label)}</span>
                </div>
                <div class="world__intel-row">
                  <span>Arc</span>
                  <span>${escapeHtml(world.gate)}</span>
                </div>
                <div class="world__intel-row">
                  <span>Entry Stage</span>
                  <span>${escapeHtml(startStep.name)}</span>
                </div>
                <div class="world__intel-row">
                  <span>Boss Stage</span>
                  <span>${escapeHtml(bossStep.name)}</span>
                </div>
                <div class="world__intel-row">
                  <span>Main Route</span>
                  <span>${mainClears} / ${world.levels.length}</span>
                </div>
                <div class="world__intel-row">
                  <span>Optional Clears</span>
                  <span>${world.bonusCount ? `${bonusClears} / ${world.bonusCount}` : "None"}</span>
                </div>
              </div>
            </section>
            <section class="world__intel">
              <p class="world__eyebrow">Coverage Read</p>
              ${
                worldSkillRow
                  ? `
                    <div class="world__tag-row">
                      ${worldSkillRow.highlights.slice(0, 3).map((entry) => renderBadge(entry.shortLabel, "badge badge--training")).join("")}
                    </div>
                    <div class="route-dna__bars">
                      ${worldSkillRow.highlights.slice(0, 3).map((entry) => `
                        <div class="route-dna__row">
                          <span class="route-dna__label">${escapeHtml(entry.shortLabel)}</span>
                          <div class="route-dna__track">
                            <span style="width: ${worldSkillRow.display[entry.id]}%; --skill-accent: ${entry.color};"></span>
                          </div>
                          <strong>${Math.round(worldSkillRow.display[entry.id])}</strong>
                        </div>
                      `).join("")}
                    </div>
                    <div class="world__intel-list">
                      ${worldSkillRow.alerts.map((item) => `
                        <div class="world__intel-row world__intel-row--stack">
                          <span>${escapeHtml(item)}</span>
                        </div>
                      `).join("")}
                    </div>
                  `
                  : '<p class="bonus-area__empty">Coverage data will appear once the route is built.</p>'
              }
            </section>
            <section class="world__intel world__intel--training">
              <p class="world__eyebrow">Training Read</p>
              ${
                worldSignals.length
                  ? `<div class="world__tag-row">${worldSignals.map((signal) => renderBadge(signal.shortLabel, "badge badge--training")).join("")}</div>`
                  : ""
              }
              ${
                worldTrainingRecommendations.length
                  ? `<div class="training-queue training-queue--world">${worldTrainingRecommendations.map((entry) => renderTrainingRecommendation(entry, true)).join("")}</div>`
                  : '<p class="bonus-area__empty">No hot spots in this world yet. Use it for baseline reps or keep the main climb moving.</p>'
              }
            </section>
            <section class="world__intel">
              <p class="world__eyebrow">Route Branching</p>
              ${
                worldAlternates.length
                  ? `<div class="route-analysis__alternates">${worldAlternates.map((branch) => renderRouteAlternate(branch, true)).join("")}</div>`
                  : '<p class="bonus-area__empty">No alternate branches inside this world right now. The main lane is still the cleanest path.</p>'
              }
            </section>
            ${
              world.bonusPacks.length
                ? `<section class="bonus-area" id="bonus-${world.id}"><h3 class="bonus-area__title">Optional Branches</h3><div class="bonus-area__packs">${world.bonusPacks.map((pack) => renderBonusPack(pack, profile)).join("")}</div></section>`
                : `<section class="bonus-area" id="bonus-${world.id}"><h3 class="bonus-area__title">Optional Branches</h3><p class="bonus-area__empty">This world runs as a straight climb with no bonus lab attached.</p></section>`
            }
          </aside>
        </div>
      </div>
    </section>
  `;
}

function renderHeroStats() {
  const themeLabel = THEMES.find((theme) => theme.id === state.theme)?.label || "Arcade";
  elements.metaMainCount.textContent = `${routeData.totalMain} Main Levels`;
  elements.metaBonusCount.textContent = `${routeData.totalBonus} Bonus Levels`;
  elements.metaWorldCount.textContent = `${routeData.preparedWorlds.length} Worlds`;
  elements.metaRouteMode.textContent = routeData.routeSummary;
  elements.metaThemeLabel.textContent = `Theme ${themeLabel}`;

  const progressPercent = routeData.totalMain === 0 ? 0 : (state.mainCleared / routeData.totalMain) * 100;
  const currentStep = getCurrentStep();
  elements.mainProgressFill.style.width = `${progressPercent}%`;
  elements.mainProgressLabel.textContent = `${state.mainCleared} / ${routeData.totalMain} cleared`;
  elements.mainProgressSubtext.textContent = currentStep
    ? `${routeData.routeSummary}. Next target: ${currentStep.name}.`
    : `${routeData.routeSummary}. Full route cleared through the current #1.`;
  elements.miniCurrentWorld.textContent = currentStep ? getCurrentWorld().worldLabel : "Campaign Clear";
  elements.miniWorldsCleared.textContent = `${getCompletedWorldsCount()} / ${routeData.preparedWorlds.length} cleared`;
  elements.miniBonusClears.textContent = `${getBonusClearsCount()} / ${routeData.totalBonus} bonus`;
}

function render(options = {}) {
  const { preserveSetupScroll = false, syncSetupFocusAfterRender = true } = options;
  pendingSetupScrollRestore = preserveSetupScroll ? captureSetupScrollPosition() : null;
  document.body.dataset.theme = normalizeTheme(setupOpen ? setupDraft.theme : state.theme);
  syncSetupBodyLock();
  syncPages();
  normalizeSelectedWorld();
  refreshDerivedState();
  renderHeroStats();
  renderThemeSwitcher();
  renderObjectiveCard();
  renderSkillMapPanel();
  renderCoveragePanel();
  renderCoachPanel();
  renderRewardPanel();
  renderQuestsPanel();
  renderPlannerPanel();
  renderMasteryPanel();
  renderBossPanel();
  renderTrainingPanel();
  renderWorldNav();
  renderRouteToolbar();
  renderCampaign();
  renderAuditPanel();
  renderHistoryPanel();
  renderSetupOverlay();
  if (syncSetupFocusAfterRender) {
    syncSetupFocus();
  }
  restoreSetupScrollPosition();
  syncAppBranding();
}

document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) {
    return;
  }

  const { action } = actionTarget.dataset;
  if (action === "set-page") {
    const nextPage = normalizePage(actionTarget.dataset.page);
    const didChangePage = nextPage !== currentPage;
    currentPage = nextPage;
    saveState();
    render();
    if (didChangePage) {
      window.requestAnimationFrame(() => {
        elements.mainContent?.focus({ preventScroll: true });
      });
    }
    return;
  }
  if (action === "clear-main") {
    clearMainLevel(Number.parseInt(actionTarget.dataset.index, 10));
    return;
  }
  if (action === "set-main-status") {
    setMainStepStatus(Number.parseInt(actionTarget.dataset.stepNumber, 10), actionTarget.dataset.status);
    return;
  }
  if (action === "toggle-bonus") {
    toggleBonusLevel(actionTarget.dataset.bonusId);
    return;
  }
  if (action === "set-bonus-status") {
    setBonusStepStatus(actionTarget.dataset.bonusId, actionTarget.dataset.status);
    return;
  }
  if (action === "save-note") {
    const shell = actionTarget.closest("[data-note-shell]");
    const input = shell?.querySelector(`[data-note-input="${actionTarget.dataset.levelKey}"]`);
    saveLevelNote(actionTarget.dataset.levelKey, input?.value || "", actionTarget.dataset.levelLabel || "this level");
    return;
  }
  if (action === "log-session") {
    const shell = actionTarget.closest("[data-training-shell]");
    logTrainingSession(actionTarget.dataset.metaKey, shell, actionTarget.dataset.levelLabel || "this level");
    return;
  }
  if (action === "undo-change") {
    undoLastChange();
    return;
  }
  if (action === "toggle-world") {
    toggleWorld(actionTarget.dataset.worldId);
    return;
  }
  if (action === "jump-world") {
    const world = routeData.preparedWorlds.find((entry) => entry.id === actionTarget.dataset.worldId);
    if (!world) {
      return;
    }
    currentPage = "route";
    focusWorld(world.id);
    saveState();
    render();
    window.requestAnimationFrame(() => jumpToElement(world.sectionId));
    return;
  }
  if (action === "jump-node") {
    const { worldId, targetId } = actionTarget.dataset;
    if (worldId) {
      currentPage = "route";
      focusWorld(worldId);
      saveState();
      render();
      window.requestAnimationFrame(() => jumpToElement(targetId));
      return;
    }
    jumpToElement(targetId);
    return;
  }
  if (action === "jump-current") {
    revealCurrentNodeAndScroll();
    return;
  }
  if (action === "set-theme") {
    applyTheme(actionTarget.dataset.theme);
    recordActivity(`Changed theme to ${THEMES.find((theme) => theme.id === state.theme)?.label || "custom"}.`);
    saveState();
    render();
    return;
  }
  if (action === "set-session-mode") {
    state.coach.sessionMode = normalizeSessionMode(actionTarget.dataset.mode);
    saveState();
    render();
    return;
  }
  if (action === "open-setup") {
    openSetup();
    return;
  }
  if (action === "close-setup") {
    closeSetup();
    return;
  }
  if (action === "setup-select") {
    const field = actionTarget.dataset.field;
    const value = actionTarget.dataset.value;
    if (field === "theme") {
      setupDraft.theme = normalizeTheme(value);
      document.body.dataset.theme = setupDraft.theme;
    } else if (field in DEFAULT_PROFILE) {
      setupDraft[field] = value;
    }
    render({ preserveSetupScroll: true, syncSetupFocusAfterRender: false });
    return;
  }
  if (action === "setup-back") {
    setupStep = clamp(setupStep - 1, 0, SETUP_STEPS.length - 1);
    render({ preserveSetupScroll: true, syncSetupFocusAfterRender: false });
    return;
  }
  if (action === "setup-next") {
    setupStep = clamp(setupStep + 1, 0, SETUP_STEPS.length - 1);
    render({ preserveSetupScroll: true, syncSetupFocusAfterRender: false });
    return;
  }
  if (action === "setup-finish") {
    pushUndoSnapshot();
    state.profile = {
      hardest: setupDraft.hardest,
      mainGoal: setupDraft.mainGoal,
      focus: setupDraft.focus,
      routeLength: setupDraft.routeLength,
    };
    applyTheme(setupDraft.theme);
    rebuildRoute(true);
    focusWorld(getDefaultSelectedWorldId(routeData.preparedWorlds, state.mainCleared));
    setupOpen = false;
    setupStep = 0;
    recordActivity("Rebuilt the route from Journey Builder.");
    saveState();
    render();
    showToast("Custom journey updated.");
    return;
  }
});

elements.exportSave.addEventListener("click", downloadSave);
elements.importSave.addEventListener("click", () => importInput.click());
elements.resetSave.addEventListener("click", resetProgress);
elements.retakeSetup.addEventListener("click", openSetup);
elements.installApp?.addEventListener("click", () => {
  void promptInstall();
});

document.addEventListener("input", (event) => {
  if (event.target instanceof HTMLInputElement && event.target.id === "route-search") {
    routeSearchQuery = event.target.value;
    shouldRefocusRouteSearch = true;
    routeSearchSelectionStart = event.target.selectionStart;
    routeSearchSelectionEnd = event.target.selectionEnd;
    renderRouteToolbar();
  }
});

document.addEventListener("keydown", (event) => {
  handleSetupKeydown(event);
});

importInput.addEventListener("change", async (event) => {
  const [file] = event.target.files || [];
  importInput.value = "";
  if (!file) {
    return;
  }
  const text = await file.text();
  importSaveFromText(text);
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  syncInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  syncInstallButton();
  showToast(`${APP_NAME} installed.`);
});

window.addEventListener("popstate", () => {
  const nextUrlState = readUrlState();
  currentPage = nextUrlState.page || state.page || "overview";
  if (routeData.preparedWorlds.some((world) => world.id === nextUrlState.worldId)) {
    state.selectedWorldId = nextUrlState.worldId;
  }
  render();
});

registerAppShell();
render();
