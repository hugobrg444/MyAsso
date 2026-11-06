import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('Associations API - Browse Associations', () => {
  it('GET /api/associations - should return only available associations', async () => {
    const res = await request(app).get('/api/associations')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(2)
    expect(res.body[0]).toHaveProperty('name')
    expect(res.body[0]).toHaveProperty('shortDescription')
  })

  it('GET /api/associations/:id - should return details of an available association', async () => {
    const res = await request(app).get('/api/associations/1')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('fullDescription')
    expect(res.body.name).toBe('Help & Share')
  })

  it('GET /api/associations/:id - should return 404 error if association is unavailable or missing', async () => {
    const res = await request(app).get('/api/associations/3')

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})
