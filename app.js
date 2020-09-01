var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80, () => {
    console.log("Server listening at 80");
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/index.html'));
});

app.use(express.static(path.resolve(__dirname, './dist/')));//静态资源加载


var Roles = {};
// var Goods = {};
var playerNum = 0;
// var GoodsNum = 0;

var MapData = {
    width: 2000,
    height: 1600,
    blockHeight: 40,
    blockWidth: 40
}

io.on('connection', (socket) => {

    var newRole = undefined;
    socket.emit('init', JSON.stringify(MapData));

    socket.on('load',() => {

        if (newRole) return;

        newRole = {
            id: socket.id,
            height: 70,
            jumpPower: 12,
            moveStep: 4,
            width: 40,
            x: 120,
            y: 1120
        };
        var allDatas = {
            id: socket.id,
            allDatas: Roles
        };
        // var goodsData = {
        //     goodsData: Goods
        // };
        Roles[socket.id] = newRole;
        ++playerNum;
        console.log(playerNum);
    
        socket.emit('createRole', JSON.stringify(allDatas));
        socket.broadcast.emit('addRole', JSON.stringify(newRole));
        // socket.emit("createGoods", JSON.stringify(goodsData));
    })

    socket.on('move', (data) => {
        const datas = JSON.parse(data);
        const allDatas = {
            x: datas.x,
            y: datas.y,
            id: socket.id
        };
        socket.broadcast.emit("roleMove", JSON.stringify(allDatas));
    })

    // socket.on('Goods', (data) => {
    //     const datas = JSON.parse(data);
    //     const allDatas = {
    //         id: GoodsNum,
    //         type: datas.type,
    //         fillstyle: datas.fillstyle,
    //         x: datas.x,
    //         y: datas.y,
    //     };
    //     Goods[GoodsNum] = allDatas;
    //     socket.broadcast.emit("placeGoods", allDatas);
    //     GoodsNum += 2;
    // })
    socket.on('disconnect', () => {
        if (newRole) {
            delete Roles[socket.id];
            socket.broadcast.emit("leave", JSON.stringify(socket.id));
            --playerNum;
            console.log(playerNum);
        }
    })
});