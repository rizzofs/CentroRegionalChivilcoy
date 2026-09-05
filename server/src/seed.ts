import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Crear o actualizar un usuario administrador
  const adminEmail = 'admin@unlu.edu.ar';
  const plainPassword = 'adminpassword123'; // ¡Cambiar en producción!
  
  // Hashear contraseña
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

  const admin = await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: { passwordHash }, // Si existe, solo actualizamos el pass (por si lo olvidan)
    create: {
      email: adminEmail,
      nombreCompleto: 'Administrador UNLu',
      passwordHash: passwordHash,
      rol: 'ADMIN',
      estado: true
    }
  });

  console.log(`✅ Administrador creado: ${admin.email}`);
  console.log(`⚠️  Contraseña temporal: ${plainPassword}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
