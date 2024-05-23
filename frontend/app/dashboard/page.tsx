import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions.util';
import Box from '@mui/material/Box';

const Dashboard = async () => {
    const session = await getServerSession(authOptions);

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
            <h2>Hi : {session?.user.firstName}</h2>
        </Box>
    );
};
export default Dashboard;
