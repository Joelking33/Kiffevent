# KiffEvent — Contrat de données partagé

Ce document fige les noms de champs et les valeurs possibles **avant**
que le backend Node/Prisma n'existe. Chaque partie (Client, Organisateur,
Staff, Admin) construit ses données de démonstration contre CE contrat,
même si elles restent pour l'instant en `localStorage` ou en tableaux JS
en dur. Le jour où le vrai backend arrive, c'est un branchement, pas une
réécriture.

⚠️ Règle simple : si un champ ou une valeur dont vous avez besoin n'est
pas dans ce fichier, on l'ajoute ICI d'abord (message dans le groupe +
mise à jour du fichier), on ne l'invente pas de son côté en espérant que
ça matche à la fusion.

Les **valeurs internes** (celles qui iraient en base) sont toujours en
anglais et en majuscules (`PUBLISHED`, `VALID`...). L'affichage à
l'utilisateur reste en français — c'est une traduction faite au rendu,
jamais la valeur stockée.

---

## User

| Champ       | Type                                    | Notes |
|-------------|------------------------------------------|-------|
| `id`        | string                                    | ex: `usr_001` |
| `firstName` | string                                    | |
| `lastName`  | string                                    | |
| `email`     | string                                    | |
| `phone`     | string                                    | format `+225 XX XX XX XX XX` |
| `role`      | `"CLIENT" \| "ORGANIZER" \| "STAFF" \| "ADMIN"` | un seul rôle par compte |
| `status`    | `"ACTIVE" \| "SUSPENDED" \| "BANNED"`     | |
| `createdAt` | string (ISO 8601)                         | |

## Organizer

| Champ         | Type    | Notes |
|---------------|---------|-------|
| `id`          | string  | ex: `org_001` |
| `userId`      | string  | référence `User.id` |
| `companyName` | string  | |
| `isVerified`  | boolean | badge "Organisateur vérifié" |
| `status`      | `"ACTIVE" \| "SUSPENDED"` | |

## Staff

**Règle métier : le Staff est créé par l'Organisateur, jamais par
auto-inscription ni par l'Admin.** L'écran de création/invitation vit
dans `organisateur/`. L'Admin ne fait que consulter/suspendre.

| Champ             | Type      | Notes |
|-------------------|-----------|-------|
| `id`              | string    | ex: `stf_001` |
| `userId`          | string    | référence `User.id` |
| `organizerId`     | string    | **obligatoire** — de quel organisateur il dépend |
| `assignedEventIds`| string[]  | événements qu'il est autorisé à scanner |
| `status`          | `"ACTIVE" \| "DISABLED"` | l'organisateur peut le désactiver |
| `invitedAt`       | string (ISO 8601) | |

## Event

