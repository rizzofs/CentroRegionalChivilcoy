import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- EJEMPLOS DE RUTAS ---

// Obtener todas las autoridades (Activas)
app.get('/api/autoridades', async (req, res) => {
  try {
    const autoridades = await prisma.autoridad.findMany({
      where: { estado: true }
    });
    res.json(autoridades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autoridades' });
  }
});

// Obtener todas las carreras con sus materias
app.get('/api/carreras', async (req, res) => {
  try {
    const carreras = await prisma.carrera.findMany({
      where: { estado: true },
      include: { materias: true } // Trae la relación de materias
    });
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carreras' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
