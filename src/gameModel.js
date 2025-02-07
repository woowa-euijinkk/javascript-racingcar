import { Car } from './car.js';
import { getRandomNumber } from './utils/getRandomNumber.js';
import { isEmptryOrNil } from './utils/parse.js';
import { InputValidator } from './InputValidator.js';
import { GameRules } from './GameRules.js';

export class GameModel {

  #cars = [];
  #inputValidator;
  #gameRules;

  constructor({
    randomNumberGenerator = getRandomNumber,
    inputValidator = new InputValidator(),
  } = {}) {
    this.#gameRules = new GameRules(randomNumberGenerator);
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
    this.#cars.forEach((car) => {
      if (this.#gameRules.shouldMove()) {
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
