
const Button = ({color,text,width,cbFunction}) => {
    return (
        <div 
            className="button"
            data-testid="button"
            style={{backgroundColor: color,width: width}} 
            onClick={cbFunction}>
            <p data-testid="button-text">{text}</p>
        </div>
    );
}
 
export default Button;