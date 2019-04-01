import React, { Component } from 'react'
import NewsCards from './../NewsCards/NewsCards.jsx'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import './NewsFolder.css'

export default class NewsFolder extends Component {

  constructor(props){
      super(props)
        this.state = {
            //Weather
            weatherData : "",

            //News
            country : "in",
            newsData : "",
            allData : [],

            //Arrays
            sourceArray : [],

            //filter values
            contentSearch : "",
            selectdSourse : "All",
        }
  } 

  componentDidMount = () => {
      //Downlaod news data
      axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=ccd90be7394a4a58ae369e5e9006a4d0")
      .then((response) => {
        console.log(response)
        this.setState({
            allData : response.data.articles,
            newsData : response.data.articles
        }, () => {
            this.prepareFilerArray();
        })
      })
      .catch( error => {

      })
      
      //Download weather data
      axios.get("https://api.openweathermap.org/data/2.5/weather?q=Delhi,in&appid=3fd0e78fd36e08ceeb5d4274687b0535")
      .then((response) => {
        console.log(response)
        this.setState({
            weatherData : response.data
        })
      })
      .catch( error => {

      })
  }

  prepareFilerArray = () => {
    let sourceArray = [];
    sourceArray.push("All");
    this.state.allData.forEach( (item)=> {
        if(sourceArray.indexOf( item.source.name ) == -1  ){
            sourceArray.push( item.source.name );
        }
    })
    this.setState({
        sourceArray : sourceArray
    },()=>{
        console.log(" Source : ", this.state.sourceArray );
    })
  }
    
  handleTextSearch = (event) => {
    const searchVal = event.target.value;
    this.setState({
        contentSearch : searchVal
    })
  } 

  handleDropdownChange = (event) => {
    const searchVal = event.target.value;
    const allData = this.state.allData;
    if( searchVal == "All" ){
        this.setState({
            selectdSourse : searchVal,
            newsData : allData
        })
    }else{
        let newsData = [];
        this.state.allData.forEach( (item) => {
            if( item.source.name == searchVal ){
                newsData.push(item)
            }
        })
        this.setState({
            selectdSourse : searchVal,
            newsData : newsData
        })
    }
  }
  
  render() {

    let newsCards = [], sourceList = [], weatherData = "";

    const menuStyle = {
        fontSize : '1vw'
    }

    const selectStyle = {
        width : "100%",
        color : "#000000",
        fontSize : '1.2vw',
        textAlign : 'start'
    }
    const loaderBox = {
        width:"30%",
        height : "5vw",
        textAlgin : "center",
        padding : "5%",
        fontSize : "1.5vw",
        background : "#fff",
        marginTop : "10%",
        marginLeft : "30%",
        borderRadius : "5px"
    }

    //Load weather data if available
    if( this.state.weatherData == "" ){
        weatherData =   <div className="temperature-box-main"> 
                                Loading weather data...
                        </div>
    }else{
        weatherData = <div className="temperature-box-main">
                        <div className="temp-events">
                            <div className="event-value">
                                {this.state.weatherData.name}
                            </div>
                            <div className="event-type">
                                Location
                            </div>
                        </div>
                        <div className="temp-events">
                            <div className="event-value">
                             { (parseInt(this.state.weatherData.main.temp) - 273.15).toFixed(1)}
                             <span className="meaurement-unit" > °C</span>
                            </div>
                            <div className="event-type">
                                Temperature
                            </div>
                        </div>
                        <div className="temp-events">
                            <div className="event-value">
                             { (parseInt(this.state.weatherData.main.humidity)) }
                            </div>
                            <div className="event-type">
                                Humidity
                            </div>
                        </div>
                        <div className="temp-events">
                            <div className="event-value">
                             { (parseInt(this.state.weatherData.main.pressure))}
                             <span className="meaurement-unit" > Pa</span>
                            </div>
                            <div className="event-type">
                                Pressure
                            </div>
                        </div>
                        <div className="temp-events">
                            <div className="event-value">
                             { this.state.weatherData.weather[0].main }
                            </div>
                            <div className="event-type">
                                Type
                            </div>
                        </div>
                    </div>
    }

    if( this.state.allData.length == 0 ){
        newsCards =  <div style={loaderBox} >
                            Loading news ...
                     </div>  
    }else{

        if( this.state.contentSearch == "" || this.state.contentSearch == " " ){
            this.state.newsData.forEach((news, index)=>{
                newsCards.push(
                    <div className="news-cards-div">
                        <NewsCards
                            key = {index}
                            title = {news.title}
                            author = {news.source.name}
                            url = {news.url}
                            urlToImage = {news.urlToImage}
                            publishedAt = {news.publishedAt}
                            content = {news.content}
                        />
                    </div>
                )
            })
        }else{
            const searchVal = (this.state.contentSearch).toLowerCase();
            this.state.newsData.forEach( (news, index)=>{
                if( news.title.toLowerCase().indexOf( searchVal ) != -1 ){
                    newsCards.push(
                        <div className="news-cards-div">
                            <NewsCards
                                key = {index}
                                title = {news.title}
                                author = {news.source.name}
                                url = {news.url}
                                urlToImage = {news.urlToImage}
                                publishedAt = {news.publishedAt}
                                content = {news.content}
                            />
                        </div>
                    )
                }
            })

        }
        this.state.sourceArray.forEach( (name) => {
            sourceList.push(<MenuItem style={menuStyle} value={name}>{name}</MenuItem>) 
        })
    }
    
    return (
      <div className="main news-body-main">
        <div className="filter-box-div" >
            <div className="filter-box-main">
                <div className="search-box-div" >
                    <TextField
                        id="standard-name"
                        style={{width:"100%",marginTop:"2%"}}
                        label="Search from content"
                        value={this.state.contentSearch}
                        onChange={this.handleTextSearch}
                        margin="normal"
                    />
                    {/* <FormHelperText style={{fontSize:'0.9vw'}}>Search based on the content</FormHelperText> */}
                </div>
                <div className="dropdown-box-div" >
                    {/* <FormControl style={{fontSize:'0.9vw',width:"100%",marginTop:"2%", marginLeft:"20%"}} className="full-space">
                        <InputLabel style={{fontSize:'0.9vw',width:"100%"}} htmlFor="age-helper">Select News Source</InputLabel>
                            <Select
                                // style={{width:"100%",marginTop:"2%"}}
                                value={this.state.selectdSourse}
                                onChange={ (event) => this.handleDropdownChange(event)}
                                style={selectStyle}
                                input={<Input/>}
                            >
                            {sourceList}
                        </Select>
                    </FormControl> */}
                </div>
            </div>
            {weatherData}
        </div>
        <div className="news-body-div" >
                {newsCards}
        </div>
            
      </div>
    )
  }
}
