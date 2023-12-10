// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const Home = () => {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setmsg] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [btnDisabaled, setBtnDisabaled] = useState(false);

  const [fileUrlByFirebase, setFileUrlByFirebase] = useState("");
  const fileUrlref = ref(Storage, "audio/");
  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else {
      history.push("/login");
    }
    const currentDate = new Date();

    // Formatting the date as "DD/mm/yyyy"
    const formattedDate = `${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}/${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${currentDate.getFullYear()}`;

    setTodayDate(formattedDate);

    listAll(fileUrlref).then((res) => {
      console.log(res);
      let audioref = ref(Storage, "audio/one.mp3");
      getDownloadURL(audioref).then((url) => {
        setFileUrlByFirebase(url);
      });
    });
  }, []);

  const handalChange = (e) => {
    setFile(e.target.files[0]);
    setBtnDisabaled(true);
    console.log(e.target.files[0]);
  };

  //For HTTP Request
  // const handalsubmit = (e) => {
  //   e.preventDefault();
  //   if (!file) {
  //     console.log("No File Selected");
  //     setmsg("No File Selected");
  //     return;
  //   }

  //   const formDate = new FormData();
  //   formDate.append("file", file);
  //   setmsg("Uploading ...");
  //   setProgress((prevState) => {
  //     return { ...prevState, started: true };
  //   });
  //   axios
  //     // .post("https://httpbin.org/post", formDate, {
  //     .post("http://localhost/jayesh/", formDate, {
  //       onUploadProgress: (ProgressEvent) => {
  //         setProgress((prevState) => {
  //           return { ...prevState, pc: ProgressEvent.progress * 100 };
  //         });
  //       },
  //       headers: {
  //         Accept: "audio/mp3*",
  //       },
  //     })
  //     .then((res) => {
  //       setmsg("Upload Completed");
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       setmsg("Error", err);
  //       console.error(err);
  //     });

  //   // fetch("url", {
  //   //   method: "POST",
  //   //   body: formDate,
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((res) => {
  //   //     console.log("Success", res);
  //   //   })
  //   //   .catch((err) => console.error(err));
  // };

  //For Firebase App
  const handalsubmit = (e) => {
    e.preventDefault();
    if (file == null) {
      setmsg("Select File");
      return;
    }
    const fileRef = ref(Storage, `audio/one.mp3`);
    uploadBytes(fileRef, file).then(() => {
      alert("Uploaded Done");
      setmsg("Uploaded Done");
      console.log("Upload Done");
    });
  };
  const handalLogOut = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={handalLogOut}
          className="btn btn-primary"
          style={{
            margin: 20,
          }}
        >
          Log Out
        </button>
      </div>
      <div className="container">
        <h1>Welcome Home </h1>
        <h2>Upload Nitya Prerna of Date: {todayDate}</h2>
        <form onSubmit={handalsubmit}>
          <div className="insideFormContainer" title="Upload File To processed">
            <div>
              <input
                type="file"
                name="file"
                onChange={handalChange}
                accept="audio/*"
              />
            </div>
            <div className="submitBtnContainer">
              {!btnDisabaled ? (
                <button type="button" disabled className="btn btn-secondary">
                  Submit
                </button>
              ) : (
                <button className="btn btn-primary">Submit</button>
              )}
            </div>
          </div>
        </form>

        <div className="profressContainer">
          {progress.started && (
            <progress max={100} value={progress.pc}></progress>
          )}
          {msg && <span className="spanTxt">{msg}</span>}
          <h6>{fileUrlByFirebase}</h6>
        </div>
      </div>
    </>
  );
};

export default Home;
