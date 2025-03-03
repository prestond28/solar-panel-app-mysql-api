import express from 'express';
import {
  getAllData,
  getRow,
} from '../controllers/data.controller.js';
import canAccess from '../middleware/auth.middleware.js';

const dataRoutes = express.Router();
/**
 * Express routes for data.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all data. Evaluates to `/data/`.
 */

// dataRoutes.get('/', canAccess, getAllData) .post('/', canAccess, createData);
dataRoutes.get('/', getAllData)

/**
 * Routes for a row of data by data_row_id. Evalutes to `/data/:data_row_id`.
 */
dataRoutes
  .get('/:data_row_id', canAccess, getRow) // GET http://locahost:3001/api/data/1
  // .put('/:data_row_id', canAccess, updateData)
  // .delete('/:data_row_id', canAccess, deleteData);

export default dataRoutes;