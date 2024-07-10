import express from 'express';
import cors from 'cors';
import prisma from './prismaclient';
import dotenv from 'dotenv';
import {
    clerkClient,
    ClerkExpressWithAuth,
    LooseAuthProp,
    WithAuthProp
} from '@clerk/clerk-sdk-node';

dotenv.config();
const app = express();
const port = 3000;

declare global {
    namespace Express {
        interface Request extends LooseAuthProp { }
    }
}

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(ClerkExpressWithAuth());

// Routes
app.get('/', (req, res) => {
    console.log('Hello World!');
    res.send('Hello World!');
});

app.get("/api/email-lists", async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const emailLists = await prisma.emailList.findMany({
            where: { userId }
        });
        return res.status(200).json(emailLists);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch email lists' });
    }
});

interface CreateEmailListBody {
    name: string;
    emails: string[];
}

app.post("/api/email-lists", async (req: WithAuthProp<Request>, res: Response) => {
    const { name, emails } = req.body as CreateEmailListBody;
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const emailList = await prisma.emailList.create({
            data: { name, emails, userId }
        });
        return res.status(201).json(emailList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create email list' });
    }
});

app.put("/api/email-lists", async (req: WithAuthProp<Request>, res: Response) => {
    const { id, name, emails } = req.body;
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const emailList = await prisma.emailList.update({
            where: { id },
            data: { name, emails }
        });
        return res.status(200).json(emailList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update email list' });
    }
});

app.delete("/api/email-lists", async (req: WithAuthProp<Request>, res: Response) => {
    const { id } = req.body;
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        await prisma.emailList.delete({
            where: { id }
        });
        return res.status(200).json({ message: 'Email list deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete email list' });
    }
});

app.get('/api/dashboard', async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const blasts = await prisma.blast.findMany({
            where: { userId }
        });
        return res.status(200).json(blasts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch blasts' });
    }
});

app.post('/api/compose-and-send', async (req: WithAuthProp<Request>, res: Response) => {
    const { subject, content, emailListId } = req.body;
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const blast = await prisma.blast.create({
            data: { subject, content, emailListId, userId }
        });
        return res.status(201).json(blast);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create email blast' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});