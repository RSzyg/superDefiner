import Map from "./Map";

export default class Main {
    private map: Map;

    constructor() {
        this.map = new Map();
    }
    public createScene() {
        this.map.createMap();
    }
}
