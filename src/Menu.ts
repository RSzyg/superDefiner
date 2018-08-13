import Camera from "./Camera";
import Canvas from "./Canvas";
import * as Goods from "./Goods";
import Shape from "./Shape";

export default class Menu {

    public static goodCanvas: Canvas;

    public static createMenuMap() {
        if (Menu.goodCanvas === undefined) {
            Menu.goodCanvas = new Canvas(600, 800, "0");
        }
        return this;
    }

    public static Menurender() {
        Menu.goodCanvas.canvas.height = Menu.goodCanvas.canvas.height;
        for (const shp of Menu.elements) {
            switch (shp.type) {
                case "rect":
                    if (shp.position !== undefined) {
                            const pos: {[key: string]: number} = shp.position[0];
                            Menu.goodCanvas.ctx.beginPath();
                            Menu.goodCanvas.ctx.rect(
                                pos.x * Camera.scale - Camera.x,
                                pos.y * Camera.scale - Camera.y,
                                shp.width * Camera.scale,
                                shp.height * Camera.scale,
                            );
                    }
                    break;
                case "circle":
                    if (shp.position !== undefined) {
                            const pos: {[key: string]: number} = shp.position[0];
                            Menu.goodCanvas.ctx.beginPath();
                            Menu.goodCanvas.ctx.arc(
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
                        Menu.goodCanvas.ctx.beginPath();
                        Menu.goodCanvas.ctx.moveTo(
                            pos.x * Camera.scale  - Camera.x,
                            pos.y * Camera.scale  - Camera.y,
                        );
                        shp.position.push(pos);
                        for (const point of shp.position) {
                            Menu.goodCanvas.ctx.lineTo(
                                point.x * Camera.scale  - Camera.x,
                                point.y * Camera.scale  - Camera.y,
                            );
                        }
                    }
                    break;
                case "arc":
                    if (shp.position !== undefined) {
                        const pos: {[key: string]: number} = shp.position[0];
                        Menu.goodCanvas.ctx.beginPath();
                        Menu.goodCanvas.ctx.moveTo(
                            (pos.x + shp.radius * Math.cos(shp.startAngle)) * Camera.scale - Camera.x,
                            (pos.y + shp.radius * Math.sin(shp.startAngle)) * Camera.scale - Camera.y,
                        );
                        Menu.goodCanvas.ctx.arc(
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
                        Menu.goodCanvas.ctx.beginPath();
                        if (pos) {
                            Menu.goodCanvas.ctx.moveTo(
                                pos.x * Camera.scale  - Camera.x,
                                pos.y * Camera.scale  - Camera.y,
                            );
                        }
                        pos = shp.position[1];
                        if (pos) {
                            Menu.goodCanvas.ctx.lineTo(
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
                Menu.goodCanvas.ctx.fillStyle = shp.fillStyle;
                Menu.goodCanvas.ctx.fill();
            }
            if (shp.strokeStyle !== undefined) {
                Menu.goodCanvas.ctx.strokeStyle = shp.strokeStyle;
                Menu.goodCanvas.ctx.stroke();
            }
            Menu.goodCanvas.ctx.closePath();
        }
        requestAnimationFrame(() => Menu.Menurender());
    }

    private static elements: Array<{[key: string]: any}> = [];

    public addmenu(shp: Shape) {
        Menu.elements.push(shp);
        return this;
    }
}
