import Container from "./Container";

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
        }
        Camera.x = (Camera.scale * Camera.centerX) - Container.canvasWidth / 2;
        Camera.y = (Camera.scale * Camera.centerY) - Container.canvasHeight / 2;
    }

    public static get center(): {[key: string]: number} {
        return { x: Camera.centerX, y: Camera.centerY };
    }

    public static set center(center: {[key: string]: number}) {
        Camera.centerX = center.x;
        Camera.centerY = center.y;
        Camera.x = (Camera.scale * Camera.centerX) - Container.canvasWidth / 2;
        Camera.y = (Camera.scale * Camera.centerY) - Container.canvasHeight / 2;
    }

    private static scaleUpperLimit = 2.05;
    private static scaleLowerLimit = 0.45;
    private static centerX: number = 1000;
    private static centerY: number = 800;
}
