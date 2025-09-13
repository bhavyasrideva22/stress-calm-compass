import { useState } from "react";
import { AssessmentIntro } from "@/components/AssessmentIntro";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { AssessmentResults } from "@/components/AssessmentResults";
import { AssessmentResponse, AssessmentResults as Results } from "@/types/assessment";
import { calculateResults } from "@/utils/scoring";

type AppState = "intro" | "assessment" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("intro");
  const [assessmentResults, setAssessmentResults] = useState<Results | null>(null);

  const handleStartAssessment = () => {
    setCurrentState("assessment");
  };

  const handleAssessmentComplete = (responses: AssessmentResponse[]) => {
    const results = calculateResults(responses);
    setAssessmentResults(results);
    setCurrentState("results");
  };

  const handleRestart = () => {
    setCurrentState("intro");
    setAssessmentResults(null);
  };

  const handleBackToIntro = () => {
    setCurrentState("intro");
  };

  return (
    <div>
      {currentState === "intro" && (
        <AssessmentIntro onStart={handleStartAssessment} />
      )}
      
      {currentState === "assessment" && (
        <AssessmentFlow 
          onComplete={handleAssessmentComplete}
          onBack={handleBackToIntro}
        />
      )}
      
      {currentState === "results" && assessmentResults && (
        <AssessmentResults 
          results={assessmentResults}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
