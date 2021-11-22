import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService } from "../_services";

@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() isAuth = new EventEmitter<boolean>();
  model: any = {};
  isValidating = false;
  returnUrl: string;
  // isloading = true;
  // isAuthenticated = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // this.authenticationService.logout();
    this.model.username = "johndlr";
    this.model.password = "password";
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "loading";
    // this.isloading = false;
    // this.isAuthenticated =  false;

  }

  login() {
    this.isValidating = true;
    // this.isloading = true;
    this.authenticationService.login(this.model).subscribe(
      () => {
        // this.isAuthenticated =  true;
        console.log(" next action here ... ");
        if (this.model.username === 'johndlr') {
          localStorage.setItem("userName", "Reynolds, Dave");
          localStorage.setItem("userId","F294EFFF3E516F43AD5372F5353A9C5A")
          localStorage.setItem("dealerName", "Southfield Avis Ford (HR7AX)");
          localStorage.setItem("dealerId", "HR7AX");
        } else {
          localStorage.setItem("userName", "Boyer, John");
          localStorage.setItem("dealerName", "Tamaroff Honda (VP1VZ)");
          localStorage.setItem("dealerId", "VP1VZ");
          localStorage.setItem("userId","028163410C432D419F71C5D8650277CF");
        }
      },
      error => {
        console.log(error);
        this.isValidating = false;
      },
      () => {
        this.isValidating = false;
        console.log("login " + this.returnUrl);
        this.isAuth.emit(true);
        this.router.navigate([this.returnUrl]);
      }
    );
  }
}
