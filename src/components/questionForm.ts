export class QuestionForm extends HTMLElement {

  static get observedAttributes() { return ["options", "title"]; }

  constructor() {
    super();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    oldValue !== newValue ? this.setAttribute(name, newValue) : false;
  }

  connectedCallback() {
    this.classList.add("invisible");
    this.style.height = "auto";
    this.append(this.getTemplate.content.cloneNode(true));
  }

  disconnectedCallback() {
    this.remove();
  }

  private get selectElement() {
    const options = this.getAttribute("options")?.split(",");
    const select = document.createElement("select");
    select.classList.add("options");
    select.name = "options";
    select.required = true;
    options?.forEach((x) => {
      let optionElement = document.createElement("option");
      optionElement.textContent = x;
      optionElement.value = x;
      select.append(optionElement);
    });
    return select;
  }

  get getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <form id="formQuestion">
            <h2 class="text-red-600">${this.getAttribute("title")}</h2>
            ${this.selectElement.outerHTML}
            <button class="buttonSubmit">Continuar</button>
        </form>
        `;
    return template;
  }
}

customElements.define("form-question", QuestionForm);
