import Container from "./Container";
import { start } from "./Loading";

window.onload = () => {
    start();
    Container.create().render();
};
