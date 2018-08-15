import Camera from "./Camera";
import Canvas from "./Canvas";
import Shape from "./Shape";

export default class Container {
    public static mainCanvas: Canvas;

    public static createMainMap() {
        if (Container.mainCanvas === undefined) {
            Container.mainCanvas = new Canvas(1000, 800, "1", "absolute");
            Container.mainCanvas.canvas.style.background = "#E9E9E9";
        }
        return this;
    }

    public static render() {
        Container.mainCanvas.canvas.height = Container.mainCanvas.canvas.height;
        for (const id in Container.elements) {
            if (Container.elements[id]) {
                const shp = Container.elements[id];
                switch (shp.type) {
                    case "rect":
                        if (shp.position !== undefined) {
                            // if ((shp.position[0].x + shp.width * Camera.scale > -Camera.x &&
                            //     shp.position[0].y + shp.height * Camera.scale > -Camera.y) ||
                            //     (shp.position[0].x < -Camera.x + Container.mainCanvas.canvas.width &&
                            //     shp.position[0].y > -Camera.y + Container.mainCanvas.canvas.height)
                            // ) {
                                const pos: {[key: string]: number} = shp.position[0];
                                Container.mainCanvas.ctx.beginPath();
                                Container.mainCanvas.ctx.rect(
                                    pos.x * Camera.scale - Camera.x,
                                    pos.y * Camera.scale - Camera.y,
                                    shp.width * Camera.scale,
                                    shp.height * Camera.scale,
                                );
                            // }
                        }
                        break;
                    case "circle":
                        if (shp.position !== undefined) {
                                const pos: {[key: string]: number} = shp.position[0];
                                Container.mainCanvas.ctx.beginPath();
                                Container.mainCanvas.ctx.arc(
                                    pos.x * Camera.scale  - Camera.x,
                                    pos.y * Camera.scale  - Camera.y,
                                    shp.radius * Camera.scale,
                                    0,
                                    2 * Math.PI,
                                );
                        }
                        break;
                    case "triangle":
                        if (shp.position !== undefined) {
                            const pos: {[key: string]: number} = shp.position.shift();
                            Container.mainCanvas.ctx.beginPath();
                            Container.mainCanvas.ctx.moveTo(
                                pos.x * Camera.scale  - Camera.x,
                                pos.y * Camera.scale  - Camera.y,
                            );
                            shp.position.push(pos);
                            for (const point of shp.position) {
                                Container.mainCanvas.ctx.lineTo(
                                    point.x * Camera.scale  - Camera.x,
                                    point.y * Camera.scale  - Camera.y,
                                );
                            }
                        }
                        break;
                    case "arc":
                        if (shp.position !== undefined) {
                            const pos: {[key: string]: number} = shp.position[0];
                            Container.mainCanvas.ctx.beginPath();
                            Container.mainCanvas.ctx.moveTo(
                                (pos.x + shp.radius * Math.cos(shp.startAngle)) * Camera.scale - Camera.x,
                                (pos.y + shp.radius * Math.sin(shp.startAngle)) * Camera.scale - Camera.y,
                            );
                            Container.mainCanvas.ctx.arc(
                                pos.x * Camera.scale - Camera.x,
                                pos.y * Camera.scale - Camera.y,
                                shp.radius * Camera.scale,
                                shp.startAngle,
                                shp.endAngle,
                            );
                        }
                        break;
                    case "line":
                        if (shp.position !== undefined) {
                            let pos: {[key: string]: number} = shp.position[0];
                            Container.mainCanvas.ctx.beginPath();
                            if (pos) {
                                Container.mainCanvas.ctx.moveTo(
                                    pos.x * Camera.scale  - Camera.x,
                                    pos.y * Camera.scale  - Camera.y,
                                );
                            }
                            pos = shp.position[1];
                            if (pos) {
                                Container.mainCanvas.ctx.lineTo(
                                    pos.x * Camera.scale  - Camera.x,
                                    pos.y * Camera.scale  - Camera.y,
                                );
                            }
                        }
                        break;
                    default:
                        break;
                }
                if (shp.fillStyle !== undefined) {
                    Container.mainCanvas.ctx.fillStyle = shp.fillStyle;
                    Container.mainCanvas.ctx.fill();
                }
                if (shp.strokeStyle !== undefined) {
                    Container.mainCanvas.ctx.strokeStyle = shp.strokeStyle;
                    Container.mainCanvas.ctx.stroke();
                }
                Container.mainCanvas.ctx.closePath();
            }
        }
        requestAnimationFrame(() => Container.render());
    }

    public static addChild(shp: Shape) {
        Container.elements[shp.uuid] = shp;
        return this;
    }

    public static removeChild(id: string) {
        delete Container.elements[id];
        return this;
    }

    public static get canvasWidth() {
        return Container.mainCanvas.canvas.width;
    }

    public static get canvasHeight() {
        return Container.mainCanvas.canvas.height;
    }

    private static elements: {[key: string]: Shape} = {};
}
