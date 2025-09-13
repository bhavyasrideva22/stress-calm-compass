import { LikertQuestion, ScenarioQuestion } from "@/types/assessment";

export const foundationsQuestions: LikertQuestion[] = [
  {
    id: "f1",
    type: "likert",
    section: "foundations",
    question: "When I feel stressed, I can identify exactly what emotions I'm experiencing (anger, anxiety, frustration, etc.).",
    dimension: ["self-awareness"]
  },
  {
    id: "f2", 
    type: "likert",
    section: "foundations",
    question: "In high pressure situations, I'm able to pause before reacting.",
    dimension: ["self-regulation"]
  },
  {
    id: "f3",
    type: "likert", 
    section: "foundations",
    question: "I can tell when I am starting to get overwhelmed, by noticing physical signs or changes in thinking.",
    dimension: ["self-awareness", "self-regulation"]
  },
  {
    id: "f4",
    type: "likert",
    section: "foundations", 
    question: "Even when stressed, I try to understand how others might be feeling.",
    dimension: ["empathy"]
  },
  {
    id: "f5",
    type: "likert",
    section: "foundations",
    question: "When conflicts arise under stress, I can express my feelings calmly without blaming others.",
    dimension: ["self-regulation", "social-skills"]
  },
  {
    id: "f6",
    type: "likert",
    section: "foundations",
    question: "Staying focused on meaningful goals helps me stay calm under pressure.",
    dimension: ["motivation", "self-regulation"]
  },
  {
    id: "f8",
    type: "likert",
    section: "foundations",
    question: "When I'm under stress, I often snap at people or say things I later regret.",
    dimension: ["self-regulation", "social-skills"],
    reverseScored: true
  },
  {
    id: "f9",
    type: "likert",
    section: "foundations",
    question: "Stress causes me to shut down or avoid dealing with problems.",
    dimension: ["self-regulation", "motivation"],
    reverseScored: true
  },
  {
    id: "f11",
    type: "likert",
    section: "foundations", 
    question: "When things go wrong, I often remind myself that setbacks are part of growth.",
    dimension: ["motivation", "self-regulation"]
  }
];

export const scenarioQuestions: ScenarioQuestion[] = [
  {
    id: "s1",
    type: "scenario",
    section: "scenarios",
    question: "High demands, low resources scenario",
    scenario: "You are nearing an important deadline, multiple tasks are urgent, you feel your heart pounding, hands sweaty. What do you do?",
    dimension: ["self-regulation", "motivation"],
    options: [
      {
        id: "s1a",
        text: "Push through, often skipping rest, hoping to finish no matter what.",
        score: 2
      },
      {
        id: "s1b", 
        text: "Pause, take two or three deep breaths, re-prioritize tasks, tackle in order.",
        score: 5
      },
      {
        id: "s1c",
        text: "Procrastinate or avoid because the stress seems overwhelming.",
        score: 1
      },
      {
        id: "s1d",
        text: "Delegate or ask for help, even if you feel like you should do it all yourself.",
        score: 4
      }
    ]
  },
  {
    id: "s2",
    type: "scenario", 
    section: "scenarios",
    question: "Receiving unexpected feedback",
    scenario: "You receive feedback at work/school that you did not meet expectations. In that moment you feel embarrassed and defensive. Which response fits you best?",
    dimension: ["self-awareness", "self-regulation"],
    options: [
      {
        id: "s2a",
        text: "You respond immediately, defending yourself.",
        score: 1
      },
      {
        id: "s2b",
        text: "You take a moment, ask clarifying questions, then try to understand the feedback.",
        score: 5
      },
      {
        id: "s2c", 
        text: "You ignore it, or dismiss it as unfair without examining it.",
        score: 1
      },
      {
        id: "s2d",
        text: "You ruminate all night, beating yourself up in your head.",
        score: 2
      }
    ]
  },
  {
    id: "s3",
    type: "scenario",
    section: "scenarios", 
    question: "Heated group discussion",
    scenario: "You're in a heated group discussion; someone says something that triggers you. What do you most likely do?",
    dimension: ["self-regulation", "social-skills"],
    options: [
      {
        id: "s3a",
        text: "Respond immediately with similar intensity.",
        score: 1
      },
      {
        id: "s3b",
        text: "Stop, breathe, maybe ask to pause, then express your viewpoint.",
        score: 5
      },
      {
        id: "s3c",
        text: "Keep quiet, but feel resentful afterward.",
        score: 2
      },
      {
        id: "s3d",
        text: "Avoid the discussion altogether.",
        score: 1
      }
    ]
  }
];

export const personalityQuestions: LikertQuestion[] = [
  {
    id: "p1",
    type: "likert",
    section: "personality",
    question: "When I feel stressed, I tend to ruminate (repeat over and over) what triggered that stress.",
    dimension: ["neuroticism"],
    reverseScored: true
  },
  {
    id: "p2",
    type: "likert", 
    section: "personality",
    question: "I believe I have control over how I respond to stressful situations.",
    dimension: ["locus-of-control"]
  },
  {
    id: "p3",
    type: "likert",
    section: "personality",
    question: "I prefer to plan and have routines; unpredictability under stress makes me anxious.",
    dimension: ["conscientiousness"]
  },
  {
    id: "p4",
    type: "likert",
    section: "personality",
    question: "I feel more comfortable expressing feelings than keeping them inside.",
    dimension: ["extraversion"]
  },
  {
    id: "p5",
    type: "likert", 
    section: "personality",
    question: "When under pressure, I tend to withdraw rather than confront.",
    dimension: ["attachment-style"],
    reverseScored: true
  },
  {
    id: "p6",
    type: "likert",
    section: "personality",
    question: "I trust others to support me when I'm going through difficult times.",
    dimension: ["attachment-secure"]
  }
];

export const pearlQuestions: LikertQuestion[] = [
  {
    id: "pearl1",
    type: "likert",
    section: "pearl",
    question: "When I feel tension in my body or thoughts, I pause to check 'What am I feeling?'",
    dimension: ["presence"]
  },
  {
    id: "pearl2",
    type: "likert",
    section: "pearl", 
    question: "Even when I'm stressed, I try to see what someone else might be going through.",
    dimension: ["empathy"]
  },
  {
    id: "pearl3",
    type: "likert",
    section: "pearl",
    question: "I have strategies (breathing, reframing, calming) I use when I feel strong emotion.",
    dimension: ["affect-regulation"]
  },
  {
    id: "pearl4",
    type: "likert",
    section: "pearl",
    question: "I can adjust how I communicate under pressure depending on who I'm with.",
    dimension: ["relational-agility"] 
  },
  {
    id: "pearl5",
    type: "likert",
    section: "pearl",
    question: "I try to maintain hope or constructive perspective, even when many things are going wrong.",
    dimension: ["leadership-mindset"]
  }
];