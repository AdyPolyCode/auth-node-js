require('colors');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = require('./data/product');

async function insertData() {
    try {
        for (let i = 0; i < products.length; i++) {
            await prisma.product.create({
                data: products[i],
            });
        }
        console.log('Data successfully inserted...'.bgYellow.black.bold);
    } catch (error) {
        console.log(`${error}`.bgRed.black.underline);
        process.exit(1);
    }
}

async function deleteData() {
    try {
        await prisma.product.deleteMany();
        console.log('Data successfully deleted...'.bgYellow.black.bold);
    } catch (error) {
        console.log(`${error}`.bgRed.black.underline);
        process.exit(1);
    }
}

if (process.argv[2] === 'i') {
    insertData();
    prisma.$disconnect();
} else if (process.argv[2] === 'd') {
    deleteData();
    prisma.$disconnect();
}
