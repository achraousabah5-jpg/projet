import { useState } from "react";
import "./App.css";

function App() {

  const [livres, setLivres] = useState([
    {
      id: 1,
      titre: "L'Alchimiste",
      edition: "2022",
      auteur: "Paulo Coelho",
      prix: 90,
      photo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
    },
    {
      id: 2,
      titre: "Les Misérables",
      edition: "2021",
      auteur: "Victor Hugo",
      prix: 110,
      photo: "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },
    {
      id: 3,
      titre: "Le Comte de Monte-Cristo",
      edition: "2023",
      auteur: "Alexandre Dumas",
      prix: 130,
      photo: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
    }
  ]);

  const [titre, setTitre] = useState("");
  const [edition, setEdition] = useState("");
  const [auteur, setAuteur] = useState("");
  const [prix, setPrix] = useState("");

  // Photo
  const [photo, setPhoto] = useState("");

  const [editId, setEditId] = useState(null);


  // Choisir une photo
  const choisirPhoto = (event) => {

    const fichier = event.target.files[0];

    if (fichier) {
      setPhoto(URL.createObjectURL(fichier));
    }
  };


  // Ajouter / Modifier
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!titre || !edition || !auteur || !prix) {
      alert("Veuillez remplir tous les champs");
      return;
    }


    // Modifier
    if (editId !== null) {

      const livresModifies = livres.map((livre) => {

        if (livre.id === editId) {

          return {
            ...livre,
            titre: titre,
            edition: edition,
            auteur: auteur,
            prix: Number(prix),
            photo: photo || livre.photo
          };

        }

        return livre;
      });

      setLivres(livresModifies);
      setEditId(null);

    }


    // Ajouter
    else {

      const nouveauLivre = {

        id: Date.now(),

        titre: titre,

        edition: edition,

        auteur: auteur,

        prix: Number(prix),

        photo: photo || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"

      };

      setLivres([...livres, nouveauLivre]);
    }


    // Vider les champs
    setTitre("");
    setEdition("");
    setAuteur("");
    setPrix("");
    setPhoto("");
  };


  // Choisir un livre
  const choisirTitre = (e) => {

    const titreChoisi = e.target.value;

    setTitre(titreChoisi);

    const livre = livres.find(
      (livre) => livre.titre === titreChoisi
    );

    if (livre) {

      setEdition(livre.edition);

      setAuteur(livre.auteur);

      setPrix(livre.prix);

      setPhoto(livre.photo);
    }
  };


  // Modifier
  const modifierLivre = (livre) => {

    setTitre(livre.titre);

    setEdition(livre.edition);

    setAuteur(livre.auteur);

    setPrix(livre.prix);

    setPhoto(livre.photo);

    setEditId(livre.id);
  };


  // Supprimer
  const supprimerLivre = (id) => {

    const nouvelleListe = livres.filter(
      (livre) => livre.id !== id
    );

    setLivres(nouvelleListe);
  };


  return (
    <div className="app">


      {/* Header */}
      <header className="header">

        <h1>Gestion des Livres</h1>

      </header>


      <main>


        {/* Formulaire */}
        <section className="form-card">

          <h2>
            {editId !== null
              ? "Modifier un livre"
              : "Ajouter un livre"}
          </h2>


          <form onSubmit={handleSubmit}>


            {/* Titre */}
            <div className="form-group">

              <label>Titre du livre</label>

              <select
                value={titre}
                onChange={choisirTitre}
              >

                <option value="">
                  -- Choisir un livre --
                </option>

                {livres.map((livre) => (

                  <option
                    key={livre.id}
                    value={livre.titre}
                  >
                    {livre.titre}
                  </option>

                ))}

              </select>

            </div>


            {/* Edition */}
            <div className="form-group">

              <label>Édition</label>

              <input
                type="text"
                placeholder="Ex: 2024"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
              />

            </div>


            {/* Auteur */}
            <div className="form-group">

              <label>Auteur</label>

              <input
                type="text"
                placeholder="Nom de l'auteur"
                value={auteur}
                onChange={(e) => setAuteur(e.target.value)}
              />

            </div>


            {/* Prix */}
            <div className="form-group">

              <label>Prix</label>

              <input
                type="number"
                placeholder="Prix en DH"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              />

            </div>


            {/* Photo */}
            <div className="form-group">

              <label>Photo du livre</label>

              <input
                type="file"
                accept="image/*"
                onChange={choisirPhoto}
              />

            </div>


            {/* Bouton */}
            <button
              className="btn-primary"
              type="submit"
            >

              {editId !== null
                ? "Modifier le livre"
                : "Ajouter le livre"}

            </button>

          </form>

        </section>


        {/* Liste des livres */}
        <section className="books-section">


          <div className="section-title">

            <h2>Nos livres</h2>

            <span>
              {livres.length} livre(s)
            </span>

          </div>


          <div className="books-grid">


            {livres.map((livre) => (

              <div
                className="book-card"
                key={livre.id}
              >


                {/* Image */}
                <img
                  src={livre.photo}
                  alt={livre.titre}
                />


                <div className="book-info">


                  <h3>{livre.titre}</h3>


                  <p>
                    <strong>ID :</strong> {livre.id}
                  </p>


                  <p>
                    <strong>Édition :</strong> {livre.edition}
                  </p>


                  <p>
                    <strong>Auteur :</strong> {livre.auteur}
                  </p>


                  <p className="price">
                    {livre.prix} DH
                  </p>


                  {/* Actions */}
                  <div className="actions">


                    <button
                      className="btn-edit"
                      onClick={() => modifierLivre(livre)}
                    >
                      Modifier
                    </button>


                    <button
                      className="btn-delete"
                      onClick={() => supprimerLivre(livre.id)}
                    >
                      Supprimer
                    </button>


                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer>

        <p>© 2026 — Gestion des Livres</p>

      </footer>

    </div>
  );
}

export default App;