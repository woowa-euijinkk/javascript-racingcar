import { GameModel } from './gameModel.js';
import { GameController } from './GameController.js';
import { GameView } from './GameView.js';

const gameController = new GameController(new GameModel(), new GameView());

gameController.startGame();
