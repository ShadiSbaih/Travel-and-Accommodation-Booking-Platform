import { useState } from 'react';
import { Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { loginValidationSchema } from '@/features/auth/utils/validation.utils';
import { useLoginFormStyles } from '@/features/auth/hooks/useLoginFormStyles';

const LoginForm = () => {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { inputClassName, buttonClassName } = useLoginFormStyles();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      loginMutation.mutate(values);
    },
  });

  const errorMessage =
    loginMutation.error instanceof Error && 'response' in loginMutation.error
      ? ((loginMutation.error as { response?: { data?: { message?: string } } })
          .response?.data?.message || 'Invalid username or password')
      : loginMutation.error
      ? 'Invalid username or password'
      : '';

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 5 }}>
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: '0.5rem',
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: 'rgb(252, 165, 165)',
          }}
        >
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Input
          id="userName"
          name="userName"
          type="text"
          label="Username"
          placeholder="Enter your username"
          variant="outline"
          size="md"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.userName && formik.errors.userName
              ? formik.errors.userName
              : undefined
          }
          leftIcon={
            <PersonOutlineIcon 
              fontSize="small" 
              sx={{ color: '#14b8a6' }}
            />
          }
          className={inputClassName}
        />

        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="•••••••••••••"
          variant="outline"
          size="md"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : undefined
          }
          leftIcon={
            <LockOutlinedIcon 
              fontSize="small" 
              sx={{ color: '#14b8a6' }}
            />
          }
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-primary-400 transition hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </button>
          }
          className={inputClassName}
        />

        <Button
          type="submit"
          variant="solid"
          size="lg"
          disabled={loginMutation.isPending}
          className={buttonClassName}
        >
          {loginMutation.isPending ? 'Logging in…' : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
