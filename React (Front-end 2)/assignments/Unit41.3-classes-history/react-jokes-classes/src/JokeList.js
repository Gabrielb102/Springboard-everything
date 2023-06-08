import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./static/JokeList.css";

class JokeList extends React.Component {
  constructor () {
    super();
    this.state = {jokes : [],
      sortedJokes : []};
    this.vote.bind(this);
    this.setState.bind(this);
  }

  /* empty joke list and then call getJokes */

  // method to get new Jokes
  async getJokes() {
    let j = [...this.state.jokes];
    let seenJokes = new Set();
    try {

      // loop to get jokes
      while (j.length < 10) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;
        window.localStorage.setItem(jokeObj.id, 0);

        // avoid rpts
        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes : 0});
        } else {
          console.error("duplicate found!");
        }
      }

      // place list of jokes in state
      this.setState({jokes: j});
    } catch (e) {
      console.log(e);
    }
  }

  /* change vote for this id by delta (+1 or -1) */
  vote(id, delta) {
    const joke = JSON.parse(window.localStorage.getItem(id));
    window.localStorage.setItem(id, joke + delta);
  }

  async componentDidMount() {
    await this.getJokes();
    this.setState({sortedJokes : [...this.state.jokes].sort((a, b) => window.localStorage.getItem(b.id) - window.localStorage.getItem(a.id) )});
  }

   /* render: either loading spinner or list of sorted jokes. */

  render() {
    return (
      <div className="JokeList" onClick={() => this.setState({...this.state})}>
        <button className="JokeList-getmore" onClick={() => this.setState({ jokes: [] })}>
          Get New Jokes
        </button>
  
        {this.state.sortedJokes.map(j => (
          <Joke text={j.joke} key={j.id} id={j.id} votes={window.localStorage.getItem(j.id)} vote={this.vote} />
        ))}
      </div>
    );
  }
  
}

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

export default JokeList;
