import express from 'express'

const router = express.Router()

// Mock data for associations
const associations = [
  {
    id: 1,
    name: 'Help & Share',
    shortDescription: 'Support for families and isolated individuals.',
    fullDescription: 'Association dedicated to food aid, psychological support, and community activities.',
    isAvailable: true
  },
  {
    id: 2,
    name: 'EcoGreen',
    shortDescription: 'Environmental awareness and recycling.',
    fullDescription: 'Organization of park clean-up workshops, tree planting, and ecological transition education.',
    isAvailable: true
  },
  {
    id: 3,
    name: 'HandiSports Express',
    shortDescription: 'Promoting sports accessible to everyone.',
    fullDescription: 'Organization of adapted sports events for people with disabilities.',
    isAvailable: false
  }
]

// GET /api/associations : List all AVAILABLE associations
router.get('/api/associations', (_req, res) => {
  const availableAssociations = associations
    .filter((assoc) => assoc.isAvailable)
    .map(({ id, name, shortDescription }) => ({ id, name, shortDescription }))

  res.status(200).json(availableAssociations)
})

// GET /api/associations/:id : Detailed information about a specific association
router.get('/api/associations/:id', (req, res) => {
  const assocId = parseInt(req.params.id, 10)
  const association = associations.find((assoc) => assoc.id === assocId && assoc.isAvailable)

  if (!association) {
    return res.status(404).json({ error: 'Association not found or unavailable' })
  }

  res.status(200).json(association)
})

export default router
