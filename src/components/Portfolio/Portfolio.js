function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a href="https://kudenikov.github.io/how-to-learn/" target="blank" className="link link_decoration_none">Статичный сайт</a> 
                    <a href="https://kudenikov.github.io/how-to-learn/" target="blank" className="link link_decoration_none">&#8599;</a>
                </li>
                <div className="underline underline_color_grey" />
                <li  className="portfolio__item">
                    <a href="https://kudenikov.github.io/russian-travel/" target="blank" className="link link_decoration_none">Адаптивный сайт</a> 
                    <a href="https://kudenikov.github.io/russian-travel/" target="blank" className="link link_decoration_none">&#8599;</a>
                </li>
                <div className="underline underline_color_grey" />       
                <li  className="portfolio__item">
                    <a href="https://kudenikov.github.io/react-mesto-auth/" target="blank" className="link link_decoration_none">Одностраничное приложение</a> 
                    <a href="https://kudenikov.github.io/react-mesto-auth/" target="blank" className="link link_decoration_none">&#8599;</a>
                </li>
            </ul>
        </section>
    );
  }
  
export default Portfolio;