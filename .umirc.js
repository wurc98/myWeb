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
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/userSpace/userCenter/safetyCenter',
          component: './userSpace/userCenter/safetyCenter',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/userSpace/userDeal/shoppingCart',
          component: './userSpace/userDeal/shoppingCart',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/userSpace/userDeal/order',
          component: './userSpace/userDeal/order',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
      ],
    },
    {
      path: '/backStage',
      component: '../layouts/backStage',
      routes: [
        {
          path: '/backStage/',
          component: './backStage/operate/userFind',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/userFind',
          component: './backStage/operate/userFind',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/userOperate',
          component: './backStage/operate/userOperate',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/books/booksFind',
          component: './backStage/operate/books/booksFind',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/books/addBooks',
          component: './backStage/operate/books/addBooks',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/books/changedBooks',
          component: './backStage/operate/books/changedBooks',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/orders/orders',
          component: './backStage/operate/orders/orders',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/books/specialBooks',
          component: './backStage/operate/books/specialBooks',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
        {
          path: '/backStage/operate/books/boomBooks',
          component: './backStage/operate/books/boomBooks',
          Routes: ['./src/routes/PrivateRoute.js'],
        },
      ], // Routes: ['./src/routes/PrivateRoute.js'],
    },
    {
      path: './AdministratorLogin',
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
