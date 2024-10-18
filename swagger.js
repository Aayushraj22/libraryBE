const swaggerJSON = {
    "openapi": "3.0.0",
    "info": {
      "title": "Sample API",
      "description": "Optional multiline or single-line description in CommonMark or HTML.",
      "version": "0.1.9"
    },
    "servers": [],
    "tags": [
      {
        "name": "book",
        "description": "Everything about your book",
        // "externalDocs": {
        //   "description": "Find out more",
        //   "url": "http://swagger.io"
        // }
      },
      {
        "name": "user",
        "description": "Operations about user"
      },
    ],
    "paths": {
      "/api/v1/books": {
        "get": {
          "tags": ["book"],
          "summary": "List of all Books",
          "description": "Return a list of books.",
          "responses": {
            "200": {
              "description": "An array of objects",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/book",
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          }
        },
        "post": {
          "tags": ["book"],
          "summary": "Add a New Book",
          "description": "Add a New Book in Library",
          "requestBody": {
            "required": true,
            "description": "Create a New Book for Library",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/bookTemplate"
                }
              }
            },
          },
          "responses": {
            "201": {
              "description": "Book Created Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/book"
                  }
                }
              }
            },
            "400": {
              "description": "Not added!"
            }
          },
        }
      },
      "/api/v1/books/{id}": {
        "get": {
          "tags": ["book"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "Id of the book.",
              "schema": {
                "type": "string",
                "enum": [
                  "Wloz", 
                  "rtmR"
                ]
              },
              "style": "simple",
              "explode": false
            }
          ],
          "summary": "Find a Book by Id.",
          "description": "Return a book.",
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/book"
                  }
                }
              }
            },
            "400": {
              "description": "book not found!"
            }
          },
        },
        "put": {
          "tags": ["book"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "Id of the book.",
              "schema": {
                "type": "string",
                "enum": [
                  "Wloz", 
                  "rtmR"
                ]
              },
              "style": "simple",
              "explode": false
            }
          ],
          "summary": "Update a Book by Id.",
          "description": "Return a Updated book.",
          "requestBody": {
            "required": true,
            "description": "Modify the Book fields ( name, author, price, publishedAt, description, imgurl ) value",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "New Book Name"
                    }

                  }
                }
              }
            },
          },
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/book"
                  }
                }
              }
            },
            "400": {
              "description": "book not found!"
            }
          },
        },
        "delete": {
          "tags": ["book"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "Id of the book that needs to be deleted.",
              "schema": {
                "type": "string",
              },
              "style": "simple",
              "explode": false
            }
          ],
          "summary": "Delete a Book by id",
          "description": "",
          "responses": {
            "400": {
              "description": "book not found!"
            }
          },
        }, 
      },
      "/api/v1/users/register": {
        "post": {
          "tags": [
            "user"
          ],
          "summary": "Create user",
          "description": "This can only be done by the logged in user.",
          "operationId": "createUser",
          "requestBody": {
            "description": "Created user object",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "user created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "500": {
              "description": "Datebase error"
            }
          }
        }
      },
      "/api/v1/users/login": {
        "post": {
          "tags": ["user"],
          "summary": "LogIn user into the system",
          "description": "",
          "operationId": "loginUser",
          "requestBody": {
            "description": "Logged In user object",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/loginUser"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/loginUser"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/loginUser"
                }
              }
            }
          },
          "responses": {
            "500": {
              "description": "database error",
            },
            "400": {
              "description": "Invalid Credentials / please provide Email address / please provide Password / please provide your name"
            }
          }
        }
      },
      "/api/v1/users/logout": {
      "get": {
        "tags": ["user"],
        "summary": "Logout current loggedIn user session",
        "operationId": "logoutUser",
        "responses": {
          "200": {
            "description": "logout successfully"
          }
        }
      }
      },
      "/api/v1/users/:id": {
      "get": {
        "tags": ["user"],
        "summary": "Get user by id",
        "description": "",
        "operationId": "getUserByName",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The id of user that needs to be fetched.",
            "required": true,
            "schema": {
              "type": "string",
              "enum": [
                "TRnxe",
              ]
            },
            
          }
        ],
        "responses": {
          "200": {
            "description": "success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "401": {
            "description": "UnAuthorised Access",
          },
          "404": {
            "description": "User not found",
          }
        }
      }
    } 
    },
    "components": {
      "schemas": {
        "book": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "rtmR",
            },
            "name": {
              "type": "string",
              "example": "pride and prejudice"
            },
            "author": {
              "type": "string",
              "example": "jane austen"
            },
            "price": {
              "type": "integer",
              "format": "int64",
              "example": 12.99
            },
            "publishedAt": {
              "type": "integer",
              "format": "int64",
              "example": 1813
            },
            "description": {
              "type": "string",
              "example": "A romantic novel that charts the emotional development of the protagonist, Elizabeth Bennet."
            },
            "imgurl": {
              "type": "string",
              "example": "https://th.bing.com/th/id/OIP.wcZjPkH4FZD5QYi_2kfxxAHaLS?w=187&h=285&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            },
          },
        },
        "books" : {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/book",
            
          }
        },
        "bookTemplate": {
          "type": "object",
          "required": ["name","author", "price", "publisheAt", "description", "imgurl"],
          "properties": {
            "name": {
              "type": "string",
              "example": "To Kill a Mockingbird"
            },
            "author": {
              "type": "string",
              "example": "Harper Lee"
            },
            "price": {
              "type": "integer",
              "format": "int64",
              "example": 10.99
            },
            "publishedAt": {
              "type": "integer",
              "format": "int64",
              "example": 1960
            },
            "description": {
              "type": "string",
              "example": "A novel about the serious issues of rape and racial inequality."
            },
            "imgurl": {
              "type": "string",
              "example": "https://th.bing.com/th/id/OIP.jvYLjJvwkKBnI2svjjyKigHaLI?w=187&h=282&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            },
          },
        },
        "User": {
          "type": "object",
          "properties": {
            // "username": {
            //   "type": "string",
            //   "example": "janeDoe"
            // },
            "name": {
              "type": "string",
              "example": "Jane Doe"
            },
            "email": {
              "type": "string",
              "example": "janedoe@email.com"
            },
            "password": {
              "type": "string",
              "example": "janedoe"
            },
            // "phone": {
            //   "type": "string",
            //   "example": "1234567890"
            // },
          },
          "xml": {
            "name": "user"
          }
        },
        "loginUser": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "janedoe@email.com"
            },
            "password": {
              "type": "string",
              "example": "janedoe"
            },
          },
          "xml": {
            "name": "user"
          }
        }
        
        
      }
    }
  }
  

  export {swaggerJSON}