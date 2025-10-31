import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fatimasoils.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@fatimasoils.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      points: 0,
    },
  });

  console.log('✓ Admin user created:', admin.email);

  // Create sample products - Essential Oils
  const oils = [
    {
      nameAr: 'زيت اللافندر',
      nameEn: 'Lavender Oil',
      category: 'OIL',
      pricePerGram: 2.5,
      descriptionAr: 'زيت اللافندر الأساسي النقي',
      descriptionEn: 'Pure essential lavender oil',
      stockGrams: 1000,
    },
    {
      nameAr: 'زيت النعناع',
      nameEn: 'Peppermint Oil',
      category: 'OIL',
      pricePerGram: 3.0,
      descriptionAr: 'زيت النعناع المنعش',
      descriptionEn: 'Refreshing peppermint oil',
      stockGrams: 800,
    },
    {
      nameAr: 'زيت الورد',
      nameEn: 'Rose Oil',
      category: 'OIL',
      pricePerGram: 8.0,
      descriptionAr: 'زيت الورد الدمشقي الفاخر',
      descriptionEn: 'Premium Damascus rose oil',
      stockGrams: 500,
    },
    {
      nameAr: 'زيت البابونج',
      nameEn: 'Chamomile Oil',
      category: 'OIL',
      pricePerGram: 4.5,
      descriptionAr: 'زيت البابونج المهدئ',
      descriptionEn: 'Soothing chamomile oil',
      stockGrams: 600,
    },
  ];

  // Create sample products - Herbs
  const herbs = [
    {
      nameAr: 'بذور الحلبة',
      nameEn: 'Fenugreek Seeds',
      category: 'SEED',
      pricePerGram: 0.5,
      descriptionAr: 'بذور الحلبة الطبيعية',
      descriptionEn: 'Natural fenugreek seeds',
      stockGrams: 2000,
    },
    {
      nameAr: 'الكمون',
      nameEn: 'Cumin',
      category: 'SEED',
      pricePerGram: 0.8,
      descriptionAr: 'حبوب الكمون العضوية',
      descriptionEn: 'Organic cumin seeds',
      stockGrams: 1500,
    },
    {
      nameAr: 'البابونج المجفف',
      nameEn: 'Dried Chamomile',
      category: 'HERB',
      pricePerGram: 1.2,
      descriptionAr: 'أزهار البابونج المجففة',
      descriptionEn: 'Dried chamomile flowers',
      stockGrams: 1200,
    },
    {
      nameAr: 'النعناع المجفف',
      nameEn: 'Dried Mint',
      category: 'HERB',
      pricePerGram: 0.9,
      descriptionAr: 'أوراق النعناع المجففة',
      descriptionEn: 'Dried mint leaves',
      stockGrams: 1800,
    },
    {
      nameAr: 'إكليل الجبل',
      nameEn: 'Rosemary',
      category: 'HERB',
      pricePerGram: 1.1,
      descriptionAr: 'إكليل الجبل العطري',
      descriptionEn: 'Aromatic rosemary',
      stockGrams: 1000,
    },
  ];

  const allProducts = [...oils, ...herbs];

  for (const product of allProducts) {
    await prisma.product.upsert({
      where: { nameEn: product.nameEn },
      update: {},
      create: product,
    });
  }

  console.log(`✓ Created ${allProducts.length} products`);

  // Create sample user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      username: 'sampleuser',
      email: 'user@example.com',
      passwordHash: userPassword,
      role: 'USER',
      points: 100,
    },
  });

  console.log('✓ Sample user created:', user.email);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
