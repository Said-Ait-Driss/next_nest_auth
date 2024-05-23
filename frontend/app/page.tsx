import Box from '@mui/material/Box';

export default function Home() {
    return (
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                margin: 0
            }}
            sx={{ bgcolor: '#cfe8fc' }}
        >
            <h2>Welcome page</h2>
        </Box>
    );
}
