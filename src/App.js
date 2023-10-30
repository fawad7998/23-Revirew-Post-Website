import React, { useState } from "react";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [letterCount, setLetterCount] = useState(0);
  const maxLetterLimit = 400;

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setLetterCount(inputText.length);

    if (inputText.length > maxLetterLimit) {
      document.getElementById("letter-limit").innerText = "You have reached the limit";
    } else {
      document.getElementById("letter-limit").innerText = `Letter: ${inputText.length}`;
    }
  };

  const handleAddReview = () => {
    const inputText = document.getElementById("user-input").value;

    if (inputText.trim() === "") {
      alert("Please enter a review.");
      return;
    }

    if (letterCount > maxLetterLimit) {
      alert("You have reached the letter limit.");
      return;
    }

    const review = {
      text: inputText,
      date: new Date().toLocaleDateString(),
    };

    setReviews([...reviews, review]);

    document.getElementById("user-input").value = "";
    setLetterCount(0);
    document.getElementById("letter-limit").innerText = "Letter: 0";
  };

  const handlePublish = (index) => {
    const review = reviews[index];
    const publishedReview = (
      <div key={index} className="userReview w-1/3 m-6 bg-green-200 h-[300px]">
        <div className="review-info">
          <div className="flex flex-col items-center justify-between space-y-48">
            <p className="h-[40px] w-full bg-green-200 outline-none px-4 ">
              {review.text}
            </p>
            <div className="extra-info flex w-full justify-between px-8 p-4">
              <h1 id="letter-limit" className="bg-green-400 py-1 px-5 rounded text-sm">
                Letter: {review.text.length}
              </h1>
              <h1 id="Review Date" className="bg-green-400 py-1 px-5 rounded text-sm">
                {review.date}
              </h1>
              <button
                id="delete"
                className="bg-green-400 rounded py-1 px-3 text-sm"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    setReviews(reviews.filter((_, i) => i !== index));
    document.getElementById("published-reviews").appendChild(publishedReview);
  };

  const handleDelete = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  return (
    <>
      <main className="main">
        <h1 className="text-2xl text-black text-center">Review App</h1>
        <div className="search w-full h-16">
          <div className="flex flex-row items-center justify-center p-4">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Enter Review!"
                className="outline-none bg-gray-100 px-3 py-1 rounded w-full"
                id="user-input"
                onChange={handleInputChange}
              />
              
            </div>
          </div>
        </div>
        <button
          className="text-lg text-black ml-[570px] bg-green-400 hover:bg-green-200 py-1 px-4 rounded"
          id="Add-review"
          onClick={handleAddReview}
        >
          New Review
        </button>

        <div className="reviews w-full flex items-center flex-wrap justify-evenly" id="published-reviews">
          {reviews.map((review, index) => (
            <div key={index} className="userReview w-1/3 m-6 bg-green-200 h-[300px]">
              <div className="review-info">
                <div className="flex flex-col items-center justify-between space-y-48">
                  <p className="h-[40px] w-full bg-green-200 outline-none px-4 ">
                    {review.text}
                  </p>
                  <div className="extra-info flex w-full justify-between px-8 p-4">
                    <h1 id="letter-limit" className="bg-green-400 py-1 px-5 rounded text-sm">
                      Letter: {review.text.length}
                    </h1>
                    <h1 id="Review Date" className="bg-green-400 py-1 px-5 rounded text-sm">
                      {review.date}
                    </h1>
                    <button
                      id="delete"
                      className="bg-green-400 rounded py-1 px-3 text-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
