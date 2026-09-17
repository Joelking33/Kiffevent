# Espace Client — en attente

Ce dossier est réservé à l'espace **Client** de KiffEvent (découverte
d'événements, achat de billets, mes billets, revente, favoris, etc.).

## Structure attendue

Cet espace doit être **entièrement autonome**, sur le même modèle que
`admin/` et `staff/` : votre HTML, votre CSS et votre JS restent dans
ce dossier. Vous n'avez besoin d'aller nulle part ailleurs pour
travailler.

```
client/
├── index.html
├── evenements.html
├── ... (les autres écrans)
├── css/
│   ├── base-client.css       socle : variables, header, footer, composants communs
│   └── client-*.css          un fichier par écran
└── js/
    ├── client-data.js        données de démo + état localStorage
    └── client-*.js           un fichier par écran
```

Un fichier CSS et un fichier JS par page, jamais un fichier unique pour
tout l'espace — comme pour les 3 autres.

## Avant de commencer à coder

1. Lire `../shared/data-contract.md` — les noms de champs et de statuts
   à utiliser dans vos données de démonstration, pour que la fusion ne
   demande pas de tout renommer.
2. Le logo et la couleur secondaire de la plateforme (orange ou violet)
   ne sont pas encore tranchés — voir la section correspondante dans le
   README racine avant de figer votre charte de couleurs.
3. Le logo partagé se trouve dans `../assets/logos/` — référencez-le
   depuis vos pages via `../assets/logos/...` (un niveau au-dessus de
   `client/`, comme depuis `admin/` et `staff/`).

## Ce qui appartient à Fab et qu'on ne modifie pas

`admin/` et `staff/` sont entièrement autonomes eux aussi : vous n'avez
jamais besoin d'y entrer, même par accident, puisque rien dans
`client/` n'en dépend.
