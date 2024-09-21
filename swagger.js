const swaggerJSON = {
    "openapi": "3.0.0",
    "info": {
      "title": "Sample API",
      "description": "Optional multiline or single-line description in CommonMark or HTML.",
      "version": "0.1.9"
    },
    "servers": [
      {
        "url": "http://localhost:8080/api/v1",
        "description": "Optional server description, e.g. Main (production) server"
      },
    ],
    "paths": {
      "/books": {
        "get": {
          "summary": "all books",
          "description": "Return a list of books.",
          "responses": {
            "200": {
              "description": "An array of objects",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "$ref": "#/components/schemas/books",
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      },
      "/books/{id}": {
        "get": {
          "parameter": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "Id of the book.",
              "schema": {
                "type": "integer",
                "format": "int64",
                "minimum": 1
              },
              "style": "simple",
              "explode": false
            }
          ],
          "summary": "find a book by Id.",
          "description": "Return a book.",
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/books"
                  }
                }
              }
            },
            "400": {
              "description": "book not found!"
            }
          },
        }
      }
    },
    "components": {
      "schemas": {
        "books": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "To Kill a Mockingbird"
            },
            "author": {
              "type": "string",
              "example": "$10.99"
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
              "example": "https://example.com/tokillamockingbird.jpg",
            },
          },
        }
      }
    }
  }
  

  export {swaggerJSON}