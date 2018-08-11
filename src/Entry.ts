import $ = require("jquery");
import Container from "./Container";
import { start } from "./Loading";

$(document).ready(() => {
   $("#startBtn").click(() => {
        $("#start").remove();
        Container.create().render();
        start();
    });
});
