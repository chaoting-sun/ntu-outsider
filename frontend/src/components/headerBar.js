import '../css/headerBar.css'
import logo from './logo.png';


const headerBar = () => {

  return (
    <header className='headerBarContainer'>
      <div className='brandContainer'>
        <div className='logoContainer'>
          <img alt='logo' src={logo} />
          <div id="brandNameContainer">
            <div>NTU</div>
            <div>OUTSIDER</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default headerBar;