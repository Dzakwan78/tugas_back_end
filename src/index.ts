import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import pembicaraRoutes from './routes/pembicaraRoute.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Rute utama agar root domain tidak menghasilkan error 404
app.get('/', (req, res) => {
  res.json({ message: 'Backend Invofest API Server Berjalan Lancar!' });
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/pembicara", pembicaraRoutes);

// Jalankan app.listen HANYA jika dijalankan secara lokal (bukan di produksi Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;