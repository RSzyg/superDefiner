import Container from "./Container";
import Map from "./Map";

export default class Camera {
    public static scale: number  = 1;
    public static x: number = 500;
    public static y: number = 400;

    public static zoom(scaleChange: number) {
        if (
            Camera.scale + scaleChange > Camera.scaleLowerLimit &&
            Camera.scale + scaleChange < Camera.scaleUpperLimit
        ) {
            Camera.scale += scaleChange;
            Camera.scale = +Camera.scale.toFixed(2);
        }
        Camera.x = (Camera.scale * Camera.centerPointX) - Container.canvasWidth / 2;
        Camera.y = (Camera.scale * Camera.centerPointY) - Container.canvasHeight / 2;
    }

    public static checkRange() {
        if (Camera.x < 0) {
            Camera.centerX = (Container.canvasWidth / 2) / Camera.scale;
        }
        if (Camera.y < 0) {
            Camera.centerY = (Container.canvasHeight / 2) / Camera.scale;
        }
        if (Camera.x + Container.canvasWidth > Map.width * Camera.scale) {
            Camera.centerX = Map.width - (Container.canvasWidth / 2) / Camera.scale;
        }
        if (Camera.y + Container.canvasHeight > Map.height * Camera.scale) {
            Camera.centerY = Map.height - (Container.canvasHeight / 2) / Camera.scale;
        }
    }

    public static get centerX(): number {
        return Camera.centerPointX;
    }

    public static set centerX(centerX: number) {
        Camera.centerPointX = centerX;
        Camera.x = (Camera.scale * Camera.centerPointX) - Container.canvasWidth / 2;
    }

    public static get centerY(): number {
        return Camera.centerPointY;
    }

    public static set centerY(centerY: number) {
        Camera.centerPointY = centerY;
        Camera.y = (Camera.scale * Camera.centerPointY) - Container.canvasHeight / 2;
    }

    private static scaleUpperLimit = 2.05;
    private static scaleLowerLimit = 0.45;
    private static centerPointX: number = 1000;
    private static centerPointY: number = 800;
}
