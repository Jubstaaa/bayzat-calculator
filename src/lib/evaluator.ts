export enum ErrorMessage {
  DIV_BY_ZERO = "Division by zero is not allowed",
  MISMATCHED_PARENS = "Mismatched parentheses detected",
  INVALID_EXPRESSION = "Invalid mathematical expression",
  INVALID_RESULT = "Invalid result",
  CALCULATION_ERROR = "Calculation error",
}

export function evaluateExpression(expr: string): string {
  try {
    const cleanExpr = expr.replace(/\s/g, "");

    if (cleanExpr.includes("/0") || cleanExpr.includes("/0.")) {
      throw new Error(ErrorMessage.DIV_BY_ZERO);
    }

    if (!/^[0-9+\-*/().\s]+$/.test(cleanExpr)) {
      throw new Error(ErrorMessage.INVALID_EXPRESSION);
    }

    let parenCount = 0;
    for (const char of cleanExpr) {
      if (char === "(") parenCount++;
      if (char === ")") parenCount--;
      if (parenCount < 0) throw new Error(ErrorMessage.MISMATCHED_PARENS);
    }
    if (parenCount !== 0) throw new Error(ErrorMessage.MISMATCHED_PARENS);

    if (cleanExpr === "()") throw new Error(ErrorMessage.INVALID_EXPRESSION);

    if (/^\(\)[+\-*/]/.test(cleanExpr))
      throw new Error(ErrorMessage.INVALID_EXPRESSION);

    const result = new Function(`return ${cleanExpr}`)();

    if (!Number.isFinite(result)) {
      throw new Error(ErrorMessage.INVALID_RESULT);
    }

    if (Number.isInteger(result)) {
      return result.toString();
    }

    const rounded = Math.round(result * 1e10) / 1e10;
    return rounded.toString();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(ErrorMessage.CALCULATION_ERROR);
  }
}
