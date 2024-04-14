import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import './css/Table.css'
const Table = ({ caption, fields, rows, resourceName }) => {

  return (
    <>
      <table className='table table-bordered table-striped bg-light-subtle border border-dark'>
        <caption> {caption}</caption>
        <thead className="fw-bold">
          <tr>
            {fields.map((field, key) => (
              <th key={key}>
                {field.label}
                <i className="bi bi-sort-alpha-down"></i>
              </th>
            ))
            }
          </tr>
        </thead >
        <tbody>
          {rows.map((row, rowKey) => (
            <tr key={rowKey}>
              {fields.map((field, fieldKey) => (
                <td key={fieldKey}> {row[field.name]}</td>
              ))}
              <td className="text-center">
                <Link className="btn btn-dark border border-2 border-dark mr-2 button-5" to={`${resourceName}/${row.id}/update`} state={row}>Edit</Link>
              </td>
              <td className="text-center">
                <Link className="btn btn-dark border border-2 border-dark mr-2 button-6" to={`${resourceName}/${row.id}/delete`} state={row}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  caption: PropTypes.string,
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  resourceName: PropTypes.string,

}
export default Table;