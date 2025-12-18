/**
 * mockTransactions.js
 * -------------------
 * Données fictives simulant la réponse de l’API.
 * Elles respectent le format attendu côté backend.
 */

export const mockTransactions = [
  {
    id: "tx_001",
    amount: 15000,
    status: "success",
    date: "2025-01-15",
  },
  {
    id: "tx_002",
    amount: 8000,
    status: "pending",
    date: "2025-01-16",
  },
  {
    id: "tx_003",
    amount: 5000,
    status: "failed",
    date: "2025-01-17",
  },
];
