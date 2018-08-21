// import Camera from "./Camera";
import Container from "./Container";
// import Map from "./Map";
import Shape from "./Shape";

export default class Role {
    public static id = 0;
    public type: string;
    public width: number = 40;
    public height: number = 70;
    public headradius: number = Math.floor(1 / 7 * this.height);
    public neckheight: number = Math.floor(1 / 14 * this.height);
    public bodyheight: number = Math.floor(1 / 2 * this.height);
    public footheight: number = Math.floor(3 / 14 * this.height);
    public handheight: number = Math.floor(3 / 14 * this.height);
    public footwidth: number = Math.floor(1 / 2 * this.width);
    public handwidth: number = Math.floor(1 / 2 * this.width);
    public head: Shape = new Shape();
    public body: Shape = new Shape();
    public leftHand: Shape = new Shape();
    public rightHand: Shape = new Shape();
    public leftFoot: Shape = new Shape();
    public rightFoot: Shape = new Shape();

    public jumpPower: number;
    public initSpeed: number;
    public moveStep: number;
    public startTime: number;
    public startY: number;
    public catchDir: number;
    public catchCD: number;
    public runCD: number;
    public inAir: boolean;
    private id: string;
    private selfx: number;
    private selfy: number;

    constructor(data: {[key: string]: number}) {
        this.type = "role";
        this.selfx = data.x;
        this.selfy = data.y;
        this.initSpeed = this.jumpPower = data.jumpPower;
        this.moveStep = data.moveStep;
        this.startTime = null;
        this.startY = null;
        this.catchDir = null;
        this.catchCD = 0;
        this.inAir = false;
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
        this.id = "role" + Role.nextid;
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
