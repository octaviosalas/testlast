import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import appRoutes from "./routes/app.routes.js"

const app = express()
const port = 4000

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(appRoutes)

app.get('/', (req, res) => {
    res.send('App levantada')
})

app.get('/files', (req, res) => {
    res.send('files')
})
  
  
app.listen(port, () => {
    console.log(`El servidor esta funcionando correctamente en el puerto ${port} ✔✔`)
})
