import { cn } from '../cn';

describe('cn utility', () => {
  it('should merge class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    const isHidden = false;
    expect(cn('base', isHidden && 'hidden', 'visible')).toBe('base visible');
  });

  it('should merge Tailwind classes correctly', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });

  it('should handle undefined and null', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });
});
