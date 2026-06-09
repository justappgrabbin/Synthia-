/**
 * Codon Resonance GameGAN: 64-Codon Progressive Resonance System
 * 
 * Core GAN #2 of 5 in the cognitive architecture
 * Progressive accumulation - each codon scene builds on previous + new resonance elements
 */

// 64 genetic codons from humanDesignGates.ts
export const CODON_SEQUENCE = [
  "TTT", "TTC", "TTA", "TTG", "TCT", "TCC", "TCA", "TCG",
  "TAT", "TAC", "TAA", "TAG", "TGT", "TGC", "TGA", "TGG", 
  "CTT", "CTC", "CTA", "CTG", "CCT", "CCC", "CCA", "CCG",
  "CAT", "CAC", "CAA", "CAG", "CGT", "CGC", "CGA", "CGG",
  "ATT", "ATC", "ATA", "ATG", "ACT", "ACC", "ACA", "ACG",
  "AAT", "AAC", "AAA", "AAG", "AGT", "AGC", "AGA", "AGG",
  "GTT", "GTC", "GTA", "GTG", "GCT", "GCC", "GCA", "GCG", 
  "GAT", "GAC", "GAA", "GAG", "GGT", "GGC", "GGA", "GGG"
];

// Nucleotide frequencies (musical notes in Hz)
const NUCLEOTIDE_FREQ: Record<string, number> = {
  'T': 220.0,    // A3
  'C': 293.66,   // D4
  'A': 329.63,   // E4
  'G': 392.0     // G4
};

/**
 * Sims-style visual properties for each codon element
 */
export interface VisualProperties {
  colorHue: number;          // 0-360 degrees
  glowIntensity: number;     // 0-1
  pulseRate: number;         // Hz
  sizeModifier: number;      // 0.8-1.2
  sparkleCount: number;      // integer
  animationSpeed: number;    // Hz
}

/**
 * Individual resonance element for each codon
 */
export class CodonResonanceElement {
  id: number;
  sequence: string;
  frequency: number;
  harmonics: number[];
  visualProperties: VisualProperties;
  
  constructor(codonId: number, codonSequence: string) {
    this.id = codonId;
    this.sequence = codonSequence;
    this.frequency = this.calculateBaseFrequency();
    this.harmonics = this.calculateHarmonicSeries();
    this.visualProperties = this.generateSimsProperties();
  }
  
  /**
   * Calculate base resonance frequency from codon sequence
   */
  private calculateBaseFrequency(): number {
    let freq = 1.0;
    for (const nucleotide of this.sequence) {
      freq *= NUCLEOTIDE_FREQ[nucleotide];
    }
    return Math.pow(freq, 1/3) / 100; // Normalize to reasonable range
  }
  
  /**
   * Generate harmonic frequencies for resonance overlays
   */
  private calculateHarmonicSeries(): number[] {
    const harmonics: number[] = [];
    for (let i = 1; i <= 7; i++) {  // 7 harmonics
      harmonics.push(this.frequency * i);
    }
    return harmonics;
  }
  
  /**
   * Generate Sims-style visual properties
   */
  private generateSimsProperties(): VisualProperties {
    return {
      colorHue: (this.id * 5.625) % 360,  // Spread across color wheel
      glowIntensity: 0.3 + (this.frequency / 10),
      pulseRate: this.frequency * 2,
      sizeModifier: 0.8 + (this.id / 64) * 0.4,  // Progressive growth
      sparkleCount: this.id % 10 + 3,
      animationSpeed: this.frequency * 1.5
    };
  }
}

/**
 * Animation pattern for resonance overlay
 */
export interface AnimationPattern {
  waveFrequency: number;
  amplitude: number;
  phaseShift: number;
  animationType: string;
  duration: number;
  loop: boolean;
}

/**
 * Visual effect for overlay between two elements
 */
export interface OverlayVisual {
  connectionType: string;
  colorBlend: number;  // Hue in degrees
  glowPattern: string;
  particleTrail: boolean;
  sparkleBridge: boolean;
  intensity: number;
}

