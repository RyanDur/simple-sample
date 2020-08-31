module.exports = {
  preset: 'ts-jest',
  notify: true,
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.tsx?$',
  transformIgnorePatterns: ['node_modules'],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"]
};
