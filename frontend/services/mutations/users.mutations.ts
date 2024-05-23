import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
    mutation CreateUser(
        $email: String!
        $password: String!
        $username: String!
        $firstName: String!
        $lastName: String!
        $status: String!
    ) {
        createUser(
            data: {
                email: $email
                password: $password
                username: $username
                firstName: $firstName
                lastName: $lastName
                status: $status
            }
        ) {
            _id
            firstName
            lastName
            email
            username
            password
            status
        }
    }
`;
