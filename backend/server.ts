import express from 'express'
import cors from 'cors'
import prisma from './prismaclient'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

const port = 3000

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173'
}))

// Hello world test
app.get('/', (req, res) => {
    console.log('Hello World!')
    res.send('Hello World!')
})

//API Routes

//api routes for email-list CRUD 
app.get("/api/email-lists", async (req, res) => { //this will occur on component mount with the mailing list management component 
    //check that user is authenticated 

    //use prisma client to query database for email-lists assisated with user
    const emailLists = await prisma.user.findMany({
        where: {
            emailLists: 
        }
    })
    //return email-lists
})

//api route to create email-list
app.post("/api/email-lists", async (req, res) => {
    //check that user is authenticated 

    //use prisma client to create email-list

    //return email-list
})

//api route to update email-list
app.put("/api/email-lists", async (req, res) => {
    //check that user is authenticated 

    //use prisma client to update email-list

    //return email-list
})

//api route to delete email-list
app.delete("/api/email-lists", async (req, res) => {
    //check that user is authenticated 

    //use prisma client to delete email-list

    //return email-list
})

// API Routes for blast CRUD
app.get('/api/blasts', async (req, res) => {
    //check that user is authenticated 

    //use prisma client to query database for blasts assisated with user

    //return blasts

})

app.post('/api/blasts', async (req, res) => {
    //check that user is authenticated 

    //use prisma client to create blast

    //return blast
})

// Start the server
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})