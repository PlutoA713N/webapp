const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = 3000

app.use(cors())

const outputDir = path.join(__dirname, '../public/output/');
app.use(express.static(outputDir));


app.get('/', (req, res) => {
    res.send('Output files are being served!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})