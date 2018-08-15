import Camera from "./Camera";
import Container from "./Container";
import Map from "./Map";
import Shape from "./Shape";

export default class Role {
    public static id = 0;
    public width: number = 40;
    public height: number = 70;
    public headradius: number = 10;
    public neckheight: number = 5;
    public bodyheight: number = 35;
    public footheight: number = 15;
    public handheight: number = 15;
    public footwidth: number = 20;
    public handwidth: number = 20;
    public head: Shape = new Shape();
    public body: Shape = new Shape();
    public leftHand: Shape = new Shape();
    public rightHand: Shape = new Shape();
    public leftFoot: Shape = new Shape();
    public rightFoot: Shape = new Shape();
    public moveStep: number;
    private id: string;
    private selfx: number;
    private selfy: number;

    constructor(data: {[key: string]: number}) {
        this.selfx = data.x;
        this.selfy = data.y;
        this.moveStep = data.moveStep;
        this.create();
    }

    private create() {
        this.head.saveCircle(this.selfx + this.width / 2, this.selfy + this.headradius, this.headradius);
        this.head.saveStroke("black", 2);
        this.body.saveLine(
            {x: this.selfx + this.width / 2, y: this.selfy + 2 * this.headradius},
            {x: this.selfx + this.width / 2, y: this.selfy + 2 * this.headradius + this.bodyheight},
        );
        this.body.saveStroke("black", 2);
        this.leftHand.saveLine(
            {x: this.selfx + this.width / 2, y: this.selfy + 2 * this.headradius + this.neckheight},
            {x: this.selfx, y: this.selfy + 2 * this.headradius + this.handheight + this.neckheight},
        );
        this.leftHand.saveStroke("black", 2);
        this.rightHand.saveLine(
            {x: this.selfx + this.width / 2, y: this.selfy + 2 * this.headradius + this.neckheight},
            {x: this.selfx + this.width, y: this.selfy + 2 * this.headradius + this.handheight + this.neckheight},
        );
        this.rightHand.saveStroke("black", 2);
        this.leftFoot.saveLine(
            {x: this.selfx + this.width / 2, y: this.selfy + 2 * this.headradius + this.bodyheight},
            {x: this.selfx, y: this.selfy + 2 * this.headradius + this.bodyheight + this.footheight},
        );
        this.leftFoot.saveStroke("black", 2);
        this.rightFoot.saveLine(
            {x: this.selfx + this.width / 2, y: this.selfy + 2 * this.headradius + this.bodyheight},
            {x: this.selfx + this.width, y: this.selfy + 2 * this.headradius + this.bodyheight + this.footheight},
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

    private static get nextid(): number {
        return Role.id++;
    }

    get uuid(): string {
        return this.id;
    }

    get realX() {
        return this.selfx;
    }

    set realX(x: number) {
        const disx = x - this.selfx;
        this.selfx = x;
        this.head.position[0].x += disx;
        this.body.position[0].x += disx;
        this.body.position[1].x += disx;
        this.leftHand.position[0].x += disx;
        this.leftHand.position[1].x += disx;
        this.leftFoot.position[0].x += disx;
        this.leftFoot.position[1].x += disx;
        this.rightHand.position[0].x += disx;
        this.rightHand.position[1].x += disx;
        this.rightFoot.position[0].x += disx;
        this.rightFoot.position[1].x += disx;
    }

    get realY() {
        return this.selfy;
    }

    set realY(y: number) {
        const disy = y - this.selfy;
        this.selfy = y;
        this.head.position[0].y += disy;
        this.body.position[0].y += disy;
        this.body.position[1].y += disy;
        this.leftHand.position[0].y += disy;
        this.leftHand.position[1].y += disy;
        this.leftFoot.position[0].y += disy;
        this.leftFoot.position[1].y += disy;
        this.rightHand.position[0].y += disy;
        this.rightHand.position[1].y += disy;
        this.rightFoot.position[0].y += disy;
        this.rightFoot.position[1].y += disy;
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
