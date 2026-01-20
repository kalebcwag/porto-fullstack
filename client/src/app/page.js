'use client';
import { useState, useEffect } from 'react';
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [sertifikat, setSertifikat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);

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
    <main className="min-h-screen bg-gray-50 paper-bg" onClick={() => {if (isDropdownOpen) {
        setIsDropdownOpen(false);
    }}}>
      
      {/* --- NAVIGATION SECTION --- */}
      {/* Sticky: Nempel di atas saat scroll. Backdrop-blur: Efek kaca */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black transition-all">
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
                    <a href="#about"><li className="cursor-pointer hover:underline transition">About</li></a>
                    <a href="#projects"><li className="cursor-pointer hover:underline transition">Projects</li></a>
                    <a href="#certificates"><li className="cursor-pointer hover:underline transition">Certificates</li></a>
                    {/* <li className="cursor-pointer hover:underline transition">Contact</li> */}
                </ul>

                {/* TOMBOL */}
                <div className="cursor-pointer px-6 py-2 md:px-8 md:py-3 text-sm md:text-lg underline font-bold text-black transition hover:scale-105"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    Connect With Me
                </div>
                {isDropdownOpen && (
                <div className="absolute group right-12 mt-32 w-48 bg-white border-2 border-black overflow-hidden flex flex-col">
                    
                    {/* Link LinkedIn */}
                    <a 
                        href="https://linkedin.com/in/kalebcoyowagito"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-3 text-black font-bold hover:text-blue-700 transition border-b border-black flex items-center gap-2"
                    >
                        {/* Ikon LinkedIn Sederhana */}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        LinkedIn
                    </a>

                    {/* Link GitHub */}
                    <a 
                        href="https://github.com/kalebcwag"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-3 text-black font-bold group-hover:text-gray-800 transition flex items-center gap-2"
                    >
                        {/* Ikon GitHub Sederhana */}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                    </a>
                </div>
            )}
            </div>
        </div>
      </nav>

      <div id="about" className="px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-24">
        
        {/* --- HELLO WORLD SECTION --- */}
        {/* mt-12 di HP, mt-24 di PC */}
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto mt-12 md:mt-16 mb-12">
            
            {/* BAGIAN TEKS (Kiri/Atas) */}
            {/* flex-1 agar mengambil sisa ruang yang ada */}
            <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
                    Hello, World! <br className="hidden md:block"/> 
                    <RoughNotation type="highlight" show={true} color="#fde047" padding={10} animationDelay={1000}>Kaleb's here.</RoughNotation>
                </h1>
                <p className="mt-6 text-base md:text-xl text-gray-700 leading-relaxed">
                    Informatics Graduate (2025) with a strong interest in <RoughNotation type="box" color="#ff0000" show={true} multiline={true}>AI and Data Science</RoughNotation>, also a strong foundation in <RoughNotation multiline={true} type="underline" color="#0000ff" show={true}>Software Engineering, Object-Oriented Programming (OOP), and Application Development.</RoughNotation> 
                    Proficient in <RoughNotation type="circle" padding={10} color="#00ff00" show={true} multiline={true}>Python, Java, Kotlin, and SQL.</RoughNotation> Proven track record in delivering functional applications, including an Android-based health monitoring system. 
                </p>
            </div>

            {/* BAGIAN FOTO (Kanan/Bawah) */}
            {/* shrink-0: Agar foto tidak mengecil/gepeng saat layar menyempit */}
            <div className="doodle-tape doodle-sketch shrink-0 w-48 h-48 md:w-64 md:h-64 overflow-hidden relative">
                <img 
                    src="/images/profile.jpg" // Pastikan ada garis miring di depan
                    alt="Profile Kaleb"
                    className="w-full h-full object-cover scale-150" // KUNCI: object-cover bikin crop otomatis
                />
            </div>
        </div>

        <div className="mt-8">
            <a 
                href="pdfs/CVKaleb.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    inline-flex items-center gap-2 
                    bg-yellow-300 text-black font-bold text-lg px-6 py-3 
                    border-2 border-black 
                    doodle-border-b
                    hover:scale-105 
                    hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                    transition-all duration-300
                "
            >
                {/* Ikon Mata (View) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View CV / Resume
            </a>
        </div>

        {/* --- RECENT PROJECTS --- */}
        <h2 id="projects" className="text-3xl md:text-4xl max-w-7xl font-bold text-black mx-auto mt-16 mb-8 text-center md:text-left border-b-2 pb-4 scroll-mt-24">
            Recent Projects
        </h2>
        
        {/* Grid: 1 kolom di HP, 2 di Tablet, 3 di PC */}
        <div className="max-w-7xl mx-auto grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
            <div 
                key={project.id} 
                className="bg-white doodle-border transition-all duration-300 flex flex-col overflow-hidden rounded-lg group"
            >
                <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 transition-colors">
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
        <h2 id="certificates" className="text-3xl md:text-4xl max-w-7xl font-bold text-black mx-auto mt-20 mb-8 text-center md:text-left border-b-2 pb-4 scroll-mt-24">
            Certificates
        </h2>
        
        <div className="max-w-7xl mx-auto grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sertifikat.map((cert) => (
            <div 
                key={cert.id} 
                className="doodle-sketch bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col overflow-hidden rounded-lg"
            >
                <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                    <img src={cert.foto}/>
                </div>
                <div className="flex justify-between items-start mb-4">
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                        {cert.nama_sertifikasi}
                    </h3>
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

      <footer className="bg-white border-t-2 border-black border-2 z-50 transition-all p-4">
        <div className="text-xl md:text-xl font-bold text-black text-center">
            <p>&copy; 2026 Kaleb Coyo Wagito. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}