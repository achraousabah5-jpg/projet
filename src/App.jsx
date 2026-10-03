import React, { useState } from 'react';

export default function CategoryManager({ categories, setCategories }) {
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
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
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
        {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
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