const express = require('express');
const app = express();
const http = require('http');
var server = http.createServer(app);

const chatport = '8081';
app.set('port', chatport);
server.listen(chatport);

const io = require("socket.io")(server, {
    cors: {
        methods: ["GET", "POST"]
    },
    pingTimeout: 200000,
    maxHttpBufferSize: 1e8,
});

module.exports = function () {
	io.use((socket, next) => {
		socket.sessionID = socket.handshake.auth.sessionID;
		next();
	});

	io.on('connection', (socket) => {
		socket.emit("session", {
			sessionID: socket.sessionID,
		});
		socket.join(socket.sessionID);

		const users = [];
		for (let [id, socket] of io.of("/").sockets) {
			users.push(socket.sessionID);
		}

		socket.emit("users", users);

		socket.onAny((event, ...args) => {
			console.log("Event: " + event + " Args: " + args)
		})

		socket.broadcast.emit("user connected", {
			userID: socket.sessionID,
			username: socket.username,
		});

		socket.on('join', function (data) {
			socket.join(data.room);
		});

		socket.on('leave', function (data) {
			socket.leave(data.room);
		});

		socket.on('message', function (data) {
			socket.to(data.room).emit('new message', { userID: data.userID, user: data.user, message: data.message, profilePicture: data.profilePicture });
		});

		socket.on("private message", (data) => {
			socket.to(data.room).emit("private message", {
				userID: socket.sessionID,
				user: data.user,
				message: data.message,
                profilePicture: data.profilePicture
			});
		});

		socket.on("disconnect", () => {
			socket.broadcast.emit("user disconnected", {
				userID: socket.sessionID,
				username: socket.username,
			});
		});
	});

	return io;
}

