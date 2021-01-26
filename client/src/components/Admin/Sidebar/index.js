import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import styled from "styled-components";
import { TokenService } from "../../../services/token.service";

const SideBarStyle = styled.div`
  /* ====OVERLAY=====  */
  .sidebar__overlay {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    z-index: 3; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
    &-active {
      display: block;
    }
  }
  .sidebar__wrapper {
    width: 100%;
  }

  /*===== HEADER =====*/
  .header {
    user-select: none;
    height: var(--header-height);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--header-color);
    transition: 0.3s ease;
    margin-bottom: 12px;
    transform: translateY(55px);
    position: relative;
    &__img {
      cursor: pointer;
      background: #fff;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      img {
        width: 40px;
        height: 40px;
      }
    }
    &__info {
      transform: translateY(-66px);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &-active {
        background: #fff;
        transform: translateY(0);
        transition: all 0.3s ease;
        z-index: 3;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
    }
    &__title {
      color: #4a5677;
      font-size: 24px;
      line-height: 30px;
      font-weight: 600;
      text-transform: uppercase;
      white-space: nowrap;
      &-active {
        transition: all 0.3s linear;
      }
    }
  }

  /*======Mobile-Header======*/
  .mobile__header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    background: #3e97ff;
    padding: 0 15px;
    height: 55px;
    &__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      height: calc(1.5em + 1.3rem + 2px);
      width: calc(1.5em + 1.3rem + 2px);
      cursor: pointer;
    }
    &__content {
      display: flex;
      align-items: center;
    }
  }

  /*===== NAV =====*/
  .l-navbar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--nav-width);
    background-color: var(--first-color);
    transition: 0.3s linear;
    z-index: -1;
    opacity: 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    font-size: 14px;
    &__container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__logo,
    &__link {
      display: grid;
      grid-template-columns: max-content max-content;
      align-items: center;
      column-gap: 1.5rem;
      padding: 9px 25px;
      min-height: 56px;
    }
    &__logo {
      column-gap: 0;
      cursor: inherit;
      justify-content: space-between;
      height: 80px;
      font-size: 24px;
      text-transform: uppercase;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      height: 40px;
      margin-left: -10px;
      margin-top: -2px;
      svg {
        cursor: pointer;
      }
      &-icon {
        font-size: 1.25rem;
        color: var(--white-color);
        display: flex;
        align-items: center;
      }
      &-name {
        color: var(--white-color);
        font-weight: 700;
        margin-left: 16px;
      }
    }

    &__link {
      position: relative;
      color: var(--white-color);
      /* transition: 0.3s; */
      &:hover {
        background-color: var(--background-hover-color);
      }
      &--last {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }

  /*Show navbar movil*/
  .show {
    left: 0;
  }

  /*Add padding body movil*/
  .body-pd {
    padding-left: 0;
  }

  /*Active links*/
  .active {
    color: var(--white-color);
    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 32px;
      background-color: var(--white-color);
    }
  }

  /* child container */
  .child__wrapper__container {
    padding: 0 12px;
    transform: translateY(55px);
  }
  .child__container {
    padding: 0 15px;
    width: 100%;
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
    margin-top: 12px;
  }

  .bx-x {
    --nav-width: 265px;
    opacity: 1;
    z-index: var(--z-fixed);
  }

  /* ===== MEDIA QUERIES=====*/
  @media screen and (min-width: 1024px) {
    .l-navbar {
      position: fixed;
      border-radius: 10px;
      top: 12px;
      left: 12px;
      bottom: 12px;
      width: var(--nav-width);
      background-color: var(--first-color);
      transition: 0.3s;
      z-index: var(--z-fixed);
      opacity: 1;
    }
    .sidebar__container {
      margin: 0 12px;
      margin-top: 12px;
      padding-left: calc(var(--nav-width) + 1rem);
    }
    .nav {
      &__logo {
        a {
          order: 3;
          margin-left: 32px;
        }
        height: 80px;
        margin-left: 0;
        margin-top: 0;
        &-active {
          a {
            order: 0;
            margin-left: 0px;
          }
        }
      }
    }

    .header {
      transform: translateY(0);
      &__info {
        transform: translateY(0);
        z-index: -1;
        &-active {
          border-radius: 8px;
          padding: 1rem;
        }
      }
      &__title {
        transform: translateY(0);
      }
      border-radius: 8px;
    }
    .mobile__header {
      display: none;
    }
    /*Show navbar desktop*/
    .show {
      width: calc(var(--nav-width) + 156px);
    }

    /*Add padding body desktop*/
    .body-pd {
      padding-left: calc(var(--nav-width) + 128px);
    }

    .child__wrapper__container {
      padding: 0;
      transform: translateY(0);
    }
    .sidebar__overlay {
      &-active {
        display: none;
      }
    }
  }
`;

const Sidebar = ({ Child, title }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);
  const showShowSidebar = () => setShowSidebar(!showSidebar);
  const showHeader = () => setActiveHeader(!activeHeader);
  const history = useHistory();
  if (!TokenService.getToken()) history.push("/login");
  return (
    <SideBarStyle>
      <div className="sidebar__container">
        <div
          className={`sidebar__overlay ${showSidebar ? "sidebar__overlay-active" : ""}`}
          onClick={() => setShowSidebar(false)}
        ></div>
        <div className={`${showSidebar ? `body-pd` : "sidebar__wrapper"}`}>
          <IconContext.Provider value={{ color: "#fff", size: "24px" }}>
            {/* Mobile Header */}
            <div className="mobile__header">
              <div className="mobile__header__logo">
                <img src="/logo.png" alt="logo" />
              </div>
              <div className="mobile__header__content">
                <div className="mobile__header__btn" onClick={showShowSidebar}>
                  <AiIcons.AiOutlineMacCommand />
                </div>
                <div className="mobile__header__btn" onClick={showHeader}>
                  <AiIcons.AiOutlineUser />
                </div>
              </div>
            </div>

            {/* Header */}
            <header className={`header ${activeHeader ? `header-active` : ``}`}>
              <div className={`header__title ${activeHeader ? `` : `header__title-active`}`}>{title}</div>
              <div className={`header__info ${activeHeader ? `header__info-active` : ``}`}>
                <div>Admin</div>
                <div className="header__img">
                  <img src="logo192.png" alt="" />
                </div>
              </div>
            </header>
            {/* Sidebar */}
            <div className={`l-navbar ${showSidebar ? `bx-x` : ""}`} id="nav-bar">
              <nav className={`nav`}>
                <div className="nav__container">
                  <div className={`nav__link nav__logo ${showSidebar ? "nav__logo-active" : ""}`}>
                    <Link to="/" className="">
                      <img src="/logo.png" alt="logo" />
                    </Link>
                    <AiIcons.AiOutlineMenu onClick={showShowSidebar} />
                  </div>

                  <div className="nav__list">
                    {SidebarData.map((item, index) => {
                      return (
                        <Link
                          to={item.path}
                          key={index}
                          className={`${item.cName} ${parseInt(activeLink) === index ? `active` : ""}`}
                          onClick={() => {
                            setActiveLink(item.id);
                          }}
                        >
                          {item.icon}
                          <span className="nav__name">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <Link
                    to="/"
                    className="nav__link nav__link--last"
                    onClick={() => {
                      TokenService.removeToken();
                      history.push("/");
                    }}
                  >
                    <AiIcons.AiOutlineLogout />
                    <span className="nav__name">Log Out</span>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Container */}
            <div className="child__wrapper__container">
              <div className="child__container">
                <Child />
              </div>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </SideBarStyle>
  );
};

export { Sidebar };
