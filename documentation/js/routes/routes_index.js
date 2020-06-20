var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"addressRoutes","filename":"src/app/address-book/address.module.ts","module":"AddressModule","children":[{"path":"","component":"AddressBookComponent","children":[{"path":"new-address","component":"NewAddressComponent"},{"path":"new-address/:id","component":"NewAddressComponent"}]}],"kind":"module"},{"name":"AppRoutes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"login","data":{"preload":true,"loadAfter":"3000"},"loadChildren":"./login/login.module#LoginModule"},{"path":"tasks","data":{"preload":true,"loadAfter":"6000"},"loadChildren":"./tasks/tasks.module#TasksModule"},{"path":"balance","data":{"preload":true,"loadAfter":"9000"},"loadChildren":"./balance/balance.module#BalanceModule"},{"path":"transactions","component":"TransactionsComponent","canActivate":["AuthGuard"]},{"path":"address-book","data":{"preload":true,"loadAfter":"12000"},"loadChildren":"./address-book/address.module#AddressModule"},{"path":"","redirectTo":"/tasks","pathMatch":"full"}],"kind":"module"},{"name":"balanceRoutes","filename":"src/app/balance/balance.module.ts","module":"BalanceModule","children":[{"path":"","component":"BalanceComponent","canActivate":["AuthGuard"],"children":[{"path":"new-balanceItem","component":"NewBalanceItemComponent","canActivate":["NewTaskGuard"]},{"path":"new-balanceItem/:id","component":"NewBalanceItemComponent","canActivate":["NewTaskGuard"]}]}],"kind":"module"},{"name":"AppRoutes","filename":"src/app/login/login.module.ts","module":"LoginModule","children":[{"path":"","component":"LoginComponent"}],"kind":"module"},{"name":"tasksRoutes","filename":"src/app/tasks/tasks.module.ts","module":"TasksModule","children":[{"path":"","component":"TasksComponent","canActivate":["AuthGuard"],"children":[{"path":"new-task","component":"NewTaskComponent","canActivate":["NewTaskGuard"]},{"path":"new-task/:id","component":"NewTaskComponent","canActivate":["NewTaskGuard"]}]}],"kind":"module"}]}