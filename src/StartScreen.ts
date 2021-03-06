import Game from './Game.js';
import IntroScreen from './IntroScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import ShopScreen from './ShopScreen.js';

export default class StartScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private startImage: HTMLImageElement;

  private shoppingImage: HTMLImageElement;

  /**
   * @param game Game Class
   */
  constructor(game: Game) {
    super(game);
    game.resetUserData();
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    this.startImage = Game.loadNewImage('./assets/img/Press-S-Start.png');
    this.shoppingImage = Game.loadNewImage('./assets/img/Press-P-Shopping.png');
  }

  /**
   * Method for read the process input from user
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_S) || this.keyBoard.isKeyDown(KeyListener.KEY_P)) {
      this.nextScene = true;
    }
  }

  /**
   * Method for update the screen
   *
   * @returns New scene
   */
  public update(): Scene {
    if (!this.nextScene) return null;
    if (this.keyBoard.isKeyDown(KeyListener.KEY_S)) {
      return new IntroScreen(this.game);
    }
    if (this.keyBoard.isKeyDown(KeyListener.KEY_P)) {
      return new ShopScreen(this.game);
    }
    return null;
  }

  /**
   * Render to canvas
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(
      this.mainLogo,
      (this.game.canvas.width / 2) - 250,
      (this.game.canvas.height / 2) - 320,
    );
    this.game.ctx.drawImage(
      this.startImage,
      (this.game.canvas.width / 2) - 250,
      this.game.canvas.height * 0.7,
    );
    this.game.ctx.drawImage(
      this.shoppingImage,
      (this.game.canvas.width / 2) - 250,
      this.game.canvas.height * 0.8,
    );
  }
}
