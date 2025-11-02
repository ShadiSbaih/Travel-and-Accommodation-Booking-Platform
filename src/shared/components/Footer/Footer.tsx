import {
  Box,
  Container,
  Typography,
  Link,
  useTheme,
} from '@mui/material';
import {
  LinkedIn,
  Public,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import FTSLogo from '@/assets/FTS.png';

export const Footer = () => {
  const theme = useTheme();

  const globalOffices = [
    { label: 'United States (HQ)', path: '/offices/us', flag: '🇺🇸' },
    { label: 'United Kingdom', path: '/offices/uk', flag: '🇬🇧' },
    { label: 'Australia', path: '/offices/au', flag: '🇦🇺' },
    { label: 'Remote Global', path: '/offices/remote', icon: <Public sx={{ fontSize: 16 }} /> },
  ];

  const services = [
    { label: 'Hotel Booking', path: '/services/hotels' },
    { label: 'Flight Reservations', path: '/services/flights' },
    { label: 'Travel Packages', path: '/services/packages' },
    { label: 'Vacation Planning', path: '/services/planning' },
    { label: 'Group Travel', path: '/services/groups' },
    { label: '24/7 Support', path: '/support' },
  ];

  const company = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Story', path: '/story' },
    { label: 'Careers', path: '/careers' },
    { label: 'Culture', path: '/culture' },
    { label: 'Contact', path: '/contact' },
  ];

  const linkedInUrl = 'https://www.linkedin.com/in/shadi-sbaih/';

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto',
        py: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 4 },
            mb: { xs: 3, md: 4 },
          }}
        >
          {/* Brand Section */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={FTSLogo}
                alt="Travel App"
                sx={{
                  height: 48,
                  width: 48,
                  objectFit: 'contain',
                  filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'brightness(1)',
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 2,
                maxWidth: 280,
                lineHeight: 1.6,
                fontSize: '0.813rem',
              }}
            >
              Global travel booking partners creating meaningful value for travelers worldwide.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                fontSize: '0.75rem',
                opacity: 0.7,
              }}
            >
              Building tomorrow's adventures today.
            </Typography>
          </Box>

          {/* Global Offices */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2.5,
                color: 'primary.main',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.875rem',
                borderBottom: `2px solid`,
                borderColor: 'primary.main',
                pb: 1,
                display: 'inline-block',
              }}
            >
              Global Offices
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {globalOffices.map((office) => (
                <Box
                  component="li"
                  key={office.path}
                  sx={{
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {office.flag && (
                    <Typography sx={{ fontSize: '1rem' }}>{office.flag}</Typography>
                  )}
                  {office.icon && (
                    <Box sx={{ color: 'primary.main', display: 'flex' }}>
                      {office.icon}
                    </Box>
                  )}
                  <Link
                    component={RouterLink}
                    to={office.path}
                    underline="none"
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      '&:hover': {
                        color: 'primary.main',
                        pl: 0.5,
                      },
                    }}
                  >
                    {office.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Services */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: 'primary.main',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.813rem',
                borderBottom: `2px solid`,
                borderColor: 'primary.main',
                pb: 0.5,
                display: 'inline-block',
              }}
            >
              Services
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {services.map((service) => (
                <Box component="li" key={service.path} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={service.path}
                    underline="none"
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      '&:hover': {
                        color: 'primary.main',
                        pl: 0.5,
                      },
                    }}
                  >
                    {service.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Company */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: 'primary.main',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.813rem',
                borderBottom: `2px solid`,
                borderColor: 'primary.main',
                pb: 0.5,
                display: 'inline-block',
              }}
            >
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {company.map((item) => (
                <Box component="li" key={item.path} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.path}
                    underline="none"
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      '&:hover': {
                        color: 'primary.main',
                        pl: 0.5,
                      },
                    }}
                  >
                    {item.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Divider Line */}
        <Box
          sx={{
            height: 1,
            bgcolor: 'divider',
            mb: 2.5,
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
          >
            © {new Date().getFullYear()} Travel App. All rights reserved. | Building trusted
            partnerships worldwide.
          </Typography>

          {/* Author Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.75,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Author: Shadi Sbaih
            </Typography>
            <Link
              component="a"
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <LinkedIn sx={{ fontSize: 24 }} />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
