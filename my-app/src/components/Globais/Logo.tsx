import Image from 'next/image';

export default function Logo(){
    
    return(
        <picture className="bg-cover bg-no-repeat">
            <Image src={"Logo-Text-2-White.svg"} width={150} height={0} alt='Logomarca da EcoVance'></Image>
        </picture>
    );
}