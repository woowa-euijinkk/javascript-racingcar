export class InputValidator {
  static MAX_NAME_LENGTH = 5;

  static ERROR_MESSAGES = {
    EMPTY_NAME: '이름을 제대로 입력하세요',
    MAX_NAME_LENGTH: `이름은 ${InputValidator.MAX_NAME_LENGTH}자 이하로 입력 가능합니다.`,
    NEGATIVE_NUMBER: '시도 횟수는 1 이상이어야 합니다.',
    INVALID_COUNT: '시도 횟수는 숫자여야 합니다',
  };

  validateName(name) {
    const trimmedName = name.trim();
    if (trimmedName.length > InputValidator.MAX_NAME_LENGTH) {
      throw new Error(InputValidator.ERROR_MESSAGES.MAX_NAME_LENGTH);
    }
    if (trimmedName.length === 0) {
      throw new Error(InputValidator.ERROR_MESSAGES.EMPTY_NAME);
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
