// describe("dombaInstituicao", () => {
//   it("when the user accesses the institutions page, some options should appear for selection and, when selected, the name of the institution should appear.", () => {
//     // 0 - Abrir a pagina de instituições
//     cy.visit(`http://localhost:3000/instituicoes`);
//     // 1 - Verificar que há a instituição Unicamp pelo alt
//     cy.get("[alt=Unicamp]").should("exist");
//     // 2 - Quando clicar na instituição Unicamp, acessar a página da instituição
//     cy.get("[alt=Unicamp]").click();
//     // 3 - Verificar se a página da instituição foi acessada
//     cy.url().should("include", "/instituicoes/Unicamp");
//     // 4 - Verificar se o nome da instituição Unicamp está na página
//     cy.get("#instituicao-nome").should("exist");
//   });
// });
