const admin = require('firebase-admin')


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://prueba-b3092-default-rtdb.firebaseio.com/'
});
const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    db.ref('Cliente').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('index', {Cliente: data})
    });
})

router.post('/new-Cliente', (req, res) => {
    const newCliente = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Inconveniente: req.body.Inconveniente,
        phone: req.body.phone
    }
    db.ref('Cliente').push(newCliente);
    res.redirect('/');
});

router.get('/delete-Cliente/:id', (req, res) => {
    db.ref('Cliente/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;