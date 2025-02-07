import { GameModel } from './gameModel.js';
import { GameProcessor } from './gameProcessor.js';
import { GameView } from './GameView.js';

const gameProcessor = new GameProcessor(new GameModel(), new GameView());

gameProcessor.startGame();
