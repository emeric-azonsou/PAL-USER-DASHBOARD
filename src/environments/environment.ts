// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test: false,
  payStackCheckoutUrl: `http://127.0.0.1:8000/api/securewithpaystack`,
  payStackReleaseUrl: `http://127.0.0.1:8000/api/initiaterelease`,
  processPayoutUrl: `http://127.0.0.1:8000/api/processbusinesspayout`,
  checkTransactionStatusUrl: `http://127.0.0.1:8000/api/chektransactionstatus`,
  addAccountUrl: `http://127.0.0.1:8000/api/createrecipient`,
  updateAccountUrl: `http://127.0.0.1:8000/api/updateuseraccount`,
  createTransactionUrl: `http://127.0.0.1:8000/api/newtransaction`,
  deleteAccountUrl: `http://127.0.0.1:8000/api/deleteduseraccount`,
  getTransactionByIdUrl: `http://127.0.0.1:8000/api/getusertransaction`,

  getTransactionsListUrl: `http://127.0.0.1:8000/api/getmerchanttransactions/`,
  verifyReleaseCodeUrl: `http://127.0.0.1:8000/api/verifycode`,
  cancelTransactionUrl: `http://127.0.0.1:8000/api/cancelescrowtransaction`,
  getBusinessUserPayoutsUrl: `http://127.0.0.1:8000/api/getbusinessuserpayouts`,
  getBusinessTransactionsSummaryUrl: `http://127.0.0.1:8000/api/getmerchantusertransactionssummary/`,
  updateDeliveyUrl: `http://127.0.0.1:8000/api/updatedeliveryphone`,
  getUserAccountDetailsUrl: `http://127.0.0.1:8000/api/getbusinessuseraccountdetails`,
  registerPalUserUrl: `http://127.0.0.1:8000/api/registerpaluser`,
  registerUserUrl: `http://127.0.0.1:8000/api/register`,
  loginUrl:`http://127.0.0.1:8000/api/login`,

  getBusinessSummaryUrl: `http://127.0.0.1:8000/api/getmerchantusersummary/`,
  getBusinessDataUrl: `http://127.0.0.1:8000/api/getuserbusiness/`,
  addBusinessUrl: `http://127.0.0.1:8000/api/addbusiness`,
  updateBusinessUrl: `http://127.0.0.1:8000/api/updatebusiness/`,
  getModulesDataUrl: `http://127.0.0.1:8000/api/getmodulesdata`,
  createTransferUrl: `http://127.0.0.1:8000/api/createtransfer`,
  createBulkTransferUrl: `http://127.0.0.1:8000/api/createbulktransfer`,
  requestTopUpUrl: `http://127.0.0.1:8000/api/requesttopup`,
  getUserTopUpsUrl: `http://127.0.0.1:8000/api/getusertopups/`,
  getUserBalancesUrl: `http://127.0.0.1:8000/api/getbusinessuserbalances/`,
  getUserCollectionsBalancesUrl: `http://127.0.0.1:8000/api/getbusinessusercollectionbalances/`,
  sendOTPtoEmailUrl: `http://127.0.0.1:8000/api/sendotptoemailforgotpassword`,
  updatePasswordUrl:  `http://127.0.0.1:8000/api/forgotpassupdate`,
  verifyEmailUrl: `http://127.0.0.1:8000/api/verifyemail`,

  getTransactionsReportUrl: `http://127.0.0.1:8000/api/gettransactionsreport/`,

  getClientDetailsUrl: `http://127.0.0.1:8000/api/getmomoclientdata`,
  getBulkClientDetailsUrl: `http://127.0.0.1:8000/api/getbulkmomoclientdata`,

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
