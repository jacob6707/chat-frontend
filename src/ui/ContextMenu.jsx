import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenuContext = createContext();

function ContextMenu({ children, align = "top" }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition, align }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ children, id }) {
  const { openId, open, close, setPosition, align } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    align === "top"
      ? setPosition({
          x: rect.x,
          y: window.innerHeight - rect.y + 8,
        })
      : setPosition({
          x: window.innerWidth - rect.x - rect.width,
          y: rect.y + rect.height,
        });

    openId === "" || openId !== id ? open(id) : close();
  }

  return cloneElement(children, { onClick: handleClick });
}

function List({ id, children }) {
  const { openId, position, close, align } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      className={`fixed rounded-lg bg-slate-900 text-slate-50 shadow-md`}
      style={
        align === "top"
          ? { left: position.x, bottom: position.y }
          : { right: position.x, top: position.y }
      }
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className="group">
      <button
        className="flex w-full items-center gap-4 border-none px-4 py-2 text-left hover:cursor-pointer hover:bg-slate-600/75 hover:text-slate-100 group-first:rounded-t-lg group-last:rounded-b-lg [&>svg]:h-6 [&>svg]:w-6"
        onClick={handleClick}
      >
        {icon} <span>{children}</span>
      </button>
    </li>
  );
}

ContextMenu.Toggle = Toggle;
ContextMenu.List = List;
ContextMenu.Button = Button;

export default ContextMenu;
