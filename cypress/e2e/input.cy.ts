describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://test-mobile-web2.optima.kr/home");
  });

  it("passes", () => {
    cy.get("input[name='id']").type("smlee@lspworld.com");
    cy.get("input[name='password']").type("optima1!");
    cy.get("button[type='submit']").click();
  });
});
