import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

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
            <tr key={fields}>
              {fields.map((field) => (
                <th key={field}>{fieldNames[field]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.uuid || item.id}>
                {fields.map((field) => (
                  <td key={field}>
                    {field === "mediaId" ? (
                      <ProductImage mediaUrl={item[field]} alt={item.title} width="50"/>
                    ) : (field === "title") || (field === "name") ? (
                      <Link to={`/product/detail?productId=${item.uuid || item.id}`}>
                        {item[field]}
                      </Link>
                    ) : field === "state" ? (
                      "Aktivní"
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
