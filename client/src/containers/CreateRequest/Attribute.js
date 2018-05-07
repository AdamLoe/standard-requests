import React from "react";

export default class Attribute extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let { keyProp, value, isRequired, onKeyChange, onValueChange, deleteAttribute } = this.props;

		return (
			<div className="Attribute">
				{ isRequired ||
					<div className="DeleteAttribute">
						<img
							onClick={onValueChange}
							src="http://localhost:2002/exit.png"
						/>
					</div>
				}
				<input type="text"
					   value={keyProp}
					   onChange={onKeyChange}
				/>
				<textarea type="text"
					   onChange={this.onClick}
					   value={value}
			  	 />
			</div>
		);
	}
}


/*

 import React from "react";

 export default ({
 keyProp, value, isRequired,
 onKeyChange, onValueChange, deleteAttribute
 }) => {
 console.log('RENDER: Attribute');

 return (
 <div className="Attribute">
 { isRequired ||
 <div className="DeleteAttribute">
 <img
 onClick={deleteAttribute}
 src="http://localhost:2002/exit.png"
 />
 </div>
 }
 <input type="text"
 value={keyProp}
 onChange={onKeyChange}
 />
 <input type="text"
 value={value}
 onChange={onValueChange}
 />
 </div>
 );
 };


 */