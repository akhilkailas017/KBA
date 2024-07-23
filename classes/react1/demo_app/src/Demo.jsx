function Demo() {
    const colors = ["red", "green", "blue", "purple"]
    const loggedin = true
    const x = 10
  const y = 5
    return (
        <>
            <ul>
                {colors.map((color) => (
                    <li>{color}</li>
                ))}
            </ul>

            <h1>hello {loggedin ? 'admin' : 'user'}</h1>
            {x > 5 && <h1>"greater"</h1>}
               
        </>
    )
}

export default Demo;