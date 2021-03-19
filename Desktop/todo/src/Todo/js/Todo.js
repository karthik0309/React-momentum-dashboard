import React, { PureComponent } from 'react'

//images
import BackGround from "../assets/hello.jpg"
import BackGround1 from "../assets/one.jpg"
import BackGround3 from "../assets/three.jpg"
import BackGround4 from "../assets/ten.jpg"
import BackGround5 from "../assets/five.jpg"
import BackGround6 from "../assets/eleven.jpg"
import BackGround7 from "../assets/four.jpg"
import BackGround8 from "../assets/six.jpg"
import BackGround9 from "../assets/seven.jpg"
import BackGround10 from "../assets/img_one.jpg"
import BackGround11 from "../assets/img_two.jpeg"
import BackGround12 from "../assets/img_four.jpeg"
import BackGround13 from "../assets/img_five.jpeg"
import BackGround14 from "../assets/img_six.jpg"
import BackGround15 from "../assets/img_three"

import axios from 'axios'

//Components
import BottomTodo from './bottomTodo'
import Main from './Main'
import Weather from './Weather'
//css
import classes from "../css/Todo.module.css"

class Todo extends PureComponent {
    state = {
        todoClicked: false,
        smallQuote: '',
        author: '',
    }
    componentDidMount() {
        axios.get('https://api.quotable.io/random', { params: { maxLength: 70 } }).then((res) => {
            this.setState({ smallQuote: res.data.content, author: res.data.author })
        })
    }
    todoHandler = () => {
        this.setState((prevState) => (
            { todoClicked: !prevState.todoClicked }
        ))
    }
    imgArr = [BackGround, BackGround1, BackGround3, BackGround4,BackGround5,
              BackGround6,BackGround7,BackGround8,BackGround9,BackGround10,BackGround11,
              BackGround12,BackGround13,BackGround14,BackGround15]
    bgHandler = () => {
        let oneImg = this.imgArr[Math.floor(Math.random() * this.imgArr.length)]
        return oneImg
    }
    style = {
        background: `url(${this.bgHandler()})`,
        overflow: 'hidden',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 0,
        padding: 0
    }
    googlestyle={
        position:'absolute',
        top:0,
        left:0,
        background:'transperent'
    }
    render() {
        return (
            <div style={this.style} >
                <Main />
                <BottomTodo
                    clicked={this.todoHandler}
                    modal={this.state.todoClicked} />
                <Weather />
                <div className={classes.bottomQuote}>
                    <p>"{this.state.smallQuote}"</p>
                    <p className={classes.author}>{this.state.author}</p>
                </div>
                <p className={classes.logo} >ReactPro</p>
                <div className={classes.social}>
                    <a href="https://www.instagram.com/karthikbelida/" ><abbr title="instagram"><img src="https://img.icons8.com/ios-filled/64/ffffff/instagram-new.png" alt="insta" /></abbr></a> 
                    <a href="https://www.linkedin.com/in/karthik-belida-02283b193"><abbr title="linkedin"><img src="https://img.icons8.com/metro/26/ffffff/linkedin.png" alt="linkedin" /></abbr></a>  
                </div>
            </div>
        )
    }

}


export default Todo






