module.exports = {
  verbose: true,
  moduleDirectories: ['node_modules', 'src'],
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
    "src/mirage",
    ".config.(js|ts)",
    ".types.ts",
    ".test.(js|jsx|ts|tsx)",
    ".spec.(js|jsx|ts|tsx)",
    ".d.ts"
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
