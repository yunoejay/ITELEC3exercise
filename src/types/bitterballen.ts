export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
}

export interface Ingredient {
  name: string;
  amount: string;
  type: 'main' | 'coating' | 'seasoning';
}

export interface BitterballenData {
  id: number;
  name: string;
  description: string;
  origin: string;
  servingSize: string;
  preparationTime: string;
  cookingTime: string;
  difficulty: string;
  ingredients: Ingredient[];
  nutritionalInfo: NutritionalInfo;
  instructions: string[];
  image: string;
  tags: string[];
}

export interface ApiResponse {
  data: BitterballenData;
  success: boolean;
  message: string;
}