| Champ         | Type    | Notes |
|---------------|---------|-------|
| `id`          | string  | ex: `evt_festival_abidjan` (slug lisible, pas un UUID, pour rester lisible dans les données de démo) |
| `organizerId` | string  | |
| `title`       | string  | |
| `tagline`     | string  | courte accroche |
| `description` | string  | |
| `category`    | string  | ex: `"Musique"`, `"Sport"` — libellé affiché directement (pas d'enum fermé, la liste des catégories est ouverte) |
| `tags`        | string[]| |
| `location`    | string  | |
| `dateLabel`   | string  | affichage humain, ex: `"25 - 27 juil. 2025"` |
| `timeLabel`   | string  | ex: `"16h00 - 02h00"` |
| `startAt` / `endAt` | string (ISO 8601) | à ajouter dès qu'un tri ou un filtre par date réel est nécessaire |
| `status`      | `"DRAFT" \| "PUBLISHED" \| "SUSPENDED" \| "CANCELLED" \| "COMPLETED"` | |
| `allowResale` | boolean | |
| `gradient`    | string (valeur CSS `background-image`) | tant qu'il n'y a pas de vraies photos d'événements, chaque événement de démo a un dégradé unique pour rester identifiable visuellement |

## TicketType

| Champ    | Type   | Notes |
|----------|--------|-------|
| `id`     | string | ex: `"std"`, `"vip"` — unique **par événement**, pas globalement |
| `eventId`| string | |
| `name`   | string | ex: `"Standard"`, `"VIP"` |
| `price`  | number | en FCFA, entier, `0` = gratuit |
| `places` | number | stock total |
| `popular`| boolean| affiche le badge "Populaire" |

## Order (commande)

| Champ         | Type   | Notes |
|---------------|--------|-------|
| `orderRef`    | string | ex: `KEV-2025-0726-4583` — référence lisible affichée au client |
| `userId`      | string | |
| `eventId`     | string | |
| `ticketTypeId`| string | |
| `quantity`    | number | |
| `unitPrice`   | number | figé au moment de l'achat (ne pas recalculer depuis TicketType a posteriori) |
| `total`       | number | |
| `status`      | `"PENDING" \| "CONFIRMED" \| "CANCELLED"` | |
| `participant` | `{ nom, prenom, telephone, classe?, filiere? }` | `classe`/`filiere` optionnels (utile pour évènements scolaires) |
| `purchasedAt` | string (ISO 8601) | |

## Ticket (billet émis)

| Champ         | Type   | Notes |
|---------------|--------|-------|
| `ticketNumber`| string | ex: `KEV-4583` — imprimé/affiché, encodé dans le QR |
| `orderRef`    | string | référence la commande |
| `status`      | `"VALID" \| "USED" \| "CANCELLED" \| "RESOLD"` | |
| `usedAt`      | string (ISO 8601) \| null | posé par le Staff au scan |
| `usedByStaffId`| string \| null | |

## Payment

| Champ         | Type   | Notes |
|---------------|--------|-------|
| `orderRef`    | string | |
| `provider`    | `"WAVE" \| "ORANGE_MONEY" \| "MTN_MOMO" \| "MOOV_MONEY" \| "CARD"` | |
| `amount`      | number | |
| `status`      | `"PENDING" \| "SUCCESS" \| "FAILED" \| "REFUNDED"` | |

## Resale (revente)

| Champ      | Type   | Notes |
|------------|--------|-------|
| `id`       | string | |
| `orderRef` | string | commande d'origine |
| `price`    | number | prix de revente |
| `quantity` | number | |
| `status`   | `"ACTIVE" \| "SOLD" \| "CANCELLED"` | |

## Notification

| Champ     | Type    | Notes |
|-----------|---------|-------|
| `id`      | string  | |
| `userId`  | string  | destinataire |
| `type`    | `"PAYMENT" \| "TICKET" \| "REMINDER" \| "EVENT" \| "RESALE" \| "SURVEY" \| "DONATION" \| "REVIEW" \| "SECURITY"` | |
| `title`   | string  | |
| `message` | string  | |
| `read`    | boolean | |

---

## Qui écrit quoi (au moment de la fusion)

Tant qu'il n'y a pas de backend, chaque espace garde ses propres données
de démo (localStorage ou tableau en dur) — mais **avec ces noms de
champs et ces valeurs**, pour que la fusion finale (ou le passage à une
API mock partagée type `json-server`) ne demande qu'un branchement.

| Entité manipulée en écriture | Espace responsable |
|---|---|
| `Event` (création/modification) | Organisateur |
| `Staff` (création/désactivation) | Organisateur |
| `TicketType` | Organisateur |
| `Order`, `Payment`, `Ticket` (achat) | Client |
| `Resale` | Client |
| `Ticket.status = USED` (scan) | Staff |
| `User.status` (suspension/bannissement) | Admin |

Les autres espaces **lisent** ces entités mais ne les modifient pas
directement (ex: Admin visualise les `Event` mais ne les crée pas).

## Points encore ouverts

- Format exact des identifiants une fois le backend en place (UUID vs
  slug lisible) — pas bloquant pour le front, à trancher avec le
  backend Node.
- Gestion des rôles multiples (un `Organizer` peut-il aussi être
  `Client` avec le même compte ?) — à trancher avant l'authentification
  réelle.
