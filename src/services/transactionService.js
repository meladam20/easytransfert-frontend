/**
 * transactionService.js
 * ---------------------
 * Couche d’accès à l’API des transactions.
 * Uniquement du HTTP, aucune logique React ici.
 */

const API_BASE_URL = "http://localhost:3000"; 
// ⚠️ adapte le port si ton backend est différent

/**
 * Récupère la liste des transactions
 */
export async function fetchTransactions() {
  const response = await fetch(`${API_BASE_URL}/transactions`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des transactions");
  }

  return response.json();
}

/**
 * Crée une nouvelle transaction
 */
export async function createTransaction(payload) {
  const response = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création de la transaction");
  }

  return response.json();
}

