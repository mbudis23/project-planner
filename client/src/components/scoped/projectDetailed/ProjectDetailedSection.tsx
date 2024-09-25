import ProjectDetailedTasksSection from "./ProjectDetailedTasksSection";

export default function ProjectDetailedSection(){
    return(
        <div className="w-full flex flex-col gap-[12px]">
            <h1 className="text-[32px] bg-black text-white px-[12px] font-semibold">Project 1</h1>
            <p className="p-[12px] w-full border-black border-[1px] rounded-[3px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, veritatis?
            </p>
            <ProjectDetailedTasksSection/>
        </div>
    )
}