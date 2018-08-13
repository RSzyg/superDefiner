import $ = require("jquery");

export default class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    constructor(width: number, height: number, zIndex: string, position: string) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.style.zIndex = zIndex;
        this.canvas.style.position = position;
        $("#display").append(this.canvas);
    }
}
