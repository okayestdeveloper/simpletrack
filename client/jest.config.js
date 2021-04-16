module.exports = {
  verbose: true,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ["text", "text-summary"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/bin/",
    "/public/",
    "/styles/",
    "/src/index.tsx",
    "/src/lib/testing/",
    ".config.(js|ts)",
    ".types.ts",
    ".test.(js|jsx|ts|tsx)",
    ".spec.(js|jsx|ts|tsx)",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
