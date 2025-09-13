import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AssessmentProgress } from "./AssessmentProgress";
import { LikertScale } from "./LikertScale";
import { ScenarioQuestion } from "./ScenarioQuestion";
import { foundationsQuestions, scenarioQuestions, personalityQuestions, pearlQuestions } from "@/data/questions";
import { AssessmentResponse } from "@/types/assessment";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AssessmentFlowProps {
  onComplete: (responses: AssessmentResponse[]) => void;
  onBack: () => void;
}

export const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const allQuestions = [
    ...foundationsQuestions,
    ...personalityQuestions, 
    ...scenarioQuestions,
    ...pearlQuestions
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);

  const getSectionProgress = () => {
    const sectionQuestions = {
      foundations: foundationsQuestions.length,
      personality: personalityQuestions.length,
      scenarios: scenarioQuestions.length,
      pearl: pearlQuestions.length
    };

    const completedSections: string[] = [];
    let questionIndex = 0;

    // Check foundations
    const foundationsCompleted = responses.filter(r => 
      foundationsQuestions.some(q => q.id === r.questionId)
    ).length;
    if (foundationsCompleted === sectionQuestions.foundations) {
      completedSections.push("foundations");
    }
    questionIndex += sectionQuestions.foundations;

    // Check personality
    const personalityCompleted = responses.filter(r => 
      personalityQuestions.some(q => q.id === r.questionId)
    ).length;
    if (personalityCompleted === sectionQuestions.personality) {
      completedSections.push("personality");
    }
    questionIndex += sectionQuestions.personality;

    // Check scenarios
    const scenariosCompleted = responses.filter(r => 
      scenarioQuestions.some(q => q.id === r.questionId)
    ).length;
    if (scenariosCompleted === sectionQuestions.scenarios) {
      completedSections.push("scenarios");
    }
    questionIndex += sectionQuestions.scenarios;

    // Check pearl
    const pearlCompleted = responses.filter(r => 
      pearlQuestions.some(q => q.id === r.questionId)
    ).length;
    if (pearlCompleted === sectionQuestions.pearl) {
      completedSections.push("pearl");
    }

    return { completedSections, currentSection: currentQuestion.section };
  };

  const updateResponse = (value: number, confidence?: number, selectedOption?: string) => {
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      value,
      confidence,
      selectedOption,
      timestamp: new Date()
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const isAnswered = () => {
    if (!currentResponse) return false;
    if (currentQuestion.type === "scenario") {
      return currentResponse.selectedOption && currentResponse.confidence !== undefined;
    }
    return currentResponse.value !== undefined;
  };

  const { completedSections, currentSection } = getSectionProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <AssessmentProgress
        currentStep={currentQuestionIndex + 1}
        totalSteps={allQuestions.length}
        currentSection={currentSection}
        completedSections={completedSections}
      />

      <div className="container mx-auto max-w-4xl p-6">
        <div className="space-y-6">
          {/* Question */}
          {currentQuestion.type === "likert" && (
            <LikertScale
              question={currentQuestion.question}
              description={currentQuestion.description}
              value={currentResponse?.value || null}
              onChange={(value) => updateResponse(value)}
            />
          )}

          {currentQuestion.type === "scenario" && (
            <ScenarioQuestion
              scenario={currentQuestion.scenario || ""}
              options={currentQuestion.options || []}
              selectedOption={currentResponse?.selectedOption || null}
              confidence={currentResponse?.confidence || 50}
              onOptionSelect={(optionId) => {
                const option = currentQuestion.options?.find(o => o.id === optionId);
                if (option) {
                  updateResponse(option.score, currentResponse?.confidence || 50, optionId);
                }
              }}
              onConfidenceChange={(confidence) => {
                if (currentResponse?.selectedOption) {
                  updateResponse(currentResponse.value, confidence, currentResponse.selectedOption);
                }
              }}
            />
          )}

          {/* Navigation */}
          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {currentQuestionIndex === 0 ? "Back to Intro" : "Previous"}
                </Button>

                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {allQuestions.length}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!isAnswered()}
                  className="flex items-center gap-2"
                >
                  {currentQuestionIndex === allQuestions.length - 1 ? "Complete Assessment" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};