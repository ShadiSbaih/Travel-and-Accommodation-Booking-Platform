import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { useLogout } from '@/hooks/api/useAuth';
import ThemeToggle from './common/ThemeToggle';
import { useUserInfo } from '@/hooks/api/useUserInfo';
import FTSLogo from '@/assets/FTS.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search-results' }
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const logoutMutation = useLogout();

    // Get user information
    const { fullName } = useUserInfo();
    
    // Mock cart items count - replace with actual cart state
    const cartItemsCount = 3; // This should come from your cart context/state

    // Helper function to get initials from name
    const getInitials = (name: string): string => {
        if (!name) return 'U';
        const words = name.trim().split(' ');
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }
        // Return first letter of first name + first letter of last name
        return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const handleCartClick = () => {
        navigate('/checkout'); // Navigate to checkout/cart page
    };

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const isActivePage = (path: string) => {
        return location.pathname === path;
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <img
                            src={FTSLogo}
                            alt="FTS Logo"
                            style={{
                                height: 50,
                                width: 'auto'
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        FTS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem 
                                    key={page.name} 
                                    onClick={() => handleNavigation(page.path)}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <img
                            src={FTSLogo}
                            alt="FTS Logo"
                            style={{
                                height: 32,
                                width: 'auto'
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        onClick={() => navigate('/')}
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
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        FTS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleNavigation(page.path)}
                                sx={{ 
                                    my: 2, 
                                    color: isActivePage(page.path) ? 'primary.main' : 'white', 
                                    display: 'block',
                                    fontWeight: isActivePage(page.path) ? 'bold' : 'normal',
                                    borderBottom: isActivePage(page.path) ? '2px solid' : 'none',
                                    borderRadius: 0
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    
                    {/* Shopping Cart Icon with Badge */}
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

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={fullName}>
                                    {getInitials(`${fullName}`)}
                                </Avatar>
                            </IconButton>

                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={1} onClick={handleLogout}>
                                <Button variant="contained" color="error" >
                                    Logout
                                </Button>
                            </MenuItem>
                            <MenuItem key={2} >
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
