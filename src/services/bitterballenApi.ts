import axios from 'axios';
import type { ApiResponse, BitterballenData } from '../types/bitterballen';

const mockBitterballenData: BitterballenData = {
  id: 1,
  name: "Dutch Bitterballen",
  description: "Classic Dutch deep-fried beef croquettes with a crispy breadcrumb exterior and creamy beef filling",
  origin: "Netherlands",
  servingSize: "6 pieces (120g)",
  preparationTime: "30 minutes",
  cookingTime: "15 minutes",
  difficulty: "Medium",
  ingredients: [
    { name: "Beef chuck roast", amount: "500g", type: "main" },
    { name: "Butter", amount: "60g", type: "main" },
    { name: "All-purpose flour", amount: "60g", type: "main" },
    { name: "Beef stock", amount: "300ml", type: "main" },
    { name: "Onion", amount: "1 medium", type: "main" },
    { name: "Bay leaves", amount: "2 pieces", type: "seasoning" },
    { name: "Nutmeg", amount: "1/4 tsp", type: "seasoning" },
    { name: "Salt", amount: "to taste", type: "seasoning" },
    { name: "Black pepper", amount: "to taste", type: "seasoning" },
    { name: "Fresh parsley", amount: "2 tbsp", type: "seasoning" },
    { name: "Eggs", amount: "2 large", type: "coating" },
    { name: "Breadcrumbs", amount: "200g", type: "coating" },
    { name: "Vegetable oil", amount: "for frying", type: "coating" }
  ],
  nutritionalInfo: {
    calories: 285,
    protein: 15.2,
    carbohydrates: 18.5,
    fat: 18.8,
    fiber: 1.2,
    sugar: 2.1,
    sodium: 420,
    cholesterol: 65
  },
  instructions: [
    "Cook the beef with onion and bay leaves until tender",
    "Make a roux with butter and flour",
    "Add beef stock gradually to create a thick sauce",
    "Mix in the cooked beef and seasonings",
    "Let the mixture cool completely",
    "Shape into small balls",
    "Coat with egg and breadcrumbs",
    "Deep fry until golden brown"
  ],
  image: "/images/bitterballen.jpg",
  tags: ["Appetizer", "Deep-fried", "Beef", "Traditional", "Pub Food"]
};

export const fetchBitterballenData = async (): Promise<BitterballenData> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockBitterballenData;
  } catch (error) {
    console.error('Error fetching bitterballen data:', error);
    throw new Error('Failed to fetch bitterballen data');
  }
};

export const searchBitterballenRecipes = async (_query: string): Promise<BitterballenData[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [mockBitterballenData];
  } catch (error) {
    console.error('Error searching bitterballen recipes:', error);
    throw new Error('Failed to search recipes');
  }
};