
import { Category, VocabularyItem } from './types';

export const MAX_LIVES = 5;
export const RECHARGE_TIME_MS = 20 * 60 * 1000; // 20 minutes

export const VOCABULARY: VocabularyItem[] = [
  // Animals (Wanyama)
  { id: 'a1', swahili: 'Simba', english: 'Lion', category: Category.Wanyama, imageUrl: '🦁' },
  { id: 'a2', swahili: 'Kima', english: 'Monkey', category: Category.Wanyama, imageUrl: '🐒' },
  { id: 'a3', swahili: 'Twiga', english: 'Giraffe', category: Category.Wanyama, imageUrl: '🦒' },
  { id: 'a4', swahili: 'Tembo', english: 'Elephant', category: Category.Wanyama, imageUrl: '🐘' },
  { id: 'a5', swahili: 'Punda Milia', english: 'Zebra', category: Category.Wanyama, imageUrl: '🦓' },
  { id: 'a6', swahili: 'Kifaru', english: 'Rhino', category: Category.Wanyama, imageUrl: '🦏' },
  { id: 'a7', swahili: 'Mamba', english: 'Crocodile', category: Category.Wanyama, imageUrl: '🐊' },
  
  // Fruits (Matunda)
  { id: 'f1', swahili: 'Embe', english: 'Mango', category: Category.Matunda, imageUrl: '🥭' },
  { id: 'f2', swahili: 'Ndizi', english: 'Banana', category: Category.Matunda, imageUrl: '🍌' },
  { id: 'f3', swahili: 'Nanasi', english: 'Pineapple', category: Category.Matunda, imageUrl: '🍍' },
  { id: 'f4', swahili: 'Chungwa', english: 'Orange', category: Category.Matunda, imageUrl: '🍊' },
  { id: 'f5', swahili: 'Tikiti Maji', english: 'Watermelon', category: Category.Matunda, imageUrl: '🍉' },

  // Numbers (Nambari)
  { id: 'n1', swahili: 'Moja', english: 'One', category: Category.Nambari, imageUrl: '1️⃣' },
  { id: 'n2', swahili: 'Mbili', english: 'Two', category: Category.Nambari, imageUrl: '2️⃣' },
  { id: 'n3', swahili: 'Tatu', english: 'Three', category: Category.Nambari, imageUrl: '3️⃣' },
  { id: 'n4', swahili: 'Nne', english: 'Four', category: Category.Nambari, imageUrl: '4️⃣' },
  { id: 'n5', swahili: 'Tano', english: 'Five', category: Category.Nambari, imageUrl: '5️⃣' },
];
