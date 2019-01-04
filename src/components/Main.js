import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDSo70sutI5VgRSmNIZI-Reoir93cNS4XM",
  authDomain: "personal-bio-760a6.firebaseapp.com",
  databaseURL: "https://personal-bio-760a6.firebaseio.com",
  projectId: "personal-bio-760a6",
  storageBucket: "personal-bio-760a6.appspot.com",
  messagingSenderId: "476996873032"
};
firebase.initializeApp(config);

class Main extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    submitted: false
  }

  setFormField = (obj) => {
      this.setState({
        [obj.target.name]: obj.target.value
      })
  }

  validateEmail = (testEmail) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(testEmail.toLowerCase());
  }

  allFieldsVerify = () => {
    if (this.state.name === "" || !this.validateEmail(this.state.email) || this.state.message === "") {
      return true;
    }
    return false;
  }

  submitForm = (e) => {
      e.preventDefault();
      const payload = {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      }

      firebase.database().ref("responses/").push(payload).then((data) => {
          this.setState({
            name: "",
            email: "",
            message: "",
            submitted:true
          })
          setTimeout(()=>{
            this.setState({
              ...this.state,
              submitted: false
              })
            },2000)
        }).catch((error) => {
          console.log(false)
      })
  }

  render() {

    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>

    return (
      <div ref={this.props.setWrapperRef} id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

        <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Intro</h2>
          <p style={{fontSize:"1.2rem",letterSpacing:'0.07rem'}}>
            I'm Warren and I really enjoy working on application software, be it desktop 🖥️ , web 🌐 , mobile 📱 or even wearable ⌚ and voice 💬 .<br />Besides this, I do spend time blogging at <a href="https://megabite.netlify.com">MEGABITE</a> and listening to good acoustic music and jazz.
          </p>
          {close}
        </article>

        <article id="work" className={`${this.props.article === 'work' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Work</h2>
          <p style={{ fontSize: "1.2rem", letterSpacing: '0.07rem' }}>I work on UI development projects <em> (not design; I'm terrible at that)</em> with vanilla JS 
            or even if need be with libraries like React or frameworks like Vue but occassionally also work on the backend with RESTful APIs on ExpressJS and GraphQL APIs on Apollo Server and GraphQL Yoga.<br />
            I also work on native mobile application projects with React Native and Flutter.<br />
            I am currently open to freelancing contracts. Mail me at <a href="mailto:warren1linux@gmail.com">warren1linux@gmail.com</a> !
            <br />Maybe, you should just look up <a href="https://github.com/whitetig3r">whitetig3r on GitHub</a> !
          </p>
          {close}
        </article>

        <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          {!this.state.submitted ? (<div><h2 className="major">Contact</h2>
          <form method="post">
            <div className="field half first">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={this.state.name} id="name" onChange={this.setFormField.bind(this)} />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" value={this.state.email} id="email" onChange={this.setFormField.bind(this)} />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" value={this.state.message} id="message" rows="4" onChange={this.setFormField.bind(this)}></textarea>
            </div>
            <ul className="actions">
              <li>
                <button
                   type="submit" 
                   onClick={(e)=>{this.submitForm(e)}}
                   className="special"
                   {...() => this.allFieldsVerify() ? "disabled" : true}
                   style={this.allFieldsVerify() ? { backgroundColor: 'grey', color: 'black', cursor: 'not-allowed', pointerEvents: 'none' } : {}} 
                 >
                  Send Message
                </button>
              </li>
              <li><input type="reset" value="Reset" onClick={()=>{this.setState({name:"",email:"",message:""})}} /></li>
            </ul>
          </form>
          <ul className="icons">
            <li><a href="https://twitter.com/WarrenMarkWhit2" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="https://www.instagram.com/warrenwhite97" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="https://github.com/whitetig3r" className="icon fa-github"><span className="label">GitHub</span></a></li>
          </ul></div>) : (
            <h2 style={{transition:'all 3s fade'}} className="major">
              Thanks for getting in touch<br/>
              <span style={{fontSize:'0.9rem'}}>I will get back to you shortly.</span>
            </h2>
          )}
          {close}
        </article>

      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main