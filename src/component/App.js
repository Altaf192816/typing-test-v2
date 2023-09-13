import { useEffect, useState } from "react";
import { Header } from "./Header";
import { LoadingSpinner } from "./LoadingSpinner";
import { Main } from "./Main";
import HomePage from "./HomePage";
import { useLocalStorage } from "./useLocalStorage - Copy";

const url = "https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=25";

function App() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setISOpen] = useState(false);

  const [score, setScore] = useState({});
  const [scoreList, setScoreList] = useLocalStorage([],"TypingScores");
  const [user, setUser] = useState("");
  const [time, setTime] = useState(60);

  let difficulty = "";
  switch (time) {
    case 60:
      difficulty = "Easy";
      break;
    case 120:
      difficulty = "Medium";
      break;
    case 180:
      difficulty = "Hard";
      break;
    default:
      break;
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function dataFecthing() {
        try {
          setIsLoading(true);
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "cb224e1b45msh081aabaaf19def7p174252jsn9b238512c4e9",
              "X-RapidAPI-Host": "hargrimm-wikihow-v1.p.rapidapi.com",
            },
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          const sentence = Object.values(data)
            .join("")
            .toLowerCase()
            .replaceAll(".", " ")
            .replaceAll(",", " ")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll('"', "")
            .replaceAll("  ", " ");

          setContent(sentence);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err);
          }
        } finally {
          setIsLoading(false);
        }
      }
      dataFecthing();

      return () => controller.abort();
    },
    [setContent, isOpen]
  );



  if (isLoading)
    return (
      <div className="flex h-[100vh] justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-[#808080] to-[#d6cfcf] h-[100vh] text-white  w-[100vw] sm:text-lg">
      <Header />
      <div className="min-h-[70vh] flex justify-center items-center">
        {isOpen ? (
          <Main
            content={content}
            setISOpen={setISOpen}
            isLoading={isLoading}
            setScore={setScore}
            user={user}
            time={time}
            difficulty={difficulty}
            setScoreList = {setScoreList}
            score = {score}
          />
        ) : (
          <HomePage
            setISOpen={setISOpen}
            scoreList={scoreList}
            setScoreList = {setScoreList}
            setUser={setUser}
            setTime={setTime}
            user={user}
            time={time}
          />
        )}
      </div>
    </div>
  );
}

export default App;
