const appJson = require('./app.json');

const isCodegen = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const arg of process.argv) {
    if (arg === 'client:codegen') {
      return true;
    }
  }

  return false;
};

module.exports = {
  client: {
    service: {
      name: 'kawlo-main-api',
      ...(isCodegen()
        ? {
            localSchemaFile: './schema-wp.graphql',
          }
        : {
            url: `${appJson.scheme.development.API_PAPERS_URL}/graphql`,
            // optional headers
            headers: {
              'user-agent': 'Apollo CLI',
            },
            // optional disable SSL validation check
            skipSSLValidation: true,
          }),
    },
    includes: ['./src/**/graphql/*-wp.ts'],
  },
};
