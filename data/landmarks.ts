export interface Landmark {
  id: string;
  name: string;
  location: string;
  category: string;
  era: string;
  imageUrl: string;
  description: string;
  rating: number;
  historicalFacts: string[];
  futurePredictions: string[];
}

export const landmarks: Landmark[] = [
  {
    id: "1",
    name: "Kaaba",
    location: "Makkah, Saudi Arabia",
    category: "Religious",
    era: "Ancient",
    imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
    description: "The most sacred site in Islam, the Kaaba is a cuboid building at the center of Islam's most important mosque, the Masjid al-Haram.",
    rating: 5.0,
    historicalFacts: [
      "Built by Prophet Ibrahim (Abraham) and his son Ismail around 2000 BCE",
      "Has been rebuilt several times throughout history",
      "The Black Stone dates back to the time of Adam and Eve"
    ],
    futurePredictions: [
      "Advanced crowd management with AI-powered systems",
      "Holographic guidance for pilgrims",
      "Climate-controlled expanded prayer areas"
    ]
  },
  {
    id: "2",
    name: "Pyramids of Giza",
    location: "Cairo, Egypt",
    category: "Ancient",
    era: "Ancient",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800",
    description: "The last surviving wonder of the ancient world, built as tombs for pharaohs over 4,500 years ago.",
    rating: 4.9,
    historicalFacts: [
      "Built around 2560 BCE during the Fourth Dynasty",
      "Originally covered in smooth white limestone",
      "Aligned precisely with cardinal directions"
    ],
    futurePredictions: [
      "Underground chambers revealed by quantum scanning",
      "Protective energy shields against erosion",
      "Virtual time-travel experiences inside pyramids"
    ]
  },
  {
    id: "3",
    name: "Colosseum",
    location: "Rome, Italy",
    category: "Ancient",
    era: "Classical",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
    description: "The largest amphitheatre ever built, a symbol of Imperial Rome's power and engineering prowess.",
    rating: 4.8,
    historicalFacts: [
      "Completed in 80 AD under Emperor Titus",
      "Could hold 50,000 to 80,000 spectators",
      "Featured elaborate underground passages and elevators"
    ],
    futurePredictions: [
      "Fully restored with self-healing materials",
      "Holographic gladiator shows",
      "Anti-gravity viewing platforms"
    ]
  },
  {
    id: "4",
    name: "Eiffel Tower",
    location: "Paris, France",
    category: "Modern",
    era: "Industrial",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
    description: "Iron lattice tower built in 1889, became a global cultural icon of France.",
    rating: 4.7,
    historicalFacts: [
      "Built for the 1889 World's Fair",
      "Was the world's tallest structure until 1930",
      "Originally intended to be temporary"
    ],
    futurePredictions: [
      "Solar panel coating generating city power",
      "Vertical gardens and air purification systems",
      "Teleportation hub at the top"
    ]
  },
  {
    id: "5",
    name: "Statue of Liberty",
    location: "New York, USA",
    category: "Modern",
    era: "Industrial",
    imageUrl: "https://images.unsplash.com/photo-1503572327579-b5c6afe5c5c5?w=800",
    description: "A symbol of freedom and democracy, gifted by France to the United States in 1886.",
    rating: 4.6,
    historicalFacts: [
      "Designed by Frédéric Auguste Bartholdi",
      "Internal structure by Gustave Eiffel",
      "Copper statue turned green due to oxidation"
    ],
    futurePredictions: [
      "Rising sea walls protecting from climate change",
      "Interactive holographic museum inside",
      "Energy-generating torch powering Manhattan"
    ]
  },
  {
    id: "6",
    name: "Taj Mahal",
    location: "Agra, India",
    category: "Religious",
    era: "Medieval",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    description: "A white marble mausoleum built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
    rating: 4.9,
    historicalFacts: [
      "Built between 1632 and 1653",
      "Combines Islamic, Persian, and Indian architecture",
      "Changes color throughout the day"
    ],
    futurePredictions: [
      "Self-cleaning nano-coating preserving marble",
      "Augmented reality showing original gardens",
      "Atmospheric dome protecting from pollution"
    ]
  },
  {
    id: "7",
    name: "Great Wall of China",
    location: "Beijing, China",
    category: "Ancient",
    era: "Ancient",
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800",
    description: "A series of fortifications built across the historical northern borders of ancient Chinese states.",
    rating: 4.8,
    historicalFacts: [
      "Construction began in 7th century BC",
      "Total length over 21,000 kilometers",
      "Visible from space is a myth"
    ],
    futurePredictions: [
      "Solar panel integration along entire length",
      "Maglev transportation system on top",
      "Living wall with vertical forests"
    ]
  },
  {
    id: "8",
    name: "Burj Khalifa",
    location: "Dubai, UAE",
    category: "Modern",
    era: "Contemporary",
    imageUrl: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
    description: "The world's tallest building, a symbol of Dubai's rapid development and ambition.",
    rating: 4.7,
    historicalFacts: [
      "Completed in 2010",
      "Stands at 828 meters (2,717 feet)",
      "Has the world's highest observation deck"
    ],
    futurePredictions: [
      "Extended to reach low Earth orbit",
      "Self-sustaining vertical city",
      "Weather control systems at the top"
    ]
  }
];