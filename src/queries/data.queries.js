export const CREATE_ENERGY_TABLE = `CREATE TABLE IF NOT EXISTS energy(
  data_row_id int NOT NULL UNIQUE,
  date DATE NOT NULL,
  kWh_produced DECIMAL(10, 2) NOT NULL,
  kWh_used DECIMAL(10, 2) NOT NULL,
  net_kWh_usage DECIMAL(10, 2) NOT NULL,
  solar_cost_per_day DECIMAL(10, 2) NOT NULL,
  calc_solar_cost_per_kWh DECIMAL(10, 2) NOT NULL,
  grid_cost_per_kWh DECIMAL(10, 2) NOT NULL,
  calc_grid_cost_for_date DECIMAL(10, 2) NOT NULL,
  calc_total_cost_for_date DECIMAL(10, 2) NOT NULL,
  calc_supposed_total_cost_for_date DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (data_row_id)
)`;

export const LOAD_DATA_INTO_ENERGY_TABLE = `
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/energy-usage-data.csv'
REPLACE INTO TABLE energy
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
`;  

// Get all from energy table
export const ALL_DATA = `SELECT * FROM energy`;

// Get a single row by data_row_id
export const SINGLE_ROW = `SELECT * FROM energy WHERE data_row_id = ?`;

// export const INSERT_TASK = `INSERT INTO tasks (user_id, task_name) VALUES (?, ?)`;

// /**
//  * Update follows syntax:
//  * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
//  *
//  * NOTE: omitting `WHERE` will result in updating every existing entry.
//  */
// export const UPDATE_TASK = `UPDATE tasks SET task_name = ?, status = ? WHERE user_id = ? AND task_id = ?`;

// // Delete a task by id
// export const DELETE_TASK = `DELETE FROM tasks WHERE user_id = ? AND task_id = ?`;