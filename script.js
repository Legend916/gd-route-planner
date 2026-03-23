const SAVE_VERSION = "path-to-1-v6";
const LEGACY_SAVE_VERSIONS = new Set(["path-to-1-v4", "path-to-1-v5", SAVE_VERSION]);
const ROUTE_VERSION = "4.0";
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
      { id: "new-player", title: "New Player", description: "I am still learning online levels and first demons." },
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
  "easy-demon": 1,
  "medium-demon": 3,
  "hard-demon": 4,
  "insane-demon": 5,
  "extreme-demon": 6,
  "list-ready": 8,
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

function levelMeta(name, creator, levelId, difficulty, stars, length) {
  return {
    name,
    creator,
    levelId,
    difficulty,
    stars,
    length,
    levelUrl: `https://gdbrowser.com/${levelId}`,
  };
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

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const LEVEL_META = {
  darkParadise: levelMeta("Dark Paradise", "Roli GD", 11280109, "Easy", 2, "Long"),
  amplification: levelMeta("Amplification", "Berkoo", 20635816, "Hard", 5, "Long"),
  slam: levelMeta("Slam", "XronoM", 22018994, "Harder", 7, "Long"),
  fireAura: levelMeta("Fire Aura", "Sumsar", 4243988, "Harder", 7, "Long"),
  dreamFlower: levelMeta("Dream flower", "Xender Game", 65227464, "Easy Demon", 10, "XL"),
  rutaDelSol: levelMeta("Ruta del Sol", "TroxxP1", 83323273, "Easy Demon", 10, "XL"),
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
    id: "browser-foundations",
    navTitle: "Foundations",
    title: "Browser Foundations",
    gate: "Starter Arc",
    description:
      "Start on real rated online levels before the first demon gate. This world teaches movement control without throwing new players straight into legacy demons.",
    sourceLabel: "Exact level pages verified on GDBrowser",
    sourceUrl: "https://gdbrowser.com/",
    levels: [
      mainStep("darkParadise", "Start with simple cube flow and low-pressure online level pacing.", ["Cube pacing", "Jump timing"]),
      mainStep("amplification", "Bridge into longer harder gameplay and cleaner rhythm-based clicks.", ["Rhythm control", "Consistency"]),
      mainStep("slam", "Sharpen ship control and quick click changes on safer terrain.", ["Ship control", "Micro-adjustments"]),
      mainStep("fireAura", "Classic harder gauntlet that rewards steadier timings and composure.", ["Timings", "Nerve control"]),
      mainStep("dreamFlower", "First approachable easy demon with flow-heavy modern gameplay.", ["Flow control", "Long-form focus"]),
      mainStep("rutaDelSol", "World boss: finish the warmup arc with an XL easy demon run.", ["Demon stamina", "Consistency"], { milestone: "Starter world clear" }),
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
  "browser-foundations": ["darkParadise", "amplification", "slam", "fireAura", "dreamFlower", "rutaDelSol"],
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
    activityLog: [],
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

      baseState.activityLog = normalizeActivityLog(raw?.activityLog);
      baseState.page = normalizePage(raw?.page);
      baseState.selectedWorldId = routeData.preparedWorlds.some((world) => world.id === raw?.selectedWorldId)
        ? raw.selectedWorldId
        : getDefaultSelectedWorldId(routeData.preparedWorlds, baseState.mainCleared);
    } else {
      baseState.selectedWorldId = getDefaultSelectedWorldId(routeData.preparedWorlds, baseState.mainCleared);
    }
  } catch (error) {
    routeData = buildRouteData(DEFAULT_PROFILE);
    baseState.selectedWorldId = getDefaultSelectedWorldId(routeData.preparedWorlds, 0);
  }

  return baseState;
}

let state = loadState();
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
    navigator.serviceWorker.register("sw.js").catch(() => {});
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
  if (!window.confirm("Reset campaign progress for the current custom route?")) {
    return;
  }
  pushUndoSnapshot();
  state.mainCleared = 0;
  state.bonusCleared = {};
  state.mainStepStatus = {};
  state.bonusStepStatus = {};
  state.levelNotes = {};
  focusWorld(getDefaultSelectedWorldId(routeData.preparedWorlds, state.mainCleared));
  recordActivity("Reset route progress, notes, and tracker states.");
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

