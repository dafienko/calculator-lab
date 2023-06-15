import './App.css';
import { useEffect, useState } from 'react';

import ButtonRow from './ButtonRow'

const BUTTONS = [ 
	['C', 'MS', 'MR', '%'],
	[1, 2, 3, '+'],
	[4, 5, 6, '-'],
	[7, 8, 9, '*'],
	[0, '.', '=', '/']
];

const isOperation = (key) => {
	return (['%', '+', '-', '*', '/']).includes(key);
}

function App() {
	const [result, setResult] = useState('0');
	const [mem, setMem] = useState('');
	const [info, setInfo] = useState(null);
	
	const evaluate = () => {
		const res = eval(result).toString();
		if (!res) {
			setInfo('Err');
		}

		return res;
	}

	const clear = () => {
		setResult('0');
	}

	const onButtonPress = (key) => {
		if (info) {
			return;
		}

		switch (key) {
			case '=': {
				const res = evaluate();
				res ? setResult(res) : clear();
				break;
			}
			case 'C': {
				clear()
				break;
			}
			case 'MS': {
				const res = evaluate();
				if (res) {
					setMem(res);
					setInfo(`M: ${res}`);
				}
				
				clear();

				break;
			}
			case 'MR': {
				if (mem) {
					setResult(result + mem);
				} else {
					setInfo('M Emp');
				}
				break;
			}
			default: {
				if (result==='0' && !isOperation(key)) { // if result is 0 and trying to place a number, replace entirely
					setResult(`${key}`); 
				} else {
					const last = result.at(result.length-1);
					if (isOperation(key) && isOperation(last)) { // replace old operator with new
						setResult(`${result.slice(0, result.length - 1)}${key}`);
					} else { // append key 
						setResult(`${result}${key}`);
					}
				}
			}
		}
	}

	useEffect(() => {
		if (info) {
			const id = setTimeout(() => {
				setInfo(null);
			}, 1000);

			return () => {clearTimeout(id)};
		}
	}, [info]);

	return (
		<div>
			<header>Calculator</header>
			<div id='result' className='buttonRow'><p>{info || result}</p></div>
			<div id='buttonGrid'>
				{BUTTONS.map((row, i) => <ButtonRow key={i} row={row} onButtonPress={onButtonPress} />)}
			</div>
		</div>
	);
}

export default App;