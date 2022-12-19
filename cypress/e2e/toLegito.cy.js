import { formData } from "../page_objects/formData.cy";
import { taskCreate } from "../page_objects/taskCreate.cy";
import { verification } from "../page_objects/verifyNumber.cy";

const form_data = new formData();
const verification_number = new verification();
const task_create = new taskCreate();

describe("", () => {
  beforeEach(() => {
    cy.visit("https://click-away-7fgctwzw4-janecekjiri1.vercel.app/?");
    cy.get(" .language--options > .nav--language > .screanName:nth-child(3)").click({
      force: true,
    });
  });

  it("fill the form option 1 pass", () => {
    // option 1
    form_data.dataName("David Novák", "707606505", "daviduvpokus@seznam.cz");
    form_data.dataDate("2022-10-19", "2022-10-25");
    form_data.dataChoice("{upArrow}{upArrow}", "mango");

    cy.get(":nth-child(4) > .inputSpan > input").check();
    cy.get(":nth-child(5) > .inputSpan > input").check();

    cy.get(".sectionSixForm--bottom > textarea")
      .click()
      .type(
        `
    Ahoj, děkuji za čas který dáváte tomuto spuštění testu
    - Prvni co se stalo je, že se načetla stránka a přepla se z angličtiny do češtiny
    - Poté se vyplnily informace ve formuláři a došlo k potvrzení odeslání
    - Mezitím došlo i k ověřování jestli konkrétní input má konkrétní hodnotu
    - Po odeslání se stránka obnoví a jde na další test, který bude chybový
    - Poté na test v sekci kde jde zadávat úkoly
    - Zde se úkol vytvoří, napíše se do něj konkrétní informace, něco se přemaže atd.
    - Vše se opět ověřuje jestli je ve stavu ve kterém chceme být
    `
      )
      .wait(3000);

    //verification
    // info
    cy.get(".sectionSixForm--inputLeft > :nth-child(1) > .allInput").should(
      "have.value",
      "David Novák"
    );
    cy.get(".sectionSixForm--inputRight > :nth-child(1) > .allInput").should(
      "have.value",
      "daviduvpokus@seznam.cz"
    );
    // number
    verification_number.numberVerify();

    // choice
    cy.get(".sectionSixForm--inputRightDouble--value > .allInput").should("have.value", "2");
    cy.get("select").should("have.value", "mango");

    // inputs
    cy.get(":nth-child(4) > .inputSpan > input").should("be.checked");
    cy.get(":nth-child(5) > .inputSpan > input").should("be.checked");
    cy.get(":nth-child(3) > .inputSpan > input").should("not.be.checked");
    cy.get(":nth-child(6) > .inputSpan > input").should("not.be.checked");

    // button
    cy.get(".sectionSixForm--bottom > .click-away--button").should("be.enabled", true);

    // confirm and next test
    cy.get(".sectionSixForm--bottom > button").click();
  });

  // oprion 2
  it("fill the form option 2 false, wrong form of phone number", () => {
    form_data.dataName("Filip Novák", "7776 66555", "filipuvpokus@seznam.cz");
    form_data.dataDate("2022-11-11", "2022-11-14");
    form_data.dataChoice("{upArrow}{upArrow}{upArrow}", "Lime");

    cy.get(":nth-child(5) > .inputSpan > input").check();

    // verification
    // info
    cy.get(".sectionSixForm--inputLeft > :nth-child(1) > .allInput").should(
      "have.value",
      "Filip Novák"
    );
    cy.get(".sectionSixForm--inputRight > :nth-child(1) > .allInput").should(
      "have.value",
      "filipuvpokus@seznam.cz"
    );

    // number shuld fale
    verification_number.numberVerify();

    cy.get(":nth-child(5) > .inputSpan > input").should("be.checked");
    cy.get(":nth-child(3) > .inputSpan > input").should("not.be.checked");
    cy.get(":nth-child(4) > .inputSpan > input").should("not.be.checked");
    cy.get(":nth-child(6) > .inputSpan > input").should("not.be.checked");

    cy.get(".sectionSixForm--bottom > button").click();
  });

  it("new task", () => {
    task_create.create("První test");
    task_create.create("Druhý test");
    task_create.create("test navíc");

    cy.contains("Druhý test").click();
    cy.get("#body").click().type("můj úkol.");

    cy.contains("První test").click();

    cy.get("#body").click().type(`
    musím nakoupit
    naučit se 
    a žít`);
    cy.get(":nth-child(3) > .sidebar-note-title > button").click();

    cy.contains("Druhý test").click();
    cy.get("#body").click().clear().type(`
    A tady to byl demonstrativní test.
    Vím, že jsou věcí které by zde mohly být udělány lépe a komplexněji, však prozatím 
    nejsem na úrovni kdy bych lepší řešení mohl aplikovat v krátkém čase. Proto věřím, 
    že jak jste mi i Vy řekli, zlepšování přichází časem a zkušenostmi.
    Ještě jednou Vám děkuji a v případě budoucích příležitostí, budu rád 
    za Vaše kontaktování.

    S pozdravem Jiří Janeček `);

    cy.get(".app-sidebar-notes").should("be.visible");
    cy.get(".app-sidebar-note").should("have.length", 2);
    cy.get(".app-sidebar-note:nth-child(1)").should("have.class", "active");

    cy.get(".app-sidebar-note").eq(0).should("contain.text", "Druhý test");
  });
});
