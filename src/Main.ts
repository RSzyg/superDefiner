import Camera from "./Camera";
import Container from "./Container";
import Goods from "./Goods";
// import * as Goods from "./Goods";
import Map from "./Map";
import Menu from "./Menu";
import Role from "./Role";

export default class Main {
    private dirx: number[]; // left, up, right, down
    private diry: number[]; // left, up, right, down
    private keydown: {[key: string]: boolean};
    private keydownCount: {[key: string]: number};
    private keyupCount: {[key: string]: number};
    private roles: {[key: string]: Role};
    private selfId: string;
    private map: Map;
    private touched: boolean;
    private dragingGoods: any;
    private dragList: {[key: string]: any};
    private shadowList: {[key: string]: any};
    private pointerX: number;
    private pointerY: number;
    private gravity: number;
    private gameMode: string;

    constructor() {
        this.dirx = [-1, 0, 1, 0]; // left, up, right, down
        this.diry = [0, -1, 0, 1]; // left, up, right, down
        this.map = new Map();
        this.keydown = {};
        this.keydownCount = {};
        this.keyupCount = {};
        this.roles = {};
        this.dragList = {};
        this.shadowList = {};
        this.touched = false;
        this.gravity = -0.5;
        this.gameMode = "edit";
    }

    public createScene() {
        this.map.createMap(2000, 1600, 40, 40);
        this.createRole();

        Camera.centerX = this.roles[this.selfId].realX + this.roles[this.selfId].width / 2;
        Camera.centerY = this.roles[this.selfId].realY + this.roles[this.selfId].height / 2;
        Camera.checkRange();

        this.update();
        Menu.create();

        window.addEventListener("keydown", (event) => { this.keyboardController(event); });
        window.addEventListener("keyup", (event) => { this.keyboardController(event); });
        Menu.goodsCanvas.canvas.addEventListener("mousedown", (event) => {
            if (this.gameMode === "edit") {
                this.dragGoodsBefore(event);
            }
        });
        Container.mainCanvas.canvas.addEventListener("mousedown", (event) => {
            if (this.gameMode === "edit") {
                this.dragBefore(event);
            }
        });
        Container.mainCanvas.canvas.addEventListener("touchstart", (event) => {
            if (this.gameMode === "edit") {
                this.dragBefore(event);
            }
        });
        Container.mainCanvas.canvas.addEventListener("mousemove", (event) => {
            if (this.gameMode === "edit") {
                if (this.dragingGoods !== undefined || this.touched) {
                    this.dragMove(event);
                }
            }
        });
        Container.mainCanvas.canvas.addEventListener("touchmove", (event) => {
            if (this.gameMode === "edit") {
                if (this.dragingGoods !== undefined || this.touched) {
                    this.dragMove(event);
                }
            }
        });
        Container.mainCanvas.canvas.addEventListener("mouseup", (event) => {
            if (this.gameMode === "edit") {
                this.dragEnd(event);
            }
        });
        Menu.goodsCanvas.canvas.addEventListener("mouseup", (event) => {
            if (this.gameMode === "edit") {
                this.dragEnd(event);
            }
        });
        Container.mainCanvas.canvas.addEventListener("touchend", (event) => {
            if (this.gameMode === "edit") {
                this.dragEnd(event);
            }
        });

        Container.mainCanvas.canvas.addEventListener("wheel", (event) => { this.zoom(event); });
    }

    private createRole() {
        const role: Role = new Role({
            jumpPower: 12,
            moveStep: 4,
            x: 120,
            y: 1120,
        });
        this.roles[role.uuid] = role;
        this.selfId = role.uuid;
    }

