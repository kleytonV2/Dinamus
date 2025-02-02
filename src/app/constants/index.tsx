export const navItems = [
    { label: "Home", href: "#home" },
    { label: "Treinos", href: "#treinos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" }
];

export const sections = [
    { id: "home", label: "Home", dataBg: "dark", height: "lg:h-screen" },
    { id: "treinos", label: "Treinos", dataBg: "dark", height: "lg:h-screen" },
    { id: "sobre", label: "Sobre", dataBg: "light", height: "lg:h-screen" },
    { id: "contato", label: "Contato", dataBg: "light", height: "" }
];

export const DBCollections = [
    { label: "Alunos", href: "/admin/students" },
    { label: "Treinos", href: "/admin/classes" }
];

export const faixas = [
    { label: "Branca" },
    { label: "Amarela" },
    { label: "Laranja" },
    { label: "Verde" },
    { label: "Azul" },
    { label: "Roxa" },
    { label: "Marrom" },
    { label: "Preta" },
    { label: "Coral" },
    { label: "Vermelha" }
];

import img_1 from "@/app/assets/img_1.jpg";
import img_2 from "@/app/assets/img_2.jpg";

export const classes = [
    { 
        name: "Treino 1", 
        day: "Terças", 
        kidsStart: "19:00h", 
        kidsEnd: "20:00h", 
        adultsStart: "20:10h", 
        adultsEnd: "21:40h", 
        minAge: 5, 
        maxAge: 14, 
        bgImageUrl: img_1 
    },
    { 
        name: "Treino 2", 
        day: "Quintas", 
        kidsStart: "19:00h", 
        kidsEnd: "20:00h", 
        adultsStart: "20:10h", 
        adultsEnd: "21:40h", 
        minAge: 14, 
        maxAge: null, 
        bgImageUrl: img_2 
    }
];