/**
 * TransactionStatusBadge.jsx
 * --------------------------
 * Badge visuel représentant le statut d’une transaction.
 * Utilise un langage humain et des couleurs claires.
 */

import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG = {
  success: {
    label: "Envoyé",
    variant: "default",
  },
  pending: {
    label: "En cours",
    variant: "secondary",
  },
  failed: {
    label: "Échec",
    variant: "destructive",
  },
};

export default function TransactionStatusBadge({ status }) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}
