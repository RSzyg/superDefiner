import Main from "./Main";
import Menu from "./Menu";

const start = () => {
    Menu.createMenuMap();
    Menu.createGoods();
    const main = new Main();
    main.createScene();
};
export { start };
