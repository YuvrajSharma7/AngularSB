import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { CertificateService } from '../certificate.service';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  department: any = this.getDepartments();
  certificate: any = this.getCertificates();
  skills: any;
  skillArr: number[];
  constructor(private employeeService: EmployeeService, private router: Router, private departmentService: DepartmentService, private certificateService: CertificateService, private skillService: SkillService) { }

  ngOnInit(): void {
    this.getSkills();

  }
  onchange(event: any) {
    console.log(this.skills);

  }
  changeDepartment(e) {
    console.log(e.target.value);
  }
  saveEMployee() {
    this.employeeService.createEmployee(this.employee).subscribe(data => { console.log(data); this.goToEmployeeList(); }, error => console.log(error));

  }
  private getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => { this.department = data; });
  }
  private getCertificates() {
    this.certificateService.getCertificateList().subscribe(data => { this.certificate = data; });
  }
  // private getSkills() {
  //   this.skillService.getSkillList().subscribe(data => { this.skills = data; });
  // }
  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
  onSubmit() {
    console.log(this.employee);
    this.employee.skill = this.skills.filter(x => x.isselected == true).map(x => x.id);
    this.saveEMployee();

  }

  private getSkills() {
    this.skills = [
      { id: 1, skillName: "FrontEnd", isselected: false },
      { id: 2, skillName: "BackEnd", isselected: false },
      { id: 3, skillName: "FullStack", isselected: false }
    ]
  }
}