    private update() {
        if (this.gameMode === "start") {
            Camera.centerX = this.roles[this.selfId].realX + this.roles[this.selfId].width / 2;
            Camera.centerY = this.roles[this.selfId].realY + this.roles[this.selfId].height / 2;
            Camera.checkRange();
        }

        if (this.roles[this.selfId].inAir) {
            this.freeFall(this.selfId);
            if (
                this.keydown.KeyW &&
                this.keyupCount.KeyW === 1 &&
                this.keydownCount.KeyW === this.keyupCount.KeyW
            ) {
                this.keyupCount.KeyW++;
                this.roles[this.selfId].startY = this.roles[this.selfId].realY;
                this.roles[this.selfId].initSpeed = this.roles[this.selfId].jumpPower;
                this.roles[this.selfId].startTime = Date.now();
            }

            const time = Date.now();
            if (
                this.keydown.KeyW &&
                time - this.roles[this.selfId].catchCD > 600 &&
                this.roles[this.selfId].catchDir !== null &&
                this.keydownCount.KeyW === this.keyupCount.KeyW
            ) {
                const dir = this.roles[this.selfId].catchDir;
                this.roles[this.selfId].catchDir = null;
                this.roles[this.selfId].catchCD = time;

                this.roles[this.selfId].realX += this.dirx[dir];
                if (this.collide(this.roles[this.selfId], true, dir)) {
                    this.roles[this.selfId].realX -= 40 * this.dirx[dir];
                    this.roles[this.selfId].startY = this.roles[this.selfId].realY;
                    this.roles[this.selfId].initSpeed = this.roles[this.selfId].jumpPower;
                    this.roles[this.selfId].startTime = Date.now();
                }
            }
        } else {
            this.roles[this.selfId].realY++;
            if (!this.collide(this.roles[this.selfId], false, 3)) {
                this.roles[this.selfId].inAir = true;
                this.roles[this.selfId].realY--;
                this.roles[this.selfId].startY = this.roles[this.selfId].realY;
                this.roles[this.selfId].startTime = Date.now();
                this.roles[this.selfId].initSpeed = 0;
            } else {
                this.roles[this.selfId].realY--;
            }
        }

        if (this.keydown.KeyA) {
            this.roleMove(this.selfId, 0);
        }
        if (this.keydown.KeyW) {
            if (!this.roles[this.selfId].inAir) {
                this.roles[this.selfId].inAir = true;
                this.roles[this.selfId].startY = this.roles[this.selfId].realY;
                this.roles[this.selfId].initSpeed = this.roles[this.selfId].jumpPower;
                this.roles[this.selfId].startTime = Date.now();
            }
        }

        if (this.keydown.KeyD) {
            this.roleMove(this.selfId, 2);
        }
        requestAnimationFrame(() => this.update());
    }

    private freeFall(id: string) {
        const time = Date.now();
        const dt = (time - this.roles[id].startTime) / (1000 / 60);
        const v0 = this.roles[id].initSpeed;
        const s0 = this.roles[id].startY;
        const g = this.gravity;

        this.roles[id].realY = +(s0 - (v0 * dt + g * dt * dt / 2)).toFixed(0);

        if (v0 + g * dt > 0) {
            if (this.collide(this.roles[id], true, 1)) {
                this.keyupCount.KeyW++;
            }
        } else {
            if (this.collide(this.roles[id], true, 3)) {
                this.keyupCount.KeyW = 0;
            }
        }
    }

    private keyboardController(event: KeyboardEvent) {
        if (event.type === "keydown") {
            this.keydown[event.code] = true;
            if (this.keydownCount[event.code] === undefined) {
                this.keydownCount[event.code] = 0;
            } else {
                this.keydownCount[event.code]++;
            }
            switch (event.code) {
                case "KeyQ":
                    if (this.gameMode === "edit") {
                        this.menuController();
                    }
                    break;
                case "KeyE":
                    if (this.gameMode === "edit") {
                        this.gameMode = "start";
                    } else if (this.gameMode === "start") {
                        this.gameMode = "edit";
                    }
                default:
                    break;
            }
        } else if (event.type === "keyup") {
            this.keydown[event.code] = false;
            if (this.keyupCount[event.code] === undefined) {
                this.keyupCount[event.code] = 0;
            } else {
                this.keyupCount[event.code]++;
            }
            this.keydownCount[event.code] = this.keyupCount[event.code] - 1;
        }
    }
    private roleMove(id: string, dir: number) {
        this.roles[id].realX += this.roles[id].moveStep * this.dirx[dir];

        if (this.collide(this.roles[id], true, dir)) {
            if (
                this.roles[id].inAir &&
                this.roles[id].catchDir === null &&
                Date.now() - this.roles[id].catchCD > 600
            ) {
                this.roles[id].catchDir = dir;
            }
        }
    }

