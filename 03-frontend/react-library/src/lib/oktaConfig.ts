export const oktaConfig = {
    useClassicEngine: true,
    clientId: '0oanch290x1yhRUD45d7',
    issuer: 'https://dev-35580436.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}
