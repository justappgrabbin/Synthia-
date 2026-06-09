// Geonatal Chart Sentence Generator (TypeScript)
// Gate.Line.Color.Tone.Base lookup system

export interface Coordinate {
  gate: number;
  line: number;
  color: number;
  tone: number;
  base: number;
}

export interface GateData {
  name: string;
  theme: string;
  keynote: string;
}

export interface LineData {
  name: string;
  archetype: string;
  theme: string;
  quality: string;
  sentence_fragment: string;
}

export interface ColorData {
  name: string;
  driver: string;
  motivation: string;
}

export interface ToneData {
  name: string;
  sense: string;
  cognition: string;
}

export interface BaseData {
  name: string;
  geometry: string;
  principle: string;
}

export const GATES: Record<number, GateData> = {
  1: { name: "The Creative", theme: "Self-Expression", keynote: "Purpose" },
  2: { name: "The Receptive", theme: "Orientation", keynote: "Direction" },
  3: { name: "Difficulty at the Beginning", theme: "Ordering", keynote: "Innovation" },
  4: { name: "Youthful Folly", theme: "Formulization", keynote: "Answers" },
  5: { name: "Waiting", theme: "Fixed Rhythms", keynote: "Habits" },
  6: { name: "Conflict", theme: "Friction", keynote: "Intimacy" },
  7: { name: "The Army", theme: "Interaction", keynote: "Leadership" },
  8: { name: "Holding Together", theme: "Contribution", keynote: "Fulfillment" },
  9: { name: "Taming Power of the Small", theme: "Focus", keynote: "Detail" },
  10: { name: "Treading", theme: "Behavior of the Self", keynote: "Love" },
  11: { name: "Peace", theme: "Ideas", keynote: "Education" },
  12: { name: "Standstill", theme: "Caution", keynote: "Articulation" },
  13: { name: "Fellowship", theme: "The Listener", keynote: "Secrets" },
  14: { name: "Possession in Great Measure", theme: "Power Skills", keynote: "Prosperity" },
  15: { name: "Modesty", theme: "Extremes", keynote: "Rhythm" },
  16: { name: "Enthusiasm", theme: "Skills", keynote: "Talent" },
  17: { name: "Following", theme: "Opinion", keynote: "Service" },
  18: { name: "Work on the Decayed", theme: "Correction", keynote: "Patterns" },
  19: { name: "Approach", theme: "Wanting", keynote: "Sensitivity" },
  20: { name: "Contemplation", theme: "The Now", keynote: "Awareness" },
  21: { name: "Biting Through", theme: "Effort", keynote: "Control" },
  22: { name: "Grace", theme: "Openness", keynote: "Mood" },
  23: { name: "Splitting Apart", theme: "Assimilation", keynote: "Explanation" },
  24: { name: "Return", theme: "Rationalization", keynote: "Silence" },
  25: { name: "Innocence", theme: "Spirit of Self", keynote: "Love" },
  26: { name: "Taming Power of the Great", theme: "Egoist", keynote: "Willpower" },
  27: { name: "Nourishment", theme: "Caring", keynote: "Responsibility" },
  28: { name: "Preponderance of the Great", theme: "The Game Player", keynote: "Purpose" },
  29: { name: "The Abysmal", theme: "Commitment", keynote: "Perseverance" },
  30: { name: "The Clinging Fire", theme: "Feeling", keynote: "Recognition" },
  31: { name: "Influence", theme: "Leading", keynote: "Influence" },
  32: { name: "Duration", theme: "Continuity", keynote: "Conservation" },
  33: { name: "Retreat", theme: "Privacy", keynote: "Memory" },
  34: { name: "Power of the Great", theme: "Power", keynote: "Strength" },
  35: { name: "Progress", theme: "Change", keynote: "Experience" },
  36: { name: "Darkening of the Light", theme: "Crisis", keynote: "Survival" },
  37: { name: "The Family", theme: "Friendship", keynote: "Equality" },
  38: { name: "Opposition", theme: "The Fighter", keynote: "Individuality" },
  39: { name: "Obstruction", theme: "Provocation", keynote: "Emoting" },
  40: { name: "Deliverance", theme: "Aloneness", keynote: "Resolve" },
  41: { name: "Decrease", theme: "Contraction", keynote: "Fantasy" },
  42: { name: "Increase", theme: "Growth", keynote: "Expansion" },
  43: { name: "Breakthrough", theme: "Insight", keynote: "Structure" },
  44: { name: "Coming to Meet", theme: "Alertness", keynote: "Memory" },
  45: { name: "Gathering Together", theme: "The Gatherer", keynote: "Dominance" },
  46: { name: "Pushing Upward", theme: "Determination", keynote: "Embodiment" },
  47: { name: "Oppression", theme: "Realization", keynote: "Understanding" },
  48: { name: "The Well", theme: "Depth", keynote: "Contribution" },
  49: { name: "Revolution", theme: "Principles", keynote: "Revolution" },
  50: { name: "The Cauldron", theme: "Values", keynote: "Responsibility" },
  51: { name: "The Arousing", theme: "Shock", keynote: "Initiative" },
  52: { name: "Keeping Still", theme: "Inaction", keynote: "Stillness" },
  53: { name: "Development", theme: "Beginnings", keynote: "Evolution" },
  54: { name: "The Marrying Maiden", theme: "Ambition", keynote: "Aspiration" },
  55: { name: "Abundance", theme: "Spirit", keynote: "Freedom" },
  56: { name: "The Wanderer", theme: "Stimulation", keynote: "Transitoriness" },
  57: { name: "The Gentle", theme: "Intuitive Clarity", keynote: "Penetration" },
  58: { name: "The Joyous", theme: "Vitality", keynote: "Joy" },
  59: { name: "Dispersion", theme: "Sexuality", keynote: "Intimacy" },
  60: { name: "Limitation", theme: "Acceptance", keynote: "Mutation" },
  61: { name: "Inner Truth", theme: "Mystery", keynote: "Knowledge" },
  62: { name: "Preponderance of the Small", theme: "Detail", keynote: "Process" },
  63: { name: "After Completion", theme: "Doubt", keynote: "Scrutiny" },
  64: { name: "Before Completion", theme: "Confusion", keynote: "Imaginative" },
};

