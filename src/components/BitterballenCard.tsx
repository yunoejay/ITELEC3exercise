import React, { useState, useEffect } from 'react';
import type { BitterballenData } from '../types/bitterballen';
import { fetchBitterballenData } from '../services/bitterballenApi';
import './BitterballenCard.css';

interface BitterballenCardProps {
  data?: BitterballenData;
}

const BitterballenCard: React.FC<BitterballenCardProps> = ({ data: propData }) => {
  const [data, setData] = useState<BitterballenData | null>(propData || null);
  const [loading, setLoading] = useState<boolean>(!propData);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutrition' | 'instructions'>('ingredients');

  useEffect(() => {
    if (!propData) {
      const loadData = async () => {
        try {
          setLoading(true);
          const result = await fetchBitterballenData();
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [propData]);

  if (loading) {
    return (
      <div className="bitterballen-card loading">
        <div className="spinner"></div>
        <p>Loading delicious bitterballen data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bitterballen-card error">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bitterballen-card error">
        <h3>No data available</h3>
        <p>Unable to load bitterballen information</p>
      </div>
    );
  }

  const ingredientsByType = data.ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.type]) acc[ingredient.type] = [];
    acc[ingredient.type].push(ingredient);
    return acc;
  }, {} as Record<string, typeof data.ingredients>);

  return (
    <div className="bitterballen-card">
      <div className="card-header">
        <img src={data.image} alt={data.name} className="bitterballen-image" />
        <div className="header-info">
          <h1>{data.name}</h1>
          <p className="description">{data.description}</p>
          <div className="meta-info">
            <span className="origin"><img src="/images/nl-flag.png" alt="NL Flag" className="flag-icon" />Netherlands</span>
            <span className="time">⏱️ {data.preparationTime} + {data.cookingTime}</span>
            <span className="difficulty">📊 {data.difficulty}</span>
          </div>
          <div className="tags">
            {data.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag === 'Dutch' ? '🇳🇱 ' : ''}{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="card-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            🥘 Ingredients
          </button>
          <button 
            className={`tab ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            📊 Nutrition
          </button>
          <button 
            className={`tab ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            📝 Instructions
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'ingredients' && (
            <div className="ingredients-section">
              {Object.entries(ingredientsByType).map(([type, ingredients]) => (
                <div key={type} className="ingredient-group">
                  <h3 className="group-title">{type.charAt(0).toUpperCase() + type.slice(1)} Ingredients</h3>
                  <ul className="ingredient-list">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="ingredient-item">
                        <span className="ingredient-name">{ingredient.name}</span>
                        <span className="ingredient-amount">{ingredient.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="nutrition-section">
              <h3>Nutritional Information (per serving - {data.servingSize})</h3>
              
              <div className="calories-container">
                <div className="nutrition-item primary">
                  <span className="nutrition-label">🔥 Calories</span>
                  <span className="nutrition-value">{data.nutritionalInfo.calories}</span>
                  <span className="nutrition-unit">kcal</span>
                </div>
              </div>
              
              <div className="nutrition-section-header macros">
                <h4>Macronutrients</h4>
              </div>
              <div className="macros-grid">
                <div className="nutrition-item macro">
                  <span className="nutrition-label">🥩 Protein</span>
                  <span className="nutrition-value">{data.nutritionalInfo.protein}</span>
                  <span className="nutrition-unit">g</span>
                  <div className="percentage">{Math.round((data.nutritionalInfo.protein * 4 / data.nutritionalInfo.calories) * 100)}%</div>
                </div>
                <div className="nutrition-item macro">
                  <span className="nutrition-label">🍞 Carbohydrates</span>
                  <span className="nutrition-value">{data.nutritionalInfo.carbohydrates}</span>
                  <span className="nutrition-unit">g</span>
                  <div className="percentage">{Math.round((data.nutritionalInfo.carbohydrates * 4 / data.nutritionalInfo.calories) * 100)}%</div>
                </div>
                <div className="nutrition-item macro">
                  <span className="nutrition-label">🥑 Total Fat</span>
                  <span className="nutrition-value">{data.nutritionalInfo.fat}</span>
                  <span className="nutrition-unit">g</span>
                  <div className="percentage">{Math.round((data.nutritionalInfo.fat * 9 / data.nutritionalInfo.calories) * 100)}%</div>
                </div>
              </div>
              
              <div className="nutrition-section-header others">
                <h4>Additional Nutrients</h4>
              </div>
              <div className="others-grid">
                <div className="nutrition-item">
                  <span className="nutrition-label">🌾 Dietary Fiber</span>
                  <span className="nutrition-value">{data.nutritionalInfo.fiber}</span>
                  <span className="nutrition-unit">g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">🍯 Sugar</span>
                  <span className="nutrition-value">{data.nutritionalInfo.sugar}</span>
                  <span className="nutrition-unit">g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">🧂 Sodium</span>
                  <span className="nutrition-value">{data.nutritionalInfo.sodium}</span>
                  <span className="nutrition-unit">mg</span>
                  <div className="daily-value">{Math.round((data.nutritionalInfo.sodium / 2300) * 100)}% DV</div>
                </div>
              </div>
              
              <div className="nutrition-notes">
                <p><strong>Note:</strong> Percent Daily Values (DV) are based on a 2,000 calorie diet.</p>
                <p><strong>Serving Size:</strong> {data.servingSize} • <strong>Preparation:</strong> {data.preparationTime}</p>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="instructions-section">
              <h3>Cooking Instructions</h3>
              <ol className="instructions-list">
                {data.instructions.map((instruction, index) => (
                  <li key={index} className="instruction-item">
                    <span className="step-number">{index + 1}</span>
                    <span className="step-text">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BitterballenCard;