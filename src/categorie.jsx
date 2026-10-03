import React, { useState, useEffect } from 'react';

// ==========================================
// 1. Gestion des catégories (3 pts)
// ==========================================
function CategoryManager({ categories, setCategories }) {
  const [nom, setNom] = useState('');
  const [erreur, setErreur] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmedNom = nom.trim();

    if (!trimmedNom) {
      setErreur('المرجو إدخال اسم الصنف');
      return;
    }

    const existe = categories.some(
      (c) => c.nom.toLowerCase() === trimmedNom.toLowerCase()
    );

    if (existe) {
      setErreur('هذا الصنف موجود بالفعل');
      return;
    }

    const newCategory = {
      id: Date.now(),
      nom: trimmedNom,
    };

    setCategories([...categories, newCategory]);
    setNom('');
    setErreur('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
      <h2>Gestion des catégories</h2>
      <form onSubmit={handleAdd}>
        <div>
          <label>Nom de la catégorie : </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="مثال: Citadine"
          />
          <button type="submit" style={{ marginLeft: '10px' }}>Ajouter catégorie</button>
        </div>
        {erreur && <p style={{ color: 'red', margin: '5px 0 0 0' }}>{erreur}</p>}
      </form>

      <h3>Liste des catégories :</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.nom}</li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 2. Ajout & Modification d'une voiture (4 pts & 3 pts)
// ==========================================
function CarForm({ categories, onSave, voitureEnCours, setVoitureEnCours }) {
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [photo, setPhoto] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [prixParJour, setPrixParJour] = useState('');
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    if (voitureEnCours) {
      setMarque(voitureEnCours.marque || '');
      setModele(voitureEnCours.modele || '');
      setPhoto(voitureEnCours.photo || '');
      setCategorieId(voitureEnCours.categorieId || '');
      setPrixParJour(voitureEnCours.prixParJour || '');
    } else {
      resetForm();
    }
  }, [voitureEnCours]);

  const resetForm = () => {
    setMarque('');
    setModele('');
    setPhoto('');
    setCategorieId('');
    setPrixParJour('');
    setErreur('');
    if (setVoitureEnCours) setVoitureEnCours(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!marque.trim() || !modele.trim() || !photo.trim() || !categorieId || !prixParJour) {
      setErreur('جميع الحقول إجبارية');
      return;
    }

    if (Number(prixParJour) <= 0) {
      setErreur('يجب أن يكون السعر أكبر من 0');
      return;
    }

    const carData = {
      id: voitureEnCours ? voitureEnCours.id : Date.now(),
      marque: marque.trim(),
      modele: modele.trim(),
      photo: photo.trim(),
      categorieId: Number(categorieId),
      prixParJour: Number(prixParJour),
    };

    onSave(carData);
    resetForm();
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
      <h2>{voitureEnCours ? 'Modifier une voiture' : 'Ajouter une voiture'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Marque : </label>
          <input type="text" value={marque} onChange={(e) => setMarque(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Modèle : </label>
          <input type="text" value={modele} onChange={(e) => setModele(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>URL Photo : </label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Catégorie : </label>
          <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)}>
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Prix par jour (DH) : </label>
          <input
            type="number"
            value={prixParJour}
            onChange={(e) => setPrixParJour(e.target.value)}
          />
        </div>
        {erreur && <p style={{ color: 'red', marginBottom: '10px' }}>{erreur}</p>}
        <button type="submit">
          {voitureEnCours ? 'Enregistrer' : 'Ajouter'}
        </button>
        {voitureEnCours && (
          <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
            Annuler
          </button>
        )}
      </form>
    </div>
  );
}

// ==========================================
// 3. Élément Voiture + Location (3 pts)
// ==========================================
function CarItem({ voiture, categorieNom, onEdit, onDelete }) {
  const [nbJours, setNbJours] = useState('');
  const [montantTotal, setMontantTotal] = useState(null);
  const [erreur, setErreur] = useState('');

  const handleCalculer = () => {
    const jours = Number(nbJours);
    if (!jours || jours <= 0) {
      setErreur('عدد الأيام يجب أن يكون أكبر من 0');
      setMontantTotal(null);
      return;
    }
    setErreur('');
    const total = jours * voiture.prixParJour;
    setMontantTotal(total);
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '280px', backgroundColor: '#fff' }}>
      <img
        src={voiture.photo}
        alt={`${voiture.marque} ${voiture.modele}`}
        style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3>{voiture.marque} {voiture.modele}</h3>
      <p><strong>Catégorie :</strong> {categorieNom}</p>
      <p><strong>Prix :</strong> {voiture.prixParJour} DH / jour</p>

      <div style={{ margin: '10px 0' }}>
        <button onClick={() => onEdit(voiture)}>Modifier</button>
        <button onClick={() => onDelete(voiture.id)} style={{ marginLeft: '10px', color: 'red' }}>
          Supprimer
        </button>
      </div>

      <hr />
      <h4>Location</h4>
      <div>
        <label>Jours : </label>
        <input
          type="number"
          style={{ width: '60px' }}
          value={nbJours}
          onChange={(e) => setNbJours(e.target.value)}
        />
        <button onClick={handleCalculer} style={{ marginLeft: '5px' }}>Calculer</button>
      </div>

      {erreur && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>{erreur}</p>}
      {montantTotal !== null && (
        <p style={{ color: 'green', fontWeight: 'bold', margin: '5px 0' }}>
          Montant total : {montantTotal} DH
        </p>
      )}
    </div>
  );
}

