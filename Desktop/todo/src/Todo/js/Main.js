import React, {Component } from 'react'
import classes from '../css/Main.module.css'
import axios from 'axios'
class Main extends Component {
    state = {
        Quote: '',
        Author: '',
        mainFocus: '',
        showMainFocus:true,
        mssg:'What is your Main focus Today?',
        checked:false,
    }

    componentDidMount() {
        axios.get('https://api.quotable.io/random', { params: { maxLength: 25 } }).then((res) => {
            this.setState({ Quote: res.data.content, Author: res.data.author })
        })
        if(localStorage.getItem("mainFocus")===null ){
            localStorage.setItem("mainFocus",'');
        }
        else if(localStorage.getItem("mainFocus")){
            this.setState({mainFocus:JSON.parse(localStorage.getItem("mainFocus")),showMainFocus:false})
        }
        if(localStorage.getItem("checked")===null){
            localStorage.setItem("checked",false)
        }
        else if(localStorage.getItem("checked")){
            this.setState({checked:JSON.parse(localStorage.getItem("checked"))})
        }
    }

    keyDown = (e) => {
        if (e.keyCode === 13) {
            this.setState({ mainFocus: e.target.value,mssg:"TODAY",showMainFocus:false })
        }
        localStorage.setItem("mainFocus",JSON.stringify(e.target.value))
    }

    strikeMainFocus=(e)=>{
        this.setState({checked:e.target.checked })
        localStorage.setItem("checked",e.target.checked)
    }

    onClickOfCross=()=>{
        this.setState({mainFocus:'',
        mssg:'What is your Main focus Today?',
        showMainFocus:true,
        checked:false
    })
        localStorage.setItem("checked",false)
        localStorage.setItem("mainFocus",'')
    }

    render() {
        let disp = null
        if (this.state.showMainFocus) {
            disp = <input type="text" className={classes.input} onKeyDown={this.keyDown} />
        }
        else {
            disp =  <div className={classes.mainFocus}>
                        <input type="checkbox" className={classes.checkBox} 
                        onChange={(e)=>{this.strikeMainFocus(e)}}
                        checked={this.state.checked}                     
                        />
                        
                        {this.state.checked===true?<div className={classes.checked}>
                            <del><p>{this.state.mainFocus}</p></del>
                            <p className={classes.plus} onClick={this.onClickOfCross}>+</p>
                        </div>: <p>{this.state.mainFocus}</p>  }
                    </div>
        }
        const time = new Date()
        const hours= time.getHours() <10 ? "0" + time.getHours() : time.getHours()
        const minutes= time.getMinutes() <10 ? "0" + time.getMinutes() : time.getMinutes()
        const currTime = hours + ":" + minutes
        return (
            <div className={classes.Main}>
                <p className={classes.time}>{currTime}</p>
                <p className={classes.Quote}>{this.state.Quote}</p>
                <p className={classes.Quote}>{this.state.mssg}</p>
                {disp}
            </div>
        )
    }

}

export default Main