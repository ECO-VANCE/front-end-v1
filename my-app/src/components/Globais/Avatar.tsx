import { AvatarProps } from "@/types";
import Image from "next/image";

export default function Avatar({src, name}: AvatarProps) {
    
    return (
        <picture className="bg-cover bg-no-repeat">
            <Image src={src} alt={name} width={45} height={45} className="rounded-full border-white border-2"/>
        </picture>
    );
}