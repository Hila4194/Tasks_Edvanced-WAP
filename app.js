const appInit = require("./server");
const port = process.env.PORT;

const tmpFunc = async () => {
    const app = await appInit();
    app.listen(port, ()=>{
        console.log(`Server is running on port http://localhost:${port}`);
    });
}
tmpFunc();