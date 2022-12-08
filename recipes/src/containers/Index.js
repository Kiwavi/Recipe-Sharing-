import React from 'react';

export class Index extends React.Component {
    render() {
	return (
	    <div className="app">
	      <h2>Container goes here</h2>
	      <div className="page">
		{this.props.children}
	      </div>
	    </div>
	);
    }
}
export default Index;
