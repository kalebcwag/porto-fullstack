// 1. Panggil Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProjects = async (req, res) => {
    try {
        // 2. Ambil data dari tabel 'project' (atau 'Project')
        // Pastikan nama 'project' di bawah ini SAMA dengan nama model di schema.prisma
        const projects = await prisma.projects.findMany(); 

        // 3. Kirim data ke frontend
        res.json(projects);
    } catch (error) {
        console.error("Error database:", error);
        res.status(500).json({ error: "Gagal mengambil data project" });
    }
};