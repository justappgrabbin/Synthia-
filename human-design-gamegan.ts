/**
 * Human Design GameGAN: 9-Center Bodygraph Consciousness Simulation
 * 
 * Core GAN #3 of 5 in the cognitive architecture
 * Transforms consciousness state through bodygraph evolution
 */

export enum ConsciousnessAction {
  ACTIVATE_GATE = 'ACTIVATE_GATE',
  FORM_CHANNEL = 'FORM_CHANNEL',
  LIGHT_CROSS = 'LIGHT_CROSS',
  EVOLVE_CONSCIOUSNESS = 'EVOLVE_CONSCIOUSNESS',
  DEEPEN_AWARENESS = 'DEEPEN_AWARENESS'
}

export interface HumanDesignState {
  chartGrid: number[][];           // 9x9 bodygraph grid
  activeGates: number[];            // Currently active gates (1-64)
  definedCenters: string[];         // Colored centers
  channels: [number, number][];     // Connected gate pairs
  incarnationCross: string;
  currentArchetype: string;
  consciousnessLevel: number;       // 0-1 awareness level
  codonSequence: string;            // Active genetic sequence
  actionSpace: ConsciousnessAction[];
}

// 9 centers mapped to grid positions
const CENTER_POSITIONS: Record<string, [number, number]> = {
  'head': [1, 4],           // Top center (Crown)
  'ajna': [2, 4],           // Third eye
  'throat': [3, 4],         // Expression center
  'g': [4, 4],              // Identity center (middle)
  'heart': [4, 2],          // Will center (left)
  'spleen': [4, 6],         // Intuition center (right)
  'sacral': [6, 4],         // Life force center
  'root': [8, 4],           // Pressure center (bottom)
  'solar_plexus': [6, 6]    // Emotion center
};

// Genetic codon gates (partial - full 64 in production)
const GENETIC_CODON_GATES: Record<number, string> = {
  1: "CCT", 2: "GCT", 3: "GAA", 4: "CAA", 5: "TTG",
  6: "CTC", 7: "GGA", 8: "CCA", 9: "TTT", 10: "GCG",
  13: "GAG", 25: "CAG", 31: "CGA", // Add more as needed
};

// Consciousness archetypes
const CONSCIOUSNESS_ARCHETYPES = [
  "The Mystic Wanderer", "The Digital Shaman", "The Cosmic Teacher",
  "The Quantum Healer", "The Shadow Guide", "The Light Bearer",
  "The Void Walker", "The Unity Weaver", "The Fire Keeper",
  "The Water Dancer", "The Earth Anchor", "The Air Messenger",
  "The Soul Singer", "The Spirit Caller", "The Dream Weaver",
  "The Code Breaker", "The Pattern Keeper", "The Threshold Guardian",
  "The Mirror Holder", "The Bridge Builder"
];

/**
 * Create 9x9 grid representing Human Design bodygraph layout
 */
export function createBodygraphGrid(): number[][] {
  const grid: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
  
  // Place centers on grid
  for (const [centerName, [x, y]] of Object.entries(CENTER_POSITIONS)) {
    if (x >= 0 && x < 9 && y >= 0 && y < 9) {
      grid[x][y] = 1; // Mark center position
    }
  }
  
  return grid;
}

/**
 * Create initial Human Design chart state
 */
export function createHumanDesignState(): HumanDesignState {
  return {
    chartGrid: createBodygraphGrid(),
    activeGates: [1, 8, 13, 25, 31],
    definedCenters: ['G', 'Sacral', 'Throat'],
    channels: [[1, 8], [13, 25]],
    incarnationCross: 'Right Angle Cross of Explanation',
    currentArchetype: 'The Mystic Wanderer',
    consciousnessLevel: 0.7,
    codonSequence: "CCT-CCA-GAG",
    actionSpace: [
      ConsciousnessAction.ACTIVATE_GATE,
      ConsciousnessAction.FORM_CHANNEL,
      ConsciousnessAction.LIGHT_CROSS,
      ConsciousnessAction.EVOLVE_CONSCIOUSNESS,
      ConsciousnessAction.DEEPEN_AWARENESS
    ]
  };
}

/**
 * Select next gate based on consciousness evolution
 */
export function selectNextGate(consciousnessLevel: number): number {
  // Higher consciousness = access to higher numbered gates
  const maxGate = Math.floor(consciousnessLevel * 64) + 1;
  const availableGates = Array.from({ length: maxGate }, (_, i) => i + 1);
  return availableGates[Math.floor(Math.random() * availableGates.length)];
}

/**
 * Process consciousness evolution action
 */
