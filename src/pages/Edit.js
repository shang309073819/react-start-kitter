import React from 'react';
import s from '../styles/pages/Editor.scss';
import {Tag, Input, Tooltip, Button, Select, Popconfirm, Spin} from 'antd';
import reqwest from 'reqwest';

const Option = Select.Option;
const {TextArea} = Input;

class Edit extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}

	componentWillMount() {
		const {match} = this.props;
		this.id = match && match.params && match.params.id ? match.params.id : '';
	}

	componentDidMount() {

	}




	render() {
		return (
			<div className={s.box}>

			</div>
		);
	}
}

export default Edit;