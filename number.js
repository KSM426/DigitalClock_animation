import { Horizontal } from "./horizontal.js";
import { Vertical } from "./vertical.js";

export class Number {
    constructor(num, x, y, l){
        this.num = num;
        this.posX = x;
        this.posY = y;
        this.length = l;
        this.hor = [];
        this.ver = [];
        this.pos = [[0, -1 * this.length * 2], [-1 * this.length, -1 * this.length], [this.length, -1 * this.length],
        [0, 0], [-1 * this.length, this.length], [this.length, this.length], [0, this.length * 2]];

        this.checkTime(num);
    }
    
    resize() {
        
    }

    checkTime(num){
        const numToDigit = [
            [1, 1, 1, 0, 1, 1, 1],
            [0, 0, 1, 0, 0, 1, 0],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 1],
            [0, 1, 1, 1, 0, 1, 0],
            [1, 1, 0, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1]
        ]

        this.num = num;
        this.digit = numToDigit[this.num];

        for(let i=0; i<7; i++){
            if(i % 3 == 0 /*036*/) this.ver[i] = new Horizontal(this.digit[i], this.posX + this.pos[i][0], this.posY + this.pos[i][1], this.length);
            else this.hor[i] = new Vertical(this.digit[i], this.posX + this.pos[i][0], this.posY + this.pos[i][1], this.length);
        }
    }
    
    animate(ctx) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = 1;

        for(let i=0; i<7; i++){
            if(i % 3 == 0) this.ver[i].animate(ctx);
            else this.hor[i].animate(ctx);
        }
    }
}