const { ShoppingRepository } = require("../database");
const { FormatData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async getCart({ _id }) {
    try {
      const cartItems = await this.repository.Cart(_id);

      return FormatData(cartItems);
    } catch (error) {
      throw error;
    }
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormatData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormatData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // get order details

  async ManageCart(customerId, item, qty, isRemove) {
    try {
      const cartResult = await this.repository.AddCartItem(
        customerId,
        item,
        qty,
        isRemove
      );

      return FormatData(cartResult);
    } catch (error) {
      throw error;
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }

  async GetOrderPayload(userId, order, event) {
    console.log(userId, order, event);
    if (order) {
      const payload = {
        event: event,
        data: { userId, order },
      };
      return payload;
    } else {
      return FormatData({ error: "No order available" });
    }
  }
}

module.exports = ShoppingService;
