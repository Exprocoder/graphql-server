import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from './../queries/queries';



class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorID: 0
        }
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
    }

    displayAuthors() {
        const data = this.props.data;
        if (data.loading) return (<option>Authors are loading...</option>);

        return data.allAuthor.map(author => <option key={author.id} value={author.id}>{author.name}</option>);
    }
    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="field">
                    <label htmlFor="genre">Genre: </label>
                    <input id="genre" type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                </div>
                <div className="field">
                    <label htmlFor="author">Author: </label>
                    <select id="author" onChange={(e) => this.setState({ authorID: e.target.value })}>
                        <option>Select an author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <div className="field">
                    <button>+</button>
                </div>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);