import { gql } from '@apollo/client';

export const ME_QUERY = gql`
    query Query {
        me {
            _id
            username
            email
        }
    }
`;
