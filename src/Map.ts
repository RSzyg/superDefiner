import Container from "./Container";
import Shape from "./Shape";

export default class Map extends Container {
    public static mainmap: number[][];
    public static rectLeft: Shape[];
    public static rectRight: Shape[];
    public static rectMid: Shape[];
    public static line: Shape[];
    constructor() {
        super();
        Map.rectLeft = [];
        Map.rectRight = [];
        Map.rectMid = [];
        Map.line = [];
        for (let i = 0; i < 100; i++) {
            Map.rectLeft[i] = new Shape();
        }
        for (let i = 0; i < 100; i++) {
            Map.rectRight[i] = new Shape();
        }
        for (let i = 0; i < 10; i++) {
            Map.rectMid[i] = new Shape();
        }
        for (let i = 0; i < 92; i++) {
            Map.line[i] = new Shape();
        }
    }

    public createMap() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                Map.rectLeft[i * 10 + j].saveRect(0 + j * 40, 1200 + i * 40, 40, 40);
            }
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                Map.rectRight[i * 10 + j].saveRect(1600 + j * 40, 1200 + i * 40, 40, 40);
            }
        }

        for (let i = 0; i < 10; i++) {
                Map.rectMid[i].saveRect(800 + i * 40, 1080, 40, 40);
        }

        for (let i = 0; i < 100; i++) {
            Map.rectLeft[i].saveFill("#8B0000");
            this.addChild(Map.rectLeft[i]);
        }
        for (let i = 0; i < 100; i++) {
            Map.rectRight[i].saveFill("#8B0000");
            this.addChild(Map.rectRight[i]);
        }
        for (let i = 0; i < 10; i++) {
            Map.rectMid[i].saveFill("#8B0000");
            this.addChild(Map.rectMid[i]);
        }
        for (let i = 0; i < 41; i++) {
            Map.line[i].saveLine({x: 0, y: i * 40}, {x: 2000, y: i * 40});
            Map.line[i].saveStroke("rgba(0, 0, 0, 0.1)", 2);
            this.addChild(Map.line[i]);
        }
        for (let i = 0; i < 51; i++) {
            Map.line[i + 41].saveLine({x: i * 40, y: 0}, {x: i * 40, y: 1600});
            Map.line[i + 41].saveStroke("rgba(0, 0, 0, 0.1)", 2);
            this.addChild(Map.line[i + 41]);
        }
        return this;
    }
}
