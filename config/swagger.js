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
                url: "http://localhost:3000",
                description: "Local server"
            },
            {
                url: "https://code-snippet-app-backend-55o5.onrender.com",
                description: "Live Server"
            }
        ]
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description:
                    "Enter your JWT token in the format: `Bearer <token>`"
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ],
    apis: ["./routes/*.js", "./controllers/*.js"]
};

// Generate Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
