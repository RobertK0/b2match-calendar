import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import getData from "../apis/getData";
import commit from "../models/commit";
import transformedData from "../models/transformedData";
import transformData from "../utils/transformData";

type context = {
  events: transformedData[];
  setEvents: (data: transformedData[]) => void;
  theme: "light" | "dark";
  changeTheme: () => void;
};

const Ctx = createContext<context>({
  events: [],
  setEvents: () => {},
  theme: "light",
  changeTheme: () => {},
});

export const CtxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<transformedData[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    getData("facebook", "create-react-app").then(
      (res: commit[]) => {
        setEvents(res.map((element) => transformData(element)));
      }
    );
  }, [setEvents]);

  const setEventsHandler = (data: transformedData[]) => {
    setEvents(data);
  };

  const setThemeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const ctxValue: context = {
    events,
    setEvents: setEventsHandler,
    theme,
    changeTheme: setThemeHandler,
  };
  return <Ctx.Provider value={ctxValue}>{children}</Ctx.Provider>;
};

export default Ctx;
