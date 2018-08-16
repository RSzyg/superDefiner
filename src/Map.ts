import Container from "./Container";
import Shape from "./Shape";

export default class Map {
    public static width: number;
    public static height: number;
    public static blockWidth: number;
    public static blockHeight: number;
    public block: { [key: string]: Shape } = {};
    public grid: { [key: string]: Shape } = {};

    public createMap(width: number, height: number, blockWidth: number, blockHeight: number) {
        Map.width = width;
        Map.height = height;
        Map.blockWidth = blockWidth;
        Map.blockHeight = blockHeight;
        for (let i = 30; i < 40; i++) {
            for ( let j = 0; j < 10; j++) {
                const block = new Shape();
                block.saveRect(
                    j * Map.blockWidth,
                    i * Map.blockHeight,
                    Map.blockWidth,
                    Map.blockHeight,
                ).saveFill("#8B0000");
                Container.addChild(block);
                this.block[block.uuid] = block;
            }
        }
        for (let i = 30; i < 40; i++) {
            for ( let j = 40; j < 50; j++) {
                const block = new Shape();
                block.saveRect(
                    j * Map.blockWidth,
                    i * Map.blockHeight,
                    Map.blockWidth,
                    Map.blockHeight,
                ).saveFill("#8B0000");
                Container.addChild(block);
                this.block[block.uuid] = block;
            }
        }
        for (let i = 20; i < 30; i++) {
                const block = new Shape();
                block.saveRect(
                    i * Map.blockWidth,
                    28 * Map.blockHeight,
                    Map.blockWidth,
                    Map.blockHeight,
                ).saveFill("#8B0000");
                Container.addChild(block);
                this.block[block.uuid] = block;
        }

        for (let i = 0; i < 41; i++) {
            const grid = new Shape();
            grid.display = false;
            grid.saveLine(
                { x: 0, y: i * Map.blockHeight },
                { x: Map.width, y: i * Map.blockHeight },
            ).saveStroke("rgba(0, 0, 0, 0.1)", 2);
            Container.addChild(grid);
            this.grid[grid.uuid] = grid;
        }
        for (let i = 0; i < 51; i++) {
            const grid = new Shape();
            grid.display = false;
            grid.saveLine(
                {x: i * Map.blockWidth, y: 0},
                {x: i * Map.blockWidth, y: Map.height},
            ).saveStroke("rgba(0, 0, 0, 0.1)", 2);
            Container.addChild(grid);
            this.grid[grid.uuid] = grid;
        }
        return this;
    }

    public showGrid() {
        for (const id in this.grid) {
            if (this.grid[id]) {
                this.grid[id].display = true;
            }
        }
    }

    public hideGrid() {
        for (const id in this.grid) {
            if (this.grid[id]) {
                this.grid[id].display = false;
            }
        }
    }
}
