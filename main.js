// all answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// all our options
const optionElements = document.querySelectorAll('.option');

const question =document.getElementById('question'); // сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), // номер вороса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество вопросов в викторине

let indexOfQuestion, // индекс текущего вопроса
    IndexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка следующего вопроса

let score = 0; // итоговый результата викторины

// переменные с модального окна
const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответоав в модально окне
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2') // количество всех вопросов в модальном окне
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка начать викторину заново



const questions = [
    {
        question: 'Млечный путь — это…',
        options:[
            'Галактика',
            'Скопление звезд',
            'Солнечная система',
            'Парад планет',
        ],
        rightAnswer:0
    },

    {
        question: 'Инфузория-туфелька — это...',
        options:[
            'Бактерия',
            'Вирус',
            'Простейший, одноклеточный организм',
            'Модная обувь',
        ],
        rightAnswer:2
    },

    {
        question: 'Кто придумал джинсы?',
        options:[
            'Пьер Карден',
            'Левай Страус',
            'Джанни Версачи',
            'Дольче Габбана',
        ],
        rightAnswer:1
    },

    {
        question: 'Какой советско-российский фильм получил "Оскара"?',
        options:[
            '"Кин-Дза-Дза"',
            '"Москва слезам не верит"',
            '"Батальоны просят огня"',
            '"Сталкер"',
        ],
        rightAnswer:1
    },

    {
        question: 'Кому принадлежит фраза "Время — деньги"?',
        options:[
            'Рокфеллеру',
            'Бизнесменам',
            'Корнеги',
            'Франклину',
        ],
        rightAnswer:3
    },

    {
        question: 'Кто изобрел компьютер?',
        options:[
            'Билл Гейтс',
            'Стив Джобс',
            'Чарльз Бэббидж',
            'Алан Тьюринг',
        ],
        rightAnswer:2
    },

    {
        question: 'Царь Петр І какой по счету из рода Романовых?',
        options:[
            'Первый',
            'Второй',
            'Третий',
            'Четвертый',
        ],
        rightAnswer:3
    }

];

numberOfAllQuestions.innerHTML = questions.length; // выводим количество вопросов

const load = () =>{
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = IndexOfPage + 1; // установка номера текущей страницы
    IndexOfPage++; // увеличение индекса страницы
};

let completedAnswers = []; // массив для вопросов которые уже задавались

const randomQuestion = () =>{
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDudlicate = false; // якорь для проверки одинаковых вопросов

    if(IndexOfPage == questions.length){
        quizOver(); // функция концат викторины
    } else {
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDudlicate = true;
                }
            });
            if(hitDudlicate){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
    
};

const checkAnswer = el =>{
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        apdateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        apdateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
};


const disabledOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
};

// удаление всех классов со всех ответов
const enableOptions = () =>{
    optionElements.forEach(item => {
        item.classList.remove('disabled','correct', 'wrong')
    })
};

const answerTracker = () =>{
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const apdateAnswerTracker = status =>{
    answersTracker.children[IndexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    }else{
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});

