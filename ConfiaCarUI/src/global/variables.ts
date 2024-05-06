
export const GetServerUrl = (): string => window.location.origin === 'http://localhost:3000' ? "https://localhost:7029/api/" : "https://APIConfiaCar.fconfia.com/api/" //"https://apicv.fconfia.com/api/"
