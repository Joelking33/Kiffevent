# KiffEvent — Monorepo

Plateforme de billetterie événementielle. Quatre espaces, quatre
responsables, un seul dépôt.

| Espace | Dossier | Responsable | État |
|---|---|---|---|
| Admin | `admin/` | Fab | ✅ 6 écrans, fonctionnel |
| Staff | `staff/` | Fab | ✅ 2 écrans, fonctionnel |
| Client | `client/` | (ami de Fab) | en attente |
| Organisateur | `organisateur/` | (ami de Fab) | en attente |

## À lire avant de toucher au code

**[`shared/data-contract.md`](shared/data-contract.md)** — les noms de
champs et les valeurs de statut à utiliser dans vos données de
démonstration. C'est le document le plus important de ce dépôt : il
existe pour qu'on n'ait pas à tout renommer au moment de la fusion, et
pour préparer le terrain au backend Node/Prisma qui viendra brancher
tout ça plus tard.

## Structure du dépôt

Chaque espace est **entièrement autonome** : son HTML, son CSS et son
JS vivent dans son propre dossier. Personne n'a besoin de sortir du
dossier d'un autre pour travailler — et donc personne ne peut modifier
par erreur le CSS ou le JS de quelqu'un d'autre.

```
kiffevent/
├── admin/                        espace Admin (Fab)
│   ├── tableau-de-bord.html
│   ├── utilisateurs-organisations.html
│   ├── ... (4 autres écrans)
│   ├── css/                      CSS propre à Admin, un fichier par écran
│   │   ├── base-admin.css         socle Admin (variables, sidebar, header...)
│   │   └── admin-*.css
│   └── js/                       JS propre à Admin, un fichier par écran
│       ├── admin-data.js          données de démo + état localStorage
│       ├── charts.js              graphiques SVG maison
│       ├── icons.js               bibliothèque d'icônes SVG
│       └── admin-*.js
│
├── staff/                        espace Staff (Fab)
│   ├── tableau-de-bord.html
│   ├── scanner-controle.html
│   ├── css/
│   │   ├── base-admin.css         même socle qu'Admin, copié ici (voir note)
│   │   └── staff-*.css
│   └── js/
│       ├── admin-data.js, charts.js, icons.js   copiés ici (voir note)
│       └── staff-*.js
│
├── client/                       espace Client (à venir)
│   ├── *.html
│   ├── css/
│   └── js/
│
├── organisateur/                 espace Organisateur (à venir)
│   ├── *.html
│   ├── css/
│   └── js/
│
├── assets/
│   └── logos/                    logo(s) partagés — voir "Point à trancher"
│
└── shared/
    └── data-contract.md          schéma des données, figé avant le backend
```

### Note sur les fichiers dupliqués entre Admin et Staff

`base-admin.css`, `admin-data.js`, `charts.js` et `icons.js` existent en
double (une copie dans `admin/`, une copie dans `staff/`) — c'est
volontaire : les deux espaces sont tenus par la même personne, donc
aucun risque de conflit entre deux personnes différentes, et chaque
dossier reste 100% autonome (on peut zipper `staff/` seul et il
fonctionne). La contrepartie : si un bug est corrigé dans une copie,
penser à le reporter dans l'autre.

### Convention pour le Client et l'Organisateur

Même principe à suivre : `client/css/`, `client/js/`,
`organisateur/css/`, `organisateur/js/`. Un fichier CSS et un fichier
JS par page, jamais un fichier unique pour tout l'espace.

## Règles métier déjà actées (à ne pas redécider séparément)

- **Le Staff est créé par l'Organisateur.** Pas d'auto-inscription, pas
  de création côté Admin. L'écran correspondant vit dans
  `organisateur/`, pas dans `staff/` ni `admin/`. Détails dans le
  contrat de données.
- Toute nouvelle règle de ce type se discute et se documente dans
  `shared/data-contract.md` avant d'être codée — pas après.

## Point à trancher avant d'aller plus loin : le logo

Le zip envoyé contient deux logos différents non encore branchés dans
le HTML (les pages utilisent pour l'instant le petit repère blanc
`assets/logos/kiffevent-mark-white.svg`, y compris comme favicon) :

- `assets/logos/a-trancher/logo-variante-orange*.png` — variante bleu/orange
- `assets/logos/a-trancher/logo-variante-violet*.png` — variante bleu/violet

Avant que le Client et l'Organisateur ne partent sur une charte de
couleurs, il faut choisir lequel est le logo officiel : ça détermine la
couleur secondaire de toute la plateforme (orange ou violet en plus du
bleu). Une fois tranché, on nettoie les doublons et on branche le bon
fichier partout (y compris en favicon).

## Workflow Git

- Une branche par fonctionnalité, pas par personne :
  `feature/organisateur-creation-evenement`,
  `feature/admin-securite-alertes`.
- Pull Request vers `main` avant fusion, même à deux ou trois — ça
  donne un historique clair et un point de relecture.
- Chacun ne committe que dans son propre dossier (+ `shared/` si un
  changement du contrat de données est nécessaire, à annoncer avant).
- Ce dépôt a été assemblé une fois manuellement pour poser une base
  propre ; la suite (nouvelles pages, corrections) se fait directement
  via Git entre les membres de l'équipe.

## Prochaine étape

Dès que le Client et l'Organisateur ont une première version, la vraie
fusion à tester est fonctionnelle, pas seulement visuelle : un
événement créé côté Organisateur doit pouvoir apparaître côté Client,
un billet acheté côté Client doit apparaître au scan côté Staff. Tant
que chaque espace a son propre `localStorage` isolé, ce n'est pas
testable. Suggestion pour cette étape : un mock API partagé
(`json-server` ou équivalent) que les 4 espaces interrogent via
`fetch()`, en attendant le vrai backend Node/Prisma.
