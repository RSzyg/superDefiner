import Camera from "./Camera";
import Container from "./Container";
import Map from "./Map";
import Shape from "./Shape";

export default class Role {
    public static id = 0;
    public roleId: number = Role.id;
    public width: number = 40;
    public height: number = 65;
    public head: Shape = new Shape();
    public body: Shape = new Shape();
    public leftHand: Shape = new Shape();
    public rightHand: Shape = new Shape();
    public leftFoot: Shape = new Shape();
    public rightFoot: Shape = new Shape();
    private selfx: number;
    private selfy: number;

    public create(x: number, y: number) {
        this.selfx = x;
        this.selfy = y;
        this.head.saveCircle(this.selfx * Map.blockWidth, this.selfy * Map.blockHeight + 25, 10);
        this.head.saveStroke("black", 2);
        this.body.saveLine(
            {x: this.selfx * Map.blockWidth, y: this.selfy * Map.blockHeight + 35},
            {x: this.selfx * Map.blockWidth, y: this.selfy * Map.blockHeight + 65},
        );
        this.body.saveStroke("black", 2);
        this.leftHand.saveLine(
            {x: this.selfx * Map.blockWidth, y: this.selfy * Map.blockHeight + 35},
            {x: this.selfx * Map.blockWidth - 20, y: this.selfy * Map.blockHeight + 50},
        );
        this.leftHand.saveStroke("black", 2);
        this.rightHand.saveLine(
            {x: this.selfx * Map.blockWidth, y: this.selfy * Map.blockHeight + 35},
            {x: this.selfx * Map.blockWidth + 20, y: this.selfy * Map.blockHeight + 50},
        );
        this.rightHand.saveStroke("black", 2);
        this.leftFoot.saveLine(
            {x: this.selfx * Map.blockWidth, y: this.selfy * Map.blockHeight + 65},
            {x: this.selfx * Map.blockWidth - 20, y: this.selfy * Map.blockHeight + 80},
        );
        this.leftFoot.saveStroke("black", 2);
        this.rightFoot.saveLine(
            {x: this.selfx * Map.blockWidth, y: this.selfy * Map.blockHeight + 65},
            {x: this.selfx * Map.blockWidth + 20, y: this.selfy * Map.blockHeight + 80},
        );
        this.rightFoot.saveStroke("black", 2);
        Container.addChild(this.head);
        Container.addChild(this.body);
        Container.addChild(this.leftHand);
        Container.addChild(this.rightHand);
        Container.addChild(this.leftFoot);
        Container.addChild(this.rightFoot);
        Role.id++;
    }

    get x() {
        return this.selfx;
    }

    set x(x: number) {
        this.selfx = x;
    }

    get y() {
        return this.selfy;
    }

    set y(y: number) {
        this.selfy = y;
    }
}
