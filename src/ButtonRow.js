import Button from './Button'

function ButtonRow({row, onButtonPress}){
	return (
		<div className="buttonRow">
		{row.map(buttonKey => <Button key={buttonKey} value={buttonKey} func={onButtonPress} />)}
		</div>
	)
}

export default ButtonRow;