import connection from '../db-config.js';
import {
  ALL_DATA,
  SINGLE_ROW,
} from '../queries/data.queries.js';
import query from '../utils/query.js';

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3001/data
export async function getAllData(req, res) {
  // establish connection
  const con = await connection().catch((err) => {
    res.status(500).send({ message: 'Database connection failed', error: err.message });
  });

  // query all data
  const data = await query(con, ALL_DATA, []).catch((err) => {
    res.send(err);
    //res.status(500).send({ message: 'Query execution failed', error: err.message });
  });
  
if (!data.length) {
  res.status(400).send({ message: 'No data available for this user' });
} else {
  res.json(data);
}
};

// http://localhost:3001/data/1
export async function getRow(req, res) {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query one row of data
  const data = await query(con, SINGLE_ROW, [req.params.data_row_id]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (data.length === 0) {
    res.status(404).send({ message: 'Data row not found' });
  } else {
    res.json(data);
  }
};

// http://localhost:3001/data

// export async function createTask(req, res) {
//   // verify valid token
//   const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

//   // take result of middleware check
//   if (user.id) {
//     // establish connection
//     const con = await connection().catch((err) => {
//       throw err;
//     });

//     // query add task
//     const result = await query(con, INSERT_TASK, [req.body.user_id, req.body.task_name]).catch(
//       (err) => {
//         res.send(err);
//       }
//     );
//     console.log(result);

//     if (result.affectedRows !== 1) {
//       res
//         .status(500)
//         .json({ msg: `Unable to add task: ${req.body.task_name}` });
//     }
//     res.json({ message: 'Added task successfully!' });
//   }
// };

// // http://localhost:3001/data/1
// /**
//  * PUT request -
//  * {
//  *  name: 'A task name',
//  *  state: 'completed'
//  * }
//  */
// export async function updateTask(req, res) {
//   // establish connection
//   const con = await connection().catch((err) => {
//     throw err;
//   });

//   // query update task
//   const result = await query(con, UPDATE_TASK, [
//     req.body.name,
//     req.body.status,
//     req.params.taskId,
//   ]).catch((err) => {
//     res.send(err);
//   });

//   if (result.affectedRows !== 1) {
//     res
//       .status(500)
//       .json({ msg: `Unable to update task: '${req.body.task_name}'` });
//   }
//   res.json(result);
// };

// // http://localhost:3001/data/1
// export async function deleteTask(req, res) {
//   // establish connection
//   const con = await connection().catch((err) => {
//     throw err;
//   });

//   // query delete task
//   const result = await query(
//     con,
//     DELETE_TASK(req.user.id, req.params.taskId)
//   ).catch(
//     (err) => {
//       res.send(err);
//     }
//   );

//   if (result.affectedRows !== 1) {
//     res
//       .status(500)
//       .json({ msg: `Unable to delete task at: ${req.params.taskId}` });
//   }
//   res.json({ msg: 'Deleted successfully.' });
// };