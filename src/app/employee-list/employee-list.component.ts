import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Certificate } from '../certificate';
import { CertificateService } from '../certificate.service';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  department: Department[];
  certificate: Certificate[];
  skillList: string;
  constructor(private employeeService: EmployeeService, private router: Router, private departmentService: DepartmentService, private certificateService: CertificateService) { }

  ngOnInit(): void {
    // this.employees = [
    //   { id: 1, firstName: "Ramesh", lastName: "Singh", emailId: "ramesh@gmail.com" },
    //   { id: 2, firstName: "Suresh", lastName: "Kumar", emailId: "suresh @gmail.com" }
    // ]
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe(data => { this.employees = data; });
    this.skillList = this.employees.map(e => e.skills).join(",");
  }

  private getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => { this.department = data; });
  }
  private getCertificates() {
    this.certificateService.getCertificateList().subscribe(data => { this.certificate = data; });
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    })
  }

}
