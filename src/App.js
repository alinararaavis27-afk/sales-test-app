import React, { useState, useEffect } from ‘react’;
import { CheckCircle, Award, TrendingUp, AlertCircle, Send, Sparkles, Coins, ExternalLink } from ‘lucide-react’;

const SalesAssessmentApp = () => {
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState({});
const [showResults, setShowResults] = useState(false);
const [candidateName, setCandidateName] = useState(’’);
const [showNameInput, setShowNameInput] = useState(true);
const [showCoinAnimation, setShowCoinAnimation] = useState(false);
const [hasCompleted, setHasCompleted] = useState(false);
const [tg] = useState(() => {
if (typeof window !== ‘undefined’ && window.Telegram?.WebApp) {
const telegram = window.Telegram.WebApp;
telegram.ready();
telegram.expand();
return telegram;
}
return null;
});

useEffect(() => {
// Проверяем, проходил ли пользователь тест ранее
const completed = localStorage.getItem(‘sales_test_completed’);
if (completed === ‘true’) {
setHasCompleted(true);
}

```
if (tg && tg.initDataUnsafe?.user) {
  const user = tg.initDataUnsafe.user;
  const name = user.first_name + (user.last_name ? ' ' + user.last_name : '');
  setCandidateName(name);
}
```

}, [tg]);

const questions = [
{
id: 1,
question: “Что является главной задачей менеджера по продажам?”,
options: [
{ id: ‘a’, text: “Быстро рассказать клиенту о всех функциях продукта”, correct: false },
{ id: ‘b’, text: “Убедить купить любой ценой”, correct: false },
{ id: ‘c’, text: “Выявить потребность клиента и показать, как продукт ее решает”, correct: true },
{ id: ‘d’, text: “Вежливо ответить и отправить КП”, correct: false }
]
},
{
id: 2,
question: ‘Клиент: “Спасибо, мне надо подумать”. Ваши действия?’,
options: [
{ id: ‘a’, text: “Перезвоню через неделю”, correct: false },
{ id: ‘b’, text: ‘Спрошу: “О чем именно думаете? Могу дать инфо”’, correct: true },
{ id: ‘c’, text: “Напомню об ограниченном количестве”, correct: false },
{ id: ‘d’, text: “Попрощаюсь”, correct: false }
]
},
{
id: 3,
question: “Лучшая мотивация в первые 3-6 месяцев?”,
options: [
{ id: ‘a’, text: “Высокий оклад”, correct: false },
{ id: ‘b’, text: “План развития и обратная связь от наставника”, correct: true },
{ id: ‘c’, text: “Много зарабатывать на процентах”, correct: false },
{ id: ‘d’, text: “Свободный график”, correct: false }
]
},
{
id: 4,
question: “100 звонков, первые 20 — отказ. Что делаете?”,
options: [
{ id: ‘a’, text: “Анализирую скрипт, корректирую подход, продолжаю”, correct: true },
{ id: ‘b’, text: “Звоню дальше, статистика выровняется”, correct: false },
{ id: ‘c’, text: “Займусь другой работой”, correct: false },
{ id: ‘d’, text: “Пожалуюсь, что база плохая”, correct: false }
]
},
{
id: 5,
question: “Что важнее на первой встрече?”,
options: [
{ id: ‘a’, text: “Предложить скидку”, correct: false },
{ id: ‘b’, text: “Рассказать историю компании”, correct: false },
{ id: ‘c’, text: “Задать вопросы и слушать клиента”, correct: true },
{ id: ‘d’, text: “Показать презентацию”, correct: false }
]
},
{
id: 6,
question: ‘Клиент: “У вас дороже”. Ответ:’,
options: [
{ id: ‘a’, text: ‘“Наше качество лучше”’, correct: false },
{ id: ‘b’, text: ‘“Какой бюджет закладывали?”’, correct: false },
{ id: ‘c’, text: ‘“Что важно кроме цены: надежность, сервис?”’, correct: true },
{ id: ‘d’, text: ‘“Дам скидку 5%”’, correct: false }
]
},
{
id: 7,
question: “Как планируете день при множестве задач?”,
options: [
{ id: ‘a’, text: ‘С простых задач’, correct: false },
{ id: ‘b’, text: “Список по приоритетам, начинаю с важного”, correct: true },
{ id: ‘c’, text: ‘Режим “реакции” на запросы’, correct: false },
{ id: ‘d’, text: “Все понемногу”, correct: false }
]
},
{
id: 8,
question: “После успешной продажи?”,
options: [
{ id: ‘a’, text: “К следующему клиенту”, correct: false },
{ id: ‘b’, text: “Благодарю, планирую follow-up”, correct: true },
{ id: ‘c’, text: “Сообщаю руководителю”, correct: false },
{ id: ‘d’, text: “Отмечаю в чек-листе”, correct: false }
]
},
{
id: 9,
question: “Запись разговоров для самоанализа?”,
options: [
{ id: ‘a’, text: “Трата времени”, correct: false },
{ id: ‘b’, text: “Отличный способ улучшить навыки”, correct: true },
{ id: ‘c’, text: “Неэтично”, correct: false },
{ id: ‘d’, text: “Пусть делает руководитель”, correct: false }
]
},
{
id: 10,
question: “Не знаете деталь, клиент спрашивает?”,
options: [
{ id: ‘a’, text: “Дам приблизительный ответ”, correct: false },
{ id: ‘b’, text: ‘“Уточню у специалиста и отвечу сегодня”’, correct: true },
{ id: ‘c’, text: “Переведу на преимущества”, correct: false },
{ id: ‘d’, text: “Отправлю документацию”, correct: false }
]
}
];

const createCoinAnimation = () => {
setShowCoinAnimation(true);
setTimeout(() => setShowCoinAnimation(false), 1000);
};

const handleStartTest = () => {
if (candidateName.trim()) {
setShowNameInput(false);
}
};

const handleAnswer = (optionId) => {
const newAnswers = { …answers, [currentQuestion]: optionId };
setAnswers(newAnswers);
createCoinAnimation();

```
if (currentQuestion < questions.length - 1) {
  setTimeout(() => setCurrentQuestion(currentQuestion + 1), 600);
} else {
  setTimeout(() => {
    setShowResults(true);
    localStorage.setItem('sales_test_completed', 'true');
    setHasCompleted(true);
  }, 600);
}
```

};

const calculateScore = () => {
const correctAnswers = [‘c’, ‘b’, ‘b’, ‘a’, ‘c’, ‘c’, ‘b’, ‘b’, ‘b’, ‘b’];
let score = 0;
correctAnswers.forEach((correct, index) => {
if (answers[index] === correct) score++;
});
return score;
};

const sendResultsToTelegram = () => {
const score = calculateScore();
const category = score >= 8 ? ‘high’ : score >= 5 ? ‘medium’ : ‘low’;

```
if (tg && tg.sendData) {
  tg.sendData(JSON.stringify({
    name: candidateName,
    score: score,
    category: category,
    answers: answers,
    timestamp: new Date().toISOString()
  }));
}
```

};

// Если тест уже пройден
if (hasCompleted && showNameInput) {
return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 flex items-center justify-center">
<div className="max-w-md mx-auto text-center bg-white rounded-3xl shadow-2xl p-8">
<Award className="w-20 h-20 mx-auto mb-4 text-purple-500" />
<h1 className="text-2xl font-bold text-gray-800 mb-3">
Тест уже пройден! ✅
</h1>
<p className="text-gray-600 mb-6">
Вы можете проходить этот тест только один раз. Спасибо за участие!
</p>

```
      <div className="space-y-3">
        <a 
          href="https://t.me/sup_novikov"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-lime-400 to-cyan-400 text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          Записаться на консультацию
        </a>
        
        <a 
          href="https://t.me/bettercallLenya"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          Подписаться на канал
        </a>
      </div>
    </div>
  </div>
);
```

}

if (showNameInput) {
return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
<div className="max-w-2xl mx-auto pt-8">
<div className="text-center mb-6">
<Award className="w-20 h-20 mx-auto mb-4 text-purple-500" />
<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
Тест для менеджеров по продажам
</h1>
<p className="text-gray-600 text-sm mb-3">
Оценка потенциала в сфере продаж
</p>

```
        <div className="inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full border border-purple-200 mb-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <p className="text-xs text-gray-700">
            Создал <span className="font-semibold text-purple-600">Леонид Новиков</span>, адвайзер компаний по продажам
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <a 
            href="https://t.me/sup_novikov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-400 to-cyan-400 text-white px-4 py-2 rounded-full font-semibold text-xs hover:shadow-lg transition-all hover:scale-105"
          >
            <ExternalLink className="w-3 h-3" />
            Записаться на консультацию
          </a>
          
          <a 
            href="https://t.me/bettercallLenya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full font-semibold text-xs hover:shadow-lg transition-all hover:scale-105"
          >
            <ExternalLink className="w-3 h-3" />
            Telegram-канал
          </a>
        </div>
        
        <div className="inline-block bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
          <p className="text-xs text-amber-800 font-medium">
            ⚠️ Внимание: Тест можно пройти только 1 раз
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
        <div className="bg-gradient-to-r from-lime-50 via-cyan-50 to-pink-50 rounded-2xl p-4 mb-6">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-lime-500" />
            Инструкция:
          </h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Тест содержит <strong>10 вопросов</strong></li>
            <li>• Выберите один вариант ответа</li>
            <li>• Отвечайте интуитивно</li>
            <li>• Время: <strong>5-7 минут</strong></li>
            <li>• <strong className="text-amber-600">Можно пройти только 1 раз</strong></li>
          </ul>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ваше имя:
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Введите ваше имя"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition outline-none"
          />
        </div>

        <button
          onClick={handleStartTest}
          disabled={!candidateName.trim()}
          className="w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-pink-400 text-white py-5 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          Начать тест
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);
```

}

if (showResults) {
const score = calculateScore();
const isHigh = score >= 8;
const isMedium = score >= 5 && score < 8;

```
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
    <div className="max-w-2xl mx-auto pt-8">
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${isHigh ? 'bg-gradient-to-r from-green-400 to-emerald-500' : isMedium ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-pink-400 to-rose-500'}`}>
          {isHigh && <Award className="w-12 h-12 text-white" />}
          {isMedium && <TrendingUp className="w-12 h-12 text-white" />}
          {!isHigh && !isMedium && <AlertCircle className="w-12 h-12 text-white" />}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {candidateName}, спасибо! 🎉
        </h1>
      </div>

      <div className={`rounded-3xl p-6 mb-6 shadow-2xl ${isHigh ? 'bg-gradient-to-r from-green-400 to-emerald-500' : isMedium ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-pink-400 to-rose-500'}`}>
        <div className="flex items-center justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {isHigh ? 'Высокий потенциал' : isMedium ? 'Средний потенциал' : 'Требуется развитие'}
            </h2>
            <p className="text-sm opacity-90">
              {isHigh ? '8-10 баллов' : isMedium ? '5-7 баллов' : '0-4 балла'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold">{score}</div>
            <div className="text-sm opacity-90">из 10</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 mb-4 space-y-4">
        <div>
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-lime-500" />
            Что это значит:
          </h3>
          <p className="text-gray-700 text-sm">
            {isHigh ? 'Вы интуитивно понимаете суть современных продаж. Ориентированы на клиента.' : isMedium ? 'У вас есть базовое понимание процесса продаж. Готовность учиться — ключ к успеху.' : 'Ваше представление о продажах требует развития. Рекомендуем изучить консультативные продажи.'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-lime-50 to-cyan-50 rounded-2xl p-4 border border-lime-200">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Хотите построить системные продажи?
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            Леонид Новиков и его команда помогают компаниям выстраивать процессы продаж от А до Я
          </p>
          <div className="flex flex-wrap gap-2">
            <a 
              href="https://t.me/sup_novikov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-400 to-cyan-400 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              Консультация
            </a>
            <a 
              href="https://t.me/bettercallLenya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              Канал
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 mb-4">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">Детализация:</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => {
            const correctAnswers = ['c', 'b', 'b', 'a', 'c', 'c', 'b', 'b', 'b', 'b'];
            const isCorrect = answers[index] === correctAnswers[index];
            return (
              <div key={q.id} className={`aspect-square rounded-xl flex items-center justify-center font-bold text-white text-sm ${isCorrect ? 'bg-gradient-to-br from-lime-400 to-green-500' : 'bg-gradient-to-br from-pink-400 to-rose-500'}`}>
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={sendResultsToTelegram}
        className="w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-pink-400 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition flex items-center justify-center gap-3"
      >
        <Send className="w-5 h-5" />
        Отправить результат
      </button>
    </div>
  </div>
);
```

}

const progress = ((currentQuestion + 1) / questions.length) * 100;
const currentQ = questions[currentQuestion];

return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 relative">
{showCoinAnimation && (
<div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
{[…Array(8)].map((_, i) => (
<Coins
key={i}
className=“absolute w-8 h-8 text-yellow-400 animate-bounce”
style={{
left: `${20 + i * 10}%`,
animationDelay: `${i * 0.1}s`,
animationDuration: ‘0.8s’
}}
/>
))}
</div>
)}

```
  <div className="max-w-2xl mx-auto">
    <div className="bg-gradient-to-r from-lime-400 via-cyan-400 to-pink-400 rounded-3xl p-5 text-white mb-6 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold">{candidateName}</h2>
          <p className="text-sm opacity-90">Тест продажника</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
      </div>
      <div className="w-full bg-white/30 rounded-full h-3">
        <div
          className="bg-white h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>

    <div className="bg-white rounded-3xl shadow-2xl p-6">
      <div className="mb-6">
        <span className="inline-block bg-gradient-to-r from-lime-400 to-cyan-400 text-white text-xs font-bold px-4 py-2 rounded-full mb-4">
          вопрос {currentQuestion + 1}
        </span>
        <h3 className="text-xl font-bold text-gray-800">
          {currentQ.question}
        </h3>
      </div>

      <div className="space-y-3">
        {currentQ.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            className="w-full text-left p-5 border-2 border-gray-200 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition active:scale-95 bg-white"
          >
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center mr-4 font-bold text-sm">
                {option.id.toUpperCase()}
              </span>
              <span className="text-gray-700 text-sm font-medium">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
</div>
```

);
};

export default SalesAssessmentApp;
