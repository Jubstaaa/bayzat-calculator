import { evaluateExpression, ErrorMessage } from "../lib/evaluator";

describe("evaluateExpression", () => {
  describe("Basic Operations", () => {
    it("should evaluate simple addition", () => {
      expect(evaluateExpression("1+2")).toBe("3");
    });

    it("should evaluate simple subtraction", () => {
      expect(evaluateExpression("5-3")).toBe("2");
    });

    it("should evaluate simple multiplication", () => {
      expect(evaluateExpression("4*6")).toBe("24");
    });

    it("should evaluate simple division", () => {
      expect(evaluateExpression("15/3")).toBe("5");
    });

    it("should evaluate negative numbers", () => {
      expect(evaluateExpression("0-5+3")).toBe("-2");
    });

    it("should evaluate with spaces", () => {
      expect(evaluateExpression("1 + 2")).toBe("3");
    });
  });

  describe("Operator Precedence", () => {
    it("should respect multiplication precedence over addition", () => {
      expect(evaluateExpression("2+3*4")).toBe("14");
    });

    it("should respect division precedence over subtraction", () => {
      expect(evaluateExpression("10-6/2")).toBe("7");
    });

    it("should handle complex precedence", () => {
      expect(evaluateExpression("3+2*4-5")).toBe("6");
    });

    it("should handle multiple operations with same precedence", () => {
      expect(evaluateExpression("10-5-3")).toBe("2");
    });

    it("should handle multiple operations with different precedence", () => {
      expect(evaluateExpression("2*3+4*5")).toBe("26");
    });
  });

  describe("Parentheses", () => {
    it("should handle simple parentheses", () => {
      expect(evaluateExpression("(2+3)*4")).toBe("20");
    });

    it("should handle nested parentheses", () => {
      expect(evaluateExpression("((2+3)*4)+1")).toBe("21");
    });

    it("should handle complex parentheses", () => {
      expect(evaluateExpression("(2+3)*(4+5)")).toBe("45");
    });

    it("should throw error for mismatched parentheses", () => {
      expect(() => evaluateExpression("(2+3")).toThrow(
        ErrorMessage.MISMATCHED_PARENS
      );
    });

    it("should throw error for empty parentheses", () => {
      expect(() => evaluateExpression("()")).toThrow(
        ErrorMessage.INVALID_EXPRESSION
      );
    });

    it("should throw error for empty parentheses followed by operator", () => {
      expect(() => evaluateExpression("()*9+6")).toThrow(
        ErrorMessage.INVALID_EXPRESSION
      );
    });

    it("should throw error for invalid JavaScript syntax", () => {
      expect(() => evaluateExpression("()()()")).toThrow(
        ErrorMessage.INVALID_EXPRESSION
      );
      expect(() => evaluateExpression("()()*2")).toThrow(
        ErrorMessage.INVALID_EXPRESSION
      );
      expect(() => evaluateExpression("2++2")).toThrow(
        ErrorMessage.INVALID_EXPRESSION
      );
    });
  });

  describe("Division by Zero", () => {
    it("should throw error for division by zero", () => {
      expect(() => evaluateExpression("5/0")).toThrow(ErrorMessage.DIV_BY_ZERO);
    });

    it("should throw error for division by zero decimal", () => {
      expect(() => evaluateExpression("5/0.0")).toThrow(
        ErrorMessage.DIV_BY_ZERO
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle single number", () => {
      expect(evaluateExpression("42")).toBe("42");
    });

    it("should handle zero", () => {
      expect(evaluateExpression("0")).toBe("0");
    });

    it("should handle empty expression", () => {
      expect(() => evaluateExpression("")).toThrow(
        ErrorMessage.INVALID_EXPRESSION
      );
    });

    it("should handle invalid characters", () => {
      expect(() => evaluateExpression("1+abc")).toThrow(
        ErrorMessage.INVALID_EXPRESSION
      );
    });
  });
});
