const express = require('express')
const app = express()
const port = 8081

const fs = require('fs');

let rawdata = fs.readFileSync('orders.json');  
let orders = JSON.parse(rawdata);

app.get('/order/:id', (req, res) => {
	const userOrders = findOrderUser(req.params.id)
	res.send(userOrders)
});

app.use(express.static('public'))

app.listen(port, () => console.log(`NAGP-quotes app listening on port ${port}!`))

function findOrderUser(userId) {
	const userIdJsonKey = 'userId'
	const userOrders = []

	for(const index in orders) {
		const order = orders[index]
		if(order.hasOwnProperty(userIdJsonKey)) {
			if(order[userIdJsonKey] == userId) {
				userOrders.push(order)
			}
		}
	}

	return userOrders;
}