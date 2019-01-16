module.exports = {
    secret: 'a very grave secret',
    users: [{username: 'admin', password: 'admin'}],
    port: process.env.PORT || 5000,
    tokenName: 'x-access-token'
}