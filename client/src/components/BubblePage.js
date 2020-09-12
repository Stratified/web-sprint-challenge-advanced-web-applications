import React, { useState, useEffect } from 'react';
import Bubbles from './Bubbles';
import ColorList from './ColorList';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const BubblePage = (props) => {
	const [colorList, setColorList] = useState(props.colors || []);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	useEffect(() => {
		axiosWithAuth()
			.get('http://localhost:5000/api/colors')
			.then((res) => {
				console.log('BubblePage res: ', res.data);
				setColorList(res.data);
			})
			.catch((err) => {
				console.log('BubblePage error: ', err);
			});
	}, []);
	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
