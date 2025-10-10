import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API - Node.js - Express - TypeScript - Sequelize",
      version: "1.0.0",
      description: "A simple CRUD API application made with Express and documented with Swagger"},
  },
  apis: ["./src/router.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
