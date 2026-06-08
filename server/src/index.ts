import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRoutes from './routes/github';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/github', githubRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
