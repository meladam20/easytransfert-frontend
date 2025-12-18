/**
 * CreateTransactionDialog.jsx
 * ---------------------------
 * Popup de création d’une transaction
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTransaction } from "@/services/transactionService";

export default function CreateTransactionDialog({ onCreated }) {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTransaction({
        amount: Number(amount),
        status,
        date: new Date().toISOString().slice(0, 10),
      });

      onCreated(); // refresh liste
      setAmount("");
      setStatus("pending");
    } catch (err) {
      alert("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
 <DialogTrigger asChild>
  <Button
    className="
      bg-slate-900
      text-default-foreground
      hover:bg-slate-800
      focus-visible:ring-2
      focus-visible:ring-slate-900
    "
  >
    Nouvelle transaction
  </Button>
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle >Nouvelle transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            placeholder="Montant (FCFA)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="success">Envoyé</SelectItem>
              <SelectItem value="pending">En cours</SelectItem>
              <SelectItem value="failed">Échec</SelectItem>
            </SelectContent>
          </Select>

            <Button
            type="submit"
            disabled={loading}
            className="
                w-full
                bg-slate-900
                text-default-foreground
                hover:bg-slate-800
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
            >
            {loading ? "Création..." : "Créer"}
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
