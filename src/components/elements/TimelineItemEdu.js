import React from "react";

function TimelineItemEdu(props) {
  return (
    <div className="timeline-item is-success">
      <div className="timeline-marker is-image is-32x32">
        <img src="" alt="" />
      </div>
      <div className="timeline-content">
        <p className="heading">{props.date}</p>
        <h1 className="title is-4"><a target="_blank" rel="noreferrer"  href={`${props.website}`}>{props.area}</a></h1>
        <h2 className="subtitle is-6">{props.institution}</h2>
        <p style={{ maxWidth: "25em" }}>{props.studyType}</p>
      </div>
    </div>
  );
}

export default TimelineItemEdu;
