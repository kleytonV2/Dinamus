export const navItems = [
    { label: "Home", href: "#home" },
    { label: "Treinos", href: "#treinos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" }
];

export const sections = [
    { id: "home", label: "Home", dataBg: "dark" },
    { id: "treinos", label: "Treinos", dataBg: "light" },
    { id: "sobre", label: "Sobre", dataBg: "light" },
    { id: "contato", label: "Contato", dataBg: "light" }
];

import img_1 from "@/app/assets/img_1.jpg";
import img_2 from "@/app/assets/img_2.jpg";

export const classes = [
    { name: "Treino 1", start: "18:00h", end: "19:30h", minAge: 5, maxAge: 14, bgImageUrl: img_1 },
    { name: "Treino 2", start: "19:30h", end: "21h", minAge: 14, maxAge: null, bgImageUrl: img_2 }
];