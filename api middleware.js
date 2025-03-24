// Importar módulos necesarios
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para validar el token de autenticación
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (token && token === 'Bearer miTokenSecreto') {
        next(); // Si el token es válido, continuar
    } else {
        res.status(401).json({ message: 'No autorizado' });
    }
}

// Middleware para validar el contenido del cuerpo de la solicitud
function validationMiddleware(req, res, next) {
    const { nombre, edad } = req.body;
    if (nombre && typeof nombre === 'string' && edad && typeof edad === 'number') {
        next(); // Si los datos son válidos, continuar
    } else {
        res.status(400).json({ message: 'Datos inválidos' });
    }
}

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json());

// Ruta protegida que utiliza ambos middlewares
app.post('/api/protegido', authMiddleware, validationMiddleware, (req, res) => {
    res.status(200).json({ message: 'Acceso permitido', data: req.body });
});

// Ruta pública
app.get('/api/publico', (req, res) => {
    res.status(200).json({ message: 'Acceso público' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
