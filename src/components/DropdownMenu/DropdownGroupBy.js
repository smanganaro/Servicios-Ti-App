import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

class DropdownGroupBy extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			groupby: this.props.groupby,
		};
	}

	changeGroupBy= (event, groupby) => {
		this.setState({
			groupby: groupby
		});
	};

	setGroupBy = (event, groupby) => {this.props.sendGroupBy(groupby)};

	handleGroupBy = (event, groupby) => {
		this.changeGroupBy(event, groupby)
		this.setGroupBy(event, groupby)
	}

	render(){
		return (
			<Autocomplete
				id="highlights-groupBy"
				style={{ width: 250 }}
				options={groupByOptions}
				getOptionLabel={option => option.name}
				renderInput={params => (
					<TextField {...params}  label="Group By" variant="outlined" fullWidth margin="normal" />
				)}
				onChange={this.handleGroupBy}
				renderOption={(option, { inputValue }) => {
					const matches = match(option.name, inputValue);
					const parts = parse(option.name, matches);

					return (
						<div>
							{parts.map((part, index) => (
								<span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
							))}
						</div>
					);
				}}
			/>
		);
	}


}

export default DropdownGroupBy;

const groupByOptions = [
	{ name: 'Hour', id: 1 },
	{ name: 'Day', id: 2 }];

