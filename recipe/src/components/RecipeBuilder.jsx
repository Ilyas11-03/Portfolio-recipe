// src/components/RecipeBuilder.jsx
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Trash2, Timer, ChefHat, Save, Share2, 
  Search, GripVertical, Flame, Leaf, Wheat, Milk, 
  ChevronDown, ChevronUp, Sparkles, Copy, Link2, Check
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RecipeBuilder.css';

// Pantry Library - Expandable database
const PANTRY_LIBRARY = [
  { id: 'chicken', name: 'Chicken Breast', category: 'Protein', unit: 'g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'salmon', name: 'Salmon Fillet', category: 'Protein', unit: 'g', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 'eggs', name: 'Eggs', category: 'Protein', unit: 'unit', calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  { id: 'rice', name: 'White Rice', category: 'Grains', unit: 'g', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: 'pasta', name: 'Pasta', category: 'Grains', unit: 'g', calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  { id: 'olive-oil', name: 'Olive Oil', category: 'Fats', unit: 'ml', calories: 884, protein: 0, carbs: 0, fat: 100 },
  { id: 'butter', name: 'Butter', category: 'Fats', unit: 'g', calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
  { id: 'tomato', name: 'Tomato', category: 'Vegetables', unit: 'unit', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { id: 'onion', name: 'Onion', category: 'Vegetables', unit: 'unit', calories: 40, protein: 1.1, carbs: 9, fat: 0.1 },
  { id: 'garlic', name: 'Garlic', category: 'Vegetables', unit: 'clove', calories: 4, protein: 0.2, carbs: 1, fat: 0 },
  { id: 'milk', name: 'Milk', category: 'Dairy', unit: 'ml', calories: 42, protein: 3.4, carbs: 5, fat: 1 },
  { id: 'cheese', name: 'Cheddar Cheese', category: 'Dairy', unit: 'g', calories: 404, protein: 25, carbs: 1.3, fat: 33 },
  { id: 'flour', name: 'All-Purpose Flour', category: 'Grains', unit: 'g', calories: 364, protein: 10, carbs: 76, fat: 1 },
  { id: 'sugar', name: 'Sugar', category: 'Sweeteners', unit: 'g', calories: 387, protein: 0, carbs: 100, fat: 0 },
  { id: 'salt', name: 'Salt', category: 'Seasonings', unit: 'g', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'pepper', name: 'Black Pepper', category: 'Seasonings', unit: 'g', calories: 251, protein: 10, carbs: 64, fat: 3 },
  { id: 'basil', name: 'Fresh Basil', category: 'Herbs', unit: 'g', calories: 23, protein: 3, carbs: 3, fat: 0.6 },
  { id: 'parsley', name: 'Parsley', category: 'Herbs', unit: 'g', calories: 36, protein: 3, carbs: 6, fat: 0.8 },
];

// Unit Conversion Helper
const UNIT_CONVERSIONS = {
  'g': { oz: 0.035274, cup: null, tbsp: null, tsp: null },
  'oz': { g: 28.3495, cup: null, tbsp: null, tsp: null },
  'ml': { cup: 0.00422675, tbsp: 0.067628, tsp: 0.202884 },
  'cup': { ml: 236.588, tbsp: 16, tsp: 48 },
  'tbsp': { ml: 14.7868, tsp: 3 },
  'tsp': { ml: 4.92892 },
  'unit': { g: 100 }, // Approximate
  'clove': { g: 3 },
};

const convertUnit = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;
  const conversion = UNIT_CONVERSIONS[fromUnit]?.[toUnit];
  if (!conversion) return value;
  return Math.round(value * conversion * 100) / 100;
};

const getAvailableUnits = (baseUnit) => {
  const units = [baseUnit];
  Object.keys(UNIT_CONVERSIONS).forEach(unit => {
    if (UNIT_CONVERSIONS[baseUnit]?.[unit] || UNIT_CONVERSIONS[unit]?.[baseUnit]) {
      if (!units.includes(unit)) units.push(unit);
    }
  });
  return units;
};

const RecipeBuilder = () => {
  // Recipe State
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    servings: 4,
    prepTime: '',
    cookTime: '',
    difficulty: 'Facile',
    cuisine: '',
    tags: [],
    ingredients: [],
    steps: [],
    notes: ''
  });

  // UI State
  const [pantrySearch, setPantrySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [draggedIngredient, setDraggedIngredient] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Filtered Pantry
  const filteredPantry = useMemo(() => {
    return PANTRY_LIBRARY.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(pantrySearch.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [pantrySearch, selectedCategory]);

  const categories = ['All', ...new Set(PANTRY_LIBRARY.map(i => i.category))];

  // Nutrition Calculator
  const nutritionEstimate = useMemo(() => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    recipe.ingredients.forEach(ing => {
      const pantryItem = PANTRY_LIBRARY.find(p => p.id === ing.pantryId);
      if (pantryItem) {
        // Convert to base unit for calculation
        const baseAmount = ing.unit === pantryItem.unit 
          ? ing.amount 
          : convertUnit(ing.amount, ing.unit, pantryItem.unit) || ing.amount;
        
        const multiplier = baseAmount / 100; // Per 100g/ml basis
        
        totals.calories += pantryItem.calories * multiplier;
        totals.protein += pantryItem.protein * multiplier;
        totals.carbs += pantryItem.carbs * multiplier;
        totals.fat += pantryItem.fat * multiplier;
      }
    });
    
    // Per serving
    const perServing = recipe.servings > 0 ? recipe.servings : 1;
    return {
      calories: Math.round(totals.calories / perServing),
      protein: Math.round(totals.protein / perServing * 10) / 10,
      carbs: Math.round(totals.carbs / perServing * 10) / 10,
      fat: Math.round(totals.fat / perServing * 10) / 10
    };
  }, [recipe.ingredients, recipe.servings]);

  // Handlers
  const handleAddIngredient = (pantryItem) => {
    const newIngredient = {
      id: Date.now(),
      pantryId: pantryItem.id,
      name: pantryItem.name,
      amount: 100,
      unit: pantryItem.unit,
      notes: ''
    };
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
    toast.success(`${pantryItem.name} added!`, { position: 'bottom-right', autoClose: 1500 });
  };

  const handleUpdateIngredient = (id, field, value) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing => 
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const handleRemoveIngredient = (id) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== id)
    }));
  };

  const handleAddStep = () => {
    const newStep = {
      id: Date.now(),
      instruction: '',
      timerMinutes: 0,
      timerSeconds: 0,
      image: null
    };
    setRecipe(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const handleUpdateStep = (id, field, value) => {
    setRecipe(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    }));
  };

  const handleRemoveStep = (id) => {
    setRecipe(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== id)
    }));
  };

  const handleSaveRecipe = async () => {
    if (!recipe.title.trim()) {
      toast.error('Please enter a recipe title', { position: 'top-center' });
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API save
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Save to localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('myRecipes') || '[]');
    const newRecipe = { ...recipe, id: Date.now(), createdAt: new Date().toISOString() };
    localStorage.setItem('myRecipes', JSON.stringify([...savedRecipes, newRecipe]));
    
    toast.success('Recipe saved to "My Recipes"! 🎉', { position: 'top-center', autoClose: 3000 });
    setIsSaving(false);
  };

  const handleShareRecipe = () => {
    setShowShareModal(true);
    const shareUrl = `${window.location.origin}/recipe/preview/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Drag & Drop Handlers
  const handleDragStart = (e, item) => {
    setDraggedIngredient(item);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedIngredient) {
      handleAddIngredient(draggedIngredient);
      setDraggedIngredient(null);
    }
  };

  return (
    <div className="recipe-builder-page">
      <ToastContainer />
      
      {/* Header */}
      <motion.header 
        className="builder-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div className="header-icon-wrapper">
            <ChefHat size={32} />
            <Sparkles size={16} className="sparkle-icon" />
          </div>
          <h1>Create Your Recipe</h1>
          <p>Drag ingredients, add steps, and let AI estimate nutrition</p>
          
          <div className="header-actions">
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
            >
              Cancel
            </motion.button>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveRecipe}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="loading-spinner-small"></span>
              ) : (
                <>
                  <Save size={18} /> Save Recipe
                </>
              )}
            </motion.button>
            <motion.button
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShareRecipe}
            >
              <Share2 size={18} /> Share
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="builder-container">
        {/* Left Panel: Pantry Library */}
        <motion.aside 
          className="pantry-panel"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="panel-header">
            <h3>🥘 Pantry Library</h3>
            <p>Drag items to your recipe</p>
          </div>
          
          <div className="pantry-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={pantrySearch}
              onChange={(e) => setPantrySearch(e.target.value)}
            />
          </div>
          
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div 
            className="pantry-grid"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <AnimatePresence>
              {filteredPantry.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="pantry-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="pantry-item-content">
                    <GripVertical size={16} className="drag-handle" />
                    <div className="pantry-item-info">
                      <strong>{item.name}</strong>
                      <span className="pantry-meta">
                        {item.category} • {item.calories}cal/100{item.unit}
                      </span>
                    </div>
                    <button 
                      className="pantry-add-btn"
                      onClick={() => handleAddIngredient(item)}
                      title="Add to recipe"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.aside>

        {/* Main Panel: Recipe Builder */}
        <main className="builder-main">
          
          {/* Recipe Meta */}
          <motion.section 
            className="builder-section meta-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>📋 Recipe Details</h2>
            <div className="meta-grid">
              <div className="form-group full-width">
                <label>Recipe Title *</label>
                <input
                  type="text"
                  value={recipe.title}
                  onChange={(e) => setRecipe(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Creamy Garlic Pasta"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={recipe.description}
                  onChange={(e) => setRecipe(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="A brief description of your dish..."
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Servings</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={recipe.servings}
                  onChange={(e) => setRecipe(prev => ({ ...prev, servings: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div className="form-group">
                <label>Prep Time</label>
                <input
                  type="text"
                  value={recipe.prepTime}
                  onChange={(e) => setRecipe(prev => ({ ...prev, prepTime: e.target.value }))}
                  placeholder="e.g., 15 min"
                />
              </div>
              <div className="form-group">
                <label>Cook Time</label>
                <input
                  type="text"
                  value={recipe.cookTime}
                  onChange={(e) => setRecipe(prev => ({ ...prev, cookTime: e.target.value }))}
                  placeholder="e.g., 30 min"
                />
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select
                  value={recipe.difficulty}
                  onChange={(e) => setRecipe(prev => ({ ...prev, difficulty: e.target.value }))}
                >
                  <option>Facile</option>
                  <option>Moyen</option>
                  <option>Difficile</option>
                </select>
              </div>
              <div className="form-group">
                <label>Cuisine</label>
                <input
                  type="text"
                  value={recipe.cuisine}
                  onChange={(e) => setRecipe(prev => ({ ...prev, cuisine: e.target.value }))}
                  placeholder="e.g., Italian, Moroccan"
                />
              </div>
            </div>
          </motion.section>

          {/* Ingredients Section */}
          <motion.section 
            className="builder-section ingredients-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="section-header">
              <h2>🥗 Ingredients</h2>
              <span className="ingredient-count">{recipe.ingredients.length} items</span>
            </div>
            
            {recipe.ingredients.length === 0 ? (
              <div className="empty-ingredients">
                <Leaf size={48} className="empty-icon" />
                <p>Drag ingredients from the pantry or click the + button to add</p>
              </div>
            ) : (
              <div className="ingredients-list">
                <AnimatePresence>
                  {recipe.ingredients.map((ing, index) => {
                    const pantryItem = PANTRY_LIBRARY.find(p => p.id === ing.pantryId);
                    const availableUnits = getAvailableUnits(ing.unit);
                    
                    return (
                      <motion.div
                        key={ing.id}
                        className="ingredient-row"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        layout
                      >
                        <GripVertical size={16} className="drag-handle" />
                        
                        <div className="ingredient-info">
                          <strong>{ing.name}</strong>
                          {ing.notes && <span className="ingredient-notes">{ing.notes}</span>}
                        </div>
                        
                        <div className="ingredient-controls">
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={ing.amount}
                            onChange={(e) => handleUpdateIngredient(ing.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="amount-input"
                          />
                          
                          <select
                            value={ing.unit}
                            onChange={(e) => handleUpdateIngredient(ing.id, 'unit', e.target.value)}
                            className="unit-select"
                          >
                            {availableUnits.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                          
                          <input
                            type="text"
                            placeholder="Notes (optional)"
                            value={ing.notes}
                            onChange={(e) => handleUpdateIngredient(ing.id, 'notes', e.target.value)}
                            className="notes-input"
                          />
                        </div>
                        
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveIngredient(ing.id)}
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.section>

          {/* Steps Section */}
          <motion.section 
            className="builder-section steps-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <h2>👨‍🍳 Instructions</h2>
              <motion.button
                className="btn-small"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddStep}
              >
                <Plus size={16} /> Add Step
              </motion.button>
            </div>
            
            {recipe.steps.length === 0 ? (
              <div className="empty-steps">
                <Timer size={48} className="empty-icon" />
                <p>Add step-by-step instructions with optional timers</p>
              </div>
            ) : (
              <div className="steps-list">
                {recipe.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="step-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    layout
                  >
                    <div className="step-header">
                      <span className="step-number">Step {index + 1}</span>
                      <div className="step-actions">
                        <button 
                          className="step-btn"
                          onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                        >
                          {activeStep === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <button 
                          className="step-btn remove"
                          onClick={() => handleRemoveStep(step.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {(activeStep === index || recipe.steps.length <= 3) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="step-content"
                        >
                          <textarea
                            placeholder="Describe this step..."
                            value={step.instruction}
                            onChange={(e) => handleUpdateStep(step.id, 'instruction', e.target.value)}
                            rows={3}
                          />
                          
                          <div className="timer-controls">
                            <label>
                              <Timer size={14} /> Timer (optional)
                            </label>
                            <div className="timer-inputs">
                              <input
                                type="number"
                                min="0"
                                max="180"
                                placeholder="Min"
                                value={step.timerMinutes}
                                onChange={(e) => handleUpdateStep(step.id, 'timerMinutes', parseInt(e.target.value) || 0)}
                              />
                              <span>:</span>
                              <input
                                type="number"
                                min="0"
                                max="59"
                                placeholder="Sec"
                                value={step.timerSeconds}
                                onChange={(e) => handleUpdateStep(step.id, 'timerSeconds', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Notes Section */}
          <motion.section 
            className="builder-section notes-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2>📝 Chef's Notes</h2>
            <textarea
              placeholder="Tips, variations, serving suggestions..."
              value={recipe.notes}
              onChange={(e) => setRecipe(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
            />
          </motion.section>

        </main>

        {/* Right Panel: Nutrition & Preview */}
        <motion.aside 
          className="preview-panel"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="panel-header">
            <h3>📊 Nutrition Estimate</h3>
            <p>Per serving ({recipe.servings} servings)</p>
          </div>
          
          <div className="nutrition-cards">
            <div className="nutrition-card calories">
              <Flame size={24} />
              <div>
                <strong>{nutritionEstimate.calories}</strong>
                <span>Calories</span>
              </div>
            </div>
            <div className="nutrition-card protein">
              <span className="macro-icon">🥩</span>
              <div>
                <strong>{nutritionEstimate.protein}g</strong>
                <span>Protein</span>
              </div>
            </div>
            <div className="nutrition-card carbs">
              <span className="macro-icon">🍚</span>
              <div>
                <strong>{nutritionEstimate.carbs}g</strong>
                <span>Carbs</span>
              </div>
            </div>
            <div className="nutrition-card fat">
              <span className="macro-icon">🥑</span>
              <div>
                <strong>{nutritionEstimate.fat}g</strong>
                <span>Fat</span>
              </div>
            </div>
          </div>
          
          <div className="dietary-badges">
            {nutritionEstimate.protein > 20 && (
              <span className="badge high-protein">High Protein</span>
            )}
            {nutritionEstimate.carbs < 30 && (
              <span className="badge low-carb">Low Carb</span>
            )}
            {nutritionEstimate.fat < 10 && (
              <span className="badge low-fat">Low Fat</span>
            )}
            {recipe.ingredients.some(i => PANTRY_LIBRARY.find(p => p.id === i.pantryId)?.category === 'Vegetables') && (
              <span className="badge vegan">🌱 Veggie-Friendly</span>
            )}
          </div>
          
          <div className="preview-section">
            <h4>👁️ Quick Preview</h4>
            <div className="preview-card">
              <div className="preview-title">{recipe.title || 'Your Recipe Title'}</div>
              <p className="preview-desc">{recipe.description || 'Add a description...'}</p>
              <div className="preview-meta">
                <span>⏱️ {recipe.prepTime || '?'} prep</span>
                <span>🔥 {recipe.cookTime || '?'} cook</span>
                <span>👥 {recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareModal(false)}
          >
            <motion.div 
              className="share-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowShareModal(false)}>
                <X size={20} />
              </button>
              
              <div className="modal-content">
                <div className="modal-icon">
                  <Share2 size={32} />
                </div>
                <h3>Share Your Recipe</h3>
                <p>Copy the link below to share your creation</p>
                
                <div className="share-link-box">
                  <input 
                    type="text" 
                    readOnly 
                    value={`${window.location.origin}/recipe/preview/...`}
                  />
                  <motion.button
                    className="copy-btn"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                  >
                    {copiedLink ? <Check size={18} /> : <Copy size={18} />}
                  </motion.button>
                </div>
                
                {copiedLink && (
                  <motion.p 
                    className="copy-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Link copied to clipboard!
                  </motion.p>
                )}
                
                <div className="share-actions">
                  <a href={`https://twitter.com/intent/tweet?text=Check out my recipe: ${recipe.title}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
                    Twitter
                  </a>
                  <a href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
                    Facebook
                  </a>
                  <button className="share-btn copy" onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied!', { position: 'bottom-center' });
                  }}>
                    Copy Link
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeBuilder;