// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: './index', // routes:['./src/routes/PrivateRoute.js']
    },
    {
      path: '/login',
      component: './login/login',
    },
    {
      path: '/reg',
      component: './login/reg',
    },
    {
      path: '/products/:name',
      component: './products/Products',
    },
    {
      path: '/userSpace',
      component: '../layouts/index',
      routes: [
        {
          path: '/userSpace/',
          component: 'userSpace/userCenter/userInfo',
        },
        {
          path: '/userSpace/userCenter/safetyCenter',
          component: './userSpace/userCenter/safetyCenter',
        },
        {
          path: '/userSpace/userDeal/shoppingCart',
          component: './userSpace/userDeal/shoppingCart',
        },
        {
          path: '/userSpace/userDeal/order',
          component: './userSpace/userDeal/order',
        },
      ],
    },
    {
      path: '/backStage',
      component: '../layouts/backStage',
      routes: [
        {
          path: '/backStage/operate/userFind',
          component: './backStage/operate/userFind',
        },
        {
          path: '/backStage/operate/userOperate',
          component: './backStage/operate/userOperate',
        },
        {
          path: '/backStage/operate/books/booksFind',
          component: './backStage/operate/books/booksFind',
        },
        {
          path: '/backStage/operate/books/addBooks',
          component: './backStage/operate/books/addBooks',
        },
        {
          path: '/backStage/operate/books/changedBooks',
          component: './backStage/operate/books/changedBooks',
        },
        {
          path: '/backStage/operate/orders/orders',
          component: './backStage/operate/orders/orders',
        },
        {
          path: '/backStage/operate/books/specialBooks',
          component: './backStage/operate/books/specialBooks',
        },
      ],
    },
    {
      path: './backStage',
      component: './backStage/backStage',
    },
    {
      path: './backStage/AdministratorLogin',
      component: './backStage/AdministratorLogin',
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'myWeb',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
