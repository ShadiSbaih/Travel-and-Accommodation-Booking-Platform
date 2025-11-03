import { loginValidationSchema } from '../validation.utils';

describe('Login Validation', () => {
  it('should validate correct login data', async () => {
    const validData = {
      userName: 'testuser',
      password: 'pass123',
    };

    await expect(loginValidationSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('should reject empty username', async () => {
    const invalidData = {
      userName: '',
      password: 'pass123',
    };

    await expect(loginValidationSchema.validate(invalidData)).rejects.toThrow('Username is required');
  });

  it('should reject short username', async () => {
    const invalidData = {
      userName: 'ab',
      password: 'pass123',
    };

    await expect(loginValidationSchema.validate(invalidData)).rejects.toThrow('Username must be at least 3 characters');
  });

  it('should reject empty password', async () => {
    const invalidData = {
      userName: 'testuser',
      password: '',
    };

    await expect(loginValidationSchema.validate(invalidData)).rejects.toThrow('Password is required');
  });

  it('should reject short password', async () => {
    const invalidData = {
      userName: 'testuser',
      password: 'abc',
    };

    await expect(loginValidationSchema.validate(invalidData)).rejects.toThrow('Password must be at least 4 characters');
  });
});
