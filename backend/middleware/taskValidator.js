const validateTask = (req, res, next) => {
    const { title, priority } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority level" });
    }

    next();
};

module.exports = { validateTask };