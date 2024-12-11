import React, { useState } from "react";
import Modal from "react-modal"; // Assurez-vous d'importer le modal
import omelette from "../assets/omlettelegume.jpg"
import "./Recipe.css";
import { motion } from "framer-motion";



const recipes = [
    {
        id: 1,
        title: 'Omelette aux légumes',
        description: 'Une omelette riche en légumes pour bien commencer la journée.',
        image: omelette,
        ingredients: [
            'Oeufs : 3',
            'Poivron : 1 (coupé en dés)',
            'Oignon : 1 (coupé en dés)',
            'Épinards : 100 g',
            'Fromage : 50 g (râpé, optionnel)',
            'Sel : au goût',
            'Poivre : au goût',
            'Huile d\'olive : 1 cuillère à soupe'
        ],
        
        preparation: 
        'Dans un bol, battre les œufs avec du sel et du poivre. ' +
        'Dans une poêle, faire chauffer l\'huile d\'olive et ajouter l\'oignon et le poivron. ' +
        'Faire revenir jusqu\'à ce qu\'ils soient tendres, puis ajouter les épinards. ' +
        'Verser les œufs battus dans la poêle et cuire jusqu\'à ce que l\'omelette soit prise. ' +
        'Ajouter le fromage si désiré, plier l\'omelette et servir chaud.'
    },
    {
        id: 3,
        title: 'Pancakes aux bananes',
        description: 'Des pancakes moelleux et savoureux, parfaits pour le petit déjeuner.',
        image: pancakes,
        ingredients: [
            'Bananes : 2 (mûres)',
            'Oeufs : 2',
            'Farine : 150 g',
            'Lait : 200 ml',
            'Sucre : 2 cuillères à soupe',
            'Poudre à lever : 1 cuillère à café',
            'Beurre : pour la cuisson'
        ],
        
        preparation: 
        'Dans un bol, écraser les bananes. Ajouter les œufs et le lait, puis bien mélanger. ' +
        'Dans un autre bol, mélanger la farine, le sucre et la poudre à lever. ' +
        'Incorporer les ingrédients secs dans le mélange humide jusqu\'à obtenir une pâte homogène. ' +
        'Chauffer une poêle avec un peu de beurre et verser des portions de pâte. ' +
        'Cuire jusqu\'à ce que des bulles apparaissent, puis retourner et cuire l\'autre côté. ' +
        'Servir chaud avec du sirop d\'érable ou des fruits.'
    },    
    {
        id: 4,
        title: 'Smoothie aux fruits',
        description: 'Un smoothie frais et nutritif pour bien commencer la journée.',
        image: smoothie,
        ingredients: [
            'Banane : 1',
            'Fraises : 100 g',
            'Yaourt nature : 150 g',
            'Lait : 200 ml',
            'Miel : 1 cuillère à soupe (optionnel)',
            'Glaçons : au goût'
        ],
        
        preparation: 
        'Dans un mixeur, ajouter la banane, les fraises, le yaourt et le lait. ' +
        'Mixer jusqu\'à obtenir une consistance lisse. ' +
        'Ajouter du miel et des glaçons si désiré et mixer à nouveau. ' +
        'Verser dans un verre et déguster immédiatement.'
    },
   
];

const BreakFast = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedRecipe(null);
    };

    return (
        <motion.div initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} transition={{delay: 1.5, duration: 0.5, type: 'tween', stiffness: 500}}>
            <h1 className="title6">Recettes</h1>
            <p className="text6">Voici une liste de recettes qui pourraient vous intéresser</p>
            <input
                type="text"
                placeholder="Rechercher une recette..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="recipe-list">
                {filteredRecipes.map(recipe => (
                    <div className="recipe-card" key={recipe.id} onClick={() => openModal(recipe)}>
                        <img src={recipe.image}  className="recipe-image" />
                        <h2 className="recipe-title3">{recipe.title}</h2>
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
            {selectedRecipe && (
               
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} 
                >   
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5, duration: 0.5, type: 'tween', stiffness: 300}} >
                     <img src={selectedRecipe.image} style={{width: '25%'}} className="recipe-image-media" />
                    <h3>Ingrédients</h3>
                    <ul>
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Préparation</h3>
                    <p>{selectedRecipe.preparation}</p>
                    <button onClick={closeModal} className="close-button">Fermer</button>
                    </motion.div>
                </Modal>
            )}
            </motion.div>
       
    );
}

export default BreakFast;
