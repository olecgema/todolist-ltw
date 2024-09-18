import React, { useState } from 'react';

const JOB_KEY = "JOB_LIST";

function App() {
  const [job, setJob] = useState("");
  const [jobList, setJobList] = useState(() => {
    const storageJobList = JSON.parse(localStorage.getItem(JOB_KEY));
    return Array.isArray(storageJobList) ? storageJobList : [];
  });

  const removeJob = (jobToRemove) => {
    setJobList((prevJobList) => {

      const newJobList = Array.isArray(prevJobList) 
        ? prevJobList.filter((item) => item !== jobToRemove) 
        : [];

      localStorage.setItem(JOB_KEY, JSON.stringify(newJobList));
      return newJobList;
    });
  };

  const handleAddJob = () => {
    if (job === "") {
      return;
    }

    setJobList((prevState) => {
      const newJobList = Array.isArray(prevState) 
        ? [...prevState, job] 
        : [job];

      localStorage.setItem(JOB_KEY, JSON.stringify(newJobList));

      return newJobList;
    });

    setJob("");
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>To do list</h1>
      <div style={{ border: "1px solid yellowgreen", padding: 20 }}>
        <input value={job} onChange={(e) => setJob(e.target.value)} />
        <button onClick={handleAddJob}>Add</button>
        <ul>
          {jobList.map((job, index) => (
            <li key={index}>
              {job}
              <button onClick={() => removeJob(job)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
