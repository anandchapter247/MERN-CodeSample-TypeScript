import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { IPaginationProps } from '../../interfaces/Pagination';

class PaginationComponent extends Component<IPaginationProps, any> {
  render() {
    return <>cvxxxxxxx</>;
  }
}

// const LEFT_PAGE: string = 'LEFT';
// const RIGHT_PAGE: string = 'RIGHT';
// const FIRST_PAGE: string = 'FIRST_PAGE';
// const LAST_PAGE: string = 'LAST_PAGE';

// // HELPER TO CREATE PAGE RANGE
// const range = (from: number, to: number, step: number = 1) => {
//   let i = from;
//   const range = [];

//   while (i <= to) {
//     range.push(i);
//     i += step;
//   }
//   return range;
// };

// class PaginationComponent extends Component<IPaginationProps, IPaginationState> {
//   constructor(props: IPaginationProps) {
//     super(props);
//     const {
//       totalRecords = null,
//       currentPage = null,
//       pageLimit,
//       pageNeighbours = 1,
//     } = props;
//     // PAGE LIMIT AND RECORDS
//     this.pageLimit:number = typeof pageLimit === 'number' ? pageLimit : 10;
//     this.totalRecords:number = typeof totalRecords === 'number' ? totalRecords : 0;

//     // PAGE NEIGHBOURS CAN BE 0, 1 OR 2
//     this.pageNeighbours: number =
//       typeof pageNeighbours === 'number'
//         ? Math.max(0, Math.min(pageNeighbours, 2))
//         : 0;
//     this.totalPages: number = Math.ceil(this.totalRecords / this.pageLimit);

//     // STATE
//     this.state = { currentPage: currentPage ? currentPage : 1 };
//   }

//   gotoPage = page => {
//     const { onPageChanged = f => f } = this.props;
//     const currentPage = Math.max(0, Math.min(page, this.totalPages));
//     this.setState({ currentPage }, () => onPageChanged(currentPage));
//   };

//   handleClick = page => evt => {
//     evt.preventDefault();
//     if (this.state.currentPage !== page) {
//       this.gotoPage(page);
//     }
//   };

//   handleMoveLeft = evt => {
//     evt.preventDefault();
//     this.gotoPage(this.state.currentPage - this.pageNeighbours);
//   };

//   handleMoveRight = evt => {
//     evt.preventDefault();
//     this.gotoPage(this.state.currentPage + this.pageNeighbours);
//   };

//   /**
//    * Let's say we have 10 pages and we set pageNeighbours to 2
//    * Given that the current page is 6
//    * The pagination control will look like the following:
//    *
//    * (1) < {4 5} [6] {7 8} > (10)
//    *
//    * (x) => terminal pages: first and last page(always visible)
//    * [x] => represents current page
//    * {...x} => represents page neighbours
//    */
//   fetchPageNumbers = () => {
//     const totalPages = this.totalPages;
//     const currentPage = this.state.currentPage;
//     const pageNeighbours = this.pageNeighbours;

//     /**
//      * totalNumbers: the total page numbers to show on the control
//      * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
//      */
//     const totalNumbers = this.pageNeighbours * 2 + 3;
//     const totalBlocks = totalNumbers + 2;

//     if (totalPages > totalBlocks) {
//       const startPage = Math.max(2, currentPage - pageNeighbours);
//       const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

//       let pages = range(startPage, endPage);

//       /**
//        * hasLeftSpill: has hidden pages to the left
//        * hasRightSpill: has hidden pages to the right
//        * spillOffset: number of hidden pages either to the left or to the right
//        */
//       const hasLeftSpill = startPage > 2;
//       const hasRightSpill = totalPages - endPage > 1;
//       const spillOffset = totalNumbers - (pages.length + 1);

//       switch (true) {
//         // handle: (1) < {5 6} [7] {8 9} (10)
//         case hasLeftSpill && !hasRightSpill: {
//           const extraPages = range(startPage - spillOffset, startPage - 1);
//           pages = [FIRST_PAGE, LEFT_PAGE, ...extraPages, ...pages, totalPages];
//           break;
//         }

//         // handle: (1) {2 3} [4] {5 6} > (10)
//         case !hasLeftSpill && hasRightSpill: {
//           const extraPages = range(endPage + 1, endPage + spillOffset);
//           pages = [1, ...pages, ...extraPages, RIGHT_PAGE, LAST_PAGE];
//           break;
//         }

//         // handle: (1) < {4 5} [6] {7 8} > (10)
//         case hasLeftSpill && hasRightSpill:
//         default: {
//           pages = [FIRST_PAGE, LEFT_PAGE, ...pages, RIGHT_PAGE, LAST_PAGE];
//           break;
//         }
//       }

//       return pages;
//     }

//     return range(1, totalPages);
//   };

//   render() {
//     if (!this.totalRecords || this.totalPages === 1) return null;

//     const { currentPage } = this.state;
//     const pages = this.fetchPageNumbers();

//     return (
//       <div className={'float-right'}>
//         <Pagination>
//           {pages.map((page, index) => {
//             return page === LEFT_PAGE ? (
//               <Pagination.Item key={index} onClick={this.handleMoveLeft}>
//                 <span aria-hidden='true'>«</span> Prev
//               </Pagination.Item>
//             ) : page === RIGHT_PAGE ? (
//               <Pagination.Item key={index} onClick={this.handleMoveRight}>
//                 Next <span aria-hidden='true'>»</span>
//               </Pagination.Item>
//             ) : page === FIRST_PAGE ? (
//               <Pagination.Item key={index} onClick={this.handleClick(1)}>
//                 First <span aria-hidden='true'>«</span>
//               </Pagination.Item>
//             ) : page === LAST_PAGE ? (
//               <Pagination.Item
//                 key={index}
//                 onClick={this.handleClick(this.totalPages)}
//               >
//                 Last <span aria-hidden='true'>»</span>
//               </Pagination.Item>
//             ) : (
//               <Pagination.Item
//                 key={index}
//                 onClick={this.handleClick(page)}
//                 active={currentPage === page}
//               >
//                 {page}
//               </Pagination.Item>
//             );
//           })}
//         </Pagination>
//       </div>
//     );
//   }
// }

export default PaginationComponent;
