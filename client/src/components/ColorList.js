import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
const initialColor = {
	color: '',
	code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
	console.log('ColorList colors: ', colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const id = colorToEdit.id;

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};
	useEffect(() => {
		console.log(colorToEdit);
	}, [editColor]);

	const saveEdit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.put(`/${id}`, colorToEdit)
			.then((res) => {
				console.log('saveEdit res: ', res);
				setColorToEdit({ ...colorToEdit, res });
			})
			.catch((err) => {
				console.log('saveEdit err: ', err);
			});
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is id saved right now?
	};

	const deleteColor = (color) => {
		// make a delete request to delete this color
		axiosWithAuth()
			.delete(`/${color.id}`)
			.then((res) => {
				console.log('deleteColor res: ', res);
				document.location.reload();
			})
			.catch((err) => {
				console.log('deleteColor error: ', err);
			});
	};

	return (
		<div className='colors-wrap'>
			<p>colors</p>
			<ul>
				{colors.map((color) => (
					<li
						key={color.color}
						onClick={() => editColor(color)}
						data-testid='colors'
					>
						<span>
							<span
								className='delete'
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className='color-box'
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={(e) =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className='button-row'>
						<button type='submit'>save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className='spacer' />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
