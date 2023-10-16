import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
// import { AuthGuardService } from '../../core/auth/auth-guard.service';
// import { debounceTime, first, takeUntil, tap } from 'rxjs/operators';
// import { Subject } from 'rxjs';
@Component({
  selector: 'blank',
  templateUrl: './blank.template.html',
  encapsulation: ViewEncapsulation.None
})
export class BlankComponent implements AfterViewInit, OnDestroy {
  // unsubscribe$: Subject<void> = new Subject<void>();
  loading = false;
  constructor(
    private translate: TranslateService,
    private router: Router,
    // private auth: AuthGuardService,
  ) { }

  ngAfterViewInit(): void {
    // this.auth.canActivate()
    //   .pipe(
    //     // first(),
    //     takeUntil(this.unsubscribe$),
    //     debounceTime(1000),
    //     tap(res => console.log('blank', res))
    //   )
    //   .subscribe(res => {
    //   if (res) {
    //     this.router.navigate(['/main']);
    //   } else {
    //     this.router.navigate(['/logindataportal']);
    //     // this.router.navigate(['/sk-login']);  //sk
    //   }
    // });
  }

  ngOnDestroy(): void {
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
  }
}
