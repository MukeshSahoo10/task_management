const TaskModel = require("../Models/TaskModel");
const db = require("../Models/db"); // Import the MySQL connection

// Create a new task
const createTask = async (req, res) => {
    const data = req.body; // Expecting task data
    console.log('Incoming Task Data:', data); // Log incoming data for debugging
    try {
        const model = await TaskModel.create(data); // Use create instead of new + save
        res.status(201).json({ message: 'Task is created', success: true, data: model });
    } catch (err) {
        console.error('Error during task creation:', err); // Log the full error
        res.status(500).json({ message: 'Failed to create task', success: false, error: err.message });
    }
};

// Fetch all tasks
const fetchAllTasks = async (req, res) => {
    const query = 'SELECT * FROM tasks';
    console.log("Executing query to fetch tasks");

    try {
        const [results] = await db.query(query);
        
        // Check if results are empty
        if (results.length === 0) {
            return res.status(404).json({ message: 'No tasks found', success: true, data: [] });
        }

        // Send the results
        res.status(200).json({ message: 'Fetched all tasks', success: true, data: results });
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return res.status(500).json({ message: 'Failed to fetch tasks', success: false });
    }
};

// Update a task by ID
const updateTaskById = async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    const { task_name, description, due_date, priority, assigned_to, status } = req.body; // Get details from request body

    console.log(`ID: ${id}`);
    console.log(`Task Name: ${task_name}`);
    console.log(`Description: ${description}`);
    console.log(`Due Date: ${due_date}`);
    console.log(`Priority: ${priority}`);
    console.log(`Assigned To: ${assigned_to}`);
    console.log(`Status: ${status}`);

    try {
        // Update the task using Sequelize
        const [updated] = await TaskModel.update(
            { task_name, description, due_date, priority, assigned_to, status },
            { where: { id } }
        );

        // Check if any row was affected
        if (updated === 0) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task updated successfully', success: true });
    } catch (err) {
        console.error("Error updating task:", err);
        return res.status(500).json({ message: 'Failed to update task', success: false });
    }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
    const { id } = req.params;
    console.log(`Delete request received for task ID: ${id}`);

    const query = `DELETE FROM tasks WHERE id = ${id}`;

    console.log(query);

    try {
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            console.log('No task found with this ID');
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        console.log('Task deleted successfully');
        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (err) {
        console.error("Error during deletion:", err.message || err);
        return res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};
