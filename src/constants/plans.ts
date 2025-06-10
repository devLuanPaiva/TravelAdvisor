import parisImg from "@/assets/plans/paris.jpg"
import noronhaImg from "@/assets/plans/noronha.jpg"
import amazoniaImg from '@/assets/plans/amazonia.jpg'
import egyptianImg from "@/assets/plans/egyptian.jpg"
import { IPlans } from "@/interfaces/IPlans.interface";
import patagoniaImg from "@/assets/plans/patagonia.jpg"


export const travelPlans: IPlans[] = [
    {
        id: "#5414506280",
        name: "Paraíso em Fernando de Noronha",
        price: 2999.90,
        description: "Pacote completo com mergulho, trilhas e praias paradisíacas.",
        image: noronhaImg.src
    },
    {
        id: "#5414404124",
        name: "Aventura na Patagônia",
        price: 4599.00,
        description: "Explore montanhas, geleiras e a fauna do sul da América.",
        image: patagoniaImg.src
    },
    {
        id: "#5414404124",
        name: "Romance em Paris",
        price: 7999.99,
        description: "Hospedagem, passeios e jantar com vista para a Torre Eiffel.",
        image: parisImg.src
    },
    {
        id: "#5414404124",
        name: "Cultura e História no Egito",
        price: 6890.00,
        description: "Conheça as pirâmides, museus e o rio Nilo em um só pacote.",
        image: egyptianImg.src
    },
    {
        id: "#5408113818",
        name: "Natureza Selvagem na Amazônia",
        price: 3990.00,
        description: "Vivência com comunidades ribeirinhas e passeios fluviais.",
        image: amazoniaImg.src
    }
];
