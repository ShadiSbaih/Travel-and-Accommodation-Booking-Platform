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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import { getInitials } from '@/shared/utils/string.utils';

// Admin navigation pages
const ADMIN_PAGES = [
    { name: 'Cities', path: '/admin/cities' },
    { name: 'Hotels', path: '/admin/hotels' },
    { name: 'Rooms', path: '/admin/rooms' },
];

function AdminNavbar() {
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

    return (
        <AppBar
            position="sticky"
            sx={{
                background: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'rgba(13, 148, 136, 0.75) !important'
                        : 'rgba(20, 184, 166, 0.85) !important',
                backdropFilter: 'blur(20px) saturate(180%) !important',
                WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
                boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                        ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 1px rgba(20, 184, 166, 0.3) !important'
                        : '0 8px 32px rgba(0, 0, 0, 0.1) !important',
                borderBottom: (theme) =>
                    theme.palette.mode === 'dark'
                        ? '1px solid rgba(20, 184, 166, 0.2)'
                        : '1px solid rgba(255, 255, 255, 0.18)',
                transition: 'all 0.3s ease',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Admin Badge */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 3 }}>
                        <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                        <Typography
                            component="div"
                            role="heading"
                            aria-level={1}
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                fontSize: '1.25rem',
                            }}
                        >
                            ADMIN
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
                            {ADMIN_PAGES.map((page) => (
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
                                        },
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
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer', alignItems: 'center' }}
                        onClick={() => navigate('/admin/hotels')}
                        role="button"
                        tabIndex={0}
                        aria-label="Navigate to admin hotels"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                navigate('/admin/hotels');
                            }
                        }}
                    >
                        <AdminPanelSettingsIcon sx={{ ml: 1, fontSize: 20 }} />
                    </Box>
                    <Typography
                        component="div"
                        role="heading"
                        aria-level={1}
                        onClick={() => navigate('/admin/hotels')}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        ADMIN
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        {ADMIN_PAGES.map((page) => (
                            <Button
                                key={page.name}
                                component={NavLink}
                                to={page.path}
                                aria-label={`Navigate to ${page.name}`}
                                sx={{
                                    my: 2,
                                    px: 2,
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

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} aria-label="Open user menu">
                                <Avatar
                                    alt={fullName}
                                    sx={{
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.15)'
                                                : 'rgba(255, 255, 255, 0.95)',
                                        color: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? '#ffffff'
                                                : '#7c3aed',
                                        fontWeight: 700,
                                        border: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? '2px solid rgba(147, 51, 234, 0.3)'
                                                : '2px solid rgba(255, 255, 255, 0.8)',
                                        boxShadow: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                                                : '0 2px 8px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    {getInitials(fullName || '')}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{
                                mt: '45px',
                                '& .MuiPaper-root': {
                                    borderRadius: '8px',
                                    minWidth: 220,
                                    boxShadow: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? '0 8px 24px rgba(0, 0, 0, 0.5)'
                                            : '0 4px 16px rgba(0, 0, 0, 0.12)',
                                    background: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(30, 41, 59, 0.98)'
                                            : 'rgba(255, 255, 255, 0.98)',
                                    backdropFilter: 'blur(12px)',
                                    border: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? '1px solid rgba(255, 255, 255, 0.08)'
                                            : '1px solid rgba(0, 0, 0, 0.08)',
                                    overflow: 'visible',
                                    mt: 1.5,
                                },
                                '& .MuiList-root': {
                                    padding: '8px',
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
                                    px: 2,
                                    py: 1.5,
                                    mb: 1,
                                    borderBottom: (theme) =>
                                        `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {fullName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <AdminPanelSettingsIcon sx={{ fontSize: 14 }} />
                                    Admin Account
                                </Typography>
                            </Box>

                            {/* Theme Toggle */}
                            <MenuItem
                                sx={{
                                    borderRadius: '6px',
                                    mb: 1,
                                    '&:hover': {
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.08)'
                                                : 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            >
                                <ThemeToggle />
                            </MenuItem>

                            {/* Logout Button */}
                            <MenuItem
                                onClick={handleLogout}
                                sx={{
                                    borderRadius: '6px',
                                    p: 0,
                                    overflow: 'hidden',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    sx={{
                                        borderRadius: '6px',
                                        py: 1.25,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '0.9375rem',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)',
                                        },
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

export default AdminNavbar;
