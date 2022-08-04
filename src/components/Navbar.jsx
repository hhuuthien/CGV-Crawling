import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(1);

  const dispatch = useDispatch();

  let c1 = activeTab === 1 ? "nav-active" : "";
  let c2 = activeTab === 2 ? "nav-active" : "";

  const activateTab1 = () => {
    setActiveTab(1);
    dispatch({
      type: "ACTIVATE_TAB_1",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activateTab2 = () => {
    setActiveTab(2);
    dispatch({
      type: "ACTIVATE_TAB_2",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="navbar">
      <div className="nav-content">
        <a className={c1} onClick={activateTab1}>
          Now showing
        </a>
        <a className={c2} style={{ marginLeft: 10 }} onClick={activateTab2}>
          Coming soon
        </a>
      </div>
    </div>
  );
}
