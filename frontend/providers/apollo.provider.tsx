'use client';

import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
    NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'http://localhost:3001/graphql'
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true
                      }),
                      httpLink
                  ])
                : httpLink
    });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
