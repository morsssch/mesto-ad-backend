require('dotenv').config();
const { Client } = require('pg');


async function seed() {
    const responseUser = await fetch(`${process.env.ORIGINAL_BASE_URL}/users/me`, {
        headers: {
            authorization: process.env.ORIGINAL_TOKEN,
        }
    });

    const responseCards = await fetch(`${process.env.ORIGINAL_BASE_URL}/cards`, {
        headers: {
            authorization: process.env.ORIGINAL_TOKEN,
        }
    });

    const user = await responseUser.json();
    const cards = await responseCards.json();

    const client = new Client({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });

    await client.connect();
    await client.query(
        `UPDATE "user" SET name=$1, about=$2, avatar=$3`,
        [user.name, user.about, user.avatar]
    );

    const result = await client.query(`SELECT "_id" FROM "user" LIMIT 1`);
    const ourUserId = result.rows[0]._id;

    for (const card of cards) {
        await client.query(
            `INSERT INTO card (name, link, "createdAt", "owner_id") VALUES ($1, $2, $3, $4)`,
            [card.name, card.link, card.createdAt, ourUserId]
        );

    }

    await client.end();
}

seed();