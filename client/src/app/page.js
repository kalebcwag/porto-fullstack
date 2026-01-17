'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [sertifikat, setSertifikat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    fetch(`${apiUrl}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setSertifikat(data.sertifikat)
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-500">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Navigation Section */}
      <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 border-b-[2px] border-b-black">
      
      {/* --- JUDUL (Otomatis di Kiri karena justify-between) --- */}
      <div className="text-[40px] text-black font-bold">
        Kaleb Coyo Wagito
      </div>

      {/* --- MENU --- */}
      <ul className="flex gap-10 text-[20px] font-bold text-black list-none">
        <li className="cursor-pointer hover:underline transition">Home</li>
        <li className="cursor-pointer hover:underline transition">About</li>
        <li className="cursor-pointer hover:underline transition">Projects</li>
        <li className="cursor-pointer hover:underline transition">Contact</li>
      </ul>

      {/* --- TOMBOL (Otomatis di Kanan) --- */}
      <div className="cursor-pointer px-8 py-3 text-[20px] underline font-bold text-black transition hover:scale-105">
        Connect With Me
      </div>

    </nav>

      {/* Hello World Section */}
      <div className="max-w-7xl mx-auto mt-25 mb-12">
        <h1 className="text-[40px] font-bold text-black">
          Hello, World! Kaleb's here
        </h1>
        <p className="mt-4 text-xl text-black">
          Informatics Graduate (2025) with a strong interest in AI and Data Science, also a strong foundation in Software Engineering, Object-Oriented Programming (OOP), and Application Development. 
          Proficient in Python, Java, Kotlin, and SQL. Proven track record in delivering functional applications, including an Android-based health monitoring system. 
          A Bangkit Academy graduate with high adaptability to new technologies and strong analytical skills. 
          Seeking a challenging role in IT to leverage technical expertise in building scalable and efficient software solutions.
        </p>
      </div>

      {/* Grid Projects */}
      <h1 className="text-4xl max-w-7xl font-bold text-black mx-auto mt-16 mb-5">
          Recent Projects
      </h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white border-black border-[2px] hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border"
          >
            <div className="p-6 flex-1 flex flex-col">
              {/* Judul Project */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {project.judul_project}
              </h3>

              {/* Deskripsi */}
              {/* whitespace-pre-line berguna agar \r\n (enter) terbaca sebagai baris baru */}
              <p className="text-gray-600 mb-6 flex-1 whitespace-pre-line text-sm leading-relaxed">
                {project.deskripsi}
              </p>

              {/* Tech Stack (Logic: Split string by comma) */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techs && project.techs.split(',').map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                    >
                      {tech.trim()} {/* trim() menghapus spasi berlebih */}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Link Button (Footer Card) */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
              {project.link && project.link.startsWith('http') ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center hover: text-black underline font-semibold py-2 px-4 transition-colors duration-200"
                >
                  View on GitHub
                </a>
              ) : (
                <button 
                  disabled 
                  className="block w-full text-center bg-gray-200 text-gray-400 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Private / No Link
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-4xl max-w-7xl font-bold text-black mx-auto mt-16 mb-5">
          Certificates
      </h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sertifikat.map((cert) => (
          <div 
            key={cert.id} 
            className="bg-white border-black border-[2px] hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border"
          >
            <div className="p-6 flex-1 flex flex-col">
              {/* Judul Project */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {cert.nama_sertifikasi}
              </h3>

              {/* Deskripsi */}
              {/* whitespace-pre-line berguna agar \r\n (enter) terbaca sebagai baris baru */}
              <p className="text-gray-600 mb-6 flex-1 whitespace-pre-line text-sm leading-relaxed">
                {new Date(cert.tanggal).toLocaleString('en-US', {month: "long"})} {new Date(cert.tanggal).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}