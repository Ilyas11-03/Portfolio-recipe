import { useState } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ChefHat, ArrowLeft, Heart, Share2, Printer } from "lucide-react";
import './Recipe.css';

// Import your images
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

Modal.setAppElement('#root');

const recipes = [
    {
        id: 1,
        title: 'Pâtes Carbonara',
        description: 'Une recette classique italienne.',
        image: carbonara,
        prepTime: '20 min',
        cookTime: '15 min',
        servings: 4,
        difficulty: 'Facile',
        category: 'Italien',
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
        preparation: 'Faire cuire les pâtes dans une grande casserole d\'eau salée selon les instructions du paquet. Dans une poêle, faire revenir les lardons ou la pancetta jusqu\'à ce qu\'ils soient croustillants. Dans un bol, battre les œufs avec le fromage râpé et le poivre noir. Une fois les pâtes cuites, les égoutter tout en réservant un peu d\'eau de cuisson. Ajouter les pâtes chaudes dans la poêle avec les lardons, puis retirer du feu. Incorporer le mélange d\'œufs et de fromage en remuant rapidement pour éviter que les œufs ne cuisent trop. Si la sauce est trop épaisse, ajouter un peu d\'eau de cuisson des pâtes pour l\'alléger. Servir immédiatement, garni de persil et de fromage supplémentaire si désiré.'
    },
    {
        id: 2,
        title: 'Salade César',
        description: 'Une salade rafraîchissante avec du poulet.',
        image: saladcesar,
        prepTime: '15 min',
        cookTime: '10 min',
        servings: 2,
        difficulty: 'Facile',
        category: 'Américain',
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
        preparation: 'Dans un bol, mélanger l\'ail écrasé, le jus de citron, la moutarde, le sel et le poivre. Incorporer lentement l\'huile d\'olive pour émulsionner la vinaigrette. Dans un grand saladier, ajouter la laitue, les tranches de poulet, les croutons et les anchois (si utilisés). Verser la vinaigrette sur la salade et mélanger délicatement. Ajouter le parmesan râpé sur le dessus et servir immédiatement.'
    },
    {
        id: 3,
        title: 'Tarte aux pommes',
        description: 'Un dessert traditionnel.',
        image: tarte,
        prepTime: '30 min',
        cookTime: '40 min',
        servings: 6,
        difficulty: 'Moyen',
        category: 'Français',
        ingredients: [
            'Pâte brisée : 1 (préparée ou achetée)',
            'Pommes : 4-5 (type Golden ou Granny Smith)',
            'Sucre : 100 g',
            'Beurre : 30 g (fondu)',
            'Cannelle : 1 cuillère à café (optionnel)',
            'Jus de citron : 1 cuillère à soupe',
            'Oeuf : 1 (pour la dorure, optionnel)'
        ],
        preparation: 'Préchauffer le four à 180°C (350°F). Étaler la pâte brisée dans un moule à tarte et piquer le fond avec une fourchette. Éplucher et couper les pommes en quartiers, puis les mélanger avec le jus de citron, le sucre et la cannelle. Disposer les pommes sur la pâte en les chevauchant. Arroser avec le beurre fondu. Si désiré, battre l\'œuf et le badigeonner sur les bords de la tarte pour une belle dorure. Enfourner pendant environ 30-40 minutes, jusqu\'à ce que les pommes soient tendres et la pâte dorée. Laisser refroidir avant de servir.'
    },
    {
        id: 4,
        title: 'Poulet au curry',
        description: 'Un plat de poulet avec du curry.',
        image: pouletcurry,
        prepTime: '20 min',
        cookTime: '30 min',
        servings: 4,
        difficulty: 'Moyen',
        category: 'Indien',
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
        preparation: 'Dans une grande poêle, chauffer l\'huile et faire revenir les oignons jusqu\'à ce qu\'ils soient translucides. Ajouter l\'ail et le gingembre, puis cuire pendant 1-2 minutes. Incorporer les morceaux de poulet et faire dorer de tous les côtés. Ajouter les tomates et la pâte de curry, puis cuire pendant quelques minutes. Verser le lait de coco, mélanger et laisser mijoter à feu doux pendant 20-30 minutes, jusqu\'à ce que le poulet soit bien cuit. Rectifier l\'assaisonnement avec du sel. Servir chaud, garni de coriandre fraîche, avec du riz ou du pain.'
    },
    {
        id: 5,
        title: 'Tortilla',
        description: 'Un plat traditionnel mexicain.',
        image: tortilla,
        prepTime: '15 min',
        cookTime: '25 min',
        servings: 4,
        difficulty: 'Facile',
        category: 'Espagnol',
        ingredients: [
            'Pommes de terre : 500 g (pelées et coupées en fines rondelles)',
            'Oignons : 1 (haché, optionnel)',
            'ufs : 4',
            'Huile d\'olive : 100 ml',
            'Sel : au goût',
            'Poivre : au goût'
        ],
        preparation: 'Dans une grande poêle, chauffer l\'huile d\'olive à feu moyen. Ajouter les rondelles de pommes de terre et les oignons (si utilisés). Faire cuire pendant environ 15-20 minutes, en remuant de temps en temps, jusqu\'à ce que les pommes de terre soient tendres et légèrement dorées. Égoutter les pommes de terre pour enlever l\'excès d\'huile et les laisser refroidir légèrement. Dans un bol, battre les œufs et assaisonner avec du sel et du poivre. Incorporer les pommes de terre cuites dans le mélange d\'œufs. Dans la même poêle, ajouter un peu d\'huile si nécessaire et verser le mélange. Cuire à feu doux pendant environ 5-7 minutes, jusqu\'à ce que le dessous soit doré. Retourner la tortilla à l\'aide d\'une assiette et cuire l\'autre côté pendant encore 5 minutes. Servir chaud ou à température ambiante, coupée en parts.'
    },
    {
        id: 6,
        title: 'Crêpe',
        description: 'Une crêpe légère et savoureuse.',
        image: crepe,
        prepTime: '10 min',
        cookTime: '15 min',
        servings: 8,
        difficulty: 'Facile',
        category: 'Français',
        ingredients: [
            'Farine : 250 g',
            'Lait : 500 ml',
            'Œufs : 3',
            'Sucre : 2 cuillères à soupe (optionnel)',
            'Beurre : 50 g (fondu)',
            'Sel : une pincée',
            'Extrait de vanille : 1 cuillère à café (optionnel)'
        ],
        preparation: 'Dans un grand bol, mélanger la farine et le sel. Faire un puits au centre et ajouter les œufs, puis commencer à mélanger. Incorporer progressivement le lait pour éviter les grumeaux. Ajouter le beurre fondu et le sucre (si utilisé), puis l\'extrait de vanille. Laisser reposer la pâte pendant environ 30 minutes. Chauffer une poêle antiadhésive à feu moyen et verser une petite louche de pâte. Incliner la poêle pour répartir la pâte uniformément. Cuire pendant environ 1-2 minutes de chaque côté, jusqu\'à ce qu\'elles soient dorées. Répéter avec le reste de la pâte. Servir les crêpes avec du sucre, de la confiture, du chocolat ou tout autre garniture de votre choix.'
    },
    {
        id: 7,
        title: 'Tajine au poulet',
        description: 'Un plat traditionnel Marocain.',
        image: tajinepoulet,
        prepTime: '30 min',
        cookTime: '60 min',
        servings: 6,
        difficulty: 'Moyen',
        category: 'Marocain',
        ingredients: [
            'Poulet : 1 kg (coupé en morceaux)',
            'Oignons : 2 (hachés)',
            'Ail : 2-3 gousses (écrasées)',
            'Carottes : 2 (coupées en rondelles)',
            'Pommes de terre : 2 (coupées en cubes)',
            'Olives : 100 g (vertes ou noires)',
            'Citrons confits : 1 (coupé en quartiers)',
            'Épices : cumin, coriandre, gingembre, safran',
            'Huile d\'olive : 3 cuillères à soupe',
            'Bouillon : 500 ml',
            'Persil et coriandre frais : pour garnir'
        ],
        preparation: 'Mélanger le poulet avec les épices, l\'ail, le sel et le poivre. Laisser mariner pendant 30 minutes. Chauffer l\'huile d\'olive dans une grande casserole, ajouter le poulet et le faire dorer. Retirer le poulet et ajouter les oignons. Faire revenir jusqu\'à ce qu\'ils soient translucides. Ajouter les carottes et les pommes de terre, puis faire revenir quelques minutes. Remettre le poulet dans la casserole avec les légumes, ajouter le bouillon et les olives. Incorporer les citrons confits et les herbes fraîches. Couvrir et laisser mijoter à feu doux pendant 45 minutes à 1 heure.'
    },
    {
        id: 8,
        title: 'Shawarma Libanais',
        description: 'Un plat traditionnel libanais.',
        image: shawarma,
        prepTime: '30 min',
        cookTime: '20 min',
        servings: 4,
        difficulty: 'Moyen',
        category: 'Libanais',
        ingredients: [
            'Poulet : 1 kg (coupé en fines lanières)',
            'Yaourt grec : 200 g',
            'Jus de citron : 3 cuillères à soupe',
            'Ail : 4 gousses (écrasées)',
            'Épices : cumin, paprika, cannelle, cardamome',
            'Pain pita : 4',
            'Légumes : tomates, concombres, oignons rouges',
            'Sauce tahini : pour servir'
        ],
        preparation: 'Mélanger le poulet avec le yaourt, le jus de citron, l\'ail et les épices. Mariner au moins 2 heures. Faire cuire le poulet dans une poêle très chaude ou au four jusqu\'à ce qu\'il soit doré. Chauffer les pains pita et les garnir avec le poulet, les légumes frais et la sauce tahini. Servir immédiatement avec des quartiers de citron.'
    },
    {
        id: 9,
        title: 'Pastilla aux fruits de mer',
        description: 'Un plat traditionnel Marocain.',
        image: pastilla,
        prepTime: '45 min',
        cookTime: '30 min',
        servings: 6,
        difficulty: 'Difficile',
        category: 'Marocain',
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
            'Épices : paprika, cumin, piment (selon le goût)',
            'Feuilles de brick : 8-10',
            'Amandes effilées : pour garnir'
        ],
        preparation: 'Dans une grande poêle, chauffer l\'huile d\'olive et faire revenir les oignons jusqu\'à ce qu\'ils soient translucides. Ajouter l\'ail, le poivron et les tomates, puis cuire pendant 5 minutes. Incorporer les épices, puis ajouter les fruits de mer et mélanger délicatement. Verser le vin blanc et laisser mijoter pendant 10 minutes, jusqu\'à ce que les fruits de mer soient cuits. Rectifier l\'assaisonnement avec du sel et du poivre. Ajouter le persil haché juste avant de servir, puis garnir de quartiers de citron et d\'amandes.'
    },
    {
        id: 10,
        title: 'Cake au Chocolat',
        description: 'Un gâteau moelleux au chocolat.',
        image: cakechocolat,
        prepTime: '20 min',
        cookTime: '30 min',
        servings: 8,
        difficulty: 'Facile',
        category: 'Dessert',
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
        preparation: 'Préchauffer le four à 180°C (350°F). Faire fondre le chocolat et le beurre au bain-marie ou au micro-ondes, puis laisser refroidir légèrement. Dans un grand bol, battre les œufs et le sucre jusqu\'à ce que le mélange devienne mousseux. Ajouter le chocolat fondu et l\'extrait de vanille, puis mélanger. Incorporer la farine, la poudre à lever et le sel, en mélangeant jusqu\'à obtenir une pâte homogène. Verser la préparation dans un moule à cake beurré et fariné. Enfourner pendant 25-30 minutes, ou jusqu\'à ce qu\'un couteau inséré au centre en ressorte propre. Laisser refroidir avant de démouler. Servir avec un peu de sucre glace ou une ganache au chocolat si désiré.'
    },
    {
        id: 11,
        title: 'Lasagnes',
        description: 'Une recette traditionnelle italienne.',
        image: lasagne,
        prepTime: '30 min',
        cookTime: '35 min',
        servings: 6,
        difficulty: 'Moyen',
        category: 'Italien',
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
        preparation: 'Préchauffer le four à 180°C (350°F). Dans une poêle, faire revenir l\'oignon et l\'ail dans un peu d\'huile jusqu\'à ce qu\'ils soient translucides. Ajouter la viande hachée et cuire jusqu\'à ce qu\'elle soit dorée. Incorporer les tomates concassées, le concentré de tomate, les herbes, le sel et le poivre. Laisser mijoter pendant 15 minutes. Dans une casserole, faire fondre le beurre, ajouter la farine et cuire pendant 1 minute. Incorporer le lait progressivement tout en remuant pour éviter les grumeaux. Ajouter une pincée de noix de muscade, puis cuire jusqu\'à épaississement. Dans un plat allant au four, étaler une couche de sauce à la viande, puis une couche de feuilles de lasagne. Ajouter une couche de ricotta, puis une couche de béchamel. Répéter les couches jusqu\'à épuisement des ingrédients, en terminant par une couche de béchamel et le fromage mozzarella et parmesan sur le dessus. Enfourner pendant 30-35 minutes, ou jusqu\'à ce que le dessus soit doré et bouillonnant. Laisser reposer quelques minutes avant de servir.'
    },
    // 🌟 NEW RECIPES ADDED BELOW
    {
        id: 12,
        title: 'Pad Thaï',
        description: 'Nouilles sautées aux crevettes et cacahuètes.',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=600',
        prepTime: '20 min',
        cookTime: '15 min',
        servings: 4,
        difficulty: 'Moyen',
        category: 'Asiatique',
        ingredients: ['Nouilles de riz : 250 g', 'Crevettes : 200 g', 'Œufs : 2', 'Sauce soja : 3 c.à.s', 'Sucre de palme : 2 c.à.s', 'Jus de tamarin : 2 c.à.s', 'Ail : 2 gousses', 'Cacahuètes concassées : 50 g', 'Pousses de soja : 100 g', 'Citron vert : 1'],
        preparation: 'Faire tremper les nouilles dans l\'eau tiède 20 min. Dans un wok, faire revenir l\'ail et les crevettes. Pousser sur le côté, casser les œufs et brouiller rapidement. Ajouter les nouilles égouttées, la sauce soja, le sucre et le tamarin. Mélanger vigoureusement 3 min. Ajouter les pousses de soja et les cacahuètes. Servir avec un quartier de citron vert.'
    },
    {
        id: 13,
        title: 'Bowl Végétarien Quinoa',
        description: 'Un repas sain et équilibré.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
        prepTime: '15 min',
        cookTime: '20 min',
        servings: 2,
        difficulty: 'Facile',
        category: 'Healthy',
        ingredients: ['Quinoa : 150 g', 'Avocat : 1', 'Pois chiches : 200 g (en conserve)', 'Concombre : 1/2', 'Tomates cerises : 100 g', 'Feta : 50 g', 'Huile d\'olive : 2 c.à.s', 'Citron : 1/2', 'Sel & poivre'],
        preparation: 'Cuire le quinoa selon les instructions et laisser refroidir. Couper l\'avocat, le concombre et les tomates en dés. Égoutter et rincer les pois chiches. Dans un bol, mélanger le quinoa, les légumes et les pois chiches. Assaisonner avec l\'huile d\'olive, le jus de citron, le sel et le poivre. Parsemer de feta émiettée avant de servir.'
    },
    {
        id: 14,
        title: 'Tiramisu Classique',
        description: 'Dessert italien au café et mascarpone.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
        prepTime: '25 min',
        cookTime: '0 min',
        servings: 6,
        difficulty: 'Moyen',
        category: 'Dessert',
        ingredients: ['Mascarpone : 250 g', 'ufs : 3', 'Sucre : 80 g', 'Biscuits à la cuillère : 200 g', 'Café expresso froid : 300 ml', 'Cacao amer : pour saupoudrer', 'Extrait de vanille : 1 c.à.c'],
        preparation: 'Séparer les blancs des jaunes. Fouetter les jaunes avec le sucre et la vanille jusqu\'à blanchiment. Incorporer le mascarpone. Monter les blancs en neige ferme et les incorporer délicatement. Tremper rapidement les biscuits dans le café et les disposer au fond d\'un plat. Alterner couches de biscuits et de crème. Réfrigérer 4h minimum. Saupoudrer de cacao avant de servir.'
    },
    {
        id: 15,
        title: 'Poulet Tikka Masala',
        description: 'Curry crémeux aux épices indiennes.',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600',
        prepTime: '20 min',
        cookTime: '30 min',
        servings: 4,
        difficulty: 'Moyen',
        category: 'Indien',
        ingredients: ['Poulet : 500 g (dés)', 'Yaourt nature : 100 g', 'Garam masala : 2 c.à.c', 'Curcuma : 1 c.à.c', 'Cumin : 1 c.à.c', 'Tomates concassées : 400 g', 'Crème fraîche : 100 ml', 'Oignon : 1', 'Ail & gingembre : 1 c.à.s chaque', 'Coriandre fraîche'],
        preparation: 'Mariner le poulet dans le yaourt et les épices 30 min. Faire revenir l\'oignon, l\'ail et le gingembre. Ajouter le poulet et cuire 5 min. Incorporer les tomates et mijoter 15 min. Ajouter la crème, mélanger et cuire 5 min. Garnir de coriandre. Servir avec du riz basmati.'
    },
    {
        id: 16,
        title: 'Salade Grecque',
        description: 'Fraîcheur méditerranéenne.',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600',
        prepTime: '10 min',
        cookTime: '0 min',
        servings: 4,
        difficulty: 'Facile',
        category: 'Méditerranéen',
        ingredients: ['Concombre : 1', 'Tomates : 3', 'Poivron vert : 1', 'Oignon rouge : 1/2', 'Olives Kalamata : 100 g', 'Feta : 150 g', 'Huile d\'olive : 4 c.à.s', 'Origan séché : 1 c.à.c', 'Sel & poivre'],
        preparation: 'Couper les légumes en gros morceaux. Disposer dans un saladier. Ajouter les olives et la feta émiettée. Arroser d\'huile d\'olive, saupoudrer d\'origan, saler et poivrer. Mélanger délicatement et servir frais.'
    },
    {
        id: 17,
        title: 'Risotto aux Champignons',
        description: 'Crémeux et parfumé.',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600',
        prepTime: '10 min',
        cookTime: '25 min',
        servings: 4,
        difficulty: 'Difficile',
        category: 'Italien',
        ingredients: ['Riz arborio : 300 g', 'Champignons : 250 g', 'Bouillon de légumes : 1 L', 'Vin blanc : 100 ml', 'Parmesan : 50 g', 'Beurre : 30 g', 'Oignon : 1', 'Huile d\'olive', 'Persil'],
        preparation: 'Faire revenir l\'oignon et les champignons. Ajouter le riz et nacrer 2 min. Déglacer au vin blanc. Ajouter le bouillon louche par louche en remuant constamment. Cuire 18-20 min jusqu\'à cremosità. Hors feu, incorporer beurre et parmesan. Garnir de persil.'
    },
    {
        id: 18,
        title: 'Tacos au Poulet Épicé',
        description: 'Mexicain authentique.',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=600',
        prepTime: '15 min',
        cookTime: '15 min',
        servings: 4,
        difficulty: 'Facile',
        category: 'Mexicain',
        ingredients: ['Poulet : 400 g', 'Tortillas de maïs : 8', 'Paprika fumé : 1 c.à.c', 'Cumin : 1 c.à.c', 'Piment en poudre : 1/2 c.à.c', 'Lime : 2', 'Coriandre', 'Oignon rouge', 'Avocat', 'Salsa verde'],
        preparation: 'Assaisonner le poulet avec les épices et le jus d\'une lime. Griller 6-7 min de chaque côté. Émincer. Chauffer les tortillas. Garnir de poulet, oignon, coriandre, avocat et salsa. Servir avec des quartiers de lime.'
    }

];

