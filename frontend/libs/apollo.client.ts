import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const getCookie = (cookie: string, cookies: any) => {
    const ourCookies = cookies();
    let value = ourCookies.get(cookie)!.value;
    return cookie + '=' + value + ';';
};

const httpLink = (headers: any = {}) =>
    new HttpLink({
        uri: process.env.GRAGHBASE_URL || 'http://localhost:3001/graphql',
        credentials: 'include',
        headers: headers,
        fetchOptions: {
            credentials: 'include'
        }
    });

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink()
    });
});

export const getClientWithHeader = (headers: any = {}) =>
    registerApolloClient(() => {
        return new ApolloClient({
            cache: new InMemoryCache(),
            link: httpLink(headers)
        });
    });
