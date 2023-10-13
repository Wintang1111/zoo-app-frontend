import { Box, IconButton, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';

import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { logout } from '~/api/data/mockData';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const handleLogout = () => {
        const res = logout(localStorage.getItem('token'));
        res.then((result) => {
            if (result.status === 200) {
                localStorage.removeItem('token');
                window.location = '/';
            }
        });
    };
    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[400]} !important`,
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important',
                },
                '& .pro-inner-item': {
                    padding: '5px 35px 5px 20px !important',
                },
                '& .pro-inner-item:hover': {
                    color: '#868dfb !important',
                },
                '& .pro-menu-item.active': {
                    color: '#6870fa !important',
                },
                '& .MuiBox-root': {
                    height: '100%',
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: '10px 0 20px 0',
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.png`}
                                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: '10px 0 0 0' }}
                                >
                                    {decode(localStorage.getItem('token')).sub}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {decode(localStorage.getItem('token')).roles[0]}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                            Data
                        </Typography>
                        <Item
                            title="Manage User"
                            to="/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                            Pages
                        </Typography>
                        <Item
                            title="Create New Staff"
                            to="/staff/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Update Staff"
                            to="/staff/update"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Button
                            variant="contained"
                            sx={{ width: '70%', marginTop: '2vh', marginBottom: '4vh' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
