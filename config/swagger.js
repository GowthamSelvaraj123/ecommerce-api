const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Auto Swagger API',
    description: 'This API doc was auto-generated',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './docs/swagger.json'; // ← Auto-generated here
const endpointsFiles = ['./app.js']; // ← Main file where app & routes are defined

swaggerAutogen(outputFile, endpointsFiles, doc);
