import React from 'react'
import { useState } from "react";
import '../css/navigationBar.css'
import Filter from './filter';
import { MdTune, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { SignedIn } = useOusider();

  const [priceFilter, setPriceFilter] = useState([])
  const [mealFilter, setMealFilter] = useState([])
  const [typeFilter, setTypeFilter] = useState([])

  const [display, setDisplay] = useState("")
  const options = ["price", "distance"];
  const [sortMethod, setSortMethod] = useState(options[0]);
  // Blank all
  const [filterExpanded, setFilterExpanded] = useState(false);

  const navigate = useNavigate();

  const navigateToSearch = () => {
    console.log("navigateToSearch...");

    setFilterExpanded(false)

    navigate('/search', {
      state: {
        priceFilter: changeDollarSignToInt(),
        mealFilter: mealFilter,
        typeFilter: typeFilter,
        sortBy: sortMethod
      },
    });

  };
  return (
    <div className='navBarContainer'>
      <div className='titleContainer'>
        <a href="/" className='titleName'>NTU OUTSIDER</a>
      </div>
      <div className='functionRow'>

        <div className='filterContainer' onClick={e => setFilterExpanded(!filterExpanded)}>
          <MdTune size={28} />
          <div className='filter'>{display}</div>
          {filterExpanded ? <MdOutlineKeyboardArrowUp size={28} /> :
            <MdOutlineKeyboardArrowDown size={28} />}
        </div>

        <div className='sortContainer'>
          <select value={sortMethod} onChange={e => setSortMethod(e.target.value)}>
            {options.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className='searchContainer'>
          <button onClick={navigateToSearch}>Search</button>
        </div>
      </div>

      {filterExpanded ?
        <Filter priceFilter={priceFilter} setPriceFilter={setPriceFilter}
          mealFilter={mealFilter} setMealFilter={setMealFilter}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
          setDisplay={setDisplay} />
        : <></>
      }
    </div>
  )
}
export default NavBar