
const Button = ({ bgColor, color, text, width, height, fontSize, cbFunction, icon }) => {
    return (
        <div
            className={`button d-flex align-items-center justify-content-center`}
            data-testid="button"
            style={{ backgroundColor: bgColor, color: color, width: width, height: height, fontSize: fontSize }}
            onClick={cbFunction}>
            {icon &&
                <img src={icon} />
            }
            <p className="m-0" data-testid="button-text">{text}</p>
        </div>
    );
}

export default Button;