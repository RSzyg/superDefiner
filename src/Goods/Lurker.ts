import Camera from "../Camera";
import Container from "../Container";
import Map from "../Map";
import Menu from "../Menu";
import Shape from "../Shape";

export default class Lurker {
    public static id: number = 0;
    public main: Shape;
    public triangle: Shape[];
    public draggable: boolean;
    public shadowId: string;
    private id: string;
    private widthCoef: number;
    private heightCoef: number;
    private lurkerheight: number;
    private lurkerwidth: number;

    constructor(x: number, y: number, alpha: number) {
        this.draggable = true;
        this.widthCoef = 6;
        this.heightCoef = 1;
        this.lurkerheight = Map.blockHeight;
        this.lurkerwidth = this.widthCoef * Map.blockWidth / 2;
        this.triangle = [];
        this.main = new Shape();
        for (let i = 0; i < this.widthCoef; i++) {
            this.triangle[i] = new Shape();
        }

        this.main.saveRect(x * Map.blockWidth, (y + 1 / 2) * Map.blockHeight, this.lurkerwidth, this.lurkerheight / 2);
        this.main.saveFill(`rgba(139,90,43,${alpha})`);

        this.triangle[0].saveTriangle(
            { x: x * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 1 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 1 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.triangle[1].saveTriangle(
            { x: (x + 1 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 3 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 1) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.triangle[2].saveTriangle(
            { x: (x + 1) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 5 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 3 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.triangle[3].saveTriangle(
            { x: (x + 3 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 7 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.triangle[4].saveTriangle(
            { x: (x + 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 9 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 5 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.triangle[5].saveTriangle(
            { x: (x + 5 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 11 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 3) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        for (let i = 0; i < this.widthCoef; i++) {
            this.triangle[i].saveFill(`rgba(139,90,43,${alpha})`);
        }
        this.id = "Lurker" + Lurker.nextid;
    }

    private static get nextid(): number {
        return Lurker.id++;
    }

    public addToMenu() {
        Menu.addChild(this.main);
        for (let i = 0; i < this.widthCoef; i++) {
            Menu.addChild(this.triangle[i]);
        }
        return this;
    }

    public addToContainer() {
        Container.addChild(this.main);
        for (let i = 0; i < this.widthCoef; i++) {
            Container.addChild(this.triangle[i]);
        }
        return this;
    }

    public removeFromContainer() {
        Container.removeChild(this.main.uuid);
        for (let i = 0; i < this.widthCoef; i++) {
            Container.removeChild(this.triangle[i].uuid);
        }
        return this;
    }

    public clickInMap(x: number, y: number) {
        if (
            x < (this.triangle[0].position[0].x + this.lurkerwidth) * Camera.scale - Camera.x &&
            x > this.triangle[0].position[0].x * Camera.scale - Camera.x
        ) {
            if (
                y < (this.triangle[0].position[0].y + this.main.height) * Camera.scale - Camera.y &&
                y > (this.triangle[0].position[0].y - this.lurkerheight / 2) * Camera.scale - Camera.y
            ) {
                if (this.draggable) {
                    return true;
                }
            }
        }
        return false;
    }

    public clickInMenu(x: number, y: number) {
        if (
            x < this.triangle[0].position[0].x + this.lurkerwidth &&
            x > this.triangle[0].position[0].x
        ) {
            if (
                y < this.triangle[0].position[0].y + this.main.height &&
                y > this.triangle[0].position[0].y - this.lurkerheight / 2
            ) {
                if (this.draggable) {
                    return true;
                }
            }
        }
        return false;
    }

    get uuid() {
        return this.id;
    }

    get x() {
        // if (this.triangle[0]) {
            return this.main.position[0].x * Camera.scale - Camera.x;
        // }
    }

    set x(x: number) {
        const disx = (x - this.x) / Camera.scale;
        this.main.position[0].x += disx;
        // this.main.position[0].x = (x + Camera.x) / Camera.scale;
        for (let i = 0; i < this.widthCoef; i++) {
            for (let j = 0; j < 3; j++) {
                this.triangle[i].position[j].x += disx;
            }
        }
    }

    get realX() {
        // if (this.triangle[0]) {
            return this.main.position[0].x;
        // }
    }

    set realX(x: number) {
        // if (this.triangle[0]) {
            const disx = x - this.realX;
            this.main.position[0].x += disx;
            for (let i = 0; i < this.widthCoef; i++) {
                for (let j = 0; j < 3; j++) {
                    this.triangle[i].position[j].x += disx;
                }
            }
        // }
    }

    get y() {
        // if (this.triangle[0]) {
            return (this.main.position[0].y - this.lurkerheight / 2) * Camera.scale - Camera.y;
        // }
    }

    set y(y: number) {
        const disy = (y - this.y) / Camera.scale;
        this.main.position[0].y += disy;
        for (let i = 0; i < this.widthCoef; i++) {
            for (let j = 0; j < 3; j++) {
                this.triangle[i].position[j].y += disy;
            }
        }
    }

    get realY() {
        // if (this.triangle[0]) {
            return this.main.position[0].y - this.lurkerheight / 2;
        // }
    }

    set realY(y: number) {
        // if (this.triangle[0]) {
            const disy = y - this.realY;
            this.main.position[0].y += disy;
            for (let i = 0; i < this.widthCoef; i++) {
                for (let j = 0; j < 3; j++) {
                    this.triangle[i].position[j].y += disy;
                }
            }
        // }
    }

    get width() {
        return this.lurkerwidth;
    }

    get height() {
        return this.lurkerheight;
    }

    get top() {
        return this.realY;
    }

    get left() {
        return this.realX;
    }

    get right() {
        return this.realX + this.lurkerwidth - 1;
    }

    get bottom() {
        return this.realY + this.lurkerheight - 1;
    }
}
