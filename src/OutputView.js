export class OutputView {
  static #MESSAGE = {
    WINNERS_PREFIX: '최종 우승자 : ',
  };
  #printer;

  constructor(printer = console.log) {
    this.#printer = printer;
  }

  displayCarNames(names) {
    this.#printer(`${names.join(', ')}`);
  }

  displayGameCount(count) {
    this.#printer(count);
  }

  displayError(message) {
    this.#printer(message);
  }

  displayRoundStatus(roundStatus) {
    roundStatus.forEach((carStatus) => {
      this.#displayCarStatus(carStatus);
    });
    this.#printer('');
  }

  #displayCarStatus(carStatus) {
    this.#printer(`${carStatus.name} : ${'-'.repeat(carStatus.position)}`);
  }

  displayWinners(winners) {
    this.#printer(
      `${OutputView.#MESSAGE.WINNERS_PREFIX}${winners
        .map((winner) => winner.getName())
        .join(', ')}`,
    );
  }
}
