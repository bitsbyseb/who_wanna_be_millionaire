export interface QuestionObj {
    question: string,
    options: string[],
    correct_options: string[],
    isCorrect(input:string):boolean,
}

export class Question implements QuestionObj{
    constructor(
        public question:string,
        public options:string[],
        public correct_options:string[]
        ) {}

    isCorrect(input: string): boolean {
       return this.correct_options.includes(input);
    }
}