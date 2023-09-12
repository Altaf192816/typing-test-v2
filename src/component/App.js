import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Button } from "./Button";
import { LoadingSpinner } from "./LoadingSpinner";
import { Main } from "./Main";

const url = "https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=15";


function App() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setISOpen] = useState(false);
  const [user,Setuser] = useState("");
  const [time,setTime] = useState(60);

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
    <div className="bg-gradient-to-b from-[#808080] to-[#ffffff] h-[100vh] text-white  w-[100vw] sm:text-lg">
      <Header />
      <div className="min-h-[70vh] flex justify-center items-center">
        {isOpen ? (
          <Main content={content} setISOpen={setISOpen} isLoading={isLoading} />
        ) : (
          <Button setISOpen={setISOpen}>Start➡️</Button>
        )}
      </div>
    </div>
  );
}


export default App;
