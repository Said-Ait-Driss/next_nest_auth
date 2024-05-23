'use client';

import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmailIcon from '@mui/icons-material/Email';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '@/services/mutations/users.mutations';
import CircularProgress from '@mui/material/CircularProgress';
import { sizes } from '@/styles/theme';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const email = useRef('');
    const username = useRef('');
    const firstName = useRef('');
    const lastName = useRef('');
    const password = useRef('');

    const [errors, setErrors] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const theme = useTheme();
    const router = useRouter();

    const [register, { data, loading, error }] = useMutation(
        REGISTER_MUTATION,
        {
            onError: (error) => {
                error?.graphQLErrors?.forEach((err: any) => {
                    err = err.extensions.originalError?.message;
                    if (err && err.length && err instanceof Array)
                        setErrors(err[0]);
                    else if (err && err.length) setErrors(err);
                    else setErrors('');
                });
            },
            onCompleted(data, clientOptions) {
                if (data.createUser) {
                    router.push('/auth/login');
                }
            }
        }
    );

    const onSubmit = async () => {
        register({
            variables: {
                email: email.current,
                password: password.current,
                username: username.current,
                firstName: firstName.current,
                lastName: lastName.current,
                status: 'active'
            }
        });
    };

    return (
        <>
            <Box
                sx={{ bgcolor: theme.palette.primary.main }}
                height={550}
                width={320}
                borderRadius={5}
                display="flex"
                alignItems="center"
                flexDirection="column"
                padding={4}
                paddingTop={12}
            >
                {errors ? (
                    <span style={{ color: 'red', marginBottom: '1rem' }}>
                        {' '}
                        {errors}{' '}
                    </span>
                ) : (
                    ''
                )}
                <FormControl
                    sx={{ width: '100%', marginBottom: 2 }}
                    variant="outlined"
                >
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        sx={{ color: '#fff' }}
                    >
                        Email
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={'text'}
                        placeholder="example@gmail.com"
                        sx={{ color: '#fff' }}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton edge="start">
                                    <EmailIcon sx={{ color: '#fff' }} />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Email"
                        onChange={(e) => (email.current = e.target.value)}
                        disabled={loading}
                    />
                </FormControl>
                <FormControl
                    sx={{ width: '100%', marginBottom: 2 }}
                    variant="outlined"
                >
                    <InputLabel
                        htmlFor="outlined-adornment-Username"
                        sx={{ color: '#fff' }}
                    >
                        Username
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-Username"
                        type={'text'}
                        placeholder="username"
                        sx={{ color: '#fff' }}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton edge="start">
                                    <VerifiedUserIcon sx={{ color: '#fff' }} />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Username"
                        onChange={(e) => (username.current = e.target.value)}
                        disabled={loading}
                    />
                </FormControl>
                <FormControl
                    sx={{ width: '100%', marginBottom: 2 }}
                    variant="outlined"
                >
                    <InputLabel
                        htmlFor="outlined-adornment-FirstName"
                        sx={{ color: '#fff' }}
                    >
                        First Name
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-FirstName"
                        type={'text'}
                        placeholder="First Name"
                        sx={{ color: '#fff' }}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton edge="start">
                                    <AccountCircleIcon sx={{ color: '#fff' }} />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="First Name"
                        onChange={(e) => (firstName.current = e.target.value)}
                        disabled={loading}
                    />
                </FormControl>
                <FormControl
                    sx={{ width: '100%', marginBottom: 2 }}
                    variant="outlined"
                >
                    <InputLabel
                        htmlFor="outlined-adornment-LastName"
                        sx={{ color: '#fff' }}
                    >
                        Last Name
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-LastName"
                        type={'text'}
                        placeholder="Last Name"
                        sx={{ color: '#fff' }}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton edge="start">
                                    <AccountCircleIcon sx={{ color: '#fff' }} />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Last Name"
                        onChange={(e) => (lastName.current = e.target.value)}
                        disabled={loading}
                    />
                </FormControl>
                <FormControl
                    sx={{ width: '100%', marginBottom: 2 }}
                    variant="outlined"
                >
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        sx={{ color: '#fff' }}
                    >
                        Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="password"
                        sx={{ color: '#fff' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff sx={{ color: '#fff' }} />
                                    ) : (
                                        <Visibility sx={{ color: '#fff' }} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        onChange={(e) => (password.current = e.target.value)}
                        disabled={loading}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    disabled={loading}
                    sx={{
                        bgcolor: '#fff',
                        width: '100%',
                        padding: '2',
                        color: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                            color: 'white'
                        }
                    }}
                    onClick={onSubmit}
                >
                    {loading ? (
                        <CircularProgress color="primary" size={sizes.md} />
                    ) : (
                        'REGISTER'
                    )}
                </Button>
            </Box>
        </>
    );
}
