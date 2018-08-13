import Container from "../Container";
import Shape from "../Shape";

export default class Board extends Container {
    public static id: number;
    public uuid: string;
    public main: Shape;
    public texture: Shape[];
    public draggable: boolean;

    constructor() {
        super();
        Board.id = 0;
        this.draggable = false;
        this.main = new Shape();
        this.texture = [];
        this.addChild(this.main);
        for (let i = 0; i < 6; i++) {
            this.texture[i] = new Shape();
            this.addChild(this.texture[i]);
        }
    }

    public createBoard(x: number, y: number) {
        this.main.saveRect(x * 40, y * 40, 240, 80);
        this.main.saveFill("#EE7942");
        this.uuid = "Board" + Board.id;
        this.draggable = true;
        this.texture[0].saveArc(x * 40 + 180, y * 40 - 140, 150, 1.22, 1.93);
        this.texture[1].saveArc(x * 40 + 180, y * 40 - 130, 150, 1.16, 2.08);
        this.texture[2].saveArc(x * 40 + 180, y * 40 - 120, 150, 1.16, 2.21);
        this.texture[3].saveArc(x * 40 + 60, y * 40 + 200, 150, 10.59, 11.64);
        this.texture[4].saveArc(x * 40 + 60, y * 40 + 210, 150, 10.59, 11.51);
        this.texture[5].saveArc(x * 40 + 60, y * 40 + 220, 150, 10.63, 11.36);
        for (let i = 0; i < 6; i++) {
            this.texture[i].saveStroke("black", 2);
        }
        Board.id++;
    }

    public click(x: number, y: number) {
        if (
            x < (this.main.position[0].x + this.main.width) * Container.scale - Container.cameraX &&
            x > this.main.position[0].x * Container.scale - Container.cameraX
        ) {
            if (
                y < (this.main.position[0].y + this.main.height) * Container.scale - Container.cameraY &&
                y > this.main.position[0].y * Container.scale - Container.cameraY
            ) {
                if (this.draggable) {
                    return true;
                }
            }
        }
        return false;
    }

    get x(): number {
        if (this.main.position[0]) {
            return this.main.position[0].x * Container.scale - Container.cameraX;
        }
    }

    set x(x: number) {
        const disx = (x - this.x) / Container.scale;
        this.main.position[0].x = (x + Container.cameraX) / Container.scale;
        for (let i = 0; i < 6; i++) {
            this.texture[i].position[0].x += disx;
        }
    }

    get y(): number {
        if (this.main.position[0]) {
            return this.main.position[0].y * Container.scale - Container.cameraY;
        }
    }

    set y(y: number) {
        const disy = (y - this.y) / Container.scale;
        this.main.position[0].y = (y + Container.cameraY) / Container.scale;
        for (let i = 0; i < 6; i++) {
            this.texture[i].position[0].y += disy;
        }
    }
}