function renderMainTracker(step) {
  const levelKey = getMainLevelKey(step.number);
  const status = getMainStepDisplayStatus(step);
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
        <span class="pill">${escapeHtml(getMainStepStatusLabel(step))}</span>
      </div>
      <p class="tracker-panel__copy">${escapeHtml(copy)}</p>
      ${options.length ? renderStatusPicker(options, status, "set-main-status", "data-step-number", step.number) : ""}
      ${renderNoteEditor(levelKey, step.name)}
    </section>
  `;
}

function renderBonusTracker(step, pack) {
  const status = getBonusStepDisplayStatus(step, pack);
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
        <span class="pill">${escapeHtml(getBonusStepStatusLabel(step, pack))}</span>
      </div>
      <p class="tracker-panel__copy">${escapeHtml(copy)}</p>
      ${options.length ? renderStatusPicker(options, status, "set-bonus-status", "data-bonus-id", step.id) : ""}
      ${renderNoteEditor(step.id, step.name)}
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
        subtitle: `${step.creator} • ${step.difficulty} • ${step.worldLabel}`,
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
        subtitle: `${step.creator} • ${step.difficulty} • ${step.worldTitle}`,
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

  elements.routeToolbar.innerHTML = `
    <div class="route-toolbar__top">
      <div>
        <p class="panel-heading__kicker">Route Workspace</p>
        <h2 class="route-toolbar__title">${escapeHtml(selectedWorld.worldLabel)}: ${escapeHtml(selectedWorld.title)}</h2>
        <p class="route-toolbar__copy">
          One world at a time, with quick jump, tracker controls, notes, and research context in the same place.
        </p>
      </div>
      <div class="route-toolbar__meta">
        ${renderMetaTag(`${getWorldMainClears(selectedWorld)} / ${selectedWorld.levels.length} main`)}
        ${renderMetaTag(`${getWorldBonusClears(selectedWorld)} / ${selectedWorld.bonusCount} bonus`)}
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

  elements.objectiveCard.setAttribute("style", renderBiomeVars(activeBiome));
  elements.objectiveCard.dataset.biome = activeBiome.id;

  if (!currentStep) {
    const finalBoss = routeData.allMain[routeData.allMain.length - 1];
    elements.objectiveCard.innerHTML = `
      <div class="objective-card__header">
        <div>
          <p class="objective-card__eyebrow">Campaign Complete</p>
          <h2 class="objective-card__title">Route cleared through the current #1.</h2>
          <p class="objective-card__copy">
            ${escapeHtml(routeData.routeSummary)}. Bonus progress: ${getBonusClearsCount()} / ${routeData.totalBonus}. Use Journey Builder to spin up a different route whenever you want another grind.
          </p>
        </div>
        <span class="status-marker status-marker--complete">${escapeHtml(activeBiome.label)} Clear</span>
      </div>
      <div class="objective-card__layout">
        <div class="objective-card__spotlight">
          <div class="objective-card__serial">#1</div>
          <div>
            <p class="objective-card__target-label">${escapeHtml(activeWorld.title)} / Final Boss Defeated</p>
            <h3 class="objective-card__target">${escapeHtml(finalBoss.name)}</h3>
            <p class="objective-card__byline">Published by ${escapeHtml(finalBoss.creator)}</p>
            <div class="objective-card__actions">
              ${renderLinkButton(finalBoss.levelUrl, "Open Final Boss", "objective-card__button")}
              <button class="objective-card__button" type="button" data-action="open-setup">Rebuild Route</button>
            </div>
          </div>
        </div>
        <div class="objective-card__intel">
          <article class="intel-card">
            <span class="intel-card__label">Cleared Biome</span>
            <strong class="intel-card__value">${escapeHtml(activeBiome.label)}</strong>
            <p class="intel-card__copy">${escapeHtml(activeBiome.subtitle)}</p>
          </article>
          <article class="intel-card">
            <span class="intel-card__label">Campaign Stats</span>
            <strong class="intel-card__value">${routeData.totalMain} main / ${routeData.totalBonus} bonus</strong>
            <p class="intel-card__copy">${getCompletedWorldsCount()} of ${routeData.preparedWorlds.length} worlds cleared.</p>
          </article>
          <article class="intel-card">
            <span class="intel-card__label">Run Summary</span>
            <div class="objective-card__tag-row">
              ${renderMetaTag(routeData.routeSummary)}
              ${renderMetaTag(`Theme ${themeLabel}`)}
              ${renderMetaTag(`Bonus ${getBonusClearsCount()} / ${routeData.totalBonus}`)}
            </div>
          </article>
        </div>
      </div>
      <div class="objective-card__tag-row">
        ${renderMetaTag(routeData.routeSummary)}
        ${renderMetaTag(activeBiome.label)}
        ${renderMetaTag(`Theme ${themeLabel}`)}
        ${renderMetaTag(`${routeData.totalMain} main levels`)}
      </div>
    `;
    return;
  }

  const world = routeData.preparedWorlds[currentStep.worldIndex];
  const biome = getBiomeTheme(world);
  const worldClears = getWorldMainClears(world);
  const worldProgressPercent = world.levels.length === 0 ? 0 : (worldClears / world.levels.length) * 100;
  const remainingMain = routeData.totalMain - state.mainCleared;
  elements.objectiveCard.innerHTML = `
    <div class="objective-card__header">
      <div>
        <p class="objective-card__eyebrow">Current Target</p>
        <h2 class="objective-card__title">${escapeHtml(currentStep.name)}</h2>
        <p class="objective-card__copy">${escapeHtml(currentStep.reason)}</p>
      </div>
      <span class="status-marker status-marker--current">${escapeHtml(world.worldLabel)} / ${escapeHtml(currentStep.difficulty)}</span>
    </div>
    <div class="objective-card__layout">
      <div class="objective-card__spotlight">
        <div class="objective-card__serial">${currentStep.number}</div>
        <div>
          <p class="objective-card__target-label">${escapeHtml(biome.label)} / Stage ${currentStep.localNumber}</p>
          <h3 class="objective-card__target">${escapeHtml(currentStep.name)}</h3>
          <p class="objective-card__byline">Published by ${escapeHtml(currentStep.creator)}</p>
          <div class="objective-card__actions">
            ${renderLinkButton(currentStep.levelUrl, "Open Level", "objective-card__button")}
            <button class="objective-card__button" type="button" data-action="jump-current">View On Path</button>
            <button class="objective-card__button" type="button" data-action="clear-main" data-index="${currentStep.number}">Mark Cleared</button>
          </div>
        </div>
      </div>
      <div class="objective-card__intel">
        <article class="intel-card">
          <span class="intel-card__label">World Progress</span>
          <strong class="intel-card__value">${worldClears} / ${world.levels.length}</strong>
          <div class="world__bar" aria-hidden="true">
            <span style="width: ${worldProgressPercent}%"></span>
          </div>
          <p class="intel-card__copy">${escapeHtml(world.gate)} / ${escapeHtml(biome.label)}</p>
        </article>
        <article class="intel-card">
          <span class="intel-card__label">Route Build</span>
          <strong class="intel-card__value">${escapeHtml(goalLabel)}</strong>
          <p class="intel-card__copy">${escapeHtml(hardestLabel)} start / ${escapeHtml(focusLabel)} focus / ${escapeHtml(lengthLabel)} route</p>
        </article>
        <article class="intel-card">
          <span class="intel-card__label">Level Intel</span>
          <div class="objective-card__tag-row">
            ${renderMetaTag(currentStep.difficulty)}
            ${renderMetaTag(currentStep.length)}
            ${renderMetaTag(`${currentStep.stars} stars`)}
            ${renderMetaTag(`ID ${currentStep.levelId}`)}
            ${renderMetaTag(`Tracker ${getMainStepStatusLabel(currentStep)}`)}
            ${currentStep.placement ? renderMetaTag(currentStep.placement) : ""}
            ${currentStep.milestone ? renderBadge(currentStep.milestone, "badge badge--milestone") : ""}
          </div>
        </article>
      </div>
    </div>
    <div class="objective-card__tag-row">
      ${renderMetaTag(routeData.routeSummary)}
      ${renderMetaTag(biome.label)}
      ${renderMetaTag(`Theme ${themeLabel}`)}
      ${renderMetaTag(`${remainingMain} main clears left`)}
      ${renderMetaTag(`${goalLabel} goal`)}
      ${renderMetaTag(`Current status ${getMainStepStatusLabel(currentStep)}`)}
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

  let actions = renderLinkButton(step.levelUrl, "Open Level", "stage-card__button");
  if (status === "locked") {
    actions += renderDisabledButton("Locked", "stage-card__button");
  } else if (step.number === state.mainCleared + 1) {
    actions += `<button class="stage-card__button" type="button" data-action="clear-main" data-index="${step.number}">Mark Cleared</button>`;
  } else {
    actions += renderDisabledButton(statusLabel, "stage-card__button");
  }

  return `
    <article class="stage-card stage-card--${visualStatus}${step.isBoss ? " stage-card--boss" : ""}" id="${step.anchorId}">
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
        ${step.placement ? renderMetaTag(step.placement) : ""}
        ${step.isBoss ? renderBadge("World Boss", "badge badge--milestone") : ""}
        ${step.milestone ? renderBadge(step.milestone, "badge badge--milestone") : ""}
      </div>
      <p class="stage-card__reason">${escapeHtml(step.reason)}</p>
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
          return `
            <article class="bonus-card" id="${step.id}">
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
                  ${stepStatus === "cleared" ? renderBadge("Complete", "badge badge--milestone") : renderMetaTag(stepStatusLabel)}
                </div>
              </div>
              <p class="bonus-card__reason">${escapeHtml(step.reason)}</p>
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

function render() {
  document.body.dataset.theme = normalizeTheme(setupOpen ? setupDraft.theme : state.theme);
  syncPages();
  normalizeSelectedWorld();
  renderHeroStats();
  renderThemeSwitcher();
  renderObjectiveCard();
  renderWorldNav();
  renderRouteToolbar();
  renderCampaign();
  renderAuditPanel();
  renderHistoryPanel();
  renderSetupOverlay();
  syncSetupFocus();
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
    currentPage = "route";
    if (worldId) {
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
    render();
    return;
  }
  if (action === "setup-back") {
    setupStep = clamp(setupStep - 1, 0, SETUP_STEPS.length - 1);
    render();
    return;
  }
  if (action === "setup-next") {
    setupStep = clamp(setupStep + 1, 0, SETUP_STEPS.length - 1);
    render();
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
