import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export const useLoginFormStyles = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const inputStyles = useMemo(
    () => ({
      label: isDark ? 'text-primary-400' : 'text-gray-700',
      input: `
        border-primary-400 
        border-2 
        rounded-xl 
        transition-all
        focus:ring-primary-400/40 
        focus:ring-4 
        focus:ring-offset-2 
        focus:border-primary-300 
        focus:outline-none
        ${isDark ? 'bg-transparent text-white placeholder-gray-400 focus:ring-offset-gray-900' : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-offset-gray-100'}
      `.replace(/\s+/g, ' ').trim(),
    }),
    [isDark]
  );

  const buttonStyles = useMemo(
    () => `
      mt-6 
      w-full 
      rounded-xl 
      bg-primary-500 
      hover:bg-primary-600 
      py-3 
      text-sm 
      font-semibold 
      uppercase 
      tracking-widest 
      focus:outline-none 
      focus:ring-4 
      focus:ring-primary-400/40 
      focus:ring-offset-2 
      focus:scale-[1.02] 
      transition-all
      ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-gray-100'}
    `.replace(/\s+/g, ' ').trim(),
    [isDark]
  );

  const getInputClassName = (field: 'label' | 'input') => {
    if (field === 'label') {
      return `[&_label]:${inputStyles.label} [&_label]:font-semibold`;
    }
    return `[&_input]:${inputStyles.input}`;
  };

  return {
    inputClassName: `${getInputClassName('label')} ${getInputClassName('input')}`,
    buttonClassName: buttonStyles,
    isDark,
  };
};
