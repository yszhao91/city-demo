export class CanvasUI {
    constructor(options = {}) {
        options = { width: 256, height: 128, ...options }
        this.el = document.createElement("canvas");
        this.width = this.el.width = options.width;
        this.height = this.el.height = options.height;
        this.context = this.el.getContext("2d");
        this.transparent = true;
        this.opacity = 0;

        this.render();
        this.needsUpdate = false;
    }

    rw(rx) {
        return rx * this.width;
    }
    rh(ry) {
        return (1 - ry) * this.height;
    }


    render() {
        var ctx = this.context;
        ctx.clearRect(0, 0, this.width, this.height);

        this.border(ctx, this.width, this.height);

        ctx.font = 'bold 50px Arial';
        ctx.fillStyle = "rgba(170, 230, 250,0.8)"
        ctx.fillText("你好", 10, 60)
    }


    //边框
    border(ctx, width, height) {
        if (this.drawBorder)
            return this.drawBorder(ctx, width, height)

        ctx.beginPath();
        ctx.fillStyle = "rgba(17, 128, 255, 0.4)"
        ctx.moveTo(0.1, 1);
        ctx.lineTo(this.rw(0.9), this.rh(1));
        ctx.lineTo(this.rw(1), this.rh(0.9));
        ctx.lineTo(this.rw(1), this.rh(0));
        ctx.lineTo(this.rw(0.1), this.rh(0));
        ctx.lineTo(this.rw(0), this.rh(0.1));
        ctx.lineTo(this.rw(0), this.rh(0.9));
        ctx.fill();

    }

    update(deltaTime) {
        if (!this.needsUpdate)
            return;

        this.render();
    }
}