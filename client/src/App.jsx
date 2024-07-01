import axios from 'axios'

function App() {

  const buyfunction = async() => {

    let response = await axios.post('http://localhost:3000/payment') 

    if(response && response.status === 200){


      window.location.href = response.data.session.url
      console.log(response.data)
    }
  }

  return (
    <>
    <button onClick={buyfunction}>
      Buy Now
    </button>
    </>
  )
}

export default App
