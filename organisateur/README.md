# Espace Organisateur — en attente

Ce dossier est réservé à l'espace **Organisateur** de KiffEvent
(création d'événements, billetterie, participants, staff, statistiques).

## Structure attendue

Même modèle que `admin/` et `staff/` : entièrement autonome.

```
organisateur/
├── dashboard.html
├── creation-evenement.html
├── ... (les autres écrans)
├── css/
│   ├── base-organisateur.css     socle : variables, header, sidebar communs
│   └── organisateur-*.css        un fichier par écran
└── js/
    ├── organisateur-data.js      données de démo + état localStorage
    └── organisateur-*.js         un fichier par écran
```

## Avant de commencer à coder

1. Lire `../shared/data-contract.md`.
2. Point important qui concerne spécifiquement cet espace : **c'est ici
   que vit la gestion du Staff.** Règle métier validée : un compte Staff
   est créé/invité par l'Organisateur, jamais par auto-inscription, et
   l'Admin ne fait que le superviser (suspendre/consulter). Il faut donc
   prévoir dans cet espace :
   - une liste des membres du staff de l'organisateur
   - un formulaire de création/invitation
   - l'affectation d'un staff à un ou plusieurs événements
     (`Staff.assignedEventIds` dans le contrat de données)
   - la désactivation d'un compte staff (`Staff.status = "DISABLED"`)
3. Le logo partagé se trouve dans `../assets/logos/` (couleur
   secondaire de la plateforme pas encore tranchée — voir le README
   racine avant de figer votre charte).

## Ce qui appartient à Fab et qu'on ne modifie pas

`admin/` et `staff/` sont entièrement autonomes : vous n'avez jamais
besoin d'y entrer. Le dossier `staff/` en particulier est l'espace où
le Staff *utilise* son compte (scanner, tableau de bord) — à ne pas
confondre avec la gestion du staff que vous construisez ici, côté
Organisateur.
