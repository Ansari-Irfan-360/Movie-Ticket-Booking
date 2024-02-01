import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const truncateText = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
};

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );

        const data = await response.json();
        console.log(data);
        setShows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Popular Shows</h2>
      <div className="row">
        {shows.map((show) => (
          <div key={show.show.id} className="col-md-4 mb-4">
            <Card>
              {show.show.image ? (
                <Card.Img variant="top" src={show.show.image?.medium} />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    backgroundColor: "black",
                  }}
                ></div>
              )}
              
              <Card.Body>
                <Card.Title>{show.show.name}</Card.Title>
                <Card.Text
                  dangerouslySetInnerHTML={{
                    __html: truncateText(show.show.summary, 150),
                  }}
                />
                <Link to={`/show/${show.show.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
