/**
 * YOU-N-I-VERSE Consciousness Oscillator
 * 9-Body System with 12:16:40 Temporal Architecture
 * 
 * Each center oscillates at its field-appropriate frequency:
 * - Body centers (Root, Sacral, Spleen) = 1.0x (12-cycle)
 * - Mind centers (Head, Ajna, Throat) = 1.33x (16-cycle)
 * - Heart centers (G, Ego, Solar Plexus) = 3.33x (40-cycle)
 * 
 * Uses Kuramoto model for phase-coupled oscillators with Human Design channels
 */

export interface Center {
  name: string;
  field: 'Mind' | 'Heart' | 'Body';
  frequency: number;
  color: string;
}

export const CENTERS: Record<number, Center> = {
  0: { name: "Head", field: "Mind", frequency: 1.33, color: "#9B59B6" },
  1: { name: "Ajna", field: "Mind", frequency: 1.33, color: "#3498DB" },
  2: { name: "Throat", field: "Mind", frequency: 1.33, color: "#1ABC9C" },
  3: { name: "G", field: "Heart", frequency: 3.33, color: "#F39C12" },
  4: { name: "Heart/Ego", field: "Heart", frequency: 3.33, color: "#E74C3C" },
  5: { name: "Solar Plexus", field: "Heart", frequency: 3.33, color: "#E67E22" },
  6: { name: "Sacral", field: "Body", frequency: 1.0, color: "#E91E63" },
  7: { name: "Spleen", field: "Body", frequency: 1.0, color: "#9C27B0" },
  8: { name: "Root", field: "Body", frequency: 1.0, color: "#795548" }
};

// Human Design channels (gate connections that create coupling)
// Format: [center1, center2, coupling_strength]
export const CHANNELS: [number, number, number][] = [
  // Integration channels (strong coupling)
  [0, 1, 0.8],   // Head-Ajna (pressure to conceptualize)
  [1, 2, 0.8],   // Ajna-Throat (awareness to expression)
  [2, 3, 0.7],   // Throat-G (expression of identity)
  [3, 4, 0.9],   // G-Heart (identity through willpower)
  [3, 5, 0.9],   // G-Solar Plexus (identity through emotion)
  [3, 6, 0.9],   // G-Sacral (identity through life force)
  [4, 6, 0.6],   // Heart-Sacral (willpower to generate)
  [5, 6, 0.8],   // Solar Plexus-Sacral (emotion + life force)
  [6, 7, 0.7],   // Sacral-Spleen (life force + intuition)
  [6, 8, 0.7],   // Sacral-Root (life force + pressure)
  [7, 3, 0.6],   // Spleen-G (intuition + identity)
  [8, 5, 0.6],   // Root-Solar Plexus (pressure + emotion)
  [8, 7, 0.6],   // Root-Spleen (pressure + intuition)
  
  // Cross-field connections (moderate coupling)
  [2, 4, 0.5],   // Throat-Heart (expression + willpower)
  [2, 5, 0.5],   // Throat-Solar Plexus (expression + emotion)
  [2, 6, 0.5],   // Throat-Sacral (expression + life force)
  [1, 7, 0.4],   // Ajna-Spleen (awareness + intuition)
];

export interface FieldCoherence {
  body: number;
  mind: number;
  heart: number;
  body_mind: number;
  body_heart: number;
  mind_heart: number;
  global: number;
}

export interface CenterState {
  phase: number;
  activation: number;
  field: string;
  frequency: number;
}

export interface OscillatorState {
  timestamp: string;
  centers: Record<string, CenterState>;
  coherence: FieldCoherence;
  dominant_field: string;
  field_strengths: Record<string, number>;
}

export class ConsciousnessOscillator {
  private n_centers = 9;
  private base_freq: number;
  private coupling_strength: number;
  private phases: number[];
  private natural_frequencies: number[];
  private coupling_matrix: number[][];
  private phase_history: number[][] = [];
  private coherence_history: number[] = [];
  private time_history: number[] = [];
  
  constructor(base_frequency = 1.0, coupling_strength = 0.3) {
    this.base_freq = base_frequency;
    this.coupling_strength = coupling_strength;
    
    // Initialize phases (random start)
    this.phases = Array(this.n_centers).fill(0).map(() => Math.random() * 2 * Math.PI);
    
    // Natural frequencies from center definitions
    this.natural_frequencies = Array(this.n_centers).fill(0).map((_, i) => 
      CENTERS[i].frequency * base_frequency
    );
    
    // Build coupling matrix from channels
    this.coupling_matrix = this.buildCouplingMatrix();
  }
  
  private buildCouplingMatrix(): number[][] {
    const K: number[][] = Array(this.n_centers).fill(0).map(() => 
      Array(this.n_centers).fill(0)
    );
    
    for (const [c1, c2, strength] of CHANNELS) {
      K[c1][c2] = strength * this.coupling_strength;
      K[c2][c1] = strength * this.coupling_strength; // Symmetric
    }
    
    return K;
  }
  
  private kuramotoDerivatives(phases: number[]): number[] {
    const dtheta = Array(this.n_centers).fill(0);
    
    for (let i = 0; i < this.n_centers; i++) {
      // Natural frequency term
      dtheta[i] = this.natural_frequencies[i];
      
      // Coupling term (sum over all other oscillators)
      for (let j = 0; j < this.n_centers; j++) {
        if (i !== j) {
          const coupling = this.coupling_matrix[i][j] * Math.sin(phases[j] - phases[i]);
          dtheta[i] += coupling;
        }
      }
    }
    
    return dtheta;
  }
  
