import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  question: string;
  description?: string;
  value: number | null;
  onChange: (value: number) => void;
  labels?: string[];
}

export const LikertScale = ({ 
  question, 
  description, 
  value, 
  onChange,
  labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
}: LikertScaleProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/20">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground leading-relaxed">
            {question}
          </h3>
          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {/* Scale Options */}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((option) => (
              <button
                key={option}
                onClick={() => onChange(option)}
                onMouseEnter={() => setHovered(option)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all duration-200 text-center space-y-2",
                  "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20",
                  value === option
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : hovered === option
                      ? "border-primary/50 bg-primary/5"
                      : "border-border bg-background hover:border-muted-foreground/30"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center text-sm font-semibold",
                  value === option
                    ? "border-primary-foreground bg-primary-foreground text-primary"
                    : "border-current"
                )}>
                  {option}
                </div>
                <div className="text-xs leading-tight">
                  {labels[option - 1]}
                </div>
              </button>
            ))}
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};