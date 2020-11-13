import React from "react"
import "./style.css"

export default () => {
  const qRef = React.useRef(null)
  const [data, setdata] = React.useState(null)

  const searchHandler = (_) => {
    fetch("http://localhost:3000/search?q=" + qRef.current.value)
      .then((res) => res.json())
      .then(setdata)
      .catch(console.error)
  }
  return (
    <section>
      <div>
        <label>Search:</label>
        <input
          type="text"
          id="q"
          name="q"
          ref={qRef}
          onKeyDown={searchHandler}
        />
        <button onClick={searchHandler}>Search</button>
      </div>
      {data && data.hits.length === 0 && <p>No data found</p>}
      {data && data.hits.map(Record)}
    </section>
  )
}

function Record({ index, picture, eyeColor, age, name, gender }) {
  return (
    <section className="record" key={index}>
      {name} is {age} old and {gender === "male" ? "he" : "she"} has {eyeColor}{" "}
      eyes.
    </section>
  )
}
