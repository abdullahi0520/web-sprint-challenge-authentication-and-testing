const jwtSecret = process.env.JWT_SECRET || 'yo'
const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS || 8

module.exports = {
    jwtSecret,
    BCRYPT_ROUNDS
} 