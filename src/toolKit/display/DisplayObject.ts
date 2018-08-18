namespace native {
    export class DisplayObject {
        public children: native.DisplayObject[];
        protected uuid: string;

        public constructor() {
            this.children = [];
        }

        public get id(): string {
            return this.uuid;
        }

        protected addChild(child: native.DisplayObject) {
            this.children.push(child);
        }

        protected removeChild(child: native.DisplayObject) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i] === child) {
                    this.children.splice(i, 1);
                }
            }
        }
    }
}
