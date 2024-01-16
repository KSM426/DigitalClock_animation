import { Number } from "./number.js";
import { Dots } from "./dots.js";

export class Clock {
    constructor() {
        this.num = [];
        this.prev = [];
        this.numbers = [];
        this.monthNames = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
    
    resize(x, y, width, height) {
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;
        
        this.checkTime();
        
        this.unit = this.width / 25;
        this.length = this.unit * 2;
        // 2 4 1 4 1.5 1.5 4 1 4 2 => 25
        //   4   9     16  21

        this.numPosX = [4, 9, 16, 21];
        this.numPosY = this.posY + this.height / 2;
        
        for(let i=0; i<4; i++){
            this.numbers[i] = new Number(this.num[i], this.posX + this.numPosX[i] * this.unit, this.numPosY, this.length);
        }

        this.dots = new Dots(this.posX + 12.5 * this.unit, this.numPosY, this.unit/2.5);
    }
    
    animate(ctx) {
        this.fontsize = this.unit*1.2;
        ctx.font = `${this.fontsize}px Consolas`;
        ctx.fillStyle = 'rgba(240, 220, 102)';
        const time = new Date();
        ctx.fillText(
            this.dayNames[time.getDay()].substring(0, 3).toUpperCase() + ` ` + 
            time.getDate() + ` ` + 
            this.monthNames[time.getMonth()].substring(0, 3).toUpperCase(), 
            this.posX + this.unit * 5 / 3, this.numPosY - this.unit * 5);
        ctx.fillText(time.getFullYear(), this.posX + this.unit * 5 / 3, this.numPosY - this.unit * 5 - this.fontsize);

        this.checkTime();

        for(let i=0; i<4; i++){
            if(this.prev[3] != this.num[3]) {
                this.numbers[i].checkTime(this.num[i]);
            }
            this.numbers[i].animate(ctx);
        }

        this.dots.animate(ctx);
    }

    checkTime(){
        this.prev = [...this.num];
        const time = new Date();
        this.num[0] = time.getHours() / 10 | 0;
        this.num[1] = time.getHours() % 10;
        this.num[2] = time.getMinutes() / 10 | 0;
        this.num[3] = time.getMinutes() % 10;
    }
}