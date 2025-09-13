import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Target, TrendingUp } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 p-6">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-elevated mb-6">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Personal & Emotional Intelligence Assessment
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Emotion Regulation Under Stress
          </p>
          
          <div className="bg-card rounded-lg p-6 shadow-card max-w-3xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed">
              Emotional regulation under stress is one of the most powerful skills you can build. When life, school, work, 
              or relationships put pressure on you, how you respond makes a huge difference in your well‑being, performance, 
              and how others see you.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-lg">Understand Your Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Discover how you currently respond to stress and identify your emotional strengths and growth areas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg">Personalized Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Receive detailed scores across key emotional intelligence dimensions with visual feedback and clear explanations.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/30 md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">4-Week Growth Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get a customized action plan with specific habits, reflections, and techniques for managing stress more effectively.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Details */}
        <Card className="shadow-elevated border-0 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You'll Discover</CardTitle>
            <CardDescription className="text-lg">
              This comprehensive assessment covers multiple dimensions of emotional intelligence under stress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-primary">Assessment Areas</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Psychometric Foundations (12 questions)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    Personality & Emotional Style (8 questions)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    Situational EQ Scenarios (8 situations)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-light"></div>
                    PEARL Framework Analysis (5 dimensions)
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-primary">Time Investment</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Assessment:</strong> 15-20 minutes</p>
                  <p><strong>Results Review:</strong> 10-15 minutes</p>
                  <p><strong>Growth Plan:</strong> 4 weeks of guided development</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 text-center">
              <Button 
                onClick={onStart}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                Begin Assessment
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Takes approximately 15-20 minutes to complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};