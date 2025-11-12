import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Heredas las configuraciones base de Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Aquí puedes añadir tus overrides o reglas personalizadas
  {
    rules: {
      "react/no-unescaped-entities": "off", // 👈 Desactiva la regla problemática
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
