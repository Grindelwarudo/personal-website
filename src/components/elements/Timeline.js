import React from "react";
import TimelineItem from "./TimelineItem";
import TimelineItemEdu from "./TimelineItemEdu";
import TimelineHeader from "./TimelineHeader";
import Resume from "../../resume.json";

function Timeline() {

// Combine work and education items
const items = [...Resume.work, ...Resume.education];

// Sort items by endDate in descending order
items.sort((a, b) => {
  if (a.endDate === "present") return -1;
  if (b.endDate === "present") return 1;
  return new Date(b.endDate) - new Date(a.endDate);
});

// Filter unique years
const years = items
  .map((item) => {
    if (item.endDate === "present") {
      item.endDate = new Date();
      return new Date(item.endDate).getFullYear();
    } else {
      return new Date(item.endDate).getFullYear();
    }
  })
  .filter((value, index, self) => self.indexOf(value) === index);

return (
  <div className="timeline is-centered">
    <header className="timeline-header">
      <span className="tag is-medium is-dark">
        {new Date().getFullYear()}
      </span>
    </header>
    <div className="timeline-item">
      <div className="timeline-marker is-success"></div>
      <div className="timeline-content"></div>
    </div>

    {years.map((year, i) => {
      let content = [];
      content.push(<TimelineHeader key={i} year={year} />);
      content.push(
        items
          .filter(
            (item) => (item.endDate === "present" && new Date(item.startDate).getFullYear() <= year) || 
            (new Date(item.endDate).getFullYear() === year && new Date(item.startDate).getFullYear() <= year)
          )
          .map((item, j) => {
            if (item.company && item.position) {
              return (
                <TimelineItem
                  key={j}
                  date={
                    new Date(item.startDate).toLocaleString("en-UK", {
                      month: "long",
                      year: "numeric",
                    }) +
                    " - " +
                    new Date(item.endDate).toLocaleString("en-UK", {
                      month: "long",
                      year: "numeric",
                    })
                  }
                  company={item.company}
                  position={item.position}
                  website={item.website}
                  summary={item.summary}
                />
              );
            } else if (item.institution && item.area) {
              return (
                <TimelineItemEdu
                  key={j}
                  date={
                    new Date(item.startDate).toLocaleString("en-UK", {
                      month: "long",
                      year: "numeric",
                    }) +
                    " - " +
                    new Date(item.endDate).toLocaleString("en-UK", {
                      month: "long",
                      year: "numeric",
                    })
                  }
                  area={item.area}
                  institution={item.institution}
                  studyType={item.studyType}
                />
              );
            }
            return null;
          })
      );
      console.log(content);
      return content;
    })}
  </div>
);
}

export default Timeline;
