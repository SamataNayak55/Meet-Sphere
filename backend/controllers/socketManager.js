import { Server } from 'socket.io'
let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders:["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected:`);
        socket.on("join-call", (path) => {
            if(connections[path] === undefined){
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            for(let a = 0; a < connections[path].length; a++){
                io.to(connections[path][a]).emit("user-connected", socket.id, connections[path]);
            }
            if(messages[path] !== undefined){
                for(let a = 0; a < messages[path].length; a++){
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender']
                    );
                }
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", ( data, sender) => {
            const [matchinRoom, faound] = Object.entries(connections).reduce(([room, isFFound],[roomKey, roomValue]) => {
                if(!isFFound && roomValue.includes(socket.id)){
                    return [roomKey, true];
                }
                return [room, isFFound];
            }, ['', false]);
            if(faound === true){
                if(messages[matchinRoom] === undefined){
                    messages[matchinRoom] = [];
                }
                messages[matchinRoom].push({
                    data: data,
                    sender: sender,
                    'socket-id-sender': socket.id
                });
                console.log("message", matchinRoom,":",sender, "->", data);

                connections[matchinRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            var diffTime  = Math.abs(timeOnline[socket.id] - new Date())
            var key 
            for(const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
                for(let a = 0; a < v.length; ++a){
                    if(v[a] === socket.id){
                        key = k
                        for(let a = 0; a < connections[key].length; ++a){
                            io.to(connections[key][a]).emit("user-disconnected", socket.id);
                        }
                        var index = connections[key].indexOf(socket.id);
                        connections[key].splice(index, 1);

                        if(connections[key].length === 0){
                            delete connections[key];
                        }
                    }
                }
            }
        });
    })
    return io;
}
