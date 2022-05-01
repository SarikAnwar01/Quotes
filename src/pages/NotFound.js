import logo from "./404.jpg";
const NotFound = () => {
    return (
        <div className="centered">
            <h1>404</h1>
            <img src={logo} alt="404" />
        </div>

    );
};
export default NotFound;