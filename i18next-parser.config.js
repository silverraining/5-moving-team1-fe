module.exports = {
  locales: ["ko", "en", "zh"],
  defaultNamespace: "common",
  namespaceSeparator: false,
  keySeparator: false,
  input: ["src/**/*.{ts,tsx}"],
  output: "public/locales/$LOCALE/$NAMESPACE.json",
  useKeysAsDefaultValue: true,
  createOldCatalogs: false,
};
