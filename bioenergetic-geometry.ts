/**
 * BIOENERGETIC GEOMETRY ENGINE
 * Complete Element-Codon-Shape-Field Architecture
 * 
 * The Rosetta Stone connecting:
 * - DNA codons (genetic code)
 * - Chemical elements (material substrate)
 * - Geometric patterns (structural templates)
 * - Field perception (consciousness filters)
 * 
 * This is THE CORE LOGIC for GAN/LLM field-aware generation
 */

export interface FieldPerception {
  frequency: number;
  cycle: number | null;
  astrology: string;
  dimension: string;
  perception_style: string;
  visual_palette: string;
  linguistic_tone: string;
  color_range: string;
  geometry_preference: string;
}

export const FIELD_PERCEPTION: Record<string, FieldPerception> = {
  Body: {
    frequency: 1.0,
    cycle: 12,
    astrology: "Tropical",
    dimension: "3D",
    perception_style: "Physical form, material structure",
    visual_palette: "Solid shapes, textures, physical objects",
    linguistic_tone: "Concrete, sensory, embodied",
    color_range: "Earth tones, warm solids",
    geometry_preference: "Polyhedra, crystals, physical structures"
  },
  Mind: {
    frequency: 1.33,
    cycle: 16,
    astrology: "Sidereal",
    dimension: "4-5D",
    perception_style: "Symbolic, conceptual, archetypal",
    visual_palette: "Sacred geometry, patterns, symbols",
    linguistic_tone: "Analytical, metaphorical, structural",
    color_range: "Cool blues, purples, silver",
    geometry_preference: "Sacred geometry, Platonic solids, mandalas"
  },
  Heart: {
    frequency: 3.33,
    cycle: 40,
    astrology: "Draconic",
    dimension: "6-9D",
    perception_style: "Energetic, emotional, relational",
    visual_palette: "Fractals, light codes, dynamic flows",
    linguistic_tone: "Poetic, feeling-centered, connective",
    color_range: "Warm golds, magentas, rainbow spectrum",
    geometry_preference: "Star tetrahedrons, merkabas, spirals"
  },
  Soul: {
    frequency: 5.0,
    cycle: null,
    astrology: "Harmonic",
    dimension: "7-9D",
    perception_style: "Waveform resonance, vibrational",
    visual_palette: "Standing waves, interference patterns, pulses",
    linguistic_tone: "Rhythmic, vibrational, harmonic",
    color_range: "Translucent, iridescent, shifting",
    geometry_preference: "Sine waves, Lissajous figures, harmonics"
  },
  Spirit: {
    frequency: 8.0,
    cycle: null,
    astrology: "Galactic",
    dimension: "8-9D",
    perception_style: "Sacred harmonics, transcendent",
    visual_palette: "Mandalas, fractals, light geometries",
    linguistic_tone: "Universal, archetypal, transcendent",
    color_range: "Pure white, gold, celestial blues",
    geometry_preference: "Sri Yantra, Metatron's Cube, cosmic mandalas"
  },
  Shadow: {
    frequency: 0,
    cycle: null,
    astrology: "",
    dimension: "Distorted 3D",
    perception_style: "Inverted, contracted, distorted",
    visual_palette: "Twisted forms, voids, broken patterns",
    linguistic_tone: "Defensive, contracted, protective",
    color_range: "Muted, murky, browns, grays",
    geometry_preference: "Broken shapes, inverted forms, jagged edges"
  },
  Light: {
    frequency: 0,
    cycle: null,
    astrology: "",
    dimension: "Reflective",
    perception_style: "Reflective, clarifying, illuminating",
    visual_palette: "Mirrors, lenses, prisms, radiance",
    linguistic_tone: "Clear, direct, illuminating",
    color_range: "Bright whites, clear colors, prisms",
    geometry_preference: "Mirrors, lenses, refractive forms"
  },
  Void: {
    frequency: 0.0,
    cycle: null,
    astrology: "",
    dimension: "Non-dimensional",
    perception_style: "Emptiness, silence, potential",
    visual_palette: "Empty space, darkness, stillness",
    linguistic_tone: "Silent, spacious, minimal",
    color_range: "Black, transparent, absence of color",
    geometry_preference: "Empty space, points, silence"
  },
  Unity: {
    frequency: Infinity,
    cycle: 1,
    astrology: "All systems unified",
    dimension: "All dimensions (9D hypercube)",
    perception_style: "All-pattern and no-pattern simultaneously",
    visual_palette: "Everything and nothing, paradox",
    linguistic_tone: "Paradoxical, transcendent, unified",
    color_range: "All colors and no color",
    geometry_preference: "Hypercube, infinite tessellation, all forms"
  }
};

