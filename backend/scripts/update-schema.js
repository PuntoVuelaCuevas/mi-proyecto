require('dotenv').config({ path: '../.env' });
const { sequelize } = require('../models');

const updateSchema = async () => {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        console.log('Connection established successfully.');

        console.log('Syncing database schema (alter: true)...');
        // Usamos alter: true para intentar añadir las nuevas columnas
        await sequelize.sync({ alter: true });

        console.log('✅ Schema updated successfully!');
    } catch (error) {
        console.error('❌ Error updating schema:', error);
        if (error.original && error.original.code === 'ER_TOO_MANY_KEYS') {
            console.warn('⚠️ Warning: ER_TOO_MANY_KEYS encountered. This might be due to existing indexes. Check if new columns (email_verified, verification_token) were added.');
        }
    } finally {
        await sequelize.close();
    }
};

updateSchema();
