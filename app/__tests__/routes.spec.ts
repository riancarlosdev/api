import request from 'supertest'
import App from '../app'

describe('POST /user', () => {
  test('/register-user', async () => {
    const API = new App()
    const response = await request(API.initialServer(true)).post('/user/register-user').send({
      nome: 'Rian',
      sobrenome: 'Carlos',
      email: 'ggrian.dev@gmail.com',
      data_nascimento: '18/06/2001',
      cpf: '095.733.665-92',
      senha: '86042781sa',
      confirm_senha: '86042781sa'
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.message).toBe('Cadastrado com sucesso.')
  })
})