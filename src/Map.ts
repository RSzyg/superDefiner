import Shape from "./Shape";
import Container from "./Container";

export default class Map extends Container {
    public static mainmap: number[][];
    public static rect: Array<{[key: string]: any}>;
    constructor() {
        super();
        for (let i = 0; i < 16; i++) {
            Map.rect[i] = new Shape();
        }
    }

    public createMap() {
        Map.rect[0].saveRect(80, 720, 40, 40);
        Map.rect[1].saveRect(120, 720, 40, 40);
        Map.rect[2].saveRect(80, 760, 40, 40);
        Map.rect[3].saveRect(120, 760, 40, 40);
        Map.rect[4].saveRect(840, 720, 40, 40);
        Map.rect[5].saveRect(880, 720, 40, 40);
        Map.rect[6].saveRect(840, 760, 40, 40);
        Map.rect[7].saveRect(880, 760, 40, 40);
        Map.rect[8].saveRect(200, 720, 40, 40);
        Map.rect[9].saveRect(280, 720, 40, 40);
        Map.rect[10].saveRect(360, 720, 40, 40);
        Map.rect[11].saveRect(440, 720, 40, 40);
        Map.rect[12].saveRect(520, 720, 40, 40);
        Map.rect[13].saveRect(600, 720, 40, 40);
        Map.rect[14].saveRect(680, 720, 40, 40);
        Map.rect[15].saveRect(760, 720, 40, 40);
        for (let i = 0; i < 16; i++) {
            Map.rect[i].saveFill("brown");
            Map.rect[i].addChild();
        }
    }
}
