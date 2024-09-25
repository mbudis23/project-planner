import ProjectCard from "@/components/scoped/projects/ProjectCard";

export default function ProjectPage(){
    return(
        <main className="w-full min-h-screen bg-white p-[12px] text-black font-montserrat">
            <ProjectCard
            id={1}
            title={"Project 1"}
            desc={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, quidem beatae molestiae voluptatum quibusdam reiciendis sed sint! Fugit, dolorum? Dolorem praesentium, facilis a ex mollitia natus earum, enim ullam quam, consequatur repellendus? Hic reiciendis libero a, aut eligendi rem eius repudiandae possimus, id nihil excepturi eveniet, quas autem deserunt molestiae."}
            />
        </main>
    )
}