const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Code Snippets API",
            version: "1.0.0",
            description: "API documentation for the Code Snippets App"
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Local server"
            },
            {
                url: "https://code-snippet-app-backend-55o5.onrender.com/api",
                description: "Live Server"
            }
        ]
    },
    apis: ["./routes/*.js", "./controllers/*.js"]
};

// Generate Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
