import Main from "./Main";
import Menu from "./Menu";
import Role from "./Role";

const start = () => {
    Menu.createMenuMap();
    Role.create(7, 28);
    Menu.createGoods();
    const main = new Main();
    main.createScene();
};
export { start };
