import { Car } from './car.js';
import { getRandomNumber } from './utils/getRandomNumber.js';
import { isEmptryOrNil } from './utils/parse.js';

export class GameModel {
  static EMPTY_NAME_ERROR = '이름을 제대로 입력하세요';
  static MAX_NAME_LENGTH = 5;
  static MAX_NAME_LENGTH_ERROR = `이름은 ${GameModel.MAX_NAME_LENGTH}자 이하로 입력 가능합니다.`;
  static NEGATIVE_NUMBER_ERROR = `시도 횟수는 1 이상이어야 합니다.`;
  static INVALID_COUNT_ERROR = '시도 횟수는 숫자여야 합니다';

  static MOVE_NUMBERS = {
    START: 0,
    END: 9,
    CRITERIA: 4,
  };

  cars = [];

  constructor({ randomNumberGenerator = getRandomNumber } = {}) {
    this.randomNumberGenerator = randomNumberGenerator;
  }

  parseCount(count) {
    const parsedInt = parseInt(count);
    if (parsedInt < 1) {
      throw new Error(GameModel.NEGATIVE_NUMBER_ERROR);
    }
    if (isNaN(parsedInt)) {
      throw new Error(GameModel.INVALID_COUNT_ERROR);
    }
    return parsedInt;
  }

  parseCarNames(names) {
    return names.split(',').reduce((acc, name) => {
      const trimmedName = name.trim();

      if (trimmedName.length > GameModel.MAX_NAME_LENGTH) {
        throw new Error(GameModel.MAX_NAME_LENGTH_ERROR);
      }

      if (trimmedName.length === 0) {
        throw new Error(GameModel.EMPTY_NAME_ERROR);
      }

      if (!isEmptryOrNil(trimmedName)) {
        acc.push(trimmedName);
      }

      return acc;
    }, []);
  }

  generateCar(name) {
    const car = new Car(name);
    this.cars.push(car);
  }

  generateCars(names) {
    names.forEach((name) => {
      const car = this.generateCar(name);
    });
  }

  getCars() {
    return this.cars;
  }

  getCarByName(name) {
    return this.cars.find((car) => car.getName() === name);
  }

  playRound() {
    this.cars.map((car) => {
      const randomNumber = this.randomNumberGenerator(
        GameModel.MOVE_NUMBERS.START,
        GameModel.MOVE_NUMBERS.END,
      );
      if (randomNumber >= GameModel.MOVE_NUMBERS.CRITERIA) {
        car.moveForward();
      }
    });
  }

  getWinners() {
    const max = this.calculateMaxPosition();
    return this.cars.filter((car) => car.position === max);
  }

  calculateMaxPosition() {
    return this.cars.reduce((max, car) => {
      return Math.max(max, car.position);
    }, 0);
  }
}
