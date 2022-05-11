function AboutProject() {
    return (
        <section className="about-project" id="aboutProject">
            <h2 className="promo__subtitle">О проекте</h2>
            <div className="underline" />
            <div className="about-project__text-container">
                <div className="about-project__text-column">
                    <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__text-column">
                    <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__time-line">
                <div className="about-project__back">
                    <div className="about-project__backend-time">1 неделя</div>
                    <div className="about-project__stage">Back-end</div>
                </div>
                <div className="about-project__front">
                    <div className="about-project__frontend-time">4 недели</div>
                    <div className="about-project__stage">Front-end</div>
                </div>
            </div>
        </section>
    );
  }
  
export default AboutProject;