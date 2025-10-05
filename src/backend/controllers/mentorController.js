const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllMentors(req, res) {
    try {
        const data = await prisma.Mentor.findMany();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch mentors" });
    }
}

async function getMentorById(req, res) {
    try {
        const { id } = req.params;
        const data = await prisma.Mentor.findUnique({
            where: { id: Number(id) }
        });

        if (!data) {
            return res.status(404).json({ error: "Mentor not found" });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch mentor" });
    }
}

module.exports = {
    getAllMentors,
    getMentorById
};
