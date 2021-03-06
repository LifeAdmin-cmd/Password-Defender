import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserInputScreen from './UserInputScreen.js';
export default class IntroScreen extends Scene {
    buttonImage;
    instruction;
    glassplane;
    constructor(game) {
        super(game);
        this.buttonImage = Game.loadNewImage('./assets/img/Press-Enter-Continue.png');
        this.instruction = Game.loadNewImage('./assets/img/Instruction.png');
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.glassplane = document.getElementById('glasspane');
            this.glassplane.style.display = 'inline';
            this.glassplane.style.position = 'absolute';
            this.nextScene = true;
        }
    }
    update() {
        if (this.nextScene) {
            return new UserInputScreen(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.instruction, (this.game.canvas.width / 2) - 400, 0, this.instruction.width * 0.93, this.instruction.height * 0.93);
        this.game.ctx.drawImage(this.buttonImage, (this.game.canvas.width / 2) - 300, 850);
    }
}
//# sourceMappingURL=IntroScreen.js.map