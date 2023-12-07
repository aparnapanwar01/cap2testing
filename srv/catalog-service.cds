using {capproject.db as db} from '../db/data-model';

using {CV_SALES, CV_SESSION_INFO} from '../db/data-model';

using { API_SALES_ORDER_SRV } from './external/API_SALES_ORDER_SRV.csn';














service CatalogService @(path : '/catalog')
{
    entity Sales

      as select * from db.Sales
      actions {

        function largestOrder() returns String;

        action boost() returns Sales;
      }
    ;


    @readonly
    entity VSales
      @(restrict: [{ to: 'Viewer' }])
      as select * from CV_SALES
    ;

    @readonly
    entity SessionInfo
      @(restrict: [{ to: 'Viewer' }])
      as select * from CV_SESSION_INFO
    ;

    function topSales
      @(restrict: [{ to: 'Viewer' }])
      (amount: Integer)
      returns many Sales;

    @readonly
    entity SalesOrders
      @(restrict: [{ to: 'Viewer' }])
      as projection on API_SALES_ORDER_SRV.A_SalesOrder {
          SalesOrder,
          SalesOrganization,
          DistributionChannel,
          SoldToParty,
          IncotermsLocation1,
          TotalNetAmount,
          TransactionCurrency
        };















    type userScopes { identified: Boolean; authenticated: Boolean; Viewer: Boolean; Admin: Boolean; };
    type userType { user: String; locale: String; scopes: userScopes; };
    function userInfo() returns userType;


};