import Camera from "../Camera";
import Container from "../Container";
import Map from "../Map";
import Menu from "../Menu";
import Shape from "../Shape";

export default class Flag {
    public static id: number;
    public draggable: boolean;
    public flag: Shape;
    public flagpole: Shape;
    public shadowId: string;
    private heightCoef: number;
    private widthCoef: number;
    private id: string;

    constructor(x: number, y: number, fillstyle: string) {
        this.draggable = true;
        this.heightCoef = 2;
        this.widthCoef = 1.2;
        this.flag = new Shape();
        this.flagpole = new Shape();
        this.id = "Flag" + Flag.nextid;
        this.flag.saveTriangle(
            { x: x * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + this.widthCoef) * Map.blockWidth, y: (y + 1 / 4) * Map.blockHeight },
            { x: x * Map.blockWidth, y: (y + 1) * Map.blockHeight },
        );
        this.flag.saveFill(fillstyle);
        this.flag.saveStroke("black", 1);
        this.flagpole.saveLine(
            { x: x * Map.blockWidth, y: (y + 1) * Map.blockHeight },
            { x: x * Map.blockWidth, y: (y + 2) * Map.blockHeight},
        );
        this.flagpole.saveStroke("black", 2);
    }

    public addToMenu() {
        Menu.addChild(this.flag);
        Menu.addChild(this.flagpole);
        return this;
    }

    public addToContainer() {
        Container.addChild(this.flag);
        Container.addChild(this.flagpole);
        return this;
    }

    public removeFromContainer() {
        Container.removeChild(this.flag.uuid);
        Container.removeChild(this.flagpole.uuid);
        return this;
    }

    public clickInMenu(x: number, y: number) {
        if (
            x < this.flag.position[0].x + this.widthCoef * Map.blockWidth &&
            x > this.flag.position[0].x
        ) {
            if (
                y < this.flag.position[0].y + this.heightCoef * Map.blockHeight &&
                y > this.flag.position[0].y
            ) {
                if (this.draggable) {
                    return true;
                }
            }
        }
        return false;
    }

    public clickInMap(x: number, y: number) {
        if (
            x < (this.flag.position[0].x + this.widthCoef * Map.blockWidth) * Camera.scale - Camera.x &&
            x > this.flag.position[0].x * Camera.scale - Camera.x
        ) {
            if (
                y < (this.flag.position[0].y + this.heightCoef * Map.blockHeight) * Camera.scale - Camera.y &&
                y > this.flag.position[0].y * Camera.scale - Camera.y
            ) {
                if (this.draggable) {
                    return true;
                }
            }
        }
        return false;
    }

    private static get nextid() {
        return Flag.id++;
    }

    get uuid() {
        return this.id;
    }

    get x() {
        return this.flag.position[0].x * Camera.scale - Camera.x;
    }

    set x(x: number) {
        const disx = (x - this.x) / Camera.scale;
        this.flag.position[0].x = (x + Camera.x) / Camera.scale;
        for (let i = 0; i < 3; i++) {
            this.flag.position[0].x += disx;
        }
    }

    get realX() {
        return this.flag.position[0].x;
    }

    set realX(x: number) {
        const disx = x - this.flag.position[0].x;
        this.flag.position[0].x = x;
        for (let i = 0; i < 3; i++) {
            this.flag.position[0].x += disx;
        }
    }

    get y() {
        return this.flag.position[0].y * Camera.scale - Camera.y;
    }

    set y(y: number) {
        const disy = (y - this.y) / Camera.scale;
        this.flag.position[0].y = (y + Camera.y) / Camera.scale;
        for (let i = 0; i < 3; i++) {
            this.flag.position[0].y += disy;
        }
    }

    get realY() {
        return this.flag.position[0].y;
    }

    set realY(y: number) {
        const disy = y - this.flag.position[0].y;
        this.flag.position[0].y = y;
        for (let i = 0; i < 3; i++) {
            this.flag.position[0].y += disy;
        }
    }

    get width(): number {
        return this.widthCoef * Map.blockWidth;
    }

    get height(): number {
        return this.heightCoef * Map.blockHeight;
    }

    get left(): number {
        return this.realX;
    }

    get right(): number {
        return this.realX + this.width - 1;
    }

    get top(): number {
        return this.realY;
    }

    get bottom(): number {
        return this.realY + this.height - 1;
    }
}
