import Customer from '../entity/customer'
import Order from '../entity/order'
import OrderItem from '../entity/order_item'
import { v4 as uuid } from 'uuid'

export default class OrderService {
	static placeOrder(customer: Customer, items: OrderItem[]): Order {
		if (items.length === 0) {
			throw new Error('Order must have at least one item')
		}

		const order = new Order(uuid(), customer.id, items)
		customer.addRewardPoints(order.calculateTotalPrice() / 2)

		return order
	}

	static getTotalPrice(orders: Order[]): number {
		return orders.reduce((total, order) => {
			return total + order.calculateTotalPrice()
		}, 0)
	}
}