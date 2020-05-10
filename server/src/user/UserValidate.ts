import * as Ajv from 'ajv';

class UserValidate {
  private validateUpdate: any;
  private validateInsert: any;
  private validateDelete: any;
  private validateReset: any;

  constructor() {
    const ajv = new Ajv({allErrors: true});
    const update = {
      type: 'object',
      required: [
        'UserId',
        'UserEmail',
        'UserName',
        'role',
      ],
      properties: {
        UserId: {
          type: 'integer',
        },
        UserEmail: {
          type: 'string',
        },
        UserName: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
      },
    };
    this.validateUpdate = ajv.compile(update);

    const insert = {
      type: 'object',
      required: [
        'UserEmail',
        'UserName',
        'role',
        'Password',
      ],
      properties: {
        UserEmail: {
          type: 'string',
          format: 'email',
        },
        UserName: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
        Password: {
          type: 'string',
        },
      },
    };
    this.validateInsert = ajv.compile(insert);

    const deleteValidation = {
      type: 'object',
      required: [
        'UserId',
      ],
      properties: {
        UserId: {
          type: 'integer',
        },
      },
    };
    this.validateDelete = ajv.compile(deleteValidation);

    const reset = {
      type: 'object',
      required: [
        'password',
      ],
      properties: {
        password: {
          type: 'string',
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
