/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../index';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('should render solid variant by default', () => {
      const { container } = render(<Button>Solid</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-primary-500');
    });

    it('should render outline variant', () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('border-2');
    });

    it('should render ghost variant', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('should render medium size by default', () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('should render small size', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('should render large size', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });

    it('should render extra large size', () => {
      const { container } = render(<Button size="xl">Extra Large</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('px-8', 'py-4', 'text-xl');
    });
  });

  describe('Color Schemes', () => {
    it('should render primary color by default', () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-primary-500');
    });

    it('should render danger color', () => {
      const { container } = render(<Button colorScheme="danger">Danger</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-danger-500');
    });

    it('should render success color', () => {
      const { container } = render(<Button colorScheme="success">Success</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-success-500');
    });

    it('should render secondary color', () => {
      const { container } = render(<Button colorScheme="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-secondary-500');
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should have disabled styles when disabled', () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should handle multiple clicks', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('should have correct role', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support aria-label', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByLabelText(/custom label/i)).toBeInTheDocument();
    });

    it('should be keyboard accessible with Enter key', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalled();
    });

    it('should be keyboard accessible with Space key', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalled();
    });

    it('should support custom attributes', () => {
      render(<Button data-testid="custom-button">Custom</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });

  describe('Style Combinations', () => {
    it('should combine variant and colorScheme correctly', () => {
      const { container } = render(
        <Button variant="outline" colorScheme="danger">
          Outline Danger
        </Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('border-2', 'border-danger-500');
    });

    it('should combine size and colorScheme correctly', () => {
      const { container } = render(
        <Button size="lg" colorScheme="success">
          Large Success
        </Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg', 'bg-success-500');
    });
  });
});
