declare namespace NodeJS {
  export interface ProcessEnv {
    KEYCLOAK_ID: string
    KEYCLOAK_SECRET: string
    KEYCLOAK_ISSUER: string
    API_SEVER_URL: string
  }
}