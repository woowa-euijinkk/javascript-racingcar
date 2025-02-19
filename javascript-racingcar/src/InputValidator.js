import { GameInputValidationRules } from './constants/ValidationRules.js';

export class InputValidator {

  validateName(name) {
    const trimmedName = name.trim();
    if (trimmedName.length > GameInputValidationRules.NAME.MAX_LENGTH) {
      throw new Error(GameInputValidationRules.NAME.ERROR_MESSAGES.MAX_LENGTH);
    }
    if (trimmedName.length === 0) {
      throw new Error(GameInputValidationRules.NAME.ERROR_MESSAGES.EMPTY);
    }
    return trimmedName;
  }

  validateCount(count) {
    const parsedCount = parseInt(count);
    if (isNaN(parsedCount)) {
      throw new Error(InputValidator.ERROR_MESSAGES.INVALID_COUNT);
    }
    if (parsedCount < 1) {
      throw new Error(InputValidator.ERROR_MESSAGES.NEGATIVE_NUMBER);
    }
    return parsedCount;
  }
}
