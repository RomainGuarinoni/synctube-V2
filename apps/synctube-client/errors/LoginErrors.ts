export enum LoginErrors {
  scopeMissing = 'No scope found in the token',
  allScopeNotAccepeted = 'Not all scope has been accepeted by the user',
  tokenMissing = 'One token is missing',
  profilMissing = 'No profil has been found in the id token',
  apiError = 'Internal api error',
}
