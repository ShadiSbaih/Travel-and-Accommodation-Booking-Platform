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
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLogout } from '@/hooks/api/useAuth';
import ThemeToggle from './common/ThemeToggle';
import { useUserInfo } from '@/hooks/api/useUserInfo';
import FTSLogo from '@/assets/FTS.png';

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

    const cartItemsCount = 3; // This should come from your cart context/state

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
    const handleCartClick = () => navigate('/checkout');
    const handleLogout = () => logoutMutation.mutate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Desktop Logo */}
                    <Box 
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }} 
                        onClick={() => navigate('/home')}
                    >
                        <img src={FTSLogo} alt="FTS Logo" style={{ height: 50, width: 'auto' }} />
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
                            aria-label="menu"
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
                        <img src={FTSLogo} alt="FTS Logo" style={{ height: 32, width: 'auto' }} />
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
                    <Tooltip title="View Cart">
                        <IconButton
                            onClick={handleCartClick}
                            sx={{
                                mr: 2,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'scale(1.1)',
                                    transition: 'all 0.2s ease-in-out'
                                }
                            }}
                        >
                            <Badge badgeContent={cartItemsCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={fullName}>
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