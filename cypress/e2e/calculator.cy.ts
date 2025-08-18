describe("Bayzat Calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders and shows zero by default", () => {
    cy.get('[data-testid="result"]').should("contain.text", "0");
  });

  it("handles 1 + 2 = 3", () => {
    cy.get('[data-testid="btn-1"]').click();
    cy.get('[data-testid="btn-+"]').click();
    cy.get('[data-testid="btn-2"]').click();
    cy.get('[data-testid="btn-="]').click();
    cy.get('[data-testid="result"]').should("have.text", "3");
  });

  it("respects operator precedence: 3 + 2 * 4 - 5 = 6", () => {
    const seq = ["3", "+", "2", "*", "4", "-", "5", "="];
    seq.forEach((k) => cy.get(`[data-testid="btn-${k}"]`).click());
    cy.get('[data-testid="result"]').should("have.text", "6");
  });

  it("handles floating precision 0.1 + 0.2 = 0.3", () => {
    const seq = ["0", ".", "1", "+", "0", ".", "2", "="];
    seq.forEach((k) => cy.get(`[data-testid="btn-${k}"]`).click());
    cy.get('[data-testid="result"]').should("have.text", "0.3");
  });

  it("shows error on divide by zero", () => {
    const seq = ["1", "/", "0", "="];
    seq.forEach((k) => cy.get(`[data-testid="btn-${k}"]`).click());
    cy.get('[role="alert"]').should(
      "contain.text",
      "Division by zero is not allowed"
    );
  });

  it("handles large numbers and keeps UI readable", () => {
    const seq = [
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "*",
      "9",
      "=",
    ];
    seq.forEach((k) => cy.get(`[data-testid="btn-${k}"]`).click());
    cy.get('[data-testid="result"]').should("have.text", "8999999999999991");
    cy.get('[data-testid="result"]').should("not.contain.text", "Infinity");
    cy.get('[data-testid="result"]').should("not.contain.text", "NaN");
    cy.get('[data-testid="result"]').should(
      "have.css",
      "word-break",
      "break-all"
    );
  });

  it("keyboard: 12 + 3 Enter => 15", () => {
    cy.get('[data-testid="expr"]').should("exist");
    cy.get("body").type("12+3{enter}");
    cy.get('[data-testid="result"]')
      .should("have.text", "15")
      .should("be.visible");
  });

  it("keyboard: backspace removes last char before evaluating", () => {
    cy.get('[data-testid="expr"]').should("exist");
    cy.get("body").type("12+3{backspace}{enter}");
    cy.get('[data-testid="result"]').should("have.text", "12");
  });

  it("keyboard: escape clears", () => {
    cy.get('[data-testid="expr"]').should("exist");
    cy.get("body").type("9*9{enter}{esc}");
    cy.get('[data-testid="result"]').should("have.text", "0");
    cy.get('[data-testid="expr"]').should("have.text", "0");
  });

  it("keyboard: parentheses and precedence", () => {
    cy.get('[data-testid="expr"]').should("exist");
    cy.get("body").type("(2+3)*4{enter}");
    cy.get('[data-testid="result"]')
      .should("have.text", "20")
      .should("be.visible");
  });

  it("keyboard: floating precision with dot", () => {
    cy.get('[data-testid="expr"]').should("exist");
    cy.get("body").type("0.1+0.2{enter}");
    cy.get('[data-testid="result"]').should("have.text", "0.3");
  });
});
