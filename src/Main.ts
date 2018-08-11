import Container from "./Container";
import * as Goods from "./Goods";
import Map from "./Map";

export default class Main {
    private map: Map;
    private dragingGoods: any;
    private dragList: any[];
    private pointerX: number;
    private pointerY: number;

    constructor() {
        this.map = new Map();
        this.dragList = [];
    }

    public createScene() {
        this.map.createMap();
        const board: Goods.Board = new Goods.Board();
        board.createBoard(1, 1);
        this.dragList.push(board);

        Container.zoom(-0.5);

        window.addEventListener("mousedown", (event) => { this.dragBefore(event); });
        window.addEventListener("touchstart", (event) => { this.dragBefore(event); });
        window.addEventListener("mousemove", (event) => {
            if (this.dragingGoods !== undefined) {
                this.dragMove(event);
            }
        });
        window.addEventListener("touchmove", (event) => {
            if (this.dragingGoods !== undefined) {
                this.dragMove(event);
            }
        });
        window.addEventListener("mouseup", (event) => { this.dragEnd(event); });
        window.addEventListener("touchend", (event) => { this.dragEnd(event); });
    }

    private dragBefore(event: any) {
        this.pointerX = event.type === "mousedown" ? event.clientX : event.touches[0].clientX;
        this.pointerY = event.type === "mousedown" ? event.clientY : event.touches[0].clientY;
        for (const goods of this.dragList) {
            if (goods.click(this.pointerX, this.pointerY)) {
                this.dragingGoods = goods;
            }
        }
    }

    private dragMove(event: any) {
        const x: number = event.type === "mousemove" ? event.clientX : event.touches[0].clientX;
        const y: number = event.type === "mousemove" ? event.clientY : event.touches[0].clientY;
        if (this.dragingGoods !== undefined) {
            this.dragingGoods.x += (x - this.pointerX);
            this.dragingGoods.y += (y - this.pointerY);
            this.pointerX = x;
            this.pointerY = y;
        }
    }

    private dragEnd(event: any) {
        this.dragingGoods = undefined;
    }
}
