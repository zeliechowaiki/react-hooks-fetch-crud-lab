import React, { useState } from "react";

function QuestionForm({onAddQuestion}) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function checkSubmit(e) {
    e.preventDefault();

    const validObj = Object.values(formData).every(entry => {
      return entry !== '';
    })

    if (validObj) {handleSubmit()}
    else {alert("Please fill out every field")};
  }

  function handleSubmit() {

    let answers = [];

    Object.keys(formData).forEach(key => {
      if (key.includes('answer')) {
        answers.push(formData[key]);
      }
    });

    const dataToSend = {
      prompt: formData.prompt,
      answers: answers,
      correctIndex: formData.correctIndex
    }

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then((newQuestion) => {onAddQuestion(newQuestion)})

    setFormData({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: 0
   })
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={checkSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
