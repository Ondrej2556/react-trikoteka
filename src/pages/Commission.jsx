import ProductTable from "../components/products/ProductTable";
import products from "../sample-data/products";

const Commission = () => {
  
  return (
    <main>
      <div className="breadCrumbs">Provize</div>
      <ProductTable
        noProductMessage="Zatím nemáte žádné provize"
        data={products}
        fields={[ "date","title", "commissionState", "commission"]}
        fieldNames={{
          date: "Datum",
          title: "Název",
          commissionState: "Stav",
          commission: "Provize",
        }}
        customRender={{
            commissionState: (item) => (
              <span>{item.commissionState}</span>
            ),
          }}
      />
    </main>
  );
};

export default Commission;
