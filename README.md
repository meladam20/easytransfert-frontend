EasyTransfert — Frontend (React)

Interface web de consultation de transactions pour une application de transfert d’argent.
Ce projet a été réalisé dans le cadre d’un test technique frontend, avec une attention particulière portée à :

la qualité de l’architecture

la lisibilité du code

la consommation d’API REST

l’expérience utilisateur (UX) pour des utilisateurs peu technophiles

Objectifs du projet

Le frontend permet de :

afficher une liste de transactions

visualiser leur montant, date et statut

proposer une action utilisateur (“Voir”) sur chaque transaction

consommer une API REST existante

gérer les états :

chargement

erreur réseau

affichage normal

Stack technique
Outil	Rôle
React 19	Framework frontend
Vite	Bundler & serveur de développement
Tailwind CSS v4	Styling utilitaire moderne
shadcn/ui	Composants UI accessibles et sobres
Fetch API	Appels HTTP
Node.js ≥ 18	Environnement d’exécution


Architecture du projet

L’architecture est organisée par responsabilités, selon les bonnes pratiques professionnelles :

src/
├── app/
│   └── App.jsx                 # Point d’entrée de l’application
│
├── pages/
│   └── TransactionsPage.jsx    # Page principale (écran)
│
├── components/
│   ├── ui/                     # Composants shadcn/ui (Button, Badge, etc.)
│   └── transactions/           # Composants métier
│       ├── TransactionList.jsx
│       ├── TransactionItem.jsx
│       └── TransactionStatusBadge.jsx
│
├── hooks/
│   └── useTransactions.js      # Hook de chargement des données
│
├── services/
│   └── transactionService.js   # Couche d’accès à l’API REST
│
├── lib/
│   └── utils.js                # Utilitaires shadcn
│
├── index.css                   # Tailwind + thème shadcn
└── main.jsx                    # Bootstrap React


Principes appliqués

UI ≠ données ≠ réseau

aucun appel HTTP dans les composants UI

aucune logique métier dans App.jsx

composants courts, lisibles et réutilisables

Fonctionnement des données
1️ Service API

Les appels HTTP sont centralisés dans :

src/services/transactionService.js

export async function fetchTransactions() {
  const response = await fetch("http://localhost:3000/transactions");

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des transactions");
  }

  return response.json();
}

2️ Hook personnalisé

Le hook useTransactions :

appelle le service API

gère les états :

loading

error

transactions

src/hooks/useTransactions.js


3️ Affichage UI

TransactionList décide quoi afficher selon l’état

TransactionItem affiche une transaction

TransactionStatusBadge traduit le statut en langage humain

UX & accessibilité (choix clés)
Langage compréhensible

success → Envoyé

pending → En cours

failed → Échec

Feedback utilisateur permanent

message de chargement visible

message d’erreur non technique

action clairement identifiable

Hiérarchie visuelle

action secondaire (“Voir”) en style outline

statut visible immédiatement

interface lisible sur mobile

Installation et lancement
1️ - Prérequis

Node.js 18 ou plus

Backend API fonctionnel sur :

http://localhost:3000

2️ - Installation
npm install

3️ - Lancement du projet
npm run dev


Le frontend est accessible sur :

http://localhost:5173

🔐 Configuration CORS (backend requis)

Le backend doit autoriser le frontend :

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

📡 Format attendu de l’API

Endpoint :

GET /transactions


Réponse JSON :

[
  {
    "id": "tx_001",
    "amount": 15000,
    "status": "success",
    "date": "2025-01-15"
  }
]


L’API normalise les données (pas de _id Mongo côté frontend).

Ce qui est volontairement exclu

authentification (non demandée)

gestion des mots de passe

routing avancé

pagination

optimisation prématurée

Le périmètre est strictement respecté.


Justification technique (entretien)

« J’ai séparé l’UI, la logique de données et les appels réseau
afin de pouvoir faire évoluer le projet sans refactor.
Le frontend consomme une API normalisée, indépendante de la base de données. »




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
