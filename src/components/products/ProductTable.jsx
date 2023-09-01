import React from "react";
import { Link } from "react-router-dom";

const ProductTable = ({
  data,
  fields,
  noProductMessage,
  fieldNames,
  customRender,
}) => {
  const isDataEmpty = data.length === 0;
  return (
    <div>
      {isDataEmpty ? (
        <p className="emptyData">{noProductMessage}</p>
      ) : (
        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field}>{fieldNames[field]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {fields.map((field) => (
                  <td key={field}>
                    {field === "imageUrl" ? (
                      <img src={item[field]} alt={item.title} width="50" />
                    ) : field === "title" ? (
                      <Link to={`/product/detail?productId=${item.id}`}>
                        {item[field]}
                      </Link>
                    ) : customRender[field] ? (
                      customRender[field](item)
                    ) : (
                      item[field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
