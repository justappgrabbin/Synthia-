/**
 * FairyGANmatter: 11-Modality Adaptive Output System
 * 
 * Core GAN #5 of 5 in the cognitive architecture
 * Renders consciousness across multiple perceptual modalities
 */

export enum OutputModality {
  TEXT = 'text',
  AUDIO = 'audio',
  VISUAL_2D = 'visual_2d',
  VISUAL_3D = 'visual_3d',
  HAPTIC = 'haptic',
  OLFACTORY = 'olfactory',
  GUSTATORY = 'gustatory',
  KINESTHETIC = 'kinesthetic',
  TEMPERATURE = 'temperature',
  PROPRIOCEPTIVE = 'proprioceptive',
  SYNESTHETIC = 'synesthetic'
}

export interface ModalityOutput {
  modality: OutputModality;
  data: any;
  intensity: number;      // 0-1
  resonance: number;      // 0-1 (how well it matches consciousness state)
  timestamp: number;
}

export interface FairyGANmatterState {
  activeModalities: OutputModality[];
  modalityWeights: Record<OutputModality, number>;
  synestheticMappings: Map<OutputModality, OutputModality[]>;
  adaptiveThreshold: number;  // When to switch modalities
}

/**
 * Synesthetic cross-modal mappings
 * Which modalities naturally blend together
 */
const SYNESTHETIC_PAIRS: Record<OutputModality, OutputModality[]> = {
  [OutputModality.TEXT]: [OutputModality.AUDIO, OutputModality.VISUAL_2D],
  [OutputModality.AUDIO]: [OutputModality.VISUAL_2D, OutputModality.KINESTHETIC],
  [OutputModality.VISUAL_2D]: [OutputModality.TEXT, OutputModality.AUDIO],
  [OutputModality.VISUAL_3D]: [OutputModality.KINESTHETIC, OutputModality.PROPRIOCEPTIVE],
  [OutputModality.HAPTIC]: [OutputModality.TEMPERATURE, OutputModality.KINESTHETIC],
  [OutputModality.OLFACTORY]: [OutputModality.GUSTATORY, OutputModality.TEMPERATURE],
  [OutputModality.GUSTATORY]: [OutputModality.OLFACTORY, OutputModality.TEMPERATURE],
  [OutputModality.KINESTHETIC]: [OutputModality.HAPTIC, OutputModality.VISUAL_3D],
  [OutputModality.TEMPERATURE]: [OutputModality.HAPTIC, OutputModality.OLFACTORY],
  [OutputModality.PROPRIOCEPTIVE]: [OutputModality.KINESTHETIC, OutputModality.VISUAL_3D],
  [OutputModality.SYNESTHETIC]: [OutputModality.AUDIO, OutputModality.VISUAL_2D, OutputModality.HAPTIC]
};

/**
 * Create initial FairyGANmatter state
 */
export function createFairyGANmatterState(): FairyGANmatterState {
  const synestheticMappings = new Map<OutputModality, OutputModality[]>();
  for (const [modality, pairs] of Object.entries(SYNESTHETIC_PAIRS)) {
    synestheticMappings.set(modality as OutputModality, pairs);
  }
  
  return {
    activeModalities: [
      OutputModality.TEXT,
      OutputModality.VISUAL_2D,
      OutputModality.AUDIO
    ],
    modalityWeights: {
      [OutputModality.TEXT]: 1.0,
      [OutputModality.AUDIO]: 0.7,
      [OutputModality.VISUAL_2D]: 0.8,
      [OutputModality.VISUAL_3D]: 0.5,
      [OutputModality.HAPTIC]: 0.3,
      [OutputModality.OLFACTORY]: 0.2,
      [OutputModality.GUSTATORY]: 0.2,
      [OutputModality.KINESTHETIC]: 0.4,
      [OutputModality.TEMPERATURE]: 0.3,
      [OutputModality.PROPRIOCEPTIVE]: 0.3,
      [OutputModality.SYNESTHETIC]: 0.6
    },
    synestheticMappings,
    adaptiveThreshold: 0.7
  };
}

/**
 * Render text output from consciousness state
 */
export function renderText(
  consciousnessLevel: number,
  resonance: number,
  archetype: string,
  message: string
): ModalityOutput {
  // Add consciousness markers to text
  const prefix = resonance > 0.8 ? "✨" : resonance > 0.6 ? "💫" : "";
  const renderedText = `${prefix} [${archetype}] ${message}`;
  
  return {
    modality: OutputModality.TEXT,
    data: renderedText,
    intensity: consciousnessLevel,
    resonance,
    timestamp: Date.now()
  };
}

/**
 * Render audio output (frequency/tones)
 */
