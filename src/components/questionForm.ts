export class QuestionForm extends HTMLElement {
  static observedAttributes = ["options", "title"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    oldValue !== newValue ? this.setAttribute(`${name}`, newValue) : "";
  }

  connectedCallback() {
    this.classList.add("invisible");
    this.style.height = "auto";
    this.shadowRoot?.appendChild(this.getTemplate.content.cloneNode(true));
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

  private get getStyles() {
    return `
            <style>
            * {
                box-sizing: border-box;
                font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }
            

            #formQuestion {
                width: 100%;
                height: 100%;
                display: flex;
                gap: 20px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .title {
                color:#dc2626;
                font-size: 30px;
                font-weight: bold;
                text-wrap: pretty;
                align-text:center;
            }

            .options {
                width: 50%;
                font-size: 25px;
                align-self:center;
            }

            .buttonSubmit {
                padding: 10px;
                text-align: center;
                color: #1B1B1B;
                font-size: 20px;
                border: 4px solid #dc2626;
                background: #dc2626;
                font-weight: bold;
                border-radius: 8px;
            }
            .buttonSubmit:active {
                color: #dc2626;
                background: #1B1B1B;
                border: 4px solid #dc2626;
            }
            </style>
            `;
  }

  private get getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        ${this.getStyles}
        <form id="formQuestion">
            <h2 class="title">${this.getAttribute("title")}</h2>
            ${this.selectElement.outerHTML}
            <button class="buttonSubmit">Continue</button>
        </form>
        `;
    return template;
  }
}

customElements.define("form-question", QuestionForm);
