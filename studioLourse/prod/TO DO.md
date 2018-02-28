# 7 février #

Ajout d'image de background sur les groupes et composants
- groupe B : bacground-image: url('assets/imgs/bg-1.jpg');
- groupe E : bacground-image: url('assets/imgs/bg-2.jpg');
- groupe F : bacground-image: url('assets/imgs/bg-3.jpg');

Utilisation des template suivants pour les composants html
- component_1.html
- component_2.html
- component_3.html
- component_4.html
- component_5.html

Mettre à jour la feuille de style "styles.css"

Supprimer complètement la feuille de style Dashboard.css

Enlever le composant "Filtres", en haut à droite

Modifications de classes, etc
- Voir s'il est possible de basculer le composant 0 dans un groupe auquel on assignera les classes 'fixed', 'fixedLeft' et 'fixedCenter' (on retirera ces classes du composant 0)
- Retirer l'image de background sur le groupe D (il n'y en a pas sur la maquette)
- Idem pour le groupe H

# 9 février #

- Il est important de supprimer complètement la feuille de styles Dashboard-2018b0207.css
- Maj des templates des composants 3 4 et 5
- Ajouts des classe "bgColor-WhiteTamed" et "collapsed" sur les composants 3, 4 et 5
- Ajout des template des composants 6, 9, 14 et 15
- Ajout du dossier /prod/pictos comprenant tous les pictos nécessaires au doc
- Ajout de la classe
- Mettre en place le titre h3 dans le composant 3
- Dans la feuille de style, styles.css, mettre à jour toute les urls pointant sur des images
- Ajout de la classe "justifyCenter" sur le groupe B

# 13 février #

- Supprimer la feuille de style Dashboard-NNNNNNNNN.css
- Mettre à jour les styles
- Ajouter la classe "groupFilter" sur le groupe de Filtres
- Faire pointer les urls des styles sur le bon dossiers
- Ajout du fichier /assets/imgs/logo.png
- Mettre les composants du groupe G dans le bon ordre et créer le dernier composant manquant
- Mettre à jour les templates de composants 9, 14
- Ajout des templates de composant 16 et 20
- Créer les composants du groupe H

# 14 février #

- Mettre à jour styles.css (ne pas oublier de corriger les urls pointant sur des images)
- Nouveau découpage de la maquette : /maquettes/decoupeMaquetteV2.pdf (J'y ai enlevé les classes des composants pour plus de clarté et j'ai rajouté les composants 22 à 29)
- Ajouts des classes suivantes :
-- Composant 1 : marginBottom-2
-- Composants 3, 4 et 5 : minHeight-3
-- Composants 6 et 7 : minHeight-8 marginBottom-2
-- Composant 22 : component componentFilter col-6 marginRight-3 marginLeft-3 marginBottom-1
-- Composants 11 et 12 : remplacer col-6 par col-3, retirer legendRight
-- Composant 24 et 25 : component componentLegend col-3 alignItemsVertCenter
-- Composant 26 : component componentLegend col-9 alignItemsVertCenter
-- Composant 15 : marginBottom-2
-- Composant 30 : component componentHtml col-12 marginBottom-2
-- Composant 16 et 17 : marginBottom-2
-- Composant 27 : composant componentLegend col-2 alignItemsVertCenter marginBottom-2
-- Composant 17 : remplacer col-8 par col-6, retirer legendRight
-- Composant 18 et 19 : minHeight-6
-- Composant 28 et 29 : component componentLegend col-12
-- Groupes des filtres : groupFilter

# 19 février #

- Régler tous les graphiques afin qu'ils utilisent les couleurs de la charte, disponibles dans le fichier "colors.md" nouvellement créé
- Régler la largeur des barres des composants 8, 10 et 21 afin de se rapprocher au mieux de la maquette
- Création d'une feuille de styles "components.css" à importer dans chaque composants
- Mettre à jour la feuille de styles "styles.css"


# 20 février #

- Mise à jour de styles.css
- Ajout de la classe slicerSelectComponent sur les composants 22 et "22 bis" (composant rajouté par la suite, concernant les filtres selon les pôles sol.)

# 21 février #

