import Camera from "./Camera";
import Container from "./Container";
import * as Goods from "./Goods";
import Map from "./Map";
import Menu from "./Menu";
import Role from "./Role";

export default class Main {
    private dirx: number[]; // left, up, right, down
    private diry: number[]; // left, up, right, down
    private keydown: {[key: string]: boolean};
    private roles: {[key: string]: Role};
    private selfId: string;
    private map: Map;
    private touched: boolean;
    private dragingGoods: any;
    private dragList: {[key: string]: any};
    private shadowList: {[key: string]: any};
    private pointerX: number;
    private pointerY: number;
    private gameMode: string;

    constructor() {
        this.dirx = [-1, 0, 1, 0]; // left, up, right, down
        this.diry = [0, -1, 0, 1]; // left, up, right, down
        this.map = new Map();
        this.keydown = {};
        this.roles = {};
        this.dragList = {};
        this.shadowList = {};
        this.touched = false;
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
        const role: Role = new Role({ x: 120, y: 1120, moveStep: 5});
        this.roles[role.uuid] = role;
        this.selfId = role.uuid;
    }

    private update() {
        if (this.gameMode === "start") {
            Camera.centerX = this.roles[this.selfId].realX + this.roles[this.selfId].width / 2;
            Camera.centerY = this.roles[this.selfId].realY + this.roles[this.selfId].height / 2;
            Camera.checkRange();
        }

        if (this.keydown.KeyA) {
            this.roleMove(this.selfId, 0);
        }
        if (this.keydown.KeyW) {
            this.roleMove(this.selfId, 1);
        }
        if (this.keydown.KeyD) {
            this.roleMove(this.selfId, 2);
        }
        if (this.keydown.KeyS) {
            this.roleMove(this.selfId, 3);
        }
        requestAnimationFrame(() => this.update());
    }

    private keyboardController(event: KeyboardEvent) {
        if (event.type === "keydown") {
            this.keydown[event.code] = true;
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
        }

    }
    private roleMove(id: string, dir: number) {
        this.roles[id].realX += this.roles[id].moveStep * this.dirx[dir];
        this.roles[id].realY += this.roles[id].moveStep * this.diry[dir];

        this.collision(this.roles[id], true, dir);
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
        if (Menu.board.clickInMenu(this.pointerX, this.pointerY)) {
            Menu.goodsCanvas.canvas.style.display = "none";
            this.map.showGrid();
            const board = new Goods.Board(
                (this.pointerX + Camera.x) / Camera.scale / Map.blockWidth,
                (this.pointerY + Camera.y) / Camera.scale / Map.blockHeight,
                1,
            );
            const shadow = new Goods.Board(
                +(board.realX / Map.blockWidth).toFixed(0),
                +(board.realY / Map.blockHeight).toFixed(0),
                0.4,
            );

            board.shadowId = shadow.uuid;
            shadow.addToContainer();
            board.addToContainer();

            this.dragList[board.uuid] = board;
            this.shadowList[shadow.uuid] = shadow;
            this.dragingGoods = board;
        }
    }

    private dragMove(event: any) {
        const x: number = event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
        const y: number = event.type === "mousemove" ? event.pageY : event.touches[0].pageY;
        if (this.dragingGoods !== undefined) {
            this.dragingGoods.x += (x - this.pointerX);
            this.dragingGoods.y += (y - this.pointerY);

            if (!this.collision(this.dragingGoods, false, null)) {
                const shadow = this.shadowList[this.dragingGoods.shadowId];
                const width = Map.blockWidth;
                const height = Map.blockHeight;

                const snx = +(this.dragingGoods.realX / width).toFixed(0) * width;
                const sny = +(this.dragingGoods.realY / height).toFixed(0) * height;

                shadow.x = snx * Camera.scale - Camera.x;
                shadow.y = sny * Camera.scale - Camera.y;
            }

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
            if (this.collision(shadow, false, null)) {
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

    private collision(obj: {[key: string]: any | Role}, correction: boolean, dir: number): boolean {
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
                id !== obj.uuid &&
                this.dragList[id].shadowId !== obj.uuid
            ) {
                const goods = this.dragList[id];
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
                    break;
                }
            }
        }
        for (const id in this.map.block) {
            if (
                this.map.block[id] &&
                id !== obj.uuid
            ) {
                const block = this.map.block[id];
                if (
                    !(obj.left > block.right ||
                    obj.right < block.left ||
                    obj.top > block.bottom ||
                    obj.bottom < block.top)
                ) {
                    if (correction) {
                        this.correct(obj, block, dir);
                    }
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
                const role = this.roles[id];
                if (
                    !(obj.left > role.right ||
                    obj.right < role.left ||
                    obj.top > role.bottom ||
                    obj.bottom < role.top)
                ) {
                    if (correction) {
                        this.correct(obj, role, dir);
                    }
                    judgement = true;
                    break;
                }
            }
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
        host.realX -= (value[dir] * Math.abs(this.dirx[dir]));
        host.realY -= (value[dir] * Math.abs(this.diry[dir]));
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
