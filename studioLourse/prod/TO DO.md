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
