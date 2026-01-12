exports.getProjects = (req, res) => {
    const projects = [
        {
            id: 1,
            title: "Android AI Motion Tracking",
            description: "Aplikasi deteksi gerak sendi menggunakan MediaPipe.",
            tech: ["Kotlin", "MediaPipe", "Android Studio"]
        },
        {
            id: 2,
            title: "Stock Market Prediction",
            description: "Prediksi saham menggunakan Regresi Logistik.",
            tech: ["Python", "Sklearn", "Pandas"]
        }
    ];
    res.json(projects);
};