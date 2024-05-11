
const Button = ({color,text}) => {
    return (
        <div className="button" style={{backgroundColor: color}}>
            <p>{text}</p>
        </div>
    );
}
 
export default Button;