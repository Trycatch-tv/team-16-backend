import { getAllLogs } from "../services/log.services.js";


export async function getAllLogsCont(req, res) {
    try {
        const page = parseInt(req.query.p) || 1;
        const limit = parseInt(req.query.l) || parseInt(process.env.PAGE_SIZE);

        const logs = await getAllLogs(limit, page);
        const { statusCode, ...responseData } = logs;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}