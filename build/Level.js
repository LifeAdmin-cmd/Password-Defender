import Scene from './Scene.js';
import Game from './Game.js';
import TileMaps from './TileMaps.js';
import GameOverScreen from './GameOverScreen.js';
import WinningScreen from './WinningScreen.js';
import NextLevelScreen from './NextLevelScreen.js';
import PowerupPopup from './PowerupPopup.js';
export default class Level extends Scene {
    tileMaps;
    logo;
    cookiesScore;
    gameOver;
    winGame;
    player;
    enemies;
    triggerTimer;
    triggerAgain;
    gameMap;
    powerupPopup;
    constructor(game) {
        super(game);
        this.tileMaps = new TileMaps(game);
        this.logo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.cookiesScore = Game.loadNewImage('./assets/img/Cookie-Score.png');
        this.player = this.tileMaps.getPlayer();
        this.enemies = [];
        for (let index = 0; index < this.tileMaps.getEnemyCount(); index++) {
            this.enemies.push(this.tileMaps.getEnemies());
        }
        this.triggerTimer = 0;
        this.triggerAgain = false;
        this.powerupPopup = new PowerupPopup();
        TileMaps.powerUpOneActive = false;
        TileMaps.powerUpTwoActive = false;
        TileMaps.powerUpThreeActive = false;
    }
    removeEnemy() {
        this.enemies = this.enemies.filter((enemy) => {
            if (enemy.checkForPasswordDamage()) {
                this.game.getUserData().revealCount += 2;
                this.game.getUserData().revealDisplayedPassword(this.game.getUserData().revealCount);
                return false;
            }
            return true;
        });
    }
    checkForDamage() {
        this.triggerTimer += 1;
        if (!this.checkForVPN())
            return;
        if (this.triggerAgain === true) {
            this.game.getUserData().revealCount += 2;
            this.triggerAgain = false;
            this.game.getUserData().revealDisplayedPassword(this.game.getUserData().revealCount);
        }
        else if (this.triggerAgain === false && this.triggerTimer >= 60) {
            this.triggerTimer = 0;
            this.triggerAgain = true;
        }
    }
    checkForVPN() {
        if (this.player.collideWithEnemy(this.enemies)
            && !this.player.getVPNActive()) {
            return true;
        }
        return this.enemies.find((enemy) => enemy.checkForPasswordDamage()) !== undefined;
    }
    checkGameContinue() {
        if (this.game.getUserData().getScore() === 364) {
            this.game.getUserData().addLevel();
            return true;
        }
        return false;
    }
    checkGameFinished() {
        if (this.game.getUserData().getScore() === 750) {
            return true;
        }
        return false;
    }
    checkGameOver() {
        if (this.game.getUserData().revealCount >= this.game.getUserData().getPassword().length) {
            return true;
        }
        return false;
    }
    processInput() {
        this.player.handleKeyInput();
        this.player.move();
    }
    update() {
        this.tileMaps.nextLevel();
        this.player.update();
        this.player.eatVirus(this.enemies);
        this.removeEnemy();
        this.checkForDamage();
        if (this.enemies.length < this.tileMaps.getEnemyCount()) {
            this.enemies.push(this.tileMaps.spawnEnemy());
        }
        if (this.checkGameOver()) {
            return new GameOverScreen(this.game);
        }
        if (this.checkGameContinue()) {
            return new NextLevelScreen(this.game);
        }
        if (this.checkGameFinished()) {
            return new WinningScreen(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.logo, this.game.canvas.width * 0.41, this.game.canvas.height * 0.01, this.logo.width / 3, this.logo.height / 3);
        this.game.writeTextToCanvas(`Level: ${this.game.getUserData().getLevel()}`, this.game.canvas.width * 0.22, this.game.canvas.height * 0.17, 40);
        this.game.ctx.drawImage(this.cookiesScore, this.game.canvas.width * 0.715, this.game.canvas.height * 0.171);
        this.game.writeTextToCanvas(`${this.game.getUserData().getScore()}`, this.game.canvas.width * 0.75, this.game.canvas.height * 0.2, 40);
        this.tileMaps.draw(this.game.ctx);
        this.enemies.forEach((enemy) => {
            enemy.draw(this.game.ctx);
        });
        this.player.draw(this.game.ctx);
        if (TileMaps.powerUpOneActive === true) {
            this.powerupPopup.displayPopup1(this.game);
        }
        else if (TileMaps.powerUpTwoActive === true) {
            this.powerupPopup.displayPopup2(this.game);
        }
        else if (TileMaps.powerUpThreeActive === true) {
            this.powerupPopup.displayPopup3(this.game);
        }
    }
}
//# sourceMappingURL=Level.js.map