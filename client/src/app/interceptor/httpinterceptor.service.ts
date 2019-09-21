// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
// import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpinterceptorService implements HttpInterceptor{

//   // constructor(private injector: Injector) { }
//   intercept(req: HttpRequest<any>, 
//             next: HttpHandler): Observable<HttpEvent<any>> {
//     // let authservice = this.injector.get(AuthService)
//     const token = localStorage.getItem('token');
//     // let tokenReq = req.clone({
//     //   setHeaders: {
//     //     Authorization: `Bearer ${authservice.getToken()}` 
//     //   }
//     // })
//     // return next.handle(tokenReq)
//     if(token) {
//       const cloned = req.clone({
//         headers: req.headers.set("Authorization",
//           "Bearer "+token)
//       });
//       return next.handle(cloned);
//     }
//     else {
//       return next.handle(req);
//     }
//   }
// }
