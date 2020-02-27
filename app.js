const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

let nextPurchaseId = 1;
let purchases = [
    { id: nextPurchaseId++, amount: 300, category: 'Auto', description: 'Changed the wheels', open: false },
    { id: nextPurchaseId++, amount: 600, category: 'Health', description: 'Went to doctor', open: false },
    { id: nextPurchaseId++, amount: 800, category: 'Entertainment', description: 'Played football with friends', open: false }
];

server.get('/api/purchases', (req, res) => {
     setTimeout(() => {
         if (Math.random() > 0.5) {
            res.send(purchases);
         } else {
             res.statusCode = 500;
             res.send();
         }
     }, 1000);
});



server.post('/api/purchases', (req, res) => {
     setTimeout(() => {
         
            const purchase = req.body;
            const {id, amount, category, description} = purchase;

            if (purchase.id === 0) {
                purchases = [...purchases, {...purchase, id: nextPurchaseId++, amount: parseInt(amount, 10), open: false}];
                res.send(purchases);
                return;
            } else {
                purchases = purchases.map(o => o.id === id ? {...o, amount: parseInt(amount, 10), category, description, open: false} : o);
                res.send(purchases);
                return;
            }
     }, 1000);
});

server.delete('/api/purchases/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            purchases = purchases.filter(o => o.id !== id); 
            res.send(purchases);
});

server.listen(process.env.PORT || 8000);