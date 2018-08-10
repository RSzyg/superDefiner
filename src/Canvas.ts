export default class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    constructor(height: number, width: number, top: number, left: number, zIndex: string) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.style.zIndex = zIndex;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = top + "px";
        this.canvas.style.left = left + "px";
        document.getElementById("display").appendChild(this.canvas);
    }
}
