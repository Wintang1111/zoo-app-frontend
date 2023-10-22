import Footer from '~/component/Layout/components/Footer/Footer';
import Header from '~/component/Layout/components/Header/Header';
import SidebarUser from '~/pages/Profile/SidebarUser/SidebarUser';
// Example CSS-in-JS with MUI's makeStyles
import {
    Box
} from '@mui/material';

function ProfileUserLayout({ children }) {
    const layoutStyles = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    };

    const contentStyles = {
        display: 'flex',
        flexGrow: 1,
        marginTop: '68px', // Đặt marginTop là 100px cho cả content
    };

    const sidebarStyles = {
        marginTop: '68px', // Đặt marginTop là 100px cho SidebarUser
    };

    return (
        <Box style={layoutStyles}>
            <Header />
            <Box style={contentStyles}>
                <SidebarUser style={sidebarStyles} />
                <Box flexGrow={1}>
                    {children}
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}

export default ProfileUserLayout;
