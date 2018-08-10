import * as Goods from "./Goods";
import Map from "./Map";

export default class Main {
    private map: Map;
    private board: Goods.Board;

    constructor() {
        this.map = new Map();
        this.board = new Goods.Board();
    }
    public createScene() {
        this.map.createMap();
        this.board.createBoard(1, 1);
    }
}
