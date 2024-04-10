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
        {rows.map((row, rowKey) => (
            <tr key={rowKey}>
                {fields.map((field, fieldKey) => (
                    <td key={fieldKey}> {row[field.name]}</td>
                ))}
                <td>
                    <Link className="btn btn-info mr-2" to={`${resourceName}/${row.id}/update`} state={row}>edit</Link>
                </td>
                <td>
                    <Link className="btn btn-danger mr-2" to={`${resourceName}/${row.id}/delete`} state={row}>delete</Link>
                </td>
            </tr>
        ))}
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