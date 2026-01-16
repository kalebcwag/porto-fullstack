'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    fetch(`${apiUrl}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
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
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Kaleb's Portfolio
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          A showcase of my projects in AI, Data Science, and Web Development.
        </p>
      </div>

      {/* Grid Projects */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100"
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
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
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
    </main>
  );
}