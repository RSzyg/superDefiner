import Canvas from "./Canvas";
import Shape from "./Shape";

export default class Container {
    public static create() {
        if (Container.mainCanvas === undefined) {
            Container.mainCanvas = new Canvas(1000, 800, "1");
        }
        return this;
    }

    public static render() {
        Container.mainCanvas.canvas.height = Container.mainCanvas.canvas.height;
        for (const shp of Container.elements) {
            switch (shp.type) {
                case "rect":
                    if (shp.position !== undefined) {
                        const pos: {[key: string]: number} = shp.position[0];
                        Container.mainCanvas.ctx.beginPath();
                        Container.mainCanvas.ctx.rect(pos.x, pos.y, shp.width, shp.height);
                    }
                    break;
                case "circle":
                    if (shp.position !== undefined) {
                        const pos: {[key: string]: number} = shp.position[0];
                        Container.mainCanvas.ctx.beginPath();
                        Container.mainCanvas.ctx.arc(pos.x, pos.y, shp.radius, 0, 2 * Math.PI);
                    }
                    break;
                case "triangle":
                    if (shp.position !== undefined) {
                        const pos: {[key: string]: number} = shp.position.shift();
                        Container.mainCanvas.ctx.beginPath();
                        Container.mainCanvas.ctx.moveTo(pos.x, pos.y);
                        shp.position.push(pos);
                        for (const point of shp.position) {
                            Container.mainCanvas.ctx.lineTo(point.x, point.y);
                        }
                    }
                    break;
                case "arc":
                    if (shp.position !== undefined) {
                        const pos: {[key: string]: number} = shp.position[0];
                        Container.mainCanvas.ctx.beginPath();
                        Container.mainCanvas.ctx.moveTo(
                            pos.x + shp.radius * Math.cos(shp.startAngle),
                            pos.y + shp.radius * Math.sin(shp.startAngle),
                        );
                        Container.mainCanvas.ctx.arc(pos.x, pos.y, shp.radius, shp.startAngle, shp.endAngle);
                    }
                    break;
                case "line":
                    if (shp.position !== undefined) {
                        let pos: {[key: string]: number} = shp.position[0];
                        Container.mainCanvas.ctx.beginPath();
                        if (pos) {
                            Container.mainCanvas.ctx.moveTo(pos.x, pos.y);
                        }
                        pos = shp.position[1];
                        if (pos) {
                            Container.mainCanvas.ctx.lineTo(pos.x, pos.y);
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
