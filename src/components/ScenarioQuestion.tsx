import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ScenarioOption {
  id: string;
  text: string;
  score: number;
}

interface ScenarioQuestionProps {
  scenario: string;
  options: ScenarioOption[];
  selectedOption: string | null;
  confidence: number;
  onOptionSelect: (optionId: string) => void;
  onConfidenceChange: (confidence: number) => void;
}

export const ScenarioQuestion = ({
  scenario,
  options,
  selectedOption,
  confidence,
  onOptionSelect,
  onConfidenceChange,
}: ScenarioQuestionProps) => {
  return (
    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/20">
      <CardContent className="p-6 space-y-6">
        {/* Scenario */}
        <div className="space-y-3">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Stress Scenario
          </Badge>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-foreground leading-relaxed text-base">
              {scenario}
            </p>
          </div>
        </div>

        {/* Response Options */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">How would you most likely respond?</h4>
          <div className="space-y-3">
            {options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => onOptionSelect(option.id)}
                className={cn(
                  "w-full p-4 rounded-lg border-2 text-left transition-all duration-200",
                  "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20",
                  selectedOption === option.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-background hover:border-muted-foreground/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0",
                    selectedOption === option.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {option.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Confidence Slider */}
        {selectedOption && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">
                  How confident are you in this response?
                </label>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {confidence}%
                </Badge>
              </div>
              <Slider
                value={[confidence]}
                onValueChange={(value) => onConfidenceChange(value[0])}
                max={100}
                min={0}
                step={5}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not confident</span>
                <span>Very confident</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};