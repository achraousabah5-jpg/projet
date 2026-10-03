import { useState } from 'react'
import './App.css'

// ===============================
// Component EtudiantRow
// ===============================
function EtudiantRow({
  etudiant,
  index,
  modifierEtudiant,
  deleteEtudiant
}) {
  return (
    <li>
      {etudiant.prenom} {etudiant.nom} — {etudiant.age} ans

      <button onClick={() => modifierEtudiant(index)}>
        Modifier
      </button>

      <button onClick={() => deleteEtudiant(index)}>
        Supprimer
      </button>
    </li>
  )
}


// ===============================
// App
// ===============================
function App() {

  const [etudiants, setEtudiants] = useState([
    { nom: 'Dupont', prenom: 'Jean', age: 20 },
    { nom: 'Martin', prenom: 'Marie', age: 22 },
    { nom: 'Durand', prenom: 'Pierre', age: 19 }
  ])

  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [age, setAge] = useState('')

  // واش كنضيفو ولا كنعدلو
  const [indexModifier, setIndexModifier] = useState(null)


  // ===============================
  // Ajouter / Modifier
  // ===============================
  const ajouterEtudiant = () => {

    if (
      nom.trim() === '' ||
      prenom.trim() === '' ||
      age === ''
    ) {
      return
    }

    const nouvelEtudiant = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      age: Number(age)
    }


    // Ajouter
    if (indexModifier === null) {

      setEtudiants([
        ...etudiants,
        nouvelEtudiant
      ])

    }

    // Modifier
    else {

      const nouveauTableau = [...etudiants]

      nouveauTableau[indexModifier] = nouvelEtudiant

      setEtudiants(nouveauTableau)

      setIndexModifier(null)
    }


    // Vider les inputs
    setNom('')
    setPrenom('')
    setAge('')
  }


  // ===============================
  // Supprimer
  // ===============================
  const deleteEtudiant = (index) => {

    setEtudiants(
      etudiants.filter((_, i) => i !== index)
    )
  }


  // ===============================
  // Préparer modification
  // ===============================
  const modifierEtudiant = (index) => {

    setNom(etudiants[index].nom)

    setPrenom(etudiants[index].prenom)

    setAge(etudiants[index].age)

    setIndexModifier(index)
  }


  // ===============================
  // Affichage
  // ===============================
  return (
    <section>

      <h2>Liste des étudiants</h2>


      {/* ===============================
          Inputs
      =============================== */}

      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={e => setNom(e.target.value)}
      />


      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={e => setPrenom(e.target.value)}
      />


      <input
        type="number"
        placeholder="Âge"
        value={age}
        onChange={e => setAge(e.target.value)}
      />


      {/* ===============================
          Bouton Ajouter / Modifier
      =============================== */}

      <button onClick={ajouterEtudiant}>
        {indexModifier === null
          ? 'Ajouter'
          : 'Modifier'
        }
      </button>


      {/* ===============================
          Liste
      =============================== */}

      <ul>

        {etudiants.map((etudiant, index) => (

          <EtudiantRow
            key={index}

            etudiant={etudiant}

            index={index}

            modifierEtudiant={modifierEtudiant}

            deleteEtudiant={deleteEtudiant}
          />

        ))}

      </ul>

    </section>
  )
}

export default App