import { PrimeIcons } from "primereact/api"
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "./productsApiSlice"
import { useEffect, useState } from "react"
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import useAuth from "../auth/useAuth"
import ManageProducts from './ManageProducts'
import { classNames } from 'primereact/utils';
import Manageproducts from "./ManageProducts";
import { useSelector } from "react-redux";
import { useAddBasketMutation, useGetBasketQuery, useUpdatebasketQuantityMutation } from "../basket/basketApiSlice";
import { Message } from "primereact/message";
import Singleproduct from "./SingleProduct";


const Products = () => {
    // const [iceCreams, setIceCreams] = useState([])
    const [addVisible, setAddVisible] = useState(false)
    const [update, setUpdate] = useState(false)
    const [single, setSingle] = useState(false)
    const [product, setProduct] = useState({})
    const [layout, setLayout] = useState('grid')
    const { role } = useAuth()
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const { data:iceCreams, isError, isLoading, isSuccess, error } = useGetProductsQuery()
    const [deleteProduct, { isError: deleteIsError, error: deleteError, isSucces: deleteIsSuccess }] = useDeleteProductMutation()
    const [addBasket, { isError: basketIsError, error: basketError, isSuccess: basketIsSuccess, data: basketdata }] = useAddBasketMutation()
    const [updateProduct, { isError: uIsError, isLoading: uIsLoading, isSuccess: uIsSuccess, data: uData, error: uError }] = useUpdateProductMutation()
    const { data:basket } = useGetBasketQuery()
    const [updatebasketQuantity, { }] = useUpdatebasketQuantityMutation()

    // useEffect(() => {
    //     setIceCreams(data)

    // }, [isSuccess])

    const handleSingleProduct=(product)=>{
       
        
        setProduct(product)
         console.log(single);
        setSingle(true)
    }

    const handleUpdate = (product) => {
        setProduct(product)
        setUpdate(true)
    }

    const addToBasket = (product) => {
        const founded=basket.find((p)=>p.productId._id==product._id)
        if(founded)
            updatebasketQuantity({...founded,quantity:founded.quantity+1})
        else
            addBasket({ productId: product._id })
        updateProduct({ ...product, quantity: product.quantity - 1 })
    }

    const listItem = (product, index) => {
        return (
            <div className="col-12 listCard" key={product.id}>
                <div className={classNames('pImg  flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img onClick={()=>{handleSingleProduct(product)}} className="w-9 sm:w-16rem xl:w-10rem  block xl:block mx-auto border-round" src={`http://localhost:1111/${product.image}`} alt={product.name} />
                    <div  className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div onClick={()=>{handleSingleProduct(product)}} style={{width:"70vw",position:"relative",left:"0px"}} className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="flex align-items-center gap-3">
                                {/* <span className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{product.category}</span>
                            </span> */}
                                <Tag value={product.quantity > 5 ? "במלאי" : product.quantity <= 1 ? "אזל מהמלאי" : "מלאי מצומצם"} severity={product.quantity > 5 ? "success" : product.quantity <= 1 ? "danger" : "warning"}></Tag>
                            </div>
                        </div>
                        <div className="listButtons flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.quantity <=1 || !isUserLoggedIn} onClick={() => addToBasket(product)}></Button>
                            {role === "admin" && <Button icon={PrimeIcons.MINUS} className="p-button-rounded" onClick={() => deleteProduct(product)} ></Button>}
                            {role === "admin" && <Button icon={PrimeIcons.REPLAY} className="p-button-rounded" onClick={() => handleUpdate(product)}></Button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id} >
                <div id="gridItem" className="p-4 border-1 surface-border surface-card border-round">
                    <div onClick={()=>{handleSingleProduct(product)}} className="flex align-items-center gap-3">
                                {/* <span className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{product.category}</span>
                            </span> */}
                                <Tag value={product.quantity > 5 ? "במלאי" : product.quantity <= 1 ? "אזל מהמלאי" : "מלאי מצומצם"} severity={product.quantity > 5 ? "success" : product.quantity <= 1 ? "danger" : "warning"}></Tag>
                            </div>
                    <div onClick={()=>{handleSingleProduct(product)}} className="flex flex-column align-items-center gap-3 py-5">

                        <img className="w-9  border-round pImg" style={{boxShadow:"none"}} src={`http://localhost:1111/${product.image}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.quantity <=1 || !isUserLoggedIn} onClick={() => addToBasket(product)}></Button>
                        {role === "admin" && <Button icon={PrimeIcons.TRASH} className="p-button-rounded" onClick={() => deleteProduct(product)} ></Button>}
                        {role === "admin" && <Button icon={PrimeIcons.REPLAY} className="p-button-rounded" onClick={() => handleUpdate(product)}></Button>}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);


        return gridItem(product)
    };


    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    }

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };
    return (<>
        {role === 'user' && isUserLoggedIn ? <h3 className="msg">let's start buying!!!</h3> : role=='user'&& <h3 className="msg">היכנס כדי להתחיל לקנות</h3>}
        {role === 'admin' && <Button className="b-add" label="Add Ice Cream" onClick={() => { setAddVisible(!addVisible) }}></Button>}
        {addVisible && <ManageProducts visible={addVisible} setVisible={setAddVisible}></ManageProducts>}
        {update && <ManageProducts visible={update} setVisible={setUpdate} iceCream={product}></ManageProducts>}
        {single && <Singleproduct product={product} visible={single} setVisible={setSingle} addToBasket={addToBasket} isUserLoggedIn={isUserLoggedIn}></Singleproduct>}
        {basketIsSuccess && <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
            <Message className="message" severity='success' text='נוסף בהצלחה לסל' />
        </div>}
        <div className="card">
            <DataView className="dataView" value={iceCreams} listTemplate={listTemplate} header={header()} layout={layout}></DataView>
        </div>
    </>)
}
export default Products

