import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findOrderById,
  createOrder,
  updateOrder,
  delOrder,
  findAllOrders,
  findOrderByOffer,
} from '../services/orderServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Offer } from '../entities/offerEntity';

/**
 * This method returns a order by id
 * @param req - The request object
 * @param res - The response object
 * @returns a order object.
 */
export const getOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    //verifyIfAuthorized(id, req);
    const order = await findOrderById(id);
    res.status(200).json(order);
  },
);

/**
 * This method returns all orders.
 * @param req - The request object
 * @param res - The response object
 * @returns an array of order objects.
 */
export const getOrders = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const orders = await findAllOrders();
    res.status(200).json(orders);
  },
);

/**
 * This method creates a new order.
 * @param req - The request object
 * @param res - The response object
 * @returns created order object.
 */
export const postOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  },
);

/**
 * This method updates a order by id.
 * @param req - The request object
 * @param res - The response object
 * @returns updated order object.
 */
export const putOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    /* if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    } */

    const order = await updateOrder(id, req.body);
    res.status(200).json(order);
  },
);

/**
 * This method deletes a order by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted order object.
 */
export const deleteOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    /* if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    } */

    const order = await delOrder(id);
    res.status(204).json(order);
  },
);

/**
 * This method returns an order corresponding to an offer   *
 * @param req - The request object
 * @param res - The response object
 * @returns retrieved order object.
 */
export const getOrdersOfOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offer } = req.params;

    const order = await findOrderByOffer(offer as unknown as Offer); // This will be changed later to handle correct ref type
    res.status(204).json(order);
  },
);
