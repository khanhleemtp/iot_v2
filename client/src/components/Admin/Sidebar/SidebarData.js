import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    id: "0",
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav__link"
  },
  {
    id: "1",
    title: "Login",
    path: "/login",
    icon: <IoIcons.IoIosLogIn />,
    cName: "nav__link"
  },
  {
    id: "2",
    title: "Add User",
    path: "/add",
    icon: <FaIcons.FaDocker />,
    cName: "nav__link"
  },
  {
    id: "3",
    title: "Team",
    path: "/",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav__link"
  },
  {
    id: "4",
    title: "Parking",
    path: "/session",
    icon: <AiIcons.AiFillCamera />,
    cName: "nav__link"
  },
  {
    id: "5",
    title: "Messages",
    path: "/",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav__link"
  },
  {
    id: "6",
    title: "Support",
    path: "/session",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav__link"
  }
];
