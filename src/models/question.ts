export class Question {
    constructor(
        public readonly question: string,
        public readonly options: string[],
        public readonly correct_options: string[]
    ) { }
    isCorrect(input: string): boolean {
        return this.correct_options.includes(input);
    }
}