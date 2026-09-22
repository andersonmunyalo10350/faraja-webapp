const db = require('../config/db');

async function createAwarenessActivity(req, res) {
  try {
    const {
      memorialEventId,
      activityName,
      description,
      date
    } = req.body;

    // 1. Validate required fields
    if (memorialEventId === undefined || activityName === undefined) {
      return res.status(400).json({
        message: 'memorialEventId and activityName are required'
      });
    }

    // 2. Validate memorialEventId type
    if (!Number.isInteger(memorialEventId)) {
      return res.status(400).json({
        message: 'memorialEventId must be an integer'
      });
    }

    // 3. Validate memorialEventId value
    if (memorialEventId <= 0) {
      return res.status(400).json({
        message: 'memorialEventId must be a positive integer'
      });
    }

    // 4. Validate activityName
    if (
      typeof activityName !== 'string' ||
      activityName.trim() === ''
    ) {
      return res.status(400).json({
        message: 'activityName must be a non-empty string'
      });
    }

    // 5. Validate optional description
    if (
      description !== undefined &&
      typeof description !== 'string'
    ) {
      return res.status(400).json({
        message: 'description must be a string'
      });
    }

    // 6. Validate optional date
    if (date !== undefined) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (
        typeof date !== 'string' ||
        !datePattern.test(date) ||
        Number.isNaN(Date.parse(date))
      ) {
        return res.status(400).json({
          message: 'date must be a valid date in YYYY-MM-DD format'
        });
      }
    }

    // 7. Check that the memorial event exists
    const [eventRows] = await db.query(
      'SELECT id FROM funeral_projects WHERE id = ?',
      [memorialEventId]
    );

    if (eventRows.length === 0) {
      return res.status(400).json({
        message: 'memorialEventId does not refer to an existing memorial event'
      });
    }

    // 8. Insert the awareness activity
    const [result] = await db.query(
      `INSERT INTO awareness_activities
       (memorial_event_id, activity_name, description, date)
       VALUES (?, ?, ?, ?)`,
      [
        memorialEventId,
        activityName.trim(),
        description !== undefined ? description : null,
        date !== undefined ? date : null
      ]
    );

    // 9. Build the created resource
    const createdActivity = {
      id: Number(result.insertId),
      memorialEventId: memorialEventId,
      activityName: activityName.trim()
    };

    if (description !== undefined) {
      createdActivity.description = description;
    }

    if (date !== undefined) {
      createdActivity.date = date;
    }

    // 10. Return 201 Created
    return res.status(201).json(createdActivity);

  } catch (err) {
    console.error('Error creating awareness activity:', err);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

module.exports = {
  createAwarenessActivity
};