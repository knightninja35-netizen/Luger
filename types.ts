
export enum Category {
  Wanyama = 'Wanyama',
  Matunda = 'Matunda',
  Nambari = 'Nambari'
}

export interface VocabularyItem {
  id: string;
  swahili: string;
  english: string;
  category: Category;
  imageUrl: string;
}

export interface GameState {
  points: number;
  lives: number;
  lastLifeLostAt: number | null; // Timestamp
  level: number;
  currentScreen: 'home' | 'lesson-select' | 'game' | 'game-over' | 'victory';
  selectedCategory: Category | null;
}

export interface Question {
  correct: VocabularyItem;
  options: VocabularyItem[];
  type: 'word-to-image' | 'image-to-word' | 'audio-to-image';
}
