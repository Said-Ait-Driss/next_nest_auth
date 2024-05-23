import { authOptions } from '@/utils/authOptions.util';
import NextAuth from 'next-auth/next';
// const refreshToken = async (token:JWT):promise<JWT> => {
//     const body = {
//         query:
//           'mutation {\n  signin(data: { email: "saidaitdriss@gmail.com", password: "123456789" }) {\n    _id\n    firstName\n    lastName\n    email\n    username\n    status\n  }\n}',
//         variables: {},
//         operationName: null,
//     };

// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
