/**
 * Utility function to calculate the current theme setting:
 * 1. Look for a local storage value
 * 2. Fall back to system setting
 * 3. Fall back to dark mode
 */
const calculateSettingAsThemeString = ({ localStorageTheme, systemSettingDark }) => {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return 'dark';
  }

  return 'dark';
};

/**
 * Utility function to update the label's aria-label and checkbox state
 */
const updateCheckboxAndLabel = isDark => {
  const newAriaLabel = isDark ? 'Change to light theme' : 'Change to dark theme';
  document.querySelector('#theme-label').setAttribute('aria-label', newAriaLabel);
  document.querySelector('#theme-label').setAttribute('title', newAriaLabel);
  document.querySelector('#theme-label').classList.toggle('dark', isDark);
  document.querySelector('#theme').checked = isDark;
};

/**
 * Utility function to update the theme setting on the html tag
 */
const updateThemeOnHtmlElement = theme => {
  document.querySelector('html').setAttribute('data-theme', theme);
};

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const checkbox = document.querySelector('#theme');
const localStorageTheme = localStorage.getItem('theme');
const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
 * 3. Update the theme setting and checkbox and label according to current settings
 */
updateCheckboxAndLabel(currentThemeSetting === 'dark');
updateThemeOnHtmlElement(currentThemeSetting);

/**
 * 4. Add an event listener to toggle the theme
 */
checkbox.addEventListener('change', () => {
  const newTheme = currentThemeSetting === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  updateCheckboxAndLabel(newTheme === 'dark');
  updateThemeOnHtmlElement(newTheme);
  currentThemeSetting = newTheme;
});
