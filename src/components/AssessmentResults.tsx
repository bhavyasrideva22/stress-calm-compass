import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AssessmentResults as Results } from "@/types/assessment";
import { Trophy, Target, TrendingUp, Brain, Heart, Users, Zap, Star } from "lucide-react";

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getDimensionIcon = (dimension: string) => {
    const icons: Record<string, any> = {
      "self-awareness": Brain,
      "self-regulation": Target,
      "empathy": Heart,
      "social-skills": Users,
      "motivation": Zap
    };
    return icons[dimension] || Star;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return "bg-success/10";
    if (score >= 50) return "bg-warning/10";
    return "bg-destructive/10";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-6">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-elevated mb-4">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Your Assessment Results</h1>
          <p className="text-xl text-muted-foreground">
            Emotion Regulation Under Stress Profile
          </p>
        </div>

        {/* Overall Score */}
        <Card className="shadow-elevated border-0 bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Overall Emotional Regulation Score</CardTitle>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary">
                {Math.round(results.overallScore)}
              </div>
              <Badge 
                variant="secondary" 
                className={`text-lg px-4 py-2 ${getScoreBg(results.overallScore)}`}
              >
                {results.profileLabel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={results.overallScore} className="h-3 mb-4" />
            <p className="text-center text-muted-foreground">
              Your ability to regulate emotions effectively under stress situations
            </p>
          </CardContent>
        </Card>

        {/* Dimension Scores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.dimensionScores.map((dimension) => {
            const Icon = getDimensionIcon(dimension.dimension);
            return (
              <Card key={dimension.dimension} className="shadow-card border-0 bg-gradient-to-br from-card to-muted/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${getScoreBg(dimension.score)} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${getScoreColor(dimension.score)}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg capitalize">
                        {dimension.dimension.replace('-', ' ')}
                      </CardTitle>
                      <CardDescription>{dimension.label}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {Math.round(dimension.score)}
                    </span>
                    <span className="text-sm text-muted-foreground">/ 100</span>
                  </div>
                  <Progress value={dimension.score} className="h-2" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dimension.interpretation}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* PEARL Framework */}
        <Card className="shadow-elevated border-0 bg-gradient-to-br from-card to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              PEARL Framework Scores
            </CardTitle>
            <CardDescription>
              Your performance across the five key dimensions of emotional regulation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(results.pearlScores).map(([key, score]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize text-sm">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {Math.round(score)}
                    </span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Growth Areas */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card border-0 bg-gradient-to-br from-success/5 to-card">
            <CardHeader>
              <CardTitle className="text-xl text-success flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-warning/5 to-card">
            <CardHeader>
              <CardTitle className="text-xl text-warning flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.growthAreas.map((area, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning"></div>
                    {area}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-elevated border-0 bg-gradient-to-br from-card to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Start with these specific practices to improve your emotion regulation under stress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-secondary-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={onRestart}
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 h-auto"
          >
            Take Assessment Again
          </Button>
          <p className="text-sm text-muted-foreground">
            Your results provide the foundation for a personalized 4-week growth plan
          </p>
        </div>
      </div>
    </div>
  );
};