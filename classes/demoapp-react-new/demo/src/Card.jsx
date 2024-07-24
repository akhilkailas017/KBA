import { useState } from "react";
import "./Card.css";
const Card = ({ h2Style , a}) => {
  
  const [likes, setLikes] = useState(0);
  const [dislike, setDislike] = useState('Like');

  const buttonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "purple",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className="card">
      <h2 className="card-title">Card Title</h2>
      <p className="card-content">This is some text inside the card.</p>
      <h2 style={h2Style}>Now Hapenning</h2>

      <h3>
        <button style={buttonStyle} onClick={() => setLikes(likes + a)}>
          Likes: {likes}
        </button>
      </h3>
      <h3>
        <button style={buttonStyle} onClick={() => {
          if(dislike=='like'){
            setDislike('dislike')
          }
          else{
            setDislike('like')
          }
        }}>{dislike}
        </button>
      </h3>
    </div>
  );
};

export default Card;