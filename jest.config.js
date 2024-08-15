module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/", // Ensure axios and other modules are transformed
    ],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};