/**
 * GameGAN resonance overlay between two codons
 */
export interface ResonanceOverlay {
  type: string;
  element1Id: number;
  element2Id: number;
  resonanceStrength: number;
  visualEffect: OverlayVisual;
  animationPattern: AnimationPattern;
}

/**
 * Progressive codon scene that builds with each addition
 */
export class ProgressiveCodonScene {
  elements: CodonResonanceElement[] = [];
  resonanceOverlays: ResonanceOverlay[] = [];
  sceneComplexity: number = 0;
  
  /**
   * Add new codon to scene, building on previous
   */
  addCodon(codonId: number): {
    sceneData: string;
    totalElements: number;
    resonanceOverlays: number;
    complexityLevel: number;
  } {
    const newElement = new CodonResonanceElement(codonId, CODON_SEQUENCE[codonId - 1]);
    this.elements.push(newElement);
    
    // Calculate resonance with existing elements
    const newResonances = this.calculateResonanceOverlays(newElement);
    this.resonanceOverlays.push(...newResonances);
    
    // Build progressive scene
    const sceneData = this.renderProgressiveScene();
    
    return {
      sceneData,
      totalElements: this.elements.length,
      resonanceOverlays: this.resonanceOverlays.length,
      complexityLevel: this.sceneComplexity
    };
  }
  
  /**
   * Calculate GameGAN overlays between new element and existing ones
   */
  private calculateResonanceOverlays(newElement: CodonResonanceElement): ResonanceOverlay[] {
    const overlays: ResonanceOverlay[] = [];
    
    // Don't include the new element itself
    for (let i = 0; i < this.elements.length - 1; i++) {
      const existing = this.elements[i];
      
      // Calculate frequency resonance
      const freqRatio = newElement.frequency / existing.frequency;
      
      // Create overlay if frequencies are in harmonic relationship
      if (this.isHarmonicResonance(freqRatio)) {
        overlays.push({
          type: 'harmonic_bridge',
          element1Id: existing.id,
          element2Id: newElement.id,
          resonanceStrength: this.calculateResonanceStrength(freqRatio),
          visualEffect: this.generateOverlayVisual(existing, newElement),
          animationPattern: this.createResonanceAnimation(freqRatio)
        });
      }
    }
    
    return overlays;
  }
  
