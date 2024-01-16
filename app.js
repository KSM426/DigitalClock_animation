import { Clock } from "./clock.js";
import { Number } from "./number.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        this.clock = new Clock();
        
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.rateHW = 1.2;
        if(this.stageWidth > this.stageHeight) this.clock.resize(
            this.stageWidth / 2 - this.stageHeight / this.rateHW / 2, 
            this.stageHeight / 2 - this.stageHeight / this.rateHW / 2,
            this.stageHeight / this.rateHW, 
            this.stageHeight / this.rateHW);
        else this.clock.resize(
            this.stageWidth / 2 - this.stageWidth / this.rateHW / 2,
            this.stageHeight / 2 - this.stageWidth / this.rateHW / 2,
            this.stageWidth / this.rateHW,
            this.stageWidth/ this.rateHW);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.clock.animate(this.ctx);
    }
}

window.onload = () => {
    new App();
};