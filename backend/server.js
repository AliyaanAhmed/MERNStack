const app = require("./app");
const connectToDb = require("./db/db");


process.on("uncaughtException", (err) => {
    console.log(err);
    console.log("Server will be shutdown for handling uncaught Exception");
    process.exit(1);
});



if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

connectToDb();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})


process.on("unhandledRejection", (err) => {
    console.log(err.message);
    console.log("Shutting down the server due to unhandled Rejection");
    server.close();
    process.exit(1);
})