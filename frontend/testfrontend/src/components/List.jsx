import React, { useEffect, useState } from 'react'

const List = () => {

  const [load, setLoad] = useState(false)
  const [filesData, setFilesData] = useState([])
  const [isError, setIsError] = useState(false)

  const getFiles = async () => { 
    setLoad(true)
    try {
       const response = await fetch(`http://localhost:4000/files/data`)
       const data = await response.json()
       console.log("data", data)

       const result = data.flatMap((data) => { 
          const dataFileValue = data.file
          const linesData = data.lines.map((line) => { 
            return { 
              file: dataFileValue,
              hex: line.hex,
              number: line.number,
              text: line.text
            }
          })
          return linesData
       })

       setLoad(false)
       setFilesData(result)
       setIsError(false)

    } catch (error) {
       console.log(error)
       setLoad(false)
       setIsError(true)
    }
  }

  useEffect(() => { 
    getFiles()
  }, [])

  return (
    <div>
       {!load && filesData.length > 0 && !isError ? 
      
        <table class="table">
          <thead>
              <tr>
                  <th scope="col">FileName</th>
                  <th scope="col">Text</th>
                  <th scope="col">Number</th>
                  <th scope="col">Hex</th>
              </tr>
          </thead>

          <tbody class="table-group-divider">
              {filesData.map((file) => ( 
                <tr>
                  <th scope="row">{file.file}</th>
                  <td>{file.text}</td>
                  <td>{file.number}</td>
                  <td>{file.hex}</td>
                </tr>                          
              ))}
          </tbody> 
        </table> 
        
        : load && !isError ? ( 
            <p>Cargando....</p>
        ) : !load && isError ? ( 
            <p>Ocurrio un error!</p>
        ) : null
       
        }
    </div>
  )
}

export default List