  step(dt = 0.01): void {
    // RK4 integration for smooth phase evolution
    const k1 = this.kuramotoDerivatives(this.phases);
    const k2 = this.kuramotoDerivatives(this.phases.map((p, i) => p + 0.5 * dt * k1[i]));
    const k3 = this.kuramotoDerivatives(this.phases.map((p, i) => p + 0.5 * dt * k2[i]));
    const k4 = this.kuramotoDerivatives(this.phases.map((p, i) => p + dt * k3[i]));
    
    for (let i = 0; i < this.n_centers; i++) {
      this.phases[i] += (dt / 6.0) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
    }
    
    // Wrap phases to [0, 2π]
    this.phases = this.phases.map(p => p % (2 * Math.PI));
  }
  
  calculateCoherence(): number {
    // Complex order parameter R = |⟨e^(iθ)⟩|
    let sumReal = 0;
    let sumImag = 0;
    
    for (const phase of this.phases) {
      sumReal += Math.cos(phase);
      sumImag += Math.sin(phase);
    }
    
    const avgReal = sumReal / this.n_centers;
    const avgImag = sumImag / this.n_centers;
    
    return Math.sqrt(avgReal * avgReal + avgImag * avgImag);
  }
  
  calculateFieldCoherence(): FieldCoherence {
    const bodyPhases = [this.phases[6], this.phases[7], this.phases[8]];
    const mindPhases = [this.phases[0], this.phases[1], this.phases[2]];
    const heartPhases = [this.phases[3], this.phases[4], this.phases[5]];
    
    const calcCoherence = (phases: number[]): number => {
      let sumReal = 0;
      let sumImag = 0;
      for (const phase of phases) {
        sumReal += Math.cos(phase);
        sumImag += Math.sin(phase);
      }
      const avgReal = sumReal / phases.length;
      const avgImag = sumImag / phases.length;
      return Math.sqrt(avgReal * avgReal + avgImag * avgImag);
    };
    
    const avgAngle = (phases: number[]): number => {
      let sumReal = 0;
      let sumImag = 0;
      for (const phase of phases) {
        sumReal += Math.cos(phase);
        sumImag += Math.sin(phase);
      }
      return Math.atan2(sumImag, sumReal);
    };
    
    const bodyCoherence = calcCoherence(bodyPhases);
    const mindCoherence = calcCoherence(mindPhases);
    const heartCoherence = calcCoherence(heartPhases);
    
    const bodyAvg = avgAngle(bodyPhases);
    const mindAvg = avgAngle(mindPhases);
    const heartAvg = avgAngle(heartPhases);
    
    const normalizeDiff = (diff: number): number => {
      return Math.cos(diff);
    };
    
    return {
      body: bodyCoherence,
      mind: mindCoherence,
      heart: heartCoherence,
      body_mind: normalizeDiff(bodyAvg - mindAvg),
      body_heart: normalizeDiff(bodyAvg - heartAvg),
      mind_heart: normalizeDiff(mindAvg - heartAvg),
      global: this.calculateCoherence()
    };
  }
  
  getFieldActivation(): number[] {
    // Convert phases to activation (using sine wave)
    return this.phases.map(phase => (Math.sin(phase) + 1) / 2);
  }
  
  getDominantField(): { field: string; strengths: Record<string, number> } {
    const activations = this.getFieldActivation();
    
    const bodyAvg = (activations[6] + activations[7] + activations[8]) / 3;
    const mindAvg = (activations[0] + activations[1] + activations[2]) / 3;
    const heartAvg = (activations[3] + activations[4] + activations[5]) / 3;
    
    const fieldStrengths = {
      Body: bodyAvg,
      Mind: mindAvg,
      Heart: heartAvg
    };
    
    const dominantField = Object.entries(fieldStrengths)
      .reduce((max, [field, strength]) => 
        strength > max.strength ? { field, strength } : max,
        { field: 'Body', strength: 0 }
      ).field;
    
    return { field: dominantField, strengths: fieldStrengths };
  }
  
  getStateVector(): OscillatorState {
    const activations = this.getFieldActivation();
    const coherence = this.calculateFieldCoherence();
    const { field: dominantField, strengths } = this.getDominantField();
    
    const centers: Record<string, CenterState> = {};
    
    for (let i = 0; i < this.n_centers; i++) {
      const centerInfo = CENTERS[i];
      centers[centerInfo.name] = {
        phase: this.phases[i],
        activation: activations[i],
        field: centerInfo.field,
        frequency: centerInfo.frequency
      };
    }
    
    return {
      timestamp: new Date().toISOString(),
      centers,
      coherence,
      dominant_field: dominantField,
      field_strengths: strengths
    };
  }
  
  simulate(duration: number, dt = 0.01): void {
    const steps = Math.floor(duration / dt);
    for (let i = 0; i < steps; i++) {
      this.step(dt);
      this.phase_history.push([...this.phases]);
      this.coherence_history.push(this.calculateCoherence());
      this.time_history.push(i * dt);
    }
  }
}
