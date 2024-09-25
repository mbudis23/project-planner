import TasksCard from "@/components/scoped/tasks/TasksCard";

export default function TasksPage(){
    return(
        <main className="min-w-full min-h-screen bg-white text-black font-montserrat p-[12px]">
            <TasksCard
            title={"Task 1"}
            desc={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, quidem beatae molestiae voluptatum quibusdam reiciendis sed sint! Fugit, dolorum? Dolorem praesentium, facilis a ex mollitia natus earum, enim ullam quam, consequatur repellendus? Hic reiciendis libero a, aut eligendi rem eius repudiandae possimus, id nihil excepturi eveniet, quas autem deserunt molestiae."}
            id={1} 
            status={'Completed'}
            />
        </main>
    )
}