const app = require("./servidor");

const port = process.env.PORT
app.listen(port, () => {
    console.log(port)
});