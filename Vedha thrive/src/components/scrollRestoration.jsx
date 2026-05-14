import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use 'instant' to tell the browser: "Do not animate. Do not slide. Just BE at the top."
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', 
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;