export class GameController {
  #model;
  #inputView;
  #outputView;

  constructor(model, inputView, outputView) {
    this.#model = model;
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async startGame() {
    const names = await this.readCarNames();
    const count = await this.readTryCount();

    this.playRounds(names, count);

    const winners = this.#model.getWinners();
    this.#outputView.displayWinners(winners);
  }

  async readTryCount() {
    while (true) {
      try {
        const countInput = await this.#inputView.readTryCount();
        const count = this.#model.parseCount(countInput);
        this.#outputView.displayGameCount(count);
        return count;
      } catch (e) {
        this.#outputView.displayError(e.message);
      }
    }
  }

  async readCarNames() {
    while (true) {
      try {
        const nameInput = await this.#inputView.readCarNames();
        const names = this.#model.parseCarNames(nameInput);
        this.#outputView.displayCarNames(names);
        return names;
      } catch (e) {
        this.#outputView.displayError(e.message);
      }
    }
  }

  playRounds(names, count) {
    this.#model.generateCars(names);

    for (let i = 0; i < count; i++) {
      this.#model.playRound();
      this.#outputView.displayRoundStatus(this.#model.getRoundStatus());
    }
  }
}
