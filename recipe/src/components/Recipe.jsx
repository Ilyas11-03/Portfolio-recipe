import React, { useState } from "react";
import Modal from "react-modal"; // Assurez-vous d'importer le modal
import carbonara from "../assets/carbonara.jpg";
import saladcesar from "../assets/salade.jpeg";
import tarte from "../assets/tarteauxpomme.jpg";
import pouletcurry from "../assets/pouletaucurry.jpg";
import tortilla from "../assets/tortilla.jpeg";
import crepe from "../assets/crepe.jpeg";
import tajinepoulet from "../assets/tajinepoulet.jpeg";
import shawarma from "../assets/shawarma-lebanon.jpg";
import pastilla from "../assets/pastilla.jpg";
import cakechocolat from "../assets/cakechocolat.jpg";
import lasagne from "../assets/lasagnecomplet.jpg";
import { motion } from "framer-motion";
import './Recipe.css'

const recipes = [
    {
        id: 1,
        title: 'Pâtes Carbonara',
        description: 'Une recette classique italienne.',
        image: carbonara,
        ingredients: [
            'Pâtes (spaghetti ou fettuccine) : 400 g',
            'Lardons ou pancetta : 150 g',
            'Oeufs : 3 (2 jaunes et 1 entier)',
            'Parmesan ou pecorino : 100 g (râpé)',
            'Ail : 1 gousse (écrasée, optionnel)',
            'Poivre noir : au goût',
            'Sel : au goût',
            'Persil frais : pour garnir (optionnel)'
        ],
        
        preparation: 
        'Faire cuire les pâtes dans une grande casserole d\'eau salée selon les instructions du paquet. ' +
        'Dans une poêle, faire revenir les lardons ou la pancetta jusqu\'à ce qu\'ils soient croustillants. ' +
        'Dans un bol, battre les œufs avec le fromage râpé et le poivre noir. ' +
        'Une fois les pâtes cuites, les égoutter tout en réservant un peu d\'eau de cuisson. ' +
        'Ajouter les pâtes chaudes dans la poêle avec les lardons, puis retirer du feu. ' +
        'Incorporer le mélange d\'œufs et de fromage en remuant rapidement pour éviter que les œufs ne cuisent trop. ' +
        'Si la sauce est trop épaisse, ajouter un peu d\'eau de cuisson des pâtes pour l\'alléger. ' +
        'Servir immédiatement, garni de persil et de fromage supplémentaire si désiré.'
    
    },
    {
        id: 2,
        title: 'Salade César',
        description: 'Une salade rafraîchissante avec du poulet.',
        image: saladcesar,
        ingredients: [
            'Laitue romaine : 1 (déchirée en morceaux)',
            'Poulet : 2 poitrines (grillées et tranchées)',
            'Croutons : 100 g',
            'Parmesan : 50 g (râpé)',
            'Anchois : 4 (optionnel)',
            'Ail : 1 gousse (écrasée)',
            'Jus de citron : 2 cuillères à soupe',
            'Moutarde de Dijon : 1 cuillère à café',
            'Huile d\'olive : 4 cuillères à soupe',
            'Sel et poivre : au goût'
        ],
        
        preparation: 
        'Dans un bol, mélanger l\'ail écrasé, le jus de citron, la moutarde, le sel et le poivre. ' +
        'Incorporer lentement l\'huile d\'olive pour émulsionner la vinaigrette. ' +
        'Dans un grand saladier, ajouter la laitue, les tranches de poulet, les croutons et les anchois (si utilisés). ' +
        'Verser la vinaigrette sur la salade et mélanger délicatement. ' +
        'Ajouter le parmesan râpé sur le dessus et servir immédiatement.'
    
    },
    {
        id: 3,
        title: 'Tarte aux pommes',
        description: 'Un dessert traditionnel.',
        image: tarte,
        ingredients: [
            'Pâte brisée : 1 (préparée ou achetée)',
            'Pommes : 4-5 (type Golden ou Granny Smith)',
            'Sucre : 100 g',
            'Beurre : 30 g (fondu)',
            'Cannelle : 1 cuillère à café (optionnel)',
            'Jus de citron : 1 cuillère à soupe',
            'Oeuf : 1 (pour la dorure, optionnel)'
        ],
        
        preparation: 
    'Préchauffer le four à 180°C (350°F). ' +
    'Étaler la pâte brisée dans un moule à tarte et piquer le fond avec une fourchette. ' +
    'Éplucher et couper les pommes en quartiers, puis les mélanger avec le jus de citron, le sucre et la cannelle. ' +
    'Disposer les pommes sur la pâte en les chevauchant. ' +
    'Arroser avec le beurre fondu. ' +
    'Si désiré, battre l\'œuf et le badigeonner sur les bords de la tarte pour une belle dorure. ' +
    'Enfourner pendant environ 30-40 minutes, jusqu\'à ce que les pommes soient tendres et la pâte dorée. ' +
    'Laisser refroidir avant de servir.'

    },
    {
        id: 4,
        title: 'Poulet au curry',
        description: 'Un plat de poulet avec du curry.',
        image: pouletcurry,
        ingredients: [
            'Poulet : 1 kg (coupé en morceaux)',
            'Oignons : 2 (hachés)',
            'Ail : 3 gousses (écrasées)',
            'Gingembre : 1 morceau (râpé)',
            'Tomates : 2 (coupées en dés)',
            'Lait de coco : 400 ml',
            'Pâte de curry : 2-3 cuillères à soupe (selon le goût)',
            'Huile : 2 cuillères à soupe',
            'Sel : au goût',
            'Coriandre fraîche : pour garnir'
        ],
        
        preparation: 
        'Dans une grande poêle, chauffer l\'huile et faire revenir les oignons jusqu\'à ce qu\'ils soient translucides. ' +
        'Ajouter l\'ail et le gingembre, puis cuire pendant 1-2 minutes. ' +
        'Incorporer les morceaux de poulet et faire dorer de tous les côtés. ' +
        'Ajouter les tomates et la pâte de curry, puis cuire pendant quelques minutes. ' +
        'Verser le lait de coco, mélanger et laisser mijoter à feu doux pendant 20-30 minutes, jusqu\'à ce que le poulet soit bien cuit. ' +
        'Rectifier l\'assaisonnement avec du sel. ' +
        'Servir chaud, garni de coriandre fraîche, avec du riz ou du pain.'
    
    },
    {
        id: 5,
        title: 'Tortilla',
        description: 'Un plat traditionnel mexicain.',
        image: tortilla,
        ingredients: [
            'Pommes de terre : 500 g (pelées et coupées en fines rondelles)',
            'Oignons : 1 (haché, optionnel)',
            'Œufs : 4',
            'Huile d\'olive : 100 ml',
            'Sel : au goût',
            'Poivre : au goût'
        ],
        
        
        preparation: 
    'Dans une grande poêle, chauffer l\'huile d\'olive à feu moyen. ' +
    'Ajouter les rondelles de pommes de terre et les oignons (si utilisés). ' +
    'Faire cuire pendant environ 15-20 minutes, en remuant de temps en temps, jusqu\'à ce que les pommes de terre soient tendres et légèrement dorées. ' +
    'Égoutter les pommes de terre pour enlever l\'excès d\'huile et les laisser refroidir légèrement. ' +
    'Dans un bol, battre les œufs et assaisonner avec du sel et du poivre. ' +
    'Incorporer les pommes de terre cuites dans le mélange d\'œufs. ' +
    'Dans la même poêle, ajouter un peu d\'huile si nécessaire et verser le mélange. ' +
    'Cuire à feu doux pendant environ 5-7 minutes, jusqu\'à ce que le dessous soit doré. ' +
    'Retourner la tortilla à l\'aide d\'une assiette et cuire l\'autre côté pendant encore 5 minutes. ' +
    'Servir chaud ou à température ambiante, coupée en parts.'

    },
    {
        id: 6,
        title: 'Crepe',
        description: 'Une crepe rafraîchissante avec du fromage.',
        image: crepe,
        ingredients: [
            'Farine : 250 g',
            'Lait : 500 ml',
            'Œufs : 3',
            'Sucre : 2 cuillères à soupe (optionnel)',
            'Beurre : 50 g (fondu)',
            'Sel : une pincée',
            'Extrait de vanille : 1 cuillère à café (optionnel)'
        ],
        
        preparation: 
        'Dans un grand bol, mélanger la farine et le sel. ' +
        'Faire un puits au centre et ajouter les œufs, puis commencer à mélanger. ' +
        'Incorporer progressivement le lait pour éviter les grumeaux. ' +
        'Ajouter le beurre fondu et le sucre (si utilisé), puis l\'extrait de vanille. ' +
        'Laisser reposer la pâte pendant environ 30 minutes. ' +
        'Chauffer une poêle antiadhésive à feu moyen et verser une petite louche de pâte. ' +
        'Incliner la poêle pour répartir la pâte uniformément. ' +
        'Cuire pendant environ 1-2 minutes de chaque côté, jusqu\'à ce qu\'elles soient dorées. ' +
        'Répéter avec le reste de la pâte. ' +
        'Servir les crêpes avec du sucre, de la confiture, du chocolat ou tout autre garniture de votre choix.'
    
    },
    {
        id: 7,
        title: 'Tajine au poulet',
        description: 'Un plat traditionnel Marocaine.',
        image: tajinepoulet,
        ingredients: ['Poulet : 1 kg (coupé en morceaux)', 'Oignons : 2 (hachés)', 'Ail : 2-3 gousses (écrasées)','Carottes : 2 (coupées en rondelles)','Pommes de terre : 2 (coupées en cubes)','Olives : 100 g (vertes ou noires)','Citrons confits : 1 (coupé en quartiers)'],
        preparation: 
            'Mélanger le poulet avec les épices, l\'ail, le sel et le poivre. Laisser mariner pendant 30 minutes ,Chauffer l\'huile d\'olive dans une grande casserole, ajouter le poulet et le faire dorer,Retirer le poulet et ajouter les oignons, Faire revenir jusqu\'à ce qu\'ils soient translucides.,Ajouter les carottes et les pommes de terre, puis faire revenir quelques minutes.,Remettre le poulet dans la casserole avec les légumes, ajouter le bouillon et les olives.,Incorporer les citrons confits et les herbes fraîches.,Couvrir et laisser mijoter à feu doux pendant 45 minutes à 1 heure.'
            
    },
    {
        id: 8,
        title: 'Shawarma Lebanon',
        description: 'Un plat traditionnel lebanon.',
        image: shawarma,
        ingredients: [
            'Poulet : 1 kg (coupé en morceaux)',
            'Oignons : 2 (hachés)',
            'Ail : 2-3 gousses (écrasées)',
            'Carottes : 2 (coupées en rondelles)',
            'Pommes de terre : 2 (coupées en cubes)',
            'Olives : 100 g (vertes ou noires)',
            'Citrons confits : 1 (coupé en quartiers)'
        ],
        preparation: 
    'Mélanger le poulet avec les épices, l\'ail, le sel et le poivre. Laisser mariner pendant 30 minutes. ' +
    'Chauffer l\'huile d\'olive dans une grande casserole, ajouter le poulet et le faire dorer. ' +
    'Retirer le poulet et ajouter les oignons. Faire revenir jusqu\'à ce qu\'ils soient translucides. ' +
    'Ajouter les carottes et les pommes de terre, puis faire revenir quelques minutes. ' +
    'Remettre le poulet dans la casserole avec les légumes, ajouter le bouillon et les olives. ' +
    'Incorporer les citrons confits et les herbes fraîches. ' +
    'Couvrir et laisser mijoter à feu doux pendant 45 minutes à 1 heure.'

    },
    {
        id: 9,
        title: 'Pastilla fruit de mer',
        description: 'Un plat traditionnel Marocaine.',
        image: pastilla,
        ingredients: [
            'Mélange de fruits de mer : 500 g (crevettes, moules, calamars)',
            'Oignons : 2 (hachés)',
            'Ail : 3 gousses (écrasées)',
            'Tomates : 2 (coupées en dés)',
            'Poivron : 1 (coupé en dés)',
            'Huile d\'olive : 3 cuillères à soupe',
            'Vin blanc : 100 ml',
            'Persil frais : 1 bouquet (haché)',
            'Citron : 1 (coupé en quartiers)',
            'Sel et poivre : au goût',
            'Épices : paprika, cumin, piment (selon le goût)'
        ],
        preparation: 
    'Dans une grande poêle, chauffer l\'huile d\'olive et faire revenir les oignons jusqu\'à ce qu\'ils soient translucides. ' +
    'Ajouter l\'ail, le poivron et les tomates, puis cuire pendant 5 minutes. ' +
    'Incorporer les épices, puis ajouter les fruits de mer et mélanger délicatement. ' +
    'Verser le vin blanc et laisser mijoter pendant 10 minutes, jusqu\'à ce que les fruits de mer soient cuits. ' +
    'Rectifier l\'assaisonnement avec du sel et du poivre. ' +
    'Ajouter le persil haché juste avant de servir, puis garnir de quartiers de citron.'
        

    },
    {
        id: 10,
        title: 'Cake Chocolat Marocaine',
        description: 'Une recette traditionnel Marocaine.',
        image: cakechocolat,
        ingredients: [
            'Chocolat noir : 200 g',
            'Beurre : 100 g',
            'Sucre : 150 g',
            'Œufs : 3',
            'Farine : 100 g',
            'Poudre à lever : 1 cuillère à café',
            'Sel : une pincée',
            'Extrait de vanille : 1 cuillère à café (optionnel)'
        ],
        preparation: 
    'Préchauffer le four à 180°C (350°F). ' +
    'Faire fondre le chocolat et le beurre au bain-marie ou au micro-ondes, puis laisser refroidir légèrement. ' +
    'Dans un grand bol, battre les œufs et le sucre jusqu\'à ce que le mélange devienne mousseux. ' +
    'Ajouter le chocolat fondu et l\'extrait de vanille, puis mélanger. ' +
    'Incorporer la farine, la poudre à lever et le sel, en mélangeant jusqu\'à obtenir une pâte homogène. ' +
    'Verser la préparation dans un moule à cake beurré et fariné. ' +
    'Enfourner pendant 25-30 minutes, ou jusqu\'à ce qu\'un couteau inséré au centre en ressorte propre. ' +
    'Laisser refroidir avant de démouler. ' +
    'Servir avec un peu de sucre glace ou une ganache au chocolat si désiré.'
        
    },
    {
        id: 11,
        title: 'Lasagne',
        description: 'Une recette traditionnel Italienne.',
        image: lasagne,
        ingredients: [
            'Lasagnes : 12 feuilles',
            'Viande hachée (bœuf ou mélange) : 400 g',
            'Oignon : 1, haché',
            'Ail : 2 gousses, émincées',
            'Tomates concassées : 400 g',
            'Concentré de tomate : 2 cuillères à soupe',
            'Herbes de Provence : 1 cuillère à café',
            'Sel : au goût',
            'Poivre : au goût',
            'Fromage ricotta : 250 g',
            'Fromage mozzarella : 200 g, râpé',
            'Parmesan : 50 g, râpé',
            'Beurre : 30 g',
            'Lait : 500 ml',
            'Farine : 50 g',
            'Noix de muscade : une pincée (optionnel)'
        ],
        preparation: 
            'Préchauffer le four à 180°C (350°F). ' +
            'Dans une poêle, faire revenir l\'oignon et l\'ail dans un peu d\'huile jusqu\'à ce qu\'ils soient translucides. ' +
            'Ajouter la viande hachée et cuire jusqu\'à ce qu\'elle soit dorée. ' +
            'Incorporer les tomates concassées, le concentré de tomate, les herbes, le sel et le poivre. ' +
            'Laisser mijoter pendant 15 minutes. ' +
            'Dans une casserole, faire fondre le beurre, ajouter la farine et cuire pendant 1 minute. ' +
            'Incorporer le lait progressivement tout en remuant pour éviter les grumeaux. ' +
            'Ajouter une pincée de noix de muscade, puis cuire jusqu\'à épaississement. ' +
            'Dans un plat allant au four, étaler une couche de sauce à la viande, puis une couche de feuilles de lasagne. ' +
            'Ajouter une couche de ricotta, puis une couche de béchamel. ' +
            'Répéter les couches jusqu\'à épuisement des ingrédients, en terminant par une couche de béchamel et le fromage mozzarella et parmesan sur le dessus. ' +
            'Enfourner pendant 30-35 minutes, ou jusqu\'à ce que le dessus soit doré et bouillonnant. ' +
            'Laisser reposer quelques minutes avant de servir.'

    }

    
];

const Recipe = () => {
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

export default Recipe;
