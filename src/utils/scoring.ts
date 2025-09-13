import { AssessmentResponse, DimensionScore, AssessmentResults } from "@/types/assessment";

export const calculateDimensionScore = (responses: AssessmentResponse[], dimension: string): number => {
  const relevantResponses = responses.filter(response => {
    // This would be determined by question metadata
    // For now, using a simple mapping
    const dimensionMapping: Record<string, string[]> = {
      "self-awareness": ["f1", "f3", "s2"],
      "self-regulation": ["f2", "f3", "f5", "f6", "f8", "f9", "f11", "s1", "s2", "s3"],
      "empathy": ["f4", "pearl2"],
      "social-skills": ["f5", "f8", "s3"],
      "motivation": ["f6", "f9", "f11", "s1"],
      "presence": ["pearl1"],
      "affect-regulation": ["pearl3"],
      "relational-agility": ["pearl4"],
      "leadership-mindset": ["pearl5"]
    };

    return dimensionMapping[dimension]?.includes(response.questionId) || false;
  });

  if (relevantResponses.length === 0) return 0;

  const total = relevantResponses.reduce((sum, response) => sum + response.value, 0);
  const average = total / relevantResponses.length;
  
  // Convert 1-5 scale to 0-100
  return ((average - 1) / 4) * 100;
};

export const getScoreLabel = (score: number): string => {
  if (score >= 81) return "Very High";
  if (score >= 61) return "High";
  if (score >= 41) return "Moderate";
  if (score >= 21) return "Low";
  return "Very Low";
};

export const getScoreInterpretation = (dimension: string, score: number): string => {
  const label = getScoreLabel(score);
  
  const interpretations: Record<string, Record<string, string>> = {
    "self-awareness": {
      "Very High": "You have excellent awareness of your emotions and stress responses, able to identify feelings precisely even under pressure.",
      "High": "You generally notice your emotional states and stress signals, with good self-monitoring abilities.",
      "Moderate": "You sometimes notice your emotional states under stress, but may miss early warning signs or mislabel them.",
      "Low": "You have difficulty identifying your emotions under stress, often unaware of how pressure affects you.",
      "Very Low": "You rarely notice emotional states or stress responses, often surprised by your reactions."
    },
    "self-regulation": {
      "Very High": "You consistently manage impulses and remain calm under pressure, with excellent emotional control strategies.",
      "High": "You are often able to manage your impulses and remain calm when under stress, though pressure sometimes overwhelms.",
      "Moderate": "You have some ability to regulate emotions under stress, but consistency varies with situation intensity.",
      "Low": "You frequently struggle to control reactions under stress, often responding impulsively or emotionally.",
      "Very Low": "You typically react impulsively under stress with limited emotional regulation strategies."
    }
  };

  return interpretations[dimension]?.[label] || `Your ${dimension} score is ${label.toLowerCase()}.`;
};

export const calculateResults = (responses: AssessmentResponse[]): AssessmentResults => {
  const dimensions = ["self-awareness", "self-regulation", "empathy", "social-skills", "motivation"];
  
  const dimensionScores: DimensionScore[] = dimensions.map(dimension => {
    const score = calculateDimensionScore(responses, dimension);
    return {
      dimension,
      score,
      label: getScoreLabel(score),
      interpretation: getScoreInterpretation(dimension, score)
    };
  });

  const overallScore = dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length;

  const pearlScores = {
    presence: calculateDimensionScore(responses, "presence"),
    empathy: calculateDimensionScore(responses, "empathy"),
    affectRegulation: calculateDimensionScore(responses, "affect-regulation"),
    relationalAgility: calculateDimensionScore(responses, "relational-agility"),
    leadershipMindset: calculateDimensionScore(responses, "leadership-mindset")
  };

  // Determine profile label based on scores
  const profileLabel = determineProfileLabel(dimensionScores, pearlScores);
  
  // Generate recommendations
  const { strengths, growthAreas, recommendations } = generateRecommendations(dimensionScores, pearlScores);

  return {
    overallScore,
    dimensionScores,
    profileLabel,
    strengths,
    growthAreas,
    recommendations,
    pearlScores
  };
};

const determineProfileLabel = (dimensionScores: DimensionScore[], pearlScores: any): string => {
  const avgRegulation = dimensionScores.find(d => d.dimension === "self-regulation")?.score || 0;
  const avgAwareness = dimensionScores.find(d => d.dimension === "self-awareness")?.score || 0;
  const avgEmpathy = dimensionScores.find(d => d.dimension === "empathy")?.score || 0;

  if (avgRegulation >= 70 && avgAwareness >= 70) {
    return "Resilient Operator";
  } else if (avgEmpathy >= 70 && avgRegulation >= 60) {
    return "Empathic Stabilizer";
  } else if (avgAwareness >= 60 && avgRegulation < 60) {
    return "Watcher & Regulator";
  } else {
    return "Reactive Learner";
  }
};

const generateRecommendations = (dimensionScores: DimensionScore[], pearlScores: any) => {
  const strengths: string[] = [];
  const growthAreas: string[] = [];
  const recommendations: string[] = [];

  dimensionScores.forEach(dimension => {
    if (dimension.score >= 70) {
      strengths.push(`Strong ${dimension.dimension.replace('-', ' ')}`);
    } else if (dimension.score < 50) {
      growthAreas.push(`${dimension.dimension.replace('-', ' ')} development`);
    }
  });

  // Generate specific recommendations based on lowest scores
  const lowestDimension = dimensionScores.reduce((min, current) => 
    current.score < min.score ? current : min
  );

  if (lowestDimension.dimension === "self-regulation") {
    recommendations.push("Practice the 4-7-8 breathing technique when you feel stress rising");
    recommendations.push("Use a 'pause button' - count to 5 before responding in tense situations");
  } else if (lowestDimension.dimension === "self-awareness") {
    recommendations.push("Start a daily emotion check-in practice - notice and name what you're feeling");
    recommendations.push("Pay attention to physical stress signals like tension, heart rate, or breathing changes");
  }

  return { strengths, growthAreas, recommendations };
};