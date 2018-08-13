import Camera from "./Camera";
import Canvas from "./Canvas";
import * as Goods from "./Goods";
import Shape from "./Shape";

export default class Menu {

    public static goodCanvas: Canvas;
    public static board: Goods.Board;

    public static createGoods() {
        if (Menu.board === undefined ) {
            Menu.board = new Goods.Board();
            Menu.board.create(1, 1).addToMenu();
        }
    }

    public static createMenuMap() {
        if (Menu.goodCanvas === undefined) {
            Menu.goodCanvas = new Canvas(600, 800, "0", "absolute");
            Menu.goodCanvas.canvas.style.display = "none";
            Menu.goodCanvas.canvas.style.backgroundColor = "#66ccff";
        }
        return this;
    }

    public static addMenu(shp: Shape) {
        Menu.elements.push(shp);
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
                                pos.x,
                                pos.y,
                                shp.width,
                                shp.height,
                            );
                    }
                    break;
                case "circle":
                    if (shp.position !== undefined) {
                            const pos: {[key: string]: number} = shp.position[0];
                            Menu.goodCanvas.ctx.beginPath();
                            Menu.goodCanvas.ctx.arc(
                                pos.x,
                                pos.y,
                                shp.radius,
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
                            pos.x,
                            pos.y,
                        );
                        shp.position.push(pos);
                        for (const point of shp.position) {
                            Menu.goodCanvas.ctx.lineTo(
                                point.x,
                                point.y,
                            );
                        }
                    }
                    break;
                case "arc":
                    if (shp.position !== undefined) {
                        const pos: {[key: string]: number} = shp.position[0];
                        Menu.goodCanvas.ctx.beginPath();
                        Menu.goodCanvas.ctx.moveTo(
                            pos.x + shp.radius * Math.cos(shp.startAngle),
                            pos.y + shp.radius * Math.sin(shp.startAngle),
                        );
                        Menu.goodCanvas.ctx.arc(
                            pos.x,
                            pos.y,
                            shp.radius,
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
                                pos.x,
                                pos.y,
                            );
                        }
                        pos = shp.position[1];
                        if (pos) {
                            Menu.goodCanvas.ctx.lineTo(
                                pos.x,
                                pos.y,
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
}
