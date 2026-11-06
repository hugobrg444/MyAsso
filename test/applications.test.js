import { describe, it, expect } from 'vitest'
import request from 'supertest'
// Remplacez le chemin '../src/app.js' par le bon chemin vers votre fichier app.js si nécessaire
import app from '../src/app.js'

describe('POST /api/applications', () => {
  it('should create a new application and return 201', async () => {
    const response = await request(app)
      .post('/api/applications')
      .send({ candidateId: 999, associationId: 2 })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.candidateId).toBe(999)
    expect(response.body.associationId).toBe(2)
    expect(response.body.status).toBe('pending')
  })

  it('should return 409 Conflict if application already exists', async () => {
    // 1. On crée une première candidature
    await request(app)
      .post('/api/applications')
      .send({ candidateId: 888, associationId: 3 })

    // 2. On tente de recréer exactement la même
    const response = await request(app)
      .post('/api/applications')
      .send({ candidateId: 888, associationId: 3 })

    // 3. On vérifie que le serveur la rejette
    expect(response.status).toBe(409)
    expect(response.body.error).toBe('Candidate has already applied to this association')
  })

  it('should return 400 if candidateId or associationId is missing', async () => {
    const response = await request(app)
      .post('/api/applications')
      .send({ candidateId: 777 }) // Il manque associationId

    expect(response.status).toBe(400)
  })
})
