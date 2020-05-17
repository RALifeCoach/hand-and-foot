import * as Ajv from "ajv";

class UserValidate {
  private validateUpdate: any;
  private validateInsert: any;
  private validateDelete: any;
  private validateReset: any;

  constructor() {
    const ajv = new Ajv({ allErrors: true });
    const update = {
      type: "object",
      required: ["userId", "userEmail", "userName", "role"],
      properties: {
        userId: {
          type: "integer",
        },
        userEmail: {
          type: "string",
        },
        userName: {
          type: "string",
        },
        role: {
          type: "string",
        },
      },
    };
    this.validateUpdate = ajv.compile(update);

    const insert = {
      type: "object",
      required: ["userEmail", "userName", "role", "password"],
      properties: {
        userEmail: {
          type: "string",
          format: "email",
        },
        userName: {
          type: "string",
        },
        role: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    };
    this.validateInsert = ajv.compile(insert);

    const deleteValidation = {
      type: "object",
      required: ["userId"],
      properties: {
        userId: {
          type: "integer",
        },
      },
    };
    this.validateDelete = ajv.compile(deleteValidation);

    const reset = {
      type: "object",
      required: ["password"],
      properties: {
        password: {
          type: "string",
        },
      },
    };
    this.validateReset = ajv.compile(reset);
  }

  isValidUpdate(user: any) {
    const isValid = this.validateUpdate(user);
    if (!isValid) {
      console.error(this.validateUpdate.errors);
    }
    return isValid;
  }

  isValidInsert(user: any) {
    const isValid = this.validateInsert(user);
    if (!isValid) {
      console.error(this.validateInsert.errors);
    }
    return isValid;
  }

  isValidDelete(user: any) {
    const isValid = this.validateDelete(user);
    if (!isValid) {
      console.error(this.validateDelete.errors);
    }
    return isValid;
  }

  isValidReset(user: any) {
    const isValid = this.validateReset(user);
    if (!isValid) {
      console.error(this.validateReset.errors);
    }
    return isValid;
  }
}

export default new UserValidate();
