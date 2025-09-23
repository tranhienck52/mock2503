// import LoginForm from "./Form/LoginForm";

import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <section>
      {/* <LoginForm /> */}
      <Link to="/userPage">Hompage</Link>
    </section>
  );
}
