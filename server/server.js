import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRouts.js';
const app=express();
app.use(cors())
app.use(express.json())
await connectDB();

app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)
app.get('/',(req,res)=>{

res.send('api is working')

})

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log('server is running on the port'+PORT)
})

export default app;

