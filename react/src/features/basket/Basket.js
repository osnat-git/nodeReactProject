import { useDeleteBasketMutation, useGetBasketQuery, useUpdatebasketQuantityMutation } from "./basketApiSlice"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { useUpdateProductMutation } from "../products/productsApiSlice";
import { useNavigate } from "react-router-dom";

const Basket = () => {
    // const [list, setList] = useState([])
    const navigate=useNavigate()
    const { data:list, isError, isLoading, isSuccess, error } = useGetBasketQuery()
    const [deleteBasket, { data: dataD, isError: isErrorD, isSuccess: isSuccessD, error: errorD }] = useDeleteBasketMutation()
    const [updatebasketQuantity, { }] = useUpdatebasketQuantityMutation()
    const [updateProduct, { isError: uIsError, isLoading: uIsLoading, isSuccess: uIsSuccess, data: uData, error: uError }] = useUpdateProductMutation()

    // getBasket()
   

    const deleteBodyTemplate = (product) => {
        return (<Button icon={PrimeIcons.TRASH} className="p-button-rounded" onClick={() => deleteP(product)} ></Button>)
    }

    const deleteP = (product) => {
        deleteBasket(product);
        updateProduct({ ...product.productId, quantity: product.productId.quantity + product.quantity });
    }

    const plus = (product) => {
        updatebasketQuantity({ ...product, quantity: product.quantity + 1 })
        updateProduct({ ...product.productId, quantity: product.productId.quantity - 1 })
    }

    const minus = (product) => {
        updatebasketQuantity({ ...product, quantity: product.quantity - 1 })
        updateProduct({ ...product.productId, quantity: product.productId.quantity + 1 })
    }

    const quan = (product) => {
        return (<div className="btns">
            <Button icon={PrimeIcons.PLUS_CIRCLE} className="p-button-rounded bp" disabled={product.productId.quantity <= 1} onClick={() => plus(product)} ></Button>
            <span className="num">{product.quantity}</span>
            <Button icon={PrimeIcons.MINUS_CIRCLE} disabled={product.quantity <= 1} className="p-button-rounded bp" onClick={() => minus(product)} ></Button>
        </div>)
    }

    const imageBodyTemplate = (p) => {
        return <img src={`http://localhost:1111/${p.productId.image}`} alt={p.productId.image} className="w-6rem  border-round basketImage" />;
    };

    const priceBodyTemplate = (product) => {
        return (`₪ ${product.productId.price}`);
    };

    let pay = 0, sum = 0
     for (let i = 0; isSuccess && i < list.length; i++) {
        // console.log(`products[${i}].price`, products[i].price);
        // console.log(`products[${i}].name`, products[i].name);
        // console.log(products[i].quantity);
        pay += list[i].productId.price * list[i].quantity
        sum += list[i].quantity
    }
    const footer = ` ₪סכ"ה: ${sum} מוצרים, סך לתשלום: ${pay}`;



    return (<>
        <div className="card">
            {isSuccess && <DataTable value={list} className="dataTable" footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column header="הסר מוצר" body={deleteBodyTemplate}></Column>
                <Column header="כמות" body={quan}></Column>
                <Column field="price" header="מחיר" body={priceBodyTemplate}></Column>
                <Column header="תמונה" body={imageBodyTemplate}></Column>
                <Column field="name" header="מוצר" body={(p) => <span>{p.productId.name}</span>}></Column>
            </DataTable>}
        </div>
    </>)
}
export default Basket