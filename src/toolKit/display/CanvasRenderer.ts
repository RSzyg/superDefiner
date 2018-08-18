import Camera from "../../Camera";
import Canvas from "../../Canvas";

export class CanvasRenderer {
    public displayList: native.DisplayObject[];
    public main: Canvas;

    constructor() {
        this.displayList = native.DisplayObjectContainer.children;
    }

    public createCanvas(width: number, height: number, zIndex: string) {
        if (this.main === undefined) {
            this.main = new Canvas(width, height, zIndex, "absolute");
        }
        return this;
    }

    public draw(obj) {
        switch (obj.type) {
            case "rect":
                if (obj.position !== undefined) {
                    const pos: {[key: string]: number} = obj.position[0];
                    this.main.ctx.beginPath();
                    this.main.ctx.rect(
                        pos.x * Camera.scale - Camera.x,
                        pos.y * Camera.scale - Camera.y,
                        obj.width * Camera.scale,
                        obj.height * Camera.scale,
                    );
                }
                break;
            case "circle":
                if (obj.position !== undefined) {
                    const pos: {[key: string]: number} = obj.position[0];
                    this.main.ctx.beginPath();
                    this.main.ctx.arc(
                        pos.x * Camera.scale  - Camera.x,
                        pos.y * Camera.scale  - Camera.y,
                        obj.radius * Camera.scale,
                        0,
                        2 * Math.PI,
                    );
                }
                break;
            case "triangle":
                if (obj.position !== undefined) {
                    const pos: {[key: string]: number} = obj.position.shift();
                    this.main.ctx.beginPath();
                    this.main.ctx.moveTo(
                        pos.x * Camera.scale  - Camera.x,
                        pos.y * Camera.scale  - Camera.y,
                    );
                    obj.position.push(pos);
                    for (const point of obj.position) {
                        this.main.ctx.lineTo(
                            point.x * Camera.scale  - Camera.x,
                            point.y * Camera.scale  - Camera.y,
                        );
                    }
                }
                break;
            case "arc":
                if (obj.position !== undefined) {
                    const pos: {[key: string]: number} = obj.position[0];
                    this.main.ctx.beginPath();
                    this.main.ctx.moveTo(
                        (pos.x + obj.radius * Math.cos(obj.startAngle)) * Camera.scale - Camera.x,
                        (pos.y + obj.radius * Math.sin(obj.startAngle)) * Camera.scale - Camera.y,
                    );
                    this.main.ctx.arc(
                        pos.x * Camera.scale - Camera.x,
                        pos.y * Camera.scale - Camera.y,
                        obj.radius * Camera.scale,
                        obj.startAngle,
                        obj.endAngle,
                    );
                }
                break;
            case "line":
                if (obj.position !== undefined) {
                    let pos: {[key: string]: number} = obj.position[0];
                    this.main.ctx.beginPath();
                    if (pos) {
                        this.main.ctx.moveTo(
                            pos.x * Camera.scale  - Camera.x,
                            pos.y * Camera.scale  - Camera.y,
                        );
                    }
                    pos = obj.position[1];
                    if (pos) {
                        this.main.ctx.lineTo(
                            pos.x * Camera.scale  - Camera.x,
                            pos.y * Camera.scale  - Camera.y,
                        );
                    }
                }
                break;
            default:
                break;
        }
        if (obj.fillStyle !== undefined) {
            this.main.ctx.fillStyle = obj.fillStyle;
            this.main.ctx.fill();
        }
        if (obj.strokeStyle !== undefined) {
            this.main.ctx.strokeStyle = obj.strokeStyle;
            this.main.ctx.stroke();
        }
        this.main.ctx.closePath();
    }

    public render() {
        this.main.canvas.height = this.main.canvas.height;
        for (const obj of this.displayList) {
            if (obj.children.length) {
                for (const child of obj.children) {
                    this.draw(child);
                }
            } else {
                this.draw(obj);
            }
        }
    }
}
