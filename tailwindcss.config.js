module.exports = {
  content: [
    './resources/**/*.blade.php',
    // './resources/**/*.js',
    './resources/**/*.tsx',
  ],
  safelist: [
    // 'modern-blue',
    // 'minimal-light',
    // 'earth-tone',
    // 'dark-contrast',
    // 'sunset',

    {
      pattern: /^page-/,
    },
  ],
};
