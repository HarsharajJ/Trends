import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // 1. Create Categories
    const categories = [
        {
            id: 'cricket',
            name: 'Cricket',
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop',
            description: 'Premium Cricket Jerseys',
        },
        {
            id: 'football',
            name: 'Football',
            image: 'https://images.unsplash.com/photo-1517466787929-bc90951d6dbd?q=80&w=1000&auto=format&fit=crop',
            description: 'International Football Kits',
        },
        {
            id: 'volleyball',
            name: 'Volleyball',
            image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1000&auto=format&fit=crop',
            description: 'Professional Volleyball Jerseys',
        },
        {
            id: 'basketball',
            name: 'Basketball',
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=1000&auto=format&fit=crop',
            description: 'Basketball Association Jerseys',
        },
    ];

    for (const cat of categories) {
        const category = await prisma.category.upsert({
            where: { id: cat.id },
            update: {},
            create: cat,
        });
        console.log(`Upserted category: ${category.name}`);
    }

    // 2. Create Users
    const users = [
        {
            id: 'user-customer',
            email: 'customer@test.com',
            companyName: 'John Doe',
            phone: '0987654321',
            role: Role.USER,
            password: 'userpassword123',
        },
    ];

    for (const u of users) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: u,
        });
        console.log(`Upserted user: ${user.email}`);
    }

    // 3. Create Jerseys
    // Helper to get random category
    const getCategory = (index: number) => categories[index % categories.length].id;

    const jerseys = [
        {
            name: 'India Virat Kohli Jersey',
            player: 'Virat Kohli',
            price: 89.99,
            originalPrice: 110.00,
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop',
            downloadUrl: 'https://example.com/downloads/india-kohli.zip',
            categoryId: 'cricket',
            rating: 4.9,
            reviewCount: 234,
        },
        {
            name: 'Argentina Messi Home Kit',
            player: 'Lionel Messi',
            price: 99.99,
            originalPrice: 120.00,
            image: 'https://images.unsplash.com/photo-1517466787929-bc90951d6dbd?q=80&w=1000&auto=format&fit=crop',
            downloadUrl: 'https://example.com/downloads/argentina-messi.zip',
            categoryId: 'football',
            rating: 4.9,
            reviewCount: 342,
        },
        {
            name: 'USA Volleyball Team Jersey',
            player: 'Team USA',
            price: 79.99,
            originalPrice: 95.00,
            image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1000&auto=format&fit=crop',
            downloadUrl: 'https://example.com/downloads/usa-volleyball.zip',
            categoryId: 'volleyball',
            rating: 4.7,
            reviewCount: 89,
        },
        {
            name: 'Lakers LeBron James Jersey',
            player: 'LeBron James',
            price: 119.99,
            originalPrice: 140.00,
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=1000&auto=format&fit=crop',
            downloadUrl: 'https://example.com/downloads/lakers-lebron.zip',
            categoryId: 'basketball',
            rating: 4.8,
            reviewCount: 156,
        },
    ];

    for (const j of jerseys) {
        // We can't easily upsert only by name if name isn't unique in schema, but for seeding we can try findMany or just create.
        // To avoid duplicates on multiple runs, we'll check existence by name (assuming unique enough for seed).
        const existing = await prisma.jersey.findFirst({
            where: { name: j.name }
        });

        if (!existing) {
            await prisma.jersey.create({
                data: {
                    name: j.name,
                    player: j.player,
                    price: j.price,
                    originalPrice: j.originalPrice,
                    image: j.image,
                    downloadUrl: j.downloadUrl,
                    categoryId: j.categoryId,
                    rating: j.rating,
                    reviewCount: j.reviewCount,
                }
            });
            console.log(`Created jersey: ${j.name}`);
        } else {
            console.log(`Jersey already exists: ${j.name}`);
        }
    }

    console.log('Seeding finished.');
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
