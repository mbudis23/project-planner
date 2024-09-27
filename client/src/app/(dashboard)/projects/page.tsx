'use client';
import ProjectCard from "@/components/scoped/projects/ProjectCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

export default function ProjectPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = Cookies.get('token')
                const response = await axios.get("http://localhost:5000/api/projects/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setProjects(response.data);
                setLoading(false); // Data loaded successfully
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError(error.message);
                setLoading(false); // Loading finished with error
            }
        };

        fetchProjects();
    }, []);

    return (
        <main className="w-full min-h-screen bg-white p-[12px] text-black font-montserrat gap-[12px] flex flex-col">
            {loading && <p>Loading projects...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && projects.map((project) => (
                <ProjectCard
                    key={project._id}
                    id={project._id}
                    desc={project.description}
                    title={project.title}
                />
            ))}
        </main>
    );
}
