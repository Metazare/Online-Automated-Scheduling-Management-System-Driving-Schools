import { Server } from "socket.io";

const io = new Server(3001, { 
    cors: {
        origin: "http://localhost:3000"
    }
});

// Setting up the school id as the socket id
// const schoolId = getSchoolId();

io.on("connection", (socket) => {
    console.log(socket.id);

    // recieve notification from the client
    socket.on('send_notification', (studentName, appointmentDate, course) => {
        console.log(studentName, appointmentDate, course);

        // Initiallizing the socket id with the school id
        // socket.data.schoolId = schoolId;
        
        // sending to every client
        io.emit('recieve_notification', studentName, appointmentDate, course);
        
        // Sending to a specific school using school id
        // io.to(socket.schoolId).emit(studentName, appointmentDate, course)
    })
    

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
