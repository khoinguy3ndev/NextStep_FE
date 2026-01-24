// import { onError } from '@apollo/client/link/error'

// export const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     for (const err of graphQLErrors) {
//       if (err.extensions?.code === 'UNAUTHENTICATED') {
//         // TODO: logout / clear token
//         console.error('Unauthenticated')
//       }
//     }
//   }

//   if (networkError) {
//     console.error('Network error', networkError)
//   }
// })
