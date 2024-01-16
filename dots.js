export class Dots {
    constructor(x, y, l){
        this.posX = x;
        this.posY = y;
        this.length = l;
        this.dotsY = [this.length * 3, this.length * -3];
        
        this.resize(this.length);
    }

    resize(l) {
        this.radius = l;
    }

    animate(ctx) {
        for(let i=0; i<2; i++){
            ctx.fillStyle = 'rgba(240, 220, 102)';
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.posX, this.posY + this.dotsY[i], this.length, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore()
        }
        
    }
}