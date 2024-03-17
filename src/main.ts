import { Question, questionObj } from "./models/question";
import "./components/questionForm";
import enableObserver from "./utils/enableObserver";
const nameForm = document.querySelector('#nameForm');
const main = document.querySelector('main');
// yes i drank a lot of bottles when i did this
const results: boolean[] = [];

const getData = async (): Promise<questionObj[]> => {
    const res = await fetch('/src/questions.json');
    const data = res.json();
    return data;
}
const data = await getData();
const questionInstances = data.map(x => new Question(x));


function showResults () {
    if (main !== null) {
        main.textContent = '';
        const div = document.createElement('div');
        div.classList.add('resultContainer');
        const score = ((5.0/questionInstances.length) * results.filter((bool) => bool === true).length).toFixed(2);
        const h2 = document.createElement('h2');
        h2.innerText = `${localStorage.getItem('name') ?? 'player'}, your score is ${score}`
        div.append(h2);
        main.append(div);        
    }
}

function quiz(questions: Question[], index: number) {
    if (main !== null) {
        if (index <= questions.length-1) {
            main.textContent = '';
            const quest = questions[index];
            const questionComponent = document.createElement('form-question');
            enableObserver(questionComponent);
            questionComponent.setAttribute('options',questions[index].giveOptions.join(','));
            questionComponent.setAttribute('title', quest.giveTitle);
            main.append(questionComponent);
    
    
            const formQuestion = questionComponent.shadowRoot?.querySelector('#formQuestion');
            formQuestion?.addEventListener('submit', (e) => {
                e.preventDefault();
                const selectElement = formQuestion.querySelector('select');
                if (selectElement !== null) {
                    results.push(quest.isCorrect(selectElement.value));
                }
                index++;
                quiz(questions,index);
            });
        } else {
            showResults();
        }
    }
}

nameForm?.addEventListener('submit', (e) => {
    const input: HTMLInputElement | null = document.querySelector('#name');
    e.preventDefault();
    localStorage.setItem('name', (input !== null ? input.value : ''));
    quiz(questionInstances, 0);
});
// all done by Johan Puentes<bitsbyseb.github.io> :)