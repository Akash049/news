import React, { Component } from 'react'
import { Image} from 'react-bootstrap';
import './NewsCards.css';

export default class NewsCards extends Component {

  constructor(props){
    super(props);
    this.state = {
      title : this.props.title,
      author : this.props.author,
      url : this.props.url,
      urlToImage : this.props.urlToImage,
      publishedAt : this.props.publishedAt,
      content : this.props.content,
    }
  }


  openNewsPage = () => {
    window.open(this.state.url, '_blank')
  }

  render() {
    return (
      <div className="news-card-main">
          <div onClick={this.openNewsPage} className="news-title">
            {this.state.title}
          </div>
          <div className="news-body">
            <div className="news-image" >
            <Image style={{maxHeight:'100%', maxWidth:'100%'}} alt="Loading..." src={this.state.urlToImage} circle className="app-logo" />
            </div>
            <div className="news-content">
             {this.state.content}
            </div>
          </div>
          <div className="news-events">
            <div className="news-author">
               {this.state.author}
            </div>
            <div className="news-date">
               { new Date(this.state.publishedAt).toDateString() }
            </div>
          </div>
      </div>
    )
  }
}