export const LINES: Record<number, LineData> = {
  1: {
    name: "Foundation / Introspection",
    archetype: "Investigator",
    theme: "Security through knowledge",
    quality: "Authoritarian",
    sentence_fragment: "through foundational knowing"
  },
  2: {
    name: "Projection / Natural Genius",
    archetype: "Hermit",
    theme: "Natural ability, called out",
    quality: "Democratic",
    sentence_fragment: "through natural gift"
  },
  3: {
    name: "Adaptation / Trial and Error",
    archetype: "Martyr",
    theme: "Learning through experience",
    quality: "Anarchist",
    sentence_fragment: "through experimentation"
  },
  4: {
    name: "Externalization / Fixed Networks",
    archetype: "Opportunist",
    theme: "Community connection",
    quality: "Abdicator",
    sentence_fragment: "through community bonds"
  },
  5: {
    name: "Universalization / Practical Solutions",
    archetype: "Heretic",
    theme: "Universal application",
    quality: "General",
    sentence_fragment: "through universal solutions"
  },
  6: {
    name: "Transition / Role Model",
    archetype: "Administrator",
    theme: "Wisdom through experience",
    quality: "Objective",
    sentence_fragment: "through transcendent wisdom"
  }
};

export const COLORS: Record<number, ColorData> = {
  1: { name: "Fear", driver: "Survival and protection", motivation: "To survive and protect" },
  2: { name: "Hope", driver: "Possibility seeking", motivation: "To seek possibility" },
  3: { name: "Desire", driver: "Attainment", motivation: "To attain and possess" },
  4: { name: "Need", driver: "Fulfillment", motivation: "To fulfill requirements" },
  5: { name: "Guilt", driver: "Correction", motivation: "To atone and correct" },
  6: { name: "Innocence", driver: "Purity", motivation: "To remain untainted" }
};

