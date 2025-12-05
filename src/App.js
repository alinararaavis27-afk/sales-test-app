import React, { useState, useEffect } from 'react';
import { CheckCircle, Award, TrendingUp, AlertCircle, Send, Sparkles, Coins, ExternalLink } from 'lucide-react';

const SalesAssessmentApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(2);
  const [tg, setTg] = useState(null);

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      setTg(telegram);
      telegram.ready();
      telegram.expand();
      telegram.enableClosingConfirmation();
      
      const user = telegram.initDataUnsafe?.user;
      if (user) {
        const name = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        setCandidateName(name);
      }
    }

    const attempts = localStorage.getItem('sales_test_attempts');
    if (attempts) {
      setAttemptsLeft(parseInt(attempts));
    }

    // Добавляем стили для анимаций
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes coinFall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  const questions = [
    {
      id: 1,
      question: "Что является главной задачей менеджера по продажам?",
      options: [
        { id: 'a', text: "Быстро рассказать о функциях", correct: false },
        { id: 'b', text: "Убедить купить любой ценой", correct: false },
        { id: 'c', text: "Выявить потребность клиента", correct: true },
        { id: 'd', text: "Отправить КП", correct: false }
      ]
    },
    {
      id: 2,
      question: 'Клиент: "Мне надо подумать"',
      options: [
        { id: 'a', text: "Перезвоню через неделю", correct: false },
        { id: 'b', text: 'Спрошу: "О чем думаете?"', correct: true },
        { id: 'c', text: "Напомню об акции", correct: false },
        { id: 'd', text: "Попрощаюсь", correct: false }
      ]
    },
    {
      id: 3,
      question: "Лучшая мотивация первые 3-6 месяцев?",
      options: [
        { id: 'a', text: "Высокий оклад", correct: false },
        { id: 'b', text: "План развития + наставник", correct: true },
        { id: 'c', text: "Проценты", correct: false },
        { id: 'd', text: "Свободный график", correct: false }
      ]
    },
    {
      id: 4,
      question: "100 звонков, 20 отказов подряд?",
      options: [
        { id: 'a', text: "Анализирую, корректирую", correct: true },
        { id: 'b', text: "Звоню дальше", correct: false },
        { id: 'c', text: "Займусь другим", correct: false },
        { id: 'd', text: "База плохая", correct: false }
      ]
    },
    {
      id: 5,
      question: "Что важнее на первой встрече?",
      options: [
        { id: 'a', text: "Скидка", correct: false },
        { id: 'b', text: "История компании", correct: false },
        { id: 'c', text: "Вопросы + слушать", correct: true },
        { id: 'd', text: "Презентация", correct: false }
      ]
    },
    {
      id: 6,
      question: '"У вас дороже"',
      options: [
        { id: 'a', text: "Наше качество лучше", correct: false },
        { id: 'b', text: "Какой бюджет?", correct: false },
        { id: 'c', text: "Что важно кроме цены?", correct: true },
        { id: 'd', text: "Дам скидку 5%", correct: false }
      ]
    },
    {
      id: 7,
      question: "Много задач - как планировать?",
      options: [
        { id: 'a', text: "С простых", correct: false },
        { id: 'b', text: "По приоритетам", correct: true },
        { id: 'c', text: "Режим реакции", correct: false },
        { id: 'd', text: "Все понемногу", correct: false }
      ]
    },
    {
      id: 8,
      question: "После успешной продажи?",
      options: [
        { id: 'a', text: "К следующему", correct: false },
        { id: 'b', text: "Благодарю + follow-up", correct: true },
        { id: 'c', text: "Сообщаю руководителю", correct: false },
        { id: 'd', text: "Отмечаю", correct: false }
      ]
    },
    {
      id: 9,
      question: "Запись разговоров для анализа?",
      options: [
        { id: 'a', text: "Трата времени", correct: false },
        { id: 'b', text: "Отлично для роста!", correct: true },
        { id: 'c', text: "Неэтично", correct: false },
        { id: 'd', text: "Пусть руководитель", correct: false }
      ]
    },
    {
      id: 10,
      question: "Не знаете деталь продукта?",
      options: [
        { id: 'a', text: "Приблизительно отвечу", correct: false },
        { id: 'b', text: "Уточню у специалиста", correct: true },
        { id: 'c', text: "Переведу тему", correct: false },
        { id: 'd', text: "Отправлю документы", correct: false }
      ]
    }
  ];

  const createCoinAnimation = () => {
    setShowCoinAnimation(true);
    if (tg && tg.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light');
    }
    setTimeout(() => setShowCoinAnimation(false), 800);
  };

  const handleStartTest = () => {
    if (candidateName.trim() && attemptsLeft > 0) {
      setShowNameInput(false);
      if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
      }
    }
  };

  const handleAnswer = (optionId) => {
    const newAnswers = { ...answers, [currentQuestion]: optionId };
    setAnswers(newAnswers);
    createCoinAnimation();

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    } else {
      setTimeout(() => {
        setShowResults(true);
        const newAttempts = attemptsLeft - 1;
        localStorage.setItem('sales_test_attempts', newAttempts.toString());
        setAttemptsLeft(newAttempts);
        if (tg && tg.HapticFeedback) {
          tg.HapticFeedback.notificationOccurred('success');
        }
      }, 500);
    }
  };

  const calculateScore = () => {
    const correctAnswers = ['c', 'b', 'b', 'a', 'c', 'c', 'b', 'b', 'b', 'b'];
    let score = 0;
    correctAnswers.forEach((correct, index) => {
      if (answers[index] === correct) score++;
    });
    return score;
  };

  const sendResultsToTelegram = () => {
    const score = calculateScore();
    const category = score >= 8 ? 'high' : score >= 5 ? 'medium' : 'low';
    
    if (tg && tg.sendData) {
      tg.sendData(JSON.stringify({
        name: candidateName,
        score: score,
        category: category,
        answers: answers,
        timestamp: new Date().toISOString()
      }));
      tg.close();
    }
  };

  const resetTest = () => {
    if (attemptsLeft > 0) {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
      setShowNameInput(true);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '12px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '16px',
    },
    mainTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#fff',
      margin: '8px 0',
    },
    subtitle: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.9)',
      margin: '4px 0',
    },
    card: {
      background: '#fff',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    },
    button: {
      width: '100%',
      padding: '14px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '8px',
      textDecoration: 'none',
      boxSizing: 'border-box',
      transition: 'transform 0.2s',
    },
    optionButton: {
      width: '100%',
      background: '#fff',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      textAlign: 'left',
      marginBottom: '8px',
    },
  };

  if (attemptsLeft === 0 && showNameInput) {
    return (
      <div style={styles.container}>
        <div style={{...styles.card, textAlign: 'center'}}>
          <Award size={56} color="#a855f7" style={{margin: '0 auto 16px'}} />
          <h1 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '8px'}}>Попытки исчерпаны! 🎯</h1>
          <p style={{color: '#6b7280', marginBottom: '16px'}}>Вы использовали обе попытки. Спасибо!</p>
          <a href="https://t.me/sup_novikov" target="_blank" rel="noopener noreferrer" style={{...styles.button, background: 'linear-gradient(135deg, #84cc16, #22c55e)', color: '#fff'}}>
            📞 Консультация
          </a>
          <a href="https://t.me/bettercallLenya" target="_blank" rel="noopener noreferrer" style={{...styles.button, background: 'linear-gradient(135deg, #a855f7, #ec4899)', color: '#fff'}}>
            📢 Канал
          </a>
        </div>
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <Award size={48} color="#fff" style={{margin: '0 auto 12px', display: 'block'}} />
          <h1 style={styles.mainTitle}>Тест продажников</h1>
          <p style={styles.subtitle}>Оценка потенциала в продажах</p>
          <div style={{background: 'rgba(255,255,255,0.95)', padding: '6px 12px', borderRadius: '16px', display: 'inline-block', margin: '8px 0', fontSize: '11px'}}>
            <Sparkles size={12} style={{verticalAlign: 'middle', marginRight: '4px'}} />
            <span>Леонид Новиков, адвайзер по продажам</span>
          </div>
          <div style={{display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap'}}>
            <a href="https://t.me/sup_novikov" target="_blank" rel="noopener noreferrer" style={{background: 'linear-gradient(135deg, #84cc16, #22c55e)', color: '#fff', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'}}>
              <ExternalLink size={10} /> Консультация
            </a>
            <a href="https://t.me/bettercallLenya" target="_blank" rel="noopener noreferrer" style={{background: 'linear-gradient(135deg, #a855f7, #ec4899)', color: '#fff', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'}}>
              <ExternalLink size={10} /> Канал
            </a>
          </div>
          <div style={{background: '#fef3c7', border: '2px solid #fbbf24', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', color: '#92400e', marginTop: '8px', display: 'inline-block'}}>
            ⚠️ Осталось: <strong>{attemptsLeft} из 2</strong>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dbeafe)', borderRadius: '12px', padding: '12px', marginBottom: '16px'}}>
            <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px'}}>
              <Sparkles size={16} color="#84cc16" /> Инструкция:
            </div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', lineHeight: '1.6'}}>
              <li>• <strong>10 вопросов</strong></li>
              <li>• Один вариант ответа</li>
              <li>• Время: <strong>5-7 минут</strong></li>
              <li>• <strong style={{color: '#f59e0b'}}>Всего 2 попытки</strong></li>
            </ul>
          </div>

          <label style={{display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px'}}>Ваше имя:</label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Введите имя"
            style={{width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '12px'}}
          />

          <button
            onClick={handleStartTest}
            disabled={!candidateName.trim() || attemptsLeft === 0}
            style={{...styles.button, background: !candidateName.trim() || attemptsLeft === 0 ? '#d1d5db' : 'linear-gradient(135deg, #84cc16, #22c55e)', color: '#fff', opacity: !candidateName.trim() || attemptsLeft === 0 ? 0.5 : 1}}
          >
            Начать тест <Send size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const isHigh = score >= 8;
    const isMedium = score >= 5 && score < 8;
    const resultColor = isHigh ? '#10b981' : isMedium ? '#f59e0b' : '#ef4444';

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{width: '64px', height: '64px', borderRadius: '50%', background: resultColor, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>
            {isHigh && <Award size={40} color="#fff" />}
            {isMedium && <TrendingUp size={40} color="#fff" />}
            {!isHigh && !isMedium && <AlertCircle size={40} color="#fff" />}
          </div>
          <h1 style={styles.mainTitle}>{candidateName}, спасибо! 🎉</h1>
          {attemptsLeft > 0 && <p style={styles.subtitle}>Осталась {attemptsLeft} попытка</p>}
        </div>

        <div style={{background: resultColor, borderRadius: '16px', padding: '20px', marginBottom: '12px', color: '#fff'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '4px'}}>
                {isHigh ? 'Высокий потенциал' : isMedium ? 'Средний потенциал' : 'Требуется развитие'}
              </h2>
              <p style={{fontSize: '13px', opacity: 0.9}}>
                {isHigh ? '8-10 баллов' : isMedium ? '5-7 баллов' : '0-4 балла'}
              </p>
            </div>
            <div style={{fontSize: '48px', fontWeight: 'bold'}}>{score}</div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{marginBottom: '12px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px'}}>
              <CheckCircle size={16} color="#84cc16" />
              <span style={{fontSize: '14px', fontWeight: 'bold'}}>Что это значит:</span>
            </div>
            <p style={{fontSize: '13px', color: '#4b5563', lineHeight: '1.5'}}>
              {isHigh ? 'Вы понимаете суть современных продаж.' : isMedium ? 'Есть базовое понимание. Готовность учиться — ключ.' : 'Изучите консультативные продажи.'}
            </p>
          </div>

          <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dbeafe)', borderRadius: '12px', padding: '12px', marginBottom: '12px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px'}}>
              <Sparkles size={16} color="#a855f7" />
              <span style={{fontSize: '14px', fontWeight: 'bold'}}>Системные продажи?</span>
            </div>
            <p style={{fontSize: '12px', color: '#374151', marginBottom: '10px'}}>Леонид Новиков помогает выстраивать процессы от А до Я</p>
            <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
              <a href="https://t.me/sup_novikov" target="_blank" rel="noopener noreferrer" style={{background: 'linear-gradient(135deg, #84cc16, #22c55e)', color: '#fff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'}}>
                <ExternalLink size={12} /> Консультация
              </a>
              <a href="https://t.me/bettercallLenya" target="_blank" rel="noopener noreferrer" style={{background: 'linear-gradient(135deg, #a855f7, #ec4899)', color: '#fff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'}}>
                <ExternalLink size={12} /> Канал
              </a>
            </div>
          </div>

          <div style={{marginBottom: '12px'}}>
            <h3 style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>Детализация:</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px'}}>
              {questions.map((q, index) => {
                const correctAnswers = ['c', 'b', 'b', 'a', 'c', 'c', 'b', 'b', 'b', 'b'];
                const isCorrect = answers[index] === correctAnswers[index];
                return (
                  <div key={q.id} style={{aspectRatio: '1', borderRadius: '10px', background: isCorrect ? '#84cc16' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '13px'}}>
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={sendResultsToTelegram} style={{...styles.button, background: 'linear-gradient(135deg, #84cc16, #22c55e)', color: '#fff'}}>
            <Send size={16} /> Отправить результат
          </button>

          {attemptsLeft > 0 && (
            <button onClick={resetTest} style={{...styles.button, background: '#fff', color: '#374151', border: '2px solid #e5e7eb'}}>
              Пройти заново ({attemptsLeft})
            </button>
          )}
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div style={styles.container}>
      {showCoinAnimation && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1000}}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{position: 'absolute', left: `${15 + i * 15}%`, top: '-50px', fontSize: '24px', animation: 'coinFall 0.8s ease-out forwards', animationDelay: `${i * 0.1}s`}}>
              💰
            </div>
          ))}
        </div>
      )}

      <div style={{background: 'linear-gradient(135deg, #84cc16, #22c55e)', borderRadius: '16px', padding: '16px', marginBottom: '12px', color: '#fff'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
          <div>
            <div style={{fontSize: '15px', fontWeight: 'bold'}}>{candidateName}</div>
            <div style={{fontSize: '11px', opacity: 0.9}}>Тест продажника</div>
          </div>
          <div style={{fontSize: '24px', fontWeight: 'bold'}}>
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div style={{background: 'rgba(255,255,255,0.3)', height: '8px', borderRadius: '8px', overflow: 'hidden'}}>
          <div style={{background: '#fff', height: '100%', width: `${progress}%`, transition: 'width 0.5s ease', borderRadius: '8px'}} />
        </div>
      </div>

      <div style={styles.card}>
        <div style={{background: 'linear-gradient(135deg, #84cc16, #22c55e)', color: '#fff', padding: '5px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', marginBottom: '12px'}}>
          вопрос {currentQuestion + 1}
        </div>
        <h2 style={{fontSize: '17px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.3'}}>{currentQ.question}</h2>

        {currentQ.options.map((option) => (
          <button key={option.id} onClick={() => handleAnswer(option.id)} style={styles.optionButton}>
            <span style={{width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px'}}>
              {option.id.toUpperCase()}
            </span>
            <span style={{color: '#374151', fontWeight: '500', lineHeight: '1.3', flex: 1}}>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SalesAssessmentApp;
