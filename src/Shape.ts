export default class Shape {

    public type: string;
    public fillStyle: string;
    public strokeStyle: string;
    public lineWidth: number;
    public position: object[];
    public width: number;
    public height: number;
    public radius: number;

    public saveRect(x: number, y: number, width: number, height: number) {
        this.type = "rect";
        this.position = [{ x, y }];
        this.width = width;
        this.height = height;
    }

    public saveCircle(x: number, y: number, radius: number) {
        this.type = "circle";
        this.position = [{ x, y }];
        this.radius = radius;
    }

    public saveTriangle(p1: object, p2: object, p3: object) {
        this.position = [p1, p2, p3];
    }

    public saveFill(fillStyle: string) {
        this.fillStyle = fillStyle;
    }

    public saveStroke(strokeStyle: string, lineWidth: number) {
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }
}
