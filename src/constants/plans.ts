import { IPlans } from "@/interfaces/IPlans.interface";
import noronhaImg from "@/assets/plans/noronha.jpg"
import patagoniaImg from "@/assets/plans/patagonia.jpg"
import parisImg from "@/assets/plans/paris.jpg"
import egyptianImg from "@/assets/plans/egyptian.jpg"
import amazoniaImg from '@/assets/plans/amazonia.jpg'
import barilocheImg from '@/assets/plans/bariloche.jpg'
import cancunImg from '@/assets/plans/cancun.jpg'
import spaghetti from '@/assets/plans/spaghetti.jpg'
import atacamaImg from '@/assets/plans/atacama.jpg'

export const travelPlans: IPlans[] = [
    {
        id: 1,
        name: "Paraíso em Fernando de Noronha",
        price: 2999.90,
        description: "Pacote completo com mergulho, trilhas e praias paradisíacas.",
        image: noronhaImg.src
    },
    {
        id: 2,
        name: "Aventura na Patagônia",
        price: 4599.00,
        description: "Explore montanhas, geleiras e a fauna do sul da América.",
        image: patagoniaImg.src
    },
    {
        id: 3,
        name: "Romance em Paris",
        price: 7999.99,
        description: "Hospedagem, passeios e jantar com vista para a Torre Eiffel.",
        image: parisImg.src
    },
    {
        id: 4,
        name: "Cultura e História no Egito",
        price: 6890.00,
        description: "Conheça as pirâmides, museus e o rio Nilo em um só pacote.",
        image: egyptianImg.src
    },
    {
        id: 5,
        name: "Natureza Selvagem na Amazônia",
        price: 3990.00,
        description: "Vivência com comunidades ribeirinhas e passeios fluviais.",
        image: amazoniaImg.src
    },
    {
        id: 6,
        name: "Neve em Bariloche",
        price: 3590.00,
        description: "Esquie nas montanhas argentinas e aproveite o frio em alto estilo.",
        image: barilocheImg.src
    },
    {
        id: 7,
        name: "Resort All Inclusive em Cancún",
        price: 6599.00,
        description: "Relaxe nas praias caribenhas com tudo incluso.",
        image: cancunImg.src
    },
    {
        id: 8,
        name: "Turismo Gastronômico na Itália",
        price: 8990.00,
        description: "Explore Roma, Florença e Veneza com foco em vinhos e massas.",
        image: spaghetti.src
    },
    {
        id: 9,
        name: "Expedição no Deserto do Atacama",
        price: 4800.00,
        description: "Aventure-se no deserto mais árido do mundo com conforto.",
        image: atacamaImg.src
    }
];
