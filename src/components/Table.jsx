import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import './css/Table.css'


const Table = ({ caption, fields, rows, resourceName }) => {
  return (
    <>
      <div className='list-container'>
        {caption && <h2>{caption}</h2>}
        <div className="list-group">
          <div className="row">
            {rows.map((row, rowKey) => (
              <div key={rowKey} className="col-md-6 mb-3">
                <li className="list-group-item border border-dark rounded">
                  <div>
                    {fields.map((field, fieldKey) => (
                      <div key={fieldKey}>
                        <strong>{field.label}</strong>: {row[field.name]}
                      </div>
                    ))}
                    <div className=" mt-2">
                      <Link className="btn btn-dark border border-2 border-dark me-4  button-13" to={`${resourceName}/${row.id}/detail`} state={row}>Details</Link>
                      <Link className="btn btn-dark border border-2 border-dark me-4 button-5" to={`${resourceName}/${row.id}/update`} state={row}>Edit</Link>
                      <Link className="btn btn-dark border border-2 border-dark  button-6" to={`${resourceName}/${row.id}/delete`} state={row}>Delete</Link>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

Table.propTypes = {
  caption: PropTypes.string,
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  resourceName: PropTypes.string,
};
export default Table;

