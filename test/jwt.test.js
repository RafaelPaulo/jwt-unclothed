const { createJwt, openJwt } = require('../index')

test('create a jwt token', () => {
    const tokenExpected = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJhZmFlbCIsImVtYWlsIjoicmFmYWVsQGVtYWlsLmNvbSIsImxvdmVzIjpbImNvZGUiLCJ0byBmaXNoIiwidHYgc2VyaWVzIiwic29mdHdhcmUgZW5naW5lZXJpbmciXX0.VCLVKYURRj6Rt83YXec-HViHR_TDevEKHZYFnI0kYWY'
    const payload = {
        username: 'rafael',
        email: 'rafael@email.com',
        loves: [ 'code', 'to fish', 'tv series', 'software engineering' ]
    }
    const secret = 'rafael100'

    const token = createJwt(payload, secret)

    expect(token).toBe(tokenExpected)
})

test('open a jwt token', () => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJhZmFlbCIsImVtYWlsIjoicmFmYWVsQGVtYWlsLmNvbSIsImxvdmVzIjpbImNvZGUiLCJ0byBmaXNoIiwidHYgc2VyaWVzIiwic29mdHdhcmUgZW5naW5lZXJpbmciXX0.VCLVKYURRj6Rt83YXec-HViHR_TDevEKHZYFnI0kYWY'
    const payloadExpected = {
        username: 'rafael',
        email: 'rafael@email.com',
        loves: [ 'code', 'to fish', 'tv series', 'software engineering' ]
    }
    const secret = 'rafael100'

    const payload = openJwt(token, secret)

    expect(payload).toBe(payloadExpected)
})
