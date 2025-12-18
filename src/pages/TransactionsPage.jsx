/**
 * TransactionsPage.jsx
 * --------------------
 * Page principale affichant les transactions.
 * Pour l’instant : structure + UX, sans données.
 */
import TransactionList from "@/components/transactions/TransactionList";
import CreateTransactionDialog from "@/components/transactions/CreateTransactionDialog";
import useTransactions from "@/hooks/useTransactions";

export default function TransactionsPage() {
    const { reload } = useTransactions();
  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-6">
      
      {/* Titre principal */}
      <h1 className="text-2xl font-semibold text-foreground">
        Mes transactions
      </h1>
        <div className="mb-4 flex items-center justify-between">
        <CreateTransactionDialog onCreated={reload} />
      </div>

      {/* Message de réassurance UX */}
      <p className="mt-1 text-sm text-muted-foreground">
        Consultez l’état de vos transferts.  
        Votre argent est en sécurité.
      </p>

      {/* Contenu principal (vide pour l’instant) */}
      <section className="mt-6">
        {/* Les transactions seront affichées ici */}
        <TransactionList />
      </section>

    </main>
  );
}
