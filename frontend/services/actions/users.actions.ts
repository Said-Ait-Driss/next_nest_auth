import { getClientWithHeader, getCookie } from '@/libs/apollo.client';
import { ME_QUERY } from '@/services/queries/users.queries';
import { cookies } from 'next/headers';

export async function me() {
    const { getClient } = getClientWithHeader({
        cookie: getCookie('token', cookies)
    });

    const { data, error, errors } = await getClient().query({
        query: ME_QUERY
    });

    return { data, error, errors };
}
