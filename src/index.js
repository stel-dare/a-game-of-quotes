import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
  super(props);

  this.state={
    error:null,
    isLoaded:false,
    theQuote:''
  };

  this.fetchQuote=this.fetchQuote.bind(this);
  this.copyToClipboard=this.copyToClipboard.bind(this);
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote(){
    this.setState({isLoaded:false});
    fetch('https://got-quotes.herokuapp.com/quotes')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          isLoaded:true,
          theQuote:data});
      },
      (error)=>{
        this.setState({
          isLoaded:true,
          error:error
        });
      }
    );
  }

  copyToClipboard(e){
    this.textArea.select();
    document.execCommand('copy');
     e.target.focus();
    console.log('called');
  }

  render(){
    return(
      <React.Fragment>
      <h1 className='title'>A Game Of Quotes</h1>
      <div id='quote-box'>
      <DisplayQuote quote={this.state.theQuote} isLoaded={this.state.isLoaded} error={this.state.error} />
      <Tweet quote={this.state.theQuote} />
      <Copy copyQuote = {this.copyToClipboard} />
      <GetQuote handleClick={this.fetchQuote}/>
      </div>
      <p className='credit'>Made by <a href='https://stel-dare.github.io' rel='noopener noreferrer' target='_blank'>Stel</a> with love. Images from <a  href='https://wall.alphacoders.com' rel='noopener noreferrer' target='_blank'>wall.alphacoders.com</a>. Quotes from <a href='https://github.com/wsizoo/game-of-thrones-quotes' rel='noopener noreferrer'  target='_blank'>wsizoo.</a></p>
      <textarea ref={(textarea) => this.textArea = textarea} value={this.state.theQuote? this.state.theQuote.quote : this.state.theQuote} id="copyText"/>
      </React.Fragment>
    );
  }
}

const DisplayQuote = ({error, isLoaded, quote}) =>{
  //let parsed = JSON.parse(quote);
  return(
    <React.Fragment>
    <p id='text'> {error? 'A network error occured' : isLoaded? <span><i className="fas fa-quote-left"></i> {quote.quote}</span> : <i className="fas fa-quote-left loading"></i>}</p>
    <p id='author'>- {error? '!' : isLoaded? quote.character : <span>.</span>}</p>
    </React.Fragment>
  );
}

const Tweet = ({quote}) =>{
  //let parsed = JSON.parse(quote);
  return(
    <a href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.character}, Game of Thrones`} rel='noopener noreferrer' target='_blank' id='tweet-quote'><i className="fab fa-twitter"></i></a>
  );
}

const Copy = ({copyQuote}) =>{
  return(<i className="far fa-copy" id='copy-quote' onClick={copyQuote}></i>);
}

const GetQuote = ({handleClick}) =>{
  return(<i className="fas fa-forward" id='new-quote' onClick={handleClick}></i>);
}

//let myQuote = '{ "quote" :"Every child is an artist. The problem is how to remain an artist once he grows up.","character" : "Pablo Picasso"}'



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
