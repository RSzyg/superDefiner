import Camera from "./Camera";
import Container from "./Container";
import Map from "./Map";
import Menu from "./Menu";
import Shape from "./Shape";

export default class Goods {
    public static id: number = 0;
    public type: string;
    public children: Shape[];
    public draggable: boolean;
    public shadowId: string;
    public fillstyle: string;
    private id: string;
    private widthCoef: number;
    private heightCoef: number;
    private shapeNumber: number;
    private selfWidth: number;
    private selfHeight: number;
    private selfX: number;
    private selfY: number;

    constructor(x: number, y: number, fillstyle: string, alpha: number, type: string) {
        this.draggable = true;
        this.fillstyle = fillstyle;
        this.type = type;
        switch (type) {
            case "board":
                this.createBoard(x, y, fillstyle, alpha);
                break;
            case "lurker":
                this.createLurker(x, y, fillstyle, alpha);
                break;
            case "flag":
                this.createFlag(x, y, fillstyle, alpha);
                break;
            case "wood":
                this.createWood(x, y, fillstyle, alpha);
                break;
            default:
                break;
        }
        return this;
    }

    public createBoard(x: number, y: number, fillstyle: string, alpha: number) {
        this.children = [];
        this.widthCoef = 6;
        this.heightCoef = 2;
        this.shapeNumber = 7;
        this.selfWidth = this.widthCoef * Map.blockWidth;
        this.selfHeight = this.heightCoef * Map.blockHeight;
        this.selfX = x * Map.blockWidth;
        this.selfY = y * Map.blockHeight;

        for (let i = 1; i < this.shapeNumber; i++) {
            this.children[i] = new Shape();
            this.children[i].saveStroke(`rgba(0, 0, 0, ${alpha})`, 2);
        }
        this.children[0] = new Shape();
        this.children[0].saveRect(
            x * Map.blockWidth,
            y * Map.blockHeight,
            this.widthCoef * Map.blockWidth,
            this.heightCoef * Map.blockHeight,
        );
        this.children[0].saveFill(`rgba(238, 121, 66, ${alpha})`);
        this.children[1].saveArc(x * Map.blockWidth + 180, y * Map.blockHeight - 140, 150, 1.22, 1.93);
        this.children[2].saveArc(x * Map.blockWidth + 180, y * Map.blockHeight - 130, 150, 1.16, 2.08);
        this.children[3].saveArc(x * Map.blockWidth + 180, y * Map.blockHeight - 120, 150, 1.16, 2.21);
        this.children[4].saveArc(x * Map.blockWidth + 60, y * Map.blockHeight + 200, 150, 10.59, 11.64);
        this.children[5].saveArc(x * Map.blockWidth + 60, y * Map.blockHeight + 210, 150, 10.59, 11.51);
        this.children[6].saveArc(x * Map.blockWidth + 60, y * Map.blockHeight + 220, 150, 10.63, 11.36);
        this.id = "Board" + Goods.nextid;
        return this;
    }

