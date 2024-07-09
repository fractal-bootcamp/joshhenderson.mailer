import express from 'express'
import cors from 'cors'
import prisma from './prismaclient'
import dotenv from 'dotenv'
import {
    clerkClient,
    ClerkExpressWithAuth,
    LooseAuthProp,
    WithAuthProp
} from '@clerk/clerk-sdk-node'

const userList = clerkClient.users.getUserList()

dotenv.config()
const app = express()
const port = 3000

declare global {
    namespace Express {
        interface Request extends LooseAuthProp { }
    }
}

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173'
}))

// Use JSON middleware
app.use(express.json())

// Hello world test
app.get('/', (req, res) => {
    console.log('Hello World!')
    res.send('Hello World!')
})

//API Routes

//api routes for email-list CRUD 
app.get("/api/email-lists", ClerkExpressWithAuth({

}), async (req: WithAuthProp<Request>, res: Response) => { //this will occur on component mount with the mailing list management component 


    //use prisma client to query database for email-lists assisated with user
    const emailLists = await prisma.user.findMany({
        where: {
            emailLists: 
        }
    })
    //return email-lists
})

interface CreateEmailListBody {
    name: string;
    emails: string[];
}

//api route to create email-list
app.post("/api/email-lists", ClerkExpressWithAuth(), async (req: WithAuthProp<Request>, res: Response) => {
    const { name, emails } = req.body as unknown as CreateEmailListBody; // Cast to unknown first... do i actually want to do this?
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        // Use Prisma client to create email list with associated emails
        const emailList = await prisma.emailList.create({
            data: {
                name,
                emails,
                userId
            }
        });

        // Return the created email list object
        return res.status(201).json(emailList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create email list' });
    }
})

//we are gonna do most of this client side 

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
app.get('/api/dashboard', ClerkExpressWithAuth({

}), async (req: WithAuthProp<Request>, res: Response) => {


    //use prisma client to query database for blasts assisated with user

    //return blasts

})

//API route for composing and sending emails to selected email lists 
app.post('/api/compose-and-send', ClerkExpressWithAuth({

}), async (req: WithAuthProp<Request>, res: Response) => {

    //use prisma client to create email blast 

    //return blast
})

// Start the server
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})