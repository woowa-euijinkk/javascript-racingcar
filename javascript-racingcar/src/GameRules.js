export class GameRules {
  static MOVE_NUMBERS = {
    START: 0,
    END: 9,
  };

  static MOVE_CRITERIA = 4;

  #randomNumberGenerator;

  constructor(randomNumberGenerator) {
    this.#randomNumberGenerator = randomNumberGenerator;
  }

  shouldMove() {
    const number = this.#randomNumberGenerator(
      GameRules.MOVE_NUMBERS.START,
      GameRules.MOVE_NUMBERS.END,
    );
    return number >= GameRules.MOVE_CRITERIA;
  }
}