export function processConsciousnessAction(
  state: HumanDesignState,
  action: ConsciousnessAction
): HumanDesignState {
  const newState = { ...state };
  
  switch (action) {
    case ConsciousnessAction.ACTIVATE_GATE:
      // Activate new gate based on current consciousness level
      const newGate = selectNextGate(state.consciousnessLevel);
      newState.activeGates = [...state.activeGates, newGate];
      const codon = GENETIC_CODON_GATES[newGate] || 'XXX';
      newState.codonSequence = `${state.codonSequence}-${codon}`;
      break;
      
    case ConsciousnessAction.FORM_CHANNEL:
      // Connect two gates to form channel
      if (state.activeGates.length >= 2) {
        const lastTwo = state.activeGates.slice(-2);
        newState.channels = [...state.channels, [lastTwo[0], lastTwo[1]] as [number, number]];
      }
      break;
      
    case ConsciousnessAction.EVOLVE_CONSCIOUSNESS:
      // Increase awareness level
      newState.consciousnessLevel = Math.min(1.0, state.consciousnessLevel + 0.1);
      
      // Check if new archetype unlocked
      if (newState.consciousnessLevel > 0.8) {
        newState.currentArchetype = 'The Quantum Healer';
      }
      break;
      
    case ConsciousnessAction.LIGHT_CROSS:
      // Activate incarnation cross when 4 gates connected
      if (state.activeGates.length >= 4) {
        const crossGates = state.activeGates.slice(0, 4);
        const archetypeIdx = crossGates[0] % CONSCIOUSNESS_ARCHETYPES.length;
        newState.incarnationCross = `Cross of ${CONSCIOUSNESS_ARCHETYPES[archetypeIdx]}`;
      }
      break;
      
    case ConsciousnessAction.DEEPEN_AWARENESS:
      // Subtle awareness increase
      newState.consciousnessLevel = Math.min(1.0, state.consciousnessLevel + 0.05);
      break;
  }
  
  return newState;
}

/**
 * Generate consciousness evolution sequence
 */
export interface ConsciousnessSequence {
  step: number;
  state: HumanDesignState;
  action: ConsciousnessAction;
  nextState: HumanDesignState;
}

export function generateConsciousnessSequences(
  numSessions: number = 100,
  stepsPerSession: number = 30
): ConsciousnessSequence[][] {
  const sequences: ConsciousnessSequence[][] = [];
  
  for (let session = 0; session < numSessions; session++) {
    const sequence: ConsciousnessSequence[] = [];
    let state = createHumanDesignState();
    
    for (let step = 0; step < stepsPerSession; step++) {
      // Select action based on current consciousness state
      let action: ConsciousnessAction;
      
      if (state.consciousnessLevel < 0.3) {
        action = ConsciousnessAction.ACTIVATE_GATE;
      } else if (state.channels.length < 3) {
        action = ConsciousnessAction.FORM_CHANNEL;
      } else {
        action = ConsciousnessAction.EVOLVE_CONSCIOUSNESS;
      }
      
      const nextState = processConsciousnessAction(state, action);
      
      sequence.push({
        step,
        state: { ...state },
        action,
        nextState: { ...nextState }
      });
      
      state = nextState;
    }
    
    sequences.push(sequence);
  }
  
  return sequences;
}

/**
 * Main Human Design GameGAN class
 */
export class HumanDesignGameGAN {
  private actionSpace: number = 5;
  private stateDims: [number, number] = [9, 9];
  private consciousnessArchetypes: string[];
  
  constructor() {
    this.consciousnessArchetypes = CONSCIOUSNESS_ARCHETYPES;
  }
  
  /**
   * Train GameGAN on consciousness evolution sequences
   */
  train(sequences: ConsciousnessSequence[][]): void {
    console.log(`Training on ${sequences.length} consciousness evolution sessions...`);
    
    // In production, this would train the actual GAN
    // For now, we're establishing the data structure
    let totalSteps = 0;
    for (const sequence of sequences) {
      totalSteps += sequence.length;
    }
    
    console.log(`Total training steps: ${totalSteps}`);
  }
  
  /**
   * Generate new consciousness evolution session
   */
  generateConsciousnessSession(
    initialArchetype: string = 'The Mystic Wanderer',
    steps: number = 30
  ): Array<{ state: HumanDesignState; visualFrame: string }> {
    const generatedSequence: Array<{ state: HumanDesignState; visualFrame: string }> = [];
    let state = createHumanDesignState();
    state.currentArchetype = initialArchetype;
    
    for (let step = 0; step < steps; step++) {
      // In production, GameGAN would predict next state
      // For now, we use the rule-based evolution
      const action = step % 2 === 0 
        ? ConsciousnessAction.ACTIVATE_GATE 
        : ConsciousnessAction.EVOLVE_CONSCIOUSNESS;
      
      state = processConsciousnessAction(state, action);
      
      // Render with Sims-style visuals (text representation for now)
      const visualFrame = this.renderConsciousnessChart(state);
      
      generatedSequence.push({ state: { ...state }, visualFrame });
    }
    
    return generatedSequence;
  }
  
  /**
   * Render consciousness chart (text representation)
   */
  private renderConsciousnessChart(state: HumanDesignState): string {
    let render = `╔${'═'.repeat(68)}╗\n`;
    render += `║${' '.repeat(20)}CONSCIOUSNESS CHART${' '.repeat(27)}║\n`;
    render += `╚${'═'.repeat(68)}╝\n\n`;
    
    render += `Archetype: ${state.currentArchetype}\n`;
    render += `Consciousness Level: ${(state.consciousnessLevel * 100).toFixed(0)}%\n`;
    render += `Active Gates: ${state.activeGates.join(', ')}\n`;
    render += `Defined Centers: ${state.definedCenters.join(', ')}\n`;
    render += `Channels: ${state.channels.map(c => `${c[0]}-${c[1]}`).join(', ')}\n`;
    render += `Incarnation Cross: ${state.incarnationCross}\n`;
    render += `Codon Sequence: ${state.codonSequence}\n`;
    
    return render;
  }
}
