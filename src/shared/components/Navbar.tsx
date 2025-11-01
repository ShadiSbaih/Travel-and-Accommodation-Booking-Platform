import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useLogout } from '@/features/auth/hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import FTSLogo from '@/assets/FTS.png';
import { CartIcon } from './CartIcon';


const pages = [
    { name: 'Home', path: '/home' },
    { name: 'Search', path: '/search-results' }
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const logoutMutation = useLogout();
    const { fullName } = useUserInfo();

    const getInitials = (name: string): string => {
        const words = name.trim().split(' ').filter(Boolean);
        return words.length > 1
            ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
            : (words[0]?.[0] || 'U').toUpperCase();
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleLogout = () => logoutMutation.mutate();

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Desktop Logo */}
                    <Box
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/home')}
                    >
                        <img src={FTSLogo} alt="FTS Logo" width={50} height={50} style={{ width: 'auto', height: 50 }} />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => navigate('/home')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        FTS
                    </Typography>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="Open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    component={NavLink}
                                    to={page.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'grey.600',
                                            color: 'common.white'
                                        },
                                        '&.active': {
                                            color: 'primary.main',
                                            backgroundColor: 'action.selected',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Mobile Logo */}
                    <Box
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/home')}
                    >
                        <img src={FTSLogo} alt="FTS Logo" width={32} height={32} style={{ width: 'auto', height: 32 }} />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        onClick={() => navigate('/home')}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        FTS
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={NavLink}
                                to={page.path}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    borderRadius: 1,
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    '&.active': {
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        borderBottom: '2px solid white',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'
                                    }
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Cart Button */}
                    <Box sx={{ mr: 1 }}>
                        <CartIcon />
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} aria-label="Open user menu">
                                <Avatar alt={fullName} sx={{ bgcolor: 'primary' }}>
                                    {getInitials(fullName || '')}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="user-menu"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLogout}>
                                <Button variant="contained" color="error" fullWidth>
                                    Logout
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <ThemeToggle />
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;