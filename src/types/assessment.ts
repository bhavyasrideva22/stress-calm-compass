export interface AssessmentQuestion {
  id: string;
  type: 'likert' | 'scenario' | 'forced-choice';
  section: 'foundations' | 'personality' | 'scenarios' | 'pearl';
  question: string;
  description?: string;
  dimension?: string[];
  reverseScored?: boolean;
}

export interface LikertQuestion extends AssessmentQuestion {
  type: 'likert';
  labels?: string[];
}

export interface ScenarioQuestion extends AssessmentQuestion {
  type: 'scenario';
  scenario: string;
  options: ScenarioOption[];
}

export interface ScenarioOption {
  id: string;
  text: string;
  score: number;
}

export interface AssessmentResponse {
  questionId: string;
  value: number;
  confidence?: number;
  selectedOption?: string;
  timestamp: Date;
}

export interface DimensionScore {
  dimension: string;
  score: number;
  label: string;
  interpretation: string;
}

export interface AssessmentResults {
  overallScore: number;
  dimensionScores: DimensionScore[];
  profileLabel: string;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
  pearlScores: {
    presence: number;
    empathy: number;
    affectRegulation: number;
    relationalAgility: number;
    leadershipMindset: number;
  };
}