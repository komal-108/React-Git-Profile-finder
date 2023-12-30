import { useState} from "react";
export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  async function handleData() {
    await fetch(`https://api.github.com/search/users?q=${inputValue}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.items);
        setData(response.items);
      });
  }
  console.log(data);
  return (
    <div className="container">
      <h1>Search GitHub Profile</h1>
      <div className="searchbar_container">
        <input
          className="user_input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button className="search_button" onClick={handleData}>
          Search
        </button>
      </div>
      <div className="user_container">
        {data.length > 0 ? (
          <>
            {data.map((user) => {
              return (
                <div className="user_box">
                  <img src={user.avatar_url} alt="/" className="user_image"></img>
                  <h2>{user.login}</h2>
                  <p>{user.node_id}</p>
                  <a href={user.html_url}>
                    <button className="search_button button">
                      View Profile
                    </button>
                  </a>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
