import type { IconType } from "react-icons";
import {
  IoSpeedometerOutline,
  IoPawOutline,
  IoLogOutOutline,
  IoHeartOutline,
  IoListOutline,
  IoAccessibilityOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { SideMenuItem } from "./SideMenuItem";
import { useAuthStore } from "../../../stores/bears/auth.store";

interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    subTitle: "Visualizar data",
    href: "/dashboard",
    Icon: IoSpeedometerOutline,
  },
  {
    title: "Osos",
    subTitle: "Manejador de osos",
    href: "/dashboard/bears",
    Icon: IoPawOutline,
  },
  {
    title: "Persona",
    subTitle: "Nombre y apellido",
    href: "/dashboard/person",
    Icon: IoAccessibilityOutline,
  },
  {
    title: "Tareas",
    subTitle: "Listado de tareas",
    href: "/dashboard/tasks",
    Icon: IoListOutline,
  },
  {
    title: "Boda",
    subTitle: "Invitados a la boda",
    href: "/dashboard/wedding-invitation",
    Icon: IoHeartOutline,
  },
];

export const SideMenu = () => {
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const userName = useAuthStore((state) => state.user?.fullName || "No user");

  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 overflow-y-scroll"
    >
      <div id="logo" className="my-4 px-6">
        {/* Title */}
        <h1 className="text-lg md:text-2xl font-bold text-white">
          Zustand
          <span className="text-blue-500 text-xs"> StateManager</span>.
        </h1>
        <p className="text-slate-500 text-sm">
          Manejador de estados simple pero poderoso.
        </p>
      </div>

      {/*  Profile */}
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <img
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt=""
            />
          </span>
          <span className="text-sm md:text-base font-bold">{userName}</span>
        </a>
      </div>

      {/* Menu Items */}
      <nav id="nav" className="w-full px-6">
        {menuItems.map((item) => (
          <SideMenuItem key={item.href} {...item} />
        ))}

        {/* Logout */}
        {/* aquí también podría ser un button y no habría necesidad de colocar un "href" o un "to" como en este caso porque el estado ya está compartido por Zustand y también el usuario como estaría dentro del DashboardLayout.tsx entonces su estado del authStatus también va a cambiar porque hizo el logout y se volvería a re-renderizar el DashboardLayout.tsx (porque cambió el estado del store) y ahí tiene las validaciones entonces se encargará de realizar la lógica de revisar el status del usuario para ver si puede permanecer o no en la página */}
        <NavLink to={"/auth/login"} onClick={logoutUser} className="mt-10">
          <div>
            <IoLogOutOutline />
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-slate-300 font-bold leading-5">
              Logout
            </span>
            <span className="text-sm text-slate-500 hidden md:block">
              Cerrar sesión
            </span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};
