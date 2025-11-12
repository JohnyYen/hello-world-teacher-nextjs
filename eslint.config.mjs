import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👇 Aquí desactivas todas las reglas
  {
    rules: {
      "no-restricted-syntax": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": "off",
      "no-debugger": "off",
      "no-empty": "off",
      "no-extra-semi": "off",
      "no-unreachable": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "jsx-a11y/*": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
  },
];

export default []

// export default eslintConfig;
