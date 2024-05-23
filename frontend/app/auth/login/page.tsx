'use client';

import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import LoginForm from '@/components/auth/login/loginForm';

interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
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
                <LoginForm></LoginForm>
            </Box>
        </>
    );
}
