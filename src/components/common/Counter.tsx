import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface CounterProps {
  start: number;
  end: number;
  duration?: number; // Varsayılan süre 3 saniye
  fontSize?: string | number;
  suffix?: "%" | "+";
  color?: string;
}

const Counter = ({
  start,
  end,
  duration = 3000,
  fontSize = "2rem",
  suffix,
  color = "#fff",
}: CounterProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (start === end) return;

    const stepTime = duration / Math.abs(end - start);
    let current = start;

    const counterInterval = setInterval(() => {
      current += start < end ? 1 : -1;
      setCount(current);
      if (current === end) clearInterval(counterInterval);
    }, stepTime);

    return () => clearInterval(counterInterval);
  }, [start, end, duration]);

  return (
    <Typography
      sx={{
        display: "inline-flex",        // ✅ Rakam ve suffix'i aynı satırda hizala
        alignItems: "center",        // ✅ Aynı yatay çizgide tut
        lineHeight: 1,                 // ✅ Farklı line-height'leri engelle
        fontSize,
        fontWeight: "bold",
        color,
      }}
    >
      {count}
      {suffix && (
        <span style={{ marginLeft: 4 /* soldan 4px boşluk */ }}>{suffix}</span>
      )}
    </Typography>
  );
};

export default Counter;
