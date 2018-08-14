import Canvas from "./Canvas";
import * as Goods from "./Goods";
import Shape from "./Shape";

export default class Menu {

    public static goodsCanvas: Canvas;
    public static board: Goods.Board;

    public static create() {
        if (Menu.goodsCanvas === undefined) {
            Menu.goodsCanvas = new Canvas(600, 800, "0", "absolute");
            Menu.goodsCanvas.canvas.style.display = "none";
            Menu.goodsCanvas.canvas.style.backgroundColor = "#66ccff";
        }
        if (Menu.board === undefined ) {
            Menu.board = new Goods.Board();
            Menu.board.create(1, 1).addToMenu();
        }
        return this;
    }

    public static addChild(shp: Shape) {
        Menu.elements[shp.uuid] = shp;
        return this;
    }

    public static removeChild(id: string) {
        delete Menu.elements[id];
        return this;
    }

    public static render() {
        Menu.goodsCanvas.canvas.height = Menu.goodsCanvas.canvas.height;
        for (const id in Menu.elements) {
            if (Menu.elements[id]) {
                const shp = Menu.elements[id];
                switch (shp.type) {
                    case "rect":
                        if (shp.position !== undefined) {
                                const pos: {[key: string]: number} = shp.position[0];
                                Menu.goodsCanvas.ctx.beginPath();
                                Menu.goodsCanvas.ctx.rect(
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
                                Menu.goodsCanvas.ctx.beginPath();
                                Menu.goodsCanvas.ctx.arc(
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
                            Menu.goodsCanvas.ctx.beginPath();
                            Menu.goodsCanvas.ctx.moveTo(
                                pos.x,
                                pos.y,
                            );
                            shp.position.push(pos);
                            for (const point of shp.position) {
                                Menu.goodsCanvas.ctx.lineTo(
                                    point.x,
                                    point.y,
                                );
                            }
                        }
                        break;
                    case "arc":
                        if (shp.position !== undefined) {
                            const pos: {[key: string]: number} = shp.position[0];
                            Menu.goodsCanvas.ctx.beginPath();
                            Menu.goodsCanvas.ctx.moveTo(
                                pos.x + shp.radius * Math.cos(shp.startAngle),
                                pos.y + shp.radius * Math.sin(shp.startAngle),
                            );
                            Menu.goodsCanvas.ctx.arc(
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
                            Menu.goodsCanvas.ctx.beginPath();
                            if (pos) {
                                Menu.goodsCanvas.ctx.moveTo(
                                    pos.x,
                                    pos.y,
                                );
                            }
                            pos = shp.position[1];
                            if (pos) {
                                Menu.goodsCanvas.ctx.lineTo(
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
                    Menu.goodsCanvas.ctx.fillStyle = shp.fillStyle;
                    Menu.goodsCanvas.ctx.fill();
                }
                if (shp.strokeStyle !== undefined) {
                    Menu.goodsCanvas.ctx.strokeStyle = shp.strokeStyle;
                    Menu.goodsCanvas.ctx.stroke();
                }
                Menu.goodsCanvas.ctx.closePath();
            }
        }
        requestAnimationFrame(() => Menu.render());
    }

    private static elements: {[key: string]: any} = {};
}
