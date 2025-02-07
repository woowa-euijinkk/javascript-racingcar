import { GameRules } from '../src/GameRules.js';

describe('GameRules', () => {
  describe('자동차 이동 규칙', () => {
    it(`기준값(${GameRules.MOVE_CRITERIA}) 이상이면 이동한다`, () => {
      const mockRandomNumber = jest.fn().mockReturnValue(GameRules.MOVE_CRITERIA);
      const gameRules = new GameRules(mockRandomNumber);

      expect(gameRules.shouldMove()).toBe(true);
      expect(mockRandomNumber).toHaveBeenCalledWith(
        GameRules.MOVE_NUMBERS.START,
        GameRules.MOVE_NUMBERS.END,
      );
    });

    it(`기준값(${GameRules.MOVE_CRITERIA}) 미만이면 이동하지 않는다`, () => {
      const mockRandomNumber = jest.fn().mockReturnValue(GameRules.MOVE_CRITERIA - 1);
      const gameRules = new GameRules(mockRandomNumber);

      expect(gameRules.shouldMove()).toBe(false);
      expect(mockRandomNumber).toHaveBeenCalledWith(
        GameRules.MOVE_NUMBERS.START,
        GameRules.MOVE_NUMBERS.END,
      );
    });
  });
});
