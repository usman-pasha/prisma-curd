export const config = {
  port: 4000 || process.env.PORT,
  jwt: {
    accessValidity: "1d",
    accessSecretKey: "cefb3ffcf0222097273967c161a2a3b3818d6e7852b879b09bca4d0a864cc5d27d013c2fce8f87c23f18faf156556c0cd56ea654631f44ba84af26f0592c9f74",
    refreshValidity: "7d",
    refreshSecretKey: "f6a68b3d99cabb395ef9947058f43b280c606b0dc7bb2233bfedd0d41862e9c4dfbb0d12e3b65fc5bb87704e702cc07b2303e96952f87213bb65a747ffe2a94a",
  },
};
