//#region Imports
import { NEXT_PAGE, PREVIOUS } from "@/constants/constants";
import Link from "next/link";
import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from './styles.module.css';
//#endregion

const Pagination = ({ totalSize, size, page, setPage, isEnd, setIsEnd, isFirst, setIsFirst  }) => {

  const pageChange = (nav) => {
    if (nav == NEXT_PAGE && (Math.ceil(totalSize / size)-1 > page)) setPage((value) => value + 1);
    if (nav == PREVIOUS && page > 0) setPage((value) => value - 1);
    
    if (Math.ceil(totalSize / size)-1 > page) setIsEnd(true);
    else setIsEnd(false);
    if (page > 0) setIsFirst(false);
    else setIsFirst(true);
  };

  return (
    <>
      <div className={`d-flex flex-row justify-content-between`}>
            <div className={``}>
              {/* <a href="#" className={`small ${styles.view_all}`}>
              View All <AiFillCaretDown />
            </a> */}
            </div>
            <div className={``}>
              {!isFirst && (
                <Link onClick={(event)=>{event.preventDefault(); pageChange(PREVIOUS)}} href={'#'} className={`${styles.page_link}`}>
                  <GrFormPrevious />
                  Prev
                </Link>
              )}
              {isFirst && (
                <a aria-disabled={true} className={`${styles.page_link}`} style={{ color: isFirst ? "GrayText" : "" }}>
                  <GrFormPrevious />
                  Prev
                </a>
              )}
              &nbsp;
              <small className={`small text-muted`}>
                Page {totalSize > 0 ? page + 1 : 0}/{totalSize > 0 ? Math.ceil(totalSize / size)-(page > 1 ? 1 : 0) : 0}
              </small>
              &nbsp;
              {!isEnd && (
                <Link href={'#'} onClick={(event)=>{event.preventDefault(); pageChange(NEXT_PAGE)}} className={`${styles.page_link}`}>
                  Next
                  <GrFormNext />
                </Link>
              )}
              {isEnd && (
                <a aria-disabled={true} className={`${styles.page_link}`} style={{ color: isEnd ? "GrayText" : "" }}>
                  Next
                  <GrFormNext />
                </a>
              )}
            </div>
          </div>
    </>
  );
};

export default Pagination;