// ==========================================
// 4. Affichage de la liste (3 pts)
// ==========================================
function CarList({ voitures, categories, onEdit, onDelete }) {
  if (voitures.length === 0) {
    return <p style={{ fontStyle: 'italic' }}>Aucune voiture disponible.</p>;
  }

  const getCategorieNom = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.nom : 'Non définie';
  };

  return (
    <div>
      <h2>Liste des voitures</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {voitures.map((voiture) => (
          <CarItem
            key={voiture.id}
            voiture={voiture}
            categorieNom={getCategorieNom(voiture.categorieId)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. Composant Principal (App)
// ==========================================
export default function App() {
  // Données de test
  const [categories, setCategories] = useState([
    { id: 1, nom: 'Citadine' },
    { id: 2, nom: 'SUV' },
    { id: 3, nom: 'Luxe' },
  ]);

  const [voitures, setVoitures] = useState([
    {
      id: 101,
      marque: 'Dacia',
      modele: 'Duster',
      photo: 'https://via.placeholder.com/200',
      categorieId: 2,
      prixParJour: 400,
    },
    {
      id: 102,
      marque: 'Renault',
      modele: 'Clio 5',
      photo: 'https://via.placeholder.com/200',
      categorieId: 1,
      prixParJour: 310,
    },
    {
      id: 103,
      marque: 'BMW',
      modele: 'X5',
      photo: 'https://via.placeholder.com/200',
      categorieId: 3,
      prixParJour: 1200,
    },
  ]);

  const [voitureEnCours, setVoitureEnCours] = useState(null);

  const handleSaveVoiture = (carData) => {
    const existe = voitures.some((v) => v.id === carData.id);

    if (existe) {
      setVoitures(voitures.map((v) => (v.id === carData.id ? carData : v)));
    } else {
      setVoitures([...voitures, carData]);
    }
  };

  const handleDeleteVoiture = (id) => {
    setVoitures(voitures.filter((v) => v.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Gestion et location de voitures</h1>

      <CategoryManager categories={categories} setCategories={setCategories} />

      <CarForm
        categories={categories}
        onSave={handleSaveVoiture}
        voitureEnCours={voitureEnCours}
        setVoitureEnCours={setVoitureEnCours}
      />

      <CarList
        voitures={voitures}
        categories={categories}
        onEdit={(voiture) => setVoitureEnCours(voiture)}
        onDelete={handleDeleteVoiture}
      />
    </div>
     
  );
}