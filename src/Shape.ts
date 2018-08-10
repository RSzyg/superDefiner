export default class Shape {

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

    public saveRect(x: number, y: number, width: number, height: number) {
        this.type = "rect";
        this.position = [{ x, y }];
        this.width = width;
        this.height = height;
        return this;
    }

    public saveCircle(x: number, y: number, radius: number) {
        this.type = "circle";
        this.position = [{ x, y }];
        this.radius = radius;
        return this;
    }

    public saveArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        this.type = "arc";
        this.position = [{ x, y }];
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        return this;
    }

    public saveTriangle(p1: {[key: string]: any}, p2: {[key: string]: any}, p3: {[key: string]: any}) {
        this.type = "triangle";
        this.position = [p1, p2, p3];
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
}
