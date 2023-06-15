
function Button({value, func}) {
	return (
		<button onClick={() => func(value)} className='calcButton'>{value}</button>
	);
}

export default Button;