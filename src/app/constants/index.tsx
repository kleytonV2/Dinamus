export const navItems = [
    { label: "Home", href: "#home" },
    { label: "Treinos", href: "#treinos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" }
];

export const adminNavItems = [
    { label: "Home", href: "./" },
    { label: "Alunos", href: "./students" },
    { label: "Treinos", href: "./classes" },
    { label: "Assistências", href: "./attendances" }
];

export const sections = [
    { id: "home", label: "Home", dataBg: "dark", height: "lg:h-screen" },
    { id: "treinos", label: "Treinos", dataBg: "dark", height: "lg:h-screen" },
    { id: "sobre", label: "Sobre", dataBg: "light", height: "lg:h-screen" },
    { id: "contato", label: "Contato", dataBg: "light", height: "" }
];

import studentsIcon from "@/app/assets/icons/studentsIcon.svg";
import classIcon from "@/app/assets/icons/classIcon.svg";
import attendanceIcon from "@/app/assets/icons/attendanceIcon.svg";
export const DBCollections = [
    { label: "Alunos", href: "/admin/students", icon: studentsIcon },
    { label: "Treinos", href: "/admin/classes", icon: classIcon  },
    { label: "Assistências", href: "/admin/attendances", icon: attendanceIcon  }
];

import img_1 from "@/app/assets/img_1.webp";
import img_2 from "@/app/assets/img_2.webp";
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