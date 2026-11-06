import express from 'express'

const router = express.Router()

// Mock data : Tableau pour stocker les candidatures en mémoire
const applications = []

// POST /api/applications : Soumettre une candidature
router.post('/api/applications', (req, res) => {
  const { candidateId, associationId } = req.body

  // 1. Vérifier que les données requises sont présentes
  if (!candidateId || !associationId) {
    return res.status(400).json({ error: 'candidateId and associationId are required' })
  }

  // 2. Règle métier : Un candidat ne peut pas postuler deux fois à la même association
  const existingApplication = applications.find(
    (app) => app.candidateId === candidateId && app.associationId === associationId
  )

  if (existingApplication) {
    return res.status(409).json({ error: 'Candidate has already applied to this association' })
  }

  // 3. Créer la nouvelle candidature
  const newApplication = {
    id: applications.length + 1,
    candidateId,
    associationId,
    status: 'pending',
    appliedAt: new Date().toISOString()
  }

  // 4. L'ajouter à la liste
  applications.push(newApplication)

  // 5. Retourner un statut 201 (Created) avec l'objet créé
  res.status(201).json(newApplication)
})

export default router
