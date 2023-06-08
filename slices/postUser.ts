import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { openNotificationWithIcon } from '@/components/notificationComponent';
import { postUserService } from 'api/postUser';
import FormatDataPost from '../utils/formatDataPost';
export interface PostUserState {
  postUserDetail: any;
  listPostUser: Array<any>;
  dataTag: any;
  listPost: Array<any>;
  detailPost: any;
}

const initialState: PostUserState = {
  listPostUser: [],
  postUserDetail: null,
  dataTag: null,
  listPost: [],
  detailPost: null,
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    updateDetailPost: (state, { payload }: PayloadAction<any>) => {
      state.detailPost = payload;
    },
    updateListPost: (state, { payload }: PayloadAction<any>) => {
      state.listPost = payload;
    },
    updateListPostUser: (state, { payload }: PayloadAction<any>) => {
      state.listPostUser = payload;
    },
    updateDataTag: (state, { payload }: PayloadAction<any>) => {
      state.dataTag = payload;
    },
    updatePostUserDetail: (state, { payload }: PayloadAction<any>) => {
      state.postUserDetail = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateListPost, updateListPostUser, updatePostUserDetail } = medicineSlice.actions;

export function getDetailPost(id: string, slug: string): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .getDetailPost(id, slug)
        .then((res: any) => {
          if (res.status == 200) {
            dispatch(medicineSlice.actions.updateDetailPost(res?.data?.data?.post));
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

//MEDICINE
export function getListPostSearch(key: any): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .searchPost(key)
        .then((res: any) => {
          if (res.status == 200) {
            dispatch(medicineSlice.actions.updateListPost(res?.data?.data?.posts));
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function getListPost(data: any): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .getListPost(data)
        .then((res: any) => {
          if (res.status == 200) {
            dispatch(medicineSlice.actions.updateListPost(FormatDataPost(res?.data?.data?.posts)));
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function getListPostUser(): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .getListPostUser()
        .then((res) => {
          if (res.status == 200) {
            dispatch(medicineSlice.actions.updateListPostUser(res?.data));
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function getDetailPostUser(id: string): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .getDetailPostUser(id)
        .then((res) => {
          console.log('res:', res);
          if (res.status == 200) {
            dispatch(medicineSlice.actions.updatePostUserDetail(res?.data));
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function updateTagPostUser(id: string, tag: string): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .updateTagPostUser(id, tag)
        .then((res) => {
          if (res) {
            openNotificationWithIcon(200, 'Cập nhật thành công!');
            dispatch(getListPostUser());
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function updateStatusPostUser(id: string, checked: boolean): any {
  let formatChecked = checked == true ? 'true' : 'false';
  return async (dispatch: any) => {
    try {
      await postUserService
        .updateStatusPostUser(id, formatChecked)
        .then((res) => {
          if (res) {
            openNotificationWithIcon(200, 'Cập nhật trạng thái bài viết thành công!');
            dispatch(getListPostUser());
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function deletePostUser(id: string): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .deletePostUser(id)
        .then((res) => {
          if (res) {
            openNotificationWithIcon(200, 'Xóa thành công!');
            dispatch(getListPostUser());
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function getListTag(): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .getListTag()
        .then((res) => {
          dispatch(medicineSlice.actions.updateDataTag(res?.data));
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

export function getListTagByTime(data: any): any {
  return async (dispatch: any) => {
    try {
      await postUserService
        .getListTagByTime(data)
        .then((res) => {
          dispatch(medicineSlice.actions.updateDataTag(res?.data));
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
}

// export function UpdateTotalMedicine(): any {
//   return async (dispatch: any) => {
//     try {
//       await medicineService
//         .getListMedicine()
//         .then((res) => {
//           if (res) {
//             dispatch(medicineSlice.actions.updateTotalMedicine(res?.data?.length));
//           }
//         })
//         .catch((err) => {
//           console.log('err', err);
//         });
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

// export function getListMedicineUser(take: number): any {
//   return async (dispatch: any) => {
//     try {
//       await medicineService
//         .getListMedicineUser(take)
//         .then((res) => {
//           if (res) {
//             dispatch(medicineSlice.actions.updateListMedicineUser(res?.data));
//           }
//         })
//         .catch((err) => {
//           console.log('err', err);
//         });
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

// //ORDER
// export function CreateOrder(data: any, setLoadding: any, setSuccess: any): any {
//   return async (dispatch: any) => {
//     try {
//       await medicineService
//         ._createOrder(data)
//         .then((res) => {
//           openNotificationWithIcon(200, 'Create order success');
//           dispatch(medicineSlice.actions.updateArrShoping([]));
//           setLoadding(false);
//           setSuccess(true);
//         })
//         .catch((err) => {
//           console.log('err', err);
//           setLoadding(false);
//         });
//     } catch (error) {
//       console.log('error', error);
//       setLoadding(false);
//     }
//   };
// }

// export function getListOrder(): any {
//   return async (dispatch: any) => {
//     try {
//       await medicineService
//         ._getListOrder()
//         .then((res) => {
//           if (res) {
//             dispatch(medicineSlice.actions.updateArrOrder(res?.data));
//           }
//         })
//         .catch((err) => {
//           console.log('err', err);
//         });
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

// export function deleteOrder(id: string): any {
//   return async (dispatch: any) => {
//     try {
//       await medicineService
//         ._deleteOrder(id)
//         .then((res) => {
//           if (res) {
//             openNotificationWithIcon(200, 'Delete order success');
//             dispatch(getListOrder());
//           }
//         })
//         .catch((err) => {
//           console.log('err', err);
//         });
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

// export function updateStatusOrder(id: string, data: any): any {
//   return async (dispatch: any) => {
//     try {
//       await medicineService
//         .__updateStatusOrder(id, data)
//         .then((res) => {
//           if (res) {
//             openNotificationWithIcon(200, 'Cập nhật trạng thái đơn hàng thành công');
//             dispatch(getListOrder());
//           }
//         })
//         .catch((err) => {
//           console.log('err', err);
//         });
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// }

export default medicineSlice.reducer;