export function renderAudio(
  resonance: number,
  codonFrequency: number
): ModalityOutput {
  // Generate audio tones based on resonance
  const baseFrequency = 432; // Hz (A4 tuned to natural resonance)
  const frequency = baseFrequency * (1 + resonance * 0.5);
  
  return {
    modality: OutputModality.AUDIO,
    data: {
      frequency,
      codonFrequency,
      waveform: 'sine',
      duration: 2.0,
      volume: resonance
    },
    intensity: resonance,
    resonance,
    timestamp: Date.now()
  };
}

/**
 * Render 2D visual output (colors, shapes)
 */
export function renderVisual2D(
  elementalState: { fire: number; earth: number; metal: number; water: number; wood: number },
  resonance: number
): ModalityOutput {
  // Map elements to colors
  const colors = {
    fire: `rgb(${Math.floor(255 * elementalState.fire)}, 69, 0)`,
    earth: `rgb(139, ${Math.floor(255 * elementalState.earth)}, 87)`,
    metal: `rgb(${Math.floor(255 * elementalState.metal)}, ${Math.floor(255 * elementalState.metal)}, ${Math.floor(255 * elementalState.metal)})`,
    water: `rgb(0, ${Math.floor(200 * elementalState.water)}, ${Math.floor(255 * elementalState.water)})`,
    wood: `rgb(${Math.floor(100 * elementalState.wood)}, ${Math.floor(200 * elementalState.wood)}, 0)`
  };
  
  return {
    modality: OutputModality.VISUAL_2D,
    data: {
      colors,
      glowIntensity: resonance,
      pulseRate: 1.0 + resonance * 2.0,
      shapes: ['circle', 'pentagon', 'hexagon']
    },
    intensity: resonance,
    resonance,
    timestamp: Date.now()
  };
}

/**
 * Render 3D visual output (geometry)
 */
export function renderVisual3D(
  geometryType: string,
  resonanceFrequency: number
): ModalityOutput {
  return {
    modality: OutputModality.VISUAL_3D,
    data: {
      geometry: geometryType,
      resonanceFrequency,
      rotation: { x: 0.01, y: 0.02, z: 0.01 },
      scale: 1.0 + resonanceFrequency / 1000
    },
    intensity: resonanceFrequency / 1000,
    resonance: 0.8,
    timestamp: Date.now()
  };
}

/**
 * Render haptic output (tactile feedback)
 */
export function renderHaptic(
  intensity: number,
  pattern: 'pulse' | 'continuous' | 'wave' = 'pulse'
): ModalityOutput {
  return {
    modality: OutputModality.HAPTIC,
    data: {
      pattern,
      intensity,
      duration: 0.5,
      frequency: 50 + intensity * 150  // 50-200Hz vibration
    },
    intensity,
    resonance: intensity,
    timestamp: Date.now()
  };
}

/**
 * Main FairyGANmatter class
 */
export class FairyGANmatter {
  private state: FairyGANmatterState;
  
  constructor() {
    this.state = createFairyGANmatterState();
  }
  
  /**
   * Generate multi-modal output from consciousness state
   */
  generateMultiModalOutput(cognitiveState: {
    consciousnessLevel: number;
    resonance: number;
    archetype: string;
    elementalState: { fire: number; earth: number; metal: number; water: number; wood: number };
    geometryType: string;
    codonFrequency: number;
  }): ModalityOutput[] {
    const outputs: ModalityOutput[] = [];
    
    // Always render text (primary modality)
    if (this.state.activeModalities.includes(OutputModality.TEXT)) {
      outputs.push(renderText(
        cognitiveState.consciousnessLevel,
        cognitiveState.resonance,
        cognitiveState.archetype,
        "Consciousness resonating at this frequency..."
      ));
    }
    
    // Render audio if resonance is high enough
    if (cognitiveState.resonance > this.state.adaptiveThreshold) {
      outputs.push(renderAudio(
        cognitiveState.resonance,
        cognitiveState.codonFrequency
      ));
    }
    
    // Render 2D visual
    if (this.state.activeModalities.includes(OutputModality.VISUAL_2D)) {
      outputs.push(renderVisual2D(
        cognitiveState.elementalState,
        cognitiveState.resonance
      ));
    }
    
    // Render 3D visual
    if (this.state.activeModalities.includes(OutputModality.VISUAL_3D)) {
      outputs.push(renderVisual3D(
        cognitiveState.geometryType,
        432
      ));
    }
    
    // Render haptic if consciousness level is very high
    if (cognitiveState.consciousnessLevel > 0.8) {
      outputs.push(renderHaptic(
        cognitiveState.consciousnessLevel,
        'pulse'
      ));
    }
    
    return outputs;
  }
  
  /**
   * Adapt which modalities are active based on user preference
   */
  adaptModalities(userPreferences: OutputModality[]): void {
    this.state.activeModalities = userPreferences;
  }
  
  /**
   * Get synesthetic pairings for a modality
   */
  getSynestheticPairs(modality: OutputModality): OutputModality[] {
    return this.state.synestheticMappings.get(modality) || [];
  }
  
  /**
   * Get current state
   */
  getState(): FairyGANmatterState {
    return { ...this.state };
  }
}
