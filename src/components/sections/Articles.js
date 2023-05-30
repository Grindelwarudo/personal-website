import React, { Component } from "react";
import Article from "../elements/Article";

class Articles extends Component {
  constructor(props) {
    super();
    this.state = { articles: [] };
  }

  componentDidMount() {
    const scholarAPI = "https://api.serpapi.com/search.json?q=Firas+Hammami&tbm=pts&filter=0&exclude_sites=biorxiv.org&sort_by=date&date_range_start=2000&api_key=YOUR_API_KEY";

    fetch(scholarAPI)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let articles = [];
        data = data.organic_results.slice(0, 4);
        data.forEach((element, index) => {
          articles.push(
            <div className="column" key={index}>
              <Article
                key={index}
                title={element.title}
                url={element.link}
                authors={element.authors}
              />
            </div>
          );
        });
        var offset = 4 - data.length;
        for (var i = 0; i < offset; i++) {
          articles.push(<div className="column"></div>);
        }
        this.setState({ articles: articles });
      })
      .catch(error => {
        console.log("Error fetching articles:", error);
      });
  }

  render() {
    return (
      <section className="section" id="articles">
        <div className="container">
          <h1 className="title">Articles</h1>
          <h2 className="subtitle is-4">My latest articles</h2>
          <div className="columns">{this.state.articles}</div>
        </div>
      </section>
    );
  }
}

export default Articles;