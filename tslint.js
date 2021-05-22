const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  extends: ["tslint:latest", "tslint-react"],
  linterOptions: {
    exclude: [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js",
    ],
  },
  overrides: [
    {
      files: ["*.story.tsx", "*.test.tsx", "*.test.tsx.snap"],
      rules: {
        "@calm/react-intl/missing-formatted-message": [
          0,
          {
            noTrailingWhitespace: false,
            ignoreLinks: true,
            enforceLabels: false,
            enforceImageAlts: false,
            enforceInputProps: false,
          },
        ],
        "@calm/react-intl/missing-attribute": [
          0,
          {
            noTrailingWhitespace: false,
            noSpreadOperator: false,
            requireDescription: false,
            formatDefineMessages: false,
          },
        ],
        "@calm/react-intl/missing-values": 0,
      },
    },
  ],
};
