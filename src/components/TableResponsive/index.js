import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { formatNumber } from '../../utils/utility';


const TableResponsive = props => {

  const sizePerPageList = [
    { text: '10 ' , value: 10 },
    { text: '25' , value: 25 },
    { text: '50' , value: 50 },
    { text: '100', value: 100 }
  ];

  const paginationOptions = {
    custom: true,
    showTotal: true,
    totalSize: props.totalSize ? props.totalSize: props.data.length,
    page: props.page ? props.page: 1,
    sizePerPageList: props.sizePerPageList ? props.sizePerPageList: sizePerPageList,
    sizePerPage: props.notPaging ? props.data.length: props.sizePerPage,
    paginationTotalRenderer: (from, to, size) =>
      (<span className="react-bootstrap-table-pagination-total ml-2 d-none d-sm-inline-block">
       { formatNumber(from) } ～ { formatNumber(to) } / { formatNumber(size) }
     </span>)
  };

  const noDataIndication = () => <h6>{ props.noDataMessage }</h6>;

  return (
    <PaginationProvider pagination={ paginationFactory(paginationOptions) }>
      { ({ paginationProps, paginationTableProps }) => (
        <React.Fragment>
          <PerfectScrollbar>
            <BootstrapTable
              { ...props }
              bordered={ false }
              striped
              headerClasses="bg-secondary"
              hover
              bootstrap4
              noDataIndication={ noDataIndication }
              classes={ `table-md w-100 ${props.classes ? props.classes: ''} ` }
              { ...paginationTableProps }
            />
          </PerfectScrollbar>
          { props.notPaging ? null: (
            <div className="d-flex justify-content-between">
              <div>
                <SizePerPageDropdownStandalone { ...paginationProps } />
                <PaginationTotalStandalone { ...paginationProps }/>
              </div>
              <PaginationListStandalone { ...paginationProps }/>
            </div>
          ) }
        </React.Fragment>
      ) }
    </PaginationProvider>
  );
};


TableResponsive.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.any.isRequired,
  classes: PropTypes.string,
  notPaging: PropTypes.bool,
  sitePerPage: PropTypes.number,
  noDataMessage: PropTypes.any,
  totalSize: PropTypes.number,
  onSizePerPageChange: PropTypes.func,
  onPageChange: PropTypes.func
};

TableResponsive.defaultProps = {
  notPaging: false,
  page: 1,
  data: [],
  noDataMessage: 'No data'
};


export default withLocalize(TableResponsive);
