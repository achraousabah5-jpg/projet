import { useState } from "react";

function App() {
  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: "Clavier mécanique",
      prix: 350,
      categorie: "Informatique",
    },
    {
      id: 2,
      nom: "Souris sans fil",
      prix: 120,
      categorie: "Informatique",
    },
    {
      id: 3,
      nom: "Casque Bluetooth",
      prix: 280,
      categorie: "Audio",
    },
  ]);

  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");

  const [idModification, setIdModification] = useState(null);

  // Ajouter ou modifier
  function gererProduit(e) {
    e.preventDefault();

    if (nom === "" || prix === "" || categorie === "" || Number(prix) <= 0) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    // Mode modification
    if (idModification !== null) {
      setProduits(
        produits.map((produit) =>
          produit.id === idModification
            ? {
                ...produit,
                nom: nom,
                prix: Number(prix),
                categorie: categorie,
              }
            : produit
        )
      );

      annulerModification();
      return;
    }

    // Mode ajout
    const nouveauProduit = {
      id: Date.now(),
      nom: nom,
      prix: Number(prix),
      categorie: categorie,
    };

    setProduits([...produits, nouveauProduit]);

    viderFormulaire();
  }

  // Supprimer
  function supprimerProduit(id) {
    const confirmation = window.confirm(
      "Voulez-vous supprimer ce produit ?"
    );

    if (confirmation) {
      setProduits(produits.filter((produit) => produit.id !== id));
    }
  }

  // Modifier
  function modifierProduit(produit) {
    setNom(produit.nom);
    setPrix(produit.prix);
    setCategorie(produit.categorie);
    setIdModification(produit.id);
  }

  // Vider formulaire
  function viderFormulaire() {
    setNom("");
    setPrix("");
    setCategorie("");
  }

  // Annuler modification
  function annulerModification() {
    viderFormulaire();
    setIdModification(null);
  }

  return (
    <div className="container">
      <h1>Gestion des produits</h1>

      <p>Nombre total de produits : {produits.length}</p>

      {idModification !== null && (
        <p className="modification">
          Modification du produit en cours...
        </p>
      )}

      <form onSubmit={gererProduit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />

        <input
          type="text"
          placeholder="Catégorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        />

        <button type="submit">
          {idModification !== null ? "Modifier" : "Ajouter"}
        </button>

        {idModification !== null && (
          <button type="button" onClick={annulerModification}>
            Annuler
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td>{produit.id}</td>
              <td>{produit.nom}</td>
              <td>{produit.categorie}</td>
              <td>{produit.prix} DH</td>

              <td>
                <button onClick={() => modifierProduit(produit)}>
                  Modifier
                </button>

                <button onClick={() => supprimerProduit(produit.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;