import ProjectDetailedTaskCard from "./ProjectDetailedTaskCard";

export default function ProjectDetailedTasksSection(){
    return(
        <div className="w-full border-[1px] border-black p-[12px]">
            <h1 className="font-bold text-[20px]">Tasks :</h1>
            <ul>
                <ProjectDetailedTaskCard
                id={1}
                desc={"lorem100"}
                status={"In Progress"}
                title={"Task 1"}
                />
            </ul>
        </div>
    )
}