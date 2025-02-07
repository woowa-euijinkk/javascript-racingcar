export class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async startGame() {
    const names = await this.readCarNames();
    const count = await this.readTryCount();

    this.playRounds(names, count);

    const winners = this.model.getWinners();
    this.view.displayWinners(winners);
  }

  async readTryCount() {
    while (true) {
      try {
        const countInput = await this.view.readTryCount();
        const count = this.model.parseCount(countInput);
        this.view.displayGameCount(count);
        return count;
      } catch (e) {
        this.view.displayError(e.message);
      }
    }
  }

  async readCarNames() {
    while (true) {
      try {
        const nameInput = await this.view.readCarNames();
        const names = this.model.parseCarNames(nameInput);
        this.view.displayCarNames(names);
        return names;
      } catch (e) {
        this.view.displayError(e.message);
      }
    }
  }

  playRounds(names, count) {
    this.model.generateCars(names);

    for (let i = 0; i < count; i++) {
      this.model.playRound();
      this.view.displayRoundStatus(this.model.getRoundStatus());
    }
  }
}
