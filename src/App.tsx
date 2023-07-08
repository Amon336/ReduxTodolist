import React from 'react';
import logo from './logo.svg';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { BrowserRouter as Router , Route, Routes, Link } from 'react-router-dom';
import { userSlice } from './store/reducers/userSlice';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHouse, faList, faPencil, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  return (
    <>
        <Router>

            <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/todolist' element={<Todolistcomponent />}/>
            </Routes>

        </Router>
    </>
  );
}

function Home() {
    let {balance, lang} = useAppSelector(state => state.userReducer)

    let dispatch = useAppDispatch()

    let [num, setNum] = useState('')

    let importMoney = (balance : number) => {
        dispatch(userSlice.actions.importMoney(balance))
    }
    return (
        <>
            <Navigation />
            <div className='center'>
                <h1>{balance}</h1>
                <input type="text" onChange={(event) => {

                      event.target.value = event.target.value.replace(/\D/g, '');

                      setNum(event.target.value)

                  }} 

                  placeholder={lang === 'ru' ? 'Введите сумму' : 'Enter sum'}
                />

                <button onClick={() => num !== '' ? importMoney(parseInt(num)) : ''}>
                    {lang === 'ru' ? 'Вложить':'Import'}
                </button>
            </div>
        </>
    )
}

function Todolistcomponent() {
    let green = 'rgba(17, 151, 17, 0.797)'

    let red = 'rgba(160, 20, 20, 0.797)'

    let gray = 'gray'

    let [color, setColor] = useState<string>(gray)

    let [text, setText] = useState<string>('')

    let dispatch = useAppDispatch()

    let {balance, lang, texts} = useAppSelector(state => state.userReducer)

    let toComponentTexts = texts.map((item, index) => (
        <TodolistCard index={index} key={index} text={item} />
    ))

    return (
      <>
          <Navigation />
          <h1 className='balance'>{lang === 'ru' ? 'Баланс':'Balance'} : {balance}</h1>
          <div className='add-todocard'>
              <input type="text" placeholder={lang === 'ru' ? 'Введите текст': 'Enter text'} onChange={(event) => {
                  setText(event.target.value)
              }}/>
              <button style={{color, border: `2px solid ${color}`}} onTouchStart={() => {
                    if(text.trim().length === 0) {
                        setColor(red)
                    }else {
                        setColor(green)
                    }
              }}
              onTouchEnd={() => {
                    setColor(gray)
              }}
              onMouseDown={() => {
                    if(text.trim().length === 0) {
                        setColor(red)
                    }else {
                        setColor(green)
                    }
              }}
              onMouseUp={() => {
                    setColor(gray)
              }}
              onClick={() => {

                text.trim().length === 0 ? setText(''): dispatch(userSlice.actions.addText(text))

              }}><FontAwesomeIcon icon={faCheck} /></button>
          </div>
          <main>
              {toComponentTexts}
          </main>
      </>
    )
}

interface cardInterface {
    text : string;

    index : number;
}

function TodolistCard(props : cardInterface) {
    let dispatch = useAppDispatch()

    let {lang} = useAppSelector(state => state.userReducer)

    let {changeText, removetext} = userSlice.actions

    let [width, setWidth] = useState<number>(0)

    let [padding, setPadding] = useState<number>(0)

    let [text, setText] = useState<string>('')

    let [pencil, setPencil] = useState<string>('scale(1, 1)')

    let [CloseOrConfirm, setBtns] = useState<string>('scale(0, 0)')

    return (
        <div className='card'>
            <div>
                <input type="text" placeholder={
                        lang === 'ru' ? 'Введите текст': 'Enter text'
                    }   
                    style={{maxWidth:width, padding}}

                    onChange={(event) => {
                        setText(event.target.value)
                    }}
                />

                <button style={{transform : CloseOrConfirm}} className='confirm-btn' onClick={() => {
                    text.trim().length !== 0 ? dispatch(changeText({index : props.index, text : text})) : setText('')
                    setWidth(0)
                    setPadding(0)
                    setBtns('scale(0 , 0)')
                    setPencil('scale(1, 1)')
                }}>
                    <FontAwesomeIcon icon={faCheck} /> 
                </button>

                <button style={{transform : CloseOrConfirm}} onClick={() => {
                        setText('')
                        setWidth(0)
                        setPadding(0)
                        setBtns('scale(0 , 0)')
                        setPencil('scale(1, 1)')
                    }
                } className='close-btn'>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <button className='delete-btn' onClick={() => {
                    dispatch(removetext(props.text))
                }}> 
                    <FontAwesomeIcon icon={faTrash} /> 
                </button>

            </div>
            <h3>{text.trim().length !== 0 ? text : props.text}</h3>
            <button className='edit-btn' style={{transform :pencil}} onClick={() => {
                        setWidth(200)
                        setPadding(10)
                        setBtns('scale(1 , 1)')
                        setPencil('scale(0, 0)')
                    }
                }> 
                <FontAwesomeIcon icon={faPencil} />
            </button>
        </div>
    )
}

function Navigation() {
    let {lang} = useAppSelector(state => state.userReducer)

    let dispatch = useAppDispatch()

    let ruFunction = () => {
        dispatch(userSlice.actions.ruLanguage())
    }

    let enFunction = () => {
        dispatch(userSlice.actions.enLanguage())
    }
    return (
        <nav>
            <Link to='/todolist'><span><FontAwesomeIcon icon={faList} /></span></Link>
            <Link to='/'><span><FontAwesomeIcon icon={faHouse} /></span></Link>
            <button onClick={ruFunction}><span>RU</span></button>
            <button onClick={enFunction}><span>EN</span></button>
        </nav>
    )
}

export default App;
