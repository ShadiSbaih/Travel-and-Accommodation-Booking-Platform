import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

/**
 * A versatile button component with multiple variants, sizes, and color schemes.
 * Supports both light and dark modes with Tailwind CSS styling.
 */
const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable button component built with class-variance-authority and Tailwind CSS. Supports multiple variants (solid, outline, ghost), sizes (sm, md, lg, xl), and color schemes (primary, secondary, danger, success, warning, info, light, dark).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'The visual style variant of the button',
      table: {
        type: { summary: 'solid | outline | ghost' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
      },
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'light', 'dark'],
      description: 'The color scheme of the button',
      table: {
        type: { summary: 'primary | secondary | danger | success | warning | info | light | dark' },
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with primary color scheme and medium size
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    colorScheme: 'primary',
  },
};

/**
 * Primary button in all available sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

/**
 * Button variants: solid, outline, and ghost
 */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Button variant="solid" colorScheme="primary">Solid</Button>
      <Button variant="outline" colorScheme="primary">Outline</Button>
      <Button variant="ghost" colorScheme="primary">Ghost</Button>
    </div>
  ),
  parameters: {
    backgrounds: { disable: true },
  },
};

/**
 * All available color schemes with solid variant
 */
export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center flex-wrap">
        <Button colorScheme="primary">Primary</Button>
        <Button colorScheme="secondary">Secondary</Button>
        <Button colorScheme="danger">Danger</Button>
        <Button colorScheme="success">Success</Button>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        <Button colorScheme="warning">Warning</Button>
        <Button colorScheme="info">Info</Button>
        <Button colorScheme="light">Light</Button>
        <Button colorScheme="dark">Dark</Button>
      </div>
    </div>
  ),
};

/**
 * Outline variant with all color schemes
 */
export const OutlineColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <div className="flex gap-4 items-center flex-wrap">
        <Button variant="outline" colorScheme="primary">Primary</Button>
        <Button variant="outline" colorScheme="secondary">Secondary</Button>
        <Button variant="outline" colorScheme="danger">Danger</Button>
        <Button variant="outline" colorScheme="success">Success</Button>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        <Button variant="outline" colorScheme="warning">Warning</Button>
        <Button variant="outline" colorScheme="info">Info</Button>
        <Button variant="outline" colorScheme="light">Light</Button>
        <Button variant="outline" colorScheme="dark">Dark</Button>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { disable: true },
  },
};

/**
 * Ghost variant with all color schemes
 */
export const GhostColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center flex-wrap">
        <Button variant="ghost" colorScheme="primary">Primary</Button>
        <Button variant="ghost" colorScheme="secondary">Secondary</Button>
        <Button variant="ghost" colorScheme="danger">Danger</Button>
        <Button variant="ghost" colorScheme="success">Success</Button>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        <Button variant="ghost" colorScheme="warning">Warning</Button>
        <Button variant="ghost" colorScheme="info">Info</Button>
        <Button variant="ghost" colorScheme="light">Light</Button>
        <Button variant="ghost" colorScheme="dark">Dark</Button>
      </div>
    </div>
  ),
};

/**
 * Disabled state for all variants
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button disabled variant="solid">Solid Disabled</Button>
      <Button disabled variant="outline">Outline Disabled</Button>
      <Button disabled variant="ghost">Ghost Disabled</Button>
    </div>
  ),
};

/**
 * Button with custom onClick handler
 */
export const WithClickHandler: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Button clicked!'),
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <Button className="w-full">Full Width Button</Button>
    </div>
  ),
};
