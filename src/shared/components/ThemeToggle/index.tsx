import  useTheme  from "@/core/context/Theme/useTheme";

export const ThemeToggle = () => {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') {
      // If on system, switch to opposite of current system preference
      setTheme(isDark ? 'light' : 'dark');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
      title={`Current theme: ${theme}${theme === 'system' ? ` (${isDark ? 'dark' : 'light'})` : ''}`}
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;