import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutRoot() {
  return (
    <section className="max-w-7xl m-auto ">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
}
