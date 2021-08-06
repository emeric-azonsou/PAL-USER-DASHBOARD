// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  payStackCheckoutUrl: `https://api-test.pals.africa/api/securewithpaystack`,
  payStackReleaseUrl: `https://api-test.pals.africa/api/initiaterelease`,
  processPayoutUrl: `https://api-test.pals.africa/api/processbusinesspayout`,
  checkTransactionStatusUrl: `https://api-test.pals.africa/api/chektransactionstatus`,
  addAccountUrl: `https://api-test.pals.africa/api/createrecipient`,
  updateAccountUrl: `https://api-test.pals.africa/api/updateuseraccount`,
  createTransactionUrl: `https://api-test.pals.africa/api/newtransaction`,
  deleteAccountUrl: `https://api-test.pals.africa/api/deleteduseraccount`,
  getTransactionByIdUrl: `https://api-test.pals.africa/api/getusertransaction`,

  getTransactionsListUrl: `https://api-test.pals.africa/api/getmerchanttransactions/`,
  verifyReleaseCodeUrl: `https://api-test.pals.africa/api/verifycode`,
  cancelTransactionUrl: `https://api-test.pals.africa/api/cancelescrowtransaction`,
  getBusinessUserPayoutsUrl: `https://api-test.pals.africa/api/getbusinessuserpayouts`,
  getBusinessTransactionsSummaryUrl: `https://api-test.pals.africa/api/getusertransactionssummary`,
  updateDeliveyUrl: `https://api-test.pals.africa/api/updatedeliveryphone`,
  getUserAccountDetailsUrl: `https://api-test.pals.africa/api/getbusinessuseraccountdetails`,
  registerPalUserUrl: `https://api-test.pals.africa/api/registerpaluser`,
  registerUserUrl: `https://api-test.pals.africa/api/register`,
  loginUrl:`https://api-test.pals.africa/api/login`,

  getBusinessDataUrl: `https://api-test.pals.africa/api/getuserbusiness/`,
  addBusinessUrl: `https://api-test.pals.africa/api/addbusiness`,
  getModulesDataUrl: `https://api-test.pals.africa/api/getmodulesdata`,
  createTransferUrl: `https://api-test.pals.africa/api/createtransfer`,
  requestTopUpUrl: `https://api-test.pals.africa/api/requesttopup`,
  getUserTopUpsUrl: `https://api-test.pals.africa/api/getusertopups/`,
  getUserBalancesUrl: `https://api-test.pals.africa/api/getbusinessuserbalances/`,
  sendOTPtoEmailUrl: `https://api-test.pals.africa/api/sendotptoemailforgotpassword`,
  updatePasswordUrl:  `https://api-test.pals.africa/api/forgotpassupdate`,
  verifyEmailUrl: `https://api-test.pals.africa/api/verifyemail`

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
