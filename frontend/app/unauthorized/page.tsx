'use client';

import Box from '@mui/material/Box';

import { useEffect, ErrorInfo } from 'react';

import { useRouter } from 'next/navigation';

const UnauthorizeState = (props: any) => {
    const router = useRouter();

    useEffect(() => {
        // console.error(error);
    }, [props.error]);

    return (
        <Box
            sx={{
                bgcolor: '#cfe8fc',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <h1>Oh nooo !</h1>
            <h2>You don't have permission for this resource</h2>
            <button onClick={() => router.push('/')}>Go Back</button>
        </Box>
    );
};
export default UnauthorizeState;
