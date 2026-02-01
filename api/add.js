export default function handler(req, res) {
  const note = req.query.note || '';
  const date = req.query.date || '';

  res.status(200).json({
    success: true,
    received: {
      note,
      date
    }
  });
}
