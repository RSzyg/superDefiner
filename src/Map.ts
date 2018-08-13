import Container from "./Container";
import Shape from "./Shape";

export default class Map extends Container {
    public static mainmap: string[];
    public static rect: Shape[];
    public static line: Shape[];
    constructor() {
        super();
        Map.rect = [];
        for ( let i = 0; i < 210; i++) {
            Map.rect[i] = new Shape();
        }
        Map.line = [];
        for (let i = 0; i < 92; i++) {
            Map.line[i] = new Shape();
        }
        Map.mainmap = [
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000111111111100000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "00000000000000000000000000000000000000000000000000",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
            "11111111110000000000000000000000000000001111111111",
        ];
    }

    public createMap() {
        for ( let i = 0, k = 0; i < 40; i++) {
            for ( let j = 0; j < 50; j++) {
                if (Map.mainmap[i][j] === "1") {
                    Map.rect[k].saveRect(j * 40, i * 40, 40, 40);
                    Map.rect[k].saveFill("#8B0000");
                    this.addChild(Map.rect[k++]);
                }
            }
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
