// Importar módulos necesarios
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json());

// Ruta de login (simulada)
app.post('/api/login', (req, res) => {
    const { usuario, clave } = req.body;

    // Validación simple (en un caso real usarías una base de datos)
    if (usuario === 'admin' && clave === '1234') {
        res.status(200).json({ token: 'Bearer miTokenSecreto' });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

// Middleware para validar el token de autenticación
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (token && token === 'Bearer miTokenSecreto') {
        next();
    } else {
        res.status(401).json({ message: 'No autorizado' });
    }
}

// Middleware para validar el contenido del cuerpo de la solicitud
function validationMiddleware(req, res, next) {
    const { nombre, edad } = req.body;
    if (nombre && typeof nombre === 'string' && edad && typeof edad === 'number') {
        next();
    } else {
        res.status(400).json({ message: 'Datos inválidos' });
    }
}

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
                                                   
