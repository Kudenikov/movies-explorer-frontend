function Footer() {
    return (
        <footer className="footer">
            <p className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="underline underline_color_grey" />
            <div className="footer__text">
                <div className="footer__date">&copy; {new Date().getFullYear()}</div>
                <ul className="footer__list">
                    <li><a href="https://practicum.yandex.ru/" className="link link_decoration_none" target="blank">Яндекс.Практикум</a></li>
                    <li><a href="https://github.com/kudenikov" className="link link_decoration_none" target="blank">Github</a></li>
                    <li><a href="https://linkedin.com/in/kudenikov" className="link link_decoration_none" target="blank">LinkedIn</a></li>
                </ul>
            </div>
        </footer>
    );
  }
  
export default Footer;