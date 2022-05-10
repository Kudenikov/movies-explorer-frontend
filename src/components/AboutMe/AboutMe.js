import myPhoto from '../../images/myPhoto.jpg';

function AboutMe() {
    return (
        <section className="about-me" id="aboutMe">
            <h2 className="promo__subtitle">Студент</h2>
            <div className="underline" />
            <div className="about-me__info">
                <div>
                    <h3 className="about-me__name">Артём</h3>
                    <p className="about-me__profession">Фронтенд-разработчик, 39 лет</p>
                    <p className="about-me__description">Я родился и живу в Белгороде, работаю на заводе Белэнергомаш - БЗЭМ 
                        в должности ведущего инженера-технолога - руководителя группы. 
                        Занимаемся проектированием и изготовлением металлоконструкций любой сложности.
                        У меня есть жена и дочь. Я люблю заниматься спортом, бегаю по выходным. Недавно начал кодить.
                        Сейчас обучаюсь на курсах Яндекс Практикум, хочу стать крутым веб-разработчиком.</p>
                    <div className="about-me__social-media">
                        <a href="https://linkedin.com/in/kudenikov" className="link link_decoration_none" target="blank">LinkedIn</a>
                        <a href="https://github.com/kudenikov" className="link link_decoration_none" target="blank">Github</a>
                    </div>
                </div>
                <img src={myPhoto} className="about-me__photo" alt="Me" />
            </div>
        </section>
    );
  }
  
export default AboutMe;