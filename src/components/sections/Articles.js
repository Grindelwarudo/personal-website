import React, { Component } from "react";
import Article from "../elements/Article";

class Articles extends Component {
  constructor(props) {
    super();
    this.state = { articles: [] };
  }

  formatAuthors(authors) {
    if (authors.length === 0) {
      return "";
    } else if (authors.length === 1) {
      return authors[0];
    } else {
      return authors[0] + " et al.";
    }
  }

  componentDidMount() {
    const apiKey = process.env.YOUR_API_KEY;
    if (apiKey === null) {
      console.log("WARNING: API KEY EMPTY")
    } else {
      console.log("Pubmed = Ready!")
    }
    const searchTerm = "Firas Hammami";
    const { maxResults } = this.props;

    const esearchURL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=${maxResults}&term=${encodeURIComponent(
      searchTerm
    )}&api_key=${apiKey}`;

    fetch(esearchURL)
      .then(response => response.text())
      .then(data => {
        const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
        const uids = Array.from(xmlDoc.getElementsByTagName("Id")).map(
          idNode => idNode.textContent
        );

        const efetchURL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=${uids.join(
          ","
        )}&api_key=${apiKey}`;

        fetch(efetchURL)
        .then(response => response.text())
        .then(data => {
          const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
          const articles = Array.from(
            xmlDoc.getElementsByTagName("PubmedArticle")
          ).map(articleNode => {
            const title = articleNode.getElementsByTagName("ArticleTitle")[0].textContent;
            const authors = Array.from(
              articleNode.getElementsByTagName("Author")
            ).map(authorNode => authorNode.getElementsByTagName("LastName")[0].textContent);
            const formattedAuthors = this.formatAuthors(authors);
            const url = `https://pubmed.ncbi.nlm.nih.gov/${uids.shift()}`;
            return { title, authors: formattedAuthors, url };
          });

            var offset = maxResults - articles.length;
            for (var i = 0; i < offset; i++) {
              articles.push({ title: "", authors: [], url: "" });
            }

            articles.sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB - dateA;
            });

            const latestArticles = articles.slice(0, maxResults);

            const articleElements = latestArticles.map((article, index) => (
              <div className="column" key={index}>
                <Article
                  key={index}
                  title={article.title}
                  url={article.url}
                  authors={article.authors}
                />
              </div>
            ));

            if (latestArticles.length < maxResults) {
              const offset = maxResults - latestArticles.length;
              for (let i = 0; i < offset; i++) {
                articleElements.push(<div className="column" key={latestArticles.length + i}></div>);
              }
            }

            this.setState({ articles: articleElements });
          })
          .catch(error => {
            console.log("Error fetching articles:", error);
          });
      })
      .catch(error => {
        console.log("Error fetching articles:", error);
      });
  }

  render() {
    const { articles } = this.state;
    const { maxResults } = this.props;

    // Fill empty columns if there are fewer than maxResults articles
    const emptyColumns = [];
    for (let i = articles.length; i < maxResults; i++) {
      emptyColumns.push(<div className="column" key={i}></div>);
    }

    return (
      <section className="section" id="articles">
        <div className="container">
          <h1 className="title">Articles</h1>
          <h2 className="subtitle is-4">My latest articles</h2>
          <div className="columns">
            {articles}
            {emptyColumns}
          </div>
        </div>
      </section>
    );
  }
}


export default Articles;