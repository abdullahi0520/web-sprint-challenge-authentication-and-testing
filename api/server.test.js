// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const Jokes = require('../api/jokes/jokes-model')

const testData = {username: 'gio', password: 'giovanni'}

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
});

afterAll(async () => {
  await db.destroy()
})


  beforeEach(async () => {
    await request(server).post('/api/auth/register')
      .send({
        username: "Gio",
        password: "giovanniSantana"
      })
  })


describe('server.js', () => {
  describe('[GET] /api/jokes', () => {
      test('[1] should return 401', async () => {
          const res = await request(server).get('/api/jokes')
      expect(res.status).toBe(401);
      });
      test('[2] should return json', async() => {
        const res = await request(server).get('/api/jokes');
        expect(res.type).toBe('application/json')
    });
  })
  describe("[POST] /api/auth/register", () => {
//register with invalid payload
        test('invalid request returning a status 400', async () => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({username: "gg", password: "" });
            expect(res.status).toBe(400);
        });
        test('causes a user to be added to the database', async () => {
          const users = await db('users')
          expect(users).toHaveLength(1)
        })
  });
  describe('[POST] /login', () => {
    let login
    beforeEach(async () => {
      login = await request(server).post('/api/auth/login')
        .send({
          username: "Gio",
          password: "giovanniSantana"
        })
    });
    test('allows a user to login', async () => {
      expect(login.text).toMatch('token')
    })
    test('responds with a greeting to logged in user', async () => {
      expect(login.text).toMatch('Gio is back!')
    })
})
})


