
const Button = ({color,text,width,cbFunction}) => {
    return (
        <div className="button" style={{backgroundColor: color,width: width}} onClick={cbFunction}>
            <p>{text}</p>
        </div>
    );
}
 
export default Button;