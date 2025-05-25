import logoImg from '@/assets/logo.png'
import Image from 'next/image'
export function Logo() {
    return (
        <figure>
            <Image src={logoImg} alt="logo" width={120} height={100}/>
        </figure>
    )
}