import axios from "axios";

let exports = {};

exports.getQuestions = () => {
    axios
        .get('https://opentdb.com/api.php?amount=20')
        .then(response => {
           return response
        })
}
axios.get('https://localhost:7111/users', {
    withCredentials: true,  // Erlaubt das Senden von Cookies und Auth-Headern
    })
    .then(response => {
    console.log(response);
    })
    .catch(error => {
    console.error('Error:', error);
    });

export default exports;