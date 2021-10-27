import React from 'react'
import "./Table.css";

function Table({ countries }) {
    return (
        <div className='table'>
                    {countries.map((e, index) => {
                        return (<tr key={index}>
                            <td>{e.name}</td>
                            <td><strong>{e.cases}</strong></td>
                        </tr>
                        );
                    })}
        </div>
    )
}

export default Table
