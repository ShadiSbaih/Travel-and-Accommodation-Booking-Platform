import Button from '@/components/common/Button';
import Form from '@/components/common/Form';
import Input from '@/components/common/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ThemeToggle from '@/components/common/ThemeToggle';
import { useLogin } from '@/hooks/api/useAuth';

function LoginPage() {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      loginMutation.mutate(values);
    },
  });

  const errorMessage = loginMutation.error instanceof Error && 'response' in loginMutation.error
    ? ((loginMutation.error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Invalid username or password')
    : loginMutation.error ? 'Invalid username or password' : '';

  // Test ErrorBoundary - will be handled at a higher level

  // throw new Error('Testing ErrorBoundary - Error thrown from LoginPage');


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <ThemeToggle />
      </div>
      <Form
        onSubmit={formik.handleSubmit}
        title="Login"
        subtitle="Welcome back! Please login to your account."
        error={errorMessage}
        footer={
          <>
            <Button
              type="submit"
              variant="solid"
              size="lg"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </>
        }
      >
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
        />
        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter your password"
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
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          }
        />
      </Form>
    </div>
  );
}

export default LoginPage;