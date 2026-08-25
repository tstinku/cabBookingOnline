const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Uber Clone Backend API",
    version: "1.0.0",
    description: "API documentation for the Uber Clone backend"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                  role: { type: "string", enum: ["RIDER","DRIVER","ADMIN"] },
                  name: { type: "string" },
                  phone: { type: "string" },
                  licenseNumber: { type: "string" },
                  profileImage: { type: "string" }
                },
                required: ["email","password"]
              }
            }
          }
        },
        responses: {
          "201": { description: "User registered" },
          "400": { description: "Validation error" },
          "409": { description: "Email already exists" }
        }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" }
                },
                required: ["email","password"]
              }
            }
          }
        },
        responses: {
          "200": { description: "Login successful" },
          "400": { description: "Validation error" },
          "401": { description: "Invalid credentials" }
        }
      }
    },
    "/api/drivers/online": {
      put: {
        tags: ["Drivers"],
        summary: "Set driver online",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Driver set online" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/drivers/offline": {
      put: {
        tags: ["Drivers"],
        summary: "Set driver offline",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Driver set offline" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/drivers/location": {
      put: {
        tags: ["Drivers"],
        summary: "Update driver location",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  latitude: { type: "number" },
                  longitude: { type: "number" }
                },
                required: ["latitude","longitude"]
              }
            }
          }
        },
        responses: { "200": { description: "Location updated" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/vehicles": {
      post: {
        tags: ["Vehicles"],
        summary: "Register vehicle",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  registrationNumber: { type: "string" },
                  vehicleType: { type: "string", enum: ["BIKE","AUTO","SEDAN","SUV","PREMIUM"] },
                  company: { type: "string" },
                  model: { type: "string" },
                  color: { type: "string" },
                  manufactureYear: { type: "integer" },
                  seatingCapacity: { type: "integer" }
                },
                required: ["registrationNumber","vehicleType","company","model","color","manufactureYear","seatingCapacity"]
              }
            }
          }
        },
        responses: { "201": { description: "Vehicle registered" }, "400": { description: "Validation error" } }
      },
      get: {
        tags: ["Vehicles"],
        summary: "Get vehicle",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Vehicle fetched" }, "401": { description: "Unauthorized" } }
      },
      put: {
        tags: ["Vehicles"],
        summary: "Update vehicle",
        security: [{ bearerAuth: [] }],
        requestBody: { "$ref": "#/paths/~1api~1vehicles/post/requestBody" },
        responses: { "200": { description: "Vehicle updated" }, "400": { description: "Validation error" } }
      }
    },
    "/api/driver-documents/driving-license": {
      post: {
        tags: ["Driver Documents"],
        summary: "Upload driving license",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  number: { type: "string" },
                  expiryDate: { type: "string", format: "date" },
                  drivingLicense: { type: "string", format: "binary" }
                },
                required: ["number", "expiryDate", "drivingLicense"]
              }
            }
          }
        },
        responses: {
          "201": { description: "Driving license uploaded" },
          "400": { description: "Validation error / Bad request" },
          "401": { description: "Unauthorized" }
        }
      }
    },
    "/api/driver-documents/insurance": {
      post: {
        tags: ["Driver Documents"],
        summary: "Upload insurance",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  number: { type: "string" },
                  expiryDate: { type: "string", format: "date" },
                  insurance: { type: "string", format: "binary" }
                },
                required: ["number","expiryDate","insurance"]
              }
            }
          }
        },
        responses: { "201": { description: "Insurance uploaded" }, "400": { description: "Validation error" } }
      }
    },
    "/api/driver-documents/registration-certificate": {
      post: {
        tags: ["Driver Documents"],
        summary: "Upload registration certificate",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  number: { type: "string" },
                  expiryDate: { type: "string", format: "date" },
                  registrationCertificate: { type: "string", format: "binary" }
                },
                required: ["number","registrationCertificate"]
              }
            }
          }
        },
        responses: { "201": { description: "Registration certificate uploaded" }, "400": { description: "Validation error" } }
      }
    },
    "/api/driver-documents/pollution-certificate": {
      post: {
        tags: ["Driver Documents"],
        summary: "Upload pollution certificate",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  number: { type: "string" },
                  expiryDate: { type: "string", format: "date" },
                  pollutionCertificate: { type: "string", format: "binary" }
                },
                required: ["number","expiryDate","pollutionCertificate"]
              }
            }
          }
        },
        responses: { "201": { description: "Pollution certificate uploaded" }, "400": { description: "Validation error" } }
      }
    },
    "/api/driver-documents/identity-proof": {
      post: {
        tags: ["Driver Documents"],
        summary: "Upload identity proof",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["AADHAAR","PAN","PASSPORT"] },
                  number: { type: "string" },
                  identityProof: { type: "string", format: "binary" }
                },
                required: ["type","number","identityProof"]
              }
            }
          }
        },
        responses: { "201": { description: "Identity proof uploaded" }, "400": { description: "Validation error" } }
      }
    },
    "/api/driver-documents": {
      get: {
        tags: ["Driver Documents"],
        summary: "Get driver documents",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Documents fetched" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/admin/driver-documents/pending": {
      get: {
        tags: ["Admin"],
        summary: "Get pending documents",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Pending documents" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/admin/driver-documents/{driverId}": {
      get: {
        tags: ["Admin"],
        summary: "Get documents for a driver",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "driverId", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Driver documents" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/admin/driver-documents/{driverId}/{documentType}/approve": {
      put: {
        tags: ["Admin"],
        summary: "Approve a document",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "driverId", in: "path", required: true, schema: { type: "string" } },
          { name: "documentType", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: { "200": { description: "Document approved" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/admin/driver-documents/{driverId}/{documentType}/reject": {
      put: {
        tags: ["Admin"],
        summary: "Reject a document",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "driverId", in: "path", required: true, schema: { type: "string" } },
          { name: "documentType", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: { type: "object", properties: { rejectionReason: { type: "string" } } }
            }
          }
        },
        responses: { "200": { description: "Document rejected" }, "401": { description: "Unauthorized" } }
      }
    },
    "/api/driver-documents/profile-photo": {
      post: {
        tags: ["Driver Documents"],
        summary: "Upload profile photo",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  profilePhoto: { type: "string", format: "binary" }
                },
                required: ["profilePhoto"]
              }
            }
          }
        },
        responses: {
          "201": { description: "Profile photo uploaded" },
          "400": { description: "Validation error / Bad request" }
        }
      }
    }
  }
};

export default swaggerSpec;
