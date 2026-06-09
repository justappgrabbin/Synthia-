/**
 * Resonance S-GAN: Decision Engine with Elemental Algebra
 * 
 * Core GAN #1 of 5 in the cognitive architecture
 * Generates action candidates and scores via Resonant Utility (RU) with elemental friction
 */

export enum ElementType {
  EARTH = 0,   // Design dimension - structure, manifestation
  WATER = 1,   // Evolution dimension - flow, integration
  AIR = 2,     // Space dimension - influence, communication
  FIRE = 3,    // Movement dimension - drive, action, transformation
  AETHER = 4   // Being dimension - unity, transcendence
}

// Compatibility Matrix (0-1 scale: 1=harmonious, 0=destructive)
// Based on traditional element theory + dimensional mappings
export const ELEMENT_COMPATIBILITY_MATRIX: number[][] = [
  // E    W    A    F    Ae
  [1.0, 0.8, 0.7, 0.5, 1.0],  // Earth: nourishes w/ water, eroded by air, melted by fire
  [0.8, 1.0, 0.6, 0.2, 1.0],  // Water: dampens fire, evaporates in air
  [0.7, 0.6, 1.0, 0.9, 1.0],  // Air: shapes earth, fans fire
  [0.5, 0.2, 0.9, 1.0, 1.0],  // Fire: melts earth, extinguished by water, amplified by air
  [1.0, 1.0, 1.0, 1.0, 1.0]   // Aether: harmonizes all (unity principle)
];

/**
 * Compute friction penalty from elemental mismatch
 * Returns 0-1, where 0=perfect match, 1=maximum friction
 */
export function elementalMismatchPenalty(
  actionElement: ElementType,
  stateElement: ElementType
): number {
  const compatibility = ELEMENT_COMPATIBILITY_MATRIX[actionElement][stateElement];
  return 1.0 - compatibility;
}

/**
 * Elemental algebra: combine elements with operators
 */
export function elementalOperator(
  elem1: ElementType,
  elem2: ElementType,
  operation: 'blend' | 'amplify' | 'dampen' = 'blend'
): { resonance: number; symbol: string } {
  const compat = ELEMENT_COMPATIBILITY_MATRIX[elem1][elem2];
  
  let resonance: number;
  let symbol: string;
  
  switch (operation) {
    case 'blend':
      // Addition: average compatibility as resonance
      resonance = compat;
      symbol = `${ElementType[elem1]}+${ElementType[elem2]}`;
      break;
      
    case 'amplify':
      // Multiplication: amplify if compatible, destabilize if not
      resonance = compat ** 2;  // Square emphasizes harmony/disharmony
      symbol = `${ElementType[elem1]}×${ElementType[elem2]}`;
      break;
      
    case 'dampen':
      // Subtraction: reduce opposing element
      resonance = Math.abs(compat - 0.5) * 2;  // Peak at 0.5 (balanced), low at extremes
      symbol = `${ElementType[elem1]}−${ElementType[elem2]}`;
      break;
      
    default:
      resonance = compat;
      symbol = `${ElementType[elem1]}${operation}${ElementType[elem2]}`;
  }
  
  return { resonance, symbol };
}

/**
 * Map 5D semantic latent to element
 * Uses argmax of latent components (after normalization)
 */
export function latentToElement(latentVector: number[]): ElementType {
  if (latentVector.length !== 5) {
    throw new Error('Latent vector must be 5D');
  }
  
  // Normalize to positive values (from [-1,1] to [0,1])
  const normalized = latentVector.map(v => (v + 1) / 2);
  
  // Find index of maximum value
  const elementIdx = normalized.indexOf(Math.max(...normalized));
  return elementIdx as ElementType;
}

/**
 * Extract action properties from semantic latent
 */
export interface ActionProperties {
  element: ElementType;
  elementIdx: number;
  dimension: number;
  latentVector: number[];
  frictionBase: number;
}

