import Canvas from "./Canvas";
import Goods from "./Goods";
// import * as Goods from "./Goods";
import Shape from "./Shape";

export default class Menu {

    public static goodsCanvas: Canvas;
    public static board: Goods;
    public static lurker: Goods;
    public static flagbegin: Goods;
    public static flagend: Goods;
    public static wood: Goods;

    public static create() {
        if (Menu.goodsCanvas === undefined) {
            Menu.goodsCanvas = new Canvas(600, 800, "0", "absolute");
            Menu.goodsCanvas.canvas.style.display = "none";
            Menu.goodsCanvas.canvas.style.backgroundColor = "#66ccff";
        }
        if (Menu.board === undefined) {
            Menu.board = new Goods(1, 1, "", 1, "board").addToMenu();
            Menu.goodsList[Menu.board.uuid] = Menu.board;
        }
        if (Menu.lurker === undefined) {
            Menu.lurker = new Goods(1, 4, "", 1, "lurker").addToMenu();
            Menu.goodsList[Menu.lurker.uuid] = Menu.lurker;
        }
        if (Menu.flagbegin === undefined) {
            Menu.flagbegin = new Goods(1, 7, "rgba(205, 0, 0, 1)", 1, "flag").addToMenu();
            Menu.goodsList[Menu.flagbegin.uuid] = Menu.flagbegin;
        }
        if (Menu.flagend === undefined) {
            Menu.flagend = new Goods(3, 7, "rgba(145,44,238,1)", 1, "flag").addToMenu();
            Menu.goodsList[Menu.flagend.uuid] = Menu.flagend;
        }
        if (Menu.wood === undefined ) {
            Menu.wood = new Goods(1, 16, "", 1, "wood").addToMenu();
            Menu.goodsList[Menu.wood.uuid] = Menu.wood;
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

    public static clickInMenu(x: number, y: number) {
        for (const id in Menu.goodsList) {
            if (Menu.goodsList[id]) {
                const good = Menu.goodsList[id];
                if (x > good.left && x < good.right) {
                    if (y > good.top && y < good.bottom) {
                        return good;
                    }
                }
            }
        }
        return undefined;
    }

    public static render() {
        Menu.goodsCanvas.canvas.height = Menu.goodsCanvas.canvas.height;
        for (const id in Menu.elements) {
            if (Menu.elements[id] && Menu.elements[id].display) {
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
    private static goodsList: {[key: string]: any} = {};
}
