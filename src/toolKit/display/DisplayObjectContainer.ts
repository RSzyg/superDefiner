namespace native {
    export class DisplayObjectContainer {
        public static children: native.DisplayObject[] = [];

        protected addChild(child: native.DisplayObject) {
            native.DisplayObjectContainer.children.push(child);
        }

        protected removeChild(child: native.DisplayObject) {
            for (let i = 0; i < native.DisplayObjectContainer.children.length; i++) {
                if (native.DisplayObjectContainer.children[i] === child) {
                    native.DisplayObjectContainer.children.splice(i, 1);
                }
            }
        }
    }
}
