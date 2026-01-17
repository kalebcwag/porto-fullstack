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
        // Pastikan backend mengirim struktur { projects: [], sertifikat: [] }
        // Jika backend mengirim array langsung, sesuaikan logic ini
        setProjects(data.projects || []);
        setSertifikat(data.sertifikat || []); // Ganti data.certificates jika nama di backend beda
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
        <div className="text-center">
            {/* Loading animation simple */}
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-gray-500">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* --- NAVIGATION SECTION --- */}
      {/* Sticky: Nempel di atas saat scroll. Backdrop-blur: Efek kaca */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-black transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Flex-col di HP (turun ke bawah), Flex-row di MD/PC (ke samping) */}
            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 md:gap-0">
                
                {/* LOGO */}
                <div className="text-2xl md:text-3xl font-bold text-black text-center md:text-left">
                    Kaleb Coyo Wagito
                </div>

                {/* MENU */}
                {/* Di HP gap kecil (4), di PC gap besar (10) */}
                <ul className="flex flex-wrap justify-center gap-4 md:gap-10 text-sm md:text-lg font-bold text-black list-none">
                    <li className="cursor-pointer hover:text-blue-600 hover:underline transition">Home</li>
                    <li className="cursor-pointer hover:text-blue-600 hover:underline transition">About</li>
                    <li className="cursor-pointer hover:text-blue-600 hover:underline transition">Projects</li>
                    <li className="cursor-pointer hover:text-blue-600 hover:underline transition">Contact</li>
                </ul>

                {/* TOMBOL */}
                <div className="cursor-pointer px-6 py-2 md:px-8 md:py-3 text-sm md:text-lg underline font-bold text-black transition hover:scale-105 hover:text-blue-800">
                    Connect With Me
                </div>
            </div>
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* --- HELLO WORLD SECTION --- */}
        {/* mt-12 di HP, mt-24 di PC */}
        <div className="max-w-7xl mx-auto mt-12 md:mt-24 mb-12 text-center md:text-left">
            {/* Responsive Text Size */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
                Hello, World! <br className="hidden md:block"/> Kaleb's here.
            </h1>
            <p className="mt-6 text-base md:text-xl text-gray-700 leading-relaxed max-w-4xl">
                Informatics Graduate (2025) with a strong interest in AI and Data Science, also a strong foundation in Software Engineering, Object-Oriented Programming (OOP), and Application Development. 
                Proficient in Python, Java, Kotlin, and SQL. Proven track record in delivering functional applications, including an Android-based health monitoring system. 
            </p>
        </div>

        {/* --- RECENT PROJECTS --- */}
        <h2 className="text-3xl md:text-4xl max-w-7xl font-bold text-black mx-auto mt-16 mb-8 text-center md:text-left border-b-2 border-gray-200 pb-4">
            Recent Projects
        </h2>
        
        {/* Grid: 1 kolom di HP, 2 di Tablet, 3 di PC */}
        <div className="max-w-7xl mx-auto grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
            <div 
                key={project.id} 
                className="bg-white border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col overflow-hidden rounded-lg group"
            >
                <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {project.judul_project}
                </h3>

                <p className="text-gray-600 mb-6 flex-1 whitespace-pre-line text-sm leading-relaxed">
                    {project.deskripsi}
                </p>

                <div className="mb-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                    {project.techs && project.techs.split(',').map((tech, index) => (
                        <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded border border-gray-200"
                        >
                        {tech.trim()}
                        </span>
                    ))}
                    </div>
                </div>
                </div>

                <div className="p-4 bg-gray-50 border-t-2 border-gray-100 mt-auto">
                {project.link && project.link.startsWith('http') ? (
                    <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-black text-white hover:bg-gray-800 font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                    View Project
                    </a>
                ) : (
                    <button 
                    disabled 
                    className="block w-full text-center bg-gray-200 text-gray-400 font-bold py-2 px-4 rounded cursor-not-allowed"
                    >
                    Private / No Link
                    </button>
                )}
                </div>
            </div>
            ))}
        </div>

        {/* --- CERTIFICATES --- */}
        <h2 className="text-3xl md:text-4xl max-w-7xl font-bold text-black mx-auto mt-20 mb-8 text-center md:text-left border-b-2 border-gray-200 pb-4">
            Certificates
        </h2>
        
        <div className="max-w-7xl mx-auto grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sertifikat.map((cert) => (
            <div 
                key={cert.id} 
                className="bg-white border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col overflow-hidden rounded-lg"
            >
                <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                        {cert.nama_sertifikasi}
                    </h3>
                    <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">
                        CERT
                    </span>
                </div>

                <p className="text-gray-500 text-sm font-medium mt-auto">
                    Issued: <br/>
                    <span className="text-black text-base">
                        {new Date(cert.tanggal).toLocaleString('en-US', {month: "long"})} {new Date(cert.tanggal).getFullYear()}
                    </span>
                </p>
                </div>
            </div>
            ))}
        </div>

      </div>
    </main>
  );
}