export const TONES: Record<number, ToneData> = {
  1: { name: "Smell", sense: "Survival instinct", cognition: "Primal awareness" },
  2: { name: "Taste", sense: "Discrimination", cognition: "Selective perception" },
  3: { name: "Touch", sense: "Boundary awareness", cognition: "Physical knowing" },
  4: { name: "Outer Vision", sense: "Pattern recognition", cognition: "Visual processing" },
  5: { name: "Feeling", sense: "Empathic resonance", cognition: "Emotional intelligence" },
  6: { name: "Light/Inner Vision", sense: "Direct knowing", cognition: "Intuitive clarity" }
};

export const BASES: Record<number, BaseData> = {
  1: { name: "Unity/Sphere", geometry: "Singularity", principle: "Wholeness" },
  2: { name: "Duality/Binary", geometry: "Polarity", principle: "Opposition and balance" },
  3: { name: "Trinity/Triangle", geometry: "Synthesis", principle: "Integration" },
  4: { name: "Stability/Square", geometry: "Foundation", principle: "Structure and order" },
  5: { name: "Movement/Pentagon", geometry: "Flow", principle: "Evolution and change" }
};

export function degreeToCoordinate(degree: number): Coordinate {
  const normalized = ((degree % 360) + 360) % 360;
  
  const gateSize = 360 / 64;
  const gate = Math.floor(normalized / gateSize) + 1;
  
  const lineSize = gateSize / 6;
  const lineOffset = normalized % gateSize;
  const line = Math.floor(lineOffset / lineSize) + 1;
  
  const colorSize = lineSize / 6;
  const colorOffset = lineOffset % lineSize;
  const color = Math.floor(colorOffset / colorSize) + 1;
  
  const toneSize = colorSize / 6;
  const toneOffset = colorOffset % colorSize;
  const tone = Math.floor(toneOffset / toneSize) + 1;
  
  const baseSize = toneSize / 5;
  const baseOffset = toneOffset % toneSize;
  const base = Math.floor(baseOffset / baseSize) + 1;
  
  return { gate, line, color, tone, base };
}

export function generateSentence(
  coord: Coordinate,
  style: 'full' | 'mystical' | 'scientific' | 'fragment' = 'full'
): string {
  const gateData = GATES[coord.gate];
  const lineData = LINES[coord.line];
  const colorData = COLORS[coord.color];
  const toneData = TONES[coord.tone];
  const baseData = BASES[coord.base];

  if (!gateData || !lineData || !colorData || !toneData || !baseData) {
    throw new Error('Invalid coordinate values');
  }

  const coordStr = `${coord.gate}.${coord.line}.${coord.color}.${coord.tone}.${coord.base}`;

  switch (style) {
    case 'full':
      return `Through Gate ${coord.gate} of ${gateData.name}, I express ${gateData.keynote} ${lineData.sentence_fragment}, motivated by ${colorData.name.toLowerCase()}, sensed through ${toneData.name.toLowerCase()}, and rooted in ${baseData.geometry.toLowerCase()}`;
    
    case 'mystical':
      return `Gate ${coord.gate} (${gateData.name}) expressing ${gateData.keynote} ${lineData.sentence_fragment}, motivated by ${colorData.name.toLowerCase()}, sensed through ${toneData.name.toLowerCase()}, rooted in ${baseData.geometry.toLowerCase()}`;
    
    case 'scientific':
      return `Coordinate ${coordStr} → Gate ${coord.gate} hexagram (${gateData.theme}) manifests through Line ${coord.line} (${lineData.archetype}) behavioral pattern, driven by Color ${coord.color} (${colorData.name}) motivation field, filtered via Tone ${coord.tone} (${toneData.name}) sensory channel, anchored in Base ${coord.base} (${baseData.name}) geometric foundation`;
    
    case 'fragment':
      return `${lineData.sentence_fragment}, motivated by ${colorData.name.toLowerCase()}, sensed through ${toneData.name.toLowerCase()}, rooted in ${baseData.geometry.toLowerCase()}`;
    
    default:
      return generateSentence(coord, 'full');
  }
}
