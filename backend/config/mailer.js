const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendNewRequestNotification = async (trayecto, recipients) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('Email credentials not found. Skipping notification.');
            return;
        }

        const mailOptions = {
            from: `"Voluntarios Punto Vuela" <${process.env.EMAIL_USER}>`,
            bcc: recipients, // Blind Carbon Copy for privacy
            subject: `📢 Nueva Solicitud de Ayuda: ${trayecto.titulo}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Nueva Solicitud de Ayuda</h2>
                    <p>Hola voluntario,</p>
                    <p>Se ha creado una nueva solicitud de ayuda en la plataforma que podría interesarte.</p>
                    
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">${trayecto.titulo}</h3>
                        <p><strong>Descripción:</strong> ${trayecto.descripcion}</p>
                        <p><strong>Origen:</strong> ${trayecto.ubicacion_origen}</p>
                        <p><strong>Destino:</strong> ${trayecto.ubicacion_destino}</p>
                    </div>

                    <p>Entra en la aplicación para ver más detalles y aceptar la ayuda si estás disponible.</p>
                    
                    <a href="https://mi-proyecto-pearl.vercel.app/" style="background-color: #eab308; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Ir a la App</a>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Notification email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email notification:', error);
        // Don't throw error to prevent blocking the request creation
    }
};

module.exports = { sendNewRequestNotification };
