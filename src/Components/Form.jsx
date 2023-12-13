import React from 'react'

const Form = () => {
  return (
    <div>
    <form action="https://www.youtube.com/results" method="GET">
      <input type="text" name="search_query" />
      <button type="submit">
        Submit
      </button>
    </form>
  </div>
  )
}

export default Form