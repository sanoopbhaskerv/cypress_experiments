// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(true);
//   });
// });
// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(false);
//   });
// });

describe("AIS Login", () => {
  it("Visit AIS Home Page", () => {
    cy.server();

    cy.route(
      "GET",
      "https://ctm.qa.advisorcompass.com/ods.svc/getSignOnInformation?inclSglSgnOnGrpInd=True"
    ).as("signOn");
    cy.route(
      "GET",
      "https://ctm.qa.advisorcompass.com/adv_capl/oboselector/OBOServlet"
    ).as("OBOServlet");
    cy.visit("https://ctm.qa.advisorcompass.com/ais/?route=home");
    cy.get("#userID").type("fln2101239").should("have.value", "fln2101239");
    cy.get("#password").type("Amp@2020").should("have.value", "Amp@2020");
    cy.get("#loginbtn").click();
    cy.contains("Desk Support Proposal Tool");
    cy.wait(["@signOn", "@OBOServlet"]).spread((signOn, OBOServlet) => {
      expect(signOn.status).to.eq(200);
      //expect(xhr.length).to.eq(2);
      expect(signOn.method).to.eq("GET");
      expect(signOn.responseBody).to.have.property("results");
    });
    //Assert on XHR
    // cy.get(["@signOn", "@OBOServlet"]).then(function (xhr) {
    //   expect(xhr[0].status).to.eq(200);
    //   expect(xhr.length).to.eq(2);
    //   expect(xhr[0].method).to.eq("GET");
    //   expect(xhr[0].responseBody).to.have.property("results");
    // });
  });
});
