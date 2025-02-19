import { getRandomNumber } from './utils/getRandomNumber.js';
import { isEmptryOrNil } from './utils/parse.js';
import { InputValidator } from './InputValidator.js';
import { GameRules } from './GameRules.js';
import { CarCollection } from './CarCollection.js';

export class GameModel {
  #carCollection;
  #inputValidator;
  #gameRules;

  constructor({
    randomNumberGenerator = getRandomNumber,
    inputValidator = new InputValidator(),
  } = {}) {
    this.#gameRules = new GameRules(randomNumberGenerator);
    this.#inputValidator = inputValidator;
    this.#carCollection = new CarCollection();
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

  generateCars(names) {
    this.#carCollection.addCars(names);
  }

  getRoundStatus() {
    return this.#carCollection.getStatus();
  }

  getCarByName(name) {
    return this.#carCollection.findByName(name);
  }

  playRound() {
    this.#carCollection.moveByCondition(() => this.#gameRules.shouldMove());
  }

  getWinners() {
    return this.#carCollection.getWinners();
  }
}