const Recipe = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [likedRecipes, setLikedRecipes] = useState([]);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setModalIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedRecipe(null);
        document.body.style.overflow = 'unset';
    };

    const toggleLike = (id, e) => {
        e.stopPropagation();
        setLikedRecipes(prev => 
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Facile': return '#10b981';
            case 'Moyen': return '#f59e0b';
            case 'Difficile': return '#ef4444';
            default: return '#6b7280';
        }
    };

    return (
        <div className="recipe-page">
            {/* Hero Header */}
            <motion.div 
                className="recipe-header"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="header-content">
                    <ChefHat size={48} className="header-icon" />
                    <h1 className="recipe-title">Nos Recettes</h1>
                    <p className="recipe-subtitle">Découvrez des plats délicieux et faciles à préparer</p>
                    
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher une recette, un ingrédient..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button 
                                className="clear-search" 
                                onClick={() => setSearchTerm('')}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Recipe Grid */}
            <div className="recipe-grid-container">
                <AnimatePresence mode="wait">
                    {filteredRecipes.length === 0 ? (
                        <motion.div 
                            key="empty"
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ChefHat size={64} className="empty-icon" />
                            <h3>Aucune recette trouvée</h3>
                            <p>Essayez avec d'autres mots-clés</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="grid"
                            className="recipe-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {filteredRecipes.map((recipe, index) => (
                                <motion.div 
                                    key={recipe.id}
                                    className="recipe-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -8 }}
                                    onClick={() => openModal(recipe)}
                                >
                                    <div className="card-image-wrapper">
                                        <img src={recipe.image} alt={recipe.title} className="card-image" />
                                        <button 
                                            className="like-button"
                                            onClick={(e) => toggleLike(recipe.id, e)}
                                        >
                                            <Heart 
                                                size={20} 
                                                fill={likedRecipes.includes(recipe.id) ? '#ef4444' : 'none'}
                                                color={likedRecipes.includes(recipe.id) ? '#ef4444' : 'white'}
                                            />
                                        </button>
                                        <span className="difficulty-badge" style={{ background: getDifficultyColor(recipe.difficulty) }}>
                                            {recipe.difficulty}
                                        </span>
                                    </div>
                                    
                                    <div className="card-content">
                                        <h3 className="card-title">{recipe.title}</h3>
                                        <p className="card-description">{recipe.description}</p>
                                        
                                        <div className="card-meta">
                                            <span className="meta-item">
                                                <Clock size={14} />
                                                {recipe.prepTime}
                                            </span>
                                            <span className="meta-item">
                                                👥 {recipe.servings} pers.
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Recipe Modal */}
            <AnimatePresence>
                {modalIsOpen && selectedRecipe && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="recipe-modal"
                        overlayClassName="recipe-modal-overlay"
                    >
                        <motion.div 
                            className="modal-content"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>

                            <div className="modal-header">
                                <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal-image" />
                                <div className="modal-title-section">
                                    <h2>{selectedRecipe.title}</h2>
                                    <p>{selectedRecipe.description}</p>
                                    <div className="modal-actions">
                                        <button 
                                            className="action-btn"
                                            onClick={(e) => toggleLike(selectedRecipe.id, e)}
                                        >
                                            <Heart 
                                                size={18} 
                                                fill={likedRecipes.includes(selectedRecipe.id) ? '#ef4444' : 'none'}
                                                color={likedRecipes.includes(selectedRecipe.id) ? '#ef4444' : 'currentColor'}
                                            />
                                            {likedRecipes.includes(selectedRecipe.id) ? 'Aimé' : 'Aimer'}
                                        </button>
                                        <button className="action-btn">
                                            <Share2 size={18} /> Partager
                                        </button>
                                        <button className="action-btn">
                                            <Printer size={18} /> Imprimer
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body">
                                <div className="recipe-info-grid">
                                    <div className="info-card">
                                        <Clock size={24} />
                                        <div>
                                            <strong>Préparation</strong>
                                            <span>{selectedRecipe.prepTime}</span>
                                        </div>
                                    </div>
                                    <div className="info-card">
                                        <ChefHat size={24} />
                                        <div>
                                            <strong>Cuisson</strong>
                                            <span>{selectedRecipe.cookTime}</span>
                                        </div>
                                    </div>
                                    <div className="info-card">
                                        👥
                                        <div>
                                            <strong>Portions</strong>
                                            <span>{selectedRecipe.servings} personnes</span>
                                        </div>
                                    </div>
                                    <div className="info-card">
                                        <span style={{ color: getDifficultyColor(selectedRecipe.difficulty), fontWeight: 'bold' }}>
                                            {selectedRecipe.difficulty}
                                        </span>
                                        <div>
                                            <strong>Difficulté</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="recipe-section">
                                    <h3>🥗 Ingrédients</h3>
                                    <ul className="ingredients-list">
                                        {selectedRecipe.ingredients.map((ingredient, index) => (
                                            <motion.li 
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                            >
                                                {ingredient}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="recipe-section">
                                    <h3>👨‍🍳 Préparation</h3>
                                    <p className="preparation-text">{selectedRecipe.preparation}</p>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn-primary" onClick={closeModal}>
                                    <ArrowLeft size={18} /> Retour aux recettes
                                </button>
                            </div>
                        </motion.div>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Recipe;