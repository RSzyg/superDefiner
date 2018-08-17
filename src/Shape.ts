export default class Shape {

    public static id: number = 0;
    public type: string;
    public fillStyle: string;
    public strokeStyle: string;
    public lineWidth: number;
    public position: Array<{[key: string]: any}>;
    public width: number;
    public height: number;
    public radius: number;
    public startAngle: number;
    public endAngle: number;
    public display: boolean;
    private id: string;

    constructor() {
        this.display = true;
    }

    public saveRect(x: number, y: number, width: number, height: number) {
        this.type = "rect";
        this.id = this.type + Shape.nextid;
        this.position = [{ x, y }];
        this.width = width;
        this.height = height;
        return this;
    }

    public saveCircle(x: number, y: number, radius: number) {
        this.type = "circle";
        this.id = this.type + Shape.nextid;
        this.position = [{ x, y }];
        this.radius = radius;
        return this;
    }

    public saveArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        this.type = "arc";
        this.id = this.type + Shape.nextid;
        this.position = [{ x, y }];
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        return this;
    }

    public saveTriangle(p1: {[key: string]: any}, p2: {[key: string]: any}, p3: {[key: string]: any}) {
        this.type = "triangle";
        this.id = this.type + Shape.nextid;
        this.position = [p1, p2, p3];
        return this;
    }

    public saveLine(p1: {[key: string]: any}, p2: {[key: string]: any}) {
        this.type = "line";
        this.id = this.type + Shape.nextid;
        this.position = [p1, p2];
        return this;
    }

    public saveFill(fillStyle: string) {
        this.fillStyle = fillStyle;
        return this;
    }

    public saveStroke(strokeStyle: string, lineWidth: number) {
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        return this;
    }

    private static get nextid(): number {
        return Shape.id++;
    }

    get uuid(): string {
        return this.id;
    }
    get left() {
        return this.position[0].x;
    }
    get top() {
        return this.position[0].y;
    }
    get right() {
        return this.position[0].x + this.width - 1;
    }
    get bottom() {
        return this.position[0].y + this.height - 1;
    }
}
