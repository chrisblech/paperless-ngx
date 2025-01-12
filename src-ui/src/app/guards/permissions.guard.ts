import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'
import { Injectable } from '@angular/core'
import { PermissionsService } from '../services/permissions.service'
import { ToastService } from '../services/toast.service'
import { TourService } from 'ngx-ui-tour-ng-bootstrap'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private permissionsService: PermissionsService,
    private router: Router,
    private toastService: ToastService,
    private tourService: TourService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (
      !this.permissionsService.currentUserCan(
        route.data.requiredPermission.action,
        route.data.requiredPermission.type
      )
    ) {
      // Check if tour is running 1 = TourState.ON
      if (this.tourService.getStatus() !== 1) {
        this.toastService.showError(
          $localize`You don't have permissions to do that`
        )
      }
      return this.router.parseUrl('/dashboard')
    } else {
      return true
    }
  }
}
