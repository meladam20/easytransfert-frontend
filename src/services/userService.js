/**
 * userService.js
 * --------------
 * Accès à l’API des utilisateurs
 */

const API_BASE_URL = "http://localhost:3000";

/**
 * Récupère tous les utilisateurs
 */
export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des utilisateurs");
  }

  return response.json();
}
