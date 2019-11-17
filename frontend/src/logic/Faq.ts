import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import { ApiHelper } from "../helper/ApiHelper";
import { ApiRoutes, AppRoutes } from "../config";
import { IRootState } from "../interfaces";
import { FaqActionTypes, showLoader, hideLoader, getFAQSuccess, getFAQFailed, addFAQSuccess, redirectTo, addFAQFailed, FAQStatusSuccess, FAQInfoSuccess, FAQStatusFailed, getFAQRequest, FAQInfoFailed, updateFAQSuccess, updateFAQFailed } from "../actions";

let toastId: any = null;

const getFAQs = createLogic({
  type: FaqActionTypes.GET_FAQ_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.GET_FAQ.service,
      ApiRoutes.GET_FAQ.url,
      ApiRoutes.GET_FAQ.method,
      ApiRoutes.GET_FAQ.authenticate,
      undefined,
      undefined
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      dispatch(hideLoader());
      dispatch(
        getFAQSuccess({
          faqData: response.data.data
        })
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(getFAQFailed());
      done();
    }
  }
});

const addFaq = createLogic({
  type: FaqActionTypes.ADD_FAQ_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    console.log("******************");
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADD_FAQ.service,
      ApiRoutes.ADD_FAQ.url,
      ApiRoutes.ADD_FAQ.method,
      ApiRoutes.ADD_FAQ.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        addFAQSuccess({
          FAQData: response.data.data
        })
      );
      dispatch(redirectTo({
        path:AppRoutes.FAQ
      }))
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(addFAQFailed());
      done();
    }
  }
});

// Function to update Faq
const updateFAQ = createLogic({
  type: FaqActionTypes.UPDATE_FAQ_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    console.log("******************");
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.UPDATE_FAQ.service,
      ApiRoutes.UPDATE_FAQ.url,
      ApiRoutes.UPDATE_FAQ.method,
      ApiRoutes.UPDATE_FAQ.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        updateFAQSuccess({
          FAQInfo: response.data.data
        })
      );
      dispatch(redirectTo({
        path:AppRoutes.FAQ
      }))
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(updateFAQFailed());
      done();
    }
  }
});

// const viewFAQ = createLogic({
//   type: FaqActionTypes.FAQ_INFO_REQUEST,
//   async process(data, dispatch: any, done) {
//     console.log("******************");
//     const action: any = data.action;
//     dispatch(showLoader());
//     const response = await new ApiHelper().FetchFromServer(
//       ApiRoutes.VIEW_FAQ.service,
//       ApiRoutes.VIEW_FAQ.url,
//       ApiRoutes.VIEW_FAQ.method,
//       ApiRoutes.VIEW_FAQ.authenticate,
//       action.payload,
//       undefined
//     );
//     console.log(response);
//     if (response && !response.isError) {
//       console.log("dfdsfdfds");
//       dispatch(hideLoader());
//       dispatch(
//         FAQInfoSuccess({
//           FAQInfo: response.data.data
//         })
//       );
//       done();
//     } else {
//       console.log(response);
//       if (!toast.isActive(toastId)) {
//         toastId = toast.error(response.messages[0]);
//       }
//       dispatch(hideLoader());
//       dispatch(FAQInfoFailed());
//       done();
//     }
//   }
// });


/**
|--------------------------------------------------
| Update Faq Status
|--------------------------------------------------
*/

const updateFAQStatus = createLogic({
  type: FaqActionTypes.UPDATE_FAQ_STATUS_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action
    toast.dismiss();
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.UPDATE_FAQ_STATUS.service,
      ApiRoutes.UPDATE_FAQ_STATUS.url,
      ApiRoutes.UPDATE_FAQ_STATUS.method,
      ApiRoutes.UPDATE_FAQ_STATUS.authenticate,
      undefined,
      action.payload,
    )
    if (response && !response.isError) {
      dispatch(hideLoader())
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0])
        dispatch(FAQStatusSuccess())
      }
      const state: IRootState = data.getState() as IRootState;
      dispatch(
        FAQInfoSuccess({
          FAQData: {
            ...state.faqReducer.faqInfo,
            isActive: action.payload.isActive,
          },
        }),
      );
      dispatch(getFAQRequest({ skip: 0, limit: 10 }));
    }
    else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        FAQStatusFailed({
          error: response.messages[0],
        }),
      );
      done();
    }
  }
})

export const FaqLogics = [getFAQs,addFaq,updateFAQ,updateFAQStatus]
