import { Question } from "./models/question";
import "./components/questionForm";
import data from './data';
import enableObserver from "./utils/enableObserver";

// DOM nodes
const nameForm = document.querySelector('#nameForm');
const main = document.querySelector('main');


const results: boolean[] = [];
const questionInstances = data.map(x => {
    const { correct_options, options, question } = x;
    return new Question(question, options, correct_options);
});


function showResults() {
    if (main !== null) {
        main.textContent = '';
        const div = document.createElement('div');
        div.classList.add('resultContainer');
        const score = ((5.0 / questionInstances.length) * results.filter((bool) => bool === true).length).toFixed(2);
        const h2 = document.createElement('h2');
        h2.innerText = `${localStorage.getItem('name') ?? 'player'},tu puntaje es ${score}`
        div.append(h2);
        main.append(div);
    }
}

function quiz(questions: Question[], index: number) {
    if (main !== null && index <= questions.length - 1) {
        main.textContent = '';
        const quest = questions[index];
        const questionComponent = document.createElement('form-question');
        enableObserver(questionComponent);
        questionComponent.setAttribute('options', questions[index].options.join(','));
        questionComponent.setAttribute('title', quest.question);
        main.append(questionComponent);


        const formQuestion = questionComponent.querySelector('#formQuestion');
        formQuestion?.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectElement = formQuestion.querySelector('select');
            if (selectElement !== null) {
                results.push(quest.isCorrect(selectElement.value));
            }
            index++;
            quiz(questions, index);
        });
    } else {
        showResults();
    }
}

nameForm?.addEventListener('submit', (e) => {
    const input: HTMLInputElement | null = document.querySelector('#name');
    e.preventDefault();
    localStorage.setItem('name', (input !== null ? input.value : ''));
    quiz(questionInstances, 0);
});
// all done by Johan Sebastian Puentes<bitsbyseb.github.io> :)