    private dragBefore(event: any) {
        this.touched = true;
        this.pointerX = event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
        this.pointerY = event.type === "mousedown" ? event.pageY : event.touches[0].pageY;
        for (const id in this.dragList) {
            if (this.dragList[id]) {
                const goods = this.dragList[id];
                if (goods.clickInMap(this.pointerX, this.pointerY)) {
                    this.map.showGrid();
                    this.dragingGoods = goods;
                    return;
                }
            }
        }
    }

    private dragGoodsBefore(event: any) {
        this.pointerX = event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
        this.pointerY = event.type === "mousedown" ? event.pageY : event.touches[0].pageY;
        const good = Menu.clickInMenu(this.pointerX, this.pointerY);
        if (good.type) {
            this.createGoods(
                (this.pointerX + Camera.x) / Camera.scale / Map.blockWidth,
                (this.pointerY + Camera.y) / Camera.scale / Map.blockHeight,
                good.fillstyle,
                good.type,
            );
        }
    }

    private createGoods(x: number, y: number, fillstyle: string, type: string) {
        Menu.goodsCanvas.canvas.style.display = "none";
        this.map.showGrid();
        let fillstyleAlpha;
        if (fillstyle) {
            fillstyleAlpha = fillstyle === "rgba(205, 0, 0, 1)" ? "rgba(205, 0, 0, 0.4)" : "rgba(145,44,238,0.4)";
        }
        const good = new Goods(x, y, fillstyle, 1, type);
        const shadow = new Goods(x, y, fillstyleAlpha, 0.4, type);

        good.shadowId = shadow.uuid;
        shadow.addToContainer();
        good.addToContainer();

        this.dragList[good.uuid] = good;
        this.shadowList[shadow.uuid] = shadow;
        this.dragingGoods = good;
    }

    private dragMove(event: any) {
        const x: number = event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
        const y: number = event.type === "mousemove" ? event.pageY : event.touches[0].pageY;
        if (this.dragingGoods !== undefined) {
            this.dragingGoods.x += (x - this.pointerX);
            this.dragingGoods.y += (y - this.pointerY);
            const tempX = this.dragingGoods.realX;
            const tempY = this.dragingGoods.realY;

            this.collide(this.dragingGoods, true, null);

            const shadow = this.shadowList[this.dragingGoods.shadowId];
            const width = Map.blockWidth;
            const height = Map.blockHeight;

            const snx = +(this.dragingGoods.realX / width).toFixed(0) * width;
            const sny = +(this.dragingGoods.realY / height).toFixed(0) * height;

            shadow.x = snx * Camera.scale - Camera.x;
            shadow.y = sny * Camera.scale - Camera.y;

            this.dragingGoods.realX = tempX;
            this.dragingGoods.realY = tempY;

            this.pointerX = x;
            this.pointerY = y;
        } else if (this.touched) {
            Camera.centerX -= (x - this.pointerX) / Camera.scale;
            Camera.centerY -= (y - this.pointerY) / Camera.scale;
            this.pointerX = x;
            this.pointerY = y;
        }
    }

    private dragEnd(event: any) {
        this.map.hideGrid();
        if (this.dragingGoods) {
            const shadow = this.shadowList[this.dragingGoods.shadowId];
            if (this.collide(shadow, false, null)) {
                shadow.removeFromContainer();
                this.dragingGoods.removeFromContainer();
                delete this.shadowList[shadow.uuid];
                delete this.dragList[this.dragingGoods.uuid];
            } else {
                this.dragingGoods.x = shadow.realX * Camera.scale - Camera.x;
                this.dragingGoods.y = shadow.realY * Camera.scale - Camera.y;
            }
        }
        Camera.checkRange();
        this.touched = false;
        this.dragingGoods = undefined;
    }