export function latentToActionProperties(
  latentVector: number[],
  currentState?: number[]
): ActionProperties {
  // Element from dominant dimension
  const element = latentToElement(latentVector);
  
  // Dimension (0-4 for 5-node system)
  const dimension = Math.floor((latentVector[0] + 1) * 2.5);
  
  // Estimate friction from state mismatch if state provided
  let frictionBase = 0.5; // Default
  if (currentState && currentState.length === 5) {
    // Cosine similarity as alignment measure
    const dotProduct = latentVector.reduce((sum, val, i) => sum + val * currentState[i], 0);
    const mag1 = Math.sqrt(latentVector.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(currentState.reduce((sum, val) => sum + val * val, 0));
    const similarity = dotProduct / (mag1 * mag2);
    
    // Convert similarity [-1,1] to friction [0,1]
    frictionBase = (1 - similarity) / 2;
  }
  
  return {
    element,
    elementIdx: element,
    dimension: Math.max(0, Math.min(4, dimension)),
    latentVector: [...latentVector],
    frictionBase
  };
}

/**
 * Unified Action Candidate with RU components and semantic latent
 */
export interface UnifiedActionCandidate {
  label: string;
  
  // RU Components (0-1)
  progress: number;
  friction: number;
  coherence: number;
  feasibility: number;
  risk: number;
  synergy: number;
  
  // Semantic latent
  latent: ActionProperties;
  
  // Computed
  ruScore?: number;
  ruBreakdown?: Record<string, number>;
}

/**
 * RU weight parameters
 */
export interface RUWeights {
  P: number;  // Progress
  F: number;  // Friction
  C: number;  // Coherence
  R: number;  // Feasibility
  K: number;  // Risk
  S: number;  // Synergy
}

export const DEFAULT_RU_WEIGHTS: RUWeights = {
  P: 1.0,  // Progress
  F: 0.8,  // Friction
  C: 0.6,  // Coherence
  R: 0.5,  // Feasibility
  K: 0.7,  // Risk
  S: 0.4   // Synergy
};

/**
 * Unified Resonance Engine
 * Complete resonance system: Generator → Discriminator → RU → Best Action
 */
export class UnifiedResonanceEngine {
  private weights: RUWeights;
  private lambdaM: number;  // Elemental friction penalty weight
  private currentStateVector?: number[];
  private currentStateElement: ElementType;
  private nodePi: number[];  // Node activation weights (for 5-node modulation)
  
  constructor(
    weights: RUWeights = DEFAULT_RU_WEIGHTS,
    lambdaM: number = 0.3
  ) {
    this.weights = weights;
    this.lambdaM = lambdaM;
    this.currentStateElement = ElementType.EARTH;
    this.nodePi = [0.2, 0.2, 0.2, 0.2, 0.2]; // Uniform by default
  }
  
  /**
   * Update current consciousness state
   */
  setCurrentState(
    stateVector?: number[],
    stateElement: ElementType = ElementType.EARTH
  ): void {
    this.currentStateVector = stateVector;
    this.currentStateElement = stateElement;
  }
  
  /**
   * Set node activation distribution
   */
  setNodeDistribution(nodePi: number[]): void {
    if (nodePi.length !== 5) {
      throw new Error('Must provide 5 node weights');
    }
    const sum = nodePi.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1.0) > 0.01) {
      throw new Error('Node weights must sum to 1.0');
    }
    this.nodePi = [...nodePi];
  }
  
  /**
   * Generate action candidate latents
   */
  generateActionCandidates(
    numCandidates: number = 5,
    temperature: number = 1.0
  ): number[][] {
    const candidates: number[][] = [];
    
    for (let i = 0; i < numCandidates; i++) {
      // Generate 5D latent from Gaussian noise
      const latent = Array.from({ length: 5 }, () => {
        // Box-Muller transform for Gaussian random
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return Math.tanh(z * temperature);  // Tanh to [-1, 1]
      });
      
      candidates.push(latent);
    }
    
    return candidates;
  }
  
  /**
   * Calculate Resonant Utility with elemental friction adjustment
   */
  calculateResonantUtility(
    action: UnifiedActionCandidate,
    useElementalFriction: boolean = true
  ): number {
    let P = action.progress;
    let F = action.friction;
    const C = action.coherence;
    const R = action.feasibility;
    const K = action.risk;
    const S = action.synergy;
    
    // Apply elemental friction penalty
    if (useElementalFriction && action.latent) {
      const actionElement = action.latent.element;
      const mismatch = elementalMismatchPenalty(actionElement, this.currentStateElement);
      F = F + this.lambdaM * mismatch;
      F = Math.min(F, 1.0);  // Cap at 1.0
    }
    
    // RU formula
    const w = this.weights;
    const ru = (
      w.P * P -
      w.F * F +
      w.C * C +
      w.R * R -
      w.K * K +
      w.S * S
    );
    
    // Store breakdown
    action.ruBreakdown = {
      progress: w.P * P,
      friction: -w.F * F,
      coherence: w.C * C,
      feasibility: w.R * R,
      risk: -w.K * K,
      synergy: w.S * S
    };
    
    action.ruScore = ru;
    return ru;
  }
  
  /**
   * Generate and rank action candidates
   */
  generateAndSelect(
    numCandidates: number = 20,
    topK: number = 5
  ): UnifiedActionCandidate[] {
    // Generate latents
    const latents = this.generateActionCandidates(numCandidates);
    
    // Create action candidates
    const candidates: UnifiedActionCandidate[] = latents.map((latent, idx) => {
      const actionProps = latentToActionProperties(latent, this.currentStateVector);
      
      // Mock RU components (in real system, these would come from discriminator/predictors)
      const candidate: UnifiedActionCandidate = {
        label: `Action ${idx + 1}`,
        progress: Math.random() * 0.3 + 0.6,  // 0.6-0.9
        friction: Math.random() * 0.4 + 0.1,  // 0.1-0.5
        coherence: Math.random() * 0.3 + 0.5, // 0.5-0.8
        feasibility: Math.random() * 0.4 + 0.4, // 0.4-0.8
        risk: Math.random() * 0.3 + 0.1,      // 0.1-0.4
        synergy: Math.random() * 0.4 + 0.3,   // 0.3-0.7
        latent: actionProps
      };
      
      // Calculate RU score
      this.calculateResonantUtility(candidate);
      
      return candidate;
    });
    
    // Sort by RU score (descending)
    candidates.sort((a, b) => (b.ruScore || 0) - (a.ruScore || 0));
    
    // Return top K
    return candidates.slice(0, topK);
  }
}

/**
 * Analyze elemental resonance between entities/actions
 */
export function analyzeResonance(
  entity1Element: ElementType,
  entity2Element: ElementType
): {
  compatibility: number;
  blend: { resonance: number; symbol: string };
  amplify: { resonance: number; symbol: string };
  dampen: { resonance: number; symbol: string };
  recommendation: string;
} {
  const compat = ELEMENT_COMPATIBILITY_MATRIX[entity1Element][entity2Element];
  
  const blend = elementalOperator(entity1Element, entity2Element, 'blend');
  const amplify = elementalOperator(entity1Element, entity2Element, 'amplify');
  const dampen = elementalOperator(entity1Element, entity2Element, 'dampen');
  
  let recommendation: string;
  if (compat > 0.7) {
    recommendation = 'amplify';
  } else if (compat > 0.5) {
    recommendation = 'blend';
  } else {
    recommendation = 'dampen';
  }
  
  return {
    compatibility: compat,
    blend,
    amplify,
    dampen,
    recommendation
  };
}
