// 1. Panggil Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProjects = async (req, res) => {
    try {
        const [projects, sertifikat] = await Promise.all([
            prisma.projects.findMany(), // Query 1
            prisma.sertifikat.findMany() // Query 2
        ]);

        // 3. Kirim data ke frontend
        res.json({
            projects: projects,
            sertifikat: sertifikat
        });
    } catch (error) {
        console.error("Error database:", error);
        res.status(500).json({ error: "Gagal mengambil data project" });
    }
};