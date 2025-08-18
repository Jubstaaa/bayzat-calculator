import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Alert,
  Fade,
  Chip,
  Divider,
} from "@mui/material";
import { Calculate, History, Error as ErrorIcon } from "@mui/icons-material";
import { evaluateExpression } from "../lib/evaluator";

enum ButtonColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
  INHERIT = "inherit",
}

enum ButtonVariant {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

type ButtonDef = {
  label: string;
  value: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
};

const buttons: ButtonDef[][] = [
  [
    {
      label: "C",
      value: "C",
      color: ButtonColor.ERROR,
      variant: ButtonVariant.CONTAINED,
    },
    {
      label: "⌫",
      value: "BACK",
      color: ButtonColor.WARNING,
      variant: ButtonVariant.OUTLINED,
    },
    {
      label: "(",
      value: "(",
      variant: ButtonVariant.OUTLINED,
    },
    {
      label: ")",
      value: ")",
      variant: ButtonVariant.OUTLINED,
    },
  ],
  [
    { label: "7", value: "7", variant: ButtonVariant.OUTLINED },
    { label: "8", value: "8", variant: ButtonVariant.OUTLINED },
    { label: "9", value: "9", variant: ButtonVariant.OUTLINED },
    {
      label: "÷",
      value: "/",
      color: ButtonColor.PRIMARY,
      variant: ButtonVariant.CONTAINED,
    },
  ],
  [
    { label: "4", value: "4", variant: ButtonVariant.OUTLINED },
    { label: "5", value: "5", variant: ButtonVariant.OUTLINED },
    { label: "6", value: "6", variant: ButtonVariant.OUTLINED },
    {
      label: "×",
      value: "*",
      color: ButtonColor.PRIMARY,
      variant: ButtonVariant.CONTAINED,
    },
  ],
  [
    { label: "1", value: "1", variant: ButtonVariant.OUTLINED },
    { label: "2", value: "2", variant: ButtonVariant.OUTLINED },
    { label: "3", value: "3", variant: ButtonVariant.OUTLINED },
    {
      label: "−",
      value: "-",
      color: ButtonColor.PRIMARY,
      variant: ButtonVariant.CONTAINED,
    },
  ],
  [
    { label: "0", value: "0", variant: ButtonVariant.OUTLINED },
    { label: ".", value: ".", variant: ButtonVariant.OUTLINED },
    {
      label: "=",
      value: "=",
      color: ButtonColor.SECONDARY,
      variant: ButtonVariant.CONTAINED,
    },
    {
      label: "+",
      value: "+",
      color: ButtonColor.PRIMARY,
      variant: ButtonVariant.CONTAINED,
    },
  ],
];

function isOperator(ch: string): boolean {
  return ["+", "-", "*", "/"].includes(ch);
}

function endsWithOperator(expr: string): boolean {
  return /[+\-*/]$/.test(expr);
}

export default function Calculator() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const appendValue = useCallback((val: string) => {
    setError(null);
    setExpression((prev) => {
      if (val === ".") {
        const parts = prev.split(/([+\-*/()])/);
        const current = parts[parts.length - 1] ?? "";
        if (current.includes(".")) return prev;
        return prev + val;
      }
      if (isOperator(val)) {
        if (
          val === "-" &&
          (prev === "" || endsWithOperator(prev) || prev.endsWith("("))
        ) {
          return prev + "0-";
        }
        if (prev === "") return prev;
        if (endsWithOperator(prev)) return prev.slice(0, -1) + val;
      }
      return prev + val;
    });
  }, []);

  const clearAll = useCallback(() => {
    setExpression("");
    setResult("0");
    setError(null);
  }, []);

  const backspace = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
  }, []);

  const handleEquals = useCallback(() => {
    if (!expression) return;
    const expr = endsWithOperator(expression)
      ? expression.slice(0, -1)
      : expression;
    try {
      const value = evaluateExpression(expr);
      setResult(value);
      setHistory((prev) => [`${expr} = ${value}`, ...prev.slice(0, 9)]);
      setError(null);
      setExpression("");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error";
      setError(message);
    }
  }, [expression]);

  const onButtonClick = useCallback(
    (def: ButtonDef) => {
      switch (def.value) {
        case "C":
          clearAll();
          break;
        case "BACK":
          backspace();
          break;
        case "=":
          handleEquals();
          break;
        default:
          appendValue(def.value);
      }
    },
    [appendValue, backspace, clearAll, handleEquals]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { key } = e;
      if (/^[0-9]$/.test(key)) {
        appendValue(key);
        return;
      }
      if (key === ".") {
        appendValue(".");
        return;
      }
      if (["+", "-", "*", "/", "(", ")"].includes(key)) {
        appendValue(key);
        return;
      }
      if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleEquals();
        return;
      }
      if (key === "Backspace") {
        backspace();
        return;
      }
      if (key === "Escape") {
        clearAll();
        return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [appendValue, backspace, clearAll, handleEquals]);

  const displayExpression = useMemo(() => expression || "0", [expression]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, letterSpacing: 0.3, mb: 0.5 }}
          >
            <Calculate sx={{ mr: 1, verticalAlign: "middle" }} />
            Bayzat Calculator
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Simple. Accurate. Readable.
          </Typography>
        </Box>

        <Paper
          elevation={4}
          sx={{
            p: 2.5,
            borderRadius: 2.5,
            bgcolor: "#0F172A",
          }}
        >
          <Box display="flex" flexDirection="column" gap={1.5}>
            <Box sx={{ minHeight: 28 }}>
              <Typography
                variant="body2"
                color="#94A3B8"
                data-testid="expr"
                sx={{ fontFamily: "monospace" }}
              >
                {error ? "" : displayExpression}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h3"
                textAlign="right"
                data-testid="result"
                sx={{
                  wordBreak: "break-all",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: error ? "#F87171" : "#E5E7EB",
                }}
              >
                {result}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {error && (
          <Fade in>
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              sx={{ borderRadius: 2 }}
            >
              <Typography variant="body2" fontWeight={500}>
                {error}
              </Typography>
            </Alert>
          </Fade>
        )}

        <Paper elevation={2} sx={{ p: 2, borderRadius: 2.5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1.25,
            }}
          >
            {buttons.flat().map((b) => (
              <Button
                key={b.label}
                variant={b.variant || ButtonVariant.CONTAINED}
                color={b.color || ButtonColor.PRIMARY}
                fullWidth
                onClick={() => onButtonClick(b)}
                data-testid={`btn-${b.value}`}
                sx={{
                  minHeight: 64,
                  fontSize: 18,
                  fontWeight: 700,
                  borderRadius: 1.5,
                  textTransform: "none",
                }}
              >
                {b.label}
              </Button>
            ))}
          </Box>
        </Paper>

        {history.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1.5}
            >
              <Typography
                variant="subtitle1"
                fontWeight={700}
                display="flex"
                alignItems="center"
              >
                <History sx={{ mr: 1 }} />
                History
              </Typography>
              <Chip
                label={`${history.length} items`}
                size="small"
                color="default"
                variant="outlined"
              />
            </Box>
            <Divider sx={{ mb: 1.5 }} />
            <Stack spacing={0.75}>
              {history.map((h, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  sx={{ wordBreak: "break-all", fontFamily: "monospace" }}
                >
                  {h}
                </Typography>
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
