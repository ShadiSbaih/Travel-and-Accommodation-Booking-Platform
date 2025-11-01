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

const LoginForm = () => {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

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
          leftIcon={<PersonOutlineIcon fontSize="small" className="text-[#00b6ff]" />}
          className="[&_label]:text-[#00b6ff] [&_label]:font-semibold [&_input]:border-[#00b6ff] [&_input]:border-2 [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder-gray-500 [&_input]:rounded-xl [&_input]:focus:ring-[#00b6ff]/40 [&_input]:focus:ring-2"
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
          leftIcon={<LockOutlinedIcon fontSize="small" className="text-[#00b6ff]" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-[#00b6ff] transition hover:text-[#33c4ff] focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </button>
          }
          className="[&_label]:text-[#00b6ff] [&_label]:font-semibold [&_input]:border-[#00b6ff] [&_input]:border-2 [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder-gray-500 [&_input]:rounded-xl [&_input]:focus:ring-[#00b6ff]/40 [&_input]:focus:ring-2"
        />

        <Button
          type="submit"
          variant="solid"
          size="lg"
          disabled={loginMutation.isPending}
          className="mt-6 w-full rounded-xl bg-[#00b6ff] hover:bg-[#0096d1] py-3 text-sm font-semibold uppercase tracking-widest"
        >
          {loginMutation.isPending ? 'Logging in…' : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
