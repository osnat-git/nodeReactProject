import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag';
import { useState } from 'react';

const Singleproduct=({product,visible,setVisible,addToBasket,isUserLoggedIn})=>{
    
    return(
    <div className="card flex justify-content-center" >
            <Dialog header={product.name} visible={visible} maximizable style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <Tag value={product.quantity > 5 ? "במלאי" : product.quantity <= 1 ? "אזל מהמלאי" : "מלאי מצומצם"} severity={product.quantity > 5 ? "success" : product.quantity <= 1 ? "danger" : "warning"}></Tag>
                <img src={`http://localhost:1111/${product.image}`} style={{maxWidth:"75vw"}}></img>
                <span>₪ {product.price}</span>
                <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.quantity <=1 || !isUserLoggedIn} onClick={() => addToBasket(product)}></Button>
            </Dialog>
        </div>)
}
export default Singleproduct