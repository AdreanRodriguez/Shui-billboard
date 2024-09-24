import "./messagePage.css";
import { Link } from "react-router-dom";
import Slogo from "../../components/Slogo/Slogo";
import WriteLogo from "../../components/WriteLogo/WriteLogo";
import Messages from "../../components/Messages/Messages";

function MessagePage() {
  return (
    <section className="section__overflow">
      <Link to="/search">
        <Slogo />
      </Link>
      <Messages />
      <Link to="/write">
        <WriteLogo />
      </Link>
    </section>
  );
}

export default MessagePage;