    public createLurker(x: number, y: number, fillstyle: string, alpha: number) {
        this.widthCoef = 6;
        this.heightCoef = 1;
        this.shapeNumber = 7;
        this.selfHeight = this.heightCoef * Map.blockHeight;
        this.selfWidth = this.widthCoef * Map.blockWidth / 2;
        this.selfX = x * Map.blockWidth;
        this.selfY = y  * Map.blockHeight;
        this.children = [];

        this.children[0] = new Shape();
        for (let i = 1; i < this.shapeNumber; i++) {
            this.children[i] = new Shape();
        }

        this.children[0].saveRect(
            x * Map.blockWidth, (y + 1 / 2) * Map.blockHeight,
            this.selfWidth,
            this.selfHeight / 2,
        );

        this.children[1].saveTriangle(
            { x: x * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 1 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 1 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.children[2].saveTriangle(
            { x: (x + 1 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 3 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 1) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.children[3].saveTriangle(
            { x: (x + 1) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 5 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 3 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.children[4].saveTriangle(
            { x: (x + 3 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 7 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.children[5].saveTriangle(
            { x: (x + 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 9 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 5 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        this.children[6].saveTriangle(
            { x: (x + 5 / 2) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
            { x: (x + 11 / 4) * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + 3) * Map.blockWidth, y: (y + 1 / 2) * Map.blockHeight },
        );
        for (let i = 0; i < this.widthCoef + 1; i++) {
            this.children[i].saveFill(`rgba(139,90,43,${alpha})`);
        }
        this.id = "Lurker" + Goods.nextid;
        return this;
    }

    public createFlag(x: number, y: number, fillstyle: string, alpha: number) {
        this.heightCoef = 2;
        this.widthCoef = 1;
        this.shapeNumber = 2;
        this.selfHeight = this.heightCoef * Map.blockHeight;
        this.selfWidth = this.widthCoef * Map.blockWidth;
        this.selfX = x * Map.blockWidth;
        this.selfY = y * Map.blockHeight;
        this.children = [];

        for (let i = 0; i < this.shapeNumber; i++) {
            this.children[i] = new Shape();
        }

        this.children[0].saveTriangle(
            { x: x * Map.blockWidth, y: y * Map.blockHeight },
            { x: (x + this.widthCoef) * Map.blockWidth, y: y * Map.blockHeight },
            { x: x * Map.blockWidth, y: (y + 1) * Map.blockHeight },
        );
        this.children[0].saveFill(fillstyle);
        this.children[0].saveStroke("black", 1);
        this.children[1].saveLine(
            { x: x * Map.blockWidth, y: (y + 1) * Map.blockHeight },
            { x: x * Map.blockWidth, y: (y + 2) * Map.blockHeight},
        );
        this.children[1].saveStroke("black", 2);
        this.id = "Flag" + Goods.nextid;
        return this;
    }

    public createWood(x: number, y: number, fillstyle: string, alpha: number) {
        this.children = [];
        this.widthCoef = 12;
        this.heightCoef = 1;
        this.shapeNumber = 1;
        this.selfHeight = this.heightCoef * Map.blockHeight;
        this.selfWidth = this.widthCoef * Map.blockWidth;
        this.selfX = x * Map.blockWidth;
        this.selfY = y * Map.blockHeight;
        this.children[0] = new Shape();

        this.children[0].saveRect(
            x * Map.blockWidth,
            y * Map.blockHeight,
            this.widthCoef * Map.blockWidth,
            this.heightCoef * Map.blockHeight,
        );
        this.children[0].saveFill(`rgba(238, 121, 66, ${alpha})`);
        this.id = "Wood" + Goods.nextid;
        return this;
    }

    public addToContainer() {
        for (let i = 0; i < this.shapeNumber; i++) {
            Container.addChild(this.children[i]);
        }
        return this;
    }

    public addToMenu() {
        for (let i = 0; i < this.shapeNumber; i++) {
            Menu.addChild(this.children[i]);
        }
        return this;
    }

    public removeFromContainer() {
        for (let i = 0; i < this.shapeNumber; i++) {
            Container.removeChild(this.children[i].uuid);
        }
    }

    public clickInMap(x: number, y: number) {
        if (
            x < (this.realX + this.selfWidth) * Camera.scale - Camera.x &&
            x > this.realX * Camera.scale - Camera.x
        ) {
            if (
                y < (this.realY + this.selfHeight) * Camera.scale - Camera.y &&
                y > this.realY * Camera.scale - Camera.y
            ) {
                if (this.draggable) {
                    return true;
                }
            }
        }
        return false;
    }

    private static get nextid(): number {
        return Goods.id++;
    }

    get uuid() {
        return this.id;
    }

    set uuid(id: string) {
        this.id = id;
    }
    get x() {
        return this.selfX * Camera.scale - Camera.x;
    }

    set x(x: number) {
        const disx = (x - this.x) / Camera.scale;
        this.selfX = (x + Camera.x) / Camera.scale;
        for (let i = 0; i < this.shapeNumber; i++) {
            if (this.children[i].position[2]) {
                for (let j = 0; j < 3; j++) {
                    this.children[i].position[j].x += disx;
                }
            } else if (this.children[i].position[1]) {
                for (let j = 0; j < 2; j++) {
                    this.children[i].position[j].x += disx;
                }
            } else {
                this.children[i].position[0].x += disx;
            }
        }
    }

    get y() {
        return this.selfY * Camera.scale - Camera.y;
    }

    set y(y: number) {
        const disy = (y - this.y) / Camera.scale;
        this.selfY = (y + Camera.y) / Camera.scale;
        for (let i = 0; i < this.shapeNumber; i++) {
            if (this.children[i].position[2]) {
                for (let j = 0; j < 3; j++) {
                    this.children[i].position[j].y += disy;
                }
            } else if (this.children[i].position[1]) {
                for (let j = 0; j < 2; j++) {
                    this.children[i].position[j].y += disy;
                }
            } else {
                this.children[i].position[0].y += disy;
            }
        }
    }

    get realX() {
        return this.selfX;
    }
    set realX(x: number) {
        const disx = x - this.realX;
        this.selfX = x;
        for (let i = 0; i < this.shapeNumber; i++) {
            if (this.children[i].position[2]) {
                for (let j = 0; j < 3; j++) {
                    this.children[i].position[j].x += disx;
                }
            } else if (this.children[i].position[1]) {
                for (let j = 0; j < 2; j++) {
                    this.children[i].position[j].x += disx;
                }
            } else {
                this.children[i].position[0].x += disx;
            }
        }
    }

    get realY() {
        return this.selfY;
    }

    set realY(y: number) {
        const disy = y - this.realY;
        this.selfY = y;
        for (let i = 0; i < this.shapeNumber; i++) {
            if (this.children[i].position[2]) {
                for (let j = 0; j < 3; j++) {
                    this.children[i].position[j].y += disy;
                }
            } else if (this.children[i].position[1]) {
                for (let j = 0; j < 2; j++) {
                    this.children[i].position[j].y += disy;
                }
            } else {
                this.children[i].position[0].y += disy;
            }
        }
    }

    get top() {
        return this.realY;
    }

    get bottom() {
        return this.realY + this.selfHeight - 1;
    }

    get left() {
        return this.realX;
    }

    get right() {
        return this.realX + this.selfWidth - 1;
    }

    get height() {
        return this.selfHeight;
    }

    get width() {
        return this.selfWidth;
    }
}
