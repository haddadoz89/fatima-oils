import { cartService } from './cart.service.js';
import { success } from '../../core/http.js';

export const cartController = {
  async add(req, res, next) {
    try {
      const { productId, grams } = req.body;
      const cartItem = await cartService.addToCart(
        req.user.id,
        productId,
        parseFloat(grams)
      );
      res.json(success({ cartItem }, 'Item added to cart'));
    } catch (error) {
      next(error);
    }
  },

  async get(req, res, next) {
    try {
      const cart = await cartService.getCart(req.user.id);
      res.json(success(cart, 'Cart retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { productId, grams } = req.body;
      const cartItem = await cartService.updateCartItem(
        req.user.id,
        productId,
        parseFloat(grams)
      );
      res.json(success({ cartItem }, 'Cart updated successfully'));
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const { productId } = req.params;
      await cartService.removeFromCart(req.user.id, productId);
      res.json(success(null, 'Item removed from cart'));
    } catch (error) {
      next(error);
    }
  },

  async clear(req, res, next) {
    try {
      await cartService.clearCart(req.user.id);
      res.json(success(null, 'Cart cleared'));
    } catch (error) {
      next(error);
    }
  },
};
