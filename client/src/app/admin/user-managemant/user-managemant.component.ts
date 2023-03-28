import { RolesModalComponent } from './../../modals/roles-modal/roles-modal.component';
import { AdminService } from './../../_services/admin.service';
import { User } from 'src/app/_models/user';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-managemant',
  templateUrl: './user-managemant.component.html',
  styleUrls: ['./user-managemant.component.css']
})
export class UserManagemantComponent implements OnInit{
  users: Partial<User[]> = [];
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService,private modalService: BsModalService){

  }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users =>{
      this.users = users;
    });
  }

  openRolesModal(user: User){
    const config = {
      class: 'modal-dialog-centered',
      initialState:{
        user,
        roles :this.getRoleArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values =>{
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if(rolesToUpdate){
        this.adminService.updateUserRoles(user['userName'],rolesToUpdate.roles).subscribe(()=>{
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
  }

  private getRoleArray(user){
    const roles =[];
    const userRoles = user.roles;
    const availableRoles: any[] =[
      { name: 'Admin',value: 'Admin'},
      { name: 'Moderator',value: 'Moderator'},
      { name: 'Member',value: 'Member'},
    ];

  availableRoles.forEach(role => {
    let isMatch = false;
    for (const userRole of userRoles){
      if(role.name ==userRole) {
        isMatch = true;
        role.checked = true;
        roles.push(role);
        break;
      }
    }
    if(!isMatch){
      role.checked = false;
      roles.push(role);
    }
  });
  return roles;
}

}
