/**
 * CreateTransactionDialog.jsx
 * ---------------------------
 * Popup de création d’une transaction
 * avec sélection explicite de l’utilisateur.
 */

import { useEffect, useState } from "react";
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
import { fetchUsers } from "@/services/userService";

export default function CreateTransactionDialog({ onCreated }) {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  /**
   * Chargement des utilisateurs à l’ouverture du composant
   */
  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        alert("Impossible de charger les utilisateurs");
      } finally {
        setLoadingUsers(false);
      }
    }

    loadUsers();
  }, []);

  /**
   * Soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUserId) {
      alert("Veuillez sélectionner un utilisateur");
      return;
    }

    setLoading(true);

    try {
      await createTransaction({
        amount: Number(amount),
        status,
        user: selectedUserId,
      });

      onCreated(); // refresh liste
      setAmount("");
      setStatus("pending");
      setSelectedUserId("");
    } catch (err) {
      alert("Erreur lors de la création de la transaction");
      console.log(selectedUserId);
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
            text-dark-500
            hover:bg-slate-800
          "
        >
          Nouvelle transaction
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sélection utilisateur */}
          <Select
            value={selectedUserId}
            onValueChange={setSelectedUserId}
            disabled={loadingUsers}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  loadingUsers
                    ? "Chargement des utilisateurs..."
                    : "Sélectionner un utilisateur"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} — {user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Montant */}
          <Input
            type="number"
            placeholder="Montant (FCFA)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* Statut */}
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

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-slate-900
              text-dark-500
              hover:bg-slate-800
              disabled:opacity-50
            "
          >
            {loading ? "Création..." : "Créer la transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
