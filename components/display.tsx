import moment from "moment";
import { useEffect, useState } from "react";

export function Clock({ short }: { short?: boolean }) {
  const formatClock = short ? "HH:mm" : "HH:mm:ss";
  const [time, setTime] = useState<String | undefined>();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format(formatClock));
    }, moment.duration(0.01, "s").asMilliseconds());
    return () => clearInterval(interval);
  }, []);
  return <>{time}</>;
}

export function Countdown({ time }: { time: string }) {
  const formatClock = "HH:mm:ss";
  const [timeLeft, setTimeLeft] = useState(
    moment(time, formatClock).diff(moment(), "seconds")
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(moment(time, formatClock).diff(moment(), "seconds"));
    }, moment.duration(0.01, "s").asMilliseconds());
    return () => clearInterval(interval);
  }, [time]);
  const t = {
    h: moment.duration(timeLeft, "seconds").hours(),
    m: moment.duration(timeLeft, "seconds").minutes(),
    s: moment.duration(timeLeft, "seconds").seconds(),
  };
  const f = {
    h: t.h > 0 ? t.h.toString().padStart(2, "0") + ":" : "",
    m: t.h > 0 || t.m > 0 ? t.m.toString().padStart(2, "0") + ":" : "",
    s: t.h > 0 || t.m > 0 || t.s > 0 ? t.s.toString().padStart(2, "0") : "",
  };
  if (!f.h && !f.m && !f.s) return <>--:--:--</>;
  return <>{f.h + f.m + f.s}</>;
}
