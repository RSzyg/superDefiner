import Camera from "./Camera";
import Container from "./Container";
import * as Goods from "./Goods";
import Map from "./Map";
import Menu from "./Menu";

export default class Main {
    private map: Map;
    private touched: boolean;
    private dragingGoods: any;
    private dragList: any[];
    private goodsList: any[];
    private pointerX: number;
    private pointerY: number;

    constructor() {
        this.map = new Map();
        this.dragList = [];
        this.touched = false;
        this.goodsList = [];
    }

    public createScene() {
        this.map.createMap();
        window.addEventListener("keydown", (event) => {this.menu(event); });
        Menu.goodCanvas.canvas.addEventListener("mousedown", (event) => {this.draggoodBefore(event); });
        Container.mainCanvas.canvas.addEventListener("mousedown", (event) => { this.dragBefore(event); });
        Container.mainCanvas.canvas.addEventListener("touchstart", (event) => { this.dragBefore(event); });
        Container.mainCanvas.canvas.addEventListener("mousemove", (event) => {
            if (this.dragingGoods !== undefined || this.touched) {
                this.dragMove(event);
            }
        });
        // Menu.goodCanvas.canvas.addEventListener("mousemove", (event) => {
        //     if (this.dragingGoods !== undefined || this.touched) {
        //         this.draggoodMove(event);
        //     }
        // });
        Container.mainCanvas.canvas.addEventListener("touchmove", (event) => {
            if (this.dragingGoods !== undefined || this.touched) {
                this.dragMove(event);
            }
        });
        Container.mainCanvas.canvas.addEventListener("mouseup", (event) => { this.dragEnd(event); });
        Menu.goodCanvas.canvas.addEventListener("mouseup", (event) => {this.dragEnd(event); });
        Container.mainCanvas.canvas.addEventListener("touchend", (event) => { this.dragEnd(event); });

        Container.mainCanvas.canvas.addEventListener("wheel", (event) => { this.zoom(event); });
    }

    private dragBefore(event: any) {
        this.touched = true;
        this.pointerX = event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
        this.pointerY = event.type === "mousedown" ? event.pageY : event.touches[0].pageY;
        for (const goods of this.dragList) {
            if (goods.click(this.pointerX, this.pointerY)) {
                this.dragingGoods = goods;
                return;
            }
        }
    }

    private draggoodBefore(event: any) {
        this.pointerX = event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
        this.pointerY = event.type === "mousedown" ? event.pageY : event.touches[0].pageY;
        Menu.goodCanvas.canvas.style.display = "none";
        const board = new Goods.Board();
        board.create((event.pageX - Camera.x) / Camera.scale / 40, (event.pageY - Camera.y) / Camera.scale / 40);
        board.addToContainer();
        this.dragList.push(board);
        this.dragingGoods = board;
        // this.touched = true;
        // this.pointerX = event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
        // this.pointerY = event.type === "mousedown" ? event.pageY : event.touches[0].pageY;
        // for (const good of this.goodsList) {
        //     if (good.menuclick(this.pointerX, this.pointerY)) {
        //         this.dragingGoods = good;
        //     }
        // }
        // this.goodsList.shift();
    }

    // private draggoodMove(event: any) {
    //     const x: number = event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
    //     const y: number = event.type === "mousemove" ? event.pageY : event.touches[0].pageY;
    //     if (this.dragingGoods !== undefined) {
    //         this.dragingGoods.x += (x - this.pointerX);
    //         this.dragingGoods.y += (y - this.pointerY);
    //         this.pointerX = x;
    //         this.pointerY = y;
    //     }
    // }
    private dragMove(event: any) {
        const x: number = event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
        const y: number = event.type === "mousemove" ? event.pageY : event.touches[0].pageY;
        if (this.dragingGoods !== undefined) {
            this.dragingGoods.x += (x - this.pointerX) / Camera.scale;
            this.dragingGoods.y += (y - this.pointerY) / Camera.scale;
            this.pointerX = x;
            this.pointerY = y;
        } else if (this.touched) {
            Camera.center = {
                x: Camera.center.x - (x - this.pointerX) / Camera.scale,
                y: Camera.center.y - (y - this.pointerY) / Camera.scale,
            };
            this.pointerX = x;
            this.pointerY = y;
        }
    }

    private dragEnd(event: any) {
        this.touched = false;
        this.dragingGoods = undefined;
    }

    private menu(event: any) {
        if (event.code === "KeyQ") {
            if (Menu.goodCanvas.canvas.style.display === "none") {
                Menu.goodCanvas.canvas.style.zIndex = "2";
                Menu.goodCanvas.canvas.style.display = "inline";
                Menu.Menurender();
                this.addin();
            } else {
                Menu.goodCanvas.canvas.style.display = "none";
                Menu.goodCanvas.canvas.style.zIndex = "0";
            }
        }
    }

    private addin() {
        this.goodsList.push(Menu.board);
    }

    private zoom(event: MouseWheelEvent) {
        if (event.deltaY > 0) {
            Camera.zoom(-0.1);
        } else if (event.deltaY < 0) {
            Camera.zoom(0.1);
        }
    }
}
