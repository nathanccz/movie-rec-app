import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Preloader from "./Preloader";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? <Preloader /> : (
        <>
          <Outlet />
        </>
      )}
    </>
  )
}

export default Layout;