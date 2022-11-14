import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from '../certificate';
import { CertificateService } from '../certificate.service';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  employee: Employee = new Employee();
  department: any = this.getDepartments();
  certificate: any = this.getCertificates();
  skills: any;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router, private departmentService: DepartmentService, private certificateService: CertificateService, private skillService: SkillService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
    this.getSkills();
  }
  onchange(event: any) {
    console.log(this.skills);

  }
  onSubmit() {
    this.employee.skill = this.skills.filter(x => x.isselected == true).map(x => x.id);
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
      this.goToEmployeeList();
    }, error => console.log(error));

  }
  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
  private getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => { this.department = data; });
  }
  private getCertificates() {
    this.certificateService.getCertificateList().subscribe(data => { this.certificate = data; });
  }

  private getSkills() {
    this.skills = [
      { id: 1, skillName: "FrontEnd", isselected: false },
      { id: 2, skillName: "BackEnd", isselected: false },
      { id: 3, skillName: "FullStack", isselected: false }
    ]
  }
}
