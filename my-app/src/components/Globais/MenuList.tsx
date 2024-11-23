import { MenuListProps } from "@/types";
import Link from "next/link";

export default function MenuList({icon, select, to, value}: MenuListProps) {
    
    const no_selected:string = 'p-4 rounded-lg flex-col justify-start items-start gap-2.5 flex';
    const selected:string = 'p-4 bg-bg_gray rounded-2xl border-2 border-border_gray flex-col justify-start items-start gap-2.5 flex';
    let class_result:string = '';
    let font:string = '';

    if (select == true) {
        class_result = selected
        font = 'font-bold';
    } else {
        class_result = no_selected
        font = 'font-normal';
    }

    return (
        <Link className={class_result} href={to}>
            <div className="w-[186px] h-6 justify-start items-center gap-4 inline-flex">
                <div className="w-6 h-6 relative">
                    <div className={`w-6 h-6 left-0 top-0 absolute ${icon}`}></div>
                </div>
                <p className={`text-white text-base ${font} leading-snug`}>{value}</p>
            </div>
        </Link>    
    );
}