/**
 * TransactionList.jsx
 * -------------------
 * Affiche la liste des transactions en fonction des états.
 */

import useTransactions from "@/hooks/useTransactions";
import TransactionItem from "./TransactionItem";

export default function TransactionList() {
  const { transactions, loading, error } = useTransactions();

  /**
   * État de chargement
   */
  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-4 text-center text-sm text-muted-foreground">
        Chargement des transactions…
      </div>
    );
  }

  /**
   * État d’erreur
   */
  if (error) {
  return (
    <div className="rounded-lg border bg-card p-6 text-center">
      <p className="text-sm font-medium text-destructive">
        Une erreur est survenue
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Vérifiez votre connexion ou réessayez plus tard.
      </p>
    </div>
  );
}

  /**
   * État normal : données chargées
   */
  return (
    <div className="divide-y rounded-lg border bg-card">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
  );
}
