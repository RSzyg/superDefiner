import Container from "./Container";

export default class Camera {
    public static scale: number  = 1;
    public static x: number = 0;
    public static y: number = 0;
    public static centerX: number = 500;
    public static centerY: number = 400;

    public static zoom(scaleChange: number) {
        if (
            Camera.scale + scaleChange > Camera.scaleLowerLimit &&
            Camera.scale + scaleChange < Camera.scaleUpperLimit
        ) {
            Camera.scale += scaleChange;
        }
        Camera.x = Camera.scale * Camera.centerX - Camera.centerX;
        Camera.y = Camera.scale * Camera.centerY - Camera.centerY;
    }

    private static scaleUpperLimit = 2.05;
    private static scaleLowerLimit = 0.45;
}
