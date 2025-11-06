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
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import FTSLogo from '@/assets/FTS.png';
import { CartIcon } from './CartIcon';
import { NAVIGATION_PAGES } from '@/shared/constants/navigation.constants';
import { getInitials } from '@/shared/utils/string.utils';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const logoutMutation = useLogout();
    const { fullName } = useUserInfo();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleLogout = () => logoutMutation.mutate();

    const getPageIcon = (pageName: string) => {
        switch(pageName.toLowerCase()) {
            case 'home':
                return <HomeIcon sx={{ fontSize: 20, mr: 0.75 }} />;
            case 'search':
                return <SearchIcon sx={{ fontSize: 20, mr: 0.75 }} />;
            default:
                return null;
        }
    };

    return (
        <AppBar 
            position="sticky"
            elevation={0}
            sx={{
                background: (theme) => 
                    theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(15, 118, 110, 0.95) 0%, rgba(13, 148, 136, 0.9) 50%, rgba(20, 184, 166, 0.85) 100%)'
                        : 'linear-gradient(135deg, rgba(20, 184, 166, 0.95) 0%, rgba(45, 212, 191, 0.9) 50%, rgba(94, 234, 212, 0.85) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: (theme) => 
                    theme.palette.mode === 'dark'
                        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                        : '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderBottom: (theme) => 
                    theme.palette.mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(255, 255, 255, 0.3)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ py: 0.5 }}>
                    {/* Desktop Logo */}
                    <Box
                        sx={{ 
                            display: { xs: 'none', md: 'flex' }, 
                            mr: 2, 
                            cursor: 'pointer',
                            alignItems: 'center',
                            gap: 1.5,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        }}
                        onClick={() => navigate('/home')}
                    >
                        <img 
                            src={FTSLogo} 
                            alt="FTS Logo" 
                            width={50} 
                            height={50} 
                            style={{ 
                                width: 'auto', 
                                height: 50,
                            }} 
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '0.05em',
                                color: 'white',
                            }}
                        >
                            Travel & Stay
                        </Typography>
                    </Box>
                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="Open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{
                                color: 'white',
                            }}
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
                            sx={{ 
                                display: { xs: 'block', md: 'none' },
                                '& .MuiPaper-root': {
                                    borderRadius: '12px',
                                    mt: 1,
                                    minWidth: 200,
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                                }
                            }}
                        >
                            {NAVIGATION_PAGES.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    component={NavLink}
                                    to={page.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        borderRadius: '8px',
                                        mx: 1,
                                        my: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                        '&.active': {
                                            color: 'primary.main',
                                            backgroundColor: 'action.selected',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    {getPageIcon(page.name)}
                                    <Typography sx={{ textAlign: 'center' }}>
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Mobile Logo */}
                    <Box
                        sx={{ 
                            display: { xs: 'flex', md: 'none' }, 
                            mr: 1, 
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/home')}
                    >
                        <img 
                            src={FTSLogo} 
                            alt="FTS Logo" 
                            width={40} 
                            height={40} 
                            style={{ 
                                width: 'auto', 
                                height: 40,
                            }} 
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => navigate('/home')}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.05rem',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        FTS
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1, ml: 4 }}>
                        {NAVIGATION_PAGES.map((page) => (
                            <Button
                                key={page.name}
                                component={NavLink}
                                to={page.path}
                                startIcon={getPageIcon(page.name)}
                                sx={{
                                    my: 2,
                                    px: 2.5,
                                    py: 1,
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    },
                                    '&.active': {
                                        fontWeight: 700,
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '20%',
                                            right: '20%',
                                            height: '3px',
                                            borderRadius: '3px 3px 0 0',
                                            background: 'white',
                                        },
                                    },
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Cart Button */}
                    <Box 
                        sx={{ 
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1,
                            borderRadius: '50%',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <CartIcon />
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings" placement="bottom">
                            <IconButton 
                                onClick={handleOpenUserMenu} 
                                sx={{ 
                                    p: 0,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    }
                                }} 
                                aria-label="Open user menu"
                            >
                                <Avatar 
                                    alt={fullName} 
                                    sx={{ 
                                        width: 40,
                                        height: 40,
                                        bgcolor: (theme) => 
                                            theme.palette.mode === 'dark' 
                                                ? 'rgba(255, 255, 255, 0.9)'
                                                : '#ffffff',
                                        color: (theme) => 
                                            theme.palette.mode === 'dark'
                                                ? '#0d9488'
                                                : '#0d9488',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        border: '2px solid rgba(255, 255, 255, 0.5)',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    {getInitials(fullName || '')}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ 
                                mt: '50px',
                                '& .MuiPaper-root': {
                                    borderRadius: '12px',
                                    minWidth: 240,
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                                    mt: 1.5,
                                },
                                '& .MuiList-root': {
                                    padding: '12px',
                                },
                            }}
                            id="user-menu"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* User Info Header */}
                            <Box
                                sx={{
                                    px: 2.5,
                                    py: 2,
                                    mb: 1,
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        fontWeight: 700, 
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    {fullName}
                                </Typography>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    User Account 
                                </Typography>
                            </Box>

                            {/* Theme Toggle */}
                            <MenuItem 
                                sx={{ 
                                    borderRadius: '8px',
                                    mb: 1,
                                    py: 1.5,
                                }}
                            >
                                <ThemeToggle />
                            </MenuItem>

                            {/* Logout Button */}
                            <MenuItem 
                                onClick={handleLogout}
                                sx={{ 
                                    borderRadius: '8px',
                                    p: 0,
                                    overflow: 'hidden',
                                }}
                            >
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    fullWidth
                                    sx={{
                                        borderRadius: '8px',
                                        py: 1.5,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '0.9375rem',
                                    }}
                                >
                                    Logout
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;