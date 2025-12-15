require('dotenv').config({ path: '../.env' });
const { sequelize } = require('../models');

const addColumnsSafe = async () => {
    try {
        console.log('Connecting...');
        await sequelize.authenticate();
        console.log('Connected.');

        console.log('Adding columns manually...');

        try {
            await sequelize.query('ALTER TABLE usuario ADD COLUMN email_verified TINYINT(1) DEFAULT 0;');
            console.log('✅ email_verified added.');
        } catch (e) {
            console.log('ℹ️ email_verified might already exist or error:', e.message);
        }

        try {
            await sequelize.query('ALTER TABLE usuario ADD COLUMN verification_token VARCHAR(255);');
            console.log('✅ verification_token added.');
        } catch (e) {
            console.log('ℹ️ verification_token might already exist or error:', e.message);
        }

    } catch (error) {
        console.error('❌ Fatal error:', error);
    } finally {
        await sequelize.close();
    }
};

addColumnsSafe();
