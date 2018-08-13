import Canvas from "./Canvas";
import Shape from "./Shape";

export default class Container {
    public static scale: number  = 0.5;
    public static cameraX: number = 0;
    public static cameraY: number = 0;

    public static create() {
        if (Container.mainCanvas === undefined) {
            Container.mainCanvas = new Canvas(1000, 800, "1");
        }
        return this;
    }

    public static zoom(scaleChange: number) {
        if (Container.scale + scaleChange > 0.45 && Container.scale + scaleChange < 2.05) {
            Container.scale += scaleChange;
        }
        const height = Container.mainCanvas.canvas.height;
        const width = Container.mainCanvas.canvas.width;
        Container.cameraX = Container.scale * width / 2 - width / 2;
        Container.cameraY = Container.scale * height / 2 - height / 2;
    }

    public static render() {
        Container.mainCanvas.canvas.height = Container.mainCanvas.canvas.height;
        for (const shp of Container.elements) {
            switch (shp.type) {
                case "rect":
                    if (shp.position !== undefined) {
                        // if ((shp.position[0].x + shp.width * Container.scale > -Container.cameraX &&
                        //     shp.position[0].y + shp.height * Container.scale > -Container.cameraY) ||
                        //     (shp.position[0].x < -Container.cameraX + Container.mainCanvas.canvas.width &&
                        //     shp.position[0].y > -Container.cameraY + Container.mainCanvas.canvas.height)
                        // ) {
                            const pos: {[key: string]: number} = shp.position[0];
                            Container.mainCanvas.ctx.beginPath();
                            Container.mainCanvas.ctx.rect(
                                pos.x * Container.scale - Container.cameraX,
                                pos.y * Container.scale - Container.cameraY,
                                shp.width * Container.scale,
                                shp.height * Container.scale,
                            );
                        // }
                    }
                    break;
                case "circle":
                    if (shp.position !== undefined) {
                            const pos: {[key: string]: number} = shp.position[0];
                            Container.mainCanvas.ctx.beginPath();
                            Container.mainCanvas.ctx.arc(
                                pos.x * Container.scale  - Container.cameraX,
                                pos.y * Container.scale  - Container.cameraY,
                                shp.radius * Container.scale,
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
                            pos.x * Container.scale  - Container.cameraX,
                            pos.y * Container.scale  - Container.cameraY,
                        );
                        shp.position.push(pos);
                        for (const point of shp.position) {
                            Container.mainCanvas.ctx.lineTo(
                                point.x * Container.scale  - Container.cameraX,
                                point.y * Container.scale  - Container.cameraY,
                            );
                        }
                    }
                    break;
                case "arc":
                    if (shp.position !== undefined) {
                        const pos: {[key: string]: number} = shp.position[0];
                        Container.mainCanvas.ctx.beginPath();
                        Container.mainCanvas.ctx.moveTo(
                            (pos.x + shp.radius * Math.cos(shp.startAngle)) * Container.scale - Container.cameraX,
                            (pos.y + shp.radius * Math.sin(shp.startAngle)) * Container.scale - Container.cameraY,
                        );
                        Container.mainCanvas.ctx.arc(
                            pos.x * Container.scale - Container.cameraX,
                            pos.y * Container.scale - Container.cameraY,
                            shp.radius * Container.scale,
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
                                pos.x * Container.scale  - Container.cameraX,
                                pos.y * Container.scale  - Container.cameraY,
                            );
                        }
                        pos = shp.position[1];
                        if (pos) {
                            Container.mainCanvas.ctx.lineTo(
                                pos.x * Container.scale  - Container.cameraX,
                                pos.y * Container.scale  - Container.cameraY,
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

        requestAnimationFrame(() => Container.render());
    }

    private static elements: Array<{[key: string]: any}> = [];
    private static mainCanvas: Canvas;

    public addChild(shp: Shape) {
        Container.elements.push(shp);
        return this;
    }
}
