const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', // sandbox or live
    'client_id': 'AbhNiWl9R0HqN50iGEiXBEAvBl1Vql8NyAWhCNLeZXONFfOFLtAb0C84g7nNCL8u3vWbPx1b77RGnZp_',
    'client_secret': 'EEPja4jCknUE5g7fLNpu_nABlKcEM9oSyglZ5nbcvHekrHmXCYZA4ELRzjkqNDWIQCUMh9tPQksOh2c1'
});

const createPayment = async ({ subtotal, products }) => {
    return new Promise((resolve, reject) => {
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            transactions: [{
                item_list: {
                    items: products.map(item => ({
                        name: item.name,
                        sku: item.id,
                        price: item.price,
                        currency: 'USD',
                        quantity: item.quantity,
                    })),
                },
                amount: {
                    currency: 'USD',
                    total: subtotal,
                },
                description: 'Your order description here',
            }]
        };

        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                reject(error);
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        resolve(payment.links[i].href);
                        return;
                    }
                }
            }
        });
    });
};

module.exports = {
    createPayment
};