    private menuController() {
        if (Menu.goodsCanvas.canvas.style.display === "none") {
            Menu.goodsCanvas.canvas.style.zIndex = "2";
            Menu.goodsCanvas.canvas.style.display = "inline";
            Menu.render();
        } else {
            Menu.goodsCanvas.canvas.style.display = "none";
            Menu.goodsCanvas.canvas.style.zIndex = "0";
        }
    }

    private collide(
        obj: {[key: string]: any | Role},
        correction: boolean, dir: number,
    ): boolean {
        let judgement: boolean = false;
        if (obj.realX <= 0) {
            obj.realX = 0;
        }
        if (obj.realY <= 0) {
            obj.realY = 0;
        }
        if (obj.realX + obj.width >= Map.width) {
            obj.realX = Map.width - obj.width - 1;
        }
        if (obj.realY + obj.height >= Map.height) {
            obj.realY = Map.height - obj.height - 1;
        }

        for (const id in this.dragList) {
            if (
                this.dragList[id] &&
                this.dragList[id].type !== "flag" &&
                id !== obj.uuid &&
                this.dragList[id].shadowId !== obj.uuid
            ) {
                const goods = this.dragList[id];
                if (this.collisionJudge (false, obj, goods, correction, dir)) {
                    judgement = true;
                    break;
                }
            }
        }
        for (const id in this.map.block) {
            if (
                this.map.block[id] &&
                id !== obj.uuid
            ) {
                const goods = this.map.block[id];
                if (this.collisionJudge (false, obj, goods, correction, dir)) {
                    judgement = true;
                    break;
                }
            }
        }
        for (const id in this.roles) {
            if (
                this.roles[id] &&
                id !== obj.uuid
            ) {
                const goods = this.roles[id];
                if (this.collisionJudge (false, obj, goods, correction, dir)) {
                    judgement = true;
                    break;
                }
            }
        }
        return judgement;
    }

    private collisionJudge(
        judgement: boolean,
        obj: {[key: string]: any | Role},
        goods: {[key: string]: any | Role},
        correction: boolean,
        dir: number,
    ): boolean {
        if (
            !(obj.left > goods.right ||
            obj.right < goods.left ||
            obj.top > goods.bottom ||
            obj.bottom < goods.top)
        ) {
            if (correction) {
                this.correct(obj, goods, dir);
            }
            judgement = true;
        }
        return judgement;
    }

    private correct(
        host: {[key: string]: any | Role},
        guest: {[key: string]: any | Role},
        dir: number,
    ) {
        const value = [
            host.left - guest.right - 1,
            host.top - guest.bottom - 1,
            host.right - guest.left + 1,
            host.bottom - guest.top + 1,
        ];
        if (dir === null) {
            let dx: number;
            let dy: number;
            if (host.top + host.height / 2 < guest.top + guest.height / 2) {
                dy = host.bottom - guest.top + 1;
            } else {
                dy = host.top - guest.bottom - 1;
            }

            if (host.left + host.width / 2 < guest.left + guest.height / 2) {
                dx = host.right - guest.left + 1;
            } else {
                dx = host.left - guest.right - 1;
            }

            if (Math.abs(dy) > Math.abs(dx)) {
                host.realX -= dx;
            } else {
                host.realY -= dy;
            }
        } else {
            host.realX -= (value[dir] * Math.abs(this.dirx[dir]));
            host.realY -= (value[dir] * Math.abs(this.diry[dir]));
        }
        if (dir === 1) {
            this.roles[this.selfId].startY = this.roles[this.selfId].realY;
            this.roles[this.selfId].startTime = Date.now();
            this.roles[this.selfId].initSpeed = -1;
        } else if (dir === 3) {
            if (host.inAir) {
                host.inAir = false;
            }
        }
    }

    private zoom(event: MouseWheelEvent) {
        if (event.deltaY > 0) {
            Camera.zoom(-0.1);
        } else if (event.deltaY < 0) {
            Camera.zoom(0.1);
        }
        Camera.checkRange();
    }

}
