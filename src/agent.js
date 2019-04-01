import axios from 'axios';
import qs from 'qs';

const API_ROOT = 'https://newsapi.org/v2/top-headlines';


const requests = {
	get : (url) => {
		return axios.get(API_ROOT + url)
					.then(res => {
						return res;
					})
					.catch(function (error) {
					    console.log(error);
					 })
	},
	post : (url ,body) => {
		return axios.post(API_ROOT + url, body)
			.then(res => {
				return res;
			})
			.catch(function (error) {
			    console.log(error);
			 })
	}
}