import React from "react";

function Article(props) {
  return (
    <div className="card article">
      <div className="card-header">
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          <p className="card-header-title">{props.title}</p>
        </a>
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-header-icon"
          aria-label="Google Scholar"
        >
          <span className="icon">
            <i className="fab fa-2x fa-google"></i>
          </span>
        </a>
      </div>
      <div className="card-content">
        <h1 className="heading">Authors: {props.authors}</h1>
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          Read the full article
        </a>
      </div>
    </div>
  );
}

export default Article;