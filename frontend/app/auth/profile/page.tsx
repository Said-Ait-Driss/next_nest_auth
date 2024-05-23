import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { me } from '@/services/actions/users.actions';

interface ProfilePageProps {}

export default async function ProfilePage(props: ProfilePageProps) {
    const { data, error, errors } = await me();

    if (error || errors) {
        return <h3>error: {JSON.stringify(error)}</h3>;
    }

    return (
        <>
            <CssBaseline />
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
                <h3>profile</h3>
                <h3>{data.me.username}</h3>
                <h3>{data.me.email}</h3>
            </Box>
        </>
    );
}
