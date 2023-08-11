//#region Imports
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { GrFormNext, GrTrash } from "react-icons/gr";
import styles from "./styles.module.css";
import { convertToCurrency } from "@/core/helpers";
import { GlobalContext } from "@/context/Provider";
import { useEffect } from "react";
//#endregion


const PartnershipItem = ({ buttonRef, selectedItem, onRemove, onAddToCart, item, isLoading }) => {
  const { cart } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(false);

  const isInCart=(selItem)=>{
    let found = cart?.items ? cart?.items.find((cart_item)=>cart_item.partnership?._id == selItem?._id) : null;
    if(found) return true; else return false
  }

  const getIsAdded =(selItem)=>{
    setIsAdded(isInCart(selItem))
  }

  useEffect(() => {
    getIsAdded(item);
  }, [isLoading])
  
  
  return (
    <>
      <div className={`col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 ${styles.container}`}>
        <div className={`card border-0 ${styles.card}`}>
          <div className="card-body py-5 text-center shadow-md">
            <h6 className="h6 fw-bold">{`${item.name} Partnership`}</h6>
            <Image
              priority
              alt={"image"}
              src={item?.image_url?.includes("http") ? item?.image_url : `${item?.image_url ? "http://" : ""}${item?.image_url ?? "/assets/icons/logo-knt-blue.png"}`}
              className={`my-2`}
              width={65}
              height={75}
            />
            <h6 className="h6">{item?.title}</h6>
            <h6 className="h6 text-muted">{item?.name}</h6>
            <h2 className={`h2 fw-bold mb-4 ${styles.amount}`}>
              <span className={`small ${styles.small}`}>€</span> {convertToCurrency(item?.amount)}
              <span className={`small ${styles.small}`}>/{item.frequency}</span>
            </h2>
            <small className={`small ${styles.description}`}>{item.description?.length > 100 ? `${item.description?.substring(0, 100)}...` : item.description}</small>
            <br />
            <button
              type="button"
              ref={buttonRef}
              disabled={isLoading}
              onClick={(event) => {
                event.preventDefault();
                !isInCart(item) ? onAddToCart(item) : onRemove(item);
                setTimeout(()=>{
                  getIsAdded(item);
                },0)
                
              }}
              className={`btn ${isAdded ? 'btn-danger' : 'btn-primary'} text-white ${styles.button}`}
            >
              {(isLoading && selectedItem?._id == item?._id) || isLoading ? "Processing..." : isAdded ? "Remove" : "Join Now"} {!isAdded ? <GrFormNext className={`${styles.more_icon}`} /> : <GrTrash className={`${styles.more_icon}`} color='#fff' />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnershipItem;
