import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(data => setQuestions(data));
  },[]);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedQuestion) {
    setQuestions((questions) => questions.filter(question => question.id !== deletedQuestion.id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestionss = questions.map(question => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    })

    setQuestions(updatedQuestionss);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm questions={questions} onAddQuestion={handleAddQuestion}/> : 
      <QuestionList questions={questions}
      onDeleteQuestion={handleDeleteQuestion} 
      onUpdateQuestion={handleUpdateQuestion} />}
    </main>
  );
}

export default App;
