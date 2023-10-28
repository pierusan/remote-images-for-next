module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",

    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",

    // Trying things out here. Rule-set looks interesting
    // https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main
    "plugin:unicorn/recommended",

    // Turns off all rules that are unnecessary or might conflict with Prettier
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["import", "react", "react-refresh", "jsx-a11y", "react-hooks"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // Still maybe a good practice for old browsers?
    "react/jsx-no-target-blank": "error",
    "import/order": ["error"],
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true, // Regular TS
          pascalCase: true, // Components
        },
        ignore: [
          "\.d\.ts$",
        ]
      },
    ],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "unicorn/no-null": "off",
    "unicorn/no-array-for-each": "off",
    // Allow some abbreviations to accelerate reading time
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          fn: {
            function: false,
          },
          props: {
            properties: false,
          },
          ref: {
            reference: false,
          },
          env: {
            environment: false,
          },
        },
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["*.css", "!*.module.css"],
            message:
              "Prefer CSS modules or styled-components to raw .css stylesheet imports",
          },
        ],
      },
    ],
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
