const express = require('express')
const app = express()
const port = 8081

const fs = require('fs');

let rawdata = fs.readFileSync('orders.json');  
let orders = JSON.parse(rawdata);

app.get('/order/:id', (req, res) => {
	const userOrders = findOrderUser(req.params.id)
	res.status(200)
	res.send(userOrders)
});

// Function used to find all orders for user with given userId 
function findOrderUser(userId) {
	const userIdJsonKey = 'userId'
	const userOrders = []

	for(const index in orders) {
		const order = orders[index]
		if(order.hasOwnProperty(userIdJsonKey)) {
			if(order[userIdJsonKey] == userId) {
				userOrders.push({
					"orderId": order['orderId'],
					"orderAmout": order['orderAmount'],
					"orderDate": order['orderDate']
				})
			}
		}
	}

	return userOrders;
}

app.use(express.static('public'))

app.listen(port, () => console.log(`Order-Service app listening on port ${port}!`))