  /**
   * Check if frequency ratio creates harmonic resonance
   */
  private isHarmonicResonance(freqRatio: number): boolean {
    // Check for simple harmonic ratios (octaves, fifths, fourths, etc.)
    const harmonicRatios = [0.5, 0.75, 1.0, 1.33, 1.5, 2.0, 2.5, 3.0];
    const tolerance = 0.1;
    
    for (const ratio of harmonicRatios) {
      if (Math.abs(freqRatio - ratio) < tolerance) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * Calculate strength of resonance between frequencies
   */
  private calculateResonanceStrength(freqRatio: number): number {
    // Perfect harmonic ratios have strongest resonance
    const perfectRatios: Record<number, number> = {
      0.5: 1.0,
      0.75: 0.8,
      1.0: 1.0,
      1.5: 0.9,
      2.0: 1.0
    };
    
    for (const [ratio, strength] of Object.entries(perfectRatios)) {
      if (Math.abs(freqRatio - parseFloat(ratio)) < 0.1) {
        return strength;
      }
    }
    
    return 0.3;  // Weak resonance for non-harmonic ratios
  }
  
  /**
   * Generate Sims-style visual overlay between two elements
   */
  private generateOverlayVisual(
    elem1: CodonResonanceElement,
    elem2: CodonResonanceElement
  ): OverlayVisual {
    return {
      connectionType: 'energy_beam',
      colorBlend: this.blendColors(
        elem1.visualProperties.colorHue,
        elem2.visualProperties.colorHue
      ),
      glowPattern: 'pulsing_wave',
      particleTrail: true,
      sparkleBridge: true,
      intensity: (elem1.visualProperties.glowIntensity + elem2.visualProperties.glowIntensity) / 2
    };
  }
  
  /**
   * Create animation pattern for resonance overlay
   */
  private createResonanceAnimation(freqRatio: number): AnimationPattern {
    return {
      waveFrequency: freqRatio * 2,
      amplitude: Math.min(freqRatio, 2.0),
      phaseShift: freqRatio * Math.PI,
      animationType: 'sine_wave_flow',
      duration: 3.0 + freqRatio,
      loop: true
    };
  }
  
  /**
   * Render complete scene with all elements and overlays
   */
  private renderProgressiveScene(): string {
    // ASCII/text representation of the scene
    let scene = `╔${'═'.repeat(68)}╗\n`;
    scene += `║${' '.repeat(20)}CODON RESONANCE SCENE${' '.repeat(25)}║\n`;
    scene += `╚${'═'.repeat(68)}╝\n\n`;
    
    scene += `Elements: ${this.elements.length}/64\n`;
    scene += `Resonance Overlays: ${this.resonanceOverlays.length}\n`;
    scene += `Complexity: ${this.sceneComplexity}\n\n`;
    
    // Show last 5 elements
    const recentElements = this.elements.slice(-5);
    scene += `Recent Codons:\n`;
    for (const elem of recentElements) {
      scene += `  ${elem.id}: ${elem.sequence} (freq: ${elem.frequency.toFixed(2)} Hz)\n`;
    }
    
    // Show recent overlays
    if (this.resonanceOverlays.length > 0) {
      const recentOverlays = this.resonanceOverlays.slice(-3);
      scene += `\nRecent Resonances:\n`;
      for (const overlay of recentOverlays) {
        scene += `  ${overlay.element1Id} ↔ ${overlay.element2Id} (strength: ${overlay.resonanceStrength.toFixed(2)})\n`;
      }
    }
    
    this.sceneComplexity = this.elements.length * this.resonanceOverlays.length;
    
    return scene;
  }
  
  /**
   * Blend two color hues
   */
  private blendColors(hue1: number, hue2: number): number {
    return (hue1 + hue2) / 2;
  }
}

/**
 * Main system for generating 64-codon progressive resonance scenes
 */
export class CodonResonanceGameGAN {
  progressiveScene: ProgressiveCodonScene;
  generatedScenes: any[] = [];
  
  constructor() {
    this.progressiveScene = new ProgressiveCodonScene();
  }
  
  /**
   * Generate all 64 progressive codon scenes
   */
  generateAll64Codons(): any[] {
    console.log('🌟 Generating 64-Codon Progressive Resonance Scenes...');
    
    for (let codonId = 1; codonId <= 64; codonId++) {
      const scene = this.progressiveScene.addCodon(codonId);
      this.generatedScenes.push({
        codonId,
        codon: CODON_SEQUENCE[codonId - 1],
        ...scene
      });
    }
    
    return this.generatedScenes;
  }
  
  /**
   * Add single codon and get updated scene
   */
  addCodon(codonId: number) {
    if (codonId < 1 || codonId > 64) {
      throw new Error('Codon ID must be between 1 and 64');
    }
    
    return this.progressiveScene.addCodon(codonId);
  }
  
  /**
   * Get current scene state
   */
  getCurrentScene() {
    return {
      elements: this.progressiveScene.elements,
      overlays: this.progressiveScene.resonanceOverlays,
      complexity: this.progressiveScene.sceneComplexity
    };
  }
  
  /**
   * Reset scene
   */
  reset() {
    this.progressiveScene = new ProgressiveCodonScene();
    this.generatedScenes = [];
  }
  
  /**
   * Map latent vector to codon ID
   */
  latentToCodonId(latent: number[]): number {
    // Map first component from [-1, 1] to [1, 64]
    const normalized = (latent[0] + 1) / 2;  // [0, 1]
    const codonId = Math.floor(normalized * 64) + 1;
    return Math.max(1, Math.min(64, codonId));
  }
}
