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
import { useRef } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const email = useRef('');
    const password = useRef('');

    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const onSubmit = async () => {
        const result = await signIn('credentials', {
            username: email.current,
            password: password.current,
            redirect: true,
            callbackUrl: '/dashboard'
        });
    };

    return (
        <>
            <Box
                sx={{ bgcolor: theme.palette.primary.main }}
                height={350}
                width={320}
                borderRadius={5}
                display="flex"
                alignItems="center"
                flexDirection="column"
                padding={4}
                paddingTop={12}
            >
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
                                    <AccountCircleIcon sx={{ color: '#fff' }} />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Email"
                        onChange={(e) => (email.current = e.target.value)}
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
                    />
                </FormControl>
                <Button
                    variant="contained"
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
                    LOG IN
                </Button>
            </Box>
        </>
    );
}
