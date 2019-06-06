module.exports = {
  roots: ["<rootDir>/test"],
  testMatch: ["**\\test\\**\\*\\.test\\.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      diagnostics: true
    }
  }
};
