import PropTypes from "prop-types";
import {Link } from 'react-router-dom'

const Table = ({ caption, fields, rows, resourceName}) => {
    
    return (
      <>
        <table className= 'table table-bordered table-striped bg-light-subtle border border-primary-subtle'>
          <caption> {caption}</caption>
          <thead>
            <tr>
            { fields.map((field,key) => (
                <th key = {key}>
                    {field.label}
                    <i className="bi bi-sort-alpha-down"></i>
                </th>
              ))
            }
            </tr>
          </thead>
          <tbody>
            { rows.map((row, key) => (
                <tr key={key}>
                  { fields.map((field,key) => (
                      <td key= {key}> {row[field.name]}</td> // pick the property from the row with given name
                    ))                
                  }
                  <td key ={key}> <Link className="btn btn-info mr-2" to={`${resourceName}/${row.id}/update`} state={row}>edit</Link> </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  };

Table.propTypes ={
  caption: PropTypes.string,
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  resourceName: PropTypes.string,
  
}
export default Table;