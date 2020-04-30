const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;



class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);

  }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId == product._id;

    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
    }
    const updatedCart = { items: updatedCartItems }
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } });
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .findOne({ _id: mongodb.ObjectId(userId) })
      .then(user => {
        console.log(user)
        return user;
      })
      .catch(console.log);
  }
}
module.exports = User;
