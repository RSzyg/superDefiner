import Container from "./Container";
import { start } from "./Loading";

window.onload = () => {
    document.getElementById("startBtn").onclick = () => {
        document.getElementById("display").removeChild(document.getElementById("start"));
        start();
        Container.create().render();
    };
};
