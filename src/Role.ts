import Camera from "./Camera";
import Container from "./Container";
import Map from "./Map";
import Shape from "./Shape";

export default class Role {
    public static x: number;
    public static y: number;
    public static width: number = 40;
    public static height: number = 65;
    public static head: Shape = new Shape();
    public static body: Shape = new Shape();
    public static leftHand: Shape = new Shape();
    public static rightHand: Shape = new Shape();
    public static leftFoot: Shape = new Shape();
    public static rightFoot: Shape = new Shape();

    public static create(x: number, y: number) {
        this.head.saveCircle(x * Map.blockWidth, y * Map.blockHeight + 25, 10);
        this.head.saveStroke("black", 2);
        this.body.saveLine(
            {x: x * Map.blockWidth, y: y * Map.blockHeight + 35},
            {x: x * Map.blockWidth, y: y * Map.blockHeight + 65},
        );
        this.body.saveStroke("black", 2);
        this.leftHand.saveLine(
            {x: x * Map.blockWidth, y: y * Map.blockHeight + 35},
            {x: x * Map.blockWidth - 20, y: y * Map.blockHeight + 50},
        );
        this.leftHand.saveStroke("black", 2);
        this.rightHand.saveLine(
            {x: x * Map.blockWidth, y: y * Map.blockHeight + 35},
            {x: x * Map.blockWidth + 20, y: y * Map.blockHeight + 50},
        );
        this.rightHand.saveStroke("black", 2);
        this.leftFoot.saveLine(
            {x: x * Map.blockWidth, y: y * Map.blockHeight + 65},
            {x: x * Map.blockWidth - 20, y: y * Map.blockHeight + 80},
        );
        this.leftFoot.saveStroke("black", 2);
        this.rightFoot.saveLine(
            {x: x * Map.blockWidth, y: y * Map.blockHeight + 65},
            {x: x * Map.blockWidth + 20, y: y * Map.blockHeight + 80},
        );
        this.rightFoot.saveStroke("black", 2);
        Container.addChild(this.head);
        Container.addChild(this.body);
        Container.addChild(this.leftHand);
        Container.addChild(this.rightHand);
        Container.addChild(this.leftFoot);
        Container.addChild(this.rightFoot);
    }
}
