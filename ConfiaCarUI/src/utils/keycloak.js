import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:9090/',
    realm: 'ConfiaCar',
    clientId: 'confiacar-client-api-rest'
});

export default keycloak;
