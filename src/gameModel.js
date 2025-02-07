import { Car } from './car.js';
import { getRandomNumber } from './utils/getRandomNumber.js';
import { isEmptryOrNil } from './utils/parse.js';
import { InputValidator } from './InputValidator.js';

export class GameModel {
  static MOVE_NUMBERS = {
    START: 0,
    END: 9,
    CRITERIA: 4,
  };

  #cars = [];

  #inputValidator;

  constructor({
    randomNumberGenerator = getRandomNumber,
    inputValidator = new InputValidator(),
  } = {}) {
    this.randomNumberGenerator = randomNumberGenerator;
    this.#inputValidator = inputValidator;
  }

  parseCount(count) {
    return this.#inputValidator.validateCount(count);
  }

  parseCarNames(names) {
    return names
      .split(',')
      .map((name) => this.#inputValidator.validateName(name))
      .filter((name) => !isEmptryOrNil(name));
  }

  generateCar(name) {
    const car = new Car(name);
    this.#cars.push(car);
  }

  generateCars(names) {
    names.forEach((name) => {
      const car = this.generateCar(name);
    });
  }

  getRoundStatus() {
    return this.#cars.map((car) => ({
      name: car.getName(),
      position: car.getPosition(),
    }));
  }

  getCarByName(name) {
    return this.#cars.find((car) => car.getName() === name);
  }

  playRound() {
    this.#cars.map((car) => {
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
    return this.#cars.filter((car) => car.getPosition() === max);
  }

  calculateMaxPosition() {
    return this.#cars.reduce((max, car) => {
      return Math.max(max, car.getPosition());
    }, 0);
  }
}
