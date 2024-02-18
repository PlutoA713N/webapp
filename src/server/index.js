const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = 3000

app.use(cors())

const outputDir = path.join(__dirname, '../public/output/');
console.log('Output directory:', outputDir);
app.use(express.static(outputDir));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})