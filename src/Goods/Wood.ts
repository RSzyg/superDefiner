import Camera from "../Camera";
import Container from "../Container";
import Map from "../Map";
import Menu from "../Menu";
import Shape from "../Shape";

export default class Wood {
    public static id: number = 0;
    public main: Shape;
    public draggable: boolean;
    public shadowId: string;
    private id: string;
    private widthCoef: number;
    private heightCoef: number;

    constructor(x: number, y: number, alpha: number) {
        this.draggable = false;
        this.main = new Shape();
        this.widthCoef = 12;
        this.heightCoef = 1;

        this.main.saveRect(
            x * Map.blockWidth,
            y * Map.blockHeight,
            this.widthCoef * Map.blockWidth,
            this.heightCoef * Map.blockHeight,
        );
        this.main.saveFill(`rgba(238, 121, 66, ${alpha})`);
        this.id = "Wood" + Wood.nextid;
        this.draggable = true;
    }

    public addToMenu() {
        Menu.addChild(this.main);
        return this;
    }

    public addToContainer() {
        Container.addChild(this.main);
        return this;
    }

    public removeFromContainer() {
        Container.removeChild(this.main.uuid);
        return this;
    }

    public clickInMap(x: number, y: number) {
        if (
            x < (this.main.position[0].x + this.main.width) * Camera.scale - Camera.x &&
            x > this.main.position[0].x * Camera.scale - Camera.x
        ) {
            if (
                y < (this.main.position[0].y + this.main.height) * Camera.scale - Camera.y &&
                y > this.main.position[0].y * Camera.scale - Camera.y
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
            x < this.main.position[0].x + this.main.width &&
            x > this.main.position[0].x
        ) {
            if (
                y < this.main.position[0].y + this.main.height &&
                y > this.main.position[0].y
            ) {
                if (this.draggable) {
                    return true;
                }
            }
        }
        return false;
    }

    private static get nextid(): number {
        return Wood.id++;
    }

    get uuid(): string {
        return this.id;
    }

    get x(): number {
        if (this.main.position[0]) {
            return this.main.position[0].x * Camera.scale - Camera.x;
        }
    }

    set x(x: number) {
        this.main.position[0].x = (x + Camera.x) / Camera.scale;
    }

    get realX(): number {
        if (this.main.position[0]) {
            return this.main.position[0].x;
        }
    }

    set realX(x: number) {
        if (this.main.position[0]) {
            this.main.position[0].x = x;
        }
    }

    get y(): number {
        if (this.main.position[0]) {
            return this.main.position[0].y * Camera.scale - Camera.y;
        }
    }

    set y(y: number) {
        this.main.position[0].y = (y + Camera.y) / Camera.scale;
    }

    get realY(): number {
        if (this.main.position[0]) {
            return this.main.position[0].y;
        }
    }

    set realY(y: number) {
        if (this.main.position[0]) {
            if (this.main.position[0]) {
                this.main.position[0].y = y;
            }
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
