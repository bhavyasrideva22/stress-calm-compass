import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  currentSection: string;
  completedSections: string[];
}

export const AssessmentProgress = ({ 
  currentStep, 
  totalSteps, 
  currentSection, 
  completedSections 
}: AssessmentProgressProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  const sections = [
    { name: "Foundations", id: "foundations" },
    { name: "Personality", id: "personality" },
    { name: "Scenarios", id: "scenarios" },
    { name: "PEARL", id: "pearl" }
  ];

  return (
    <div className="bg-card border-b border-border p-4 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">
                Assessment Progress
              </span>
              <span className="text-sm text-muted-foreground">
                {currentStep} of {totalSteps} questions
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Section Indicators */}
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => {
              const isCompleted = completedSections.includes(section.id);
              const isCurrent = currentSection === section.id;
              
              return (
                <Badge
                  key={section.id}
                  variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}
                  className={
                    isCompleted 
                      ? "bg-success text-success-foreground" 
                      : isCurrent 
                        ? "bg-primary text-primary-foreground"
                        : ""
                  }
                >
                  {section.name}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};