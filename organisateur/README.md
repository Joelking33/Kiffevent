# Espace Organisateur

## État actuel

Première version reçue et intégrée. Structure volontairement différente
des 3 autres espaces — décision actée avec Fab, pas une erreur :

```
organisateur/
├── index.html      une seule page, 4 sections internes basculées en JS
│                   (data-page="dashboard|events|staff|payments")
├── css/style.css   tout le CSS de l'espace, un seul fichier
└── js/script.js    tout le JS de l'espace, un seul fichier
```

Contrairement à `admin/`, `staff/` et à la convention prévue pour
`client/` (un fichier HTML + CSS + JS par écran), ici tout tient dans un
seul fichier par type. Choix assumé : cet espace reste néanmoins
100% autonome (personne d'autre n'a besoin d'y toucher), donc l'objectif
principal — pas de collision entre les parties de l'équipe — est
respecté.

## Écrans couverts pour l'instant

Tableau de bord, Événements, Staff, Paiements. Il en reste à ajouter par
rapport au périmètre complet prévu pour l'Organisateur : Participants,
Statistiques, Avis, Sondages, Donations.

## Corrections apportées à l'intégration

- **Emojis → icônes SVG** : tous les emojis ont été remplacés par des
  icônes en trait (même style que Admin/Staff : `stroke="currentColor"`,
  `viewBox 0 0 24 24`), pour un rendu identique sur tous les appareils
  et une cohérence visuelle avec le reste du produit.
- **Débordement horizontal sous ~420px** : `.filter-tabs` (page
  Événements) et `.subtabs` (page Paiements) sont des rangées flex sans
  `min-width:0` — par défaut, un enfant flex refuse de rétrécir sous la
  largeur de son contenu, ce qui poussait toute la page plus large que
  l'écran. Corrigé en les rendant défilables horizontalement
  (`overflow-x:auto` + `min-width:0`) plutôt qu'en les faisant déborder.
  Un filet de sécurité global (`overflow-x:hidden` sur `html,body`) a
  aussi été ajouté par précaution.

## Ce qui reste à faire (au-delà des écrans manquants)

- Aucune donnée n'est encore branchée (tout est à 0, en dur) — à
  connecter contre `../shared/data-contract.md` quand la gestion du
  staff (formulaire déjà présent dans la modale "Ajouter un membre")
  sera reliée à un vrai état plutôt qu'à un formulaire qui se contente
  de réinitialiser au submit.
- Vérifier au fil de l'eau que les noms de champs utilisés correspondent
  au contrat de données partagé.
