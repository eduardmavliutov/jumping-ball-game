import './styles/main.css';
import { Ball } from './classes/ball';
import { Game } from './classes/game';
import { generateBaulks } from './utils';
import { models } from './models';

const game = new Game(new Ball('.ball'), generateBaulks(models, 10));
game.start();


