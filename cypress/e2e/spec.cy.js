describe("Sign In Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signin");
  });

  it("should display an error message for incorrect login details", () => {
    cy.get("input[name=email]").type("unknown@user.com");
    cy.get("input[name=password]").type("wrongpassword{enter}", { log: false });
    cy.contains("Sign In").click();
    cy.contains("Login failed!").should("be.visible");
  });

  it("should successfully login and then logout", () => {
    cy.get("input[name=email]").type("validuser@email.com");
    cy.get("input[name=password]").type("validuser", { log: false });
    cy.contains("Sign In").click();
    cy.url().should("include", "/account");

    cy.contains("Logout").click();
    cy.url().should("include", "/signin");
    cy.contains("Sign in").should("be.visible");
  });
});
