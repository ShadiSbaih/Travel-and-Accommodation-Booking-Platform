import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';
import { Search, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

/**
 * A flexible input component with multiple variants, sizes, and support for icons.
 * Built with Tailwind CSS and supports both light and dark modes.
 */
const meta = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable input component with support for labels, error messages, helper text, and left/right icons. Includes three variants (outline, filled, flushed) and three sizes (sm, md, lg).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed'],
      description: 'The visual style variant of the input',
      table: {
        type: { summary: 'outline | filled | flushed' },
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input with label
 */
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

/**
 * Input variants: outline, filled, and flushed
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input variant="outline" label="Outline" placeholder="Outline variant" />
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
      <Input variant="flushed" label="Flushed" placeholder="Flushed variant" />
    </div>
  ),
};

/**
 * Input sizes: small, medium, and large
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input size="sm" label="Small" placeholder="Small size input" />
      <Input size="md" label="Medium" placeholder="Medium size input" />
      <Input size="lg" label="Large" placeholder="Large size input" />
    </div>
  ),
};

/**
 * Input with left icon
 */
export const WithLeftIcon: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input
        label="Email"
        placeholder="Enter your email"
        leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
      />
      <Input
        label="Search"
        placeholder="Search..."
        leftIcon={<Search className="w-5 h-5 text-gray-400" />}
      />
      <Input
        label="Username"
        placeholder="Enter username"
        leftIcon={<User className="w-5 h-5 text-gray-400" />}
      />
    </div>
  ),
};

/**
 * Input with right icon
 */
export const WithRightIcon: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input
        label="Search"
        placeholder="Search destinations..."
        rightIcon={<Search className="w-5 h-5 text-gray-400" />}
      />
    </div>
  ),
};

/**
 * Password input with toggle visibility
 */
export const PasswordInput: Story = {
  render: function PasswordInputComponent() {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="Enter your password"
        leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        }
      />
    );
  },
};

/**
 * Input with error message
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Username must be 3-20 characters long',
  },
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    disabled: true,
  },
};

/**
 * Form example with multiple inputs
 */
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-full">
      <Input
        label="Full Name"
        placeholder="John Doe"
        leftIcon={<User className="w-5 h-5 text-gray-400" />}
      />
      <Input
        type="email"
        label="Email"
        placeholder="john@example.com"
        leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
        helperText="We'll never share your email"
      />
      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
      />
      <Input
        label="Search Destination"
        placeholder="Where do you want to go?"
        leftIcon={<Search className="w-5 h-5 text-gray-400" />}
      />
    </form>
  ),
};

/**
 * Different input types
 */
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input type="text" label="Text" placeholder="Text input" />
      <Input type="email" label="Email" placeholder="email@example.com" />
      <Input type="password" label="Password" placeholder="••••••••" />
      <Input type="number" label="Number" placeholder="123" />
      <Input type="tel" label="Phone" placeholder="+1 (555) 000-0000" />
      <Input type="url" label="Website" placeholder="https://example.com" />
      <Input type="date" label="Date" />
    </div>
  ),
};