- Retirer le style inline des images utilisées dans les composants (padding:5px; float:center;)
- Mettre à jour les templates de composants 3, 4 et 5
- Mettre à jour les templates de composants 9 et 14
- Mettre à jour le template de composant 19
- Mettre à jour la feuille de styles components.css pour chaque composants
- Mettre à jour la feuille de styles styles.css pour le tableau de bord
- Ajout de la classe col-7 sur le composant 22 et de la classe col-5 sur le composant 22 bis
- Ajout de la classe marginBottom-2 sur le composant 8
- Utiliser le picto mainCursor.svg pour les cartes, dans les couleurs proposées par la maquette
- Mettre à jour les templates de composants 23 et 30 et leur ajouter la classe marginBottom-2
- Ajout de la classe minHeight-4 sur les composants 16, 17, 20 et 21

# 23 février #

- Problème du curseur dans les cartes. Essayer avec la nouvelle version du fichier mainCursor
- Mettre à jour la css styles.css du tableau de border (ne pas ou oublier de mettre à jour les urls de cette css, une seule pour le moment, celle du curseur des filtres)
- Ajout de la classe minHeight-3 sur le composant 14

# 26 février #

- Mise à jour des feuilles de styles styles.css et components.css
- Mise à jour du template 6
- Mise à jour du template 14
- Mise à jour du template 16
- Mise à jour du template 19
- Mise à jour du template 20
- Mise à jour du template 23
- Mise à jour du template 30
- Le curseur de la carte du composant 7 est-il bien à jour avec le fichier mainCursor.svg ?
- Respecter les couleurs de la cartes avec les couleurs proposées par la maquette (cantons en blanc)
- Composant 8 : Utiliser du blanc plutôt que du bleu pour les piles négatives, est-il possible de changer les fonts des légendes et les mettre en blanc ?
- Composant 10 : mêmes remarques que le composant 8
- Composant 13 : remplacer la classe col-12 par col-3
- Groupe E : mettre les composants dans le bon ordre (sur la maquette, les légendes sont à la droite de chaque graphique)
- Groupe E : Ajouter la classe minHeight-3 à tous les composants du groupe sauf le groupe 23 (titre)
- Gourpe G : Réorganiser les composants de manière à ce que le nouveau composant "XX % des télétravailleurs on renouvelé leur demande" soit placé après le composant 17. Mettre la classe col-3 sur ce composant à la place de col-4.
- Composant 16 : classe col-3 à la place de col-4


# 27 février #

- Mettre à jour styles.css et components.css
- Groupe A : Ajouter la classe aboveGroupFilter
- Composant 6 : changer la classe col-4 par col-5 et la classe minHeight-8 par minHeight-7
- Composant 7 : changer la classe col-8 par col-7 et la classe minHeight-8 par minHeight-7
- Composant 8 : ajouter la classe minHeight-5 et réduire l'epaisseur de la courbe rouge au moins de moitié
- Groupe D : ajouter la classe minHeight-3 sur tous le composants
- Popin : utiliser le template nouvellement créé
- Dans le repertoire imgs, j'ai créé un repertoire "pictos département", il contient 4 svg qui sont simplement les pictos recolorisés utilisé dans le composant 14 et 3 png qui sont les pictos par défaut de DigDash que j'ai simplement teinté en blanc. Merci d'utiliser ces versions en attendant que nous validions la création de nouveaux pictos par Dorothée.

# 28 février #

- maj de styles.css et components.css
- Pourquoi le compsant 2 est réalisé via l'editeur web alors que le 15 semble réalisé depuis DigDash ? Utiliser aussi l'éditeur pour le composant 15 si possible.
- Mettre à jour le composant 6
- Sur les composants 22 et 22bis (filtres) : Ajouter les classes component et marginBottom-1
- Composant 7 : La carte n'est pas centrée car il semblerait que celle ci n'est pas centré au sein-même du svg. (J'imagine que ceci est du à l'absence des curseurs signalants les tiers lieux hors départements). Voir s'il est possible d'utiliser une carte ou la carte est centrée dans le svg.
- Composant 16 : rajouter la classe marginBottom-1 sur la div englobant la première partie
- Mettre à jour le composant 30
- Mettre à jour le composant 19
- Voir si tu peux passer les contours des curseurs des cartes en blanc plutôt qu'en gris
