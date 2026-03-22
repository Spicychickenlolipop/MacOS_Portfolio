// import WindowWrapper from "#hoc/WindowWrapper.jsx"
// import { techStack } from "#constants";
// import { Check, Flag } from "lucide-react";
// import WindowControls from "#components/WindowControls.jsx";

// const Terminal = () => {
//   return (
//     <>
//         <div id="window-header">
//             <WindowControls target="terminal"/>
//             <h2>Tech Stack</h2>
//         </div>

//         <div className="techstack">
//             <p>
//                 <span className="font-bold">@anirudra % </span>
//                 show tech stack
//             </p>

//             <div className="label">
//                 <p className="w-32">Category</p>
//                 <p>Technologies</p>
//             </div>

//             <ul className="content">
//                 {techStack.map(({ category, items }) =>(
//                     <li key={category} className="flex items-center">
//                         <Check className="check" size={20}/>
//                         <h3>{category}</h3>
//                         <ul>
//                             {items.map((item, i)=>(
//                                 <li key={i}>
//                                     {item}
//                                     {i < items.length - 1 ? "," : ""}
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
//                 <div className="footnote">
//                     <p>
//                         <Check size={20}/>
//                         5 of 5 stacks loaded successfully(100%)
//                     </p>

//                     <p className="text-black">
//                         <Flag size={15} fill="black"/>
//                         Render time: 6ms
//                     </p>
//                 </div>
//         </div>
//     </>
//   )
// }

// const TerminalWindow = WindowWrapper(Terminal, 'terminal')

// export default TerminalWindow;








import { useState, useRef, useEffect } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";

// 🧠 FILE SYSTEM
const fileSystem = {
  name: "~",
  type: "folder",
  children: {
    about: {
      type: "folder",
      children: {
        "bio.txt": {
          type: "file",
          content: "I am Anirudra, a Full Stack Developer.",
        },
        "interests.txt": {
          type: "file",
          content: "AI, Web Dev, System Design",
        },
        "motivation.txt": {
          type: "file",
          content: "404 motivation not found!",
        },
        "who-cares.txt": {
          type: "file",
          content: `I'm looking for a SDE internship. 
I'm open to collaboration on full stack projects.`,
        },
          "contact.txt": {
              type: "file",
              content: `Email: kisku.anirudra@gmail.com
Github: https://github.com/Spicychickenlolipop
Contact no: 9434324985
Linkedin: in/anirudra-kisku-4335821b5
Personal Website: https://anirudra-kisku.com`,
          },
      },
    },
    "my-dream.cpp": {
      type: "file",
      content: `while (sleeping) {
  money++;
}`,
    },
  },
};

const commands = ["help", "ls", "cd", "pwd", "cat", "clear"];

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Hey, you found the terminal!",
    "Type `help` to get started.",
  ]);

  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [path, setPath] = useState(["~"]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const getDir = () => {
    let dir = fileSystem;
    for (let i = 1; i < path.length; i++) {
      dir = dir.children[path[i]];
    }
    return dir;
  };

  const renderPrompt = () => (
    <>
      <span className="text-yellow-400">anirudra@portfolio</span>{" "}
      <span className="text-green-400">{path.join("/")}</span>{" "}
      <span className="text-red-500">›</span>
    </>
  );

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(" ");
    const base = args[0];
    let output = "";

    const currentDir = getDir();

    switch (base) {
      case "help":
        output = "Commands: ls, cd, pwd, cat, clear";
        break;

      case "ls":
        output = Object.keys(currentDir.children).map((name) => (
          <span
            key={name}
            className={
              currentDir.children[name].type === "folder"
                ? "text-blue-400 mr-3"
                : "mr-3"
            }
          >
            {name}
          </span>
        ));
        break;

      case "cd":
        if (!args[1]) return setPath(["~"]);

        if (args[1] === "..") {
          if (path.length > 1) setPath((prev) => prev.slice(0, -1));
          return;
        }

        if (currentDir.children[args[1]]) {
          if (currentDir.children[args[1]].type === "folder") {
            setPath((prev) => [...prev, args[1]]);
          } else {
            output = "Not a directory";
          }
        } else {
          output = "No such folder";
        }
        break;

      case "pwd":
        output = path.join("/");
        break;

      case "cat":
        const file = currentDir.children[args[1]];
        if (!file) output = "File not found";
        else output = <pre>{file.content}</pre>;
        break;

      case "clear":
        return setHistory([]);

      default:
        output = `zsh: command not found: ${cmd}`;
    }

    setHistory((prev) => [
      ...prev,
      <div key={prev.length}>
        {renderPrompt()} {cmd}
      </div>,
      output,
    ]);

    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }

    if (e.key === "ArrowUp") {
      if (cmdHistory.length === 0) return;
      const newIndex =
        historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
    }

    if (e.key === "ArrowDown") {
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const match = commands.find((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (match) setInput(match);
    }
  };

  return (
    <section className="flex flex-col h-full">

      {/* ✅ HEADER (FIXED) */}
      <div
        id="window-header"
        className="flex gap-3 p-2 bg-gray-200 shrink-0"
      >
        <WindowControls target="terminal" />
      </div>

      {/* ✅ BODY */}
      <div
        className="flex-1 overflow-y-auto p-4 font-mono text-sm
        bg-[#0f172a]/80 backdrop-blur-xl text-white"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        {/* INPUT */}
        <div className="flex gap-2">
          <span>{renderPrompt()}</span>

          <input
            ref={inputRef}
            className="bg-transparent outline-none flex-1 text-white caret-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </section>
  );
};

export default WindowWrapper(Terminal, "terminal");