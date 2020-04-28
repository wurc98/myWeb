import router from 'umi/router';
import {history}   from "umi"
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};


export function render(oldRender) {
  if (localStorage.info) {
    oldRender();
  } else {
    router.push('/login')
    oldRender();
  }
}
