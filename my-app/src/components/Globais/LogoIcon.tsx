import Image from 'next/image';

export default function Logo(){
    
    return(
        <picture className="bg-cover bg-no-repeat">
            <Image src={"Logo-Icon-White.svg"} width={60} height={60} alt='Icon da Logo da EcoVance'></Image>
        </picture>
    );
}