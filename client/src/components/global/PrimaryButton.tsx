export default function PrimaryButton({children="button"}){
    return(
        <button className="bg-black w-fit text-white h-fit px-[12px] py-[3px] rounded-[3px]">
            {children}
        </button>
    )
}