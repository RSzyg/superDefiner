import Container from "./Container";
import Shape from "./Shape";

const Goods = {
    Board: class Board extends Container {
        public main: Shape;
        public texture: Shape[];

        constructor(x: number, y: number) {
            super();
            this.main = new Shape();
            this.addChild(this.main);
            this.main.saveRect(x * 40, y * 40, 240, 80);
            for (let i = 0; i < 6; i++) {
                this.texture[i] = new Shape();
                this.addChild(this.texture[i]);
            }
            this.texture[0].saveArc(x * 40 + 180, y * 40 - 140, 150, 1.2, 1.95);
            this.texture[1].saveArc(x * 40 + 180, y * 40 - 130, 150, 1.16, 2.1);
            this.texture[2].saveArc(x * 40 + 180, y * 40 - 120, 150, 1.16, 2.21);
            this.texture[3].saveArc(x * 40 + 60, y * 40 + 200, 150, 10.58, 11.65);
            this.texture[4].saveArc(x * 40 + 60, y * 40 + 210, 150, 10.58, 11.52);
            this.texture[5].saveArc(x * 40 + 60, y * 40 + 220, 150, 10.62, 11.37);
        }

        get x(): number {
            if (this.main.position[0]) {
                return this.main.position[0].x;
            }
        }

        set x(x: number) {
            const disx = x - this.main.position[0].x;
            this.main.position[0].x = x;
            for (let i = 0; i < 6; i++) {
                this.texture[i].position[0].x += disx;
            }
        }

        get y(): number {
            if (this.main.position[0]) {
                return this.main.position[0].y;
            }
        }

        set y(y: number) {
            const disy = y - this.main.position[0].y;
            this.main.position[0].y = y;
            for (let i = 0; i < 6; i++) {
                this.texture[i].position[0].y += disy;
            }
        }
    },
};
export { Goods };
