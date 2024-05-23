import { NextAuthOptions } from 'next-auth';
import { gql } from '@apollo/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies as nextCookies } from 'next/headers';
import { BACKEND_URL } from '@/utils/constants';
import { getClient } from '@/libs/apollo.client';
import { JWT } from 'next-auth/jwt';
import { getClientWithHeader, getCookie } from '@/libs/apollo.client';

const SIGN_IN = gql`
    mutation signin($email: String!, $password: String!) {
        signin(data: { email: $email, password: $password }) {
            _id
            firstName
            lastName
            email
            username
            status
            token
            refreshToken
            expiresIn
        }
    }
`;

const REFRESH = gql`
    query Query {
        refresh {
            _id
            firstName
            lastName
            email
            username
            status
            token
            refreshToken
            expiresIn
        }
    }
`;

async function refreshToken(
    token: string,
    refreshToken: string,
    expiresIn: number
): Promise<any> {
    try {
        const { getClient } = getClientWithHeader({
            cookie:
                'token=' +
                token +
                ';' +
                'refreshToken=' +
                refreshToken +
                ';' +
                'expiresIn=' +
                expiresIn +
                ';'
        });

        const { data, error, errors } = await getClient().query({
            query: REFRESH
        });

        if (error || errors || !data || !data.refresh) return null;

        return data.refresh;
    } catch (error) {
        return null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'example@gmail.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials: any, req: any): Promise<any | null> {
                if (!credentials.username || !credentials.password) return null;

                const { username, password } = credentials;

                try {
                    const result: any = await getClient().mutate({
                        mutation: SIGN_IN,
                        variables: {
                            email: username,
                            password: password
                        }
                    });

                    if (!result || !result.data || !result.data.signin) {
                        return null;
                    }

                    const data = result.data.signin;
                    console.log(data);

                    const token = data.token;
                    const refreshToken = data.refreshToken;
                    const expiresIn = data.expiresIn;

                    nextCookies().set('token', token);
                    nextCookies().set('refreshToken', refreshToken);

                    delete data.token;
                    delete data.refreshToken;
                    delete data.expiresIn;

                    return {
                        user: data,
                        tokens: {
                            token,
                            refreshToken,
                            expiresIn
                        }
                    };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }): Promise<any | null> {
            if (user) return { ...token, ...user };

            const currentDateTime = new Date().getTime();

            if (currentDateTime < token.tokens.expiresIn) return token;
            // token is expired then refresh token
            const newPayload = await refreshToken(
                token.tokens.token,
                token.tokens.refreshToken,
                token.tokens.expiresIn
            );

            if (!newPayload) return null;

            const newUser = newPayload;
            console.log('new token ');

            return {
                user: newUser,
                tokens: {
                    token: newPayload.token,
                    refreshToken: newPayload.refreshToken,
                    expiresIn: newPayload.expiresIn
                }
            };
        },
        session({ token, session }) {
            session.user = token.user;
            session.tokens = token.tokens;

            return Promise.resolve(session);
        }
    },
    pages: {
        signIn: '/auth/login'
    }
};
