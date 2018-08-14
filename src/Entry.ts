import $ = require("jquery");
import Container from "./Container";
import { start } from "./Loading";
import Menu from "./Menu";

$(document).ready(() => {
   $("#startBtn").click(() => {
        $("#start").remove();
        Container.createMainMap().render();
        Menu.create();
        start();
    });
});
