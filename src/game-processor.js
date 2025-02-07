import { Car } from './car.js';
import { getRandomNumber } from './utils/getRandomNumber.js';
import { isEmptryOrNil } from './utils/parse.js';

export class GameProcessor {
  static EMPTY_NAME_ERROR = '이름을 제대로 입력하세요';
  static MAX_NAME_LENGTH = 5;
  static MAX_NAME_LENGTH_ERROR = `이름은 ${GameProcessor.MAX_NAME_LENGTH}자 이하로 입력 가능합니다.`;

  static INVALID_COUNT_ERROR = '시도 횟수는 숫자여야 합니다';

  static MOVE_NUMBERS = {
    START: 0,
    END: 9,
    CRITERIA: 4,
  };

  cars = [];
  constructor(view) {
    this.view = view;
  }

  async startGame() {
    const names = await this.readCarNames();

    const count = await this.readTryCount();

    this.playRounds(names, count);
    const winners = this.getWinners();
    this.view.displayWinners(winners);
  }

  async readTryCount() {
    while (true) {
      try {
        const countInput = await this.view.readTryCount();
        const count = this.parseCount(countInput);
        this.view.displayGameCount(count);
        return count;
      } catch (e) {
        this.view.showError(e.message);
      }
    }
  }

  async readCarNames() {
    while (true) {
      try {
        const nameInput = await this.view.readCarNames();
        const names = this.parseCarNames(nameInput);
        this.view.displayCarNames(names);
        return names;
      } catch (e) {
        this.view.showError(e.message);
      }
    }
  }

  parseCount(count) {
    const parsedInt = parseInt(count);
    if (isNaN(parsedInt)) {
      throw new Error(GameProcessor.INVALID_COUNT_ERROR);
    }
    return parsedInt;
  }

  parseCarNames(names) {
    return names.split(',').reduce((acc, name) => {
      const trimmedName = name.trim();

      if (trimmedName.length > GameProcessor.MAX_NAME_LENGTH) {
        throw new Error(GameProcessor.MAX_NAME_LENGTH_ERROR);
      }

      if (trimmedName.length === 0) {
        throw new Error(GameProcessor.EMPTY_NAME_ERROR);
      }

      if (!isEmptryOrNil(trimmedName)) {
        acc.push(trimmedName);
      }

      return acc;
    }, []);
  }

  generateCar(name) {
    return new Car(name);
  }

  getCarByName(name) {
    return this.cars.filter((car) => car.name === name);
  }

  playRounds(names, count) {
    names.forEach((name) => {
      const car = this.generateCar(name);
      this.cars.push(car);
    });

    for (let i = 0; i < count; i++) {
      this.cars.map((car) => {
        const randomNumber = getRandomNumber(
          GameProcessor.MOVE_NUMBERS.START,
          GameProcessor.MOVE_NUMBERS.END,
        );
        if (randomNumber >= GameProcessor.MOVE_NUMBERS.CRITERIA) {
          car.moveForward();
        }
      });
      this.view.displayRoundStatus(this.cars);
    }
  }

  getWinners() {
    const max = this.calculateMaxProgress();
    return this.cars.filter((car) => car.progress === max);
  }

  calculateMaxProgress() {
    return this.cars.reduce((max, car) => {
      return Math.max(max, car.progress);
    }, 0);
  }
}
