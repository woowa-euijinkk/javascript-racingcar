import { GameModel } from '../src/gameModel';
import { GameInputValidationRules } from '../src/constants/ValidationRules.js';
import { GameRules } from '../src/GameRules.js';

describe('게임 도메인 테스트', () => {
  describe('이름 입력', () => {
    it(`1자 이상 ${GameInputValidationRules.NAME.MAX_LENGTH}자 이하로 입력 가능하다`, () => {
      const gameModel = new GameModel();

      const nameInput = 'A,B,C,D';
      const names = gameModel.parseCarNames(nameInput);
      expect(names).toHaveLength(4);
    });

    it(`${GameInputValidationRules.NAME.MAX_LENGTH}자 초과한 이름을 입력할 수 없다`, () => {
      const gameModel = new GameModel();

      const nameOver5 = 'A'.repeat(GameInputValidationRules.NAME.MAX_LENGTH + 1);
      expect(() => gameModel.parseCarNames(nameOver5)).toThrow();
    });

    it('빈 이름을 입력할 수 없다', () => {
      const gameModel = new GameModel();

      const emptyName = ' ';
      expect(() => gameModel.parseCarNames(emptyName)).toThrow();
    });
  });

  describe('시도 횟수 입력', () => {
    it('1 이상의 숫자를 입력할 수 있다.', () => {
      const gameModel = new GameModel();

      const countInput = 5;
      const count = gameModel.parseCount(countInput);
      expect(count).toBe(countInput);
    });

    it('1 미만의 숫자를 입력할 수 없다.', () => {
      const gameModel = new GameModel();

      const countInput = -5;
      expect(() => gameModel.parseCount(countInput)).toThrow();
    });

    it('숫자가 아닌 자료형을 입력할 수 없다.', () => {
      const gameModel = new GameModel();

      const stringInput = 'A';
      expect(() => gameModel.parseCount(stringInput)).toThrow();

      const specialInput = '*';
      expect(() => gameModel.parseCount(specialInput)).toThrow();
    });
  });

  describe('게임 진행', () => {
    it('자동차들을 생성하고 이동시킬 수 있다', () => {
      const gameModel = new GameModel({
        randomNumberGenerator: () => GameRules.MOVE_CRITERIA,
      });
      const names = ['car1', 'car2'];

      gameModel.generateCars(names);
      gameModel.playRound();

      const status = gameModel.getRoundStatus();
      expect(status).toHaveLength(2);
      expect(status[0].position).toBe(1);
      expect(status[1].position).toBe(1);
    });
  });
});
