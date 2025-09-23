// import { Outlet, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import axios from "axios";

// export default function LayoutRoot() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token =
//         localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:8080/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserInfo(res.data);
//       } catch (err) {
//         console.error("Không lấy được user:", err);
//         setUserInfo(null);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   if (loading) return <div className="text-center mt-10">Đang tải...</div>;

//   return (
//     <section className="max-w-7xl m-auto">
//       <Header userInfo={userInfo} setUserInfo={setUserInfo} />
//       <Outlet context={{ userInfo, setUserInfo }} />
//       <Footer />
//     </section>
//   );
// }
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

export default function LayoutRoot() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
    if (!token) {
      setUserInfo(null);
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(res.data);
      } catch (err) {
        console.error("Không lấy được user:", err);
        setUserInfo(null);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <section className="max-w-7xl m-auto">
      <Header />
      <Outlet context={{ userInfo, setUserInfo }} />
      <Footer />
    </section>
  );
}
