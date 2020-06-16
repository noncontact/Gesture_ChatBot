let express = require('express');
let http = require('http');
let fs = require('fs');
let url = require('url');
let app = express();
let server = http.createServer(app);

let jsonfile = require('jsonfile');
let compression = require('compression');
app.use(compression());


function LogIn(id, password) {
    if (id && password) {
        return true;
    }
    else return false;
}
function save(Logs) {
    if (Logs.lenght == false) return;
    let date = new Date();
    let fileName = `data${date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString()}.json`;
    console.log(fileName);
    jsonfile.writeFile(fileName, Logs, function (err) {
        if (err) console.error(err);
    });
}

let ChatRooms = [];

server.listen(3000);

app.get('/', function (req, res, next) {
    let _url = '';
    if (req.url == '/') {
        _url = '/ChatRoom.html';   
    }
   
    console.log('get url:' + req.url);
    res.sendFile(__dirname + _url);
});

app.get('/gesture_space/0.idle.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});

app.get('/gesture_space/1.hi.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/2.agree.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/3.disagree.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/4.pleased.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/5.sad.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/6.terrified.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/7.thumbs_up.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/8.shy.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/9.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    _url = "/gesture_space/8.shy.webm";
    res.sendFile(__dirname + _url);
});
app.get('/gesture_space/10.angry.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/11.cheering.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});
app.get('/gesture_space/12.whatever_gesture.webm', function (req, res, next) {
    console.log('get url:' + req.url);
    res.sendFile(__dirname + req.url);
});

let io = require('socket.io')(server);

io.on('connect', function (socket) {
    console.log('clinet 접속');
    io.emit("gestureChange", 1);
    setTimeout(function(){ io.emit("gestureChange", 0); }, 15000);
    socket.on('Init', function (data) {
        console.log(data);


    });
    
    socket.on('disconnect', function () {
        ChatRooms = [];
        console.log('clinet disconnect');
        //save()
    });//연결 종료

    socket.on('userMsg', function (msg) {
        console.log("msg come");
        console.log(msg);
        ChatRooms.push(msg);
        io.emit("UserMsg", msg);
        io.emit("ChatViewChange", ChatRooms);
        console.log(ChatRooms);
    });
    socket.on('my response', function (res) {
        console.log(res);
    });

    socket.on('aIAnswer', function (answer) {
        console.log(answer);
        ChatRooms.push({ "id": 1, "log": answer });
        io.emit("AiAnswer",answer);
        
    });
    socket.on('aIGesture', function (gesture) {
        console.log(gesture);
        //ChatRooms.push({ "id": 1, "msg": answer });
        io.emit("ChatViewChange", ChatRooms);
        io.emit("gestureChange", gesture);
        setTimeout(function(){ io.emit("gestureChange", 0); }, 15000);
    });
});


//ChatRoom.html