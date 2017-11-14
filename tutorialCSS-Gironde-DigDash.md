Styles CSS

Voici la liste non exhaustive des classes CSS permettant de customiser l’aspect visuel du tableau de bord.

# Explications des sites css pour l'intégration
## Bannière

.topPanel
Description : Change l’aspect visuel de la bannière (bordure, fond d’écran).
Exemple : .topPanel { background-color : #f1f1f1; border : 1px solid black; }

.logoTopPanel
Description : Change le logo de la bannière.
Exemple : .logoTopPanel { background: url (mon_logo.png) no-repeat; }

.userLabel
Description : Change le texte représentant le nom de l’utilisateur (couleur,police).
Exemple : .userLabel { font-family : ‘Open Sans’ ; color : black; }

.topPanelIconLabelPanel_Label
Description : Change le menu à droite de la bannière.
Exemple : .topPanelIconLabelPanel_Label { font-family : ‘Open Sans’; color :black; }

## Barre de filtres

#interactBar
Description : Change le div contenant les boîte de filtres.
Exemple : .interactBar { background-color : #f1f1f1; }

.selHierTitleDiv
Description : Change le titre de la boîte de filtres.
Exemple : .selHierTitleDiv { background-color : #d5d7da; border-radius :
4px; }

.selHierTitleDivWhite
Description : Change le titre de la boîte de filtres au survol de la souris.
Exemple : .selHierTitleDivWhite { background-color : #009fa6; color : white; }

## Onglets

.dd-tab-bar
Description : Change la barre contenant la liste des onglets.
Exemple : .dd-tab-bar { background-color : #f1f1f1; border-bottom: 1px solid #f1f1f1; }

.dd-tab-header
Description : Change l’onglet.
Exemple : .dd-tab-header { background-color : #f1f1f1 !important; border-right:1px solid #cccccc; }

.dd-tab-header-selected
Description : Change l’onglet sélectionné.
Exemple : .dd-tab-header-selected { background-color : #009fa6 !important; color : white !important; }


.dd-tab-header-text
Description : Change le texte de l’onglet.
Exemple : .dd-tab-header-text { font-family : ‘Open Sans’ !important; fontsize : 13px !important; }

## Portlets

.portlet
Description : Change la portlet.
Exemple : .portlet { border : 1px solid #d0d0d0 !important; }

.portlet-header
Description : Change l’en-tête de la portlet.
Exemple : .portlet-header { background-color : #eeeeee !important; borderbottom : 1px solid #d0d0d0 !important; }

.portlet-header-text
Description : Change le texte de l’en-tête de la portlet.
Exemple : .portlet-header-text{ color : #6d6d6d !important; font-size : 16px ! important; font-family : ‘Open Sans’ !important; }

.portlet-content
Description : Change le contenu de la portlet.
Exemple : .portlet-content { background-color : white !important; }

.x-tool-maximize, .x-tool-gear, .x-tool-help, .x-tool-restore, .x-tool-alert, .x-toolcomment
Description : Change les icônes s’affichant dans l’en-tête de la portlet.
Exemple : .x-tool-maximize { background-image : url(mon_icone.png) ! important; }

## File d’ariane

.breadcrumbImg
Description : Change l’image de réinitialisation du fil d’ariane.
Exemple : .breadcrumnImg { background-image : url(mon_image.png !important; }

.unclickablebreadcrumb, .clickablebreadcrumb
Description : Change le texte du fil d’ariane.
Exemple : .unclickablebreadcrumb, .clickablebreadcrumb { color : #6d6d6d !important; }

## Slicers verticaux / horizontaux

.tdMemberActive, .spanMemberActive
Description : Change le membre du slicer ayant des valeurs.
Exemple : .tdMemberActive { background-color: #d5d7da !important; borderradius : 5px !important; color : black !important; }

.tdMemberInactive, .spanMemberInactive
Description : Change le membre du slicer n’ayant pas de valeurs.
Exemple : .tdMemberInactive { background-color: white !important; color :gray !important; }

.tdMemberSelected, .spanMemberSelected
Description : Change le membre sélectionné du slicer.
Exemple : .tdMembeSelected { background-color: #009fa6 !important; borderradius : 3px !important; color : white !important; }

## Filtres

.trHeaderFilter
Description : Change l’en-tête de l’objet Filtre.
Exemple : .trHeaderFilter { background-color: #d5d7da !important; }

.tdFilter
Description : Change le contenu de l’objet Filtre.
Exemple : .tdFilter { background-color: #f1f1f1 !important; }

.tdFilterImage
Description : Change l’image de suppression d’un filtre.
Exemple : .tdFilterImage { background: url(mon_image.png) no-repeat #009fa6 !important; }

## Commentaires

.comments
Description : Change l’objet Commentaire.
Exemple : .comments { background-color: #f1f1f1 !important; }

.commentsDisplayAll
Description : Change le bouton permettant l’affichage de tous les commentaires.
Exemple : .commentsDisplayAll { color : #ffffff !important; background-color: #009fa6 !important; }

.commentsFilter
Description : Change l’image permettant d’appliquer la sélection d’un commentaire.
Exemple : .commentsFilter { background: url(mon_icone.png) !important; }

.commentsEdit
Description : Change l’image permettant d’éditer un commentaire.
Exemple : .commentsEdit { background: url(mon_icone.png) !important; }

.commentsRemove
Description : Change l’image permettant de supprimer un commentaire.
Exemple : .commentsRemove { background: url(mon_icone.png) !important; }

.commentsDate
Description : Change la date du commentaire.
Exemple : .commentsDate { font-family : ‘Open Sans’ !important; color : black !important; }

.commentsUser
Description : Change l’utilisateur du commentaire.
Exemple : .commentsUser { font-family : ‘Open Sans’ !important; color : black !important; }

.commentsContent
Description : Change le contenu du commentaire.
Exemple : .commentsContent { font-family : ‘Open Sans’ !important; color :black !important; }


## Curseurs (slicers et variables)

.ui-widget-header
Description : Change la barre du curseur en mode intervalle.
Exemple : .ui-widget-header { background: #009fa6 50% 50% repeat-x !important; }

.ui-widget-content
Description : Change la barre du curseur.
Exemple : .ui-widget-content { background: #009fa6 50% 50% repeat-x !important; }

## Chargement

.loading Description : Change l’affichage du Chargement des objets de type graphiques.
Exemple : .loading { border : 1px solid #d4d4d4 !important; }

.loadingImg
Description : Change l’image du Chargement des objets de type graphiques.
Exemple : .loadingImg { background: url(mon_image.png) no-repeat !important; }

.loading Description : Change le texte du Chargement des objets de type graphiques.
Exemple : .loadingTxt { font-family : ‘Open Sans’ !important; }
