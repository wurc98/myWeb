import router from 'umi/router';
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};


export function render(oldRender) {
  console.log(localStorage.info)
    if(localStorage.info){
        oldRender();
    }else{
        router.push('/login')
        oldRender();
    }
}