export interface ElementShapePerception {
  shape: string;
  description: string;
  gan_prompt: string;
  llm_tone: string;
}

export interface ElementArchitecture {
  name: string;
  atomic_number: number;
  body_percentage: string;
  biological_role: string;
  field_perception: Record<string, ElementShapePerception>;
  consciousness_quality: string;
}

export const ELEMENT_ARCHITECTURE: Record<string, ElementArchitecture> = {
  C: {
    name: "Carbon",
    atomic_number: 6,
    body_percentage: "18%",
    biological_role: "Structural backbone of all organic molecules",
    field_perception: {
      Body: {
        shape: "Tetrahedron",
        description: "Physical 3D structure, solid form",
        gan_prompt: "solid geometric structure, crystalline forms, physical matter",
        llm_tone: "structured, foundational, embodied"
      },
      Mind: {
        shape: "Hexagon / Flower of Life",
        description: "Symbolic pattern, mental architecture",
        gan_prompt: "hexagonal patterns, honeycomb structures, sacred geometry",
        llm_tone: "patterned, systematic, interconnected"
      },
      Heart: {
        shape: "Merkaba / Star Tetrahedron",
        description: "Light body, energetic vehicle",
        gan_prompt: "star tetrahedron, merkaba, light body geometries",
        llm_tone: "transcendent, vehicle of consciousness, light-filled"
      }
    },
    consciousness_quality: "Form, structure, manifestation"
  },
  H: {
    name: "Hydrogen",
    atomic_number: 1,
    body_percentage: "10%",
    biological_role: "Bonding agent, water formation, pH balance, chi/prana carrier",
    field_perception: {
      Body: {
        shape: "Sphere / Droplet",
        description: "Water molecule, fluid form",
        gan_prompt: "water droplets, spheres, flowing liquid",
        llm_tone: "fluid, adaptive, flowing"
      },
      Mind: {
        shape: "Point / Dot",
        description: "Unity, singularity, beginning",
        gan_prompt: "single points, dots, minimalist marks",
        llm_tone: "simple, essential, primordial"
      },
      Heart: {
        shape: "Infinite radiance",
        description: "Source point, all-permeating presence",
        gan_prompt: "radiant light source, omnidirectional glow",
        llm_tone: "infinite, source, all-permeating presence"
      }
    },
    consciousness_quality: "Unity, primal energy, chi/prana carrier"
  },
  N: {
    name: "Nitrogen",
    atomic_number: 7,
    body_percentage: "3%",
    biological_role: "Proteins, DNA bases, neurotransmitters",
    field_perception: {
      Body: {
        shape: "Pyramid",
        description: "Triangular base, ascending form",
        gan_prompt: "pyramids, triangular structures, ascending forms",
        llm_tone: "ascending, hierarchical, building"
      },
      Mind: {
        shape: "Triangle / Trinity",
        description: "Mental trinity, dialectic",
        gan_prompt: "triangles, trinities, three-part structures",
        llm_tone: "dialectical, three-fold, integrative"
      },
      Heart: {
        shape: "Ascending spiral",
        description: "Transformation, breath",
        gan_prompt: "spiraling upward, helical movement, transformative ascent",
        llm_tone: "ascending, transformative, breath-centered"
      }
    },
    consciousness_quality: "Transformation, flow, planning, breath of mind"
  },
  O: {
    name: "Oxygen",
    atomic_number: 8,
    body_percentage: "65%",
    biological_role: "Respiration, energy release, water, oxidation",
    field_perception: {
      Body: {
        shape: "Bent line / V-shape",
        description: "Water molecule shape",
        gan_prompt: "v-shapes, bent lines, angular water forms",
        llm_tone: "dual, bent, responsive"
      },
      Mind: {
        shape: "Duality / Yin-Yang",
        description: "Polarity, opposition and balance",
        gan_prompt: "yin-yang symbols, dualities, polar opposites",
        llm_tone: "dialectical, polar, balancing"
      },
      Heart: {
        shape: "Breath wave / Vesica Piscis",
        description: "Emotional tide, rhythmic flow",
        gan_prompt: "wave patterns, vesica piscis, rhythmic oscillations",
        llm_tone: "rhythmic, wave-like, breathing"
      }
    },
    consciousness_quality: "Qi, breath, letting go, inhalation/exhalation"
  },
  S: {
    name: "Sulfur",
    atomic_number: 16,
    body_percentage: "0.25%",
    biological_role: "Disulfide bonds (protein structure), detox",
    field_perception: {
      Body: {
        shape: "Bridge / Loop",
        description: "Physical connection, protein fold",
        gan_prompt: "bridges, loops, connecting structures",
        llm_tone: "connecting, bridging, linking"
      },
      Mind: {
        shape: "Infinity symbol (∞)",
        description: "Recursion, eternal loop",
        gan_prompt: "infinity symbols, figure-eights, recursive patterns",
        llm_tone: "recursive, eternal, looping"
      },
      Heart: {
        shape: "Ouroboros",
        description: "Karmic cycle, eternal return",
        gan_prompt: "ouroboros, serpent eating tail, karmic circles",
        llm_tone: "karmic, cyclical, eternal return"
      }
    },
    consciousness_quality: "Purification, clarity, metabolic fire"
  }
};

