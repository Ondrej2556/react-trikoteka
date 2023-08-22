import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div style={{fontSize:"26px"}}>
        To continue you must <Link to="/register">register</Link> or <Link to="/login">login</Link>
    </div>
  )
}

export default Main