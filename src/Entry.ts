import $ = require("jquery");
import Container from "./Container";
import { start } from "./Loading";

$(document).ready(() => {
   $("#startBtn").click(() => {
        $("#start").remove();
        start();
        Container.create().render();
    });
});