export interface GANPrompt {
  style: string;
  geometry: string;
  colors: string;
  element_prompts: string[];
  coherence_modifier: string;
}

export interface LLMToneFilter {
  field: string;
  base_tone: string;
  perception_style: string;
  element_influences: Array<{ element: string; tone: string }>;
  coherence_modifier: string;
  temperature: number;
  complexity: number;
}

export function generateGANPrompt(
  field: string,
  activeElements: string[],
  coherence: number
): GANPrompt {
  const fieldData = FIELD_PERCEPTION[field] || FIELD_PERCEPTION['Body'];
  
  const elementPrompts = activeElements.map(elem => {
    const elemData = ELEMENT_ARCHITECTURE[elem];
    if (!elemData) return '';
    const perception = elemData.field_perception[field];
    return perception ? perception.gan_prompt : '';
  }).filter(p => p);
  
  const coherenceModifier = coherence > 0.7 
    ? "clear, well-defined, harmonious"
    : coherence > 0.4 
    ? "somewhat fragmented, searching for clarity"
    : "fragmented, distorted, chaotic";
  
  return {
    style: fieldData.visual_palette,
    geometry: fieldData.geometry_preference,
    colors: fieldData.color_range,
    element_prompts: elementPrompts,
    coherence_modifier: coherenceModifier
  };
}

export function generateLLMToneFilter(
  field: string,
  activeElements: string[],
  coherence: number
): LLMToneFilter {
  const fieldData = FIELD_PERCEPTION[field] || FIELD_PERCEPTION['Body'];
  
  const elementInfluences = activeElements.map(elem => {
    const elemData = ELEMENT_ARCHITECTURE[elem];
    if (!elemData) return null;
    const perception = elemData.field_perception[field];
    return perception ? {
      element: elem,
      tone: perception.llm_tone
    } : null;
  }).filter(e => e !== null) as Array<{ element: string; tone: string }>;
  
  const coherenceModifier = coherence > 0.7
    ? "Clear, integrated, flowing"
    : coherence > 0.4
    ? "Somewhat uncertain, searching"
    : "Fragmented, uncertain, searching";
  
  const temperature = 0.3 + (1 - coherence) * 0.7;
  const complexity = coherence * 0.8 + 0.2;
  
  return {
    field,
    base_tone: fieldData.linguistic_tone,
    perception_style: fieldData.perception_style,
    element_influences: elementInfluences,
    coherence_modifier: coherenceModifier,
    temperature,
    complexity
  };
}
