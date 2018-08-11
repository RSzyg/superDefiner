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
        for (let i = 0; i < 64; i++) {
            Map.rectLeft[i] = new Shape();
        }
        for (let i = 0; i < 64; i++) {
            Map.rectRight[i] = new Shape();
        }
        for (let i = 0; i < 5; i++) {
            Map.rectMid[i] = new Shape();
        }
        for (let i = 0; i < 47; i++) {
            Map.line[i] = new Shape();
        }
    }

    public createMap() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                Map.rectLeft[i * 8 + j].saveRect(0 + j * 40, 480 + i * 40, 40, 40);
            }
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                Map.rectRight[i * 8 + j].saveRect(680 + j * 40, 480 + i * 40, 40, 40);
            }
        }

        for (let i = 0; i < 5; i++) {
                Map.rectMid[i].saveRect(400 + i * 40, 400, 40, 40);
        }

        for (let i = 0; i < 64; i++) {
            Map.rectLeft[i].saveFill("brown");
            this.addChild(Map.rectLeft[i]);
        }
        for (let i = 0; i < 64; i++) {
            Map.rectRight[i].saveFill("brown");
            this.addChild(Map.rectRight[i]);
        }
        for (let i = 0; i < 5; i++) {
            Map.rectMid[i].saveFill("brown");
            this.addChild(Map.rectMid[i]);
        }
        for (let i = 0; i < 21; i++) {
            Map.line[i].saveLine({x: 0, y: i * 40}, {x: 1000, y: i * 40});
            Map.line[i].saveStroke("rgba(0, 0, 0, 0.1)", 2);
            this.addChild(Map.line[i]);
        }
        for (let i = 0; i < 26; i++) {
            Map.line[i + 21].saveLine({x: i * 40, y: 0}, {x: i * 40, y: 800});
            Map.line[i + 21].saveStroke("rgba(0, 0, 0, 0.1)", 2);
            this.addChild(Map.line[i + 21]);
        }
        return this;
    }
}
