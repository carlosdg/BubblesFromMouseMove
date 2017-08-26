class Canvas {

    private canvas_:  HTMLCanvasElement;
    private context_: CanvasRenderingContext2D;

    constructor( width: number, height: number ){
        this.canvas_ = document.createElement("canvas");
        this.canvas_.width  = width;
        this.canvas_.height = height;
        this.canvas_.className += " canvas";
        document.body.appendChild( this.canvas_ );

        this.context_ = this.canvas_.getContext("2d");
    }


    // Getters for width and height
    public getWidth(): number{
        return this.canvas_.width;
    }
    public getHeight(): number{
        return this.canvas_.height;
    }

    // Removes every element from the canvas
    public clear(): void{
        this.context_.clearRect( 0, 0, this.getWidth(), this.getHeight() );
    }

    public resize(w, h): void{
        this.canvas_.width = w;
        this.canvas_.height = h;
    }

    public drawCircle( x: number = 0,
                       y: number = 0,
                       radius: number = 10): void{
        this.context_.beginPath();
        this.context_.arc(x, y, radius, 0, 2*Math.PI);
        this.context_.stroke();
    }

    public addEventListener( eventType: string, callback ): void{
        this.canvas_.addEventListener( eventType, callback );
    }

}


class Bubble {

    constructor( private x_: number = 0,
                 private y_: number = 0,
                 private radius_: number = 1
             ){}

    public draw( canvas: Canvas ): void{
        canvas.drawCircle( this.x_, this.y_, this.radius_ );
    }

    // param lengthFactor: how long should we make the steps in the axis direction.
    //                     It is the vector length in polar coordinates
    public randomMove( lengthFactor: number = 1 ): void{
        // Random angle in range [0, 2*PI)
        let angle = Math.random() * 2*Math.PI;

        // Now we translate from polar coordinates to cartisean coordinates
        // And we get a random offset in any direction of the space 
        this.x_ += Math.cos(angle) * lengthFactor;
        this.y_ += Math.sin(angle) * lengthFactor;
    }

}


function main(){

    let canvas: Canvas = new Canvas( innerWidth, innerHeight ),
        bubbles: Bubble[] = [],
        maxNumBubbles: number = 50,
        bubblesRadius: number = 10;
    let run = function(){
        canvas.clear();

        for (let bubble of bubbles){
            // Update
            bubble.randomMove();

            // Draw
            bubble.draw( canvas );
        }

        requestAnimationFrame( run );
    }

    canvas.addEventListener("mousemove", (e)=>{
        bubbles.push( new Bubble(e.clientX, e.clientY, bubblesRadius) );
        if (bubbles.length >= maxNumBubbles){
            bubbles.splice(0, 1);
        }
    });
    canvas.addEventListener("touchmove", (e)=>{
        bubbles.push( new Bubble(e.touches[0].clientX, e.touches[0].clientY, bubblesRadius) );
        if (bubbles.length >= maxNumBubbles){
            bubbles.splice(0, 1);
        }
    });
    window.addEventListener("resize", (e)=>{
        canvas.resize( innerWidth, innerHeight );
        bubbles = [];
    });

    run();
}

main();
