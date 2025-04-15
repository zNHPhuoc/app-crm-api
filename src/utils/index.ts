import { ERROR_CODE } from '../common/error-code';

/**
 * Maps error codes to a Swagger schema.
 *
 * @returns {object} The Swagger schema for error codes.
 */
export const mapErrorCodesToSwaggerSchema = (): object => {
  const errorSchema = {
    type: 'object',
    properties: {},
  };

  for (const key in ERROR_CODE) {
    if (ERROR_CODE.hasOwnProperty(key)) {
      errorSchema.properties[key] = {
        type: ERROR_CODE[key],
      };
    }
  }
  return errorSchema;
};
