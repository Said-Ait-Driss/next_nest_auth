'use client';

import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import RegisterForm from '@/components/auth/register/registerForm';

interface RegisterPagProps {}

export default function RegisterPage(props: RegisterPagProps) {
    return (
        <>
            <AppCacheProvider {...props}>
                <Head>
                    <meta name="" content="" />
                </Head>
            </AppCacheProvider>
            <CssBaseline />
            <Box
                sx={{
                    bgcolor: '#cfe8fc',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <RegisterForm></RegisterForm>
            </Box>
        </>
    );
}
