
import {useState, useEffect} from "react";

const LangTranslator = (color)=>{

    const [currentCode, setCurrentCode] = useState('EN');

    const country = [
      {
        code: 'en',
        title: 'English',
      },
      {
        code: 'fr',
        title: 'French',
      },
      {
        code: 'pt',
        title: 'Portuguese',
      },
    ];
  
    const currentRouteName = () => {
      if (window.location.pathname === '/') {
        return `${window.location.pathname}`;
      } else {
        return `${window.location.pathname}/`;
      }
    };
  
    const doTranslation = (code) => {
      localStorage.setItem('lang', code);
      const lang = localStorage.getItem('lang');
      setCurrentCode(code);
      window.location.href = `${currentRouteName()}#googtrans(${code})`;
      window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 500);
      return false;
    };
  
    useEffect(() => {
      // doTranslation(localStorage.getItem('lang'));
    }, []);
  
    return(
        <div>
          
          <a className="nav-link text-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {currentCode}
              </a>
        <ul className="dropdown-menu">
        
          {country.map((item) => (
                    <li key={item.code}>
                    <a className="dropdown-item" href="javascript:;" onClick={() => doTranslation(item.code)}>
                    <img
                    alt={item.title}
                    src={`https://cdn.jsdelivr.net/npm/vue-gtranslate/img/flags/__${item.title}.png`}
                    className="vg-flag"
                    height="40px"
                  />
                  <span className="vg-text">{item.title}</span> 
                    </a>
                   
                  </li>
            
          ))}
        </ul>
      </div>
    )
}

export default LangTranslator;