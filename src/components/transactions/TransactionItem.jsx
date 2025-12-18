/**
 * TransactionItem.jsx
 * -------------------
 * Affiche une transaction unique avec une action utilisateur.
 */

import { Button } from "@/components/ui/button";
import TransactionStatusBadge from "./TransactionStatusBadge";

export default function TransactionItem({ transaction }) {
  /**
   * Gestion du clic sur "Voir"
   * Pour l’instant : simple feedback utilisateur.
   */
  const handleViewClick = () => {
    alert(
      `Détails de la transaction ${transaction._id}\n\n` +
      `Montant : ${transaction.amount} FCFA\n` +
      `Statut : ${transaction.status}`
    );
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      
      {/* Montant + date */}
      <div>
        <p className="text-base font-medium text-foreground">
          {transaction.amount} FCFA
        </p>

        <p className="text-sm text-muted-foreground">
          {transaction.date}
        </p>
      </div>

      {/* Zone droite : statut + action */}
      <div className="flex items-center gap-3">
        <TransactionStatusBadge status={transaction.status} />

        {/* Action utilisateur */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewClick}
        >
          Voir
        </Button>
      </div>
    </div>
  );
}
