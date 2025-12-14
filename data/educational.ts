export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: number;
  points: number;
  locked: boolean;
  requiredPoints?: number;
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Rise and Fall of Ancient Civilizations",
    description: "Explore how great empires emerged and eventually declined throughout history",
    duration: "15 min",
    difficulty: "Beginner"
  },
  {
    id: "2",
    title: "Climate Change Through the Ages",
    description: "Understanding Earth's climate patterns from ice ages to global warming",
    duration: "20 min",
    difficulty: "Intermediate"
  },
  {
    id: "3",
    title: "Architecture Evolution",
    description: "From ancient pyramids to futuristic skyscrapers - the story of human construction",
    duration: "18 min",
    difficulty: "Beginner"
  },
  {
    id: "4",
    title: "Technology Timeline",
    description: "Major technological breakthroughs that shaped human civilization",
    duration: "25 min",
    difficulty: "Advanced"
  },
  {
    id: "5",
    title: "Future Cities Prediction",
    description: "How AI and climate science predict our urban future",
    duration: "22 min",
    difficulty: "Intermediate"
  }
];

export const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Ancient World Basics",
    questions: 10,
    points: 50,
    locked: false
  },
  {
    id: "2",
    title: "Medieval Times Challenge",
    questions: 15,
    points: 75,
    locked: false
  },
  {
    id: "3",
    title: "Industrial Revolution",
    questions: 12,
    points: 60,
    locked: false
  },
  {
    id: "4",
    title: "Future Predictions Expert",
    questions: 20,
    points: 100,
    locked: true,
    requiredPoints: 500
  },
  {
    id: "5",
    title: "Time Travel Master",
    questions: 25,
    points: 150,
    locked: true,
    requiredPoints: 1000
  }
];