import { GameModel } from '../src/gameModel';

describe('게임 도메인 테스트', () => {
  describe('이름 입력', () => {
    it(`1자 이상 ${GameModel.MAX_NAME_LENGTH}자 이하로 입력 가능하다`, () => {
      const gameModel = new GameModel();

      const nameInput = 'A,B,C,D';
      const names = gameModel.parseCarNames(nameInput);
      expect(names).toHaveLength(4);
    });

    it(`${GameModel.MAX_NAME_LENGTH}자 초과한 이름을 입력할 수 없다`, () => {
      const gameModel = new GameModel();

      const nameOver5 = 'A'.repeat(GameModel.MAX_NAME_LENGTH + 1);
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
    describe('자동차 이동', () => {
      it(`${GameModel.MOVE_NUMBERS.CRITERIA} 이상의 숫자가 부여되면 자동차는 전진한다.`, () => {
        const gameModel = new GameModel({
          randomNumberGenerator: () => GameModel.MOVE_NUMBERS.CRITERIA,
        });

        const CAR_NAME = 'Test';
        gameModel.generateCar(CAR_NAME);
        gameModel.playRound();

        const car = gameModel.getCarByName(CAR_NAME);
        expect(car.getPosition()).toBe(1);
      });

      it(`${GameModel.MOVE_NUMBERS.CRITERIA} 미만의 숫자가 부여되면 자동차는 전진하지 않는다.`, () => {
        const gameModel = new GameModel({
          randomNumberGenerator: () => GameModel.MOVE_NUMBERS.CRITERIA - 1,
        });

        const CAR_NAME = 'Test';
        gameModel.generateCar(CAR_NAME);
        gameModel.playRound();

        const car = gameModel.getCarByName(CAR_NAME);
        expect(car.getPosition()).toBe(0);
      });
    });

    describe('우승자 결정', () => {
      let gameModel;
      let moveCar;

      beforeEach(() => {
        gameModel = new GameModel();
        moveCar = (name, count) => {
          gameModel.generateCar(name);
          const car = gameModel.getCarByName(name);
          for (let i = 0; i < count; i++) {
            car.moveForward();
          }
        };
      });

      it(`최다 전진 수를 계산할 수 있다`, () => {
        const POSITION_COUNT1 = 100;
        moveCar('TEST1', POSITION_COUNT1);

        const POSITION_COUNT2 = 50;
        moveCar('TEST2', POSITION_COUNT2);

        expect(gameModel.calculateMaxPosition()).toBe(Math.max(POSITION_COUNT1, POSITION_COUNT2));
      });

      it(`최다 전진 차가 위너로 선정된다.`, () => {
        const CAR_NAME1 = 'TEST1';
        moveCar(CAR_NAME1, 100);
        moveCar('TEST2', 50);

        expect(gameModel.getWinners()[0].getName()).toBe(CAR_NAME1);
      });

      it(`위너는 중복일 수 있다.`, () => {
        const SAME_POSITION = 100;
        moveCar('TEST1', SAME_POSITION);
        moveCar('TEST2', SAME_POSITION);

        expect(gameModel.getWinners()).toHaveLength(2);
      });
    });
  });
});
