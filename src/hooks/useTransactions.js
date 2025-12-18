/**
 * useTransactions.js
 * ------------------
 * Hook personnalisé pour charger les transactions depuis l’API.
 */

import { useEffect, useState } from "react";
import { fetchTransactions } from "@/services/transactionService";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Impossible de charger les transactions.");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
  };
}
