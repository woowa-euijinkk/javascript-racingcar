export const GameInputValidationRules = {
  NAME: {
    MAX_LENGTH: 5,
    ERROR_MESSAGES: {
      MAX_LENGTH: `이름은 5자 이하로 입력 가능합니다.`,
      EMPTY: '이름을 제대로 입력하세요',
    },
  },
  COUNT: {
    ERROR_MESSAGES: {
      NEGATIVE_NUMBER: '시도 횟수는 1 이상이어야 합니다.',
      INVALID_COUNT: '시도 횟수는 숫자여야 합니다',
    },
  },
};
