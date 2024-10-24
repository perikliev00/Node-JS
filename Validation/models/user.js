// mongodb=require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Product = require('./product');
const product = require('./product');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId,ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
});
userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
                    return cp.productId.toString() === product._id.toString();
                })
                let newQuantity= 1;
                const updatedCartItems = [...this.cart.items];
        
                if(cartProductIndex >=0) {
                    newQuantity=this.cart.items[cartProductIndex].quantity + 1;
                    updatedCartItems[cartProductIndex].quantity = newQuantity;
                } else {
                    updatedCartItems.push({productId:product._id,quantity: newQuantity})
                }
                const updatedCart = {
                    items: updatedCartItems
                };

                this.cart = updatedCart;
                return this.save()
            }
userSchema.methods.clearCart = function(productId) {    
    this.cart = { items: [] };
    return this.save();
}
userSchema.methods.removeFromCart = function(prodId) {
    this.cart.items = this.cart.items.filter(i => {
        return i.productId.toString() !== prodId.toString();
    })
    return this.save();
}
module.exports = mongoose.model('User', userSchema);