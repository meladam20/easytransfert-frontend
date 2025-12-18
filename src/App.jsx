/**
 * App.jsx
 * -------
 * Point d’entrée principal de l’application.
 * Ici, on monte les pages.
 * Aucune logique métier ne doit se trouver ici.
 */

import TransactionsPage from "@/pages/TransactionsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <TransactionsPage />
    </div>
  );
}
