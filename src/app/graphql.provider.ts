import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';

import { setContext } from '@apollo/client/link/context';
import { environment } from "../environments/environment";


const uri = environment.apiUrl; // <-- add the URL of the GraphQL server here

const authContext = setContext((op, ctx) => {
  const authToken = localStorage.getItem(environment.authToken);

  if (authToken === null) {
    return {};
  } else {
    return {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
  }
});


export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  return {
    link: ApolloLink.from([
      authContext,
      httpLink.create({ uri }),
    ]),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
