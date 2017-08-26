var Canvas = (function () {
    function Canvas(width, height) {
        this.canvas_ = document.createElement("canvas");
        this.canvas_.width = width;
        this.canvas_.height = height;
        this.canvas_.className += " canvas";
        document.body.appendChild(this.canvas_);
        this.context_ = this.canvas_.getContext("2d");
    }
    // Getters for width and height
    Canvas.prototype.getWidth = function () {
        return this.canvas_.width;
    };
    Canvas.prototype.getHeight = function () {
        return this.canvas_.height;
    };
    // Removes every element from the canvas
    Canvas.prototype.clear = function () {
        this.context_.clearRect(0, 0, this.getWidth(), this.getHeight());
    };
    Canvas.prototype.resize = function (w, h) {
        this.canvas_.width = w;
        this.canvas_.height = h;
    };
    Canvas.prototype.drawCircle = function (x, y, radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (radius === void 0) { radius = 10; }
        this.context_.beginPath();
        this.context_.arc(x, y, radius, 0, 2 * Math.PI);
        this.context_.stroke();
    };
    Canvas.prototype.addEventListener = function (eventType, callback) {
        this.canvas_.addEventListener(eventType, callback);
    };
    return Canvas;
}());
var Bubble = (function () {
    function Bubble(x_, y_, radius_) {
        if (x_ === void 0) { x_ = 0; }
        if (y_ === void 0) { y_ = 0; }
        if (radius_ === void 0) { radius_ = 1; }
        this.x_ = x_;
        this.y_ = y_;
        this.radius_ = radius_;
    }
    Bubble.prototype.draw = function (canvas) {
        canvas.drawCircle(this.x_, this.y_, this.radius_);
    };
    // param lengthFactor: how long should we make the steps in the axis direction.
    //                     It is the vector length in polar coordinates
    Bubble.prototype.randomMove = function (lengthFactor) {
        if (lengthFactor === void 0) { lengthFactor = 1; }
        // Random angle in range [0, 2*PI)
        var angle = Math.random() * 2 * Math.PI;
        // Now we translate from polar coordinates to cartisean coordinates
        // And we get a random offset in any direction of the space 
        this.x_ += Math.cos(angle) * lengthFactor;
        this.y_ += Math.sin(angle) * lengthFactor;
    };
    return Bubble;
}());
function main() {
    var canvas = new Canvas(innerWidth, innerHeight), bubbles = [], maxNumBubbles = 50, bubblesRadius = 10;
    var run = function () {
        canvas.clear();
        for (var _i = 0, bubbles_1 = bubbles; _i < bubbles_1.length; _i++) {
            var bubble = bubbles_1[_i];
            // Update
            bubble.randomMove();
            // Draw
            bubble.draw(canvas);
        }
        requestAnimationFrame(run);
    };
    canvas.addEventListener("mousemove", function (e) {
        bubbles.push(new Bubble(e.clientX, e.clientY, bubblesRadius));
        if (bubbles.length >= maxNumBubbles) {
            bubbles.splice(0, 1);
        }
    });
    canvas.addEventListener("touchmove", function (e) {
        bubbles.push(new Bubble(e.touches[0].clientX, e.touches[0].clientY, bubblesRadius));
        if (bubbles.length >= maxNumBubbles) {
            bubbles.splice(0, 1);
        }
    });
    window.addEventListener("resize", function (e) {
        canvas.resize(innerWidth, innerHeight);
        bubbles = [];
    });
    run();
}
main();
