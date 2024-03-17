export interface questionObj {
    question: string,
    options: string[],
    correct_options: string[]
}

export class Question {
    private question: string;
    private options: string[];
    private correct_options: string[];
    constructor(quest: questionObj) {
        this.question = quest.question;
        this.options = quest.options;
        this.correct_options = quest.correct_options;
    }

    isCorrect(input: string) {
       return this.correct_options.includes(input);
    }

    get giveOptions() {
        return this.options;
    }

    get giveTitle() {
        return this.question;
    }
}