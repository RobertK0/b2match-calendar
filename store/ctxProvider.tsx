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
};

const Ctx = createContext<context>({
  events: [],
  setEvents: () => {},
});

export const CtxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<transformedData[]>([]);

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

  const ctxValue: context = {
    events,
    setEvents: setEventsHandler,
  };
  return <Ctx.Provider value={ctxValue}>{children}</Ctx.Provider>;
};

export default Ctx;
